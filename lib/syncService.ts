import { supabase, isSupabaseConfigured } from './supabase';
import { UserProgress, CompletedProtocol, LifetimeStats, ReminderSettings } from '@/types';

export interface SyncData {
  activeProtocol: UserProgress | null;
  completedProtocols: CompletedProtocol[];
  lifetimeStats: LifetimeStats;
  reminderSettings: ReminderSettings;
}

/** Emitted after init, pull, or push so UI can show non-intrusive sync health. */
export type SyncStatusEvent =
  | { type: 'success'; at: string; source: 'push' | 'pull' | 'auth' }
  | { type: 'failure'; at: string; source: 'push' | 'pull' | 'auth' }
  | { type: 'local_only'; at: string };

type SyncStatusListener = (event: SyncStatusEvent) => void;

export class SyncService {
  private static instance: SyncService;
  private userId: string | null = null;
  private isSyncing = false;
  private syncQueue: (() => Promise<void>)[] = [];
  private syncStatusListeners = new Set<SyncStatusListener>();

  private constructor() {}

  subscribeSyncStatus(listener: SyncStatusListener): () => void {
    this.syncStatusListeners.add(listener);
    return () => this.syncStatusListeners.delete(listener);
  }

  private emitSyncStatus(event: SyncStatusEvent) {
    this.syncStatusListeners.forEach((fn) => {
      try {
        fn(event);
      } catch (e) {
        console.error('sync status listener error:', e);
      }
    });
  }

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  /**
   * Initialize sync service with anonymous authentication
   */
  async initialize(): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured - using localStorage only');
      this.emitSyncStatus({ type: 'local_only', at: new Date().toISOString() });
      return false;
    }

    try {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        this.userId = session.user.id;
        console.log('Existing session found');
        this.emitSyncStatus({ type: 'success', at: new Date().toISOString(), source: 'auth' });
        return true;
      }

      // Create anonymous user for device-based sync
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error('Anonymous sign-in failed:', error);
        this.emitSyncStatus({ type: 'failure', at: new Date().toISOString(), source: 'auth' });
        return false;
      }

      this.userId = data.user?.id || null;
      console.log('Anonymous user created');
      this.emitSyncStatus({ type: 'success', at: new Date().toISOString(), source: 'auth' });
      return true;
    } catch (error) {
      console.error('Sync initialization failed:', error);
      this.emitSyncStatus({ type: 'failure', at: new Date().toISOString(), source: 'auth' });
      return false;
    }
  }

  /**
   * Sync data to Supabase
   */
  async syncToCloud(data: SyncData): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return false;
    }
    if (!this.userId) {
      this.emitSyncStatus({ type: 'failure', at: new Date().toISOString(), source: 'push' });
      return false;
    }

    // Add to queue to prevent concurrent syncs
    return new Promise((resolve) => {
      this.syncQueue.push(async () => {
        try {
          const { error } = await supabase
            .from('user_progress')
            .upsert({
              user_id: this.userId!,
              active_protocol: data.activeProtocol,
              completed_protocols: data.completedProtocols,
              lifetime_stats: data.lifetimeStats,
              reminder_settings: data.reminderSettings,
              last_synced: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'user_id'
            });

          const at = new Date().toISOString();
          if (error) {
            console.error('Sync to cloud failed:', error);
            this.emitSyncStatus({ type: 'failure', at, source: 'push' });
            resolve(false);
          } else {
            console.log('✅ Data synced to cloud');
            this.emitSyncStatus({ type: 'success', at, source: 'push' });
            resolve(true);
          }
        } catch (error) {
          console.error('Sync error:', error);
          this.emitSyncStatus({ type: 'failure', at: new Date().toISOString(), source: 'push' });
          resolve(false);
        }
      });

      this.processSyncQueue();
    });
  }

  /**
   * Load data from Supabase
   */
  async loadFromCloud(): Promise<SyncData | null> {
    if (!isSupabaseConfigured() || !this.userId) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', this.userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No data found - first time user
          console.log('No cloud data found - new user');
          this.emitSyncStatus({ type: 'success', at: new Date().toISOString(), source: 'pull' });
          return null;
        }
        console.error('Load from cloud failed:', error);
        this.emitSyncStatus({ type: 'failure', at: new Date().toISOString(), source: 'pull' });
        return null;
      }

      if (!data) {
        return null;
      }

      console.log('✅ Data loaded from cloud');
      this.emitSyncStatus({ type: 'success', at: new Date().toISOString(), source: 'pull' });
      return {
        activeProtocol: data.active_protocol,
        completedProtocols: data.completed_protocols || [],
        lifetimeStats: data.lifetime_stats || {
          totalProtocolsCompleted: 0,
          totalMissionsCompleted: 0,
          longestStreak: 0
        },
        reminderSettings: data.reminder_settings || {
          enabled: false,
          time: '09:00',
          notificationsPermission: 'default'
        }
      };
    } catch (error) {
      console.error('Load error:', error);
      this.emitSyncStatus({ type: 'failure', at: new Date().toISOString(), source: 'pull' });
      return null;
    }
  }

  /**
   * Merge cloud data with local data (conflict resolution)
   */
  mergeData(localData: SyncData, cloudData: SyncData): SyncData {
    // Strategy: Use the most recent data based on timestamps
    
    // For active protocol: use the one with more progress
    let activeProtocol = localData.activeProtocol;
    if (cloudData.activeProtocol) {
      if (!localData.activeProtocol) {
        activeProtocol = cloudData.activeProtocol;
      } else {
        // Use the one with more completed days
        const localCompleted = localData.activeProtocol.completedDays.length;
        const cloudCompleted = cloudData.activeProtocol.completedDays.length;
        activeProtocol = cloudCompleted > localCompleted 
          ? cloudData.activeProtocol 
          : localData.activeProtocol;
      }
    }

    // For completed protocols: merge unique ones
    const completedProtocolsMap = new Map();
    [...localData.completedProtocols, ...cloudData.completedProtocols].forEach(p => {
      const key = `${p.protocolId}-${p.completedDate}`;
      completedProtocolsMap.set(key, p);
    });
    const completedProtocols = Array.from(completedProtocolsMap.values());

    // For lifetime stats: use the highest values
    const lifetimeStats = {
      totalProtocolsCompleted: Math.max(
        localData.lifetimeStats.totalProtocolsCompleted,
        cloudData.lifetimeStats.totalProtocolsCompleted
      ),
      totalMissionsCompleted: Math.max(
        localData.lifetimeStats.totalMissionsCompleted,
        cloudData.lifetimeStats.totalMissionsCompleted
      ),
      longestStreak: Math.max(
        localData.lifetimeStats.longestStreak,
        cloudData.lifetimeStats.longestStreak
      )
    };

    // For reminder settings: prefer local (user's current device settings)
    const reminderSettings = localData.reminderSettings;

    return {
      activeProtocol,
      completedProtocols,
      lifetimeStats,
      reminderSettings
    };
  }

  /**
   * Process sync queue to prevent concurrent syncs
   */
  private async processSyncQueue() {
    if (this.isSyncing || this.syncQueue.length === 0) {
      return;
    }

    this.isSyncing = true;
    const task = this.syncQueue.shift();
    
    if (task) {
      await task();
    }

    this.isSyncing = false;

    // Process next in queue
    if (this.syncQueue.length > 0) {
      this.processSyncQueue();
    }
  }

  /**
   * Check if online
   */
  isOnline(): boolean {
    return typeof window !== 'undefined' && navigator.onLine;
  }

  /**
   * Get user ID
   */
  getUserId(): string | null {
    return this.userId;
  }
}

// Export singleton instance
export const syncService = SyncService.getInstance();












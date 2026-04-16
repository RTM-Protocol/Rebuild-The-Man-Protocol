'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, ProtocolDuration, ReminderSettings, IntensityMode } from '@/types';
import { syncService, type SyncData } from '@/lib/syncService';

interface ProgressContextType {
  activeProtocol: UserProgress | null;
  completedProtocols: Array<{
    protocolId: string;
    duration: ProtocolDuration;
    completedDate: string;
  }>;
  lifetimeStats: {
    totalMissionsCompleted: number;
    totalProtocolsCompleted: number;
    longestStreak: number;
  };
  reminderSettings: ReminderSettings;
  startProtocol: (protocolId: string, duration: ProtocolDuration, initialIntensity?: IntensityMode, withAccountabilityPartner?: boolean) => void;
  completeDay: (day: number) => void;
  markSetback: (day: number, note?: string) => void;
  updateReminderSettings: (settings: Partial<ReminderSettings>) => void;
  resetProtocol: () => void;
  resetAllProgress: () => void;
  isLoading: boolean;
  savePreMissionCheckIn: (day: number, data: { stressLevel: number; angerLevel: number; focusLevel: number }) => void;
  savePostMissionCheckIn: (day: number, data: { completed: boolean; didHelp: boolean | null }) => void;
  saveFieldNotes: (day: number, notes: string) => void;
  saveWeeklyBrief: (weekNumber: number, day: number, briefData: any) => void;
  changeIntensity: (mode: IntensityMode, day: number) => void;
  declineEscalation: (fromMode: IntensityMode, toMode: IntensityMode) => void;
  getCheckIn: (day: number) => any;
  setAccountabilityPartner: (enabled: boolean) => void;
  dismissAccountabilityPrompt: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [activeProtocol, setActiveProtocol] = useState<UserProgress | null>(null);
  const [completedProtocols, setCompletedProtocols] = useState<Array<{
    protocolId: string;
    duration: ProtocolDuration;
    completedDate: string;
  }>>([]);
  const [lifetimeStats, setLifetimeStats] = useState({
    totalMissionsCompleted: 0,
    totalProtocolsCompleted: 0,
    longestStreak: 0
  });
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: false,
    time: '09:00',
    notificationsPermission: 'default'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);

  // Load progress from localStorage and sync with cloud on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        // First, load from localStorage (always available)
        const savedActive = localStorage.getItem('activeProtocol');
        const savedCompleted = localStorage.getItem('completedProtocols');
        const savedLifetimeStats = localStorage.getItem('lifetimeStats');
        const savedReminderSettings = localStorage.getItem('reminderSettings');

        if (savedActive) {
          const parsed = JSON.parse(savedActive);
          // Migrate old data without checkIns array
          if (!parsed.checkIns) {
            parsed.checkIns = [];
          }
          // Migrate old data without weeklyBriefs array
          if (!parsed.weeklyBriefs) {
            parsed.weeklyBriefs = [];
          }
          // Migrate old data without intensity mode
          if (!parsed.intensityMode) {
            parsed.intensityMode = 'standard';
            parsed.intensityHistory = [{
              day: parsed.currentDay,
              mode: 'standard',
              changedAt: new Date().toISOString()
            }];
          }
          setActiveProtocol(parsed);
        }

        if (savedCompleted) {
          setCompletedProtocols(JSON.parse(savedCompleted));
        }

        if (savedLifetimeStats) {
          setLifetimeStats(JSON.parse(savedLifetimeStats));
        }

        if (savedReminderSettings) {
          const parsed = JSON.parse(savedReminderSettings);
          // Update permission status on load
          if (typeof window !== 'undefined' && 'Notification' in window) {
            parsed.notificationsPermission = Notification.permission;
          }
          setReminderSettings(parsed);
        }

        // Initialize cloud sync (non-blocking)
        const syncInitialized = await syncService.initialize();
        setIsSyncEnabled(syncInitialized);

        if (syncInitialized && syncService.isOnline()) {
          try {
            // Load data from cloud
            const cloudData = await syncService.loadFromCloud();

            if (cloudData) {
              // Prepare local data
              const localData: SyncData = {
                activeProtocol: savedActive ? JSON.parse(savedActive) : null,
                completedProtocols: savedCompleted ? JSON.parse(savedCompleted) : [],
                lifetimeStats: savedLifetimeStats ? JSON.parse(savedLifetimeStats) : {
                  totalProtocolsCompleted: 0,
                  totalMissionsCompleted: 0,
                  longestStreak: 0
                },
                reminderSettings: savedReminderSettings ? JSON.parse(savedReminderSettings) : {
                  enabled: false,
                  time: '09:00',
                  notificationsPermission: 'default'
                }
              };

              // Merge cloud and local data
              const mergedData = syncService.mergeData(localData, cloudData);

              // Update state with merged data
              setActiveProtocol(mergedData.activeProtocol);
              setCompletedProtocols(mergedData.completedProtocols);
              setLifetimeStats(mergedData.lifetimeStats);
              setReminderSettings(mergedData.reminderSettings);

              // Save merged data back to localStorage
              if (mergedData.activeProtocol) {
                localStorage.setItem('activeProtocol', JSON.stringify(mergedData.activeProtocol));
              }
              localStorage.setItem('completedProtocols', JSON.stringify(mergedData.completedProtocols));
              localStorage.setItem('lifetimeStats', JSON.stringify(mergedData.lifetimeStats));
              localStorage.setItem('reminderSettings', JSON.stringify(mergedData.reminderSettings));

              console.log('✅ Data synced and merged successfully');
            }
          } catch (syncError) {
            console.error('Cloud sync failed (using local data):', syncError);
            // Continue with local data if sync fails
          }
        }

      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Save active protocol to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      if (activeProtocol) {
        localStorage.setItem('activeProtocol', JSON.stringify(activeProtocol));
      } else {
        localStorage.removeItem('activeProtocol');
      }
    }
  }, [activeProtocol, isLoading]);

  // Save completed protocols to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('completedProtocols', JSON.stringify(completedProtocols));
    }
  }, [completedProtocols, isLoading]);

  // Save lifetime stats to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('lifetimeStats', JSON.stringify(lifetimeStats));
    }
  }, [lifetimeStats, isLoading]);

  // Save reminder settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('reminderSettings', JSON.stringify(reminderSettings));
    }
  }, [reminderSettings, isLoading]);

  // Sync to cloud whenever data changes (debounced)
  useEffect(() => {
    if (!isLoading && isSyncEnabled && syncService.isOnline()) {
      // Debounce sync to avoid too many requests
      const syncTimeout = setTimeout(() => {
        const syncData: SyncData = {
          activeProtocol,
          completedProtocols,
          lifetimeStats,
          reminderSettings
        };
        
        syncService.syncToCloud(syncData).catch(error => {
          console.error('Background sync failed:', error);
          // Fail silently - localStorage is still updated
        });
      }, 1000); // Wait 1 second after last change

      return () => clearTimeout(syncTimeout);
    }
  }, [activeProtocol, completedProtocols, lifetimeStats, reminderSettings, isLoading, isSyncEnabled]);

  const startProtocol = (protocolId: string, duration: ProtocolDuration, initialIntensity: IntensityMode = 'standard', withAccountabilityPartner?: boolean) => {
    const newProgress: UserProgress = {
      protocolId,
      duration,
      currentDay: 1,
      completedDays: [],
      startDate: new Date().toISOString(),
      streak: 0,
      longestStreak: 0,
      totalMissionsCompleted: 0,
      setbacks: [],
      checkIns: [],
      weeklyBriefs: [],
      intensityMode: initialIntensity,
      intensityHistory: [{
        day: 1,
        mode: initialIntensity,
        changedAt: new Date().toISOString()
      }],
      lastEscalationPrompt: undefined,
      declinedEscalation: null,
      accountabilityPartner: withAccountabilityPartner !== undefined
        ? { enabled: withAccountabilityPartner, declinedAt: withAccountabilityPartner ? undefined : new Date().toISOString() }
        : undefined
    };
    setActiveProtocol(newProgress);
  };

  const completeDay = (day: number) => {
    if (!activeProtocol) return;

    // Safety check: Don't complete if already completed
    if (activeProtocol.completedDays.includes(day)) {
      console.warn(`Day ${day} is already completed. Ignoring duplicate completion.`);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const lastCompletedDate = activeProtocol.lastCompletedDate 
      ? new Date(activeProtocol.lastCompletedDate).toISOString().split('T')[0]
      : null;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Calculate new streak
    let newStreak = 1;
    if (lastCompletedDate === yesterday) {
      newStreak = activeProtocol.streak + 1;
    } else if (lastCompletedDate === today) {
      // Same day completion, maintain streak
      newStreak = activeProtocol.streak;
    }

    const newLongestStreak = Math.max(activeProtocol.longestStreak, newStreak);
    const newTotalMissions = activeProtocol.totalMissionsCompleted + 1;

    const updatedProgress: UserProgress = {
      ...activeProtocol,
      completedDays: Array.from(new Set([...activeProtocol.completedDays, day])),
      currentDay: day < activeProtocol.duration ? day + 1 : day,
      lastCompletedDate: today,
      streak: newStreak,
      longestStreak: newLongestStreak,
      totalMissionsCompleted: newTotalMissions
    };

    setActiveProtocol(updatedProgress);

    // Update lifetime stats
    setLifetimeStats(prev => ({
      ...prev,
      totalMissionsCompleted: prev.totalMissionsCompleted + 1,
      longestStreak: Math.max(prev.longestStreak, newStreak)
    }));

    // If protocol is complete, archive it
    if (updatedProgress.completedDays.length === updatedProgress.duration) {
      // Persist the full protocol data so the completion page can access it
      localStorage.setItem('lastCompletedProtocolData', JSON.stringify(updatedProgress));

      setCompletedProtocols(prev => [
        ...prev,
        {
          protocolId: activeProtocol.protocolId,
          duration: activeProtocol.duration,
          completedDate: new Date().toISOString()
        }
      ]);
      setLifetimeStats(prev => ({
        ...prev,
        totalProtocolsCompleted: prev.totalProtocolsCompleted + 1
      }));
      setActiveProtocol(null);
    }
  };

  const markSetback = (day: number, note?: string) => {
    if (!activeProtocol) return;

    const updatedProgress: UserProgress = {
      ...activeProtocol,
      setbacks: [
        ...activeProtocol.setbacks,
        {
          day,
          date: new Date().toISOString(),
          note
        }
      ],
      streak: 0, // Reset streak on setback
      currentDay: day // Set current day to where setback occurred
    };

    setActiveProtocol(updatedProgress);
  };

  const resetProtocol = () => {
    setActiveProtocol(null);
  };

  const updateReminderSettings = (settings: Partial<ReminderSettings>) => {
    setReminderSettings(prev => ({ ...prev, ...settings }));
  };

  const resetAllProgress = () => {
    setActiveProtocol(null);
    setCompletedProtocols([]);
    setLifetimeStats({
      totalMissionsCompleted: 0,
      totalProtocolsCompleted: 0,
      longestStreak: 0
    });
    // Don't reset reminder settings
    const savedReminders = localStorage.getItem('reminderSettings');
    localStorage.clear();
    if (savedReminders) {
      localStorage.setItem('reminderSettings', savedReminders);
    }
  };

  const savePreMissionCheckIn = (day: number, data: { stressLevel: number; angerLevel: number; focusLevel: number }) => {
    if (!activeProtocol) return;

    const existingCheckIn = activeProtocol.checkIns.find(ci => ci.day === day);
    const updatedCheckIns = existingCheckIn
      ? activeProtocol.checkIns.map(ci => 
          ci.day === day 
            ? { ...ci, preMission: data } 
            : ci
        )
      : [...activeProtocol.checkIns, { 
          day, 
          date: new Date().toISOString(),
          preMission: data 
        }];

    setActiveProtocol({
      ...activeProtocol,
      checkIns: updatedCheckIns
    });
  };

  const savePostMissionCheckIn = (day: number, data: { completed: boolean; didHelp: boolean | null }) => {
    if (!activeProtocol) return;

    const existingCheckIn = activeProtocol.checkIns.find(ci => ci.day === day);
    const updatedCheckIns = existingCheckIn
      ? activeProtocol.checkIns.map(ci => 
          ci.day === day 
            ? { ...ci, postMission: data } 
            : ci
        )
      : [...activeProtocol.checkIns, { 
          day, 
          date: new Date().toISOString(),
          postMission: data 
        }];

    setActiveProtocol({
      ...activeProtocol,
      checkIns: updatedCheckIns
    });
  };

  const saveFieldNotes = (day: number, notes: string) => {
    if (!activeProtocol) return;

    const existingCheckIn = activeProtocol.checkIns.find(ci => ci.day === day);
    const updatedCheckIns = existingCheckIn
      ? activeProtocol.checkIns.map(ci => 
          ci.day === day 
            ? { ...ci, fieldNotes: notes, fieldNotesEditedAt: new Date().toISOString() } 
            : ci
        )
      : [...activeProtocol.checkIns, { 
          day, 
          date: new Date().toISOString(),
          fieldNotes: notes,
          fieldNotesEditedAt: new Date().toISOString()
        }];

    setActiveProtocol({
      ...activeProtocol,
      checkIns: updatedCheckIns
    });
  };

  const saveWeeklyBrief = (weekNumber: number, day: number, briefData: any) => {
    if (!activeProtocol) return;

    const newBrief = {
      weekNumber,
      day,
      generatedAt: new Date().toISOString(),
      briefData
    };

    const updatedBriefs = activeProtocol.weeklyBriefs 
      ? [...activeProtocol.weeklyBriefs, newBrief]
      : [newBrief];

    setActiveProtocol({
      ...activeProtocol,
      weeklyBriefs: updatedBriefs
    });
  };

  const changeIntensity = (mode: IntensityMode, day: number) => {
    if (!activeProtocol) return;

    const newHistoryEntry = {
      day,
      mode,
      changedAt: new Date().toISOString()
    };

    setActiveProtocol({
      ...activeProtocol,
      intensityMode: mode,
      intensityHistory: [...(activeProtocol.intensityHistory || []), newHistoryEntry],
      lastEscalationPrompt: new Date().toISOString() // Reset prompt timer when manually changed
    });
  };

  const declineEscalation = (fromMode: IntensityMode, toMode: IntensityMode) => {
    if (!activeProtocol) return;

    setActiveProtocol({
      ...activeProtocol,
      declinedEscalation: {
        date: new Date().toISOString(),
        fromMode,
        toMode
      },
      lastEscalationPrompt: new Date().toISOString()
    });
  };

  const getCheckIn = (day: number) => {
    if (!activeProtocol) return null;
    return activeProtocol.checkIns.find(ci => ci.day === day) || null;
  };

  const setAccountabilityPartner = (enabled: boolean) => {
    if (!activeProtocol) return;
    setActiveProtocol({
      ...activeProtocol,
      accountabilityPartner: { enabled, declinedAt: enabled ? undefined : new Date().toISOString() }
    });
  };

  const dismissAccountabilityPrompt = () => {
    if (!activeProtocol) return;
    setActiveProtocol({
      ...activeProtocol,
      lastAccountabilityPrompt: new Date().toISOString()
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        activeProtocol,
        completedProtocols,
        lifetimeStats,
        reminderSettings,
        startProtocol,
        completeDay,
        markSetback,
        updateReminderSettings,
        resetProtocol,
        resetAllProgress,
        isLoading,
        savePreMissionCheckIn,
        savePostMissionCheckIn,
        saveFieldNotes,
        saveWeeklyBrief,
        changeIntensity,
        declineEscalation,
        getCheckIn,
        setAccountabilityPartner,
        dismissAccountabilityPrompt
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}


export type ProtocolCategory = 
  | 'stress'
  | 'anger'
  | 'sexual'
  | 'burnout'
  | 'imposter'
  | 'relationship'
  | 'depression'
  | 'anxiety';

export type ProtocolDuration = 7 | 14 | 30;

export type IntensityMode = 'light' | 'standard' | 'intensive';

export interface IntensityHistory {
  day: number;
  mode: IntensityMode;
  changedAt: string;
}

export interface DailyMission {
  day: number;
  title: string;
  description: string;
  instructions: string[];
  whyItWorks: string;
  proTip: string;
  affirmation: string;
  estimatedTime: string;
}

export interface Protocol {
  id: string;
  title: string;
  category: ProtocolCategory;
  tagline: string;
  problem: string;
  solution: string;
  icon: string;
  durations: ProtocolDuration[];
  missions: Record<ProtocolDuration, DailyMission[]>;
}

export interface MissionCheckIn {
  day: number;
  date: string;
  preMission?: {
    stressLevel: number;
    angerLevel: number;
    focusLevel: number;
  };
  postMission?: {
    completed: boolean;
    didHelp: boolean | null; // null means skipped
  };
  fieldNotes?: string; // Optional tactical debrief notes (max 300 chars)
  fieldNotesEditedAt?: string; // Timestamp of last edit
}

export interface WeeklyBrief {
  weekNumber: number;
  day: number;
  generatedAt: string;
  briefData: any; // CommandersBriefData from utils
}

export interface UserProgress {
  protocolId: string;
  duration: ProtocolDuration;
  currentDay: number;
  completedDays: number[];
  startDate: string;
  lastCompletedDate?: string;
  streak: number;
  longestStreak: number;
  totalMissionsCompleted: number;
  setbacks: Array<{
    day: number;
    date: string;
    note?: string;
  }>;
  checkIns: MissionCheckIn[];
  weeklyBriefs?: WeeklyBrief[];
  intensityMode?: IntensityMode;
  intensityHistory?: IntensityHistory[];
  lastEscalationPrompt?: string;
  declinedEscalation?: {
    date: string;
    fromMode: IntensityMode;
    toMode: IntensityMode;
  } | null;
  accountabilityPartner?: {
    enabled: boolean;
    declinedAt?: string;
  };
  lastAccountabilityPrompt?: string;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format (24-hour)
  notificationsPermission: 'granted' | 'denied' | 'default';
}

export interface CompletedProtocol {
  protocolId: string;
  duration: ProtocolDuration;
  completedDate: string;
}

export interface LifetimeStats {
  totalMissionsCompleted: number;
  totalProtocolsCompleted: number;
  longestStreak: number;
}

export interface ProgressState {
  activeProtocol?: UserProgress;
  completedProtocols: CompletedProtocol[];
  totalStreak: number;
  lifetimeStats: LifetimeStats;
  reminderSettings: ReminderSettings;
}

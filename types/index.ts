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

export interface AssessmentAnswers {
  q1: string;          // presenting problem
  q2: string;          // duration of issue
  q3: string;          // work impact
  q4: string;          // relationship impact
  q5: string;          // prior attempts
  severity: number;    // 1-10
  confidence: number;  // 1-10
}

export interface ProtocolAssessment {
  answers: AssessmentAnswers;
  takenAt: string;                      // ISO timestamp
  phase: 'baseline' | 'closing';
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
  baselineAssessment?: ProtocolAssessment;
  closingAssessment?: ProtocolAssessment;
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
  startedDate: string;
  baselineAssessment?: ProtocolAssessment;
  closingAssessment?: ProtocolAssessment;
  checkInSummary?: {
    openingAverage: { stress: number; anger: number; focus: number };
    closingAverage: { stress: number; anger: number; focus: number };
    checkInsRecorded: number;
    checkInsExpected: number;
  };
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

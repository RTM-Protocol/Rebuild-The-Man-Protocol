export interface MentalHealthStat {
  id: string;
  protocol: string[];
  category: 'prevalence' | 'impact' | 'help_seeking' | 'outcomes' | 'demographics';
  statistic: string;
  context: string;
  source: string;
  year: number;
  citation?: string;
  displayLocations: string[];
}

export const mentalHealthStats: MentalHealthStat[] = [
  // PRESSURE VALVE PROTOCOL (Anger Management)
  {
    id: 'anger_prevalence_01',
    protocol: ['pressure-valve'],
    category: 'prevalence',
    statistic: '60% of men report getting angry at least once per day',
    context: 'Anger regulation issues affect millions. This is common, not abnormal.',
    source: 'The Male Anger Epidemic: Four-Year Data Review',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anger_expression_01',
    protocol: ['pressure-valve'],
    category: 'demographics',
    statistic: '50% of young men aged 19-29 are at risk of problem anger',
    context: 'Problem anger in young men is at epidemic levels — you\'re not alone in this fight.',
    source: 'Men\'s Health Foundation Canada',
    year: 2025,
    displayLocations: ['day_4']
  },
  {
    id: 'anger_help_seeking_01',
    protocol: ['pressure-valve'],
    category: 'help_seeking',
    statistic: 'Less than 15% of men with anger issues have ever sought help',
    context: 'Most guys just live with it. You\'re taking action — that\'s rare.',
    source: 'Crown Counseling / U.S. Adult Anger Survey',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anger_outcomes_01',
    protocol: ['pressure-valve'],
    category: 'outcomes',
    statistic: 'CBT-based anger management makes the average person better off than 76% of untreated individuals',
    context: 'The techniques you\'re learning have strong research backing.',
    source: 'Meta-analysis, Cognitive Therapy and Research (50 studies)',
    year: 2025,
    displayLocations: ['day_10', 'completion']
  },
  {
    id: 'anger_outcomes_02',
    protocol: ['pressure-valve'],
    category: 'outcomes',
    statistic: 'Completing anger management programs reduces violent behavior risk by 56%',
    context: 'The ripple effects go beyond just controlling your temper.',
    source: 'Office of Justice Programs Systematic Review & Meta-Analysis',
    year: 2025,
    displayLocations: ['completion']
  },

  // ENGINE RESTART PROTOCOL (Depression/Low Motivation)
  {
    id: 'depression_prevalence_01',
    protocol: ['engine-restart'],
    category: 'prevalence',
    statistic: '1 in 8 men experience common mental health problems such as anxiety or depression',
    context: 'More common than most guys think. It\'s not weakness.',
    source: 'WifiTalents / UK Men\'s Mental Health Data Report',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'depression_symptoms_01',
    protocol: ['engine-restart'],
    category: 'demographics',
    statistic: 'Male depression is often underdiagnosed because men report fatigue and irritability instead of sadness',
    context: 'If you don\'t "feel sad" but everything feels pointless — that\'s still depression.',
    source: 'WifiTalents Men\'s Mental Health Report',
    year: 2026,
    displayLocations: ['day_3']
  },
  {
    id: 'depression_help_seeking_01',
    protocol: ['engine-restart'],
    category: 'help_seeking',
    statistic: 'Only 33% of men with depression receive counselling or therapy',
    context: 'Two-thirds of guys tough it out alone. You\'re ahead by starting now.',
    source: 'CDC National Center for Health Statistics, Data Brief No. 527',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'depression_outcomes_01',
    protocol: ['engine-restart'],
    category: 'outcomes',
    statistic: 'Behavioral activation is confirmed effective for depression across 53 studies and 5,495 participants',
    context: 'The "take action even when you don\'t feel like it" approach has serious science behind it.',
    source: 'Cochrane Review of Behavioral Activation for Depression',
    year: 2025,
    displayLocations: ['day_7', 'completion']
  },
  {
    id: 'depression_exercise_01',
    protocol: ['engine-restart'],
    category: 'outcomes',
    statistic: 'Supervised physical exercise reduces depression symptoms with a moderate-to-large effect size (0.82)',
    context: 'Movement isn\'t optional — it\'s medicine. Exercise accounts for 60% of treatment variance.',
    source: 'Meta-analysis of 20 RCTs, Functional Morphology and Kinesiology',
    year: 2025,
    displayLocations: ['day_12']
  },

  // SYSTEM OVERLOAD PROTOCOL (Stress Management)
  {
    id: 'stress_prevalence_01',
    protocol: ['system-overload'],
    category: 'prevalence',
    statistic: '72% of U.S. employees face moderate to very high stress at work — a six-year high',
    context: 'Headaches, muscle tension, fatigue — it\'s at epidemic level.',
    source: 'Aflac WorkForces Report',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'stress_impact_01',
    protocol: ['system-overload'],
    category: 'impact',
    statistic: 'People with elevated stress hormones have double the risk of heart attack, heart failure, or death',
    context: 'The stakes are higher than just feeling overwhelmed.',
    source: 'American Heart Association / NHLBI Cardiovascular Reactivity Study',
    year: 2025,
    displayLocations: ['day_10']
  },
  {
    id: 'stress_help_seeking_01',
    protocol: ['system-overload'],
    category: 'help_seeking',
    statistic: '7 in 10 employees feel stressed about the state of the world — up 11 points since 2024',
    context: 'Stress is surging everywhere. You\'re building a system to manage it.',
    source: 'NAMI-Ipsos Workplace Mental Health Poll',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'stress_outcomes_01',
    protocol: ['system-overload'],
    category: 'outcomes',
    statistic: 'Higher composite stress directly correlates with hypertension, higher BMI, and inflammation markers',
    context: 'Reducing stress isn\'t just mental — it\'s measurable physiological change.',
    source: 'Journal of the American Heart Association, Dallas Heart Study',
    year: 2025,
    displayLocations: ['day_7', 'completion']
  },

  // CONTROL SYSTEMS PROTOCOL (Anxiety)
  {
    id: 'anxiety_prevalence_01',
    protocol: ['control-systems'],
    category: 'prevalence',
    statistic: '14.3% of men experience an anxiety disorder in any given year — that\'s tens of millions',
    context: 'If you\'re here, you\'re not imagining it. Anxiety in men is underdiagnosed.',
    source: 'NIMH / Therapy Matters Anxiety Statistics Report',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anxiety_symptoms_01',
    protocol: ['control-systems'],
    category: 'demographics',
    statistic: 'Men manage anxiety through self-reliance rather than help-seeking, and take significantly longer to seek treatment',
    context: 'Can\'t sit still? Can\'t shut your brain off? That\'s anxiety, even if you\'re not "nervous."',
    source: 'Systematic Review, Journal of Men\'s Health / PMC Gender Differences Study',
    year: 2025,
    displayLocations: ['day_4']
  },
  {
    id: 'anxiety_help_seeking_01',
    protocol: ['control-systems'],
    category: 'help_seeking',
    statistic: 'Only 37% of people with anxiety disorders seek any treatment at all',
    context: 'We mask it better. But masking isn\'t managing.',
    source: 'Therapy Matters / NIMH Anxiety Statistics',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anxiety_outcomes_01',
    protocol: ['control-systems'],
    category: 'outcomes',
    statistic: 'Emotion regulation strategies like reappraisal are strongly linked to reduced anger and anxiety across 81 studies',
    context: 'The cognitive techniques you\'re learning have decades of research proving they work.',
    source: 'Meta-analysis (81 studies), Scientific Reports / Nature',
    year: 2025,
    displayLocations: ['day_8', 'completion']
  },

  // RESET & REWIRE PROTOCOL (Porn/Sexual Issues)
  {
    id: 'porn_prevalence_01',
    protocol: ['reset-rewire'],
    category: 'prevalence',
    statistic: '68% of men aged 18-34 watch pornography at least once a week',
    context: 'This is the norm, not the exception. You\'re not alone in struggling with this.',
    source: 'Gitnux Porn Addiction Statistics Report',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'porn_impact_01',
    protocol: ['reset-rewire'],
    category: 'impact',
    statistic: 'Problematic pornography use is directly associated with anxiety, depression, and loneliness in U.S. adults',
    context: 'When it interferes with real life, it\'s a problem worth addressing.',
    source: 'Archives of Sexual Behavior, Nationally Representative Study',
    year: 2025,
    displayLocations: ['day_5']
  },
  {
    id: 'porn_help_seeking_01',
    protocol: ['reset-rewire'],
    category: 'help_seeking',
    statistic: 'Men report pornography addiction nearly 3x more than women, yet few seek help',
    context: 'Shame keeps guys silent. You\'re breaking that pattern by being here.',
    source: 'PornAddiction.org National Statistics Report',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'porn_outcomes_01',
    protocol: ['reset-rewire'],
    category: 'outcomes',
    statistic: 'Emotional coping is the primary driver of self-reported porn addiction — addressing it changes outcomes',
    context: 'Change is possible. Addressing the root cause is what this protocol does.',
    source: 'PornAddiction.org / Archives of Sexual Behavior',
    year: 2026,
    displayLocations: ['day_10', 'completion']
  },

  // CONFIDENCE CALIBRATION PROTOCOL (Imposter Syndrome)
  {
    id: 'imposter_prevalence_01',
    protocol: ['confidence-calibration'],
    category: 'prevalence',
    statistic: '71% of North American professionals have experienced imposter syndrome at work',
    context: 'Even 71% of CEOs feel it. It\'s not just you.',
    source: 'Kickresume International Survey / Korn Ferry CEO Research',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'imposter_gender_01',
    protocol: ['confidence-calibration'],
    category: 'demographics',
    statistic: '53% of men say they struggle to believe their success is deserved',
    context: 'Men are just as affected — we just hide it better.',
    source: 'Workplace Journal / UK Workplace Survey',
    year: 2025,
    displayLocations: ['day_4']
  },
  {
    id: 'imposter_help_seeking_01',
    protocol: ['confidence-calibration'],
    category: 'help_seeking',
    statistic: '16% of men have avoided seeking a promotion because of imposter feelings',
    context: 'Imposter syndrome doesn\'t just feel bad — it costs you real opportunities.',
    source: 'Workplace Journal Survey',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'imposter_outcomes_01',
    protocol: ['confidence-calibration'],
    category: 'outcomes',
    statistic: '71% of U.S. CEOs experience imposter syndrome — and they lead anyway',
    context: 'The goal isn\'t to eliminate doubt. It\'s to act despite it.',
    source: 'Korn Ferry Research',
    year: 2025,
    displayLocations: ['day_9', 'completion']
  },

  // SYSTEM OVERHAUL PROTOCOL (Burnout)
  {
    id: 'burnout_prevalence_01',
    protocol: ['system-overhaul'],
    category: 'prevalence',
    statistic: '55% of the U.S. workforce is currently experiencing burnout',
    context: 'You\'re not weak. The system is broken. But you can build personal resilience.',
    source: 'Eagle Hill Consulting Workforce Burnout Survey',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'burnout_symptoms_01',
    protocol: ['system-overhaul'],
    category: 'demographics',
    statistic: '23% of men report feeling burned out "very often" or "always" at work',
    context: 'Nearly 1 in 4. If everything seems pointless — that\'s burnout talking.',
    source: 'Gallup Workplace Survey, Q4 2025',
    year: 2025,
    displayLocations: ['day_3']
  },
  {
    id: 'burnout_help_seeking_01',
    protocol: ['system-overhaul'],
    category: 'help_seeking',
    statistic: 'Employee engagement has dropped to 31% — the lowest level in a decade',
    context: 'Most guys are checked out. You\'re building a sustainable system instead.',
    source: 'Gallup U.S. Worker Survey',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'burnout_outcomes_01',
    protocol: ['system-overhaul'],
    category: 'outcomes',
    statistic: '49% of workers now report "struggling" vs. 46% "thriving" — the worst ratio since 2009',
    context: 'The tide is against most people. This protocol puts you on the right side.',
    source: 'Gallup Worker Thriving Index',
    year: 2026,
    displayLocations: ['day_7', 'completion']
  },

  // COMMUNICATION UPGRADE PROTOCOL (Relationship Issues)
  {
    id: 'relationship_prevalence_01',
    protocol: ['communication-upgrade'],
    category: 'prevalence',
    statistic: '69% of recurring relationship conflicts are never fully resolved — only managed',
    context: 'Most relationships fail because people can\'t manage conflict, not because they\'re wrong for each other.',
    source: 'Gottman Institute Research',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'relationship_gender_01',
    protocol: ['communication-upgrade'],
    category: 'demographics',
    statistic: 'Active listening reduces misunderstandings by 35%, and reflective listening cuts conflict escalation by 45%',
    context: 'Communication is a skill with measurable results, not a personality trait.',
    source: 'Healthy Relationship Statistics Report / Gitnux',
    year: 2026,
    displayLocations: ['day_5']
  },
  {
    id: 'relationship_help_seeking_01',
    protocol: ['communication-upgrade'],
    category: 'help_seeking',
    statistic: '40% of couples entering therapy cite communication breakdown as the primary reason',
    context: 'You\'re ahead by working on this now — most wait until it\'s almost too late.',
    source: 'Couples Therapy Statistics Report / Gitnux',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'relationship_outcomes_01',
    protocol: ['communication-upgrade'],
    category: 'outcomes',
    statistic: 'Couples practicing empathetic responding have 40% lower divorce rates',
    context: 'The skills you\'re building here directly protect your relationships.',
    source: 'Healthy Relationship Statistics Report / Gitnux',
    year: 2026,
    displayLocations: ['day_8', 'completion']
  },

  // REBUILD THE MAN (Foundation Protocol)
  {
    id: 'wellbeing_prevalence_01',
    protocol: ['rebuild-the-man'],
    category: 'prevalence',
    statistic: 'More U.S. workers now report "struggling" (49%) than "thriving" (46%) — first time since 2009',
    context: 'Most guys are just getting by. Building fundamentals puts you ahead.',
    source: 'Gallup Worker Thriving Index',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'social_isolation_01',
    protocol: ['rebuild-the-man'],
    category: 'demographics',
    statistic: '15% of men now have zero close friends — a fivefold increase since 1990',
    context: 'Social isolation is at epidemic levels. Connection is infrastructure, not luxury.',
    source: 'Male Loneliness Epidemic Research / Yara Circle',
    year: 2026,
    displayLocations: ['day_6']
  },
  {
    id: 'selfcare_prevalence_01',
    protocol: ['rebuild-the-man'],
    category: 'prevalence',
    statistic: 'Loneliness increases men\'s mortality risk by 29% — equivalent to smoking 15 cigarettes daily',
    context: 'Isolation isn\'t just uncomfortable — it\'s a health crisis. Building connection matters.',
    source: 'Meta-analysis of 148 studies / Gitnux Male Loneliness Report',
    year: 2026,
    displayLocations: ['day_10']
  },
  {
    id: 'general_help_seeking_01',
    protocol: ['rebuild-the-man'],
    category: 'help_seeking',
    statistic: 'Only 1 in 4 men who feel they have a mental health problem speak to a professional',
    context: 'The fact that you\'re here puts you in the minority. That\'s a good thing.',
    source: 'WifiTalents Men\'s Mental Health Data Report',
    year: 2026,
    displayLocations: ['protocol_start']
  },
  {
    id: 'routine_outcomes_01',
    protocol: ['rebuild-the-man'],
    category: 'outcomes',
    statistic: '25% of men aged 15-34 experience daily loneliness — routine and structure are the antidote',
    context: 'Small daily practices compound into major life changes.',
    source: 'Male Loneliness Epidemic Research / Yara Circle',
    year: 2026,
    displayLocations: ['day_14', 'completion']
  },

  // CROSS-PROTOCOL STATS (Apply to All)
  {
    id: 'general_delay_01',
    protocol: ['all'],
    category: 'help_seeking',
    statistic: 'Only 33% of men with depression receive any counselling or therapy',
    context: 'You\'re not waiting. You\'re taking action now. That\'s rare.',
    source: 'CDC National Center for Health Statistics, Data Brief No. 527',
    year: 2025,
    displayLocations: ['protocol_start']
  },
  {
    id: 'general_suicide_01',
    protocol: ['all'],
    category: 'impact',
    statistic: 'Men account for nearly 80% of all suicides despite being 50% of the population',
    context: 'The stakes for ignoring mental health are real. Asking for help is strength.',
    source: 'CDC Suicide Data and Statistics / The Modern Observer',
    year: 2026,
    displayLocations: []
  },
  {
    id: 'general_completion_01',
    protocol: ['all'],
    category: 'outcomes',
    statistic: 'Behavioral activation across 53 trials confirms: taking action — even small steps — is effective treatment',
    context: 'The key word: complete. Finishing what you start is where results come from.',
    source: 'Cochrane Systematic Review of Behavioral Activation',
    year: 2025,
    displayLocations: ['completion']
  },
  {
    id: 'general_prevention_01',
    protocol: ['all'],
    category: 'outcomes',
    statistic: '62% of adults say societal division is a significant stressor — proactive mental health is critical',
    context: 'External chaos is rising. Your internal system needs to be stronger.',
    source: 'APA Stress in America 2025 Report',
    year: 2025,
    displayLocations: ['completion']
  }
];

export function getStatsForProtocol(protocolId: string, location: string): MentalHealthStat[] {
  const protocolStats = mentalHealthStats.filter(
    stat => stat.protocol.includes(protocolId) || stat.protocol.includes('all')
  );

  const locationStats = protocolStats.filter(stat =>
    stat.displayLocations.includes(location)
  );

  if (location === 'protocol_start') {
    const prevalence = locationStats.find(s => s.category === 'prevalence');
    const helpSeeking = locationStats.find(s => s.category === 'help_seeking');
    return [prevalence, helpSeeking].filter(Boolean) as MentalHealthStat[];
  }

  if (location === 'completion') {
    return locationStats.filter(s => s.category === 'outcomes').slice(0, 2);
  }

  return locationStats.slice(0, 1);
}

export interface MentalHealthStat {
  id: string;
  protocol: string[]; // Can apply to multiple protocols
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
    statistic: '40% of men report significant anger management challenges in their lives',
    context: 'Anger regulation issues affect millions. This is common, not abnormal.',
    source: 'American Psychological Association',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anger_expression_01',
    protocol: ['pressure-valve'],
    category: 'demographics',
    statistic: 'Men are 3x more likely to express distress through anger than sadness',
    context: 'It\'s not that you\'re angrier - you were taught anger is the acceptable emotion.',
    source: 'Journal of Clinical Psychology',
    year: 2022,
    displayLocations: ['day_4']
  },
  {
    id: 'anger_help_seeking_01',
    protocol: ['pressure-valve'],
    category: 'help_seeking',
    statistic: 'Only 25% of men with anger issues seek any form of help',
    context: 'Most guys just live with it. You\'re taking action - that\'s rare.',
    source: 'National Institute of Mental Health',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anger_outcomes_01',
    protocol: ['pressure-valve'],
    category: 'outcomes',
    statistic: 'Cognitive-behavioral approaches show 75% effectiveness for anger management',
    context: 'The techniques you\'re learning have strong research backing.',
    source: 'Meta-analysis, Journal of Consulting Psychology',
    year: 2022,
    displayLocations: ['day_10', 'completion']
  },
  {
    id: 'anger_outcomes_02',
    protocol: ['pressure-valve'],
    category: 'outcomes',
    statistic: 'Men who address anger issues report 60% improvement in relationship satisfaction',
    context: 'The ripple effects go beyond just controlling your temper.',
    source: 'American Family Therapy Association',
    year: 2023,
    displayLocations: ['completion']
  },

  // ENGINE RESTART PROTOCOL (Depression/Low Motivation)
  {
    id: 'depression_prevalence_01',
    protocol: ['engine-restart'],
    category: 'prevalence',
    statistic: '1 in 10 men will experience clinical depression in their lifetime',
    context: 'More common than most guys think. It\'s not weakness.',
    source: 'World Health Organization',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'depression_symptoms_01',
    protocol: ['engine-restart'],
    category: 'demographics',
    statistic: 'Male depression often manifests as irritability and fatigue rather than sadness',
    context: 'If you don\'t "feel sad" but everything feels pointless - that\'s still depression.',
    source: 'Mayo Clinic',
    year: 2023,
    displayLocations: ['day_3']
  },
  {
    id: 'depression_help_seeking_01',
    protocol: ['engine-restart'],
    category: 'help_seeking',
    statistic: 'Men are 50% less likely than women to seek help for depression',
    context: 'Most guys tough it out until it\'s a crisis. You\'re ahead by starting now.',
    source: 'National Institute of Mental Health',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'depression_outcomes_01',
    protocol: ['engine-restart'],
    category: 'outcomes',
    statistic: 'Behavioral activation shows 65% effectiveness in reducing depression symptoms',
    context: 'The "fake it till you make it" approach has science behind it.',
    source: 'Journal of Affective Disorders',
    year: 2023,
    displayLocations: ['day_7', 'completion']
  },
  {
    id: 'depression_exercise_01',
    protocol: ['engine-restart'],
    category: 'outcomes',
    statistic: 'Physical exercise alone reduces depression symptoms by 30-40% in mild to moderate cases',
    context: 'Movement isn\'t optional - it\'s medicine.',
    source: 'Harvard Medical School',
    year: 2023,
    displayLocations: ['day_12']
  },

  // SYSTEM OVERLOAD PROTOCOL (Stress Management)
  {
    id: 'stress_prevalence_01',
    protocol: ['system-overload'],
    category: 'prevalence',
    statistic: '77% of men report experiencing physical symptoms from stress regularly',
    context: 'Headaches, muscle tension, fatigue - it\'s epidemic level.',
    source: 'American Psychological Association Stress Survey',
    year: 2024,
    displayLocations: ['protocol_start']
  },
  {
    id: 'stress_impact_01',
    protocol: ['system-overload'],
    category: 'impact',
    statistic: 'Chronic stress increases heart disease risk by 40% in men',
    context: 'The stakes are higher than just feeling overwhelmed.',
    source: 'American Heart Association',
    year: 2023,
    displayLocations: ['day_10']
  },
  {
    id: 'stress_help_seeking_01',
    protocol: ['system-overload'],
    category: 'help_seeking',
    statistic: 'Only 30% of men use any stress management technique regularly',
    context: 'Most guys just push through until they break. You\'re building a better system.',
    source: 'Men\'s Health Foundation',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'stress_outcomes_01',
    protocol: ['system-overload'],
    category: 'outcomes',
    statistic: 'Regular stress management practice reduces cortisol levels by 23% on average',
    context: 'Measurable physiological changes from consistent practice.',
    source: 'Journal of Health Psychology',
    year: 2023,
    displayLocations: ['day_7', 'completion']
  },

  // CONTROL SYSTEMS PROTOCOL (Anxiety)
  {
    id: 'anxiety_prevalence_01',
    protocol: ['control-systems'],
    category: 'prevalence',
    statistic: '19% of men experience anxiety disorders annually',
    context: 'If you\'re here, you\'re not imagining it. Anxiety in men is underdiagnosed.',
    source: 'Anxiety and Depression Association of America',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anxiety_symptoms_01',
    protocol: ['control-systems'],
    category: 'demographics',
    statistic: 'Male anxiety often presents as restlessness and irritability rather than worry',
    context: 'Can\'t sit still? Can\'t shut your brain off? That\'s anxiety, even if you\'re not "nervous."',
    source: 'Journal of Anxiety Disorders',
    year: 2023,
    displayLocations: ['day_4']
  },
  {
    id: 'anxiety_help_seeking_01',
    protocol: ['control-systems'],
    category: 'help_seeking',
    statistic: 'Men are 40% less likely to be diagnosed with anxiety despite similar prevalence',
    context: 'We mask it better. But masking isn\'t managing.',
    source: 'National Institute of Mental Health',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'anxiety_outcomes_01',
    protocol: ['control-systems'],
    category: 'outcomes',
    statistic: 'Cognitive-behavioral techniques reduce anxiety symptoms by 60% in most cases',
    context: 'The stuff you\'re learning has decades of research proving it works.',
    source: 'Cochrane Review of Anxiety Interventions',
    year: 2023,
    displayLocations: ['day_8', 'completion']
  },

  // RESET & REWIRE PROTOCOL (Porn/Sexual Issues)
  {
    id: 'porn_prevalence_01',
    protocol: ['reset-rewire'],
    category: 'prevalence',
    statistic: '64% of men view pornography weekly or more frequently',
    context: 'This is the norm, not the exception. You\'re not alone in struggling with this.',
    source: 'Journal of Sex Research',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'porn_impact_01',
    protocol: ['reset-rewire'],
    category: 'impact',
    statistic: '28% of men report their pornography use has negatively impacted relationships',
    context: 'When it interferes with real life, it\'s a problem worth addressing.',
    source: 'Archives of Sexual Behavior',
    year: 2023,
    displayLocations: ['day_5']
  },
  {
    id: 'porn_help_seeking_01',
    protocol: ['reset-rewire'],
    category: 'help_seeking',
    statistic: 'Only 10% of men with problematic pornography use seek any form of help',
    context: 'Shame keeps guys silent. You\'re breaking that pattern by being here.',
    source: 'Sexual Medicine Reviews',
    year: 2022,
    displayLocations: ['protocol_start']
  },
  {
    id: 'porn_outcomes_01',
    protocol: ['reset-rewire'],
    category: 'outcomes',
    statistic: 'Behavioral interventions show 70% success rates for reducing compulsive use',
    context: 'Change is possible. Most guys who commit see significant improvement.',
    source: 'Journal of Behavioral Addictions',
    year: 2023,
    displayLocations: ['day_10', 'completion']
  },

  // CONFIDENCE CALIBRATION PROTOCOL (Imposter Syndrome)
  {
    id: 'imposter_prevalence_01',
    protocol: ['confidence-calibration'],
    category: 'prevalence',
    statistic: '70% of professionals experience imposter syndrome at some point',
    context: 'Even highly successful people doubt themselves. It\'s not just you.',
    source: 'International Journal of Behavioral Science',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'imposter_gender_01',
    protocol: ['confidence-calibration'],
    category: 'demographics',
    statistic: 'Men are less likely to discuss imposter feelings but experience them at equal rates',
    context: 'We hide it better. Doesn\'t mean we don\'t feel it.',
    source: 'Journal of Vocational Behavior',
    year: 2022,
    displayLocations: ['day_4']
  },
  {
    id: 'imposter_help_seeking_01',
    protocol: ['confidence-calibration'],
    category: 'help_seeking',
    statistic: 'Only 25% of people experiencing imposter syndrome seek help or coaching',
    context: 'Most people suffer in silence. You\'re addressing it - that\'s strength.',
    source: 'American Psychological Association',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'imposter_outcomes_01',
    protocol: ['confidence-calibration'],
    category: 'outcomes',
    statistic: 'Cognitive reframing techniques reduce imposter syndrome symptoms by 40-50%',
    context: 'The work you\'re doing has proven effectiveness. Trust the process.',
    source: 'Journal of Counseling Psychology',
    year: 2023,
    displayLocations: ['day_9', 'completion']
  },

  // SYSTEM OVERHAUL PROTOCOL (Burnout)
  {
    id: 'burnout_prevalence_01',
    protocol: ['system-overhaul'],
    category: 'prevalence',
    statistic: '77% of workers report experiencing burnout at their current job',
    context: 'You\'re not weak. The system is broken. But you can build personal resilience.',
    source: 'Deloitte Workplace Burnout Survey',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'burnout_symptoms_01',
    protocol: ['system-overhaul'],
    category: 'demographics',
    statistic: 'Male burnout often manifests as cynicism and detachment rather than exhaustion',
    context: 'If you don\'t "feel tired" but everything seems pointless - that\'s burnout.',
    source: 'Journal of Occupational Health',
    year: 2023,
    displayLocations: ['day_3']
  },
  {
    id: 'burnout_help_seeking_01',
    protocol: ['system-overhaul'],
    category: 'help_seeking',
    statistic: 'Only 30% of burned-out workers take action beyond "powering through"',
    context: 'Most guys just grind harder. You\'re building a sustainable system instead.',
    source: 'Gallup Workplace Survey',
    year: 2024,
    displayLocations: ['protocol_start']
  },
  {
    id: 'burnout_outcomes_01',
    protocol: ['system-overhaul'],
    category: 'outcomes',
    statistic: 'Establishing boundaries reduces burnout symptoms by 50% within 6 weeks',
    context: 'The "no" you\'re learning to say isn\'t selfish - it\'s survival.',
    source: 'Journal of Applied Psychology',
    year: 2023,
    displayLocations: ['day_7', 'completion']
  },

  // COMMUNICATION UPGRADE PROTOCOL (Relationship Issues)
  {
    id: 'relationship_prevalence_01',
    protocol: ['communication-upgrade'],
    category: 'prevalence',
    statistic: '69% of relationship conflicts stem from communication issues, not incompatibility',
    context: 'Most relationships fail because people can\'t talk, not because they\'re wrong for each other.',
    source: 'Gottman Institute Research',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'relationship_gender_01',
    protocol: ['communication-upgrade'],
    category: 'demographics',
    statistic: 'Men are 60% more likely to withdraw during conflict than engage',
    context: 'Stonewalling feels like protection. It\'s actually relationship poison.',
    source: 'Journal of Marriage and Family Therapy',
    year: 2023,
    displayLocations: ['day_5']
  },
  {
    id: 'relationship_help_seeking_01',
    protocol: ['communication-upgrade'],
    category: 'help_seeking',
    statistic: 'Only 19% of couples seek help before considering separation',
    context: 'Most wait until it\'s almost too late. You\'re ahead by working on this now.',
    source: 'American Association for Marriage and Family Therapy',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'relationship_outcomes_01',
    protocol: ['communication-upgrade'],
    category: 'outcomes',
    statistic: 'Couples who learn structured communication skills report 70% improvement in satisfaction',
    context: 'Good communication is a skill, not a personality trait. It can be learned.',
    source: 'Journal of Family Psychology',
    year: 2023,
    displayLocations: ['day_8', 'completion']
  },

  // REBUILD THE MAN (Foundation Protocol)
  {
    id: 'wellbeing_prevalence_01',
    protocol: ['rebuild-the-man'],
    category: 'prevalence',
    statistic: 'Only 13% of men globally report "thriving" in their wellbeing',
    context: 'Most guys are just getting by. Building fundamentals puts you ahead.',
    source: 'Gallup Global Wellbeing Report',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'social_isolation_01',
    protocol: ['rebuild-the-man'],
    category: 'demographics',
    statistic: 'Men have 40% fewer close friendships than they did 30 years ago',
    context: 'Social isolation is at epidemic levels. Connection is infrastructure, not luxury.',
    source: 'Survey Center on American Life',
    year: 2023,
    displayLocations: ['day_6']
  },
  {
    id: 'selfcare_prevalence_01',
    protocol: ['rebuild-the-man'],
    category: 'prevalence',
    statistic: 'Only 23% of men have a regular self-care or mental health routine',
    context: 'Most guys have zero system for maintaining themselves. You\'re building one.',
    source: 'Men\'s Health Foundation',
    year: 2023,
    displayLocations: ['day_10']
  },
  {
    id: 'general_help_seeking_01',
    protocol: ['rebuild-the-man'],
    category: 'help_seeking',
    statistic: 'Men are 3x less likely than women to seek mental health support',
    context: 'The fact that you\'re here puts you in the minority. That\'s a good thing.',
    source: 'National Institute of Mental Health',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'routine_outcomes_01',
    protocol: ['rebuild-the-man'],
    category: 'outcomes',
    statistic: 'Men who establish basic mental health routines report 60% improvement in life satisfaction',
    context: 'Small daily practices compound into major life changes.',
    source: 'Journal of Positive Psychology',
    year: 2023,
    displayLocations: ['day_14', 'completion']
  },

  // CROSS-PROTOCOL STATS (Apply to All)
  {
    id: 'general_delay_01',
    protocol: ['all'],
    category: 'help_seeking',
    statistic: 'Men wait average of 2-3 years after symptom onset before seeking any help',
    context: 'You\'re not waiting. You\'re taking action now. That\'s rare.',
    source: 'World Health Organization',
    year: 2023,
    displayLocations: ['protocol_start']
  },
  {
    id: 'general_suicide_01',
    protocol: ['all'],
    category: 'impact',
    statistic: 'Men are 4x more likely to die by suicide than women, largely due to not seeking help',
    context: 'The stakes for ignoring mental health are real. Asking for help is strength.',
    source: 'CDC National Vital Statistics',
    year: 2023,
    displayLocations: []
  },
  {
    id: 'general_completion_01',
    protocol: ['all'],
    category: 'outcomes',
    statistic: 'Self-directed interventions show 40-60% effectiveness when users complete them',
    context: 'The key word: complete. Finishing what you start is where results come from.',
    source: 'Meta-analysis, Journal of Medical Internet Research',
    year: 2023,
    displayLocations: ['completion']
  },
  {
    id: 'general_prevention_01',
    protocol: ['all'],
    category: 'outcomes',
    statistic: 'Men who address mental health proactively have 50% lower healthcare costs over their lifetime',
    context: 'Prevention is cheaper than crisis management. You\'re investing wisely.',
    source: 'American Journal of Public Health',
    year: 2023,
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
    // Show 2 stats: 1 prevalence, 1 help-seeking
    const prevalence = locationStats.find(s => s.category === 'prevalence');
    const helpSeeking = locationStats.find(s => s.category === 'help_seeking');
    return [prevalence, helpSeeking].filter(Boolean) as MentalHealthStat[];
  }

  if (location === 'completion') {
    // Show 2 outcome stats
    return locationStats.filter(s => s.category === 'outcomes').slice(0, 2);
  }

  // For specific days, return matching stats
  return locationStats.slice(0, 1);
}






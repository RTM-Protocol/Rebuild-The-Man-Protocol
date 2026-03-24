export interface EmergencyProtocol {
  id: string;
  name: string;
  useWhen: string;
  estimatedTime: string;
  icon: string;
  steps: Array<{
    title: string;
    duration: string;
    instructions: string[];
  }>;
  whyItWorks: string;
  note?: string;
  avoid?: string;
}

export const emergencyProtocols: EmergencyProtocol[] = [
  {
    id: 'anger-spike',
    name: 'Anger Spike Protocol',
    useWhen: 'You feel rage building, about to snap, fists clenched, seeing red',
    estimatedTime: '3 minutes',
    icon: '🔥',
    steps: [
      {
        title: 'TACTICAL PAUSE',
        duration: '60 seconds',
        instructions: [
          'Stop talking immediately. Don\'t finish the sentence.',
          'Leave the room. No explanation needed - just go.',
          'If you can\'t leave, turn away and look at the floor.',
          'This buys you time before you do something you\'ll regret.'
        ]
      },
      {
        title: 'RESET YOUR SYSTEM',
        duration: '90 seconds',
        instructions: [
          'Box breathing: 4 counts in, 4 hold, 4 out, 4 hold',
          'Do this 5 times minimum. Focus only on counting.',
          'Clench and release your fists 10 times while breathing.',
          'Your anger spikes in 3 seconds but takes 20 minutes to fully calm. You\'re buying time.'
        ]
      },
      {
        title: 'DECISION POINT',
        duration: '30 seconds',
        instructions: [
          'Ask yourself: "If I go back in there right now, will I make it worse?"',
          'If yes: stay away for 20 more minutes. Text "need a minute" if necessary.',
          'If no: return, but speak slowly and keep your hands visible.'
        ]
      }
    ],
    whyItWorks: 'Your prefrontal cortex (thinking brain) goes offline when anger spikes. This protocol reboots it by forcing you to pause and engage your body. Anger is a chemical reaction - you can\'t logic your way out, but you can wait it out.',
    note: 'This is emergency brake. For long-term anger management, use the Pressure Valve Protocol.'
  },
  {
    id: 'anxiety-attack',
    name: 'Anxiety Attack Override',
    useWhen: 'Chest tight, can\'t breathe, heart racing, feel like you\'re dying, panic rising',
    estimatedTime: '5 minutes',
    icon: '🌀',
    steps: [
      {
        title: 'GROUND YOURSELF',
        duration: '90 seconds',
        instructions: [
          'You\'re not dying. This is your alarm system misfiring. Prove it to your body.',
          '',
          '5-4-3-2-1 Technique:',
          '• Name 5 things you can SEE (chair, door, phone, etc.)',
          '• Name 4 things you can TOUCH (fabric, floor, wall, etc.)',
          '• Name 3 things you can HEAR (fan, traffic, breathing, etc.)',
          '• Name 2 things you can SMELL (even if faint - air, clothes, etc.)',
          '• Name 1 thing you can TASTE (even just your mouth)',
          '',
          'Say them OUT LOUD. Forces your brain to focus externally.'
        ]
      },
      {
        title: 'CONTROLLED BREATHING',
        duration: '2 minutes',
        instructions: [
          'Your breathing is triggering more panic. Reset it.',
          'Breathe in for 4 counts (through nose)',
          'Hold for 7 counts',
          'Breathe out for 8 counts (through mouth, slowly)',
          'Repeat 5 times minimum',
          '',
          'This activates your parasympathetic nervous system (calm mode).'
        ]
      },
      {
        title: 'MOVEMENT',
        duration: '90 seconds',
        instructions: [
          'Walk slowly if you can. Doesn\'t matter where.',
          'If you can\'t walk, shift weight from foot to foot.',
          'Roll your shoulders back 10 times.',
          'Splash cold water on face if available.',
          '',
          'Movement tells your body the "threat" is over.'
        ]
      }
    ],
    whyItWorks: 'Panic attacks are false alarms. Your body thinks there\'s danger when there isn\'t. This protocol interrupts the feedback loop by engaging your senses, slowing your breathing, and moving your body - all signals that you\'re safe.',
    note: 'If panic attacks are frequent, you need the Control Systems Protocol. This is just first aid.'
  },
  {
    id: 'sleep-emergency',
    name: 'Sleep Emergency Protocol',
    useWhen: 'Can\'t fall asleep, mind racing, been lying there 30+ minutes, getting frustrated',
    estimatedTime: '5 minutes',
    icon: '😴',
    steps: [
      {
        title: 'GET UP',
        duration: 'Immediately',
        instructions: [
          'Don\'t fight it. You\'ve already lost round 1.',
          'Get out of bed. Go to different room if possible.',
          'Dim lighting only. No bright screens.',
          'You\'re breaking the frustration cycle.'
        ]
      },
      {
        title: 'BODY SCAN RELAXATION',
        duration: '3 minutes',
        instructions: [
          'Sit or lie somewhere other than your bed.',
          '',
          'Starting at your toes, tense each muscle group for 5 seconds, then release:',
          '• Toes and feet: squeeze, release',
          '• Calves: flex, release',
          '• Thighs: tighten, release',
          '• Glutes: clench, release',
          '• Stomach: tighten, release',
          '• Chest: inhale deep, exhale fully',
          '• Hands: make fists, release',
          '• Arms: flex, release',
          '• Shoulders: raise to ears, drop',
          '• Face: scrunch everything, release',
          '',
          'By the end, your body should feel heavy.'
        ]
      },
      {
        title: 'BORING RESET',
        duration: '2 minutes',
        instructions: [
          'Read something boring (manual, technical doc, old textbook)',
          'Or count backwards from 300 by 3s (300, 297, 294...)',
          'Or visualize painting a wall. Slowly. One stroke at a time.',
          '',
          'Goal: bore your brain into submission.'
        ]
      },
      {
        title: 'RETURN TO BED',
        duration: 'When drowsy',
        instructions: [
          'Only when you feel drowsy',
          'If still wired after 15 minutes, repeat Step 2'
        ]
      }
    ],
    whyItWorks: 'Lying awake frustrated creates negative association with your bed. Getting up breaks this. Progressive muscle relaxation releases physical tension. Boring mental tasks tire your brain without stimulating it.',
    note: 'If this is a nightly problem, you need better sleep hygiene. This is just emergency protocol.',
    avoid: 'Checking phone, turning on TV, eating large meal, intense exercise.'
  },
  {
    id: 'overwhelm-breaker',
    name: 'Overwhelm Circuit Breaker',
    useWhen: 'Everything feels impossible, drowning in tasks, paralyzed by options, can\'t start anything',
    estimatedTime: '4 minutes',
    icon: '⚡',
    steps: [
      {
        title: 'BRAIN DUMP',
        duration: '2 minutes',
        instructions: [
          'Grab paper or open notes app. Set timer for 2 minutes.',
          '',
          'Write EVERYTHING overwhelming you. No order, no priorities, just dump:',
          '• Tasks, worries, decisions, problems, everything',
          '• Don\'t stop writing until timer goes off',
          '• Messy is fine. This isn\'t for anyone else.',
          '',
          'Getting it out of your head frees up mental RAM.'
        ]
      },
      {
        title: 'PICK ONE',
        duration: '30 seconds',
        instructions: [
          'From that list, circle ONE thing that:',
          '• Takes less than 10 minutes',
          '• You can do RIGHT NOW',
          '• Will make you feel slightly less buried',
          '',
          'Not the most important. Not the biggest. Just ONE you can actually do.'
        ]
      },
      {
        title: 'DO IT',
        duration: '10 minutes',
        instructions: [
          'Do that one thing. Just that. Nothing else.',
          '• Reply to that email',
          '• Make that call',
          '• Clear that surface',
          '• Whatever you picked - do it now',
          '',
          'Set a timer if needed. Focus on only this.'
        ]
      },
      {
        title: 'ACKNOWLEDGE',
        duration: '30 seconds',
        instructions: [
          'You did something. It\'s small, but it\'s real.',
          'Cross it off. Take a breath.',
          '',
          'Now decide: keep going with small wins, or take a break?'
        ]
      }
    ],
    whyItWorks: 'Overwhelm is mental gridlock - too many inputs, no clear next move. This protocol breaks the paralysis by externalizing chaos (brain dump), creating a micro-decision (pick one), and generating momentum (do it). One small win often unlocks the next.',
    note: 'If overwhelm is constant, you need the System Overhaul Protocol. This is just to get unstuck.'
  },
  {
    id: 'urge-control',
    name: 'Urge Control Reset',
    useWhen: 'Strong urge to relapse (porn, drinking, smoking, etc.), craving hitting hard, about to give in',
    estimatedTime: '5 minutes',
    icon: '🛑',
    steps: [
      {
        title: 'RECOGNIZE THE WAVE',
        duration: '30 seconds',
        instructions: [
          'Urges are waves. They peak and then crash. Your job is to surf it, not fight it.',
          '',
          'Right now you\'re at the peak. It feels permanent. It\'s not.',
          '',
          'Say out loud: "This is an urge. It will pass. I don\'t have to act on it."'
        ]
      },
      {
        title: 'RIDE IT OUT',
        duration: '2 minutes',
        instructions: [
          'Use the 10-minute rule: Delay, don\'t deny.',
          '',
          'Tell yourself: "I can do this thing in 10 minutes if I still want to. But not right now."',
          '',
          'Then distract for 2 minutes:',
          '• Do 20 pushups or squats (burns the physical urge energy)',
          '• Cold water on face and wrists',
          '• Call or text someone (even if unrelated topic)',
          '• Leave your location - go outside, different room, anywhere else',
          '',
          'Physical action interrupts the urge pattern.'
        ]
      },
      {
        title: 'CHECK THE TRIGGER',
        duration: '1 minute',
        instructions: [
          'Quick analysis - why now?',
          '• Bored?',
          '• Stressed?',
          '• Lonely?',
          '• Tired?',
          '• Saw something triggering?',
          '',
          'Identify the real need under the urge.'
        ]
      },
      {
        title: 'MEET THE REAL NEED',
        duration: '2 minutes',
        instructions: [
          'Do something that addresses the actual trigger:',
          '• Bored → quick game, call friend, go for walk',
          '• Stressed → breathing exercise, cold shower',
          '• Lonely → reach out to someone',
          '• Tired → 10-minute power nap or go to bed',
          '• Triggered → remove yourself from trigger source',
          '',
          'The urge isn\'t random. It\'s usually trying to solve a different problem.'
        ]
      }
    ],
    whyItWorks: 'Urges typically peak within 15-30 minutes and then decline. You don\'t need to resist forever - just outlast the wave. By delaying and distracting, you ride it out. By identifying the trigger, you address the root cause instead of just the symptom.',
    note: 'This is emergency protocol. If urges are daily, you need Reset & Rewire Protocol or professional support. If you\'re in active addiction and experiencing withdrawal symptoms, seek medical help immediately.'
  },
  {
    id: 'conflict-deescalation',
    name: 'Relationship Conflict De-Escalation',
    useWhen: 'Argument spiraling, voices raised, saying things you\'ll regret, need to stop before damage',
    estimatedTime: '3 minutes',
    icon: '🚨',
    steps: [
      {
        title: 'CALL TIMEOUT',
        duration: '30 seconds',
        instructions: [
          'Say exactly this: "I need a timeout. This is getting heated. Let me cool down."',
          '',
          'Don\'t:',
          '• Blame them for the timeout',
          '• Storm out dramatically',
          '• Say "whatever" or dismissive remarks',
          '• Leave without saying you need space',
          '',
          'Do:',
          '• Be clear you\'re coming back',
          '• Suggest a time: "Give me 20 minutes"',
          '• Make it about YOU needing to cool down, not them being wrong'
        ]
      },
      {
        title: 'PHYSICAL RESET',
        duration: '2 minutes',
        instructions: [
          'Leave the room/situation',
          'Drink cold water slowly',
          'Walk outside if possible, or pace in different room',
          'Take 10 deep breaths',
          'Shake out your arms and legs (releases tension)',
          '',
          'Your body is in fight mode. You need to physically discharge it.'
        ]
      },
      {
        title: 'REFRAME',
        duration: '30 seconds',
        instructions: [
          'Ask yourself:',
          '• "What am I actually upset about?" (usually deeper than the argument topic)',
          '• "How will I feel about this tomorrow?"',
          '• "What outcome do I actually want?"',
          '',
          'This isn\'t about who\'s right. It\'s about not making it worse.'
        ]
      },
      {
        title: 'RETURN READY TO RESOLVE',
        duration: 'When calm',
        instructions: [
          'Only return when you can speak calmly.',
          '',
          'Start with: "I want to figure this out" not "You need to understand..."'
        ]
      }
    ],
    whyItWorks: 'When conflict escalates, your rational brain goes offline and your reactive brain takes over. Nothing productive happens in that state. This timeout isn\'t running away - it\'s strategic de-escalation. It gives both parties time to regulate before causing real damage.',
    note: 'If conflicts are frequent, you need Communication Upgrade Protocol. This is just damage control.'
  }
];








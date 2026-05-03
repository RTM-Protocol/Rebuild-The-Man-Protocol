import { Protocol } from '@/types';

export const protocols: Protocol[] = [
  {
    id: 'rebuild-the-man',
    title: 'Rebuild The Man',
    category: 'burnout',
    tagline: 'Complete Mental Reconstruction',
    problem: 'You\'ve lost your edge. Operating on autopilot. Going through motions without purpose. The foundation needs rebuilding from the ground up.',
    solution: 'A 14-day intensive protocol to reconstruct your mental framework, sharpen your mind, and reclaim your drive through deliberate action and deep reflection.',
    icon: '',
    durations: [14],
    missions: {
      7: [],
      14: [
        {
          day: 1,
          title: 'Foundation Assessment',
          description: 'Map your current state without judgment',
          instructions: [
            'Find a quiet space. Grab pen and paper or open a blank document',
            'Answer these questions honestly in writing:',
            'What am I avoiding right now? What truth am I not facing?',
            'Where am I lying to myself about my capabilities or situation?',
            'What would I do differently if I genuinely believed in myself?',
            'Write for 15 minutes minimum. No filters, no editing, complete honesty'
          ],
          whyItWorks: 'You can\'t rebuild what you haven\'t properly assessed. Self-deception is the first barrier to growth. Writing forces clarity that thinking alone can\'t achieve. Research shows self-reflection through writing increases self-awareness by up to 23% and improves decision-making.',
          proTip: 'The hardest truths to write are usually the most important. If something feels uncomfortable to admit, that\'s exactly what needs to be written.',
          affirmation: 'I have the strength to face the truth about myself, and the courage to change what needs changing.',
          estimatedTime: '20 minutes'
        },
        {
          day: 2,
          title: 'Energy Audit',
          description: 'Identify what drains and what fuels you',
          instructions: [
            'Create two columns: DRAINS and FUELS',
            'Track everything you do today in 2-hour blocks',
            'After each activity, mark which column it belongs to',
            'Rate the intensity: Low (1), Medium (2), High (3)',
            'At day\'s end, total the scores. Which column wins?',
            'Identify the top 3 drains you can reduce or eliminate'
          ],
          whyItWorks: 'Most men run on empty because they never track what depletes them. Energy management beats time management. You can\'t eliminate all drains, but awareness lets you make conscious trade-offs instead of unconscious sacrifices.',
          proTip: 'People can be drains or fuel. Some relationships exhaust you, others energize you. Be honest about which is which.',
          affirmation: 'I protect my energy like I protect my time. Both are finite, both are valuable, both deserve intentional use.',
          estimatedTime: '15 minutes total tracking + 10 minutes analysis'
        },
        {
          day: 3,
          title: 'The Non-Negotiables',
          description: 'Define your core standards',
          instructions: [
            'Write down 5 non-negotiable daily standards for yourself',
            'Make them specific and measurable (not "be better" but "work out for 20 minutes")',
            'Examples: Morning routine, no phone for first hour, one meaningful conversation',
            'Post them somewhere visible - phone wallpaper, bathroom mirror, desk',
            'Commit to 24 hours of absolute compliance',
            'If you break one, start the 24 hours over tomorrow'
          ],
          whyItWorks: 'Self-respect comes from self-discipline. Standards without enforcement are just wishes. Small daily commitments rebuild trust with yourself. Each kept promise strengthens your internal locus of control.',
          proTip: 'Start with standards you can actually keep. Success builds momentum. You can raise the bar later. Right now, consistency matters more than intensity.',
          affirmation: 'My word to myself is as binding as my word to others. I am becoming a man who does what he says he will do.',
          estimatedTime: '15 minutes setup + daily execution'
        },
        {
          day: 4,
          title: 'Silence Session',
          description: 'Practice deliberate solitude',
          instructions: [
            'Set a timer for 20 minutes',
            'No phone, no music, no podcast, no distractions',
            'Sit or walk in complete silence',
            'Let thoughts come and go without engaging them',
            'If your mind races, that\'s normal - just observe it',
            'After, write 3 sentences about what came up'
          ],
          whyItWorks: 'Constant input prevents processing. Your brain needs silence to integrate experience into wisdom. Solitude reveals what noise drowns out. Studies show even brief periods of silence can lower blood pressure and reduce cortisol more effectively than relaxing music.',
          proTip: 'Boredom is not the enemy. It\'s the doorway to creativity and self-knowledge. Sit with it instead of escaping it.',
          affirmation: 'I am comfortable in my own presence. Silence is not empty, it is full of answers.',
          estimatedTime: '20 minutes'
        },
        {
          day: 5,
          title: 'Fear Inventory',
          description: 'Name what holds you back',
          instructions: [
            'Complete this sentence 10 different times: "I would _____ if I wasn\'t afraid of _____"',
            'Be brutally specific about the fears',
            'For each fear, ask: "What\'s the actual worst case scenario?"',
            'Then ask: "Could I handle that if it happened?"',
            'Circle the 3 fears that have the biggest grip on you',
            'Choose one. Do something small today that defies it'
          ],
          whyItWorks: 'Unnamed fears control you. Named fears can be evaluated. Most fears evaporate when you examine them directly. Action is the antidote to anxiety. Even small acts of courage rewire your brain\'s threat assessment system.',
          proTip: 'Courage isn\'t absence of fear. It\'s action despite fear. Every time you move forward while afraid, you prove to yourself that fear isn\'t a valid reason to stop.',
          affirmation: 'Fear is information, not instruction. I acknowledge it, assess it, and act anyway.',
          estimatedTime: '25 minutes'
        },
        {
          day: 6,
          title: 'Physical Baseline',
          description: 'Reconnect with your body',
          instructions: [
            'Choose one: 30 pushups, 100 bodyweight squats, or 1-mile run',
            'Do it without music or distraction. Focus on the sensation',
            'Notice: strength, weakness, breath, discomfort, capability',
            'Don\'t judge the performance, just observe the experience',
            'Immediately after, write down what your body told you',
            'Set a calendar reminder to repeat this exact workout in 8 days'
          ],
          whyItWorks: 'Your body stores stress and emotion as tension and fatigue. Physical challenge creates mental clarity. Movement metabolizes stress hormones. A strong body supports a strong mind - the connection is literal, not metaphorical.',
          proTip: 'The goal isn\'t fitness, it\'s presence. Feel every rep, every breath, every muscle firing. This is meditation in motion.',
          affirmation: 'My body is not separate from my mind. When I strengthen one, I strengthen both.',
          estimatedTime: '15-20 minutes'
        },
        {
          day: 7,
          title: 'Progress Check',
          description: 'Measure and adjust',
          instructions: [
            'Review Day 1\'s foundation assessment. What\'s changed?',
            'Have you kept your Day 3 non-negotiables? If not, why not?',
            'Which day had the biggest impact? Which felt like a waste?',
            'Rate your current mental state 1-10 vs when you started',
            'Write 3 specific things you\'re doing differently now',
            'Decide: what one habit from this week becomes permanent?'
          ],
          whyItWorks: 'Progress without reflection is just motion. Measurement creates accountability. Celebrating small wins builds momentum. Identifying what works lets you double down on effectiveness.',
          proTip: 'If nothing has changed, you\'re going through motions without intention. Rebuild requires actual building, not just reading instructions.',
          affirmation: 'I measure my growth not by where others are, but by where I was. Progress is personal, and mine is real.',
          estimatedTime: '20 minutes'
        },
        {
          day: 8,
          title: 'Value Definition',
          description: 'Clarify what you stand for',
          instructions: [
            'List 5 values you claim to have (honesty, loyalty, discipline, etc.)',
            'For each one, write 3 recent actions that proved it',
            'If you can\'t find 3 examples, cross it off - it\'s not actually your value',
            'For the values that remain, rate yourself 1-10 on living them',
            'Choose the lowest-rated value that matters most',
            'Plan one specific action today that demonstrates it'
          ],
          whyItWorks: 'Values aren\'t what you say, they\'re what you do. The gap between stated values and lived values creates internal conflict and self-doubt. Alignment between belief and behavior builds integrity, and integrity builds self-trust.',
          proTip: 'Most people adopt values from others without testing if they\'re actually theirs. It\'s okay if your values differ from what you were taught. What matters is that they\'re genuinely yours.',
          affirmation: 'I am defined by my actions, not my intentions. My values are visible in how I spend my time and energy.',
          estimatedTime: '25 minutes'
        },
        {
          day: 9,
          title: 'Relationship Audit',
          description: 'Evaluate your inner circle',
          instructions: [
            'List the 5 people you spend the most time with',
            'For each person, answer: Do they elevate me or drain me?',
            'Do they challenge me to grow or enable comfort?',
            'Would I want to be more like them or less?',
            'Am I a better version of myself around them?',
            'Identify 1 person to spend more time with, 1 to reduce time with',
            'Take action on this today - schedule time with one, create boundary with other'
          ],
          whyItWorks: 'You become the average of the people you surround yourself with. It\'s not cruelty to distance yourself from those who pull you down - it\'s self-preservation. Quality of relationships matters infinitely more than quantity.',
          proTip: 'Loyalty doesn\'t mean tolerating toxicity. You can love people from a distance. Protecting your growth isn\'t selfishness, it\'s responsibility.',
          affirmation: 'I choose my company carefully. The people I allow in my life shape the person I become.',
          estimatedTime: '20 minutes'
        },
        {
          day: 10,
          title: 'Purpose Refinement',
          description: 'Define what you\'re building toward',
          instructions: [
            'Finish this sentence: "If I could only achieve one thing in the next 6 months, it would be..."',
            'Get specific. Not "be successful" but the exact outcome',
            'Ask yourself: Why does this matter to ME, not to others?',
            'Write down what success would look like, feel like, change',
            'Identify the first concrete step toward this goal',
            'Schedule that step for a specific day and time this week'
          ],
          whyItWorks: 'Direction beats speed. Most men are working hard on things that don\'t matter to them. Clarity of purpose filters decisions and energizes action. When you know where you\'re going, every step has meaning.',
          proTip: 'Your purpose doesn\'t have to be world-changing. It has to be real to you. Building a business, being a better father, mastering a skill - all equally valid if they\'re genuinely yours.',
          affirmation: 'I am building toward something that matters. Every action either moves me closer or further away. I choose closer.',
          estimatedTime: '25 minutes'
        },
        {
          day: 11,
          title: 'Failure Analysis',
          description: 'Extract wisdom from past losses',
          instructions: [
            'Identify 3 significant failures or regrets from your past',
            'For each one, write what happened without justification or blame',
            'Ask: What did this teach me? What strength did I gain from it?',
            'Ask: How am I different because this happened?',
            'Ask: Would I be better or worse off if it never occurred?',
            'Write one way each failure actually served your growth'
          ],
          whyItWorks: 'Failure isn\'t the opposite of success, it\'s the foundation of it. Men who never examine their losses repeat them. Reframing failure as education removes its power to define you. Neuroscience shows that learning from failure creates stronger neural pathways than learning from success.',
          proTip: 'The goal isn\'t to feel good about failure. It\'s to extract value from it. Failure is expensive - make sure you get what you paid for in lessons learned.',
          affirmation: 'My failures do not define my worth. They refine my wisdom. Every loss contains a lesson I needed to learn.',
          estimatedTime: '30 minutes'
        },
        {
          day: 12,
          title: 'Discipline Practice',
          description: 'Do something uncomfortable by choice',
          instructions: [
            'Choose one uncomfortable thing you\'ve been avoiding',
            'Options: cold shower, difficult conversation, calling someone, applying for something',
            'Set a timer for 5 minutes to prepare mentally',
            'Then do it. No countdown, no "one more minute" - just act',
            'Immediately after, write down: How I felt before, during, and after',
            'Notice the gap between anticipated discomfort and actual discomfort'
          ],
          whyItWorks: 'Discipline is a muscle. It strengthens with use. Voluntary discomfort builds tolerance for necessary discomfort. The more you prove you can do hard things, the more you believe you can. This belief becomes self-fulfilling.',
          proTip: 'The anticipation of discomfort is almost always worse than the reality. Your brain exaggerates threats to protect you. Exposure proves it wrong.',
          affirmation: 'Comfort is not my goal. Growth is. I am capable of more discomfort than I allow myself to experience.',
          estimatedTime: '15 minutes'
        },
        {
          day: 13,
          title: 'Gratitude Reframe',
          description: 'Find strength in what you have',
          instructions: [
            'List 10 things you\'re genuinely grateful for - but there\'s a rule:',
            'None can be material possessions or generic answers',
            'Examples: "The fact I can still learn new things" or "My ability to choose my response"',
            'For each one, write why it matters and how it serves you',
            'Identify which one you take most for granted',
            'Write 3 ways you\'ll honor that gift differently going forward'
          ],
          whyItWorks: 'Gratitude isn\'t toxic positivity, it\'s perspective correction. Acknowledging what works prevents fixation on what doesn\'t. Studies show gratitude practices increase dopamine and serotonin, creating natural resilience against depression and anxiety.',
          proTip: 'This isn\'t about pretending problems don\'t exist. It\'s about recognizing resources you have to solve them. Strength comes from knowing what you have to work with.',
          affirmation: 'I am not defined by what I lack. I am empowered by what I have. My resources are greater than I acknowledge.',
          estimatedTime: '25 minutes'
        },
        {
          day: 14,
          title: 'The Rebuild Commitment',
          description: 'Lock in your transformation',
          instructions: [
            'Reread your Day 1 foundation assessment. Who was that person?',
            'List 10 concrete ways you\'re different now than you were 13 days ago',
            'Identify the 3 practices from this protocol that changed you most',
            'Commit to continuing those 3 practices for the next 30 days minimum',
            'Write a contract with yourself: "I am now a man who..." (list 5 things)',
            'Sign it. Date it. Read it daily for the next week'
          ],
          whyItWorks: 'Transformation without integration is temporary. Declaring who you\'re becoming creates psychological commitment. Public commitment (even to yourself in writing) increases follow-through by 65%. You\'re not ending a protocol, you\'re beginning a lifestyle.',
          proTip: 'The protocol was training wheels. Now you know how to rebuild yourself whenever needed. This isn\'t a one-time fix - it\'s a skill you now possess.',
          affirmation: 'I am not who I was. I am who I choose to become. The rebuild never ends, and I am equal to the task.',
          estimatedTime: '30 minutes'
        }
      ],
      30: []
    }
  },
  {
    id: 'system-overload',
    title: 'System Overload Protocol',
    category: 'stress',
    tagline: 'Pressure Release System',
    problem: 'Your stress response system is running at maximum capacity. Too many inputs, insufficient processing. System approaching critical failure.',
    solution: 'A 7-30 day protocol to recalibrate your stress response, clear the backlog, and install pressure release mechanisms.',
    icon: '',
    durations: [7, 14, 30],
    missions: {
      7: [
        {
          day: 1,
          title: 'System Diagnostic',
          description: 'Identify what\'s overloading your system',
          instructions: [
            'Grab a piece of paper or open a notes app',
            'Set a timer for 10 minutes',
            'Write down every single thing currently taking up mental bandwidth - work deadlines, family issues, money concerns, everything',
            'Don\'t filter, don\'t organize, just dump it all out',
            'When timer ends, count the items. That\'s your system load.'
          ],
          whyItWorks: 'Your brain uses the same mental RAM for remembering tasks as it does for thinking. Writing things down frees up processing power. Studies show this "cognitive offloading" reduces anxiety and improves focus within minutes.',
          proTip: 'Do this every morning for the next 7 days. You\'ll notice patterns in what stresses you most.',
          affirmation: 'I release what I cannot control and focus on what I can.',
          estimatedTime: '10 minutes'
        },
        {
          day: 2,
          title: 'Pressure Valve Installation',
          description: 'Install a daily release mechanism',
          instructions: [
            'Pick one physical activity: 20 pushups, 5-minute walk, or 30 jumping jacks',
            'Set 3 alarms throughout your day (morning, lunch, evening)',
            'When alarm goes off, drop everything and do the activity',
            'No negotiation, no "later" - immediate execution',
            'Log completion in your phone'
          ],
          whyItWorks: 'Physical activity triggers the completion of the stress response cycle. Your body literally needs to move to process stress chemicals. Small bursts throughout the day prevent accumulation.',
          proTip: 'The activity matters less than the consistency. Pick something so easy you can\'t make excuses.',
          affirmation: 'My body is built to handle stress. I give it what it needs to process and release.',
          estimatedTime: '5 minutes, 3x daily'
        },
        {
          day: 3,
          title: 'Input Reduction',
          description: 'Cut unnecessary system inputs',
          instructions: [
            'Review your "system load" list from Day 1',
            'Identify 3 things that are optional stressors (social media, news, toxic group chats, etc.)',
            'Delete the apps or leave the groups. Today. Right now.',
            'Block news websites if needed',
            'Tell someone you\'re doing this for accountability'
          ],
          whyItWorks: 'Most stress isn\'t from your actual life - it\'s from consuming other people\'s problems. Your brain can\'t distinguish between real threats and digital ones. Less input = less overload.',
          proTip: 'You won\'t miss anything important. If it matters, someone will tell you directly.',
          affirmation: 'I protect my mental space from unnecessary noise. My attention is valuable.',
          estimatedTime: '15 minutes'
        },
        {
          day: 4,
          title: 'Sleep System Recalibration',
          description: 'Fix your recovery protocol',
          instructions: [
            'Calculate what time you need to wake up tomorrow',
            'Count back 8 hours - that\'s your shutdown time',
            'Set an alarm for 30 minutes before shutdown',
            'When it goes off: no more screens, dim the lights',
            'Read something boring or do light stretching until shutdown time'
          ],
          whyItWorks: 'Sleep is when your brain processes and files away stress. Skipping it is like never emptying the trash. Blue light and stimulation right before bed keeps your stress system activated.',
          proTip: 'One night of good sleep won\'t fix you, but it breaks the cycle. Do this for 3 nights and you\'ll notice a difference.',
          affirmation: 'Rest is not weakness. It is essential maintenance for peak performance.',
          estimatedTime: 'Full night (8 hours)'
        },
        {
          day: 5,
          title: 'No Protocol Day',
          description: 'System cooldown - maintain basics only',
          instructions: [
            'Today you only do 2 things:',
            'Continue your 3 pressure valve sessions from Day 2',
            'Avoid the inputs you cut from Day 3',
            'That\'s it. No new tasks. Let the system stabilize.'
          ],
          whyItWorks: 'Recovery requires rest, not more activity. This day lets previous changes integrate without adding new load.',
          proTip: 'Notice what you\'re NOT feeling today compared to 5 days ago.',
          affirmation: 'Progress happens in rest as much as in action. I trust the process.',
          estimatedTime: 'Minimal'
        },
        {
          day: 6,
          title: 'Single-Tasking Calibration',
          description: 'Stop fragmentation, increase efficiency',
          instructions: [
            'Choose your 3 most important tasks for today',
            'Set a timer for 25 minutes',
            'Work on ONLY task #1 - close all other tabs, silence phone',
            'When timer ends, take a 5-minute break',
            'Repeat for task #2, then #3',
            'Everything else can wait'
          ],
          whyItWorks: 'Task-switching creates massive mental overhead. Your brain needs 20+ minutes to fully focus on something. Three focused hours beats eight scattered hours.',
          proTip: 'This feels uncomfortable at first. That\'s your addiction to distraction. Push through.',
          affirmation: 'I am capable of deep focus. My mind is stronger than my distractions.',
          estimatedTime: '90 minutes total'
        },
        {
          day: 7,
          title: 'System Status Check',
          description: 'Evaluate and lock in gains',
          instructions: [
            'Review your Day 1 system load list',
            'Rate your current stress level 1-10 vs Day 1',
            'Identify which protocol step helped most',
            'Decide: continue for 7 more days or run a different protocol?',
            'If continuing, keep the habits that worked, drop what didn\'t'
          ],
          whyItWorks: 'Measuring progress reinforces that the work is paying off. Conscious evaluation prevents sliding back into old patterns.',
          proTip: 'If you\'re not at least 20% better, you skipped steps. Be honest with yourself.',
          affirmation: 'I acknowledge my progress and commit to continued growth.',
          estimatedTime: '15 minutes'
        }
      ],
      14: [],
      30: []
    }
  },
  {
    id: 'pressure-valve',
    title: 'Pressure Valve Protocol',
    category: 'anger',
    tagline: 'Anger Regulation System',
    problem: 'Your anger response is misfiring. Small triggers causing massive reactions. Control system offline.',
    solution: 'Install early warning systems and release mechanisms before pressure becomes explosive.',
    icon: '',
    durations: [7, 14],
    missions: {
      7: [
        {
          day: 1,
          title: 'Trigger Mapping',
          description: 'Identify what lights the fuse',
          instructions: [
            'For the next 24 hours, notice every time you feel anger rising',
            'Immediately note: what happened, who was there, what time',
            'Rate the anger 1-10',
            'Don\'t judge it, just observe and record',
            'Tomorrow review for patterns'
          ],
          whyItWorks: 'Anger feels random but it\'s not. Specific patterns trigger it. You can\'t fix what you can\'t see. Awareness is the first circuit breaker.',
          proTip: 'The goal isn\'t to stop anger - it\'s to see it coming.',
          affirmation: 'I observe my anger without becoming it. I am in control.',
          estimatedTime: '2 minutes per incident'
        }
      ],
      14: [],
      30: []
    }
  },
  {
    id: 'engine-restart',
    title: 'Engine Restart Protocol',
    category: 'depression',
    tagline: 'Motivation System Reboot',
    problem: 'Engine won\'t turn over. No energy, no drive. All systems are functional but nothing fires up.',
    solution: 'Manual ignition sequence to get core systems back online, one component at a time.',
    icon: '',
    durations: [14, 30],
    missions: {
      7: [],
      14: [
        {
          day: 1,
          title: 'Minimal Viable Action',
          description: 'Prove the engine can still fire',
          instructions: [
            'Pick the smallest possible win: make your bed, drink a glass of water, shower',
            'Do it before you allow yourself to overthink',
            'Immediately after, say out loud: "Engine test successful"',
            'Write down what you did and the exact time',
            'That\'s it for today'
          ],
          whyItWorks: 'Depression tells you nothing will help. Proof defeats that lie faster than belief. Action creates evidence. Evidence creates momentum.',
          proTip: 'It will feel pointless. Do it anyway. You\'re collecting data, not fixing everything.',
          affirmation: 'I am capable of action, even when I don\'t feel like it. Small steps count.',
          estimatedTime: '5 minutes'
        }
      ],
      30: []
    }
  },
  {
    id: 'calibration-protocol',
    title: 'Reality Calibration Protocol',
    category: 'imposter',
    tagline: 'Self-Assessment Recalibration',
    problem: 'Your internal assessment system is miscalibrated. Reading real competence as fraud. False negative error pattern.',
    solution: 'Recalibrate your self-assessment system using external data and evidence-based thinking.',
    icon: '',
    durations: [7, 14],
    missions: {
      7: [
        {
          day: 1,
          title: 'Evidence Collection',
          description: 'Gather objective performance data',
          instructions: [
            'Make a list of 10 things you\'ve accomplished in your field',
            'Include: projects completed, problems solved, skills learned',
            'Write ONLY facts - things that happened, not how you feel about them',
            'Ask yourself: would these count if someone else did them?',
            'Save this list - you\'ll need it'
          ],
          whyItWorks: 'Imposter syndrome is a feeling arguing with facts. Facts win when you force the comparison. Your brain is lying to you - data doesn\'t.',
          proTip: 'If you think "anyone could do that" - prove it. Show me everyone else who did.',
          affirmation: 'My accomplishments are real. I earned my place through effort and skill.',
          estimatedTime: '15 minutes'
        }
      ],
      14: [],
      30: []
    }
  }
];

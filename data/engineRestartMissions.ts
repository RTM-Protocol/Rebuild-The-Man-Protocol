import type { DailyMission } from '@/types';

/** Full Engine Restart Protocol — 30 days (sliced for 7- and 14-day tracks). */
export const engineRestartMissions30: DailyMission[] = [
  {
    day: 1,
    title: 'The Stall Assessment',
    description:
      'Before you restart, you need to know what stalled. Map the damage honestly.',
    instructions: [
      'Rate these areas 1–10 for current motivation: Work, Health/Fitness, Relationships, Personal Growth, Daily Routine.',
      'For each area rated below 5, write one sentence about when the decline started and what triggered it.',
      'Write down the last time you felt genuinely motivated and what you were doing. This is your reference point.',
    ],
    whyItWorks:
      'You can\'t fix a stall you haven\'t named. Honest baseline scores turn vague "I feel stuck" into targets you can move.',
    proTip: 'No self-judgment — you\'re reading diagnostics, not sentencing yourself.',
    affirmation: 'I see where I stalled so I can restart with precision.',
    estimatedTime: '15 minutes',
  },
  {
    day: 2,
    title: 'Micro-Win Stack',
    description:
      'Motivation follows action, not the other way around. Today you prove it.',
    instructions: [
      'Complete 3 small tasks you\'ve been avoiding — each must take under 5 minutes. Examples: send that email, put away laundry, book that appointment.',
      'After each one, pause and notice how it felt to complete it. Write one word for the feeling.',
      'The lesson: motivation is a result of momentum, not a prerequisite. You don\'t wait to feel motivated. You act, and motivation follows.',
    ],
    whyItWorks:
      'Tiny completions spike completion-contingent dopamine and break the freeze loop between intention and motion.',
    proTip: 'If a 5-minute task balloons, stop at 5 — you\'re wiring "start" not "finish everything."',
    affirmation: 'Action first; mood catches up when I move.',
    estimatedTime: '15 minutes',
  },
  {
    day: 3,
    title: 'The Minimum Viable Day',
    description:
      'When everything feels too much, define the absolute minimum that counts as a win.',
    instructions: [
      'Write your Minimum Viable Day — the 3–5 non-negotiable actions that, if done, mean the day wasn\'t wasted. Examples: get dressed, eat one real meal, move for 10 minutes, do one work task, go to bed on time.',
      'This is your floor, not your ceiling. On bad days, do just these. On good days, do more.',
      'Do your Minimum Viable Day today. Check each item off. Notice that even on a low day, you accomplished something meaningful.',
    ],
    whyItWorks:
      'A defined floor prevents all-or-nothing days that erase streaks and shame you back to zero.',
    proTip: 'Keep the MVP embarrassingly small — if you nail it, you can always add one bonus.',
    affirmation: 'My floor is enough to keep the engine from seizing.',
    estimatedTime: '10 minutes',
  },
  {
    day: 4,
    title: 'The Identity Audit',
    description:
      'Low motivation often comes from losing sight of who you are and who you\'re becoming.',
    instructions: [
      'Write 5 statements starting with "I am a man who..." describing the version of yourself you want to be. Not aspirational fluff — concrete behaviours. E.g. "I am a man who shows up even when he doesn\'t feel like it."',
      'For each statement, rate 1–10 how consistently you\'re living it right now.',
      'Choose the one with the biggest gap between where you are and where you want to be. This is your focus identity for the protocol.',
    ],
    whyItWorks:
      'Identity frames behaviour — when you know who you\'re practising to be, choices have a direction.',
    proTip: 'Pick one identity line to rehearse aloud for 10 seconds each morning this week.',
    affirmation: 'Who I\'m becoming pulls me more than how I feel today.',
    estimatedTime: '15 minutes',
  },
  {
    day: 5,
    title: 'Routine Architecture',
    description:
      'Motivation is unreliable. Routines are not. Today you build a simple morning structure.',
    instructions: [
      'Design a 30-minute morning routine using only 3 elements: (1) Physical — movement, cold water, or stretching, (2) Mental — journaling, reading, or review, (3) Intentional — set one priority for the day.',
      'Write it down as a specific sequence with times. Example: 6:30 press-ups, 6:40 journal, 6:50 write today\'s priority.',
      'Do this routine tomorrow morning. The routine doesn\'t need to be perfect. It needs to be done.',
    ],
    whyItWorks:
      'Cues and sequence reduce decision fatigue — the morning you don\'t negotiate with yourself starts better.',
    proTip: 'Lay out clothes, journal, water the night before so friction is near zero.',
    affirmation: 'My morning structure carries me when willpower won\'t.',
    estimatedTime: '20 minutes',
  },
  {
    day: 6,
    title: 'The Dopamine Audit',
    description:
      'Your motivation system runs on dopamine. If you\'re spending it on junk, there\'s nothing left for what matters.',
    instructions: [
      'Write down every source of easy dopamine in your life: social media scrolling, gaming, pornography, junk food, binge-watching, online shopping.',
      'Rate each one: How much time per day? How do you feel 30 minutes after? Is this moving you forward or holding you still?',
      'Choose one to reduce by 50% for the rest of this protocol. Not eliminate — reduce. Replace the freed time with a high-effort, high-reward activity (exercise, learning, creating, building).',
    ],
    whyItWorks:
      'Cheap hits blunt motivation for hard wins; trimming one leak restores contrast and drive for real work.',
    proTip: 'Pair the cut with a scheduled replacement slot so the void doesn\'t suck you back.',
    affirmation: 'I spend my dopamine budget on what builds me, not what numbs me.',
    estimatedTime: '15 minutes',
  },
  {
    day: 7,
    title: 'The 2-Minute Rule',
    description:
      'If a task takes less than 2 minutes, do it now. This prevents the pile-up that kills motivation.',
    instructions: [
      'Walk through your home and workspace. Do every sub-2-minute task you see: hang up a jacket, reply to a text, wipe a counter, file a document.',
      'Count how many you completed. Most people find 10–20 in under 30 minutes.',
      'For the rest of the protocol, apply the 2-minute rule every time you notice a small task. Never put off what can be done now.',
    ],
    whyItWorks:
      'Cluttered micro-tasks tax working memory and signal "I\'m behind"; clearing them restores a sense of control.',
    proTip: 'Timer optional — if it\'s obviously under 2 minutes, execute on sight.',
    affirmation: 'Small done beats big planned.',
    estimatedTime: '10 minutes',
  },
  {
    day: 8,
    title: 'Goal Clarity',
    description:
      'Vague goals produce vague effort. Today you get specific.',
    instructions: [
      'Write one goal for the next 90 days. Make it specific, measurable, and meaningful to you. Not "get fit" but "run 5km without stopping by [date]."',
      'Break it into weekly milestones. What does progress look like at week 1, 4, 8, 12?',
      'Write your goal on a card and put it where you\'ll see it every morning. The visual reminder keeps the target in focus when motivation dips.',
    ],
    whyItWorks:
      'Concrete end states and milestones turn drifting into steering.',
    proTip: 'Put the next milestone only on the card if the 90-day view overwhelms you.',
    affirmation: 'I aim at something clear, so my effort has a target.',
    estimatedTime: '20 minutes',
  },
  {
    day: 9,
    title: 'The Accountability Mechanism',
    description:
      'You will let yourself down. You\'re less likely to let someone else down.',
    instructions: [
      'Tell one person about your 90-day goal from yesterday. Be specific. Give them permission to ask you about it.',
      'Set a weekly check-in: every Sunday evening, send them a one-line update on your progress.',
      'If you can\'t find an accountability partner, use a public commitment: post your goal somewhere visible (even a private note to yourself counts if you review it weekly).',
    ],
    whyItWorks:
      'Social expectation and deadlines reduce the "I\'ll start Monday" loop.',
    proTip: 'Ask for a single yes/no: "Did you hit this week\'s milestone?"',
    affirmation: 'I\'m not rebuilding alone — someone knows my line in the sand.',
    estimatedTime: '15 minutes',
  },
  {
    day: 10,
    title: 'Energy Management',
    description:
      'You don\'t have a motivation problem. You have an energy problem.',
    instructions: [
      'Track your energy levels today at 8am, 12pm, 4pm, and 8pm. Rate each 1–10.',
      'Identify your peak energy window. This is when you should do your most important, demanding work. Protect this time.',
      'Identify your lowest energy window. Schedule easy, low-stakes tasks here. Stop fighting your biology — work with it.',
    ],
    whyItWorks:
      'Matching task difficulty to physiology beats heroics at the wrong hour.',
    proTip: 'Block one sacred peak hour on your calendar before you reply to anything.',
    affirmation: 'I schedule hard things when I\'m strongest, easy things when I\'m flat.',
    estimatedTime: '15 minutes',
  },
  {
    day: 11,
    title: 'The Comparison Cleanse',
    description:
      'Comparing yourself to others is a guaranteed motivation killer.',
    instructions: [
      'Identify 3 people or accounts on social media that make you feel worse about yourself or your progress.',
      'Mute or unfollow them now. Not permanently if you don\'t want to — just for the duration of this protocol.',
      'Write: "The only person I\'m competing with is yesterday\'s version of me." Put this somewhere visible.',
    ],
    whyItWorks:
      'Comparison hijacks attention to others\' curated output; distance restores focus on your trajectory.',
    proTip: 'Replace scroll time with your done list from Day 16 habit (start early if you want).',
    affirmation: 'My scoreboard is me vs last week, not me vs their highlight reel.',
    estimatedTime: '15 minutes',
  },
  {
    day: 12,
    title: 'Skill Stacking',
    description:
      'Learning something new reignites the brain\'s reward system.',
    instructions: [
      'Choose one skill you\'ve wanted to learn: cooking, a language, an instrument, coding, a sport, public speaking.',
      'Spend 20 minutes on it today. Watch a tutorial, read a chapter, do a practice session. Deliberate practice, not passive consumption.',
      'Schedule 15 minutes for this skill every day for the next week. Novelty and progress are powerful dopamine drivers.',
    ],
    whyItWorks:
      'Novel learning triggers reward without the hangover of passive scrolling.',
    proTip: 'Same time daily for the skill block — treat it like a meeting.',
    affirmation: 'I feed my brain progress, not just entertainment.',
    estimatedTime: '20 minutes',
  },
  {
    day: 13,
    title: 'The Procrastination Autopsy',
    description:
      'Dissect why you procrastinate. The answer isn\'t laziness.',
    instructions: [
      'Write down the task you\'re currently procrastinating on most. Then answer: Why am I avoiding this? Common answers: fear of failure, overwhelm, unclear first step, perfectionism, boredom.',
      'Address the real reason. If overwhelm: break it into steps under 10 minutes each. If fear of failure: define what "good enough" looks like. If unclear: write just the first action.',
      'Do the first 10-minute chunk right now. Not the whole task. Just the first piece. Starting is the hardest part.',
    ],
    whyItWorks:
      'Procrastination is usually emotion regulation, not poor character — naming the driver lets you pick the right fix.',
    proTip: 'Set a 10-minute timer; permission to stop after often turns into continued flow.',
    affirmation: 'I can start small and let momentum decide the rest.',
    estimatedTime: '15 minutes',
  },
  {
    day: 14,
    title: 'Physical Restart',
    description:
      'Your body and mind are the same system. Physical stagnation = mental stagnation.',
    instructions: [
      'Do something physically challenging that you haven\'t done recently: a run, a gym session, a bodyweight circuit, a long fast-paced walk, swimming.',
      'Push to the edge of your comfort zone. Not injury territory — discomfort territory. The point where your brain says "stop" and you do 10% more.',
      'Afterwards, notice your mental state. Most people report clarity, energy, and reduced rumination. Write one word for how you feel.',
    ],
    whyItWorks:
      'Hard effort resets arousal and proves your system can still mobilise — a direct antidote to helpless stillness.',
    proTip: 'End with slow breathing so you downshift instead of crashing.',
    affirmation: 'When I move my body with intent, my mind follows.',
    estimatedTime: '25 minutes',
  },
  {
    day: 15,
    title: 'Environment Redesign',
    description:
      'Your environment shapes your behaviour more than willpower ever will.',
    instructions: [
      'Walk through your workspace and living space. Identify 3 things that are making low-effort behaviour easy (e.g. phone on desk, snacks visible, TV remote on sofa).',
      'Redesign: move the phone to another room, replace visible snacks with water, put the remote in a drawer. Make the lazy option harder.',
      'Add one visual cue for the behaviour you want: gym clothes laid out, book on pillow, journal on desk. Make the right option obvious and easy.',
    ],
    whyItWorks:
      'Friction and cues steer behaviour automatically — design beats relying on mood.',
    proTip: 'Change one default placement tonight before you need discipline tomorrow.',
    affirmation: 'I shape my space so the next right move is obvious.',
    estimatedTime: '20 minutes',
  },
  {
    day: 16,
    title: 'The Done List',
    description:
      'To-do lists show what\'s not done. Done lists show what you\'ve achieved. The difference is massive.',
    instructions: [
      'At the end of today, write everything you accomplished — no matter how small. Sent an email? Write it. Made a bed? Write it. Had a conversation? Write it.',
      'Count the items. You\'ll be surprised how much you actually did, even on a "low" day.',
      'Do this every evening for the rest of the protocol. It retrains your brain to notice progress instead of deficit.',
    ],
    whyItWorks:
      'Brains default to threat scanning; a done list forces evidence that you\'re in motion.',
    proTip: 'Keep the list next to bed — 60 seconds before sleep.',
    affirmation: 'I close the day seeing proof I moved forward.',
    estimatedTime: '10 minutes',
  },
  {
    day: 17,
    title: 'Social Activation',
    description:
      'Isolation feeds low motivation. Connection disrupts it.',
    instructions: [
      'Contact one person you haven\'t spoken to in a while. Not a text — a call or a face-to-face meetup.',
      'Do one social activity this week: coffee with a friend, a walk with a colleague, a phone call with family. Schedule it now.',
      'Write: how did the social interaction affect your energy levels compared to before it? Connection is a human need, not a luxury.',
    ],
    whyItWorks:
      'Co-regulation and belonging reduce the freeze state common in low motivation.',
    proTip: 'Lead with "good to hear your voice" — low-pressure re-entry.',
    affirmation: 'People are part of my fuel, not a distraction from work.',
    estimatedTime: '15 minutes',
  },
  {
    day: 18,
    title: 'Purpose Mapping',
    description:
      'Motivation without purpose burns out fast. Purpose without motivation never starts. Today you connect them.',
    instructions: [
      'Write your answer to: "What would I want people to say about me at my funeral?" Not achievements — character and impact.',
      'Now connect that to your daily actions: which of your current habits and goals serve that legacy? Which ones don\'t?',
      'Write one sentence that links your 90-day goal to your larger purpose: "I\'m doing [goal] because it moves me toward being [the person you described]."',
    ],
    whyItWorks:
      'Purpose turns tasks into chapters — meaning sustains effort after novelty fades.',
    proTip: 'Read that one sentence when you skip the morning routine.',
    affirmation: 'My daily moves connect to who I\'m building over a lifetime.',
    estimatedTime: '20 minutes',
  },
  {
    day: 19,
    title: 'Failure Reframe',
    description:
      'Fear of failure is the top reason men don\'t start. Today you neutralise it.',
    instructions: [
      'Write down your biggest fear about pursuing your goal. What\'s the worst-case scenario?',
      'Now write: What\'s the most likely scenario (usually far less dramatic)? And what\'s the cost of NOT trying?',
      'Write 3 failures from your past that taught you something valuable. Failure is data, not destiny. The only real failure is inaction.',
    ],
    whyItWorks:
      'Catastrophism shrinks when you compare worst case to cost of stagnation side by side.',
    proTip: 'Name one small experiment you could run this week to test the "likely" case.',
    affirmation: 'I can risk a setback; I won\'t accept a life on pause.',
    estimatedTime: '15 minutes',
  },
  {
    day: 20,
    title: 'The Progress Photo',
    description: 'Take stock of how far you\'ve come in 20 days.',
    instructions: [
      'Re-rate the 5 areas from Day 1 (Work, Health, Relationships, Growth, Routine). Compare to your original scores.',
      'Write down 3 specific behaviours that have changed since you started. Not feelings — actions.',
      'Celebrate the progress. Buy yourself something small, do something enjoyable, or simply acknowledge: "I showed up for 20 days. That\'s not nothing. That\'s everything."',
    ],
    whyItWorks:
      'Visible delta beats vague "I think I\'m better" — numbers and actions are undeniable.',
    proTip: 'Pick one behaviour to lock for the next 10 days as non-negotiable.',
    affirmation: 'Twenty days of showing up changed my trajectory.',
    estimatedTime: '15 minutes',
  },
  {
    day: 21,
    title: 'Mid-Protocol Recalibration',
    description: 'Refine your approach for the final stretch.',
    instructions: [
      'Which techniques from the first 20 days are you still using? Which have you dropped?',
      'Pick up one technique you dropped that you know works. Recommit to it for the final 10 days.',
      'Adjust your 90-day goal if needed. Not to make it easier — to make it more accurate based on what you\'ve learned about yourself.',
    ],
    whyItWorks:
      'Plans that ignore reality burn motivation; honest recalibration preserves honesty with yourself.',
    proTip: 'One revived habit beats a brand-new stack you won\'t run.',
    affirmation: 'I update the plan without quitting the mission.',
    estimatedTime: '15 minutes',
  },
  {
    day: 22,
    title: 'The Hard Conversation',
    description:
      'Sometimes low motivation comes from avoiding something that needs to be said or done.',
    instructions: [
      'Identify one conversation, decision, or action you\'ve been avoiding. Something that nags at you. Something that would relieve pressure if you just did it.',
      'Write what needs to happen. What would you say? What\'s the outcome you need?',
      'Do it today. Or schedule it for tomorrow with a specific time. Avoidance drains more energy than action.',
    ],
    whyItWorks:
      'Open loops leak attention; closing one heavy loop often unblocks the whole day.',
    proTip: 'Script the first sentence only — that\'s usually enough to start.',
    affirmation: 'I handle what I\'ve been carrying — it stops weighing on my engine.',
    estimatedTime: '20 minutes',
  },
  {
    day: 23,
    title: 'Reward Architecture',
    description:
      'Your brain needs rewards to reinforce new behaviours. Design them deliberately.',
    instructions: [
      'Write 5 rewards that genuinely feel good to you — not junk dopamine. A good meal, time with a friend, an hour of gaming guilt-free, a long bath, buying something you\'ve wanted.',
      'Assign each reward to a milestone: "When I complete [X], I earn [reward]."',
      'This is not bribery. It\'s conditioning. Your brain needs positive reinforcement to build lasting motivation circuits.',
    ],
    whyItWorks:
      'Intrinsic drive grows faster when honest effort gets an honest prize you chose.',
    proTip: 'Tie the smallest reward to this week\'s most important milestone.',
    affirmation: 'I celebrate progress on purpose so my brain learns the pattern.',
    estimatedTime: '15 minutes',
  },
  {
    day: 24,
    title: 'The 10-10-10 Decision Framework',
    description:
      'Procrastination often disguises itself as "needing more time to decide."',
    instructions: [
      'Take a decision you\'ve been putting off. Ask yourself: How will I feel about this decision in 10 minutes? 10 months? 10 years?',
      'Write the answer for each timeframe. Most decisions that feel massive in 10 minutes are irrelevant in 10 years.',
      'Make the decision today. Send the message, commit to the option, close the loop. Unmade decisions are open browser tabs draining your mental RAM.',
    ],
    whyItWorks:
      'Time perspective cuts drama and exposes which choices actually matter.',
    proTip: 'If still stuck after 10-10-10, flip a coin — your reaction to the flip reveals preference.',
    affirmation: 'I close loops so my mind can run clean.',
    estimatedTime: '15 minutes',
  },
  {
    day: 25,
    title: 'Discomfort Tolerance',
    description:
      'Growth lives outside your comfort zone. Today you visit it deliberately.',
    instructions: [
      'Do something that makes you mildly uncomfortable: a cold shower, a conversation with a stranger, a public action you\'d normally avoid, trying something you\'re bad at in front of others.',
      'Sit with the discomfort. Don\'t escape it. Notice that it peaks and then subsides. You survived.',
      'Write: "Discomfort is not danger. It\'s the feeling of growth happening." The more you practice this, the wider your comfort zone becomes.',
    ],
    whyItWorks:
      'Habituation through safe exposure teaches the nervous system: I can stay functional while edgy.',
    proTip: 'Stay under 7/10 distress — you\'re training, not traumatising.',
    affirmation: 'I can tolerate the feeling of stretching without retreating.',
    estimatedTime: '20 minutes',
  },
  {
    day: 26,
    title: 'The Anti-Scroll Protocol',
    description:
      'Replace 60 minutes of passive scrolling with 60 minutes of active creation.',
    instructions: [
      'Calculate your average daily screen time. Take 60 minutes of it and replace it today with creation: write something, build something, cook something, draw something, learn something.',
      'The medium doesn\'t matter. What matters is the shift from consuming to creating. Creation generates energy. Consumption depletes it.',
      'At the end of the day, note the difference in how you feel compared to a typical scrolling day.',
    ],
    whyItWorks:
      'Creation restores agency — the felt sense that you affect the world, not only absorb it.',
    proTip: 'Block the usual apps for that hour so default behaviour can\'t win.',
    affirmation: 'What I make today feeds me more than what I scroll.',
    estimatedTime: 'All day',
  },
  {
    day: 27,
    title: 'Legacy Letter',
    description: 'Write a letter from your future self.',
    instructions: [
      'Write a letter to yourself from 1 year in the future. The version of you who followed through. What does your life look like? What are you proud of? What was the turning point?',
      'Now write what that future self would tell you to do TODAY. What would they say about the excuses you\'re making?',
      'Put this letter somewhere you\'ll find it in 6 months. Set a calendar reminder.',
    ],
    whyItWorks:
      'Future-self writing leverages hope as a behavioural bridge across low days.',
    proTip: 'Seal it in an envelope with a calendar alert — surprise amplifies impact.',
    affirmation: 'The man I\'m becoming already knows what to do today.',
    estimatedTime: '20 minutes',
  },
  {
    day: 28,
    title: 'The Non-Negotiable List',
    description:
      'Define the 5 habits that are no longer optional.',
    instructions: [
      'Write 5 daily habits that you will do regardless of motivation, mood, or circumstances. These are your non-negotiables.',
      'For each one, define the minimum viable version (so you can maintain them even on bad days). Example: "Exercise" minimum = a 10-minute walk.',
      'These 5 habits are your operating system. Everything else is variable. This is fixed.',
    ],
    whyItWorks:
      'Non-negotiables remove daily debate — the engine idles on rules, not feelings.',
    proTip: 'If five feels like too many, start with three you\'ll actually defend.',
    affirmation: 'My baseline behaviours run even when excitement doesn\'t.',
    estimatedTime: '15 minutes',
  },
  {
    day: 29,
    title: 'Relapse Prevention',
    description:
      'Motivation dips are inevitable. Plan for them now, not during them.',
    instructions: [
      'Write your 3 earliest warning signs of declining motivation (e.g. skipping morning routine, increasing screen time, avoiding social contact, eating poorly).',
      'For each sign, write a circuit breaker: "When I notice [sign], I will [specific action]."',
      'Identify one person who has permission to call you out when they see these signs. Tell them what to look for.',
    ],
    whyItWorks:
      'If-then plans pre-decide recovery moves when cognition is weakest.',
    proTip: 'Keep circuit breakers to one-step actions you can do in under 5 minutes.',
    affirmation: 'I have a playbook for when the engine coughs.',
    estimatedTime: '15 minutes',
  },
  {
    day: 30,
    title: 'Engine Running — Final Assessment',
    description: '30 days in. Measure the restart.',
    instructions: [
      'Re-rate all 5 areas from Day 1. Calculate the improvement in each area.',
      'Write your personal motivation manifesto: (1) What drives me, (2) What drains me, (3) How I maintain momentum, (4) What I do when I stall.',
      'Your maintenance plan: Morning routine (daily), Done List (daily), Accountability check-in (weekly), Full assessment (monthly). The engine doesn\'t maintain itself. You are the mechanic.',
    ],
    whyItWorks:
      'Integration beats intensity — a written maintenance rhythm prevents slide-back.',
    proTip: 'Calendar the monthly assessment now while motivation is high.',
    affirmation: 'I proved I can restart; maintaining is the next skill I own.',
    estimatedTime: '25 minutes',
  },
];

export const engineRestartMissions14 = engineRestartMissions30.slice(0, 14);
export const engineRestartMissions7 = engineRestartMissions30.slice(0, 7);

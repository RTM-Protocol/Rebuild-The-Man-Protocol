import type { DailyMission } from '@/types';

/** Full Pressure Valve Protocol — 30 days (sliced for 7- and 14-day tracks). */
export const pressureValveMissions30: DailyMission[] = [
  {
    day: 1,
    title: 'Anger Audit',
    description:
      'Map your anger landscape. You can\'t control what you can\'t see.',
    instructions: [
      'Write down the 3 moments in the past 7 days when you felt the most anger or irritation.',
      'For each one, note: What happened? Where were you? Who was involved? How did you react?',
      'Rate each incident 1-10 for intensity. This is your anger baseline — you\'ll measure against it later.',
    ],
    whyItWorks:
      'You can only improve what you measure. A written baseline turns anger from a blur into something you can track and change.',
    proTip: 'Be specific; "work sucked" is useless. Note the exact trigger and your behaviour.',
    affirmation: 'I look at my anger honestly so I can steer it, not deny it.',
    estimatedTime: '15 minutes',
  },
  {
    day: 2,
    title: 'Trigger Identification',
    description: 'Every anger response has a trigger. Today you find yours.',
    instructions: [
      'Review yesterday\'s audit. For each incident, identify the specific trigger — not the person, the trigger. Was it disrespect? Loss of control? Feeling unheard? Injustice?',
      'Write your top 3 triggers in order of frequency. These are the patterns you\'ll learn to intercept.',
      'For the rest of today, actively notice when any of these triggers fire. Don\'t try to change anything yet — just observe and note the time.',
    ],
    whyItWorks:
      'Naming triggers moves you from "they made me mad" to "this pattern hooks me" — the first step to intercepting the loop.',
    proTip: 'Separate the person from the pattern; you\'re training pattern recognition, not blame.',
    affirmation: 'I can name what sets me off. Naming it gives me leverage.',
    estimatedTime: '15 minutes',
  },
  {
    day: 3,
    title: 'The Tactical Pause',
    description:
      'Learn the single most effective anger intervention: the deliberate pause between stimulus and response.',
    instructions: [
      'Memorise this sequence: STOP → BREATHE (4 seconds in, 6 seconds out, 3 cycles) → ASSESS ("Will this matter in 24 hours?") → CHOOSE your response.',
      'Practice this sequence 3 times right now using a past anger scenario. Close your eyes, visualise the trigger, and run the pause.',
      'Set a reminder on your phone labelled "TACTICAL PAUSE" for 3 times today. When it fires, run the breathing cycle wherever you are.',
    ],
    whyItWorks:
      'Breathing and assessment engage your prefrontal cortex before your motor system commits to an explosion.',
    proTip: 'Rehearse when calm so the sequence is automatic when heat rises.',
    affirmation: 'Between trigger and response, I own a pause — and I use it.',
    estimatedTime: '10 minutes',
  },
  {
    day: 4,
    title: 'Physical De-escalation',
    description:
      'Anger lives in the body before the mind. Today you learn to discharge it physically.',
    instructions: [
      'Do 20 press-ups, 20 squats, and a 60-second plank right now. Notice how your body state changes.',
      'Write down 3 physical outlets you can realistically access within 2 minutes when anger spikes (e.g. walk outside, press-ups, grip a stress ball, cold water on wrists).',
      'Practice the "90-second rule": the neurochemical surge of anger lasts approximately 90 seconds. Set a timer for 90 seconds and do controlled breathing. Everything after 90 seconds is a choice, not a chemical reaction.',
    ],
    whyItWorks:
      'Movement and cold complete the stress cycle in the body so your brain stops sounding a false emergency.',
    proTip: 'Pick outlets you will actually use in a parking lot, office, or hallway.',
    affirmation: 'I can discharge pressure through my body instead of dumping it on people.',
    estimatedTime: '20 minutes',
  },
  {
    day: 5,
    title: 'The Anger Log',
    description: 'Start tracking anger in real time. Data beats guesswork.',
    instructions: [
      'Create a simple log in your phone\'s notes app with columns: Time, Trigger, Intensity (1-10), Used Pause (Y/N), Outcome.',
      'Log every anger or irritation event today, no matter how small. Traffic frustration, work email, partner comment — everything.',
      'At the end of the day, review your log. Count how many times you used the tactical pause vs reacted automatically.',
    ],
    whyItWorks:
      'Logging removes denial and shows whether new skills are showing up where it counts — in real life.',
    proTip: 'Log fast in the moment; polish spelling never.',
    affirmation: 'I treat my reactions like data, not character flaws.',
    estimatedTime: '15 minutes',
  },
  {
    day: 6,
    title: 'Cognitive Reframe',
    description:
      'Change the story, change the response. Most anger is built on assumptions.',
    instructions: [
      'Take your top trigger from Day 2. Write down the story you tell yourself when it fires (e.g. "They\'re disrespecting me on purpose").',
      'Now write 3 alternative explanations that are equally plausible (e.g. "They\'re stressed and not thinking", "They don\'t realise the impact", "This isn\'t about me").',
      'For the rest of today, when a trigger fires, force yourself to consider one alternative explanation before responding.',
    ],
    whyItWorks:
      'Anger often follows a rigid story. Alternatives loosen the story before you act.',
    proTip: 'Plausible beats generous — you\'re not faking positivity.',
    affirmation: 'I question my first story before I act on it.',
    estimatedTime: '15 minutes',
  },
  {
    day: 7,
    title: 'Communication Under Pressure',
    description: 'Learn to express what you need without detonating the room.',
    instructions: [
      'Learn the formula: "When [specific behaviour], I feel [emotion], because [reason]. What I need is [request]."',
      'Rewrite your top 3 anger incidents from Day 1 using this formula. How would the conversation have gone differently?',
      'Practice saying one of these statements out loud 3 times. It will feel awkward. That\'s normal. Repetition builds fluency.',
    ],
    whyItWorks:
      'Clear, non-attacking language lowers defensiveness in others and keeps your own nervous system regulated.',
    proTip: 'Script one sentence today you can actually say tomorrow.',
    affirmation: 'I can be clear and firm without being cruel.',
    estimatedTime: '20 minutes',
  },
  {
    day: 8,
    title: 'Environmental Design',
    description: 'Redesign your environment to reduce unnecessary triggers.',
    instructions: [
      'Identify 3 environmental factors that regularly contribute to your anger (e.g. checking work emails before bed, social media arguments, specific traffic routes, cluttered spaces).',
      'For each one, design a concrete change: a rule, a removal, or a replacement. Write it as an if-then statement: "If [trigger situation], then I will [alternative action]."',
      'Implement at least one of these changes today.',
    ],
    whyItWorks:
      'Willpower is finite; design removes repeated friction before you snap.',
    proTip: 'Start with the change that takes under 5 minutes to apply.',
    affirmation: 'I design my day so I\'m harder to push off balance.',
    estimatedTime: '15 minutes',
  },
  {
    day: 9,
    title: 'The Anger Iceberg',
    description: 'Anger is the visible emotion. Beneath it lies what\'s actually driving you.',
    instructions: [
      'Draw an iceberg. Above the waterline write "ANGER." Below it, write the emotions that are actually underneath your anger: fear, shame, hurt, exhaustion, feeling trapped, grief, loneliness.',
      'For your most recent anger episode, identify which deeper emotion was actually present. Write a sentence that starts with that emotion instead of anger.',
      'Recognising the real emotion changes your response. Anger says "attack." Hurt says "communicate." Practice naming the real feeling once today.',
    ],
    whyItWorks:
      'Labelling the softer emotion activates different coping behaviours than rage does.',
    proTip: 'If "hurt" feels exposing, write it privately — still counts.',
    affirmation: 'I can name what anger is protecting.',
    estimatedTime: '15 minutes',
  },
  {
    day: 10,
    title: 'Stress-Anger Connection',
    description:
      'When your stress tank is full, anger becomes the overflow valve. Today you lower the baseline.',
    instructions: [
      'Rate your current stress level 1-10. Write down every active stressor in your life right now — work, financial, relationship, health, all of it.',
      'Circle the 3 you can actually influence this week. For each one, write one small action you can take in the next 48 hours to reduce it by even 10%.',
      'Do a 5-minute progressive muscle relaxation: tense each muscle group for 5 seconds, release for 10. Start at your feet, work up to your face. This physically lowers cortisol.',
    ],
    whyItWorks:
      'Lowering baseline stress raises the threshold before anger trips.',
    proTip: 'Ten percent reductions compound — don\'t wait for a perfect fix.',
    affirmation: 'I shrink the fuel tank anger draws from.',
    estimatedTime: '20 minutes',
  },
  {
    day: 11,
    title: 'Relationship Repair',
    description: 'Anger leaves damage. Today you start repairing it.',
    instructions: [
      'Write down 2 relationships where your anger has caused harm. Be specific about what you did or said.',
      'For each one, write a genuine acknowledgement: what you did, the impact it had on them, and what you\'re doing differently now. No excuses, no "but you also..."',
      'If it\'s safe and appropriate, deliver one of these acknowledgements today — in person, by phone, or in writing. If it\'s not the right time, practice saying it out loud to yourself.',
    ],
    whyItWorks:
      'Repair restores trust and removes shame loops that feed future rage.',
    proTip: 'Own your side only — repair is not the moment for their scorecard.',
    affirmation: 'I clean up my side of the street.',
    estimatedTime: '20 minutes',
  },
  {
    day: 12,
    title: 'The Cool-Down Protocol',
    description:
      'Build a personalised de-escalation sequence you can deploy anywhere.',
    instructions: [
      'Using everything you\'ve learned, build your personal cool-down protocol — a 3-step sequence you can run in under 2 minutes.',
      'Write it on a card or a note in your phone. Example: (1) Tactical Pause — 4 breaths, (2) Name the real emotion, (3) State what I need using the formula.',
      'Test it by visualising your most intense trigger scenario and running through the protocol mentally. Repeat 3 times.',
    ],
    whyItWorks:
      'A rehearsed stack beats improvisation when your IQ temporarily drops under heat.',
    proTip: 'Three steps max — more and you won\'t use it.',
    affirmation: 'I have a protocol I can run when everything gets loud.',
    estimatedTime: '15 minutes',
  },
  {
    day: 13,
    title: 'Anger Patterns Over Time',
    description:
      'Review your anger log data and spot the patterns you couldn\'t see before.',
    instructions: [
      'Review all your anger log entries from the past week. Calculate your average intensity score.',
      'Identify: What time of day are you most reactive? Which trigger appears most often? Is there a day of the week that\'s consistently worse?',
      'Write down 2 specific adjustments based on these patterns (e.g. "I\'m most reactive at 6pm when I get home from work — I\'ll take a 10-minute walk before entering the house").',
    ],
    whyItWorks:
      'Temporal patterns reveal environmental and fatigue factors you can schedule around.',
    proTip: 'If you didn\'t keep a log, reconstruct from memory honestly.',
    affirmation: 'I use patterns to protect people I care about.',
    estimatedTime: '15 minutes',
  },
  {
    day: 14,
    title: 'Controlled Exposure',
    description:
      'Deliberately face a minor trigger and practise your response under controlled conditions.',
    instructions: [
      'Choose a low-intensity trigger (rated 3-4 out of 10). Put yourself in that situation today on purpose.',
      'Before entering, rehearse your cool-down protocol. Set your intention: "I will notice the trigger, run my protocol, and choose my response."',
      'Afterwards, debrief yourself: What intensity did you reach? Did you use the protocol? How did the outcome differ from your usual reaction? Write it down.',
    ],
    whyItWorks:
      'Graded exposure builds confidence and myelinates calm responses under mild load.',
    proTip: 'Pick boring-safe first — not the family wound.',
    affirmation: 'I train calm the same way I train strength — reps.',
    estimatedTime: '20 minutes',
  },
  {
    day: 15,
    title: 'Values Under Anger',
    description: 'Anger tells you something matters. Today you identify what.',
    instructions: [
      'For each of your top 3 triggers, ask: "What value of mine is being threatened here?" Respect? Fairness? Autonomy? Competence? Safety?',
      'Write a statement for each: "I value [X]. When [trigger] happens, it feels like [value] is under attack. A better response would be [action]."',
      'When you feel anger today, ask yourself: "What do I value that\'s being challenged right now?" This shifts you from reactive to reflective.',
    ],
    whyItWorks:
      'Values language connects anger to integrity instead of to attack mode.',
    proTip: 'If two values clash, note both — that tension is information.',
    affirmation: 'My anger points at what I stand for; I choose how I defend it.',
    estimatedTime: '15 minutes',
  },
  {
    day: 16,
    title: 'Sleep and Anger',
    description:
      'Sleep deprivation increases emotional reactivity by up to 60%. Fix the foundation.',
    instructions: [
      'Track your sleep for the past 3 nights: hours, quality (1-10), and how reactive you were the following day.',
      'Identify one sleep habit that\'s hurting you (late screen time, caffeine after 2pm, inconsistent bedtime, alcohol) and commit to changing it for the remaining protocol days.',
      'Tonight, try the 4-7-8 breathing technique before bed: inhale for 4 seconds, hold for 7, exhale for 8. Do 4 cycles. This activates the parasympathetic nervous system.',
    ],
    whyItWorks:
      'Sleep restores prefrontal braking power; without it, you drive with bad brakes.',
    proTip: 'One sleep lever beats a ten-item sleep lecture.',
    affirmation: 'I protect sleep like I protect the people around me.',
    estimatedTime: '15 minutes',
  },
  {
    day: 17,
    title: 'The Assertiveness Drill',
    description:
      'Anger often builds when you don\'t say what you need. Assertiveness prevents the pressure build-up.',
    instructions: [
      'Identify a situation this week where you swallowed something that bothered you instead of speaking up.',
      'Write what you should have said using the Day 7 formula. Then practice saying it out loud 3 times with a calm, firm tone — not aggressive, not passive.',
      'Today, assert one boundary or preference that you would normally stay silent about. Start small: a food order, a schedule preference, a disagreement. The muscle needs exercise.',
    ],
    whyItWorks:
      'Unspoken resentments convert to rage; early truth lowers the pressure.',
    proTip: 'Calm voice, not cold voice — firm is not mean.',
    affirmation: 'I say what I need before it becomes weaponised silence.',
    estimatedTime: '20 minutes',
  },
  {
    day: 18,
    title: 'Gratitude Counterbalance',
    description:
      'Anger narrows your focus to threats. Gratitude widens it back to reality.',
    instructions: [
      'Write down 5 things that went well today or this week. Not big things — small wins, moments of peace, things that worked.',
      'For each one, write who or what contributed to it. This counteracts the anger habit of seeing only problems.',
      'Set a phone alarm for the same time tomorrow. When it fires, write 3 things you\'re grateful for in that moment. This is the beginning of a pattern interrupt.',
    ],
    whyItWorks:
      'Broadening attention competes with threat-scanning circuits anger feeds on.',
    proTip: 'Tiny specifics beat generic "family/health".',
    affirmation: 'I can hold frustration and still see what is working.',
    estimatedTime: '10 minutes',
  },
  {
    day: 19,
    title: 'Physical Baseline Reset',
    description:
      'Your body holds tension patterns from years of anger. Today you release stored tension.',
    instructions: [
      'Do a 10-minute body scan: lie flat, close your eyes, and slowly move attention from your toes to your head. Notice where you hold tension — jaw, shoulders, fists, stomach.',
      'For each tension point, deliberately tense the area for 10 seconds, then release completely. Repeat 3 times per area.',
      'Go for a 15-minute walk at a deliberate, moderate pace. No phone, no music. Focus only on the sensation of movement. This is active nervous system regulation.',
    ],
    whyItWorks:
      'Discharging chronic tension lowers baseline sympathetic tone.',
    proTip: 'Jaw and shoulders first — classic rage storage.',
    affirmation: 'I teach my body it can let go.',
    estimatedTime: '25 minutes',
  },
  {
    day: 20,
    title: 'Empathy Training',
    description:
      'Understanding other people\'s perspective doesn\'t mean agreeing with them. It means you can respond instead of react.',
    instructions: [
      'Think of the last person you were angry at. Write the situation from their perspective — genuinely trying to understand their motivations, pressures, and feelings.',
      'Identify one thing about their behaviour that makes sense from their point of view, even if you still disagree.',
      'Today, in any conversation that frustrates you, ask yourself: "What pressure is this person under right now?" before responding.',
    ],
    whyItWorks:
      'Perspective-taking reduces mind-reading that inflames anger.',
    proTip: 'Empathy for pressure is not permission for harm.',
    affirmation: 'I can see their humanity and still hold my line.',
    estimatedTime: '15 minutes',
  },
  {
    day: 21,
    title: 'Mid-Protocol Assessment',
    description: 'Three weeks in. Time to measure progress.',
    instructions: [
      'Re-rate your top 3 anger incidents from Day 1. Using the same scenarios, what intensity would you feel now? What would you do differently?',
      'Review your anger log. Compare your average intensity score from Week 1 vs Week 3. Count how many times you successfully used the tactical pause.',
      'Write down: (1) What\'s improved most, (2) What\'s still difficult, (3) One specific focus for the next 10 days.',
    ],
    whyItWorks:
      'Deliberate review converts effort into awareness of skill growth.',
    proTip: 'Progress can be quieter than fireworks — note small wins.',
    affirmation: 'I measure growth honestly and keep building.',
    estimatedTime: '15 minutes',
  },
  {
    day: 22,
    title: 'The Accountability Partner',
    description: 'Anger thrives in isolation. Accountability accelerates change.',
    instructions: [
      'Identify one person you trust — friend, partner, sibling, colleague — who you could be honest with about your anger work.',
      'Send them a message or have a conversation: "I\'ve been working on managing my anger better. I\'d appreciate if you could let me know when you notice me handling things well, or when I slip."',
      'If you\'re not ready for that, write yourself a letter of accountability: what you\'ve committed to, what you\'re doing, and what you\'ll do when you fail. Read it out loud.',
    ],
    whyItWorks:
      'Social witness raises the cost of old habits and the reward of new ones.',
    proTip: 'Ask for observation, not parenting.',
    affirmation: 'I don\'t white-knuckle change alone anymore.',
    estimatedTime: '15 minutes',
  },
  {
    day: 23,
    title: 'Trigger Rehearsal',
    description:
      'Elite performers rehearse under pressure. Today you rehearse anger scenarios before they happen.',
    instructions: [
      'Identify 3 upcoming situations in the next week that are likely to trigger your anger (a meeting, a conversation, a family event, a commute).',
      'For each one, write a specific plan: the trigger you expect, the emotion you\'ll feel, and exactly how you\'ll respond using your cool-down protocol.',
      'Visualise each scenario in detail. See yourself staying calm. Hear your calm voice. Feel the control. Mental rehearsal builds neural pathways identical to real practice.',
    ],
    whyItWorks:
      'Mental rehearsal primes the same circuits used in live performance.',
    proTip: 'If you catastrophise, reset the visualisation until you complete it calmly.',
    affirmation: 'I pre-game hard conversations like an athlete.',
    estimatedTime: '20 minutes',
  },
  {
    day: 24,
    title: 'Digital Detox',
    description:
      'Social media and news are anger amplifiers. Remove them for 24 hours and observe the difference.',
    instructions: [
      'Turn off all social media notifications. Move social media apps to a folder on the last page of your phone. Do not open them for 24 hours.',
      'When you reach for your phone out of habit, notice the impulse, take 3 breaths, and put it down.',
      'At the end of the day, rate your anger/irritation level compared to a typical day. Write down what you noticed about your mood without the digital noise.',
    ],
    whyItWorks:
      'Algorithmic outrage is designed to hook you; removing it lowers ambient irritability.',
    proTip: 'Tell one person your detox so you don\'t "accidentally" break it.',
    affirmation: 'I protect my attention from rage-bait.',
    estimatedTime: 'All day',
  },
  {
    day: 25,
    title: 'Forgiveness Protocol',
    description:
      'Carrying anger towards someone is drinking poison and expecting them to get sick. Today you start letting go.',
    instructions: [
      'Write the name of one person you\'re holding anger towards. Describe what they did and how it affected you. Be honest and specific.',
      'Write: "Holding onto this anger costs me [what it costs you — energy, sleep, peace, relationships]. Releasing it gives me [what you gain]."',
      'Forgiveness is not saying what they did was okay. It\'s deciding that their actions no longer control your emotional state. Write: "I am choosing to release this. Not for them. For me."',
    ],
    whyItWorks:
      'Forgiveness is an internal unhooking from a past event — it frees resources anger was burning.',
    proTip: 'Forgiveness ≠ reconciliation; safety first.',
    affirmation: 'I release what I can so I\'m not leased by the past.',
    estimatedTime: '20 minutes',
  },
  {
    day: 26,
    title: 'High-Pressure Simulation',
    description:
      'Step up the difficulty. Face a moderate trigger and maintain composure.',
    instructions: [
      'Choose a trigger rated 5-6 out of 10. This is harder than Day 14\'s exercise. Plan your approach: pre-set your protocol, define your success criteria.',
      'Enter the situation. If possible, have your accountability partner aware that you\'re practising.',
      'Debrief immediately after: Peak intensity reached? Protocol used? Response chosen? Rate your performance 1-10. Any score above 5 is progress.',
    ],
    whyItWorks:
      'Progressive overload builds emotional fitness the same way it builds physical fitness.',
    proTip: 'Define success as "used protocol" not "felt zero anger".',
    affirmation: 'I can handle harder heat without losing myself.',
    estimatedTime: '20 minutes',
  },
  {
    day: 27,
    title: 'Teaching What You\'ve Learned',
    description: 'The best way to solidify a skill is to teach it.',
    instructions: [
      'Write a short message (3-5 sentences) explaining the tactical pause to someone who\'s never heard of it. Keep it practical and simple.',
      'If appropriate, share this with a friend, family member, or online community. Teaching forces you to internalise the concept at a deeper level.',
      'Alternatively, write a "note to your past self" — what would you tell yourself 27 days ago about managing anger?',
    ],
    whyItWorks:
      'Teaching compresses knowledge into usable language and exposes gaps.',
    proTip: 'If you can\'t explain it simply, rehearse once more.',
    affirmation: 'What I teach, I deepen.',
    estimatedTime: '15 minutes',
  },
  {
    day: 28,
    title: 'Relapse Planning',
    description: 'You will have bad days. Today you build a plan for them.',
    instructions: [
      'Write down 3 warning signs that you\'re slipping back into old patterns (e.g. clenching jaw, snapping at small things, ruminating on revenge scenarios).',
      'For each warning sign, write a specific action: "When I notice [sign], I will [action]."',
      'Create an "emergency card" on your phone with your cool-down protocol, your top 3 coping strategies, and the name of your accountability partner. This is your break-glass plan.',
    ],
    whyItWorks:
      'Relapse plans prevent a bad hour from becoming a bad month.',
    proTip: 'Put the emergency card on your lock screen notes.',
    affirmation: 'Slip is data; my plan pulls me back faster.',
    estimatedTime: '15 minutes',
  },
  {
    day: 29,
    title: 'Stress Inoculation',
    description:
      'Build resilience by gradually increasing your tolerance for discomfort.',
    instructions: [
      'Take a 30-second cold shower or submerge your face in cold water for 15 seconds. This activates the dive reflex and teaches your nervous system to stay calm under shock.',
      'Do a 5-minute breathing exercise in an uncomfortable position (wall sit, plank). The goal is to maintain calm breathing while your body is under stress.',
      'Reflect: how did you manage discomfort without anger or frustration? The ability to stay composed under physical stress transfers directly to emotional stress.',
    ],
    whyItWorks:
      'Controlled stress with calm breathing expands your window of tolerance.',
    proTip: 'Stop if you have a medical reason cold stress is unsafe.',
    affirmation: 'I can stay steady when my body protests.',
    estimatedTime: '20 minutes',
  },
  {
    day: 30,
    title: 'Final Assessment and Maintenance Plan',
    description: 'Measure your transformation and build your ongoing system.',
    instructions: [
      'Re-do the Day 1 anger audit with your top 3 scenarios. Rate intensity now vs Day 1. Calculate your percentage improvement.',
      'Write your personal anger management maintenance plan: (1) Daily practice (2 min breathing), (2) Weekly review (anger log check), (3) Monthly calibration (re-run this assessment).',
      'Write a single sentence that captures what you\'ve learned: "Anger is [your definition]. I manage it by [your method]. I am [who you are now]." Put this where you\'ll see it daily.',
    ],
    whyItWorks:
      'Maintenance plans prevent the common crash after a sprint of self-improvement.',
    proTip: 'Schedule the weekly review like a meeting you can\'t skip.',
    affirmation: 'This protocol ends; the practice continues.',
    estimatedTime: '25 minutes',
  },
];

export const pressureValveMissions14: DailyMission[] =
  pressureValveMissions30.slice(0, 14);

export const pressureValveMissions7: DailyMission[] =
  pressureValveMissions30.slice(0, 7);

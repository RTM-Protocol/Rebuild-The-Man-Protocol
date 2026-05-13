import type { DailyMission } from '@/types';

/** Full System Overload Protocol — 30 days (sliced for 7- and 14-day tracks). */
export const systemOverloadMissions30: DailyMission[] = [
  {
    day: 1,
    title: 'Stress Inventory',
    description:
      'Catalogue every active stressor in your life. You can\'t manage what you haven\'t mapped.',
    instructions: [
      'Write down every source of stress in your life right now. Work, money, relationships, health, housing, family, future uncertainty — everything.',
      'Rate each one: Impact (1–10) and Control (1–10). High impact + high control = priority. High impact + low control = acceptance work.',
      'Circle your top 3 highest-impact stressors. These are your focus for this protocol.',
    ],
    whyItWorks:
      'Stress feels like one big fog until you itemise it. Impact × control shows where effort pays off versus where you need acceptance skills.',
    proTip: 'Be honest on Control — "none" is rare; often there is a small lever (boundary, ask, habit).',
    affirmation: 'I name what loads my system so I can work it deliberately.',
    estimatedTime: '15 minutes',
  },
  {
    day: 2,
    title: 'Body Stress Scan',
    description: 'Stress stores in the body. Today you find where yours lives.',
    instructions: [
      'Lie flat for 10 minutes. Starting at your feet, slowly move your attention up through every body part. Where do you feel tension, tightness, or discomfort?',
      'Write down your stress storage points (common: jaw, neck, shoulders, lower back, stomach, chest, hands).',
      'For each tension point, press firmly for 10 seconds, then release. Breathe into the area. This is myofascial release — it breaks the physical stress loop.',
    ],
    whyItWorks:
      'Chronic stress keeps muscles braced; the body keeps signalling danger. Release work interrupts the somatic half of the loop.',
    proTip: 'Don\'t fix everything — pick 2 points you\'ll revisit daily for a week.',
    affirmation: 'I can feel where stress lives in my body and soften it on purpose.',
    estimatedTime: '15 minutes',
  },
  {
    day: 3,
    title: 'The Control Sort',
    description:
      'Separate what you can control from what you can\'t. Then let go of one category.',
    instructions: [
      'Take your stress inventory from Day 1. Draw two columns: "Within My Control" and "Outside My Control." Sort every stressor into one column.',
      'For the "Outside My Control" column, write next to each: "I release the need to control this. I focus on my response."',
      'For the "Within My Control" column, write one specific action you can take this week for each item. Small, concrete, doable.',
    ],
    whyItWorks:
      'Burnout feeds on fused responsibility — pretending you can steer outcomes you can\'t. Sorting restores accurate effort.',
    proTip: 'If you resist "outside my control," ask: could I guarantee the outcome with unlimited effort? If no, it\'s not fully yours.',
    affirmation: 'I invest energy where I have leverage and practise acceptance where I don\'t.',
    estimatedTime: '15 minutes',
  },
  {
    day: 4,
    title: 'Energy Audit',
    description:
      'Stress isn\'t just about what\'s happening to you. It\'s about what\'s draining you.',
    instructions: [
      'Write down everything you did yesterday. Next to each activity, mark it as E+ (gave you energy) or E− (drained you).',
      'Calculate the ratio. If you have more E− than E+, your system is in deficit — burnout is inevitable.',
      'Identify one E− activity you can eliminate, delegate, or reduce this week, and one E+ activity you can add or extend.',
    ],
    whyItWorks:
      'Stress is load minus recovery. The ledger reveals silent leaks you can plug before the tank hits empty.',
    proTip: 'Even 15 extra minutes of an E+ counts — think minimum viable recharge.',
    affirmation: 'I protect my energy like a finite resource — because it is.',
    estimatedTime: '15 minutes',
  },
  {
    day: 5,
    title: 'Breathing Reset',
    description:
      'Learn three breathing techniques that lower cortisol in under 5 minutes.',
    instructions: [
      'Technique 1 — Box Breathing: Inhale 4 sec, hold 4 sec, exhale 4 sec, hold 4 sec. Repeat 4 cycles. Used by Navy SEALs under combat stress.',
      'Technique 2 — Physiological Sigh: Double inhale through nose (one long, one short), slow exhale through mouth. This is the fastest way to calm the nervous system. Do 3 reps.',
      'Technique 3 — 4-7-8: Inhale 4 sec, hold 7 sec, exhale 8 sec. 4 cycles. Best for sleep and deep relaxation. Practice all three and note which one works best for you.',
    ],
    whyItWorks:
      'Longer exhales shift tone toward the parasympathetic system — the brake pedal on stress chemistry.',
    proTip: 'Pick a default technique today and use the same one for every spike this week.',
    affirmation: 'My breath is a dial I can turn when stress spikes.',
    estimatedTime: '10 minutes',
  },
  {
    day: 6,
    title: 'The Time Boundary',
    description:
      'Overcommitment is the number one driver of chronic stress. Today you build a wall.',
    instructions: [
      'Look at your calendar for the next 7 days. Identify 2 commitments you can cancel, decline, or reschedule without serious consequences.',
      'Write a template decline message: "Thanks for thinking of me. I can\'t commit to this right now. Let me know if [alternative]." Practice using it.',
      'Block 30 minutes of "nothing time" in your calendar for tomorrow. Not rest, not exercise — literally nothing. Protect this time as if it\'s a meeting with your CEO.',
    ],
    whyItWorks:
      'Capacity is finite; every unguarded yes borrows from sleep, health, and patience. Boundaries are preventative medicine.',
    proTip: 'Decline without over-explaining; clarity beats a paragraph of guilt.',
    affirmation: 'My calendar reflects my priorities, not everyone else\'s urgency.',
    estimatedTime: '15 minutes',
  },
  {
    day: 7,
    title: 'Worry Dump',
    description:
      'Get every worry out of your head and onto paper. Your brain is a processor, not a hard drive.',
    instructions: [
      'Set a timer for 10 minutes. Write every worry, fear, concern, and "what if" on paper. Don\'t filter, don\'t judge. Just dump everything.',
      'Read through the list. Cross out anything that\'s (a) unlikely to happen, (b) already happened and can\'t be changed, or (c) genuinely trivial.',
      'For the remaining items, write the single next action for each. Not the solution — just the very next step. "Call the bank." "Book the appointment." "Ask for the deadline extension."',
    ],
    whyItWorks:
      'Writing externalises rumination so working memory can rest. Next actions turn vague dread into concrete motion.',
    proTip: 'If an item has no next action, it may be a worry to accept, not a problem to solve.',
    affirmation: 'I empty mental RAM onto paper and pick one honest next step.',
    estimatedTime: '15 minutes',
  },
  {
    day: 8,
    title: 'Digital Stress Reduction',
    description: 'Your phone is a stress amplifier. Today you reduce its grip.',
    instructions: [
      'Turn off ALL non-essential notifications — social media, news, promotional emails. Keep only calls, texts, and calendar.',
      'Move social media apps to the last page of your phone or into a folder called "Not Now."',
      'Check how much screen time you used yesterday (Settings → Screen Time on iPhone, Digital Wellbeing on Android). Set a goal to reduce it by 25% this week.',
    ],
    whyItWorks:
      'Interruptions fragment attention and keep the sympathetic system lightly armed all day. Fewer pings, lower baseline arousal.',
    proTip: 'Greyscale your phone for a week — novelty colours are engineered to hook you.',
    affirmation: 'I decide when the digital world gets my attention.',
    estimatedTime: '15 minutes',
  },
  {
    day: 9,
    title: 'Movement as Medicine',
    description:
      'Exercise is the most underutilised antidepressant and anti-anxiety tool in existence.',
    instructions: [
      'Do 20 minutes of moderate exercise right now. Walking counts. The key is elevated heart rate for a sustained period.',
      'During the exercise, focus on your breathing and physical sensations — not your problems. This is active meditation.',
      'Commit to 20 minutes of movement every day for the remaining protocol. Put it in your calendar. Non-negotiable. The research is unambiguous: regular exercise reduces cortisol by up to 30%.',
    ],
    whyItWorks:
      'Aerobic movement metabolises stress hormones and improves sleep — the two biggest stress regulators.',
    proTip: 'Same time daily beats heroic random workouts for nervous system stability.',
    affirmation: 'Moving my body is part of how I regulate my mind.',
    estimatedTime: '25 minutes',
  },
  {
    day: 10,
    title: 'Sleep Repair',
    description:
      'Sleep is when your brain processes stress. Poor sleep = accumulated stress.',
    instructions: [
      'Write down your current sleep routine. What time do you stop screens? What time do you get into bed? What do you do in the last hour before sleep?',
      'Design a new wind-down protocol: (1) Screens off 60 min before bed, (2) Dim lights, (3) Do 5 minutes of 4-7-8 breathing, (4) Same bedtime every night.',
      'Implement one change tonight. Not all of them — one. Add another tomorrow. Habit stacking works better than overhaul.',
    ],
    whyItWorks:
      'Sleep debt lowers prefrontal control and amplifies amygdala reactivity — you stress harder on less sleep.',
    proTip: 'Fix wake time first; bedtime often follows once melatonin timing stabilises.',
    affirmation: 'Sleep is maintenance, not luxury — I protect it.',
    estimatedTime: '15 minutes',
  },
  {
    day: 11,
    title: 'The Stress Response Log',
    description: 'Start tracking stress responses to spot patterns.',
    instructions: [
      'Create a log: Time, Stressor, Physical Response (where did you feel it?), Mental Response (what thought fired?), Action Taken.',
      'Log every stress response today. Include small ones — inbox overwhelm, traffic, a message you didn\'t want to receive.',
      'At the end of the day, review. What patterns emerge? Same time of day? Same type of trigger? Same physical response?',
    ],
    whyItWorks:
      'Patterns that stay unconscious feel random; logged data shows repetition — and repetition can be engineered around.',
    proTip: 'One line per event beats perfect notes you never keep.',
    affirmation: 'I study my stress like data until the patterns speak.',
    estimatedTime: '15 minutes',
  },
  {
    day: 12,
    title: 'Cognitive Defusion',
    description:
      'Your stressful thoughts are not facts. Today you learn to separate yourself from them.',
    instructions: [
      'Take your most persistent worry. Write it down as: "I\'m having the thought that [worry]." Notice how adding that prefix creates distance.',
      'Repeat the worry out loud in a cartoon voice (literally — Mickey Mouse, Homer Simpson, whatever). Notice how the emotional charge reduces. This is cognitive defusion from ACT therapy.',
      'For the rest of today, when a stressful thought arises, prefix it with "I notice I\'m having the thought that..." You are not your thoughts. You are the one observing them.',
    ],
    whyItWorks:
      'Fusion with thoughts treats hypotheses as verdicts. Defusion restores the gap between idea and identity.',
    proTip: 'Silly voice isn\'t trivial — it\'s a rapid pattern interrupt for the auditory loop.',
    affirmation: 'Thoughts pass through me; they are not commands I must obey.',
    estimatedTime: '15 minutes',
  },
  {
    day: 13,
    title: 'Nutrition and Stress',
    description:
      'What you eat directly affects cortisol levels. Small changes, measurable impact.',
    instructions: [
      'Write down what you ate and drank yesterday. Mark anything high in sugar, caffeine, or alcohol — these all spike cortisol.',
      'Commit to one nutritional change for the rest of the protocol: reduce caffeine after 12pm, add one extra serving of vegetables per day, or drink an additional litre of water.',
      'Today, eat one meal slowly and without screens. Chew each bite thoroughly. This activates the parasympathetic nervous system — the opposite of stress mode.',
    ],
    whyItWorks:
      'Blood sugar swings and stimulants mimic and amplify anxiety physiology. Steady fuel steadies mood.',
    proTip: 'One meal mindful beats a perfect diet plan you abandon in three days.',
    affirmation: 'I fuel my body in ways that calm my stress chemistry.',
    estimatedTime: '15 minutes',
  },
  {
    day: 14,
    title: 'The One-Thing Focus',
    description:
      'Multitasking is a myth. It increases cortisol by up to 40%. Today you practice single-tasking.',
    instructions: [
      'Choose the most important task on your to-do list today. Set a 25-minute timer. Work on ONLY that task — no email, no phone, no switching.',
      'When the timer ends, take a 5-minute break. Then do another 25-minute block. This is the Pomodoro Technique.',
      'At the end of the day, compare how much you accomplished vs a typical multitasking day. Write down the difference.',
    ],
    whyItWorks:
      'Attention residue from task-switching taxes the prefrontal cortex; deep blocks finish work with less total stress.',
    proTip: 'Write the exact next action on a sticky before you start the timer.',
    affirmation: 'One thing at a time — fully — is how I do my best work.',
    estimatedTime: '15 minutes',
  },
  {
    day: 15,
    title: 'Social Stress Mapping',
    description:
      'Some relationships drain you. Some restore you. Know the difference.',
    instructions: [
      'Write down the 10 people you interact with most. Next to each, write D (drainer) or R (restorer).',
      'For each drainer, identify why: Is it their negativity? Demands on your time? Conflict? Lack of reciprocity?',
      'Commit to one boundary with one drainer this week (reduce contact, say no to one request, time-limit interactions) and one extra interaction with one restorer.',
    ],
    whyItWorks:
      'Social physiology is real — some people cost recovery. Strategic distance isn\'t cruelty; it\'s conservation.',
    proTip: 'Boundaries work best as specific, not vague ("Tuesdays after 8pm I\'m offline").',
    affirmation: 'I curate my social load so I can show up well for what matters.',
    estimatedTime: '15 minutes',
  },
  {
    day: 16,
    title: 'Worry Window',
    description:
      'Schedule your worrying. Sounds strange. Works powerfully.',
    instructions: [
      'Set a specific 15-minute window tomorrow as your "worry time" — e.g. 5:00–5:15pm. Write it in your calendar.',
      'Every time a worry arises outside that window, write it on a list and tell yourself: "I\'ll deal with this at 5pm." Then refocus.',
      'During your worry window, go through the list. Solve what you can, write next actions for what needs them, and let go of the rest. You\'ll find most worries have dissolved by the time you revisit them.',
    ],
    whyItWorks:
      'Containment trains the brain that worry has a slot — it doesn\'t need to run all day.',
    proTip: 'Use a physical pad for the capture list — tangibility helps the deferral stick.',
    affirmation: 'I postpone rumination on purpose; I don\'t ban thinking — I schedule it.',
    estimatedTime: '10 minutes',
  },
  {
    day: 17,
    title: 'Nature Reset',
    description:
      'Research shows 20+ minutes in nature reduces cortisol by 21%. Get outside.',
    instructions: [
      'Spend 30 minutes in a green space. Park, woodland, riverside, garden — anywhere with trees and open sky.',
      'Leave your phone on silent in your pocket. Walk slowly. Notice colours, sounds, smells, air temperature. This is attention restoration therapy.',
      'When you return, rate your stress level compared to before. Write one sentence about what you noticed.',
    ],
    whyItWorks:
      'Soft fascination in natural settings lets directed attention recover — the same resource multitasking depletes.',
    proTip: 'No earbuds — let the soundscape do part of the work.',
    affirmation: 'The outside world helps my inside world settle.',
    estimatedTime: '30 minutes',
  },
  {
    day: 18,
    title: 'Delegation and Letting Go',
    description:
      'If everything depends on you, the system will always overload.',
    instructions: [
      'List 5 tasks or responsibilities you currently handle that someone else could do (even imperfectly).',
      'For each one, identify who could take it on: partner, colleague, family member, hired help, automated tool.',
      'Delegate or automate at least one of these today. It doesn\'t have to be done perfectly by someone else. Done is better than perfect.',
    ],
    whyItWorks:
      'Sustainable load requires distributed responsibility; heroics scale poorly.',
    proTip: 'Hand off with a clear outcome and deadline; resist hovering while they learn.',
    affirmation: 'I share the load without guilt — systems beat martyrdom.',
    estimatedTime: '15 minutes',
  },
  {
    day: 19,
    title: 'The Gratitude Rebalance',
    description:
      'Stress makes you see only problems. Gratitude manually corrects the filter.',
    instructions: [
      'Write 5 things you\'re genuinely grateful for today. Not generic — specific. Not "my health" but "the fact that my knee didn\'t hurt on my walk today."',
      'For each item, write who contributed to it and why it matters to you.',
      'Send a short thank-you message to one person who\'s positively impacted you recently. Expressing gratitude benefits the sender more than the receiver.',
    ],
    whyItWorks:
      'Gratitude broadens attention — it counteracts threat-biased scanning that stress installs.',
    proTip: 'Specificity is the difference between ritual and genuine shift.',
    affirmation: 'I widen the lens so stress isn\'t the only thing in frame.',
    estimatedTime: '10 minutes',
  },
  {
    day: 20,
    title: 'Perfectionism Audit',
    description:
      'Perfectionism is anxiety in a productivity costume. Time to unmask it.',
    instructions: [
      'Write down 3 tasks or areas of your life where you hold yourself to impossibly high standards.',
      'For each one, define "good enough" — the level that would be acceptable without being perfect. Write it as a specific, measurable threshold.',
      'Today, deliberately do one task to "good enough" standard and stop. Resist the urge to polish. Notice that the world continues to spin.',
    ],
    whyItWorks:
      'Perfectionism inflates cost-per-task and never pays matching returns; "good enough" restores throughput and rest.',
    proTip: 'Define done as a checklist of 3 criteria — when checked, you ship.',
    affirmation: 'Done and sustainable beats perfect and burnt out.',
    estimatedTime: '15 minutes',
  },
  {
    day: 21,
    title: 'Mid-Protocol Assessment',
    description: 'Three weeks in. Measure the shift.',
    instructions: [
      'Re-rate your top 3 stressors from Day 1. Impact and Control scores. Compare to your originals.',
      'List the tools you\'re actually using regularly (breathing techniques, worry dump, time boundaries, etc.) vs ones you\'ve dropped.',
      'Write your focus for the final 9 days: which technique needs more practice? Which stressor still needs attention?',
    ],
    whyItWorks:
      'Mid-course correction beats heroic starts that fizzle; data keeps the second half targeted.',
    proTip: 'Pick one dropped tool to revive — not five.',
    affirmation: 'I adjust based on evidence, not shame about inconsistency.',
    estimatedTime: '15 minutes',
  },
  {
    day: 22,
    title: 'Financial Stress Triage',
    description:
      'Money stress is the most common chronic stressor for men. Face it directly.',
    instructions: [
      'Open your bank account and look at your actual financial position. Write down your monthly income, your fixed expenses, and your discretionary spending. No guessing — real numbers.',
      'Identify one expense you can reduce or eliminate this month. Even £20 matters — it\'s about taking control, not the amount.',
      'If debt is a major stressor, write the total amount and the minimum monthly payment. Having the real number is less stressful than the imagined number. If you need help, write down one resource to contact (StepChange, Citizens Advice, etc.).',
    ],
    whyItWorks:
      'Avoidance keeps finance in the imagination — where it grows. Numbers shrink dread to manageable size.',
    proTip: 'One 15-minute money date weekly beats one annual panic.',
    affirmation: 'I look at money facts calmly — clarity is the first lever.',
    estimatedTime: '20 minutes',
  },
  {
    day: 23,
    title: 'The Values Compass',
    description:
      'Stress often comes from living out of alignment with what matters most to you.',
    instructions: [
      'Write your top 5 personal values (e.g. freedom, family, integrity, growth, adventure, security).',
      'For each value, rate 1–10 how well your current life reflects it. Where are the gaps?',
      'Choose the biggest gap. Write one small action you can take this week to move closer to that value. Alignment reduces stress more than time management ever will.',
    ],
    whyItWorks:
      'Misalignment creates background friction — you\'re winning tasks while losing self-coherence.',
    proTip: 'Small value-aligned actions beat big plans you never start.',
    affirmation: 'I steer my week toward what I say matters.',
    estimatedTime: '15 minutes',
  },
  {
    day: 24,
    title: 'Recovery Day Design',
    description:
      'High performers don\'t just manage stress. They schedule recovery.',
    instructions: [
      'Design your ideal recovery day — a day specifically built to restore your energy. What would you do? What would you NOT do?',
      'Schedule one recovery half-day in the next 7 days. Block it in your calendar. Protect it like a work deadline.',
      'Write 3 non-negotiable rules for your recovery time (e.g. no email, no chores, no work conversations).',
    ],
    whyItWorks:
      'Recovery that waits for collapse comes too late. Scheduled restoration keeps baseline capacity higher.',
    proTip: 'Book it before you "earn" it — earning is how overload happens.',
    affirmation: 'Recovery is part of performance, not the opposite of it.',
    estimatedTime: '15 minutes',
  },
  {
    day: 25,
    title: 'Saying No Without Guilt',
    description:
      'Every yes to something unimportant is a no to something that matters.',
    instructions: [
      'Write down 3 recent occasions where you said yes to something you wanted to say no to.',
      'For each one, write the real reason you said yes: guilt, fear of conflict, people-pleasing, FOMO.',
      'Write a "No Script" you can use: "I appreciate you thinking of me. I can\'t take this on right now, but [alternative if appropriate]." Practice saying it out loud until it feels natural.',
    ],
    whyItWorks:
      'Scripts lower the social anxiety cost of boundaries so you actually use them.',
    proTip: 'You don\'t owe a life story — brief and kind beats long and apologetic.',
    affirmation: 'A clear no protects my yeses.',
    estimatedTime: '15 minutes',
  },
  {
    day: 26,
    title: 'Stress Inoculation',
    description:
      'Gradually increasing your capacity to handle stress without breaking.',
    instructions: [
      'Do something deliberately uncomfortable for 5 minutes: cold exposure, holding a plank, sitting with boredom without your phone.',
      'During the discomfort, practice your breathing technique. Notice that you can tolerate more than your brain tells you.',
      'Reflect: What\'s the difference between stress and suffering? Stress is the situation. Suffering is the story. Practice separating them.',
    ],
    whyItWorks:
      'Controlled discomfort expands your window of tolerance — the same physiology anger and panic use gets rehearsed safely.',
    proTip: 'Stop at 5 minutes on purpose — building tolerance, not proving toughness.',
    affirmation: 'I can stay steady inside discomfort without catastrophising.',
    estimatedTime: '20 minutes',
  },
  {
    day: 27,
    title: 'Support System Activation',
    description:
      'Isolation amplifies stress. Connection reduces it.',
    instructions: [
      'Identify 3 people who genuinely want to support you. Not everyone qualifies — choose people who listen without judging.',
      'Reach out to one of them today. Not to vent — to connect. Ask how they\'re doing. Have a real conversation.',
      'If you don\'t have 3 people, write down one way you could build connection: a group, a community, a regular meetup. Take one step toward it.',
    ],
    whyItWorks:
      'Co-regulation lowers physiological stress markers; loneliness inflames them.',
    proTip: 'Lead with curiosity about them — connection before unloading builds trust.',
    affirmation: 'I don\'t have to carry everything alone.',
    estimatedTime: '15 minutes',
  },
  {
    day: 28,
    title: 'Stress Response Rehearsal',
    description:
      'Rehearse calm responses to your biggest remaining stressor.',
    instructions: [
      'Identify the stressor that still triggers the strongest response. Write the scenario in detail.',
      'Write your ideal response — what calm, controlled you would say, do, and feel.',
      'Visualise the scenario 3 times, each time running your ideal response. See yourself calm. Hear your measured voice. Feel the composure.',
    ],
    whyItWorks:
      'Mental rehearsal activates similar motor and linguistic prep as real encounters — fewer surprises, cleaner execution.',
    proTip: 'Rehearse the first 30 seconds — that\'s where reactivity usually decides the tone.',
    affirmation: 'I\'ve practised this moment before it arrives.',
    estimatedTime: '15 minutes',
  },
  {
    day: 29,
    title: 'The Maintenance Toolkit',
    description:
      'Build a portable stress management kit you can carry forward.',
    instructions: [
      'Write your top 3 most effective techniques from this protocol on a card or phone note.',
      'Schedule them: which ones will you do daily? Weekly? When stress spikes?',
      'Identify your early warning signs of system overload (the first signals that stress is building) and pair each one with a specific tool from your kit.',
    ],
    whyItWorks:
      'Tools without triggers get forgotten; paired if-then plans automate help-seeking behaviour.',
    proTip: 'Keep the card where panic looks first — lock screen note or wallet.',
    affirmation: 'I know my signs and my first moves — that\'s the whole game.',
    estimatedTime: '15 minutes',
  },
  {
    day: 30,
    title: 'Final Assessment and Forward Plan',
    description:
      'Measure your progress and set your ongoing system.',
    instructions: [
      'Re-do the Day 1 stress inventory. Rate every stressor for Impact and Control. Compare to your Day 1 scores.',
      'Calculate: How many stressors have reduced? How many have you eliminated? How has your physical stress response changed?',
      'Write your ongoing maintenance plan: (1) Daily practice (5 min breathing + movement), (2) Weekly review (stress log check + worry dump), (3) Monthly calibration (re-run the inventory). This is how you prevent system overload permanently.',
    ],
    whyItWorks:
      'Closure without maintenance planning snaps back old baselines; a written cadence keeps gains compound.',
    proTip: 'Put the monthly inventory on your calendar now — not when you\'re already overloaded.',
    affirmation: 'I built a system for stress — not just a good month.',
    estimatedTime: '25 minutes',
  },
];

export const systemOverloadMissions14 = systemOverloadMissions30.slice(0, 14);
export const systemOverloadMissions7 = systemOverloadMissions30.slice(0, 7);

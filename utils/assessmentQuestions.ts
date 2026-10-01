export type CategoricalQuestion = {
  kind: 'categorical';
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5';
  question: string;
  options: Array<{ value: string; label: string; icon?: string }>;
};

export type ScaleQuestion = {
  kind: 'scale';
  id: 'severity' | 'confidence';
  question: string;
  subLine: string;
  lowAnchor: string;
  highAnchor: string;
};

export type DiagnosticQuestion = CategoricalQuestion | ScaleQuestion;

export const ASSESSMENT_QUESTIONS: DiagnosticQuestion[] = [
  {
    kind: 'categorical',
    id: 'q1',
    question: "What's your biggest problem right now?",
    options: [
      { value: 'stress', label: 'Stress crushing me', icon: '⚠️' },
      { value: 'anger', label: 'Angry all the time', icon: '🔥' },
      { value: 'burnout', label: "Can't focus / burned out", icon: '🔋' },
      { value: 'confidence', label: 'Confidence shot', icon: '🎯' },
      { value: 'porn', label: 'Porn/sexual issues', icon: '🔄' },
      { value: 'relationship', label: 'Relationship problems', icon: '💬' },
      { value: 'depression', label: 'Depressed / no motivation', icon: '⚙️' },
      { value: 'anxiety', label: 'Anxious / overthinking', icon: '🌀' },
      { value: 'multiple', label: 'Not sure / multiple issues', icon: '__shield__' },
    ],
  },
  {
    kind: 'categorical',
    id: 'q2',
    question: 'How long has this been an issue?',
    options: [
      { value: 'recent', label: 'Last few weeks' },
      { value: 'months', label: '2-6 months' },
      { value: 'year', label: '6 months to a year' },
      { value: 'chronic', label: 'Over a year / always' },
    ],
  },
  {
    kind: 'categorical',
    id: 'q3',
    question: 'Is this affecting your work?',
    options: [
      { value: 'yes', label: 'Yes, significantly' },
      { value: 'somewhat', label: 'Somewhat' },
      { value: 'no', label: 'Not really' },
    ],
  },
  {
    kind: 'categorical',
    id: 'q4',
    question: 'Is this affecting your relationships?',
    options: [
      { value: 'yes', label: 'Yes, significantly' },
      { value: 'somewhat', label: 'Somewhat' },
      { value: 'no', label: 'Not really' },
    ],
  },
  {
    kind: 'categorical',
    id: 'q5',
    question: 'Tried fixing this before?',
    options: [
      { value: 'no', label: 'No, first time addressing it' },
      { value: 'failed', label: 'Yes, but failed' },
      { value: 'didnt-stick', label: "Yes, worked briefly but didn't stick" },
    ],
  },
  {
    kind: 'scale',
    id: 'severity',
    question: 'Right now, how bad is it?',
    subLine: 'The thing you picked above. Rate it as it stands today.',
    lowAnchor: '1 — Barely registers',
    highAnchor: '10 — Running my life',
  },
  {
    kind: 'scale',
    id: 'confidence',
    question: 'If it came back next month, could you handle it?',
    subLine: "Not whether you'd enjoy it. Whether you'd cope.",
    lowAnchor: "1 — No idea where I'd start",
    highAnchor: '10 — I know exactly what to do',
  },
];

export function categoricalLabel(
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5',
  value: string,
): string {
  const question = ASSESSMENT_QUESTIONS.find(
    (q): q is CategoricalQuestion => q.kind === 'categorical' && q.id === id,
  );
  return question?.options.find((o) => o.value === value)?.label ?? value;
}

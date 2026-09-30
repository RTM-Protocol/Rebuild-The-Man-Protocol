'use client';

import { useState } from 'react';
import ProtocolIcon from '@/components/ProtocolIcon';
import type { AssessmentAnswers } from '@/types';
import { DIAGNOSTIC_ANSWERS_KEY } from '@/utils/assessmentAnswers';

interface QuickDiagnosticProps {
  onComplete: (answers: AssessmentAnswers) => void;
  onSkip?: () => void;
  hideSkip?: boolean;
}

type CategoricalQuestion = {
  kind: 'categorical';
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5';
  question: string;
  options: Array<{ value: string; label: string; icon?: string }>;
};

type ScaleQuestion = {
  kind: 'scale';
  id: 'severity' | 'confidence';
  question: string;
  subLine: string;
  lowAnchor: string;
  highAnchor: string;
};

type DiagnosticQuestion = CategoricalQuestion | ScaleQuestion;

const questions: DiagnosticQuestion[] = [
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

export default function QuickDiagnostic({
  onComplete,
  onSkip,
  hideSkip = false,
}: QuickDiagnosticProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    severity: 0,
    confidence: 0,
  });

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;

  const persistAndComplete = (next: AssessmentAnswers) => {
    localStorage.setItem(DIAGNOSTIC_ANSWERS_KEY, JSON.stringify(next));
    localStorage.setItem('diagnostic_completed', 'true');
    onComplete(next);
  };

  const advance = (next: AssessmentAnswers) => {
    setAnswers(next);
    if (currentQuestion === totalQuestions - 1) {
      persistAndComplete(next);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleCategoricalAnswer = (value: string) => {
    if (currentQ.kind !== 'categorical') return;
    advance({ ...answers, [currentQ.id]: value });
  };

  const handleScaleChange = (value: number) => {
    if (currentQ.kind !== 'scale') return;
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const handleScaleContinue = () => {
    if (currentQ.kind !== 'scale') return;
    const value = answers[currentQ.id];
    if (value < 1 || value > 10) return;
    advance(answers);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const scaleValue = currentQ.kind === 'scale' ? answers[currentQ.id] : 0;
  const scaleAnswered = scaleValue >= 1 && scaleValue <= 10;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tactical-gray">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative min-h-full flex items-start sm:items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
        <div className="relative w-full max-w-3xl">
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="text-tactical-orange font-mono text-xs sm:text-sm uppercase tracking-wide flex-shrink-0">
                Question {currentQuestion + 1} of {totalQuestions}
              </div>
              {!hideSkip && onSkip && (
                <button
                  onClick={onSkip}
                  className="text-gray-400 hover:text-tactical-orange transition-colors text-xs sm:text-sm font-bold uppercase flex-shrink-0"
                >
                  Skip →
                </button>
              )}
            </div>

            <div className="h-1.5 bg-tactical-darkgray overflow-hidden">
              <div
                className="h-full bg-tactical-orange transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-tactical-darkgray border-2 border-tactical-orange p-5 sm:p-6 md:p-8 mb-5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 uppercase leading-tight">
              {currentQ.question}
            </h2>
            {currentQ.kind === 'scale' && (
              <p className="text-gray-400 text-sm sm:text-base mb-6">
                {currentQ.subLine}
              </p>
            )}

            {currentQ.kind === 'categorical' ? (
              <div
                className={`grid gap-3 ${
                  currentQ.id === 'q1'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {currentQ.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleCategoricalAnswer(option.value)}
                    className="bg-tactical-gray border-2 border-tactical-lightgray hover:border-tactical-orange hover:bg-tactical-lightgray/50 p-3 sm:p-4 text-left transition-all group min-h-[60px] flex items-center"
                  >
                    <div className="flex items-center gap-3 w-full">
                      {option.icon && (
                        <span className="text-2xl sm:text-3xl breathe-animation flex-shrink-0">
                          {option.icon === '__shield__' ? (
                            <ProtocolIcon protocolId="rebuild-the-man" />
                          ) : (
                            option.icon
                          )}
                        </span>
                      )}
                      <span className="text-white font-bold text-sm sm:text-base group-hover:text-tactical-orange transition-colors leading-snug">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-tactical-green text-sm font-mono hidden sm:block">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={scaleAnswered ? scaleValue : 1}
                    onChange={(e) => handleScaleChange(parseInt(e.target.value, 10))}
                    onClick={(e) => handleScaleChange(parseInt((e.target as HTMLInputElement).value, 10))}
                    className="flex-1 h-2 bg-tactical-gray rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: 'linear-gradient(to right, #4ade80 0%, #f97316 50%, #ef4444 100%)',
                    }}
                  />
                  <span className="text-tactical-orange text-sm font-mono hidden sm:block">10</span>
                  <span className="text-white font-bold text-lg w-8 text-center">
                    {scaleAnswered ? scaleValue : '—'}
                  </span>
                </div>
                <div className="flex justify-between gap-4 text-xs sm:text-sm text-gray-400 mb-6">
                  <span>{currentQ.lowAnchor}</span>
                  <span className="text-right">{currentQ.highAnchor}</span>
                </div>
                <button
                  type="button"
                  onClick={handleScaleContinue}
                  disabled={!scaleAnswered}
                  className={`btn-primary w-full py-3 ${!scaleAnswered ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  Continue →
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            {currentQuestion > 0 ? (
              <button
                onClick={handleBack}
                className="btn-secondary py-2.5 px-5 text-sm"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <div className="text-gray-400 text-xs sm:text-sm text-right">
              Takes about 60 seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

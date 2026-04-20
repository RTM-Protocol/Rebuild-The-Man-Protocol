'use client';

import { useState } from 'react';

interface DiagnosticAnswer {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

interface QuickDiagnosticProps {
  onComplete: (answers: DiagnosticAnswer) => void;
  onSkip: () => void;
}

export default function QuickDiagnostic({ onComplete, onSkip }: QuickDiagnosticProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswer>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });

  const questions = [
    {
      id: 'q1',
      question: "What's your biggest problem right now?",
      options: [
        { value: 'stress', label: 'Stress crushing me', icon: '⚠️' as const },
        { value: 'anger', label: 'Angry all the time', icon: '🔥' as const },
        { value: 'burnout', label: "Can't focus / burned out", icon: '🔋' as const },
        { value: 'confidence', label: 'Confidence shot', icon: '🎯' as const },
        { value: 'porn', label: 'Porn/sexual issues', icon: '🔄' as const },
        { value: 'relationship', label: 'Relationship problems', icon: '💬' as const },
        { value: 'depression', label: 'Depressed / no motivation', icon: '⚙️' as const },
        { value: 'anxiety', label: 'Anxious / overthinking', icon: '🌀' as const },
        { value: 'multiple', label: 'Not sure / multiple issues', icon: '🔨' as const }
      ]
    },
    {
      id: 'q2',
      question: "How long has this been an issue?",
      options: [
        { value: 'recent', label: 'Last few weeks' },
        { value: 'months', label: '2-6 months' },
        { value: 'year', label: '6 months to a year' },
        { value: 'chronic', label: 'Over a year / always' }
      ]
    },
    {
      id: 'q3',
      question: "Is this affecting your work?",
      options: [
        { value: 'yes', label: 'Yes, significantly' },
        { value: 'somewhat', label: 'Somewhat' },
        { value: 'no', label: 'Not really' }
      ]
    },
    {
      id: 'q4',
      question: "Is this affecting your relationships?",
      options: [
        { value: 'yes', label: 'Yes, significantly' },
        { value: 'somewhat', label: 'Somewhat' },
        { value: 'no', label: 'Not really' }
      ]
    },
    {
      id: 'q5',
      question: "Tried fixing this before?",
      options: [
        { value: 'no', label: 'No, first time addressing it' },
        { value: 'failed', label: 'Yes, but failed' },
        { value: 'didnt-stick', label: "Yes, worked briefly but didn't stick" }
      ]
    }
  ];

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleAnswer = (value: string) => {
    const questionId = currentQ.id as keyof DiagnosticAnswer;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // If last question, complete
    if (currentQuestion === totalQuestions - 1) {
      // Save to localStorage
      localStorage.setItem('diagnostic_answers', JSON.stringify(newAnswers));
      localStorage.setItem('diagnostic_completed', 'true');
      onComplete(newAnswers);
    } else {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tactical-gray">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Content Wrapper — allows vertical scrolling when content exceeds viewport */}
      <div className="relative min-h-full flex items-start sm:items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
        <div className="relative w-full max-w-3xl">
          {/* Header */}
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="text-tactical-orange font-mono text-xs sm:text-sm uppercase tracking-wide flex-shrink-0">
                Question {currentQuestion + 1} of {totalQuestions}
              </div>
              <button
                onClick={onSkip}
                className="text-gray-400 hover:text-tactical-orange transition-colors text-xs sm:text-sm font-bold uppercase flex-shrink-0"
              >
                Skip →
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-tactical-darkgray overflow-hidden">
              <div
                className="h-full bg-tactical-orange transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-tactical-darkgray border-2 border-tactical-orange p-5 sm:p-6 md:p-8 mb-5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-5 sm:mb-6 uppercase leading-tight">
              {currentQ.question}
            </h2>

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
                  onClick={() => handleAnswer(option.value)}
                  className="bg-tactical-gray border-2 border-tactical-lightgray hover:border-tactical-orange hover:bg-tactical-lightgray/50 p-3 sm:p-4 text-left transition-all group min-h-[60px] flex items-center"
                >
                  <div className="flex items-center gap-3 w-full">
                    {'icon' in option && (
                      <span className="text-2xl sm:text-3xl breathe-animation flex-shrink-0">
                        {option.icon}
                      </span>
                    )}
                    <span className="text-white font-bold text-sm sm:text-base group-hover:text-tactical-orange transition-colors leading-snug">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
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


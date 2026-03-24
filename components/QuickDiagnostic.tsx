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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tactical-gray">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Content */}
      <div className="relative max-w-3xl w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-tactical-orange font-mono text-sm uppercase">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
            <button
              onClick={onSkip}
              className="text-gray-500 hover:text-tactical-orange transition-colors text-sm font-bold uppercase"
            >
              Skip Diagnostic →
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-tactical-gray overflow-hidden">
            <div 
              className="h-full bg-tactical-orange transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-tactical-darkgray border-2 border-tactical-orange p-8 mb-6">
          <h2 className="text-3xl font-bold text-white mb-8 uppercase">
            {currentQ.question}
          </h2>

          <div className={`grid gap-4 ${currentQ.id === 'q1' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="bg-tactical-gray border-2 border-tactical-lightgray hover:border-tactical-orange hover:bg-tactical-lightgray p-6 text-left transition-all group"
              >
                <div className="flex items-center gap-4">
                  {'icon' in option && (
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {option.icon}
                    </span>
                  )}
                  <span className="text-white font-bold text-lg group-hover:text-tactical-orange transition-colors">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {currentQuestion > 0 ? (
            <button
              onClick={handleBack}
              className="btn-secondary py-3 px-6"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          
          <div className="text-gray-500 text-sm">
            Takes about 60 seconds
          </div>
        </div>
      </div>
    </div>
  );
}


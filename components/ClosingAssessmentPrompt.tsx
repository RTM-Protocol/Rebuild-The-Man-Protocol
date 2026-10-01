'use client';

interface ClosingAssessmentPromptProps {
  isOpen: boolean;
  baselineTaken: boolean;
  onAnswer: () => void;
  onSkip: () => void;
}

export default function ClosingAssessmentPrompt({
  isOpen,
  baselineTaken,
  onAnswer,
  onSkip,
}: ClosingAssessmentPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-tactical-darkgray border-2 border-tactical-lightgray max-w-lg w-full p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">
          Last thing.
        </h2>
        <p className="text-gray-200 leading-relaxed mb-8">
          {baselineTaken
            ? 'Same seven questions you answered on day one. Answer them straight — the report is only as honest as this is.'
            : "Seven questions. You skipped these at the start, so there's nothing to compare against, but answering now gives you a record of where you're finishing."}
        </p>
        <div className="flex flex-col gap-3">
          <button type="button" onClick={onAnswer} className="btn-primary w-full py-4">
            Answer them
          </button>
          <button type="button" onClick={onSkip} className="btn-secondary w-full py-4">
            Skip — go to my report
          </button>
        </div>
      </div>
    </div>
  );
}

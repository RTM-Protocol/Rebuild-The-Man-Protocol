'use client';

interface BaselineSkipPromptProps {
  isOpen: boolean;
  onTake: () => void;
  onSkip: () => void;
}

export default function BaselineSkipPrompt({
  isOpen,
  onTake,
  onSkip,
}: BaselineSkipPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-tactical-darkgray border-2 border-tactical-lightgray max-w-lg w-full p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">
          Two minutes before you start
        </h2>
        <div className="text-gray-200 leading-relaxed space-y-4 mb-8">
          <p>
            Answering seven questions now gives you a starting point. When you finish, the app can show you what actually moved — in numbers, not impressions.
          </p>
          <p>
            Skip it and you still get the protocol, and a report at the end. It just won&apos;t have a before to compare against.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onTake}
            className="btn-primary w-full py-4"
          >
            Take the assessment
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="btn-secondary w-full py-4"
          >
            Skip — start Day 1
          </button>
        </div>
      </div>
    </div>
  );
}

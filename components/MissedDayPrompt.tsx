'use client';

interface MissedDayPromptProps {
  isOpen: boolean;
  missedCount: number;
  completedCount: number;
  totalDays: number;
  onAddPartner: () => void;
  onContinueSolo: () => void;
}

export default function MissedDayPrompt({
  isOpen,
  missedCount,
  completedCount,
  totalDays,
  onAddPartner,
  onContinueSolo,
}: MissedDayPromptProps) {
  if (!isOpen) return null;

  const progressPercent = Math.round((completedCount / totalDays) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-tactical-darkgray border-2 border-tactical-lightgray max-w-lg w-full p-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">💪</div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">
            Hey — You&apos;re Doing Great
          </h2>
          <p className="text-tactical-green-bright font-mono text-sm uppercase">
            {progressPercent}% progress — keep going
          </p>
        </div>

        <div className="bg-tactical-gray border-l-4 border-tactical-green p-5 mb-6">
          <p className="text-gray-200 leading-relaxed mb-3">
            We noticed you&apos;ve missed {missedCount === 1 ? 'a day' : `${missedCount} days`} recently.
            That&apos;s completely normal — life happens. What matters is that you&apos;re back.
          </p>
          <p className="text-white font-bold leading-relaxed">
            The light at the end of the tunnel is not far away. You&apos;ve already completed {completedCount} {completedCount === 1 ? 'mission' : 'missions'}.
            Every step forward counts.
          </p>
        </div>

        <div className="bg-tactical-gray/50 border border-tactical-lightgray p-4 mb-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            <span className="text-tactical-orange font-bold">Quick thought:</span> Would an accountability
            partner help you stay on track? Someone who checks in on your progress can make a real difference.
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            This protocol is built for solo work — but a partner adds commitment.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onAddPartner}
            className="w-full bg-tactical-darkgray border-2 border-tactical-orange hover:border-tactical-orange-bright text-white font-bold uppercase tracking-wide py-3 px-6 transition-all text-sm"
          >
            🤝 YES, ADD AN ACCOUNTABILITY PARTNER
          </button>
          <button
            onClick={onContinueSolo}
            className="btn-primary w-full py-4"
          >
            I&apos;M GOOD — LET&apos;S KEEP GOING 💪
          </button>
        </div>
      </div>
    </div>
  );
}

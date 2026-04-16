'use client';

interface AccountabilityPartnerPromptProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function AccountabilityPartnerPrompt({
  isOpen,
  onAccept,
  onDecline,
}: AccountabilityPartnerPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-tactical-darkgray border-2 border-tactical-lightgray max-w-lg w-full p-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">
            Accountability Partner
          </h2>
          <p className="text-tactical-green-bright font-mono text-sm uppercase">
            Optional — but powerful
          </p>
        </div>

        <div className="bg-tactical-gray border-l-4 border-tactical-orange p-5 mb-6">
          <p className="text-gray-200 leading-relaxed mb-3">
            Research shows that sharing your goals with an accountability partner increases
            your chance of follow-through by <span className="text-white font-bold">up to 65%</span>.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            That said, this protocol is specifically designed for <span className="text-white font-bold">solo mental
            reconstruction</span>. You don&apos;t need anyone else to complete it. But having
            someone who knows you&apos;re doing the work can add an extra layer of commitment.
          </p>
        </div>

        <p className="text-gray-400 text-sm text-center mb-6">
          Would you like to share your progress with a trusted friend or accountability partner?
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onAccept}
            className="btn-primary w-full py-4"
          >
            YES, I&apos;LL ADD A PARTNER
          </button>
          <button
            onClick={onDecline}
            className="btn-secondary w-full py-4"
          >
            NO THANKS — I&apos;M GOING SOLO
          </button>
        </div>

        <p className="text-gray-500 text-xs text-center mt-4">
          You can change this anytime in Settings.
        </p>
      </div>
    </div>
  );
}

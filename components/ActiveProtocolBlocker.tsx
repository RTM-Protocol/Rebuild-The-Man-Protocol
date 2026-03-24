'use client';

import Link from 'next/link';
import { protocols } from '@/data/protocols';

interface ActiveProtocolBlockerProps {
  isOpen: boolean;
  onClose: () => void;
  activeProtocolId: string;
  activeProtocolDay: number;
  activeProtocolDuration: number;
}

export default function ActiveProtocolBlocker({
  isOpen,
  onClose,
  activeProtocolId,
  activeProtocolDay,
  activeProtocolDuration
}: ActiveProtocolBlockerProps) {
  if (!isOpen) return null;

  const activeProtocol = protocols.find(p => p.id === activeProtocolId);
  const protocolName = activeProtocol?.title || 'Current Protocol';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-tactical-darkgray border-2 border-tactical-orange max-w-2xl w-full relative animate-slide-up">
        {/* Header */}
        <div className="bg-tactical-orange px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold uppercase text-xl flex items-center gap-3">
              <span>⚠️</span>
              <span>Active Protocol In Progress</span>
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-black transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Main Message */}
          <div className="mb-6">
            <p className="text-white text-lg leading-relaxed mb-4">
              You&apos;re currently on <span className="font-bold text-tactical-orange">{protocolName}</span>, Day {activeProtocolDay}.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Starting a new protocol now would interrupt your current progress and potentially 
              compromise the effectiveness of the work you&apos;ve already done.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We recommend <span className="font-bold text-tactical-green-bright">completing your current protocol</span> before 
              starting a new one. Protocols are designed to build progressively - each day prepares 
              you for the next.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-tactical-lightgray my-6"></div>

          {/* Options */}
          <div className="space-y-4">
            <div className="bg-tactical-gray p-4 border-l-4 border-tactical-green">
              <h3 className="text-white font-bold uppercase text-sm mb-2 flex items-center gap-2">
                <span>✓</span>
                <span>Recommended: Continue Current Protocol</span>
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Return to Day {activeProtocolDay} and continue building momentum. You can browse other 
                protocols anytime for future reference.
              </p>
              <Link
                href={`/protocol/${activeProtocolId}/mission/${activeProtocolDay}?duration=${activeProtocolDuration}`}
                className="inline-block bg-tactical-green hover:bg-tactical-green-bright text-white font-bold uppercase px-4 py-2 text-sm transition-colors"
                onClick={onClose}
              >
                Return to Day {activeProtocolDay} →
              </Link>
            </div>

            <div className="bg-tactical-gray p-4 border-l-4 border-tactical-orange">
              <h3 className="text-white font-bold uppercase text-sm mb-2 flex items-center gap-2">
                <span>⚙️</span>
                <span>Alternative: Reset Progress</span>
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                If you need to switch protocols, you can reset your current progress in Settings. 
                This will archive your stats but clear your active protocol.
              </p>
              <Link
                href="/settings"
                className="inline-block bg-tactical-orange hover:bg-orange-600 text-white font-bold uppercase px-4 py-2 text-sm transition-colors"
                onClick={onClose}
              >
                Go to Settings →
              </Link>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-6 pt-6 border-t border-tactical-lightgray">
            <p className="text-gray-500 text-xs uppercase tracking-wide">
              <span className="font-bold">Note:</span> You can browse all protocols freely. 
              This restriction only applies to starting new protocols while one is active.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="bg-tactical-gray px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white uppercase text-sm font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}






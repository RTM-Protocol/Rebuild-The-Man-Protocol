'use client';

import { IntensityMode } from '@/types';

interface IntensitySelectorProps {
  protocolName: string;
  selectedMode: IntensityMode;
  onSelect: (mode: IntensityMode) => void;
  onContinue: () => void;
}

export default function IntensitySelector({ 
  protocolName, 
  selectedMode, 
  onSelect, 
  onContinue 
}: IntensitySelectorProps) {
  const modes = [
    {
      id: 'light' as IntensityMode,
      name: 'Light Mode',
      time: '10 min/day',
      description: 'Core task only. Maintains momentum.',
      goodFor: 'Busy schedules, first-time users',
      icon: '⚡'
    },
    {
      id: 'standard' as IntensityMode,
      name: 'Standard Mode',
      time: '20 min/day',
      description: 'Core task + brief reflection. Balanced approach.',
      goodFor: 'Most users, proven effectiveness',
      icon: '⭐',
      recommended: true
    },
    {
      id: 'intensive' as IntensityMode,
      name: 'Intensive Mode',
      time: '30 min/day',
      description: 'Core task + reflection + advanced work. Maximum results.',
      goodFor: 'Serious commitment, accelerated progress',
      icon: '🔥'
    }
  ];

  const selectedLabel = modes.find((m) => m.id === selectedMode)?.name ?? '';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-tactical-gray">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      {/* Scrollable intro + mode cards */}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
          <div className="border-2 border-tactical-orange bg-tactical-darkgray p-5 sm:p-8">
            {/* Header */}
            <div className="mb-6 text-center sm:mb-8">
              <div className="mb-2 font-mono text-sm uppercase text-tactical-orange">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </div>
              <h1 className="mb-2 text-3xl font-bold text-white uppercase sm:text-4xl">
                Choose Your Intensity
              </h1>
              <p className="font-mono text-lg uppercase text-tactical-green-bright">
                {protocolName}
              </p>
              <div className="mt-2 font-mono text-sm uppercase text-tactical-orange">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </div>
            </div>

            <p className="mb-6 text-center text-gray-300 sm:mb-8">
              How much time can you commit daily?
            </p>

            {/* Mode Cards */}
            <div className="space-y-4">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onSelect(mode.id)}
                  className={`
                  w-full border-2 p-5 text-left transition-all sm:p-6
                  ${selectedMode === mode.id
                    ? 'border-tactical-orange bg-tactical-orange/15 ring-2 ring-tactical-orange/80 shadow-lg shadow-tactical-orange/10'
                    : 'border-tactical-lightgray hover:border-tactical-green'
                  }
                `}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl sm:text-4xl">{mode.icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-lg font-bold text-white uppercase sm:text-xl">
                          {mode.name}
                        </h3>
                        {mode.recommended && (
                          <span className="bg-tactical-green px-2 py-1 text-xs font-bold uppercase text-white">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="mb-2 font-mono text-sm text-tactical-orange">
                        ⏱ {mode.time}
                      </div>
                      <p className="mb-2 text-gray-300">{mode.description}</p>
                      <p className="text-sm text-gray-400">
                        <span className="font-bold">Good for:</span> {mode.goodFor}
                      </p>
                    </div>
                    {selectedMode === mode.id && (
                      <div className="flex-shrink-0 text-2xl text-tactical-orange sm:text-3xl" aria-hidden="true">
                        ✓
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-400 sm:mt-8">
              You can change intensity any day. Higher intensity = faster, deeper results.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky primary CTA — always visible without scrolling */}
      <div className="relative shrink-0 border-t-2 border-tactical-orange bg-tactical-darkgray/95 px-4 py-4 shadow-[0_-12px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:px-6">
        <div className="mx-auto w-full max-w-3xl space-y-2">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-tactical-green-bright">
            Next step — tap to continue
          </p>
          {selectedLabel && (
            <p className="text-center text-sm text-gray-400">
              Selected:{' '}
              <span className="font-bold text-white">{selectedLabel}</span>
            </p>
          )}
          <button
            type="button"
            onClick={onContinue}
            disabled={!selectedMode}
            className="btn-primary relative w-full border-2 border-tactical-orange-bright py-4 text-lg font-extrabold uppercase tracking-wide shadow-lg shadow-tactical-orange/25 ring-2 ring-tactical-orange/60 transition-all hover:ring-tactical-orange hover:shadow-tactical-orange/40 disabled:cursor-not-allowed disabled:opacity-50 sm:py-5 sm:text-xl"
          >
            Select &amp; Start Day 1 →
          </button>
        </div>
      </div>
    </div>
  );
}






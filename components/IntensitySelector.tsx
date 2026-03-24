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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tactical-gray overflow-y-auto">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="relative max-w-3xl w-full py-12">
        <div className="bg-tactical-darkgray border-2 border-tactical-orange p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-tactical-orange font-mono text-sm uppercase mb-2">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
            <h1 className="text-4xl font-bold text-white uppercase mb-2">
              Choose Your Intensity
            </h1>
            <p className="text-tactical-green-bright font-mono uppercase text-lg">
              {protocolName}
            </p>
            <div className="text-tactical-orange font-mono text-sm uppercase mt-2">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
          </div>

          <p className="text-gray-300 text-center mb-8">
            How much time can you commit daily?
          </p>

          {/* Mode Cards */}
          <div className="space-y-4 mb-8">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onSelect(mode.id)}
                className={`
                  w-full text-left p-6 border-2 transition-all
                  ${selectedMode === mode.id
                    ? 'border-tactical-orange bg-tactical-orange/10'
                    : 'border-tactical-lightgray hover:border-tactical-green'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{mode.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white uppercase">
                        {mode.name}
                      </h3>
                      {mode.recommended && (
                        <span className="bg-tactical-green text-white px-2 py-1 text-xs font-bold uppercase">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-tactical-orange font-mono text-sm mb-2">
                      ⏱ {mode.time}
                    </div>
                    <p className="text-gray-300 mb-2">
                      {mode.description}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-bold">Good for:</span> {mode.goodFor}
                    </p>
                  </div>
                  {selectedMode === mode.id && (
                    <div className="text-tactical-orange text-3xl">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <p className="text-gray-400 text-sm text-center mb-6">
            You can change intensity any day. Higher intensity = faster, deeper results.
          </p>

          <button
            onClick={onContinue}
            disabled={!selectedMode}
            className="btn-primary w-full text-lg py-4"
          >
            Select & Start Day 1
          </button>
        </div>
      </div>
    </div>
  );
}






'use client';

import { useState } from 'react';
import { IntensityMode } from '@/types';

interface IntensityEscalationPromptProps {
  isOpen: boolean;
  currentMode: IntensityMode;
  daysOnCurrentMode: number;
  onUpgrade: () => void;
  onDecline: () => void;
}

export default function IntensityEscalationPrompt({
  isOpen,
  currentMode,
  daysOnCurrentMode,
  onUpgrade,
  onDecline
}: IntensityEscalationPromptProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  const targetMode = currentMode === 'light' ? 'standard' : 'intensive';
  const targetModeName = targetMode === 'standard' ? 'Standard' : 'Intensive';
  const currentModeName = currentMode === 'light' ? 'Light' : 'Standard';
  const timeIncrease = 10;

  const handleDecline = () => {
    setShowConfirmation(true);
  };

  const handleFinalDecline = () => {
    setShowConfirmation(false);
    onDecline();
  };

  const handleUpgrade = () => {
    setShowConfirmation(false);
    onUpgrade();
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
        <div className="bg-tactical-darkgray border-2 border-tactical-orange max-w-2xl w-full p-8">
          <h2 className="text-3xl font-bold text-white uppercase mb-6 text-center">
            Are You Sure?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Current Mode */}
            <div className="bg-tactical-gray border-l-4 border-gray-500 p-4">
              <h3 className="text-white font-bold uppercase text-sm mb-3">
                {currentModeName} Mode (Current)
              </h3>
              <div className="space-y-2 text-sm">
                {currentMode === 'light' ? (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Maintains basic momentum</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Prevents total dropout</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-gray-300">Minimal skill retention</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-gray-300">Slower results (2-3x longer)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-gray-300">Surface-level change</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Balanced, sustainable approach</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Good results over time</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-gray-300">Missing advanced techniques</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-gray-300">Pattern work stays shallow</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Target Mode */}
            <div className="bg-tactical-gray border-l-4 border-tactical-green p-4">
              <h3 className="text-tactical-green-bright font-bold uppercase text-sm mb-3">
                {targetModeName} Mode (+{timeIncrease} min)
              </h3>
              <div className="space-y-2 text-sm">
                {targetMode === 'standard' ? (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Proven effectiveness tier</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Techniques actually stick</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">2-3x faster measurable improvement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Most users see real change here</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Maximum protocol effectiveness</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Deep pattern recognition</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Advanced skill development</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span className="text-gray-300">Breakthrough-level insights</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-tactical-orange/10 border-l-4 border-tactical-orange p-4 mb-6">
            <p className="text-gray-200 leading-relaxed">
              {currentMode === 'light' 
                ? '10 extra minutes isn\'t about time - it\'s about depth. Light Mode is training wheels. You ready to ride?'
                : 'The guys who finish Intensive don\'t go back. They\'re not "doing a protocol" anymore - they\'ve rebuilt the system.'
              }
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleUpgrade}
              className="btn-primary flex-1"
            >
              I&apos;ll Upgrade to {targetModeName}
            </button>
            <button
              onClick={handleFinalDecline}
              className="btn-secondary flex-1"
            >
              Keep {currentModeName} Mode for Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-tactical-darkgray border-2 border-tactical-green max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <div className="text-tactical-orange font-mono text-sm uppercase mb-2">
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>
          <h2 className="text-4xl font-bold text-white uppercase mb-2">
            {targetMode === 'standard' ? 'Escalation Recommended' : 'Ready for Intensive Mode?'}
          </h2>
          <div className="text-tactical-orange font-mono text-sm uppercase">
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>
        </div>

        <p className="text-gray-300 text-lg mb-6 text-center">
          You&apos;ve completed {daysOnCurrentMode} days on {currentModeName} Mode.
        </p>

        <div className="bg-tactical-gray border-l-4 border-tactical-green p-6 mb-6">
          <h3 className="text-tactical-green-bright font-bold uppercase text-sm mb-4">
            Upgrade to {targetModeName} Mode?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-tactical-green text-xl">⏱</span>
              <div>
                <div className="text-white font-bold">+{timeIncrease} minutes per day ({timeIncrease + (currentMode === 'light' ? 10 : 20)} total)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-tactical-green text-xl">📈</span>
              <div>
                <div className="text-white font-bold">
                  {targetMode === 'standard' ? '2-3x faster progress' : 'Maximum protocol effectiveness'}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-tactical-green text-xl">💪</span>
              <div>
                <div className="text-white font-bold">
                  {targetMode === 'standard' ? 'Builds deeper skills' : 'Accelerated transformation'}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-tactical-green text-xl">🎯</span>
              <div>
                <div className="text-white font-bold">
                  {targetMode === 'standard' ? 'Techniques actually stick' : 'Deep pattern recognition'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-tactical-gray border border-tactical-lightgray p-4 mb-6">
          <p className="text-gray-300 text-center italic">
            {currentMode === 'light' 
              ? 'Light Mode keeps you in the game. Standard Mode actually changes the game.'
              : 'Standard Mode is solid. But Intensive is where transformation accelerates.'
            }
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleUpgrade}
            className="bg-tactical-green hover:bg-tactical-green-bright text-white font-bold py-4 px-6 transition-all uppercase tracking-widest text-sm flex-1"
          >
            Upgrade to {targetModeName}
          </button>
          <button
            onClick={handleDecline}
            className="btn-secondary flex-1"
          >
            Stay on {currentModeName}
          </button>
        </div>
      </div>
    </div>
  );
}






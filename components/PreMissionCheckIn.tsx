'use client';

import { useState } from 'react';

interface PreMissionCheckInProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { stressLevel: number; angerLevel: number; focusLevel: number }) => void;
  /** When true, show a control to open privacy-safe partner sharing (parent opens ShareProgress). */
  accountabilityPartnerEnabled?: boolean;
  onOpenPartnerShare?: () => void;
  /** Lets users turn on partner mode from this screen; parent should persist via ProgressContext. */
  onEnableAccountabilityPartner?: () => void;
}

export default function PreMissionCheckIn({
  isOpen,
  onClose,
  onComplete,
  accountabilityPartnerEnabled = false,
  onOpenPartnerShare,
  onEnableAccountabilityPartner,
}: PreMissionCheckInProps) {
  const [stressLevel, setStressLevel] = useState(5);
  const [angerLevel, setAngerLevel] = useState(5);
  const [focusLevel, setFocusLevel] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onComplete({ stressLevel, angerLevel, focusLevel });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border-2 border-tactical-orange bg-tactical-darkgray p-6">
        <h2 className="text-2xl font-bold text-white uppercase mb-2">
          Pre-Mission Check-In
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Quick baseline assessment (takes 10 seconds)
        </p>

        {/* Stress Level */}
        <div className="mb-6">
          <label className="text-white font-bold uppercase text-sm block mb-3">
            How&apos;s your stress level right now?
          </label>
          <div className="flex items-center gap-4">
            <span className="text-tactical-green text-sm font-mono">LOW</span>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-tactical-gray rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4ade80 0%, #f97316 50%, #ef4444 100%)`
              }}
            />
            <span className="text-tactical-orange text-sm font-mono">HIGH</span>
            <span className="text-white font-bold text-lg w-8 text-center">
              {stressLevel}
            </span>
          </div>
        </div>

        {/* Anger Level */}
        <div className="mb-6">
          <label className="text-white font-bold uppercase text-sm block mb-3">
            How&apos;s your anger level right now?
          </label>
          <div className="flex items-center gap-4">
            <span className="text-tactical-green text-sm font-mono">LOW</span>
            <input
              type="range"
              min="1"
              max="10"
              value={angerLevel}
              onChange={(e) => setAngerLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-tactical-gray rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4ade80 0%, #f97316 50%, #ef4444 100%)`
              }}
            />
            <span className="text-tactical-orange text-sm font-mono">HIGH</span>
            <span className="text-white font-bold text-lg w-8 text-center">
              {angerLevel}
            </span>
          </div>
        </div>

        {/* Focus Level */}
        <div className="mb-8">
          <label className="text-white font-bold uppercase text-sm block mb-3">
            How&apos;s your focus right now?
          </label>
          <div className="flex items-center gap-4">
            <span className="text-tactical-orange text-sm font-mono">LOW</span>
            <input
              type="range"
              min="1"
              max="10"
              value={focusLevel}
              onChange={(e) => setFocusLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-tactical-gray rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #f97316 50%, #4ade80 100%)`
              }}
            />
            <span className="text-tactical-green text-sm font-mono">HIGH</span>
            <span className="text-white font-bold text-lg w-8 text-center">
              {focusLevel}
            </span>
          </div>
        </div>

        {accountabilityPartnerEnabled && onOpenPartnerShare && (
          <div className="mb-6 border border-tactical-green/40 bg-tactical-black/40 p-4">
            <p className="mb-3 text-sm leading-relaxed text-gray-300">
              <span className="font-bold text-tactical-green-bright">Accountability partner is on.</span>{' '}
              Send a privacy-safe update (days completed, streak, progress % only — never these sliders or
              your notes).
            </p>
            <button
              type="button"
              onClick={onOpenPartnerShare}
              className="w-full border-2 border-tactical-green py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-tactical-green-bright hover:bg-tactical-green/10"
            >
              📤 Share safe progress with partner
            </button>
          </div>
        )}

        {!accountabilityPartnerEnabled && onEnableAccountabilityPartner && (
          <div className="mb-6 border border-tactical-lightgray bg-tactical-black/40 p-4">
            <p className="mb-3 text-sm leading-relaxed text-gray-300">
              Want someone in your corner? Enable an accountability partner to share day counts only — not
              protocol details or anything you enter here.
            </p>
            <button
              type="button"
              onClick={onEnableAccountabilityPartner}
              className="w-full border-2 border-tactical-orange py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-tactical-orange-bright hover:bg-tactical-orange/10"
            >
              Enable accountability partner
            </button>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-tactical-green-bright">
            Next — start the mission
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-primary w-full border-2 border-tactical-orange-bright py-3 text-base font-extrabold uppercase tracking-wide shadow-lg shadow-tactical-orange/20 ring-2 ring-tactical-orange/50 sm:py-4"
          >
            Begin mission →
          </button>
        </div>
      </div>
    </div>
  );
}









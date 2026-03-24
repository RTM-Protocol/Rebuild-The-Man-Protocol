'use client';

import { useState } from 'react';

interface PreMissionCheckInProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { stressLevel: number; angerLevel: number; focusLevel: number }) => void;
}

export default function PreMissionCheckIn({ isOpen, onClose, onComplete }: PreMissionCheckInProps) {
  const [stressLevel, setStressLevel] = useState(5);
  const [angerLevel, setAngerLevel] = useState(5);
  const [focusLevel, setFocusLevel] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onComplete({ stressLevel, angerLevel, focusLevel });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-tactical-darkgray border-2 border-tactical-orange max-w-lg w-full p-6">
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

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="btn-primary flex-1"
          >
            BEGIN MISSION
          </button>
        </div>
      </div>
    </div>
  );
}









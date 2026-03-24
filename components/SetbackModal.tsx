'use client';

import { useState, useEffect } from 'react';
import { useProgress } from '@/contexts/ProgressContext';

interface SetbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
}

export default function SetbackModal({ isOpen, onClose, currentDay }: SetbackModalProps) {
  const { markSetback } = useProgress();
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setNote(''); // Clear note when closing
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkSetback = () => {
    markSetback(currentDay, note || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-tactical-darkgray border-2 border-tactical-orange max-w-lg w-full p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">
            Mark Setback
          </h2>
          <div className="h-1 w-20 bg-tactical-orange" />
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-gray-300 leading-relaxed mb-4">
            Everyone faces setbacks. The rebuild continues. This won&apos;t delete your progress—it 
            resets your streak and lets you continue from where you are.
          </p>
          
          <div className="bg-tactical-gray p-4 border-l-4 border-tactical-orange">
            <div className="text-tactical-orange font-bold mb-2 text-sm uppercase">
              What Happens:
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>→ Your current day is marked as a setback</li>
              <li>→ Your streak resets to 0</li>
              <li>→ Completed days remain completed</li>
              <li>→ You can continue from this day</li>
            </ul>
          </div>
        </div>

        {/* Optional Note */}
        <div className="mb-6">
          <label className="text-white font-bold uppercase text-sm mb-2 block">
            Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What happened? What did you learn?"
            className="w-full bg-tactical-gray border border-tactical-lightgray text-white p-3 rounded focus:outline-none focus:border-tactical-orange min-h-24"
            maxLength={200}
          />
          <div className="text-xs text-gray-500 mt-1">
            {note.length}/200 characters
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleMarkSetback}
            className="btn-primary flex-1"
          >
            MARK SETBACK
          </button>
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            CANCEL
          </button>
        </div>

        {/* Encouragement */}
        <div className="mt-6 text-center">
          <p className="text-tactical-green-bright font-bold text-sm italic">
            &ldquo;A setback is not a failure. It&apos;s data. Use it.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}


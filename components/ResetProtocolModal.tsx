'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import ReminderSettings from './ReminderSettings';

interface ResetProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetProtocolModal({ isOpen, onClose }: ResetProtocolModalProps) {
  const { resetProtocol, resetAllProgress, activeProtocol } = useProgress();
  const [showReminders, setShowReminders] = useState(false);

  const handleReviewOnboarding = () => {
    localStorage.removeItem('onboarding_completed');
    window.location.reload(); // Reload to show onboarding
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleResetCurrent = () => {
    resetProtocol();
    onClose();
  };

  const handleResetAll = () => {
    if (confirm('This will delete ALL progress including completed protocols. Are you absolutely sure?')) {
      resetAllProgress();
      onClose();
    }
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
            ⚙️ Settings
          </h2>
          <div className="h-1 w-20 bg-tactical-orange" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-tactical-lightgray">
          <button
            onClick={() => setShowReminders(false)}
            className={`px-4 py-2 font-bold uppercase text-sm transition-colors border-b-2 ${
              !showReminders
                ? 'border-tactical-orange text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Options
          </button>
          <button
            onClick={() => setShowReminders(true)}
            className={`px-4 py-2 font-bold uppercase text-sm transition-colors border-b-2 ${
              showReminders
                ? 'border-tactical-orange text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Reminders
          </button>
        </div>

        {/* Content */}
        {showReminders ? (
          <div className="mb-8">
            <ReminderSettings />
          </div>
        ) : (
          <div className="space-y-4 mb-8">
          {activeProtocol && (
            <div className="bg-tactical-gray p-4 border-l-4 border-tactical-orange">
              <h3 className="text-white font-bold mb-2 uppercase text-sm">
                Reset Current Protocol
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                This will delete your current protocol progress. You can start fresh or choose a different protocol.
              </p>
              <button
                onClick={handleResetCurrent}
                className="btn-secondary w-full text-sm"
              >
                RESET CURRENT PROTOCOL
              </button>
            </div>
          )}

          <div className="bg-tactical-gray p-4 border-l-4 border-tactical-blue-steel">
            <h3 className="text-blue-400 font-bold mb-2 uppercase text-sm">
              Review Onboarding
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              See the welcome screens and introduction again.
            </p>
            <button
              onClick={handleReviewOnboarding}
              className="btn-secondary w-full text-sm"
            >
              VIEW ONBOARDING
            </button>
          </div>

          <div className="bg-tactical-gray p-4 border-l-4 border-red-600">
            <h3 className="text-red-500 font-bold mb-2 uppercase text-sm">
              Reset All Progress
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              This will permanently delete ALL progress, including completed protocols and history. This cannot be undone.
            </p>
            <button
              onClick={handleResetAll}
              className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide px-4 py-2 transition-colors w-full text-sm"
            >
              DELETE ALL PROGRESS
            </button>
          </div>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="btn-primary w-full"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}



'use client';

import { useState } from 'react';

interface PostMissionCheckInProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { completed: boolean; didHelp: boolean | null }) => void;
}

export default function PostMissionCheckIn({ isOpen, onClose, onComplete }: PostMissionCheckInProps) {
  const [didHelp, setDidHelp] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleComplete = (completed: boolean) => {
    onComplete({ completed, didHelp });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-tactical-darkgray border-2 border-tactical-green max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold text-white uppercase mb-2">
          Post-Mission Check-In
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Quick feedback (10 seconds max)
        </p>

        {/* Did this help? (Optional) */}
        <div className="mb-8">
          <label className="text-white font-bold uppercase text-sm block mb-3">
            Did this mission help? (Optional)
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setDidHelp(true)}
              className={`
                flex-1 py-3 px-4 font-bold uppercase transition-all border-2
                ${didHelp === true
                  ? 'bg-tactical-green border-tactical-green text-white'
                  : 'bg-tactical-gray border-tactical-lightgray text-gray-400 hover:border-tactical-green'
                }
              `}
            >
              ✓ Yes
            </button>
            <button
              onClick={() => setDidHelp(false)}
              className={`
                flex-1 py-3 px-4 font-bold uppercase transition-all border-2
                ${didHelp === false
                  ? 'bg-red-900 border-red-700 text-white'
                  : 'bg-tactical-gray border-tactical-lightgray text-gray-400 hover:border-red-700'
                }
              `}
            >
              ✗ No
            </button>
            <button
              onClick={() => setDidHelp(null)}
              className={`
                flex-1 py-3 px-4 font-bold uppercase transition-all border-2
                ${didHelp === null
                  ? 'bg-tactical-orange border-tactical-orange text-white'
                  : 'bg-tactical-gray border-tactical-lightgray text-gray-400 hover:border-tactical-orange'
                }
              `}
            >
              Skip
            </button>
          </div>
        </div>

        {/* Mission Complete Confirmation */}
        <div className="border-t-2 border-tactical-lightgray pt-6">
          <h3 className="text-white font-bold uppercase mb-4 text-sm">
            Mission Status
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => handleComplete(true)}
              className="btn-primary flex-1"
            >
              ✓ MISSION COMPLETE
            </button>
            <button
              onClick={() => handleComplete(false)}
              className="bg-tactical-gray hover:bg-tactical-lightgray text-white font-bold uppercase px-6 py-3 transition-colors flex-1"
            >
              NOT YET
            </button>
          </div>
        </div>

        <p className="text-tactical-orange text-xs mt-4 text-center font-mono">
          Your progress data helps track objective improvement over time
        </p>
      </div>
    </div>
  );
}









'use client';

import { useState } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { requestNotificationPermission } from '@/utils/notifications';

export default function ReminderPrompt() {
  const { reminderSettings, updateReminderSettings } = useProgress();
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show if already enabled or dismissed
  if (reminderSettings.enabled || isDismissed) {
    return null;
  }

  const handleSetupReminder = async () => {
    const permission = await requestNotificationPermission();
    
    if (permission === 'granted') {
      updateReminderSettings({
        enabled: true,
        notificationsPermission: permission,
        time: '09:00' // Default time
      });
    } else {
      alert('Notifications are blocked. Please enable them in your browser settings.');
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="bg-tactical-darkgray border-2 border-tactical-orange p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔔</span>
            <h3 className="text-lg font-bold text-white uppercase">
              Stay Consistent
            </h3>
          </div>
          <p className="text-gray-300 mb-4">
            Set up a daily reminder to never miss your mission. Consistency is key to rebuilding.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleSetupReminder}
              className="btn-primary text-sm py-2 px-4"
            >
              SETUP REMINDER
            </button>
            <button
              onClick={handleDismiss}
              className="btn-secondary text-sm py-2 px-4"
            >
              MAYBE LATER
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-500 hover:text-white transition-colors ml-4"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}



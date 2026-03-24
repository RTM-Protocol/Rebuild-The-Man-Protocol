'use client';

import { useState } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { requestNotificationPermission } from '@/utils/notifications';

export default function ReminderSettings() {
  const { reminderSettings, updateReminderSettings } = useProgress();
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const handleToggle = async () => {
    if (!reminderSettings.enabled) {
      // Turning on - request permission first
      setIsRequestingPermission(true);
      const permission = await requestNotificationPermission();
      setIsRequestingPermission(false);

      updateReminderSettings({
        enabled: permission === 'granted',
        notificationsPermission: permission
      });

      if (permission === 'denied') {
        alert('Notifications are blocked. Please enable them in your browser settings to use reminders.');
      }
    } else {
      // Turning off
      updateReminderSettings({ enabled: false });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateReminderSettings({ time: e.target.value });
  };

  return (
    <div className="bg-tactical-gray p-6 border-l-4 border-tactical-orange">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white font-bold uppercase text-sm mb-2">
            🔔 Daily Reminders
          </h3>
          <p className="text-gray-400 text-sm">
            Get a daily notification to complete your mission
          </p>
        </div>
        
        <button
          onClick={handleToggle}
          disabled={isRequestingPermission}
          className={`
            relative inline-flex h-8 w-14 items-center rounded-full transition-colors
            ${reminderSettings.enabled ? 'bg-tactical-green' : 'bg-tactical-lightgray'}
            ${isRequestingPermission ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span
            className={`
              inline-block h-6 w-6 transform rounded-full bg-white transition-transform
              ${reminderSettings.enabled ? 'translate-x-7' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {reminderSettings.enabled && (
        <div className="mt-4">
          <label className="block text-sm font-bold text-white uppercase mb-2">
            Reminder Time
          </label>
          <input
            type="time"
            value={reminderSettings.time}
            onChange={handleTimeChange}
            className="w-full bg-tactical-darkgray border border-tactical-lightgray text-white px-4 py-2 rounded focus:outline-none focus:border-tactical-orange"
          />
          <p className="text-xs text-gray-500 mt-2">
            You&apos;ll receive a notification at this time every day
          </p>
        </div>
      )}

      {reminderSettings.notificationsPermission === 'denied' && (
        <div className="mt-4 bg-red-900/20 border border-red-600 p-3 rounded">
          <p className="text-red-400 text-xs">
            ⚠️ Notifications are blocked. Enable them in your browser settings to use reminders.
          </p>
        </div>
      )}
    </div>
  );
}



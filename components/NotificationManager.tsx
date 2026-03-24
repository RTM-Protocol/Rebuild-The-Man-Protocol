'use client';

import { useEffect, useRef } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { protocols } from '@/data/protocols';
import { checkAndShowDailyReminder, scheduleNextCheck } from '@/utils/notifications';

export default function NotificationManager() {
  const { reminderSettings, activeProtocol } = useProgress();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run if reminders are enabled and there's an active protocol
    if (!reminderSettings.enabled || !activeProtocol) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const protocol = protocols.find(p => p.id === activeProtocol.protocolId);
    if (!protocol) return;

    // Check immediately
    checkAndShowDailyReminder(reminderSettings.time, protocol.title);

    // Schedule periodic checks
    intervalRef.current = scheduleNextCheck(() => {
      checkAndShowDailyReminder(reminderSettings.time, protocol.title);
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reminderSettings.enabled, reminderSettings.time, activeProtocol]);

  return null; // This component doesn't render anything
}



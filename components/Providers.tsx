'use client';

import { ProgressProvider } from '@/contexts/ProgressContext';
import NotificationManager from '@/components/NotificationManager';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <NotificationManager />
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
}



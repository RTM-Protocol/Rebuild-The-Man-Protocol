'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import NotificationManager from '@/components/NotificationManager';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <NotificationManager />
          {children}
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}



'use client';

import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme to document
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
    }

    // Listen for theme changes from settings page
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail;
      if (newTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark');
      }
    };

    window.addEventListener('themechange', handleThemeChange as EventListener);

    return () => {
      window.removeEventListener('themechange', handleThemeChange as EventListener);
    };
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

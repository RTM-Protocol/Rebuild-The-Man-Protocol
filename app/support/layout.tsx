import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Support | The Rebuild Protocol',
  description: 'Get help with The Rebuild Protocol app.',
};

export default function SupportLayout({ children }: { children: ReactNode }) {
  return children;
}

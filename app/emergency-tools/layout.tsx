import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Protocols - Rebuild The Man Protocol | Quick Relief Tools',
  description: 'Emergency mental health relief tools for acute situations. Quick 3-5 minute protocols for anger spikes, anxiety attacks, sleep issues, overwhelm, urges, and conflicts.',
  keywords: 'emergency mental health, anxiety attack help, anger management emergency, panic attack relief, sleep help, overwhelm relief',
  openGraph: {
    title: 'Emergency Protocols - Rebuild The Man Protocol',
    description: 'Quick relief tools for when you need help right now. 3-5 minute tactical protocols for acute situations.',
    type: 'website',
  },
};

export default function EmergencyToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



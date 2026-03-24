import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rebuild The Man Protocol - Mental Health Repair Manual for Men',
  description: 'Action-driven mental health protocols designed for men. No therapy-speak. Just concrete steps to fix what\'s broken. 7-30 day protocols for stress, anger, burnout, and more.',
  keywords: 'men\'s mental health, mental health for men, anxiety protocol, stress management, anger management, burnout recovery, depression help for men',
  openGraph: {
    title: 'Rebuild The Man Protocol - Mental Health Repair Manual for Men',
    description: 'Step-by-step protocols to fix what\'s broken. Built by therapists. Designed for men who do, not talk.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




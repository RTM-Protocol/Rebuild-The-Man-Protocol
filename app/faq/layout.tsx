import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Rebuild The Man Protocol | Common Questions Answered',
  description: 'Get answers to common questions about Rebuild The Man Protocol. Learn how the app works, safety information, effectiveness, and technical details about this mental health self-help tool for men.',
  keywords: 'rebuild the man protocol faq, mental health app questions, how it works, safety, effectiveness, self-help app',
  openGraph: {
    title: 'FAQ - Rebuild The Man Protocol',
    description: 'Everything you need to know about Rebuild The Man Protocol. Common questions answered.',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



import type { ReactNode } from 'react';
import ProtocolAccessGate from '@/components/ProtocolAccessGate';

/**
 * Gates EVERY route under /protocol/* behind login + a completed purchase.
 * This is the single chokepoint for the paywall — individual protocol pages
 * don't need their own auth checks.
 *
 * Excluded by design: /emergency-tools/* (lives outside /protocol/*),
 * /faq, /privacy, /terms, /contact, /support, /landing, /, /stats, /settings.
 */
export default function ProtocolLayout({ children }: { children: ReactNode }) {
  return <ProtocolAccessGate>{children}</ProtocolAccessGate>;
}

'use client';

import type { ReactNode } from 'react';

type Props = {
  glow12: string;
  glow20: string;
  children: ReactNode;
};

/** Coloured glow + hover (opacity + scale). Keeps breathe-animation on an ancestor unchanged. */
export default function ProtocolIconShell({ glow12, glow20, children }: Props) {
  return (
    <span
      className="protocol-icon-shell inline-flex items-center justify-center rounded-full p-3"
      style={
        {
          '--protocol-icon-glow': glow12,
          '--protocol-icon-glow-hover': glow20,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}

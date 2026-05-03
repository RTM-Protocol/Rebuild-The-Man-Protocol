'use client';

import BrandShieldIcon from '@/components/BrandShieldIcon';
import ProtocolIconShell from '@/components/ProtocolIconShell';
import { protocols } from '@/data/protocols';
import { getProtocolVisualTheme } from '@/lib/protocolVisualTheme';

const svgBase = 'block h-[1em] w-[1em] max-h-none max-w-none shrink-0';

type Accent = { stroke: string; soft: string };

function PressureGaugeIcon({ stroke, soft }: Accent) {
  return (
    <svg className={svgBase} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={10.5} fill={soft} />
      <path
        d="M4 14a8 8 0 0 0 16 0"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M5.58 10.1l.74.27M9.05 6.89l.46.64M12 5.5v.85M14.95 6.89l-.46.64M18.42 10.1l-.74.27"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M12 14L8.2 10.2"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle cx={12} cy={14} r={1.2} stroke={stroke} strokeWidth={1.5} />
    </svg>
  );
}

function CircuitBreakerIcon({ stroke, soft }: Accent) {
  return (
    <svg className={svgBase} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={10.5} fill={soft} />
      <rect
        x={5.5}
        y={5}
        width={13}
        height={14}
        rx={1.25}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <path
        d="M8.5 9.5h7M8.5 12h4.5"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle cx={16.25} cy={9.75} r={1.15} stroke={stroke} strokeWidth={1.5} />
      <path
        d="M16.25 9.75l-3.25 5.5"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path d="M9 16.5h6" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function PowerIgnitionIcon({ stroke, soft }: Accent) {
  return (
    <svg className={svgBase} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={10.5} fill={soft} />
      <path
        d="M12 5v7"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={12} cy={13.75} r={6.75} stroke={stroke} strokeWidth={2} />
      <path
        d="M12 3.5v1.65M18.95 7.05l-1.15 1.15M19.75 12h-1.65M18.95 16.95l-1.15-1.15M12 19.35v-1.65M7.05 16.95l1.15-1.15M5.9 12h1.65M7.05 7.05l1.15 1.15"
        stroke={stroke}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpiritLevelIcon({ stroke, soft }: Accent) {
  return (
    <svg className={svgBase} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={10.5} fill={soft} />
      <rect
        x={3.75}
        y={8.75}
        width={16.5}
        height={6.5}
        rx={1.25}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <path
        d="M7 12h10"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle cx={12} cy={12} r={2.35} stroke={stroke} strokeWidth={1.5} />
      <path
        d="M11.25 11.1l.55 1 .55-1"
        stroke={stroke}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 8.1v4.3M18.75 8.1v4.3"
        stroke={stroke}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const accentOf = (t: NonNullable<ReturnType<typeof getProtocolVisualTheme>>) => ({
  stroke: t.hex,
  soft: t.fillSoft,
});

export default function ProtocolIcon({ protocolId }: { protocolId: string }) {
  switch (protocolId) {
    case 'rebuild-the-man': {
      const t = getProtocolVisualTheme(protocolId)!;
      return (
        <ProtocolIconShell glow12={t.glow12} glow20={t.glow20}>
          <BrandShieldIcon title="" strokeColor={t.hex} softFill={t.fillSoft} />
        </ProtocolIconShell>
      );
    }
    case 'pressure-valve': {
      const t = getProtocolVisualTheme(protocolId)!;
      return (
        <ProtocolIconShell glow12={t.glow12} glow20={t.glow20}>
          <PressureGaugeIcon {...accentOf(t)} />
        </ProtocolIconShell>
      );
    }
    case 'system-overload': {
      const t = getProtocolVisualTheme(protocolId)!;
      return (
        <ProtocolIconShell glow12={t.glow12} glow20={t.glow20}>
          <CircuitBreakerIcon {...accentOf(t)} />
        </ProtocolIconShell>
      );
    }
    case 'engine-restart': {
      const t = getProtocolVisualTheme(protocolId)!;
      return (
        <ProtocolIconShell glow12={t.glow12} glow20={t.glow20}>
          <PowerIgnitionIcon {...accentOf(t)} />
        </ProtocolIconShell>
      );
    }
    case 'calibration-protocol': {
      const t = getProtocolVisualTheme(protocolId)!;
      return (
        <ProtocolIconShell glow12={t.glow12} glow20={t.glow20}>
          <SpiritLevelIcon {...accentOf(t)} />
        </ProtocolIconShell>
      );
    }
    default: {
      const protocol = protocols.find((p) => p.id === protocolId);
      return <>{protocol?.icon ?? ''}</>;
    }
  }
}

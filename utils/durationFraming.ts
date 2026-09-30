import type { ProtocolDuration } from '@/types';

export interface DurationFraming {
  label: string;
  descriptor: string;
}

export const DURATION_FRAMING: Record<ProtocolDuration, DurationFraming> = {
  7: {
    label: 'LIGHT',
    descriptor: 'A focused week. The essentials, start to finish.',
  },
  14: {
    label: 'STANDARD',
    descriptor: 'Two weeks. The core work, with room to embed it.',
  },
  30: {
    label: 'INTENSE',
    descriptor: 'A full month. The complete protocol, nothing skipped.',
  },
};

export function getDurationFraming(duration: ProtocolDuration): DurationFraming {
  return DURATION_FRAMING[duration];
}

export type ProtocolVisualTheme = {
  hex: string;
  glow12: string;
  glow20: string;
  fillSoft: string;
  progressGradient: string;
};

export const PROTOCOL_VISUAL_THEMES: Record<string, ProtocolVisualTheme> = {
  'pressure-valve': {
    hex: '#E85A3A',
    glow12: 'rgba(232, 90, 58, 0.12)',
    glow20: 'rgba(232, 90, 58, 0.2)',
    fillSoft: 'rgba(232, 90, 58, 0.14)',
    progressGradient:
      'linear-gradient(to right, #b84326, #E85A3A, #ff8f66)',
  },
  'system-overload': {
    hex: '#E8A317',
    glow12: 'rgba(232, 163, 23, 0.12)',
    glow20: 'rgba(232, 163, 23, 0.2)',
    fillSoft: 'rgba(232, 163, 23, 0.14)',
    progressGradient:
      'linear-gradient(to right, #a8760f, #E8A317, #f4c64a)',
  },
  'engine-restart': {
    hex: '#2ECC71',
    glow12: 'rgba(46, 204, 113, 0.12)',
    glow20: 'rgba(46, 204, 113, 0.2)',
    fillSoft: 'rgba(46, 204, 113, 0.14)',
    progressGradient:
      'linear-gradient(to right, #1fa055, #2ECC71, #5ee4a0)',
  },
  'calibration-protocol': {
    hex: '#3B82F6',
    glow12: 'rgba(59, 130, 246, 0.12)',
    glow20: 'rgba(59, 130, 246, 0.2)',
    fillSoft: 'rgba(59, 130, 246, 0.14)',
    progressGradient:
      'linear-gradient(to right, #2563eb, #3B82F6, #7ab8ff)',
  },
  'rebuild-the-man': {
    hex: '#cc6119',
    glow12: 'rgba(204, 97, 25, 0.12)',
    glow20: 'rgba(204, 97, 25, 0.2)',
    fillSoft: 'rgba(204, 97, 25, 0.14)',
    progressGradient:
      'linear-gradient(to right, #a34b12, #cc6119, #e8894a)',
  },
};

export const EMERGENCY_ICON_GLOW = {
  glow12: 'rgba(239, 68, 68, 0.12)',
  glow20: 'rgba(239, 68, 68, 0.2)',
} as const;

export function getProtocolVisualTheme(
  protocolId: string
): ProtocolVisualTheme | undefined {
  return PROTOCOL_VISUAL_THEMES[protocolId];
}

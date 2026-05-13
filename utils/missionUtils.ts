import { DailyMission, Protocol, ProtocolDuration, UserProgress } from '@/types';

const DURATIONS: ProtocolDuration[] = [7, 14, 30];

export function parseDurationParam(value: string | null): ProtocolDuration | null {
  if (value == null || value === '') return null;
  const n = parseInt(value, 10);
  if (n === 7 || n === 14 || n === 30) return n;
  return null;
}

function placeholderMission(protocol: Protocol, day: number, duration: ProtocolDuration): DailyMission {
  return {
    day,
    title: `Day ${day} — Hold the line`,
    description: `You are in ${protocol.title} (${duration}-day track). Today is about showing up and compounding what already worked.`,
    instructions: [
      'Re-read your last field notes or check-in. Repeat the single action that helped most.',
      'Set a 10-minute timer. Write one paragraph: "What I am avoiding naming today is…" No editing.',
      'Move for 10 minutes at a sustainable effort—walk, stairs, or light calisthenics.',
      'Finish with one sentence: one way you acted like the man you want to be today.',
    ],
    whyItWorks:
      'Protocols stick when you practice the same skills under variable mood. Repetition builds neural habit loops faster than novelty.',
    proTip: 'If energy is low, cut every step in half except the physical movement.',
    affirmation: 'Consistency is my force multiplier. I execute even when inspiration is quiet.',
    estimatedTime: '15–25 minutes',
  };
}

/** Prefer the longest non-empty mission list on this protocol (template for cycling / gaps). */
export function longestMissionTemplate(protocol: Protocol): DailyMission[] {
  let best: DailyMission[] = [];
  for (const d of DURATIONS) {
    const arr = protocol.missions[d];
    if (arr && arr.length > best.length) best = arr;
  }
  return best;
}

function explicitMissionForDay(declared: DailyMission[], day: number): DailyMission | undefined {
  const byDayField = declared.find((m) => m.day === day);
  if (byDayField) return byDayField;
  const byIndex = declared[day - 1];
  if (byIndex !== undefined && byIndex.day === day) return byIndex;
  return undefined;
}

function cycledFromTemplate(
  template: DailyMission[],
  day: number,
  duration: ProtocolDuration,
): DailyMission {
  const idx = (day - 1) % template.length;
  const t = template[idx];
  const phase = Math.floor((day - 1) / template.length);
  const title =
    phase === 0 && template.length >= duration
      ? t.title
      : phase === 0
        ? t.title
        : `Phase ${phase + 1} · ${t.title}`;
  return {
    ...t,
    day,
    title,
    description:
      phase === 0
        ? t.description
        : `Another lap on the same core skills—${t.description.charAt(0).toLowerCase()}${t.description.slice(1)}`,
  };
}

/**
 * Full mission list for a protocol + duration, filling sparse or empty arrays.
 */
export function resolveMissionList(protocol: Protocol, duration: ProtocolDuration): DailyMission[] {
  const declared = protocol.missions[duration] ?? [];
  const template = longestMissionTemplate(protocol);
  const out: DailyMission[] = [];

  for (let day = 1; day <= duration; day++) {
    const hit = explicitMissionForDay(declared, day);
    if (hit) {
      out.push(hit);
      continue;
    }
    if (template.length > 1) {
      out.push(cycledFromTemplate(template, day, duration));
      continue;
    }
    if (template.length === 1 && day !== template[0].day) {
      out.push(placeholderMission(protocol, day, duration));
      continue;
    }
    if (template.length === 1) {
      out.push(template[0]);
      continue;
    }
    out.push(placeholderMission(protocol, day, duration));
  }
  return out;
}

export function getMissionForProtocolDay(
  protocol: Protocol,
  duration: ProtocolDuration,
  dayNumber: number,
): DailyMission | null {
  if (dayNumber < 1 || dayNumber > duration) return null;
  const list = resolveMissionList(protocol, duration);
  return list[dayNumber - 1] ?? null;
}

/**
 * Pick the duration used for mission content.
 * When the user has an active run on this protocol, always use that run's duration so URL/bookmarks
 * cannot desync mission content from stored progress (common cause of "mission not found").
 */
export function resolveMissionDuration(params: {
  protocol: Protocol;
  paramDuration: ProtocolDuration | null;
  activeProtocol: UserProgress | null;
  protocolId: string;
}): ProtocolDuration {
  const { protocol, paramDuration, activeProtocol, protocolId } = params;

  const activeMatches =
    activeProtocol != null &&
    activeProtocol.protocolId === protocolId &&
    protocol.durations.includes(activeProtocol.duration);

  if (activeMatches) {
    return activeProtocol!.duration;
  }

  if (paramDuration != null && protocol.durations.includes(paramDuration)) {
    return paramDuration;
  }

  const withContent = protocol.durations.find((d) => (protocol.missions[d]?.length ?? 0) > 0);
  if (withContent != null) return withContent;

  return protocol.durations[0] ?? 14;
}

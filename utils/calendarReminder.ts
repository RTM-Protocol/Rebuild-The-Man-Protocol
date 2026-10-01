const APP_URL = 'https://rebuildthemanprotocol.com';

/** RFC 5545 TEXT escaping for SUMMARY / DESCRIPTION. */
export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\n|\r/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Local calendar date as YYYY-MM-DD. */
export function localDateYmd(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** YYYY-MM-DD → YYYYMMDD for DTSTART;VALUE=DATE. */
export function ymdToIcsDate(ymd: string): string {
  return ymd.replace(/-/g, '');
}

export function isReminderDateSelectable(ymd: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return false;
  return ymd >= localDateYmd();
}

function utcStamp(d: Date = new Date()): string {
  return (
    d.getUTCFullYear().toString() +
    pad2(d.getUTCMonth() + 1) +
    pad2(d.getUTCDate()) +
    'T' +
    pad2(d.getUTCHours()) +
    pad2(d.getUTCMinutes()) +
    pad2(d.getUTCSeconds()) +
    'Z'
  );
}

function icsLines(lines: string[]): string {
  return lines.join('\r\n') + '\r\n';
}

/**
 * All-day iCalendar reminder to start a protocol again.
 * `dateYmd` is a local calendar date (YYYY-MM-DD), not a timestamp.
 */
export function generateProtocolReminderIcs(
  protocolTitle: string,
  dateYmd: string,
  uid: string = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `rtmp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
): string {
  const summary = `Rebuild The Man Protocol — ${protocolTitle}`;
  const description = `Start ${protocolTitle} again.\n${APP_URL}`;

  return icsLines([
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rebuild The Man Protocol//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${utcStamp()}`,
    `DTSTART;VALUE=DATE:${ymdToIcsDate(dateYmd)}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]);
}

export function reminderIcsFilename(protocolTitle: string, dateYmd: string): string {
  const safeTitle = protocolTitle.replace(/\s+/g, '_');
  return `${safeTitle}_${dateYmd}.ics`;
}

/**
 * Export utilities for protocol mission data
 */

import { UserProgress } from '@/types';
import { protocols } from '@/data/protocols';

export type ExportFormat = 'pdf' | 'csv' | 'txt' | 'json' | 'png' | 'jpeg';

/**
 * Generate CSV export of protocol data
 */
export function generateCSV(progress: UserProgress): string {
  const protocol = protocols.find(p => p.id === progress.protocolId);
  if (!protocol) return '';

  const header = [
    'Day',
    'Mission Title',
    'Status',
    'Completed Date',
    'Field Notes',
    'Pre-Mission Stress',
    'Pre-Mission Anger',
    'Pre-Mission Focus',
    'Mission Helped'
  ].join(',');

  const rows = [];
  
  for (let day = 1; day <= progress.duration; day++) {
    const mission = protocol.missions[progress.duration]?.[day - 1];
    const checkIn = progress.checkIns.find(c => c.day === day);
    const completed = progress.completedDays.includes(day);
    
    const completedDate = completed && checkIn?.date 
      ? new Date(checkIn.date).toLocaleDateString() 
      : 'Not Completed';
    
    const fieldNotes = checkIn?.fieldNotes 
      ? `"${checkIn.fieldNotes.replace(/"/g, '""')}"` 
      : 'No notes';
    
    const preMissionStress = checkIn?.preMission?.stressLevel ?? 'N/A';
    const preMissionAnger = checkIn?.preMission?.angerLevel ?? 'N/A';
    const preMissionFocus = checkIn?.preMission?.focusLevel ?? 'N/A';
    const didHelp = checkIn?.postMission?.didHelp === null 
      ? 'Skipped' 
      : checkIn?.postMission?.didHelp === true 
        ? 'Yes' 
        : checkIn?.postMission?.didHelp === false 
          ? 'No' 
          : 'N/A';
    
    rows.push([
      day,
      mission?.title || 'Unknown',
      completed ? 'Completed' : 'Incomplete',
      completedDate,
      fieldNotes,
      preMissionStress,
      preMissionAnger,
      preMissionFocus,
      didHelp
    ].join(','));
  }

  return [header, ...rows].join('\n');
}

/**
 * Generate plain text export
 */
export function generateTextExport(progress: UserProgress): string {
  const protocol = protocols.find(p => p.id === progress.protocolId);
  if (!protocol) return '';

  const startDate = new Date(progress.startDate).toLocaleDateString();
  const completionRate = Math.round((progress.completedDays.length / progress.duration) * 100);

  let output = `REBUILD THE MAN PROTOCOL - MISSION EXPORT\n`;
  output += `${'='.repeat(60)}\n\n`;
  output += `Protocol: ${protocol.title}\n`;
  output += `Duration: ${progress.duration} Days\n`;
  output += `Start Date: ${startDate}\n`;
  output += `Completion Rate: ${completionRate}%\n`;
  output += `Current Streak: ${progress.streak} days\n`;
  output += `Longest Streak: ${progress.longestStreak} days\n`;
  output += `Total Missions Completed: ${progress.completedDays.length}\n`;
  output += `\n${'='.repeat(60)}\n\n`;

  // Mission details
  for (let day = 1; day <= progress.duration; day++) {
    const mission = protocol.missions[progress.duration]?.[day - 1];
    const checkIn = progress.checkIns.find(c => c.day === day);
    const completed = progress.completedDays.includes(day);
    
    output += `DAY ${day}: ${mission?.title || 'Unknown'}\n`;
    output += `${'-'.repeat(60)}\n`;
    output += `Status: ${completed ? '✓ COMPLETED' : '○ INCOMPLETE'}\n`;
    
    if (checkIn?.date) {
      output += `Date: ${new Date(checkIn.date).toLocaleDateString()}\n`;
    }
    
    if (checkIn?.preMission) {
      output += `\nPre-Mission Assessment:\n`;
      output += `  Stress Level: ${checkIn.preMission.stressLevel}/10\n`;
      output += `  Anger Level: ${checkIn.preMission.angerLevel}/10\n`;
      output += `  Focus Level: ${checkIn.preMission.focusLevel}/10\n`;
    }
    
    if (checkIn?.postMission?.didHelp !== undefined && checkIn?.postMission?.didHelp !== null) {
      output += `\nPost-Mission:\n`;
      output += `  Mission Helpful: ${checkIn.postMission.didHelp ? 'Yes' : 'No'}\n`;
    }
    
    if (checkIn?.fieldNotes) {
      output += `\nField Notes:\n`;
      output += `${checkIn.fieldNotes}\n`;
    } else {
      output += `\nField Notes: (No notes recorded)\n`;
    }
    
    output += `\n${'='.repeat(60)}\n\n`;
  }

  // Setbacks
  if (progress.setbacks.length > 0) {
    output += `SETBACKS RECORDED\n`;
    output += `${'-'.repeat(60)}\n`;
    progress.setbacks.forEach((setback, index) => {
      output += `${index + 1}. Day ${setback.day} - ${new Date(setback.date).toLocaleDateString()}\n`;
      if (setback.note) {
        output += `   Note: ${setback.note}\n`;
      }
    });
    output += `\n`;
  }

  output += `\nExported: ${new Date().toLocaleString()}\n`;
  output += `Rebuild The Man Protocol - rebuildthemanprotocol.com\n`;

  return output;
}

/**
 * Generate JSON export
 */
export function generateJSONExport(progress: UserProgress): string {
  const protocol = protocols.find(p => p.id === progress.protocolId);
  
  const exportData = {
    metadata: {
      exportDate: new Date().toISOString(),
      exportVersion: '1.0',
      source: 'Rebuild The Man Protocol'
    },
    protocol: {
      id: progress.protocolId,
      title: protocol?.title || 'Unknown',
      duration: progress.duration,
      startDate: progress.startDate,
      completionRate: Math.round((progress.completedDays.length / progress.duration) * 100)
    },
    progress: {
      currentDay: progress.currentDay,
      completedDays: progress.completedDays,
      streak: progress.streak,
      longestStreak: progress.longestStreak,
      totalMissionsCompleted: progress.totalMissionsCompleted,
      intensityMode: progress.intensityMode
    },
    missions: progress.checkIns.map(checkIn => {
      const mission = protocol?.missions[progress.duration]?.[checkIn.day - 1];
      return {
        day: checkIn.day,
        title: mission?.title || 'Unknown',
        date: checkIn.date,
        completed: progress.completedDays.includes(checkIn.day),
        preMission: checkIn.preMission,
        postMission: checkIn.postMission,
        fieldNotes: checkIn.fieldNotes,
        fieldNotesEditedAt: checkIn.fieldNotesEditedAt
      };
    }),
    setbacks: progress.setbacks
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Trigger file download
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export to CSV format
 */
export function exportToCSV(progress: UserProgress) {
  const csv = generateCSV(progress);
  const protocol = protocols.find(p => p.id === progress.protocolId);
  const filename = `${protocol?.title.replace(/\s+/g, '_')}_Export_${new Date().toISOString().split('T')[0]}.csv`;
  downloadFile(csv, filename, 'text/csv;charset=utf-8;');
}

/**
 * Export to TXT format
 */
export function exportToTXT(progress: UserProgress) {
  const txt = generateTextExport(progress);
  const protocol = protocols.find(p => p.id === progress.protocolId);
  const filename = `${protocol?.title.replace(/\s+/g, '_')}_Export_${new Date().toISOString().split('T')[0]}.txt`;
  downloadFile(txt, filename, 'text/plain;charset=utf-8;');
}

/**
 * Export to JSON format
 */
export function exportToJSON(progress: UserProgress) {
  const json = generateJSONExport(progress);
  const protocol = protocols.find(p => p.id === progress.protocolId);
  const filename = `${protocol?.title.replace(/\s+/g, '_')}_Export_${new Date().toISOString().split('T')[0]}.json`;
  downloadFile(json, filename, 'application/json;charset=utf-8;');
}

/**
 * Generate HTML for PDF/Image export
 */
export function generateHTMLForExport(progress: UserProgress): string {
  const protocol = protocols.find(p => p.id === progress.protocolId);
  if (!protocol) return '';

  const startDate = new Date(progress.startDate).toLocaleDateString();
  const completionRate = Math.round((progress.completedDays.length / progress.duration) * 100);

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Courier New', monospace;
          background: #1a1a1a;
          color: #e0e0e0;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #ff6b35;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          color: #ff6b35;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 14px;
          color: #4ade80;
        }
        .summary {
          background: #2a2a2a;
          border-left: 4px solid #4ade80;
          padding: 20px;
          margin-bottom: 30px;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
        }
        .mission {
          background: #2a2a2a;
          border-left: 4px solid #ff6b35;
          padding: 20px;
          margin-bottom: 20px;
        }
        .mission-header {
          font-size: 18px;
          font-weight: bold;
          color: #ff6b35;
          margin-bottom: 10px;
        }
        .mission-status {
          color: #4ade80;
          font-weight: bold;
        }
        .mission-incomplete {
          color: #666;
        }
        .field-notes {
          background: #1a1a1a;
          padding: 15px;
          margin-top: 10px;
          border-left: 2px solid #666;
        }
        .footer {
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #333;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title" style="display:flex;align-items:center;justify-content:center;gap:12px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6.5 5.5H17.5L19.25 8v5L12 20.25 4.75 13V8L6.5 5.5z" stroke="#ff6b35" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
          </svg>
          <span>Rebuild The Man Protocol</span>
        </div>
        <div class="subtitle">Mission Export Report</div>
      </div>

      <div class="summary">
        <div class="summary-item">
          <span>Protocol:</span>
          <span><strong>${protocol.title}</strong></span>
        </div>
        <div class="summary-item">
          <span>Duration:</span>
          <span><strong>${progress.duration} Days</strong></span>
        </div>
        <div class="summary-item">
          <span>Start Date:</span>
          <span><strong>${startDate}</strong></span>
        </div>
        <div class="summary-item">
          <span>Completion Rate:</span>
          <span><strong>${completionRate}%</strong></span>
        </div>
        <div class="summary-item">
          <span>Current Streak:</span>
          <span><strong>${progress.streak} days</strong></span>
        </div>
        <div class="summary-item">
          <span>Missions Completed:</span>
          <span><strong>${progress.completedDays.length} / ${progress.duration}</strong></span>
        </div>
      </div>
  `;

  // Add missions
  for (let day = 1; day <= progress.duration; day++) {
    const mission = protocol.missions[progress.duration]?.[day - 1];
    const checkIn = progress.checkIns.find(c => c.day === day);
    const completed = progress.completedDays.includes(day);

    html += `
      <div class="mission">
        <div class="mission-header">Day ${day}: ${mission?.title || 'Unknown'}</div>
        <div class="${completed ? 'mission-status' : 'mission-incomplete'}">
          ${completed ? '✓ COMPLETED' : '○ INCOMPLETE'}
        </div>
    `;

    if (checkIn?.date) {
      html += `<div style="margin-top: 10px;">Date: ${new Date(checkIn.date).toLocaleDateString()}</div>`;
    }

    if (checkIn?.preMission) {
      html += `
        <div style="margin-top: 15px;">
          <strong>Pre-Mission Assessment:</strong><br>
          Stress: ${checkIn.preMission.stressLevel}/10 | 
          Anger: ${checkIn.preMission.angerLevel}/10 | 
          Focus: ${checkIn.preMission.focusLevel}/10
        </div>
      `;
    }

    if (checkIn?.fieldNotes) {
      html += `
        <div class="field-notes">
          <strong>Field Notes:</strong><br>
          ${checkIn.fieldNotes.replace(/\n/g, '<br>')}
        </div>
      `;
    }

    html += `</div>`;
  }

  html += `
      <div class="footer">
        Exported: ${new Date().toLocaleString()}<br>
        Rebuild The Man Protocol - rebuildthemanprotocol.com
      </div>
    </body>
    </html>
  `;

  return html;
}


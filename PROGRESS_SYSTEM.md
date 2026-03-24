# Progress & Local Storage System

## Overview
The app now features a comprehensive local storage system that persists all user progress across browser sessions.

## What's Stored

### 1. Active Protocol
- **Key**: `activeProtocol`
- **Data Structure**:
  ```typescript
  {
    protocolId: string;
    duration: number;
    currentDay: number;
    completedDays: number[];
    startDate: string;
    lastCompletedDate?: string;
    streak: number;
  }
  ```

### 2. Completed Protocols
- **Key**: `completedProtocols`
- **Data Structure**: Array of:
  ```typescript
  {
    protocolId: string;
    duration: number;
    completedDate: string;
  }
  ```

## Features Implemented

### ✅ Progress Context Provider
- Global state management using React Context
- Automatic localStorage sync
- Handles protocol start, day completion, and resets

### ✅ Progress Dashboard
- Shows active protocol progress at the top of home page
- Displays:
  - Current protocol name
  - Progress bar with percentage
  - Current day / total days
  - Streak count
  - Quick "Continue" button

### ✅ Mission Checklist
- Visual checklist on protocol detail page
- Shows:
  - ✓ Completed days (green checkmark)
  - → Current day (orange highlight)
  - ○ Upcoming days (gray)
  - Time estimates for each mission
  - Quick links to start/view missions

### ✅ Streak Tracking
- Counts consecutive days of completion
- Resets if a day is missed
- Maintains streak if completing same day multiple times

### ✅ Reset Options
- **Reset Current Protocol**: Clears active protocol only
- **Reset All Progress**: Nuclear option - deletes everything
- Accessible via Settings button (⚙️) in navigation

### ✅ Persistence
- All progress automatically saved to localStorage
- Survives page refreshes and browser restarts
- No backend required

## How It Works

### Starting a Protocol
1. User selects protocol and duration
2. Confirmation modal appears
3. On confirm, `startProtocol()` creates new UserProgress
4. Automatically saved to localStorage
5. Redirects to Day 1

### Completing a Day
1. User completes mission instructions
2. Clicks "Complete Mission"
3. `completeDay()` updates:
   - Adds day to completedDays array
   - Updates currentDay to next day
   - Calculates new streak
   - Saves to localStorage
4. If protocol complete, archives and redirects to completion page

### Loading Progress
1. ProgressProvider loads data on app mount
2. Checks localStorage for activeProtocol and completedProtocols
3. Hydrates React state
4. Components access via `useProgress()` hook

## Components Using Progress

### Navigation.tsx
- Shows Settings button only when active protocol exists
- Opens reset modal

### ProgressDashboard.tsx
- Displays active protocol summary
- Shows completion count if no active protocol

### MissionChecklist.tsx
- Visual checklist with completion indicators
- Links to mission pages

### Protocol Pages
- Protocol detail page: Shows checklist, syncs with active protocol
- Mission page: Uses context for completion
- Complete page: Archives protocol

## Usage in Components

```typescript
import { useProgress } from '@/contexts/ProgressContext';

function MyComponent() {
  const { 
    activeProtocol,      // Current protocol data or null
    completedProtocols,  // Array of completed protocols
    startProtocol,       // Start new protocol
    completeDay,         // Mark day complete
    resetProtocol,       // Clear active protocol
    resetAllProgress,    // Delete everything
    isLoading            // Initial load state
  } = useProgress();
  
  // Your component logic
}
```

## Data Flow

```
User Action → Component → useProgress() → ProgressContext 
  → State Update → useEffect → localStorage.setItem()
```

## Browser Compatibility
- Works in all modern browsers with localStorage support
- Gracefully handles localStorage errors
- No data sent to servers (fully client-side)

## Future Enhancements
- Export progress as JSON
- Import progress from backup
- Cloud sync (optional)
- Analytics/insights dashboard




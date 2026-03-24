# Daily Reminder System

## 🔔 Overview
The app now includes a browser-based notification system to help users stay consistent with their daily missions using the Web Notifications API.

## ✨ Features Implemented

### 1. **Reminder Settings**
- **Toggle Switch**: Enable/disable reminders with a single click
- **Time Picker**: Set preferred reminder time (24-hour format)
- **Permission Management**: Automatic browser permission request
- **Persistent Storage**: Settings saved to localStorage

### 2. **Browser Notifications**
- **Web Notifications API**: Native browser notifications
- **Smart Scheduling**: Checks every minute if it's time to notify
- **Random Messages**: Varied notification text to keep it fresh
- **Protocol Context**: Shows current protocol name in notification

### 3. **User Interface**

#### Settings Modal (⚙️ Settings in Nav)
- **Two Tabs**:
  - "Reset" - Protocol reset options
  - "Reminders" - Reminder configuration
- **Toggle Switch**: Visual on/off indicator (green = on, gray = off)
- **Time Input**: Standard HTML5 time picker
- **Permission Status**: Shows if notifications are blocked

#### Reminder Prompt (Dashboard)
- **Encouragement Card**: Appears on dashboard if reminders not enabled
- **Quick Setup**: One-click to enable reminders
- **Dismissible**: Can be hidden without enabling
- **Non-intrusive**: Only shows when relevant

### 4. **Notification Manager** (Background Component)
- **Auto-scheduling**: Checks time every 60 seconds
- **Protocol-aware**: Only runs when active protocol exists
- **Clean Lifecycle**: Properly manages intervals and cleanup
- **No UI**: Runs silently in the background

## 📊 Data Structure

### ReminderSettings Interface
```typescript
{
  enabled: boolean;              // On/off toggle
  time: string;                  // HH:MM format (24-hour)
  notificationsPermission:       // Browser permission status
    'granted' | 'denied' | 'default'
}
```

Stored in: `localStorage: reminderSettings`

## 🔄 How It Works

### Setup Flow
```
1. User clicks "SETUP REMINDER" or toggles switch
2. Browser permission dialog appears (if not already granted)
3. If granted:
   - Reminder enabled automatically
   - Default time set to 09:00
   - Settings saved to localStorage
4. If denied:
   - Alert shown with instructions
   - Reminder stays disabled
```

### Daily Notification Flow
```
1. NotificationManager runs every 60 seconds
2. Checks if:
   - Reminders are enabled
   - Active protocol exists
   - Current time matches reminder time (±1 minute)
3. If all conditions met:
   - Show browser notification
   - Random message selected
   - Protocol name included
```

### Notification Messages
Random selection from:
- "Today's mission is ready"
- "Time to do the work"
- "Your daily mission awaits"
- "Ready to rebuild?"

Body text: "{Protocol Name} - Continue your rebuild journey"

## 🎨 Components Created

### 1. **ReminderSettings.tsx**
- Settings interface with toggle and time picker
- Permission request handling
- Real-time permission status display
- Warning for blocked notifications

### 2. **ReminderPrompt.tsx**
- Encouragement card for dashboard
- Quick setup button
- Dismissible design
- Only shows when reminders disabled

### 3. **NotificationManager.tsx**
- Background notification scheduler
- Interval management
- Protocol-aware checking
- Automatic cleanup

### 4. **notifications.ts** (Utils)
Helper functions:
- `requestNotificationPermission()` - Request browser permission
- `showNotification()` - Display notification
- `checkAndShowDailyReminder()` - Check time and show if match
- `scheduleNextCheck()` - Set up interval timer

## 📱 Where to Find Features

### Access Reminder Settings:
1. Click **⚙️ Settings** in navigation (appears when active protocol)
2. Click **"Reminders"** tab
3. Toggle reminders on/off
4. Set preferred time

### Setup Reminders (Quick):
1. Start a protocol
2. See encouragement card on dashboard
3. Click **"SETUP REMINDER"**
4. Allow notifications when prompted

## 🎯 Key Features

✅ **Optional**: Users can decline reminders  
✅ **Encouragement**: Gentle prompts without being pushy  
✅ **Simple Toggle**: Easy on/off switch  
✅ **Default Time**: 9:00 AM sensible default  
✅ **Persistent**: Settings survive browser restart  
✅ **Permission-aware**: Handles all permission states  
✅ **Clean UI**: Integrated into existing settings modal  

## 🔧 Technical Details

### Browser Compatibility
- Uses standard Web Notifications API
- Requires HTTPS (or localhost for testing)
- Supported by all modern browsers
- Gracefully degrades if not supported

### Permission States
- **granted**: Notifications will show
- **denied**: User blocked notifications
- **default**: User hasn't decided yet

### Timing Mechanism
- Checks every 60 seconds (1 minute)
- Notification shows if within 1 minute of reminder time
- Uses `setInterval` with proper cleanup
- Only runs when enabled and protocol active

### Data Persistence
- Saved separately from progress data
- Survives "Reset All Progress" (by design)
- Syncs permission status on app load
- Auto-saves on every change

## 🚀 Usage Example

### User Story:
```
1. User starts "Rebuild The Man" protocol
2. Sees encouragement card: "Stay Consistent"
3. Clicks "SETUP REMINDER"
4. Browser asks: "Allow notifications?"
5. User allows
6. Reminder enabled at 9:00 AM
7. User changes time to 7:00 AM in settings
8. Next day at 7:00 AM: Browser notification appears
9. User clicks notification (optional - can dismiss)
10. Continues daily missions with reminders
```

## 📝 Settings Modal Structure

```
⚙️ Settings
├── [Reset Tab]
│   ├── Reset Current Protocol
│   └── Reset All Progress
│
└── [Reminders Tab]
    ├── Toggle (On/Off)
    ├── Time Picker (if enabled)
    └── Permission Status
```

## 💾 localStorage Keys

Added:
- `reminderSettings` - User reminder preferences

Preserved on Reset All:
- Reminder settings intentionally kept (user preference)

## 🎉 Benefits

1. **Consistency**: Daily reminders help build habit
2. **Flexibility**: Users choose their time
3. **Control**: Easy to enable/disable
4. **Privacy**: All local, no external services
5. **Simple**: One toggle, one time picker
6. **Forgiving**: Can be dismissed without guilt

## 🔮 Future Enhancements

Potential additions:
- Multiple reminder times per day
- Custom notification messages
- Reminder history/log
- Smart reminders (based on completion patterns)
- Sound options
- Snooze functionality



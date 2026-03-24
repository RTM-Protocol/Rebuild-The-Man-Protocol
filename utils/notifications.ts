export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon-192.png', // You can add an icon later
      badge: '/icon-192.png',
      ...options
    });
  }
}

export function checkAndShowDailyReminder(reminderTime: string, protocolName: string) {
  const now = new Date();
  const [hours, minutes] = reminderTime.split(':').map(Number);
  
  const reminderDate = new Date();
  reminderDate.setHours(hours, minutes, 0, 0);

  // Check if current time is within 1 minute of reminder time
  const timeDiff = Math.abs(now.getTime() - reminderDate.getTime());
  const oneMinute = 60 * 1000;

  if (timeDiff < oneMinute) {
    const messages = [
      `Today's mission is ready`,
      `Time to do the work`,
      `Your daily mission awaits`,
      `Ready to rebuild?`
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];

    showNotification(message, {
      body: `${protocolName} - Continue your rebuild journey`,
      tag: 'daily-reminder',
      requireInteraction: false,
      silent: false
    });
  }
}

export function scheduleNextCheck(callback: () => void) {
  // Check every minute
  return setInterval(callback, 60000);
}



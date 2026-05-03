'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useProgress } from '@/contexts/ProgressContext';
import ConfirmationModal from '@/components/ConfirmationModal';
import {
  MAILTO_CONTACT,
  MAILTO_FEEDBACK,
  MAILTO_SUPPORT,
  EMAIL_ROW_BUTTON_CLASS,
} from '@/lib/mailtoUrls';

export default function SettingsPage() {
  const { 
    reminderSettings, 
    updateReminderSettings, 
    resetProtocol, 
    resetAllProgress,
    activeProtocol,
    setAccountabilityPartner
  } = useProgress();

  const [showResetProtocolModal, setShowResetProtocolModal] = useState(false);
  const [showClearDataModal, setShowClearDataModal] = useState(false);
  const [showRemovePartnerModal, setShowRemovePartnerModal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notificationTime, setNotificationTime] = useState(reminderSettings.time);
  const [notificationsEnabled, setNotificationsEnabled] = useState(reminderSettings.enabled);
  const [showStats, setShowStats] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    // Ensure theme is applied
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
    }
    
    // Load stats preference
    const savedShowStats = localStorage.getItem('show_stats');
    if (savedShowStats !== null) {
      setShowStats(savedShowStats === 'true');
    }

    // Listen for theme changes from other components
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail);
    };
    window.addEventListener('themechange', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange as EventListener);
    };
  }, []);

  // Sync local state with reminder settings
  useEffect(() => {
    setNotificationTime(reminderSettings.time);
    setNotificationsEnabled(reminderSettings.enabled);
  }, [reminderSettings]);

  const handleEnableNotifications = async () => {
    if (!notificationsEnabled && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateReminderSettings({ enabled: true, notificationsPermission: permission });
        setNotificationsEnabled(true);
      }
    } else {
      updateReminderSettings({ enabled: !notificationsEnabled });
      setNotificationsEnabled(!notificationsEnabled);
    }
  };

  const handleTimeChange = (time: string) => {
    setNotificationTime(time);
    updateReminderSettings({ time });
  };

  const handleResetProtocol = () => {
    resetProtocol();
    setShowResetProtocolModal(false);
  };

  const handleClearAllData = () => {
    resetAllProgress();
    setShowClearDataModal(false);
  };

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // Apply theme class to document
    if (newTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
    }
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: newTheme }));
  };

  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase">
              ← Back to Protocols
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white uppercase tracking-tight mb-2">
            Settings
          </h1>
          <p className="text-gray-400 text-lg">
            Configure your rebuild experience
          </p>
        </div>

        {/* Notification Settings */}
        <section className="mb-8 bg-tactical-darkgray border border-tactical-lightgray p-6">
          <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
            <span>🔔</span>
            <span>Notifications</span>
          </h2>
          
          <div className="space-y-4">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold mb-1">Daily Reminders</div>
                <div className="text-gray-400 text-sm">Get notified to complete your daily mission</div>
              </div>
              <button
                onClick={handleEnableNotifications}
                className={`
                  relative w-14 h-8 rounded-full transition-colors
                  ${notificationsEnabled ? 'bg-tactical-green' : 'bg-tactical-gray'}
                `}
              >
                <div className={`
                  absolute top-1 w-6 h-6 bg-white rounded-full transition-transform
                  ${notificationsEnabled ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </button>
            </div>

            {/* Time Picker */}
            {notificationsEnabled && (
              <div className="pt-4 border-t border-tactical-lightgray">
                <label className="text-white font-semibold block mb-2">Reminder Time</label>
                <input
                  type="time"
                  value={notificationTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="bg-tactical-gray border border-tactical-lightgray text-white px-4 py-2 font-mono"
                />
                <p className="text-gray-400 text-xs mt-2">
                  You&apos;ll receive a notification at this time each day
                </p>
              </div>
            )}

            {reminderSettings.notificationsPermission === 'denied' && (
              <div className="bg-red-900/20 border border-red-700 p-4 rounded">
                <p className="text-red-400 text-sm">
                  ⚠️ Notifications are blocked. Please enable them in your browser settings.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Appearance */}
        <section className="mb-8 bg-tactical-darkgray border border-tactical-lightgray p-6">
          <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
            <span>🎨</span>
            <span>Appearance & Display</span>
          </h2>
          
          <div className="mb-6">
            <div className="text-white font-semibold mb-3">Theme</div>
            <div className="flex gap-3">
              <button
                onClick={() => handleThemeChange('dark')}
                className={`
                  flex-1 py-3 px-4 font-bold uppercase transition-all border-2
                  ${theme === 'dark'
                    ? 'bg-tactical-orange border-tactical-orange text-white'
                    : 'bg-tactical-gray border-tactical-lightgray text-gray-400 hover:border-tactical-orange'
                  }
                `}
              >
                🌙 Dark Mode
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                className={`
                  flex-1 py-3 px-4 font-bold uppercase transition-all border-2
                  ${theme === 'light'
                    ? 'bg-tactical-orange border-tactical-orange text-white'
                    : 'bg-tactical-gray border-tactical-lightgray text-gray-400 hover:border-tactical-orange'
                  }
                `}
              >
                ☀️ Light Mode
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Switch between dark and light themes. Your preference will be saved.
            </p>
          </div>

          <div className="pt-6 border-t border-tactical-lightgray">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold mb-1">Research Statistics</div>
                <div className="text-gray-400 text-sm">Show mental health research data and context</div>
              </div>
              <button
                onClick={() => {
                  const newValue = !showStats;
                  setShowStats(newValue);
                  localStorage.setItem('show_stats', newValue.toString());
                }}
                className={`
                  relative w-14 h-8 rounded-full transition-colors
                  ${showStats ? 'bg-tactical-green' : 'bg-tactical-gray'}
                `}
              >
                <div className={`
                  absolute top-1 w-6 h-6 bg-white rounded-full transition-transform
                  ${showStats ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Shows research-backed statistics to normalize challenges and contextualize progress
            </p>
          </div>
        </section>

        {/* Protocol Management */}
        {activeProtocol && (
          <section className="mb-8 bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
              <span>🔄</span>
              <span>Protocol Management</span>
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-white font-semibold mb-2">Reset Current Protocol</div>
                <p className="text-gray-400 text-sm mb-3">
                  Clear your progress on the current protocol and start fresh. This cannot be undone.
                </p>
                <button
                  onClick={() => setShowResetProtocolModal(true)}
                  className="bg-tactical-orange hover:bg-tactical-orange-bright text-white font-bold uppercase px-6 py-2 transition-colors"
                >
                  Reset Protocol
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Accountability Partner */}
        {activeProtocol && (
          <section className="mb-8 bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
              <span>🤝</span>
              <span>Accountability Partner</span>
            </h2>

            {activeProtocol.accountabilityPartner?.enabled ? (
              <div className="space-y-4">
                <div className="bg-tactical-gray border-l-4 border-tactical-green p-4">
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-tactical-green-bright font-bold">Active</span> — You have an accountability partner enabled.
                    Progress sharing (days completed and missed only) is available on your protocol and mission pages.
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-3">
                    Want to continue solo? You can remove your accountability partner at any time. This won&apos;t affect your progress.
                  </p>
                  <button
                    onClick={() => setShowRemovePartnerModal(true)}
                    className="bg-tactical-gray hover:bg-tactical-lightgray border border-tactical-lightgray text-white font-bold uppercase px-6 py-2 transition-colors text-sm"
                  >
                    Remove Accountability Partner
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  No accountability partner is currently set. Having someone who knows you&apos;re doing the work
                  can increase your follow-through by up to 65%.
                </p>
                <button
                  onClick={() => setAccountabilityPartner(true)}
                  className="bg-tactical-darkgray border-2 border-tactical-orange hover:border-tactical-orange-bright text-white font-bold uppercase px-6 py-2 transition-colors text-sm"
                >
                  Enable Accountability Partner
                </button>
              </div>
            )}
          </section>
        )}

        {/* Data Management */}
        <section className="mb-8 bg-tactical-darkgray border border-red-700 p-6">
          <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
            <span>⚠️</span>
            <span>Data Management</span>
          </h2>
          
          <div>
            <div className="text-white font-semibold mb-2">Clear All Data</div>
            <p className="text-gray-400 text-sm mb-3">
              Delete all progress, protocols, and check-in data. This will reset everything to default. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowClearDataModal(true)}
              className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase px-6 py-2 transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </section>

        {/* About */}
        <section className="mb-8 bg-tactical-darkgray border border-tactical-lightgray p-6">
              <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
            <span>ℹ️</span>
            <span className="font-brand"><span style={{ color: '#faf9f5' }}>About Rebuild The Man</span> <span style={{ color: '#cc6119' }}>Protocol</span></span>
          </h2>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-tactical-orange font-bold uppercase text-sm mb-2">Mission</h3>
              <p>
                To provide evidence-based, actionable protocols that help people rebuild their mental and emotional resilience. No fluff, no BS—just practical tools that work.
              </p>
            </div>
            
            <div>
              <h3 className="text-tactical-orange font-bold uppercase text-sm mb-2">Vision</h3>
              <p>
                A world where mental health support is accessible, stigma-free, and rooted in real science. Where people have the tools to rebuild themselves, one day at a time.
              </p>
            </div>

            <div>
              <h3 className="text-tactical-orange font-bold uppercase text-sm mb-2">Approach</h3>
              <p>
                We believe in structured, measurable progress. Our protocols are built on cognitive behavioral therapy (CBT), mindfulness practices, and proven behavioral science. Track your data, see your improvement, rebuild stronger.
              </p>
            </div>

            <div className="pt-4 border-t border-tactical-lightgray">
              <p className="text-tactical-green-bright font-bold">
                Every setback is data. Every mission is progress. You&apos;re not broken—you&apos;re rebuilding.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Feedback */}
        <section className="mb-8 bg-tactical-darkgray border border-tactical-lightgray p-6">
          <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
            <span>💬</span>
            <span>Contact & Feedback</span>
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">
              We&apos;re constantly improving Rebuild The Man Protocol. Your feedback helps us build better tools for everyone.
            </p>
            
            <div className="space-y-3">
              <a href={MAILTO_CONTACT} className={EMAIL_ROW_BUTTON_CLASS}>
                📮 General &amp; business contact
              </a>
              <a href={MAILTO_SUPPORT} className={EMAIL_ROW_BUTTON_CLASS}>
                🆘 App support &amp; technical issues
              </a>
              <a href={MAILTO_FEEDBACK} className={EMAIL_ROW_BUTTON_CLASS}>
                📧 Send feedback
              </a>
            </div>

            <p className="text-gray-400 text-xs">
              Response time: Within 24-48 hours. For emergencies, please contact a crisis hotline.
            </p>
          </div>
        </section>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm">
          <p className="font-brand mb-1"><span style={{ color: '#faf9f5' }}>Rebuild The Man</span> <span style={{ color: '#cc6119' }}>Protocol</span> v1.0.0</p>
          <p>Built with purpose. Designed for results.</p>
        </div>
      </div>

      {/* Reset Protocol Modal */}
      <ConfirmationModal
        isOpen={showResetProtocolModal}
        onClose={() => setShowResetProtocolModal(false)}
        onConfirm={handleResetProtocol}
        title="Reset Current Protocol?"
        message="This will clear all progress on your current protocol. Your completed protocols and lifetime stats will be preserved. Are you sure?"
        confirmText="Reset Protocol"
        cancelText="Cancel"
        isDangerous={true}
      />

      {/* Clear All Data Modal */}
      <ConfirmationModal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        onConfirm={handleClearAllData}
        title="Clear All Data?"
        message="This will permanently delete ALL your progress, protocols, check-ins, and statistics. This action cannot be undone. Are you absolutely sure?"
        confirmText="Delete Everything"
        cancelText="Cancel"
        isDangerous={true}
      />

      {/* Remove Accountability Partner Modal */}
      <ConfirmationModal
        isOpen={showRemovePartnerModal}
        onClose={() => setShowRemovePartnerModal(false)}
        onConfirm={() => {
          setAccountabilityPartner(false);
          setShowRemovePartnerModal(false);
        }}
        title="Remove Accountability Partner?"
        message="You'll no longer see the option to share progress with a partner. Your protocol progress won't be affected. You can re-enable this at any time."
        confirmText="Remove Partner"
        cancelText="Keep Partner"
      />

      <Footer />
    </div>
  );
}


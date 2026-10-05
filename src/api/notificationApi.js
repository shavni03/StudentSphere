/**
 * StudentSphere Frontend Notification API Abstraction Layer
 * 
 * IMPORTANT ARCHITECTURE RULE:
 * This file provides the frontend contract for the backend notification services.
 * - Resend API key and Telegram Bot Token are NEVER stored in or called directly from the frontend.
 * - All calls route to the backend REST API endpoints.
 * - LocalStorage is utilized here as a reliable client-side mock/fallback until the backend server is plugged in.
 */

const STORAGE_KEY_NOTIFICATIONS = 'studentsphere_notifications';
const STORAGE_KEY_PREFERENCES = 'studentsphere_notification_preferences';
const STORAGE_KEY_TELEGRAM = 'studentsphere_telegram_status';

// Default initial notifications conforming to StudentSphere Notification Model:
// id, userId, title, message, type, priority, isRead, createdAt, actionUrl, metadata
export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'usr-curr-01',
    title: 'New SDE Internship: Google India',
    message: 'Google Summer of Code & 2027 Engineering Intern applications are now live. Deadline in 14 days.',
    type: 'JOB_ALERT',
    priority: 'Urgent',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    actionUrl: '/jobs/job-1',
    metadata: { company: 'Google', stipend: '₹1,25,000/mo', location: 'Bengaluru / Hyderabad' }
  },
  {
    id: 'notif-2',
    userId: 'usr-curr-01',
    title: 'Verified Notes Approved: Distributed Systems (Sem 6)',
    message: 'Your uploaded notes for CS602 - Distributed Systems were verified by the academic moderator! You earned +50 credits.',
    type: 'ACADEMIC',
    priority: 'Important',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    actionUrl: '/notes/note-101',
    metadata: { subject: 'Distributed Systems', code: 'CS602', creditsEarned: 50 }
  },
  {
    id: 'notif-3',
    userId: 'usr-curr-01',
    title: 'Amazon On-Campus Drive Date Announced',
    message: 'Amazon India Campus Hiring round 1 assessment is scheduled for October 18, 2026. Review previous interview experiences now.',
    type: 'PLACEMENT',
    priority: 'Urgent',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    actionUrl: '/interviews?company=Amazon',
    metadata: { company: 'Amazon', driveType: 'On-Campus', date: '2026-10-18' }
  },
  {
    id: 'notif-4',
    userId: 'usr-curr-01',
    title: 'New Interview Experience: Microsoft FTE',
    message: 'Rohit Sharma (2026 Batch) shared a detailed 4-round interview breakdown for L59 SWE with LeetCode tagged questions.',
    type: 'INTERVIEW',
    priority: 'Normal',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    actionUrl: '/interviews/exp-1',
    metadata: { company: 'Microsoft', rounds: 4, difficulty: 'Medium-Hard' }
  },
  {
    id: 'notif-5',
    userId: 'usr-curr-01',
    title: 'Monthly Contributor Credit Bonus',
    message: 'You ranked #4 on the university contributor leaderboard this month. +100 bonus credits added to your profile.',
    type: 'CREDIT',
    priority: 'Important',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    actionUrl: '/credits',
    metadata: { amount: 100, reason: 'Leaderboard rank reward' }
  },
  {
    id: 'notif-6',
    userId: 'usr-curr-01',
    title: 'Mid-Term PYQ Repository Updated (2025-2026)',
    message: 'End-term and mid-term exam question papers for CSE, ECE, and IT branches are now available for free download.',
    type: 'ACADEMIC',
    priority: 'Normal',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    actionUrl: '/pyqs',
    metadata: { freeDownload: true, totalPapers: 42 }
  },
  {
    id: 'notif-7',
    userId: 'usr-curr-01',
    title: 'Campus Hackathon 2026 Registration Open',
    message: 'StudentSphere HackFest: Build next-gen student utility apps. ₹2,00,000 cash prize pool.',
    type: 'ANNOUNCEMENT',
    priority: 'Important',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    actionUrl: '/features',
    metadata: { event: 'HackFest 2026' }
  },
  {
    id: 'notif-8',
    userId: 'usr-curr-01',
    title: 'New Login Detected from Chrome (macOS)',
    message: 'Your account was accessed from IP 192.168.1.1 on macOS Chrome. If this was not you, update your password immediately.',
    type: 'SECURITY',
    priority: 'Urgent',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    actionUrl: '/settings',
    metadata: { device: 'Mac OS Chrome', ip: '192.168.1.1' }
  }
];

// Default notification preferences matrix
export const DEFAULT_PREFERENCES = {
  jobAlerts: { website: true, email: true, telegram: true },
  placementAlerts: { website: true, email: true, telegram: true },
  academicUpdates: { website: true, email: true, telegram: false },
  interviewUpdates: { website: true, email: true, telegram: true },
  creditUpdates: { website: true, email: true, telegram: false },
  announcements: { website: true, email: true, telegram: false },
  securityAlerts: { website: true, email: true, telegram: true } // Security cannot be turned off
};

// Initial telegram status
export const DEFAULT_TELEGRAM_STATUS = {
  isConnected: false,
  username: null,
  chatId: null,
  connectedAt: null,
  pendingCode: null
};

// Simulated delay helper
const delay = (ms = 120) => new Promise(resolve => setTimeout(resolve, ms));

export const notificationApi = {
  /**
   * Fetch all notifications for the active user
   */
  async getNotifications() {
    await delay();
    try {
      const stored = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  /**
   * Mark a specific notification as read
   */
  async markAsRead(id) {
    await delay();
    const notifications = await this.getNotifications();
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return { success: true, id };
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    await delay();
    const notifications = await this.getNotifications();
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return { success: true, count: updated.length };
  },

  /**
   * Delete a notification
   */
  async deleteNotification(id) {
    await delay();
    const notifications = await this.getNotifications();
    const updated = notifications.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return { success: true, id };
  },

  /**
   * Get user notification preferences
   */
  async getNotificationPreferences() {
    await delay();
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFERENCES);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(DEFAULT_PREFERENCES));
      return DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  },

  /**
   * Update notification preferences
   */
  async updateNotificationPreferences(prefs) {
    await delay();
    // Security alerts cannot be disabled completely for website or email
    const safePrefs = {
      ...prefs,
      securityAlerts: {
        website: true,
        email: true,
        telegram: prefs.securityAlerts?.telegram ?? true
      }
    };
    localStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(safePrefs));
    return { success: true, preferences: safePrefs };
  },

  /**
   * Get current Telegram connection status
   */
  async getTelegramStatus() {
    await delay();
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TELEGRAM);
      if (stored) return JSON.parse(stored);
      return DEFAULT_TELEGRAM_STATUS;
    } catch {
      return DEFAULT_TELEGRAM_STATUS;
    }
  },

  /**
   * Generate temporary Telegram connection code or deep-link
   */
  async generateTelegramCode() {
    await delay();
    const randomCode = `SS_CONNECT_${Math.floor(100000 + Math.random() * 900000)}`;
    const status = await this.getTelegramStatus();
    const updated = {
      ...status,
      pendingCode: randomCode,
      botUsername: 'StudentSphereBot',
      deepLink: `https://t.me/StudentSphereBot?start=${randomCode}`
    };
    localStorage.setItem(STORAGE_KEY_TELEGRAM, JSON.stringify(updated));
    return updated;
  },

  /**
   * Connect Telegram using connection code
   */
  async connectTelegram(code, mockUsername = '@karan_tech') {
    await delay(300);
    const updated = {
      isConnected: true,
      username: mockUsername.startsWith('@') ? mockUsername : `@${mockUsername}`,
      chatId: '839210492',
      connectedAt: new Date().toISOString(),
      pendingCode: null
    };
    localStorage.setItem(STORAGE_KEY_TELEGRAM, JSON.stringify(updated));
    return { success: true, telegram: updated };
  },

  /**
   * Disconnect Telegram
   */
  async disconnectTelegram() {
    await delay();
    localStorage.setItem(STORAGE_KEY_TELEGRAM, JSON.stringify(DEFAULT_TELEGRAM_STATUS));
    return { success: true };
  },

  /**
   * Abstraction for sending email notifications through Backend Resend Service
   * (Frontend only calls backend API; never imports Resend directly)
   */
  async sendEmailNotification({ to, _subject, _templateId, _templateData }) {
    await delay();
    // In production, this issues POST /api/notifications/email to backend server
    return {
      success: true,
      provider: 'Backend -> Resend Transactional Email',
      recipient: to,
      messageId: `msg_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString()
    };
  }
};

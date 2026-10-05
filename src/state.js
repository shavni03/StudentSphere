import { notificationApi, DEFAULT_PREFERENCES, DEFAULT_TELEGRAM_STATUS } from './api/notificationApi.js';

class StateStore {
  constructor() {
    this.listeners = new Set();
    this.notifications = [];
    this.preferences = DEFAULT_PREFERENCES;
    this.telegram = DEFAULT_TELEGRAM_STATUS;
    this.isDropdownOpen = false;
    this.isUserMenuOpen = false;

    const savedUser = localStorage.getItem('studentsphere_user');
    this.currentUser = savedUser ? JSON.parse(savedUser) : {
      id: 'usr-001',
      name: 'Karan Kumar',
      email: 'karan@studentsphere.edu',
      role: 'student', // 'student' | 'admin'
      branch: 'CSE',
      semester: '5',
      university: 'Delhi Technological University',
      credits: 350,
      isEmailVerified: true
    };

    // Theme state (dark | light)
    const savedTheme = localStorage.getItem('studentsphere_theme') || 'dark';
    this.theme = savedTheme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Saved jobs
    const savedJobs = localStorage.getItem('studentsphere_saved_jobs');
    this.savedJobIds = savedJobs ? JSON.parse(savedJobs) : ['job-1'];

    this.init();
  }

  async init() {
    try {
      const [notifs, prefs, tg] = await Promise.all([
        notificationApi.getNotifications(),
        notificationApi.getNotificationPreferences(),
        notificationApi.getTelegramStatus()
      ]);
      this.notifications = notifs;
      this.preferences = prefs;
      this.telegram = tg;
      this.notify();
    } catch (err) {
      console.error('Error initializing state store:', err);
    }
  }

  get unreadCount() {
    return this.notifications.filter(n => !n.isRead).length;
  }

  get isAdmin() {
    return this.currentUser.role === 'admin';
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    }
  }

  switchRole(newRole) {
    this.currentUser.role = newRole;
    localStorage.setItem('studentsphere_user', JSON.stringify(this.currentUser));
    this.notify();
  }

  async markAsRead(id) {
    await notificationApi.markAsRead(id);
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    this.notify();
  }

  async markAllAsRead() {
    await notificationApi.markAllAsRead();
    this.notifications = this.notifications.map(n => ({ ...n, isRead: true }));
    this.notify();
  }

  async deleteNotification(id) {
    await notificationApi.deleteNotification(id);
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notify();
  }

  async updatePreferences(newPrefs) {
    const res = await notificationApi.updateNotificationPreferences(newPrefs);
    if (res.success) {
      this.preferences = res.preferences;
      this.notify();
    }
    return res;
  }

  async generateTelegramCode() {
    const tg = await notificationApi.generateTelegramCode();
    this.telegram = tg;
    this.notify();
    return tg;
  }

  async connectTelegram(code, username) {
    const res = await notificationApi.connectTelegram(code, username);
    if (res.success) {
      this.telegram = res.telegram;
      this.notify();
    }
    return res;
  }

  async disconnectTelegram() {
    await notificationApi.disconnectTelegram();
    this.telegram = DEFAULT_TELEGRAM_STATUS;
    this.notify();
  }

  toggleSaveJob(id) {
    if (this.savedJobIds.includes(id)) {
      this.savedJobIds = this.savedJobIds.filter(x => x !== id);
    } else {
      this.savedJobIds.push(id);
    }
    localStorage.setItem('studentsphere_saved_jobs', JSON.stringify(this.savedJobIds));
    this.notify();
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('studentsphere_theme', this.theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
    this.notify();
  }

  setDropdownOpen(open) {
    this.isDropdownOpen = open;
    this.notify();
  }

  setUserMenuOpen(open) {
    this.isUserMenuOpen = open;
    this.notify();
  }
}

export const appState = new StateStore();

import { notificationApi, DEFAULT_PREFERENCES, DEFAULT_TELEGRAM_STATUS } from './api/notificationApi.js';

const DEFAULT_UNIVERSITIES = [
  'Graphic Era (Deemed to be University) - GEU Dehradun',
  'Graphic Era Hill University (GEHU Dehradun)',
  'Graphic Era Hill University (GEHU Bhimtal)',
  'Graphic Era Hill University (GEHU Haldwani)'
];

const DEFAULT_BRANCHES = [
  'CSE',
  'CSE (AI & ML)',
  'CSE (Data Science)',
  'CSE (Cyber Security)',
  'IT',
  'AIDS',
  'ECE',
  'EE',
  'ME',
  'Civil',
  'Biotechnology',
  'MCA',
  'BCA',
  'MBA',
  'BBA'
];
const DEFAULT_SEMESTERS = ['1', '2', '3', '4', '5', '6', '7', '8'];

class StateStore {
  constructor() {
    this.listeners = new Set();
    this.notifications = [];
    this.preferences = DEFAULT_PREFERENCES;
    this.telegram = DEFAULT_TELEGRAM_STATUS;
    this.isDropdownOpen = false;
    this.isUserMenuOpen = false;
    this.isAuthInitialized = false;

    // Do NOT assume user is logged in until Firebase confirms auth state
    this.currentUser = null;

    // Graphic Era Universities, Branches & Semesters management (Admin-configurable)
    let savedUniversities = null;
    let savedBranches = null;
    let savedSemesters = null;
    if (typeof localStorage !== 'undefined') {
      try {
        const u = localStorage.getItem('studentsphere_universities');
        if (u) savedUniversities = JSON.parse(u);
        const b = localStorage.getItem('studentsphere_branches');
        if (b) savedBranches = JSON.parse(b);
        const s = localStorage.getItem('studentsphere_semesters');
        if (s) savedSemesters = JSON.parse(s);
      } catch {
        // use defaults
      }
    }
    this.universities = Array.isArray(savedUniversities) && savedUniversities.length ? savedUniversities : [...DEFAULT_UNIVERSITIES];
    this.branches = Array.isArray(savedBranches) && savedBranches.length ? savedBranches : [...DEFAULT_BRANCHES];
    this.semesters = Array.isArray(savedSemesters) && savedSemesters.length ? savedSemesters : [...DEFAULT_SEMESTERS];

    // Theme state (dark | light)
    const savedTheme = typeof localStorage !== 'undefined' ? (localStorage.getItem('studentsphere_theme') || 'dark') : 'dark';
    this.theme = savedTheme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Saved jobs
    const savedJobs = typeof localStorage !== 'undefined' ? localStorage.getItem('studentsphere_saved_jobs') : null;
    this.savedJobIds = savedJobs ? JSON.parse(savedJobs) : [];

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
    if (!this.currentUser) return 0;
    return this.notifications.filter(n => !n.isRead).length;
  }

  get isAdmin() {
    return Boolean(this.currentUser && this.currentUser.role === 'admin');
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

  // University / Campus management
  addUniversity(uni) {
    const trimmed = (uni || '').trim();
    if (trimmed && !this.universities.includes(trimmed)) {
      this.universities.push(trimmed);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('studentsphere_universities', JSON.stringify(this.universities));
      }
      this.notify();
    }
  }

  removeUniversity(uni) {
    this.universities = this.universities.filter(u => u !== uni);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('studentsphere_universities', JSON.stringify(this.universities));
    }
    this.notify();
  }

  // Branch management
  addBranch(branch) {
    const trimmed = (branch || '').trim();
    if (trimmed && !this.branches.includes(trimmed)) {
      this.branches.push(trimmed);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('studentsphere_branches', JSON.stringify(this.branches));
      }
      this.notify();
    }
  }

  removeBranch(branch) {
    this.branches = this.branches.filter(b => b !== branch);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('studentsphere_branches', JSON.stringify(this.branches));
    }
    this.notify();
  }

  // Semester management
  addSemester(sem) {
    const trimmed = (sem || '').trim();
    if (trimmed && !this.semesters.includes(trimmed)) {
      this.semesters.push(trimmed);
      this.semesters.sort((a, b) => Number(a) - Number(b));
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('studentsphere_semesters', JSON.stringify(this.semesters));
      }
      this.notify();
    }
  }

  removeSemester(sem) {
    this.semesters = this.semesters.filter(s => s !== sem);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('studentsphere_semesters', JSON.stringify(this.semesters));
    }
    this.notify();
  }

  switchRole(newRole) {
    if (!this.currentUser) return;
    this.currentUser.role = newRole;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('studentsphere_auth_user', JSON.stringify(this.currentUser));
    }
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
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('studentsphere_saved_jobs', JSON.stringify(this.savedJobIds));
    }
    this.notify();
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('studentsphere_theme', this.theme);
    }
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

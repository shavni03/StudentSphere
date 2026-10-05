/**
 * StudentSphere Admin Notification API Abstraction Layer
 * 
 * Provides methods for admins to create announcements, target specific audiences,
 * broadcast across Website, Email, and Telegram channels, view delivery analytics,
 * and retry failed messages.
 */

const STORAGE_KEY_ADMIN_NOTIFICATIONS = 'studentsphere_admin_notifications';

export const INITIAL_ADMIN_NOTIFICATIONS = [
  {
    id: 'adm-notif-101',
    title: 'Mid-Term 2026 Examination Schedule Released',
    message: 'Official time-table for Semester 2, 4, 6, and 8 has been published by the academic cell.',
    priority: 'Urgent',
    audience: {
      type: 'All users',
      branch: 'All',
      semester: 'All',
      role: 'Student'
    },
    channels: ['Website', 'Email', 'Telegram'],
    status: 'Delivered',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    scheduledFor: null,
    delivery: {
      totalRecipients: 4200,
      delivered: 4180,
      failed: 20,
      channelBreakdown: {
        website: 4200,
        email: 4165,
        telegram: 3820
      }
    }
  },
  {
    id: 'adm-notif-102',
    title: 'Special Placement Drive: TCS Digital & Ninja 2027',
    message: 'Registration is mandatory for all Final and Pre-Final year students before Oct 20.',
    priority: 'Important',
    audience: {
      type: 'Specific semester',
      branch: 'CSE, ECE, IT',
      semester: 'Sem 7',
      role: 'Student'
    },
    channels: ['Website', 'Email', 'Telegram'],
    status: 'Delivered',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    scheduledFor: null,
    delivery: {
      totalRecipients: 850,
      delivered: 846,
      failed: 4,
      channelBreakdown: {
        website: 850,
        email: 848,
        telegram: 812
      }
    }
  },
  {
    id: 'adm-notif-103',
    title: 'Scheduled System Maintenance Notification',
    message: 'StudentSphere file storage and note preview servers will undergo maintenance on Sunday 2:00 AM - 4:00 AM IST.',
    priority: 'Normal',
    audience: {
      type: 'All users',
      branch: 'All',
      semester: 'All',
      role: 'All'
    },
    channels: ['Website', 'Telegram'],
    status: 'Scheduled',
    createdAt: new Date().toISOString(),
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    delivery: {
      totalRecipients: 4800,
      delivered: 0,
      failed: 0,
      channelBreakdown: {
        website: 0,
        email: 0,
        telegram: 0
      }
    }
  },
  {
    id: 'adm-notif-104',
    title: 'Urgent: Verify Profile Details for Campus Placement Pass',
    message: '15 students have unverified academic credentials. Please complete KYC in the portal immediately.',
    priority: 'Urgent',
    audience: {
      type: 'Specific users',
      branch: 'CSE',
      semester: 'Sem 7',
      role: 'Student'
    },
    channels: ['Email', 'Telegram'],
    status: 'Failed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    scheduledFor: null,
    failureReason: 'Telegram connection timeout on 3 endpoints',
    delivery: {
      totalRecipients: 15,
      delivered: 12,
      failed: 3,
      channelBreakdown: {
        website: 0,
        email: 15,
        telegram: 12
      }
    }
  }
];

const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const adminNotificationApi = {
  /**
   * Get list of admin broadcasts with optional filtering
   */
  async getAdminNotifications(params = {}) {
    await delay();
    try {
      let list = [];
      const stored = localStorage.getItem(STORAGE_KEY_ADMIN_NOTIFICATIONS);
      if (stored) {
        list = JSON.parse(stored);
      } else {
        list = INITIAL_ADMIN_NOTIFICATIONS;
        localStorage.setItem(STORAGE_KEY_ADMIN_NOTIFICATIONS, JSON.stringify(list));
      }

      // Filter by search query
      if (params.q) {
        const query = params.q.toLowerCase();
        list = list.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.message.toLowerCase().includes(query)
        );
      }

      // Filter by status
      if (params.status && params.status !== 'All') {
        list = list.filter(item => item.status.toLowerCase() === params.status.toLowerCase());
      }

      // Filter by priority
      if (params.priority && params.priority !== 'All') {
        list = list.filter(item => item.priority.toLowerCase() === params.priority.toLowerCase());
      }

      // Filter by channel
      if (params.channel && params.channel !== 'All') {
        list = list.filter(item => item.channels.includes(params.channel));
      }

      return list;
    } catch {
      return INITIAL_ADMIN_NOTIFICATIONS;
    }
  },

  /**
   * Create and immediately broadcast an announcement
   */
  async createAnnouncement(data) {
    await delay(300);
    const notifications = await this.getAdminNotifications();
    const newEntry = {
      id: `adm-notif-${Date.now()}`,
      title: data.title,
      message: data.message,
      priority: data.priority || 'Normal',
      audience: data.audience || { type: 'All users' },
      channels: data.channels || ['Website'],
      status: 'Delivered',
      createdAt: new Date().toISOString(),
      scheduledFor: null,
      delivery: {
        totalRecipients: data.audience?.type === 'All users' ? 4250 : 380,
        delivered: data.audience?.type === 'All users' ? 4242 : 378,
        failed: data.audience?.type === 'All users' ? 8 : 2,
        channelBreakdown: {
          website: data.channels.includes('Website') ? 4200 : 0,
          email: data.channels.includes('Email') ? 4180 : 0,
          telegram: data.channels.includes('Telegram') ? 3750 : 0
        }
      }
    };

    const updated = [newEntry, ...notifications];
    localStorage.setItem(STORAGE_KEY_ADMIN_NOTIFICATIONS, JSON.stringify(updated));
    return { success: true, notification: newEntry };
  },

  /**
   * Schedule an announcement for future dispatch
   */
  async scheduleAnnouncement(data) {
    await delay(300);
    const notifications = await this.getAdminNotifications();
    const newEntry = {
      id: `adm-notif-${Date.now()}`,
      title: data.title,
      message: data.message,
      priority: data.priority || 'Normal',
      audience: data.audience || { type: 'All users' },
      channels: data.channels || ['Website'],
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      scheduledFor: data.scheduledFor,
      delivery: {
        totalRecipients: data.audience?.type === 'All users' ? 4250 : 400,
        delivered: 0,
        failed: 0,
        channelBreakdown: { website: 0, email: 0, telegram: 0 }
      }
    };

    const updated = [newEntry, ...notifications];
    localStorage.setItem(STORAGE_KEY_ADMIN_NOTIFICATIONS, JSON.stringify(updated));
    return { success: true, notification: newEntry };
  },

  /**
   * Get delivery status details for a broadcast
   */
  async getDeliveryStatus(notificationId) {
    await delay();
    const list = await this.getAdminNotifications();
    const found = list.find(item => item.id === notificationId);
    return found ? found.delivery : null;
  },

  /**
   * Retry a failed delivery
   */
  async retryFailedNotification(id) {
    await delay(300);
    const list = await this.getAdminNotifications();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Delivered',
          delivery: {
            ...item.delivery,
            delivered: item.delivery.totalRecipients,
            failed: 0
          },
          failureReason: null
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY_ADMIN_NOTIFICATIONS, JSON.stringify(updated));
    return { success: true, id };
  }
};

import { appState } from '../state.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { renderSearchBar, bindSearchBarEvents } from '../components/common/searchBar.js';

let activeTab = 'All';
let filterReadStatus = 'All';
let searchQuery = '';

function formatTime(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return dateStr;
  }
}

function getTypeIcon(type) {
  switch (type) {
    case 'JOB_ALERT': return createIcon('briefcase', 18, '#38bdf8');
    case 'ACADEMIC': return createIcon('graduationCap', 18, '#818cf8');
    case 'PLACEMENT': return createIcon('star', 18, '#f59e0b');
    case 'INTERVIEW': return createIcon('messageSquare', 18, '#ec4899');
    case 'CREDIT': return createIcon('coins', 18, '#10b981');
    case 'SECURITY': return createIcon('shieldAlert', 18, '#ef4444');
    default: return createIcon('sparkles', 18, '#a855f7');
  }
}

export function renderNotificationsPage() {
  const notifs = appState.notifications;
  const unread = appState.unreadCount;

  // Filter items
  const filtered = notifs.filter(item => {
    if (activeTab === 'Jobs' && item.type !== 'JOB_ALERT') return false;
    if (activeTab === 'Academic' && item.type !== 'ACADEMIC') return false;
    if (activeTab === 'Placement' && item.type !== 'PLACEMENT' && item.type !== 'INTERVIEW') return false;
    if (activeTab === 'System' && !['SYSTEM', 'ANNOUNCEMENT', 'SECURITY', 'CREDIT'].includes(item.type)) return false;

    if (filterReadStatus === 'Unread' && item.isRead) return false;
    if (filterReadStatus === 'Read' && !item.isRead) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.message.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const tabs = [
    { key: 'All', label: 'All', count: notifs.length },
    { key: 'Jobs', label: 'Jobs', count: notifs.filter(n => n.type === 'JOB_ALERT').length },
    { key: 'Academic', label: 'Academic', count: notifs.filter(n => n.type === 'ACADEMIC').length },
    { key: 'Placement', label: 'Placement', count: notifs.filter(n => n.type === 'PLACEMENT' || n.type === 'INTERVIEW').length },
    { key: 'System', label: 'System', count: notifs.filter(n => ['SYSTEM', 'ANNOUNCEMENT', 'SECURITY', 'CREDIT'].includes(n.type)).length }
  ];

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem; max-width: 960px;">
      <!-- Header -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.75rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); display: flex; align-items: center; justify-content: center;">
            ${createIcon('bell', 22, 'var(--primary)')}
          </div>
          <div>
            <h1 style="font-size: 1.85rem; font-weight: 800;">Notification Center</h1>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Multi-channel broadcast alerts, academic approvals, career events, and security notices.
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          ${unread > 0 ? `
            <button id="notif-page-mark-all-read" class="btn btn-secondary btn-sm">
              ${createIcon('checkCheck', 15, 'currentColor')} Mark all read
            </button>
          ` : ''}
          <a href="/settings/notifications" data-link class="btn btn-outline btn-sm">
            ${createIcon('settings', 15, 'currentColor')} Channel Settings
          </a>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs-container" style="margin-bottom: 1.5rem;">
        ${tabs.map(t => `
          <button class="tab-btn notif-tab-btn ${activeTab === t.key ? 'active' : ''}" data-tab="${t.key}">
            ${t.label}
            <span style="font-size: 0.7rem; padding: 0.1rem 0.45rem; border-radius: 999px; background: ${activeTab === t.key ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}; color: ${activeTab === t.key ? '#fff' : 'var(--text-muted)'};">
              ${t.count}
            </span>
          </button>
        `).join('')}
      </div>

      <!-- Controls Bar -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <div style="flex: 1; min-width: 240px;">
          ${renderSearchBar({ value: searchQuery, placeholder: 'Search notifications...', id: 'notif-search-input' })}
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted);">Status:</span>
          ${['All', 'Unread', 'Read'].map(st => `
            <button class="btn btn-sm notif-status-filter-btn ${filterReadStatus === st ? 'btn-primary' : 'btn-ghost'}" data-status="${st}" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">
              ${st}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Notifications List -->
      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        ${filtered.length === 0 ? `
          <div class="card" style="text-align: center; padding: 3.5rem 1rem;">
            <div style="margin-bottom: 1rem; opacity: 0.4;">${createIcon('bell', 44, 'var(--text-muted)')}</div>
            <h3 style="font-size: 1.15rem; color: #fff;">No notifications found</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
              You have no alerts matching the selected tab and filters.
            </p>
          </div>
        ` : filtered.map(item => `
          <div 
            class="card" 
            style="padding: 1.25rem; background: ${item.isRead ? 'var(--bg-card)' : 'rgba(99, 102, 241, 0.08)'}; border-left: ${item.isRead ? '1px solid var(--border-subtle)' : '4px solid var(--primary)'};"
          >
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${getTypeIcon(item.type)}
              </div>

              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.35rem;">
                  <div style="display: flex; align-items: center; gap: 0.65rem;">
                    <h4 style="font-size: 0.975rem; font-weight: ${item.isRead ? '600' : '700'}; color: ${item.isRead ? 'var(--text-primary)' : '#fff'};">
                      ${item.title}
                    </h4>
                    <span class="badge ${item.priority === 'Urgent' ? 'badge-danger' : item.priority === 'Important' ? 'badge-warning' : 'badge-secondary'}">
                      ${item.priority}
                    </span>
                  </div>
                  <span style="font-size: 0.75rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.25rem;">
                    ${createIcon('clock', 12, 'currentColor')} ${formatTime(item.createdAt)}
                  </span>
                </div>

                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
                  ${item.message}
                </p>

                <!-- Metadata Pills -->
                ${item.metadata ? `
                  <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 0.75rem;">
                    ${Object.entries(item.metadata).map(([k, v]) => `
                      <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; background: rgba(255,255,255,0.05); color: var(--text-muted);">
                        <strong style="color: var(--text-secondary);">${k}:</strong> ${v}
                      </span>
                    `).join('')}
                  </div>
                ` : ''}

                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.65rem;">
                  <div>
                    ${item.actionUrl ? `
                      <a href="${item.actionUrl}" data-link class="btn btn-primary btn-sm notif-view-btn" data-id="${item.id}" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">
                        View Details ${createIcon('externalLink', 12, 'currentColor')}
                      </a>
                    ` : ''}
                  </div>

                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    ${!item.isRead ? `
                      <button class="btn btn-ghost btn-sm notif-item-mark-read" data-id="${item.id}" style="font-size: 0.75rem; color: var(--text-secondary);">
                        ${createIcon('check', 13, '#10b981')} Mark read
                      </button>
                    ` : ''}
                    <button class="btn btn-ghost btn-sm notif-item-delete" data-id="${item.id}" style="font-size: 0.75rem; color: var(--text-dim);">
                      ${createIcon('trash', 13, 'currentColor')} Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function bindNotificationsPageEvents(container) {
  // Tabs
  container.querySelectorAll('.notif-tab-btn').forEach(btn => {
    btn.onclick = () => {
      activeTab = btn.getAttribute('data-tab');
      router.resolve();
    };
  });

  // Read status buttons
  container.querySelectorAll('.notif-status-filter-btn').forEach(btn => {
    btn.onclick = () => {
      filterReadStatus = btn.getAttribute('data-status');
      router.resolve();
    };
  });

  // Search Bar
  bindSearchBarEvents(container, 'notif-search-input', (val) => {
    searchQuery = val;
    router.resolve();
  });

  // Mark all read
  const markAllBtn = container.querySelector('#notif-page-mark-all-read');
  if (markAllBtn) {
    markAllBtn.onclick = () => {
      appState.markAllAsRead();
    };
  }

  // Single mark read
  container.querySelectorAll('.notif-item-mark-read').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      appState.markAsRead(id);
    };
  });

  // View button marks read
  container.querySelectorAll('.notif-view-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      appState.markAsRead(id);
    };
  });

  // Delete
  container.querySelectorAll('.notif-item-delete').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      appState.deleteNotification(id);
    };
  });
}

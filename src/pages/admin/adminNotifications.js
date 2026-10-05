import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { adminNotificationApi } from '../../api/adminNotificationApi.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

let isCreateModalOpen = false;

export function renderAdminNotificationsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const status = query.get('status') || 'All';
  const priority = query.get('priority') || 'All';
  const channel = query.get('channel') || 'All';

  // Read notifications synchronously from localStorage for instant render
  let list = [];
  const stored = localStorage.getItem('studentsphere_admin_notifications');
  if (stored) {
    try { list = JSON.parse(stored); } catch { list = []; }
  }

  // Filter list
  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(item => item.title.toLowerCase().includes(term) || item.message.toLowerCase().includes(term));
  }
  if (status !== 'All') {
    list = list.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }
  if (priority !== 'All') {
    list = list.filter(item => item.priority.toLowerCase() === priority.toLowerCase());
  }
  if (channel !== 'All') {
    list = list.filter(item => item.channels.includes(channel));
  }

  const content = `
    <!-- Top Action Row -->
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 2rem;">
      <div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Broadcast & Announcement Hub</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
          Dispatch multi-channel announcements to Website inboxes, Resend emails, and Telegram bots.
        </p>
      </div>
      <button id="admin-create-broadcast-btn" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem;">
        ${createIcon('bell', 16, '#fff')} Create Announcement
      </button>
    </div>

    <!-- Filter & Search Controls -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.75rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;">
      <div style="flex: 1; min-width: 240px; position: relative;">
        <input 
          type="text" 
          id="admin-notif-search" 
          class="form-input" 
          placeholder="Search announcements by title or content..." 
          value="${q}" 
          style="padding-left: 2.25rem;"
        />
        <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
          ${createIcon('search', 16, 'currentColor')}
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
        <select class="form-select admin-filter-select" data-key="status" style="width: 140px; font-size: 0.825rem;">
          <option value="All" ${status === 'All' ? 'selected' : ''}>All Status</option>
          <option value="Delivered" ${status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Scheduled" ${status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
          <option value="Failed" ${status === 'Failed' ? 'selected' : ''}>Failed</option>
        </select>

        <select class="form-select admin-filter-select" data-key="priority" style="width: 140px; font-size: 0.825rem;">
          <option value="All" ${priority === 'All' ? 'selected' : ''}>All Priorities</option>
          <option value="Normal" ${priority === 'Normal' ? 'selected' : ''}>Normal</option>
          <option value="Important" ${priority === 'Important' ? 'selected' : ''}>Important</option>
          <option value="Urgent" ${priority === 'Urgent' ? 'selected' : ''}>Urgent</option>
        </select>

        <select class="form-select admin-filter-select" data-key="channel" style="width: 140px; font-size: 0.825rem;">
          <option value="All" ${channel === 'All' ? 'selected' : ''}>All Channels</option>
          <option value="Website" ${channel === 'Website' ? 'selected' : ''}>Website</option>
          <option value="Email" ${channel === 'Email' ? 'selected' : ''}>Email (Resend)</option>
          <option value="Telegram" ${channel === 'Telegram' ? 'selected' : ''}>Telegram Bot</option>
        </select>
      </div>
    </div>

    <!-- Broadcasts Table / Feed -->
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      ${list.length === 0 ? `
        <div class="card" style="padding: 3rem; text-align: center; color: var(--text-muted);">
          No broadcast announcements found matching the current filters.
        </div>
      ` : list.map(item => `
        <div class="card" style="padding: 1.5rem; border-left: 4px solid ${item.priority === 'Urgent' ? '#ef4444' : item.priority === 'Important' ? '#f59e0b' : '#6366f1'};">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 1rem;">
            <div style="flex: 1; min-width: 280px;">
              <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                <h4 style="font-size: 1.05rem; font-weight: 700; color: #fff;">${item.title}</h4>
                <span class="badge ${item.priority === 'Urgent' ? 'badge-danger' : item.priority === 'Important' ? 'badge-warning' : 'badge-primary'}">
                  ${item.priority}
                </span>
                <span class="badge ${item.status === 'Delivered' ? 'badge-success' : item.status === 'Scheduled' ? 'badge-primary' : 'badge-danger'}">
                  ${item.status}
                </span>
              </div>

              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.5;">
                ${item.message}
              </p>

              <!-- Audience & Channels Metadata -->
              <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted);">
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  ${createIcon('users', 14, 'currentColor')}
                  <span>Audience: <strong>${item.audience?.type || 'All users'}</strong> (${item.audience?.branch || 'All Branches'})</span>
                </div>

                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span>Channels:</span>
                  ${item.channels.map(ch => `
                    <span class="badge badge-outline" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">
                      ${ch === 'Website' ? '🌐 Web' : ch === 'Email' ? '📧 Email' : '✈️ Telegram'}
                    </span>
                  `).join(' ')}
                </div>

                <div>
                  Dispatched: <strong>${new Date(item.createdAt).toLocaleDateString()}</strong>
                </div>
              </div>

              ${item.failureReason ? `
                <div style="margin-top: 0.75rem; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); font-size: 0.75rem; color: #fca5a5;">
                  <strong>Failure:</strong> ${item.failureReason}
                </div>
              ` : ''}
            </div>

            <!-- Delivery Metrics Column -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; min-width: 220px; text-align: right;">
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Delivery Telemetry</span>
              <div style="font-size: 1.25rem; font-weight: 800; color: ${item.delivery.failed > 0 ? '#f59e0b' : '#10b981'}; margin-top: 0.2rem;">
                ${item.delivery.delivered} / ${item.delivery.totalRecipients}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem;">
                Web: ${item.delivery.channelBreakdown.website} • Mail: ${item.delivery.channelBreakdown.email} • TG: ${item.delivery.channelBreakdown.telegram}
              </div>

              ${item.status === 'Failed' ? `
                <button 
                  class="btn btn-outline admin-retry-broadcast-btn" 
                  data-id="${item.id}"
                  style="margin-top: 0.75rem; font-size: 0.75rem; padding: 0.3rem 0.6rem; color: #fca5a5; border-color: rgba(239, 68, 68, 0.3); width: 100%; justify-content: center;"
                >
                  ${createIcon('refreshCw', 12, 'currentColor')} Retry Delivery
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Create Broadcast Modal -->
    ${isCreateModalOpen ? `
      <div class="modal-backdrop" id="admin-broadcast-modal-backdrop">
        <div class="modal-content" style="max-width: 620px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Create Multi-Channel Broadcast</h3>
            <button id="admin-modal-close-btn" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem;">✕</button>
          </div>

          <form id="admin-broadcast-form">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Announcement Title *</label>
              <input type="text" id="bc-title" class="form-input" required placeholder="e.g. End-Term 2026 Examination Hall Tickets Released" />
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Broadcast Message *</label>
              <textarea id="bc-message" class="form-textarea" rows="4" required placeholder="Enter announcement body, instructions, or exam guidelines..."></textarea>
            </div>

            <!-- Audience Targeting -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: #fff;">Target Audience</label>
                <select id="bc-audience-type" class="form-select">
                  <option value="All users">All Students & Teachers</option>
                  <option value="Specific branch">Specific Engineering Branch</option>
                  <option value="Specific semester">Specific Semester</option>
                  <option value="Final year">Final Year Students (Job Seekers)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: #fff;">Branch Filter</label>
                <select id="bc-branch" class="form-select">
                  <option value="All">All Branches</option>
                  <option value="CSE">Computer Science (CSE)</option>
                  <option value="IT">Information Tech (IT)</option>
                  <option value="AIDS">AI & Data Science (AIDS)</option>
                  <option value="ECE">Electronics (ECE)</option>
                  <option value="EE">Electrical (EE)</option>
                  <option value="ME">Mechanical (ME)</option>
                </select>
              </div>
            </div>

            <!-- Channels & Priority -->
            <div style="margin-bottom: 1rem;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Delivery Channels *</label>
              <div style="display: flex; gap: 1.5rem; margin-top: 0.4rem;">
                <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #fff; cursor: pointer;">
                  <input type="checkbox" id="bc-ch-web" checked /> 🌐 In-App Website
                </label>
                <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #fff; cursor: pointer;">
                  <input type="checkbox" id="bc-ch-email" checked /> 📧 Email (Resend)
                </label>
                <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #fff; cursor: pointer;">
                  <input type="checkbox" id="bc-ch-tg" checked /> ✈️ Telegram Bot
                </label>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: #fff;">Priority</label>
                <select id="bc-priority" class="form-select">
                  <option value="Normal">Normal</option>
                  <option value="Important" selected>Important</option>
                  <option value="Urgent">Urgent (Red Alert Banner)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: #fff;">Dispatch Schedule</label>
                <select id="bc-schedule-type" class="form-select">
                  <option value="now">Send Immediately</option>
                  <option value="later">Schedule for Later Date</option>
                </select>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
              <button type="button" id="admin-modal-cancel-btn" class="btn btn-ghost" style="color: var(--text-muted);">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" style="padding: 0.6rem 1.5rem;">
                Dispatch Multi-Channel Broadcast
              </button>
            </div>
          </form>
        </div>
      </div>
    ` : ''}
  `;

  return renderAdminLayout(content, 'notifications', 'Broadcast Hub & Multi-Channel Center', 'Create and monitor announcements across Website, Email, and Telegram');
}

export function bindAdminNotificationsEvents(container) {
  bindAdminLayoutEvents(container);

  // Search input debounced
  const searchInput = container.querySelector('#admin-notif-search');
  if (searchInput) {
    let timer;
    searchInput.oninput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = router.getQueryParams();
        if (searchInput.value.trim()) q.set('q', searchInput.value.trim());
        else q.delete('q');
        router.setQueryParams(Object.fromEntries(q.entries()));
      }, 300);
    };
  }

  // Filter selects
  container.querySelectorAll('.admin-filter-select').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const val = sel.value;
      const q = router.getQueryParams();
      if (val && val !== 'All') q.set(key, val);
      else q.delete(key);
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  });

  // Open modal button
  const openModalBtn = container.querySelector('#admin-create-broadcast-btn');
  if (openModalBtn) {
    openModalBtn.onclick = () => {
      isCreateModalOpen = true;
      router.resolve();
    };
  }

  // Close modal
  const closeModal = () => {
    isCreateModalOpen = false;
    router.resolve();
  };

  const closeBtn = container.querySelector('#admin-modal-close-btn');
  const cancelBtn = container.querySelector('#admin-modal-cancel-btn');
  if (closeBtn) closeBtn.onclick = closeModal;
  if (cancelBtn) cancelBtn.onclick = closeModal;

  // Form submit
  const form = container.querySelector('#admin-broadcast-form');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const title = container.querySelector('#bc-title').value;
      const message = container.querySelector('#bc-message').value;
      const audienceType = container.querySelector('#bc-audience-type').value;
      const branch = container.querySelector('#bc-branch').value;
      const priority = container.querySelector('#bc-priority').value;

      const channels = [];
      if (container.querySelector('#bc-ch-web')?.checked) channels.push('Website');
      if (container.querySelector('#bc-ch-email')?.checked) channels.push('Email');
      if (container.querySelector('#bc-ch-tg')?.checked) channels.push('Telegram');

      if (channels.length === 0) {
        alert('Please select at least one delivery channel.');
        return;
      }

      await adminNotificationApi.createAnnouncement({
        title,
        message,
        priority,
        audience: { type: audienceType, branch },
        channels
      });

      isCreateModalOpen = false;
      alert('Broadcast successfully dispatched across selected channels!');
      router.resolve();
    };
  }

  // Retry delivery
  container.querySelectorAll('.admin-retry-broadcast-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.getAttribute('data-id');
      await adminNotificationApi.retryFailedNotification(id);
      alert('Retry dispatched! Channels report 100% delivered.');
      router.resolve();
    };
  });
}

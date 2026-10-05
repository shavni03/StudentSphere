import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockNotes, mockReports } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';

export function renderAdminDashboardPage() {
  const pendingNotes = mockNotes.filter(n => n.status === 'Pending').length;
  const pendingReports = mockReports.filter(r => r.status === 'Pending').length;

  const content = `
    <!-- KPI Metrics Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
      <div class="card" style="padding: 1.5rem; border-left: 4px solid #6366f1;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Active Students</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #fff; margin-top: 0.4rem;">42,500</div>
        <span style="font-size: 0.75rem; color: #10b981; margin-top: 0.2rem; display: block;">↑ +1,240 this week</span>
      </div>

      <div class="card" style="padding: 1.5rem; border-left: 4px solid #10b981;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Free Academic Downloads</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #10b981; margin-top: 0.4rem;">148,200+</div>
        <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">100% Free (0 Credits)</span>
      </div>

      <div class="card" style="padding: 1.5rem; border-left: 4px solid #38bdf8;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Telegram Bot Subscribers</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #38bdf8; margin-top: 0.4rem;">3,820</div>
        <span style="font-size: 0.75rem; color: #10b981; margin-top: 0.2rem; display: block;">@StudentSphereBot</span>
      </div>

      <div class="card" style="padding: 1.5rem; border-left: 4px solid #ef4444;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Pending Moderation</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #ef4444; margin-top: 0.4rem;">${pendingNotes + pendingReports + 3} items</div>
        <span style="font-size: 0.75rem; color: #fca5a5; margin-top: 0.2rem; display: block;">Needs admin action</span>
      </div>
    </div>

    <!-- Quick Operations Banner -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 2rem; background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%);">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff;">Admin Command Center</h3>
          <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.2rem;">
            Dispatch multi-channel announcements, approve verified notes, or resolve content flags.
          </p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <a href="/admin/notifications" data-link class="btn btn-primary" style="font-size: 0.85rem;">
            ${createIcon('bell', 16, '#fff')} Create Broadcast
          </a>
          <a href="/admin/reports" data-link class="btn btn-outline" style="font-size: 0.85rem;">
            Review Reports (${pendingReports})
          </a>
        </div>
      </div>
    </div>

    <!-- Two-column Activity & Moderation Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;" class="admin-dashboard-split">
      <!-- Recent Uploads Needing Review -->
      <div class="card" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">Recent Handouts Moderation</h4>
          <a href="/admin/notes" data-link style="font-size: 0.8rem; color: var(--primary);">View all &rarr;</a>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${mockNotes.slice(0, 4).map(note => `
            <div style="padding: 0.75rem; border-radius: var(--radius-sm); background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h5 style="font-size: 0.85rem; font-weight: 600; color: #fff;">${note.title}</h5>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
                  ${note.branch} • Sem ${note.semester} • By ${note.uploader}
                </p>
              </div>
              <span class="badge ${note.status === 'Approved' ? 'badge-success' : 'badge-warning'}">
                ${note.status}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Recent Content Reports -->
      <div class="card" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">Security & Content Reports</h4>
          <a href="/admin/reports" data-link style="font-size: 0.8rem; color: var(--primary);">View all &rarr;</a>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${mockReports.slice(0, 4).map(rep => `
            <div style="padding: 0.75rem; border-radius: var(--radius-sm); background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h5 style="font-size: 0.85rem; font-weight: 600; color: #fff;">${rep.reason}</h5>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
                  Target: ${rep.contentType} • Reported by ${rep.reporter}
                </p>
              </div>
              <span class="badge ${rep.priority === 'High' ? 'badge-danger' : 'badge-warning'}">
                ${rep.priority}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'dashboard', 'System Overview & Moderation Dashboard', 'Real-time telemetry and management controls');
}

export function bindAdminDashboardEvents(container) {
  bindAdminLayoutEvents(container);
}

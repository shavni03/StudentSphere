import { renderAdSlot } from '../ads/adSlot.js';
import { createIcon } from '../../icons.js';

export function renderFooter() {
  return `
    <footer style="border-top: 1px solid var(--border-subtle); background: rgba(11, 15, 25, 0.98); margin-top: auto; padding-top: 2.5rem; padding-bottom: 2rem;">
      <div class="container">
        ${renderAdSlot('footer')}

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 2rem 0;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
              <div style="width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); display: flex; align-items: center; justify-content: center;">
                ${createIcon('graduationCap', 18, '#fff')}
              </div>
              <span style="font-weight: 800; font-size: 1.1rem; color: #fff;">StudentSphere</span>
            </div>
            <p style="font-size: 0.825rem; color: var(--text-muted); line-height: 1.5;">
              Open academic & career platform. 100% free lecture handouts, PYQs with solutions, real interview debriefs, and multi-channel notifications.
            </p>
          </div>

          <div>
            <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; margin-bottom: 0.75rem;">Academic</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.825rem;">
              <li><a href="/notes" data-link style="color: var(--text-secondary);">Lecture Notes Archive</a></li>
              <li><a href="/pyqs" data-link style="color: var(--text-secondary);">Past Examination Papers</a></li>
              <li><a href="/notes/upload" data-link style="color: var(--text-secondary);">Upload Notes (+50 Cr)</a></li>
              <li><a href="/pyqs/upload" data-link style="color: var(--text-secondary);">Upload PYQs (+40 Cr)</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; margin-bottom: 0.75rem;">Career & Jobs</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.825rem;">
              <li><a href="/jobs" data-link style="color: var(--text-secondary);">Job & Internship Radar</a></li>
              <li><a href="/interviews" data-link style="color: var(--text-secondary);">Interview Debriefs</a></li>
              <li><a href="/companies" data-link style="color: var(--text-secondary);">Companies Directory</a></li>
              <li><a href="/placements" data-link style="color: var(--text-secondary);">Placement Statistics</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; margin-bottom: 0.75rem;">Notifications</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.825rem;">
              <li><a href="/notifications" data-link style="color: var(--text-secondary);">In-App Notification Center</a></li>
              <li><a href="/settings/notifications" data-link style="color: var(--text-secondary);">Telegram Bot Connection</a></li>
              <li><a href="/settings/notifications" data-link style="color: var(--text-secondary);">Email Preferences (Resend)</a></li>
              <li><a href="/admin/notifications" data-link style="color: var(--text-secondary);">Admin Broadcast Hub</a></li>
            </ul>
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.25rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; font-size: 0.75rem; color: var(--text-muted);">
          <div>
            © ${new Date().getFullYear()} StudentSphere. All academic downloads are 100% free forever (0 Credits).
          </div>
          <div style="display: flex; gap: 1.25rem;">
            <a href="/about" data-link style="color: var(--text-muted);">About</a>
            <a href="/features" data-link style="color: var(--text-muted);">Features</a>
            <a href="/settings" data-link style="color: var(--text-muted);">Settings</a>
            <a href="/admin" data-link style="color: var(--text-muted);">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

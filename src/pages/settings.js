import { appState } from '../state.js';
import { createIcon } from '../icons.js';

export function renderSettingsPage() {
  const user = appState.currentUser;

  return `
    <div class="container" style="padding: 2rem 1rem 4rem; max-width: 800px;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;">
          Account & Platform Settings
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Configure security, preferences, and multi-channel notification integrations.
        </p>
      </div>

      <!-- Quick Nav for Settings -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem;">
        <button class="btn btn-primary" style="font-size: 0.85rem;">General & Security</button>
        <a href="/settings/notifications" data-link class="btn btn-outline" style="font-size: 0.85rem;">
          ${createIcon('bell', 16, 'currentColor')} Multi-Channel Notifications
        </a>
      </div>

      <!-- Security Settings -->
      <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">
          Account Security & Authentication
        </h3>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; color: #fff;">Institutional Email</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">${user.email}</p>
            </div>
            <span class="badge badge-success">Verified</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; color: #fff;">Change Password</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Ensure your account uses a strong, random password</p>
            </div>
            <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;" onclick="alert('Password reset link sent to registered email!')">
              Update Password
            </button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; color: #fff;">Two-Factor Authentication (2FA)</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Require OTP verification via authenticator app</p>
            </div>
            <span class="badge badge-primary">Enabled</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; color: #fff;">Active Sessions</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Current browser session in Delhi, India • Chrome on macOS</p>
            </div>
            <button class="btn btn-outline" style="font-size: 0.8rem; color: #fca5a5; border-color: rgba(239, 68, 68, 0.3);" onclick="alert('All other remote sessions logged out.')">
              Revoke Others
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Link to Notification Preferences -->
      <div class="card" style="padding: 1.5rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1px solid rgba(99, 102, 241, 0.25);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: #fff;">Telegram Bot & Email Alerts</h4>
            <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.25rem;">
              Connect your Telegram username via pairing code and configure Resend transactional email topics.
            </p>
          </div>
          <a href="/settings/notifications" data-link class="btn btn-primary" style="font-size: 0.85rem;">
            Configure Alerts &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}

export function bindSettingsEvents() {}

import { appState } from '../state.js';
import { createIcon } from '../icons.js';
import { sendPasswordReset, deleteAccount } from '../auth.js';

export function renderSettingsPage() {
  const user = appState.currentUser || { email: 'student@university.edu', name: 'Student' };

  return `
    <div class="container" style="padding: 2rem 1rem 4rem; max-width: 800px;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">
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
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">
          Account Security & Authentication
        </h3>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">Institutional Email</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">${user.email}</p>
            </div>
            <span class="badge ${user.isEmailVerified ? 'badge-success' : 'badge-warning'}">
              ${user.isEmailVerified ? '✓ Verified' : '⚠️ Unverified'}
            </span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">Password Reset & Security</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Receive a secure Firebase recovery link in your mailbox</p>
            </div>
            <button id="btn-send-pwd-reset" class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">
              Send Reset Link
            </button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">Active Sessions</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Authenticated via Firebase Auth SDK • Secure Client Session</p>
            </div>
            <span class="badge badge-primary">Active</span>
          </div>
        </div>
      </div>

      <!-- Quick Link to Notification Preferences -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 2rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1px solid rgba(99, 102, 241, 0.25);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
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

      <!-- Danger Zone: Delete Account -->
      <div class="card" style="padding: 2rem; border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.04);">
        <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.75rem;">
          ${createIcon('userX', 24, '#ef4444')}
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #ef4444; margin: 0;">
            Danger Zone — Delete Account
          </h3>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          Permanently delete your StudentSphere account, login credentials, and user data from Firebase. This action is <strong>irreversible</strong> and will revoke access to all protected academic resources.
        </p>

        <div id="delete-account-feedback" style="display: none; padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.85rem; margin-bottom: 1.25rem;"></div>

        <button 
          id="btn-delete-account" 
          type="button" 
          class="btn" 
          style="background: #ef4444; color: #fff; font-weight: 700; font-size: 0.9rem; border: none; padding: 0.65rem 1.4rem; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; border-radius: var(--radius-md);"
        >
          ${createIcon('trash', 16, '#fff')} Permanently Delete My Account
        </button>
      </div>
    </div>
  `;
}

export function bindSettingsEvents(container) {
  const user = appState.currentUser;

  // Password reset button
  const pwdBtn = container.querySelector('#btn-send-pwd-reset');
  if (pwdBtn && user?.email) {
    pwdBtn.onclick = async () => {
      try {
        pwdBtn.disabled = true;
        pwdBtn.textContent = 'Sending link...';
        await sendPasswordReset(user.email);
        alert(`Password reset link sent to ${user.email}. Please check your inbox and Spam/Junk folder.`);
      } catch (err) {
        alert(err.message || 'Failed to send password reset email.');
      } finally {
        pwdBtn.disabled = false;
        pwdBtn.textContent = 'Send Reset Link';
      }
    };
  }

  // Delete account button
  const deleteBtn = container.querySelector('#btn-delete-account');
  const feedbackBox = container.querySelector('#delete-account-feedback');
  if (deleteBtn) {
    deleteBtn.onclick = async () => {
      const confirmInput = prompt('⚠️ WARNING: Deleting your account cannot be undone.\n\nType "DELETE" below to confirm:');
      if (confirmInput === 'DELETE') {
        try {
          deleteBtn.disabled = true;
          deleteBtn.textContent = 'Deleting Account...';
          await deleteAccount();
          alert('Your StudentSphere account has been successfully and permanently deleted.');
        } catch (err) {
          deleteBtn.disabled = false;
          deleteBtn.textContent = 'Permanently Delete My Account';
          if (feedbackBox) {
            feedbackBox.style.display = 'block';
            feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
            feedbackBox.style.color = '#ef4444';
            feedbackBox.textContent = err.message || 'Failed to delete account. Please try again.';
          } else {
            alert(err.message || 'Failed to delete account.');
          }
        }
      } else if (confirmInput !== null) {
        alert('Account deletion cancelled (confirmation did not match "DELETE").');
      }
    };
  }
}

import { appState } from '../../state.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';
import { getCurrentUser, isEmailVerified, reloadCurrentUser, sendVerificationEmail, logout } from '../../auth.js';

let statusMessage = '';
let statusType = ''; // 'info' | 'error' | 'success'
let isChecking = false;
let isResending = false;

export function renderVerifyEmailPage() {
  const user = getCurrentUser() || appState.currentUser || { email: 'your-email@university.edu' };
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || '/dashboard';

  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 480px; padding: 2.5rem; text-align: center; background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(99, 102, 241, 0.15); margin: 0 auto 1.25rem; display: flex; align-items: center; justify-content: center;">
          ${createIcon('mail', 30, '#6366f1')}
        </div>

        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
          Please verify your email address
        </h1>

        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0.5rem auto 1.5rem; line-height: 1.6;">
          A verification link has been sent to:<br/>
          <strong style="color: var(--text-primary); font-size: 0.95rem; word-break: break-all;">${user.email}</strong>
        </p>

        <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.5;">
          Please open your email client, click the confirmation link in the email from Firebase / StudentSphere, and then click below to continue.
        </p>

        <!-- Spam / Junk Folder Advisory -->
        <div style="padding: 0.85rem 1rem; border-radius: var(--radius-md); background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); color: #f59e0b; font-size: 0.85rem; margin-bottom: 1.5rem; text-align: left; line-height: 1.5;">
          <strong>💡 Note:</strong> If you don't see the confirmation email in your primary inbox, please make sure to check your <strong>Spam</strong> or <strong>Junk</strong> folder.
        </div>

        ${statusMessage ? `
          <div style="padding: 0.85rem 1rem; border-radius: var(--radius-md); font-size: 0.875rem; margin-bottom: 1.5rem; text-align: left; ${
            statusType === 'error'
              ? 'background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444;'
              : statusType === 'success'
              ? 'background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981;'
              : 'background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--primary);'
          }">
            ${statusMessage}
          </div>
        ` : ''}

        <!-- 3 Required Actions -->
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <button 
            type="button" 
            id="btn-verified-check" 
            class="btn btn-primary" 
            style="width: 100%; padding: 0.8rem; font-weight: 700; font-size: 0.95rem; justify-content: center;"
            ${isChecking ? 'disabled' : ''}
          >
            ${isChecking ? 'Checking status...' : 'I Have Verified'}
          </button>

          <button 
            type="button" 
            id="btn-resend-verification" 
            class="btn btn-outline" 
            style="width: 100%; padding: 0.75rem; font-weight: 600; font-size: 0.9rem; justify-content: center;"
            ${isResending ? 'disabled' : ''}
          >
            ${isResending ? 'Sending email...' : 'Resend Verification Email'}
          </button>

          <button 
            type="button" 
            id="btn-verify-logout" 
            class="btn btn-ghost" 
            style="width: 100%; padding: 0.6rem; font-size: 0.85rem; color: var(--text-muted); justify-content: center;"
          >
            Logout
          </button>
        </div>

        <input type="hidden" id="redirect-target-input" value="${redirectTarget}" />
      </div>
    </div>
  `;
}

export function bindVerifyEmailEvents(container) {
  const verifiedBtn = container.querySelector('#btn-verified-check');
  const resendBtn = container.querySelector('#btn-resend-verification');
  const logoutBtn = container.querySelector('#btn-verify-logout');
  const redirectInput = container.querySelector('#redirect-target-input');
  const redirectTarget = redirectInput?.value || '/dashboard';

  if (verifiedBtn) {
    verifiedBtn.onclick = async () => {
      isChecking = true;
      statusMessage = '';
      router.resolve();

      try {
        await reloadCurrentUser();

        if (isEmailVerified()) {
          statusMessage = 'Email verified successfully! Redirecting...';
          statusType = 'success';
          isChecking = false;
          router.resolve();
          setTimeout(() => {
            router.navigate(redirectTarget);
          }, 600);
        } else {
          statusMessage = 'Your email is not verified yet. Please check your inbox and click the verification link.';
          statusType = 'error';
          isChecking = false;
          router.resolve();
        }
      } catch (err) {
        statusMessage = err.message || 'Unable to check verification status. Please try again.';
        statusType = 'error';
        isChecking = false;
        router.resolve();
      }
    };
  }

  if (resendBtn) {
    resendBtn.onclick = async () => {
      isResending = true;
      statusMessage = '';
      router.resolve();

      try {
        const res = await sendVerificationEmail();
        statusMessage = res?.message || 'Verification email has been sent. Please check your inbox.';
        statusType = 'info';
      } catch (err) {
        statusMessage = err.message || 'Failed to resend verification email.';
        statusType = 'error';
      } finally {
        isResending = false;
        router.resolve();
      }
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = async () => {
      await logout();
    };
  }
}

import { appState } from '../../state.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';
import { getCurrentAuthUser, confirmEmailVerification, resendVerificationEmail } from '../../auth.js';

export function renderVerifyEmailPage() {
  const user = getCurrentAuthUser() || appState.currentUser || { email: 'student@university.edu' };

  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 480px; padding: 2.5rem; text-align: center; background: rgba(17, 24, 39, 0.95); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); margin: 0 auto 1.25rem; display: flex; align-items: center; justify-content: center;">
          ${createIcon('mail', 28, '#10b981')}
        </div>

        <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff;">Verify Your Institutional Email</h2>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0.75rem auto 1.5rem; line-height: 1.5;">
          A verification link / OTP code has been dispatched to <br/><strong style="color: #fff;">${user.email}</strong>.
        </p>

        <form id="verify-email-form" style="max-width: 320px; margin: 0 auto;">
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem; display: block;">Enter Confirmation Code</label>
            <input type="text" class="form-input" id="otp-input" maxlength="6" value="729104" style="text-align: center; font-size: 1.4rem; letter-spacing: 0.3em; font-family: monospace; font-weight: 700;" />
          </div>

          <button type="submit" id="verify-submit-btn" class="btn btn-primary" style="width: 100%; padding: 0.75rem; font-weight: 700; justify-content: center;">
            Confirm Email & Proceed
          </button>
        </form>

        <p style="margin-top: 1.5rem; font-size: 0.8rem; color: var(--text-muted);">
          Didn't receive email? <button id="resend-code-btn" type="button" style="background: none; border: none; color: var(--primary); font-weight: 600; cursor: pointer; padding: 0;">Resend Link / Code</button>
        </p>
      </div>
    </div>
  `;
}

export function bindVerifyEmailEvents(container) {
  const form = container.querySelector('#verify-email-form');
  const resendBtn = container.querySelector('#resend-code-btn');

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      confirmEmailVerification();
      alert('Email verified successfully! Welcome to StudentSphere.');
      router.navigate('/dashboard');
    };
  }

  if (resendBtn) {
    resendBtn.onclick = async () => {
      resendBtn.disabled = true;
      resendBtn.textContent = 'Sending...';
      try {
        const res = await resendVerificationEmail();
        alert(res?.message || 'Verification message resent!');
      } catch (err) {
        alert(err.message || 'Failed to resend verification.');
      } finally {
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend Link / Code';
      }
    };
  }
}

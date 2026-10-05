import { createIcon } from '../../icons.js';
import { router } from '../../router.js';
import { resetPassword } from '../../auth.js';

export function renderForgotPasswordPage() {
  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 2.5rem; background: rgba(17, 24, 39, 0.95); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(99, 102, 241, 0.15); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('key', 24, '#818cf8')}
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff;">Reset Password</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            Enter your email to receive a secure recovery link
          </p>
        </div>

        <form id="forgot-form">
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 600; color: #fff;">Email Address</label>
            <input type="email" class="form-input" id="forgot-email" required placeholder="karan@university.edu" />
          </div>

          <button type="submit" id="forgot-submit-btn" class="btn btn-primary" style="width: 100%; padding: 0.75rem; font-weight: 700; justify-content: center;">
            Send Recovery Link
          </button>
        </form>

        <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem;">
          <a href="/login" data-link style="color: var(--text-muted);">&larr; Back to Sign In</a>
        </div>
      </div>
    </div>
  `;
}

export function bindForgotPasswordEvents(container) {
  const form = container.querySelector('#forgot-form');
  const submitBtn = container.querySelector('#forgot-submit-btn');

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = container.querySelector('#forgot-email')?.value.trim();
      if (!email) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      try {
        const res = await resetPassword(email);
        alert(res?.message || 'Password reset link sent to your email.');
        router.navigate('/login');
      } catch (err) {
        alert(err.message || 'Failed to send reset link.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Recovery Link';
        }
      }
    };
  }
}

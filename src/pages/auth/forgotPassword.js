import { createIcon } from '../../icons.js';
import { sendPasswordReset } from '../../auth.js';
import { router } from '../../router.js';

let statusMsg = '';
let statusType = '';
let isSubmitting = false;

export function renderForgotPasswordPage() {
  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 2.5rem; background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(99, 102, 241, 0.15); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('key', 24, '#6366f1')}
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Reset Password</h1>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            Enter your registered email to receive Firebase recovery instructions
          </p>
        </div>

        ${statusMsg ? `
          <div style="padding: 0.85rem 1rem; border-radius: var(--radius-md); font-size: 0.875rem; margin-bottom: 1.25rem; ${
            statusType === 'error'
              ? 'background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444;'
              : 'background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981;'
          }">
            ${statusMsg}
          </div>
        ` : ''}

        <form id="forgot-form" novalidate>
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label for="forgot-email" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Email Address
            </label>
            <input 
              type="email" 
              class="form-input" 
              id="forgot-email" 
              required 
              placeholder="student@university.edu" 
              style="width: 100%;" 
            />
          </div>

          <button 
            type="submit" 
            id="forgot-submit-btn" 
            class="btn btn-primary" 
            style="width: 100%; padding: 0.8rem; font-size: 0.95rem; font-weight: 700; justify-content: center;"
            ${isSubmitting ? 'disabled' : ''}
          >
            ${isSubmitting ? 'Sending link...' : 'Send Recovery Link'}
          </button>
        </form>

        <div style="margin-top: 1.75rem; text-align: center; font-size: 0.85rem;">
          <a href="/login" data-link style="color: var(--primary); text-decoration: none; font-weight: 600;">
            &larr; Back to Sign In
          </a>
        </div>
      </div>
    </div>
  `;
}

export function bindForgotPasswordEvents(container) {
  const form = container.querySelector('#forgot-form');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = container.querySelector('#forgot-email')?.value.trim();
      if (!email) {
        statusMsg = 'Please enter your registered email address.';
        statusType = 'error';
        router.resolve();
        return;
      }

      isSubmitting = true;
      statusMsg = '';
      router.resolve();

      try {
        const res = await sendPasswordReset(email);
        statusMsg = res.message || 'Password reset link sent to your email. Please check your inbox.';
        statusType = 'success';
        isSubmitting = false;
        router.resolve();
      } catch (err) {
        statusMsg = err.message || 'Failed to send reset link. Please verify the email address.';
        statusType = 'error';
        isSubmitting = false;
        router.resolve();
      }
    };
  }
}

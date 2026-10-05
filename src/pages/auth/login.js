import { loginUser } from '../../auth.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

let errorMessage = '';
let isLoading = false;

export function renderLoginPage() {
  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 2.5rem; background: rgba(17, 24, 39, 0.95); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('graduationCap', 24, '#fff')}
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff;">Sign In to StudentSphere</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            Access free academic handouts, exam PYQs, and job alerts
          </p>
        </div>

        ${errorMessage ? `
          <div style="padding: 0.75rem 1rem; border-radius: var(--radius-sm); background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; font-size: 0.825rem; margin-bottom: 1.25rem;">
            ${errorMessage}
          </div>
        ` : ''}

        <form id="login-form">
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 600; color: #fff;">Institutional Email</label>
            <input type="email" class="form-input" id="login-email" value="karan@studentsphere.edu" required placeholder="student@university.edu" />
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label class="form-label" style="font-weight: 600; color: #fff; margin-bottom: 0;">Password</label>
              <a href="/forgot-password" data-link style="font-size: 0.75rem; color: var(--primary);">Forgot Password?</a>
            </div>
            <input type="password" class="form-input" id="login-password" value="demo12345" required placeholder="••••••••" />
          </div>

          <button type="submit" class="btn btn-primary" id="login-submit-btn" style="width: 100%; padding: 0.75rem; font-size: 0.95rem; font-weight: 700; justify-content: center; margin-top: 0.5rem;" ${isLoading ? 'disabled' : ''}>
            ${isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); text-align: center; font-size: 0.85rem; color: var(--text-muted);">
          Don't have an account? <a href="/register" data-link style="color: var(--primary); font-weight: 600;">Create Account</a>
        </div>
      </div>
    </div>
  `;
}

export function bindLoginEvents(container) {
  const form = container.querySelector('#login-form');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = container.querySelector('#login-email').value;
      const password = container.querySelector('#login-password').value;

      isLoading = true;
      errorMessage = '';
      router.resolve();

      try {
        const res = await loginUser(email, password);
        if (res.user && !res.user.isEmailVerified) {
          router.navigate('/verify-email');
        } else {
          router.navigate('/dashboard');
        }
      } catch (err) {
        errorMessage = err.message || 'Login failed. Please check your credentials.';
        isLoading = false;
        router.resolve();
      }
    };
  }
}

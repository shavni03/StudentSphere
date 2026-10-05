import { login, isEmailVerified } from '../../auth.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

let errorMessage = '';
let infoMessage = '';
let isLoading = false;

export function renderLoginPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || '';

  // Show "Please login to continue." if redirected from protected content
  const hasRedirect = Boolean(redirectTarget);
  const noticeText = hasRedirect ? 'Please login to continue to protected student resources.' : '';

  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 2.5rem; background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('graduationCap', 24, '#fff')}
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Sign In to StudentSphere</h1>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            Access free lecture handouts, exam PYQs, and verified interview debriefs
          </p>
        </div>

        ${noticeText ? `
          <div style="padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--primary); font-size: 0.85rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
            ${createIcon('shield', 16, 'currentColor')} ${noticeText}
          </div>
        ` : ''}

        ${errorMessage ? `
          <div style="padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 0.85rem; margin-bottom: 1.25rem;">
            ${errorMessage}
          </div>
        ` : ''}

        ${infoMessage ? `
          <div style="padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 0.85rem; margin-bottom: 1.25rem;">
            ${infoMessage}
          </div>
        ` : ''}

        <form id="login-form" novalidate>
          <input type="hidden" id="login-redirect" value="${redirectTarget}" />

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label for="login-email" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Institutional / Student Email
            </label>
            <input 
              type="email" 
              class="form-input" 
              id="login-email" 
              required 
              placeholder="student@university.edu" 
              style="width: 100%;" 
            />
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="login-password" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0;">
                Password
              </label>
              <a href="/forgot-password" data-link style="font-size: 0.75rem; color: var(--primary); text-decoration: none;">
                Forgot Password?
              </a>
            </div>
            <input 
              type="password" 
              class="form-input" 
              id="login-password" 
              required 
              placeholder="••••••••" 
              style="width: 100%;" 
            />
          </div>

          <!-- Remember Me Checkbox -->
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="login-remember-me" checked style="border-radius: 4px;" />
              <span>Remember me on this browser</span>
            </label>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            id="login-submit-btn" 
            style="width: 100%; padding: 0.8rem; font-size: 0.95rem; font-weight: 700; justify-content: center;" 
            ${isLoading ? 'disabled' : ''}
          >
            ${isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); text-align: center; font-size: 0.85rem; color: var(--text-muted);">
          Don't have an account? 
          <a href="/register${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ''}" data-link style="color: var(--primary); font-weight: 600;">
            Register
          </a>
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
      const email = container.querySelector('#login-email')?.value.trim();
      const password = container.querySelector('#login-password')?.value;
      const redirectTarget = container.querySelector('#login-redirect')?.value || '';

      if (!email || !password) {
        errorMessage = 'Please enter both your email address and password.';
        router.resolve();
        return;
      }

      isLoading = true;
      errorMessage = '';
      infoMessage = '';
      router.resolve();

      try {
        await login(email, password);

        // Check if email is verified
        if (!isEmailVerified()) {
          isLoading = false;
          // Redirect to verify-email preserving the original redirect parameter
          const verifyUrl = `/auth/verify-email.html${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ''}`;
          router.navigate(verifyUrl);
          return;
        }

        // Email verified: continue to requested protected page or dashboard
        isLoading = false;
        const targetUrl = redirectTarget || '/dashboard';
        router.navigate(targetUrl);
      } catch (err) {
        errorMessage = err.message || 'Login failed. Please verify your credentials.';
        isLoading = false;
        router.resolve();
      }
    };
  }
}

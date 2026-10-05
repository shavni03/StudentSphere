import { register } from '../../auth.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

let errorMessage = '';
let successMessage = '';
let isLoading = false;

export function renderRegisterPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || '';

  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 480px; padding: 2.5rem; background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('graduationCap', 24, '#fff')}
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Create Student Account</h1>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            Access free lecture notes, exam PYQs, and verified interview debriefs
          </p>
        </div>

        ${errorMessage ? `
          <div style="padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 0.85rem; margin-bottom: 1.25rem;">
            ${errorMessage}
          </div>
        ` : ''}

        ${successMessage ? `
          <div style="padding: 0.85rem 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 0.875rem; margin-bottom: 1.25rem; line-height: 1.5;">
            ${successMessage}
          </div>
        ` : ''}

        <form id="register-form" novalidate>
          <input type="hidden" id="reg-redirect" value="${redirectTarget}" />

          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="reg-name" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Full Name *
            </label>
            <input type="text" class="form-input" id="reg-name" required placeholder="e.g. Rahul Sharma" style="width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="reg-email" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Institutional / Student Email *
            </label>
            <input type="email" class="form-input" id="reg-email" required placeholder="student@university.edu" style="width: 100%;" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label for="reg-branch" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">Branch</label>
              <select class="form-select" id="reg-branch" style="width: 100%;">
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="AIDS">AIDS</option>
                <option value="ECE">ECE</option>
                <option value="EE">EE</option>
                <option value="ME">ME</option>
              </select>
            </div>

            <div class="form-group">
              <label for="reg-semester" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">Semester</label>
              <select class="form-select" id="reg-semester" style="width: 100%;">
                <option value="1">Sem 1</option>
                <option value="2">Sem 2</option>
                <option value="3">Sem 3</option>
                <option value="4">Sem 4</option>
                <option value="5" selected>Sem 5</option>
                <option value="6">Sem 6</option>
                <option value="7">Sem 7</option>
                <option value="8">Sem 8</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="reg-password" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Password * (min 6 characters)
            </label>
            <input type="password" class="form-input" id="reg-password" required placeholder="••••••••" minlength="6" style="width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label for="reg-confirm-password" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Confirm Password *
            </label>
            <input type="password" class="form-input" id="reg-confirm-password" required placeholder="••••••••" minlength="6" style="width: 100%;" />
          </div>

          <!-- Terms & Conditions Acceptance -->
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="reg-terms" required style="margin-top: 3px;" />
              <span>
                I agree to the <a href="/terms" data-link style="color: var(--primary);">Terms & Conditions</a> and acknowledge the <a href="/privacy" data-link style="color: var(--primary);">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            id="reg-submit-btn" 
            style="width: 100%; padding: 0.8rem; font-size: 0.95rem; font-weight: 700; justify-content: center;" 
            ${isLoading ? 'disabled' : ''}
          >
            ${isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-muted);">
          Already have an account? 
          <a href="/login${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ''}" data-link style="color: var(--primary); font-weight: 600;">
            Sign In
          </a>
        </div>
      </div>
    </div>
  `;
}

export function bindRegisterEvents(container) {
  const form = container.querySelector('#register-form');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const name = container.querySelector('#reg-name').value.trim();
      const email = container.querySelector('#reg-email').value.trim();
      const branch = container.querySelector('#reg-branch').value;
      const semester = container.querySelector('#reg-semester').value;
      const password = container.querySelector('#reg-password').value;
      const confirmPassword = container.querySelector('#reg-confirm-password').value;
      const termsAccepted = container.querySelector('#reg-terms').checked;
      const redirectTarget = container.querySelector('#reg-redirect').value;

      errorMessage = '';
      successMessage = '';
      isLoading = true;
      router.resolve();

      try {
        const res = await register({
          name,
          email,
          password,
          confirmPassword,
          termsAccepted,
          branch,
          semester
        });

        isLoading = false;
        successMessage = res.message || 'Account created successfully. Please verify your email before accessing StudentSphere.';
        router.resolve();

        // Redirect to email verification after displaying confirmation
        setTimeout(() => {
          const verifyUrl = `/auth/verify-email.html${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ''}`;
          router.navigate(verifyUrl);
        }, 1200);
      } catch (err) {
        errorMessage = err.message || 'Registration failed. Please check your information.';
        isLoading = false;
        router.resolve();
      }
    };
  }
}

import { registerUser } from '../../auth.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

let errorMessage = '';
let isLoading = false;

export function renderRegisterPage() {
  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 480px; padding: 2.5rem; background: rgba(17, 24, 39, 0.95); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('graduationCap', 24, '#fff')}
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff;">Create Student Account</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            Join over 42,000 university students sharing free lecture notes & PYQs
          </p>
        </div>

        ${errorMessage ? `
          <div style="padding: 0.75rem 1rem; border-radius: var(--radius-sm); background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; font-size: 0.825rem; margin-bottom: 1.25rem;">
            ${errorMessage}
          </div>
        ` : ''}

        <form id="register-form">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" style="font-weight: 600; color: #fff;">Full Name *</label>
            <input type="text" class="form-input" id="reg-name" required placeholder="e.g. Karan Kumar" />
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" style="font-weight: 600; color: #fff;">Institutional Email *</label>
            <input type="email" class="form-input" id="reg-email" required placeholder="student@university.edu" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Branch</label>
              <select class="form-select" id="reg-branch">
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="AIDS">AIDS</option>
                <option value="ECE">ECE</option>
                <option value="EE">EE</option>
                <option value="ME">ME</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Semester</label>
              <select class="form-select" id="reg-semester">
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
            <label class="form-label" style="font-weight: 600; color: #fff;">Password *</label>
            <input type="password" class="form-input" id="reg-password" required placeholder="At least 8 characters" minlength="8" />
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 600; color: #fff;">Confirm Password *</label>
            <input type="password" class="form-input" id="reg-confirm-password" required placeholder="Re-enter password" minlength="8" />
          </div>

          <button type="submit" class="btn btn-primary" id="reg-submit-btn" style="width: 100%; padding: 0.75rem; font-size: 0.95rem; font-weight: 700; justify-content: center;" ${isLoading ? 'disabled' : ''}>
            ${isLoading ? 'Creating Account...' : 'Register & Claim Welcome Credits'}
          </button>
        </form>

        <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-muted);">
          Already have an account? <a href="/login" data-link style="color: var(--primary); font-weight: 600;">Sign In</a>
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
      const name = container.querySelector('#reg-name').value;
      const email = container.querySelector('#reg-email').value;
      const branch = container.querySelector('#reg-branch').value;
      const semester = container.querySelector('#reg-semester').value;
      const password = container.querySelector('#reg-password').value;
      const confirmPassword = container.querySelector('#reg-confirm-password').value;

      isLoading = true;
      errorMessage = '';
      router.resolve();

      try {
        await registerUser({
          name,
          email,
          password,
          confirmPassword,
          branch,
          semester
        });
        isLoading = false;
        router.navigate('/verify-email');
      } catch (err) {
        errorMessage = err.message || 'Registration failed. Please verify your details.';
        isLoading = false;
        router.resolve();
      }
    };
  }
}

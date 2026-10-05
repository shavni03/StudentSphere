import { register } from '../../auth.js';
import { appState } from '../../state.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderRegisterPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || '';
  const branches = appState.branches || ['CSE', 'IT', 'AIDS', 'ECE', 'EE', 'ME', 'Civil', 'Chemical'];
  const semesters = appState.semesters || ['1', '2', '3', '4', '5', '6', '7', '8'];

  return `
    <div style="min-height: calc(100vh - 180px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
      <div class="card" style="width: 100%; max-width: 490px; padding: 2.5rem; background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
        
        <div style="text-align: center; margin-bottom: 1.75rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('graduationCap', 24, '#fff')}
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Create Student Account</h1>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            Access free lecture notes, exam PYQs, and verified interview debriefs
          </p>
        </div>

        <!-- Dynamic Error Alert Box (Preserves form inputs) -->
        <div id="reg-error-box" style="display: none; padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 0.85rem; margin-bottom: 1.25rem;"></div>

        <!-- Dynamic Success Alert Box with Spam/Junk notification -->
        <div id="reg-success-box" style="display: none; padding: 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 0.875rem; margin-bottom: 1.25rem; line-height: 1.5;"></div>

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
              <label for="reg-branch" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
                Branch *
              </label>
              <select class="form-select" id="reg-branch" required style="width: 100%;">
                <option value="" disabled selected>Select Branch</option>
                ${branches.map(b => `<option value="${b}">${b}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label for="reg-semester" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
                Semester *
              </label>
              <select class="form-select" id="reg-semester" required style="width: 100%;">
                <option value="" disabled selected>Select Semester</option>
                ${semesters.map(s => `<option value="${s}">Semester ${s}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Password with Show/Hide Toggle -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="reg-password" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Password * (min 6 characters)
            </label>
            <div style="position: relative; display: flex; align-items: center;">
              <input 
                type="password" 
                class="form-input" 
                id="reg-password" 
                required 
                placeholder="••••••••" 
                minlength="6" 
                style="width: 100%; padding-right: 2.75rem;" 
              />
              <button
                type="button"
                id="toggle-reg-password-btn"
                title="Show / Hide Password"
                aria-label="Toggle password visibility"
                style="position: absolute; right: 10px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px;"
              >
                ${createIcon('eye', 18, 'currentColor')}
              </button>
            </div>
          </div>

          <!-- Confirm Password with Show/Hide Toggle -->
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label for="reg-confirm-password" class="form-label" style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem; margin-bottom: 0.4rem; display: block;">
              Confirm Password *
            </label>
            <div style="position: relative; display: flex; align-items: center;">
              <input 
                type="password" 
                class="form-input" 
                id="reg-confirm-password" 
                required 
                placeholder="••••••••" 
                minlength="6" 
                style="width: 100%; padding-right: 2.75rem;" 
              />
              <button
                type="button"
                id="toggle-reg-confirm-btn"
                title="Show / Hide Confirm Password"
                aria-label="Toggle confirm password visibility"
                style="position: absolute; right: 10px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px;"
              >
                ${createIcon('eye', 18, 'currentColor')}
              </button>
            </div>
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
          >
            Register
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
  // Password Visibility Toggles
  const togglePwdBtn = container.querySelector('#toggle-reg-password-btn');
  const pwdInput = container.querySelector('#reg-password');
  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.onclick = () => {
      const isShowing = pwdInput.type === 'text';
      pwdInput.type = isShowing ? 'password' : 'text';
      togglePwdBtn.innerHTML = createIcon(isShowing ? 'eye' : 'eyeOff', 18, 'currentColor');
      togglePwdBtn.style.color = isShowing ? 'var(--text-muted)' : 'var(--primary)';
    };
  }

  const toggleConfirmBtn = container.querySelector('#toggle-reg-confirm-btn');
  const confirmInput = container.querySelector('#reg-confirm-password');
  if (toggleConfirmBtn && confirmInput) {
    toggleConfirmBtn.onclick = () => {
      const isShowing = confirmInput.type === 'text';
      confirmInput.type = isShowing ? 'password' : 'text';
      toggleConfirmBtn.innerHTML = createIcon(isShowing ? 'eye' : 'eyeOff', 18, 'currentColor');
      toggleConfirmBtn.style.color = isShowing ? 'var(--text-muted)' : 'var(--primary)';
    };
  }

  const form = container.querySelector('#register-form');
  const errorBox = container.querySelector('#reg-error-box');
  const successBox = container.querySelector('#reg-success-box');
  const submitBtn = container.querySelector('#reg-submit-btn');

  const showError = (msg) => {
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = 'block';
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const hideError = () => {
    if (errorBox) {
      errorBox.textContent = '';
      errorBox.style.display = 'none';
    }
  };

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      const name = container.querySelector('#reg-name')?.value.trim();
      const email = container.querySelector('#reg-email')?.value.trim();
      const branch = container.querySelector('#reg-branch')?.value;
      const semester = container.querySelector('#reg-semester')?.value;
      const password = container.querySelector('#reg-password')?.value;
      const confirmPassword = container.querySelector('#reg-confirm-password')?.value;
      const termsAccepted = container.querySelector('#reg-terms')?.checked;
      const redirectTarget = container.querySelector('#reg-redirect')?.value;

      hideError();

      // Form Validations (Does NOT reset or clear any fields!)
      if (!name) {
        showError('Please enter your full name.');
        return;
      }

      if (!email) {
        showError('Please enter your student / institutional email address.');
        return;
      }

      if (!branch) {
        showError('Please select your academic branch from the dropdown.');
        return;
      }

      if (!semester) {
        showError('Please select your current semester from the dropdown.');
        return;
      }

      if (!password || password.length < 6) {
        showError('Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        showError('Passwords do not match. Please re-enter your confirm password.');
        return;
      }

      if (!termsAccepted) {
        showError('You must accept the Terms & Conditions and Privacy Policy to register.');
        return;
      }

      // Begin registration
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
      }

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

        if (successBox) {
          successBox.innerHTML = `
            <strong>✓ Account created successfully!</strong><br/>
            ${res.message || 'Verification email has been dispatched.'}<br/><br/>
            <div style="padding: 0.6rem 0.8rem; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 6px; color: #f59e0b; font-size: 0.8rem;">
              <strong>💡 Important:</strong> If you don't see the email in your primary inbox, please check your <strong>Spam</strong> or <strong>Junk</strong> folder.
            </div>
            <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-muted);">
              Redirecting to verification screen...
            </div>
          `;
          successBox.style.display = 'block';
        }

        setTimeout(() => {
          const verifyUrl = `/auth/verify-email.html${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ''}`;
          router.navigate(verifyUrl);
        }, 2200);
      } catch (err) {
        showError(err.message || 'Registration failed. Please check your information and try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Register';
        }
      }
    };
  }
}

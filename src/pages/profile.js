import { appState } from '../state.js';
import { router } from '../router.js';
import { createIcon } from '../icons.js';
import { deleteAccount } from '../auth.js';

export function renderProfilePage() {
  const user = appState.currentUser || { name: 'Student', email: 'student@university.edu', branch: 'CSE', semester: '5' };
  const branches = appState.branches || ['CSE', 'IT', 'AIDS', 'ECE', 'EE', 'ME', 'Civil', 'Chemical'];
  const semesters = appState.semesters || ['1', '2', '3', '4', '5', '6', '7', '8'];

  return `
    <div class="container" style="padding: 2rem 1rem 4rem; max-width: 800px;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">
          Student Profile
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Manage your academic background, degree branch, and public contributor profile.
        </p>
      </div>

      <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; font-weight: 800; color: #fff;">
            ${user.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">${user.name}</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${user.email}</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap;">
              <span class="badge ${user.role === 'admin' ? 'badge-danger' : 'badge-primary'}">${user.role === 'admin' ? '🛡️ Admin' : '🎓 Student'}</span>
              <span class="badge ${user.isEmailVerified ? 'badge-success' : 'badge-warning'}">
                ${user.isEmailVerified ? '✓ Verified Student' : '⚠️ Unverified'}
              </span>
              <span class="badge badge-warning">🪙 ${user.credits || 0} Cr</span>
            </div>
          </div>
        </div>

        <form id="profile-edit-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Full Name</label>
              <input type="text" class="form-input" id="profile-name" value="${user.name}" required />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Institutional Email</label>
              <input type="email" class="form-input" id="profile-email" value="${user.email}" disabled style="opacity: 0.7; cursor: not-allowed;" />
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">University / Institute</label>
              <input type="text" class="form-input" id="profile-university" value="${user.university || 'Delhi Technological University'}" required />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Branch / Major</label>
              <select class="form-select" id="profile-branch">
                ${branches.map(b => `
                  <option value="${b}" ${user.branch === b ? 'selected' : ''}>${b}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Current Semester</label>
              <select class="form-select" id="profile-semester">
                ${semesters.map(s => `
                  <option value="${s}" ${String(user.semester) === String(s) ? 'selected' : ''}>Semester ${s}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Bio & Academic Interests</label>
              <textarea class="form-textarea" rows="3" id="profile-bio" placeholder="Passionate about cloud architecture, distributed systems, and low-latency engines...">Undergraduate researcher passionate about cloud architecture, distributed algorithms, and open educational resources.</textarea>
            </div>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end; gap: 0.75rem;">
            <a href="/dashboard" data-link class="btn btn-ghost" style="color: var(--text-muted); text-decoration: none;">Cancel</a>
            <button type="submit" class="btn btn-primary">Save Profile Changes</button>
          </div>
        </form>
      </div>

      <!-- Danger Zone: Delete Account -->
      <div class="card" style="padding: 1.75rem; border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700; color: #ef4444; margin: 0 0 0.25rem 0;">Permanently Delete Account</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Remove your student account, uploads, and credentials completely.</p>
          </div>
          <button id="profile-btn-delete-account" class="btn" style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #ef4444; font-size: 0.85rem; font-weight: 700; padding: 0.5rem 1rem; display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
            ${createIcon('trash', 14, '#ef4444')} Delete Account
          </button>
        </div>
      </div>
    </div>
  `;
}

export function bindProfileEvents(container) {
  const form = container.querySelector('#profile-edit-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = container.querySelector('#profile-name').value;
      const university = container.querySelector('#profile-university').value;
      const branch = container.querySelector('#profile-branch').value;
      const semester = container.querySelector('#profile-semester').value;

      if (appState.currentUser) {
        appState.currentUser.name = name;
        appState.currentUser.university = university;
        appState.currentUser.branch = branch;
        appState.currentUser.semester = semester;
        localStorage.setItem('studentsphere_auth_user', JSON.stringify(appState.currentUser));
        appState.notify();
      }

      alert('Profile updated successfully!');
      router.navigate('/dashboard');
    };
  }

  const deleteBtn = container.querySelector('#profile-btn-delete-account');
  if (deleteBtn) {
    deleteBtn.onclick = async () => {
      const confirmInput = prompt('⚠️ WARNING: Deleting your account cannot be undone.\n\nType "DELETE" below to confirm:');
      if (confirmInput === 'DELETE') {
        try {
          deleteBtn.disabled = true;
          deleteBtn.textContent = 'Deleting Account...';
          await deleteAccount();
          alert('Your StudentSphere account has been permanently deleted.');
        } catch (err) {
          deleteBtn.disabled = false;
          deleteBtn.textContent = 'Delete Account';
          alert(err.message || 'Failed to delete account.');
        }
      } else if (confirmInput !== null) {
        alert('Account deletion cancelled (confirmation did not match "DELETE").');
      }
    };
  }
}

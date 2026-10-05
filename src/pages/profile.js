import { appState } from '../state.js';
import { router } from '../router.js';

export function renderProfilePage() {
  const user = appState.currentUser;

  return `
    <div class="container" style="padding: 2rem 1rem 4rem; max-width: 800px;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;">
          Student Profile
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Manage your academic background, degree branch, and public contributor profile.
        </p>
      </div>

      <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; font-weight: 800; color: #fff;">
            ${user.name.charAt(0)}
          </div>
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #fff;">${user.name}</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${user.email}</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
              <span class="badge ${user.role === 'admin' ? 'badge-danger' : 'badge-primary'}">${user.role === 'admin' ? '🛡️ Admin' : '🎓 Student'}</span>
              <span class="badge badge-success">✓ Verified Student</span>
            </div>
          </div>
        </div>

        <form id="profile-edit-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Full Name</label>
              <input type="text" class="form-input" id="profile-name" value="${user.name}" required />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Institutional Email</label>
              <input type="email" class="form-input" id="profile-email" value="${user.email}" disabled style="opacity: 0.7; cursor: not-allowed;" />
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">University / Institute</label>
              <input type="text" class="form-input" id="profile-university" value="${user.university || 'Delhi Technological University'}" required />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Branch / Major</label>
              <select class="form-select" id="profile-branch">
                <option value="CSE" ${user.branch === 'CSE' ? 'selected' : ''}>Computer Science & Engineering (CSE)</option>
                <option value="IT" ${user.branch === 'IT' ? 'selected' : ''}>Information Technology (IT)</option>
                <option value="AIDS" ${user.branch === 'AIDS' ? 'selected' : ''}>AI & Data Science (AIDS)</option>
                <option value="ECE" ${user.branch === 'ECE' ? 'selected' : ''}>Electronics & Communication (ECE)</option>
                <option value="EE" ${user.branch === 'EE' ? 'selected' : ''}>Electrical Engineering (EE)</option>
                <option value="ME" ${user.branch === 'ME' ? 'selected' : ''}>Mechanical Engineering (ME)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Current Semester</label>
              <select class="form-select" id="profile-semester">
                ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `
                  <option value="${s}" ${String(user.semester) === String(s) ? 'selected' : ''}>Semester ${s}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Bio & Academic Interests</label>
              <textarea class="form-textarea" rows="3" id="profile-bio" placeholder="Passionate about cloud architecture, distributed systems, and low-latency engines...">Undergraduate researcher passionate about cloud architecture, distributed algorithms, and open educational resources.</textarea>
            </div>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end; gap: 0.75rem;">
            <a href="/dashboard" data-link class="btn btn-ghost" style="color: var(--text-muted);">Cancel</a>
            <button type="submit" class="btn btn-primary">Save Profile Changes</button>
          </div>
        </form>
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

      appState.currentUser.name = name;
      appState.currentUser.university = university;
      appState.currentUser.branch = branch;
      appState.currentUser.semester = semester;
      localStorage.setItem('studentsphere_user', JSON.stringify(appState.currentUser));
      appState.notify();

      alert('Profile updated successfully!');
      router.navigate('/dashboard');
    };
  }
}

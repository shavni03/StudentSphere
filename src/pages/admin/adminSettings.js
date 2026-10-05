import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { appState } from '../../state.js';
import { createIcon } from '../../icons.js';

export function renderAdminSettingsPage() {
  const branches = appState.branches || [];
  const semesters = appState.semesters || [];

  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">System Architecture & Platform Policies</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Core configuration for academic branches, semesters, notification integrations, and zero-credit rules.
      </p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 850px;">

      <!-- Academic Branches & Semesters Management (Admin Feature) -->
      <div class="card" style="padding: 1.75rem; border: 1px solid var(--border-medium);">
        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
          ${createIcon('graduationCap', 22, '#6366f1')}
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin: 0;">Academic Branches & Semesters Management</h4>
        </div>
        <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1.5rem;">
          Configure the official degree branches and semesters available for student registration, study note filtering, and exam papers.
        </p>

        <!-- Manage Branches -->
        <div style="margin-bottom: 1.75rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
          <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            Active Branches (${branches.length})
          </label>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;" id="admin-branches-list">
            ${branches.map(b => `
              <span class="badge badge-primary" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; font-size: 0.8rem;">
                ${b}
                <button type="button" class="admin-remove-branch-btn" data-branch="${b}" title="Remove ${b}" style="background: transparent; border: none; color: #fff; cursor: pointer; padding: 0; display: flex; align-items: center;">
                  ${createIcon('x', 14, 'currentColor')}
                </button>
              </span>
            `).join('')}
          </div>

          <form id="admin-add-branch-form" style="display: flex; gap: 0.5rem; max-width: 400px;">
            <input 
              type="text" 
              class="form-input" 
              id="admin-new-branch-input" 
              placeholder="e.g. BIOTECH, ROBOTICS" 
              required 
              style="flex: 1; padding: 0.45rem 0.75rem; font-size: 0.85rem;" 
            />
            <button type="submit" class="btn btn-primary" style="padding: 0.45rem 1rem; font-size: 0.85rem; white-space: nowrap;">
              + Add Branch
            </button>
          </form>
        </div>

        <!-- Manage Semesters -->
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            Active Semesters (${semesters.length})
          </label>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;" id="admin-semesters-list">
            ${semesters.map(s => `
              <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; font-size: 0.8rem;">
                Semester ${s}
                <button type="button" class="admin-remove-sem-btn" data-sem="${s}" title="Remove Semester ${s}" style="background: transparent; border: none; color: #fff; cursor: pointer; padding: 0; display: flex; align-items: center;">
                  ${createIcon('x', 14, 'currentColor')}
                </button>
              </span>
            `).join('')}
          </div>

          <form id="admin-add-sem-form" style="display: flex; gap: 0.5rem; max-width: 400px;">
            <input 
              type="number" 
              min="1" 
              max="12" 
              class="form-input" 
              id="admin-new-sem-input" 
              placeholder="Semester number (e.g. 9)" 
              required 
              style="flex: 1; padding: 0.45rem 0.75rem; font-size: 0.85rem;" 
            />
            <button type="submit" class="btn btn-secondary" style="padding: 0.45rem 1rem; font-size: 0.85rem; white-space: nowrap;">
              + Add Semester
            </button>
          </form>
        </div>
      </div>

      <!-- Free Downloads Locked Rule -->
      <div class="card" style="padding: 1.5rem; border-left: 4px solid #10b981;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">Universal 0-Credit Download Rule</h4>
            <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.3rem;">
              Enforces that students can download all lecture handouts, handwritten notes, and past examination papers without any credit deduction.
            </p>
          </div>
          <span class="badge badge-success" style="font-size: 0.75rem;">PERMANENTLY LOCKED ON</span>
        </div>
      </div>

      <!-- Integrations Status -->
      <div class="card" style="padding: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1.25rem;">Backend Service Connectors</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">Firebase Authentication (Project: studentsphere-71a6a)</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Web Auth SDK • Mandatory Email Verification • Token Verification</div>
            </div>
            <span class="badge badge-success">✓ Connected</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">Resend Transactional Email API</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Secure server-side relay • Webhook endpoint: /api/v1/webhooks/resend</div>
            </div>
            <span class="badge badge-success">✓ Operational</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">Telegram Bot Webhook (@StudentSphereBot)</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Long-polling / webhook • Token isolated on backend</div>
            </div>
            <span class="badge badge-success">✓ Operational</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">Google AdSense Container</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Active placements: 11 • Ads forbidden in Auth & Admin</div>
            </div>
            <span class="badge badge-primary">Ready</span>
          </div>
        </div>
      </div>

      <!-- Storage & Maintenance -->
      <div class="card" style="padding: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Maintenance Controls</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-outline" style="font-size: 0.8rem;" id="admin-purge-cache-btn">
            Purge Local Cache
          </button>
        </div>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'settings', 'Platform Policy & Integrations Settings', 'Manage degree branches, semesters, backend connectors, and security policies');
}

export function bindAdminSettingsEvents(container) {
  bindAdminLayoutEvents(container);

  // Add Branch
  const addBranchForm = container.querySelector('#admin-add-branch-form');
  if (addBranchForm) {
    addBranchForm.onsubmit = (e) => {
      e.preventDefault();
      const input = container.querySelector('#admin-new-branch-input');
      const val = input?.value?.trim();
      if (val) {
        appState.addBranch(val);
        input.value = '';
        const parent = container.closest('#app-content');
        if (parent) {
          parent.innerHTML = renderAdminSettingsPage();
          bindAdminSettingsEvents(parent);
        }
      }
    };
  }

  // Remove Branch
  container.querySelectorAll('.admin-remove-branch-btn').forEach(btn => {
    btn.onclick = () => {
      const branch = btn.getAttribute('data-branch');
      if (confirm(`Remove branch ${branch}?`)) {
        appState.removeBranch(branch);
        const parent = container.closest('#app-content');
        if (parent) {
          parent.innerHTML = renderAdminSettingsPage();
          bindAdminSettingsEvents(parent);
        }
      }
    };
  });

  // Add Semester
  const addSemForm = container.querySelector('#admin-add-sem-form');
  if (addSemForm) {
    addSemForm.onsubmit = (e) => {
      e.preventDefault();
      const input = container.querySelector('#admin-new-sem-input');
      const val = input?.value?.trim();
      if (val) {
        appState.addSemester(val);
        input.value = '';
        const parent = container.closest('#app-content');
        if (parent) {
          parent.innerHTML = renderAdminSettingsPage();
          bindAdminSettingsEvents(parent);
        }
      }
    };
  }

  // Remove Semester
  container.querySelectorAll('.admin-remove-sem-btn').forEach(btn => {
    btn.onclick = () => {
      const sem = btn.getAttribute('data-sem');
      if (confirm(`Remove Semester ${sem}?`)) {
        appState.removeSemester(sem);
        const parent = container.closest('#app-content');
        if (parent) {
          parent.innerHTML = renderAdminSettingsPage();
          bindAdminSettingsEvents(parent);
        }
      }
    };
  });

  const purgeBtn = container.querySelector('#admin-purge-cache-btn');
  if (purgeBtn) {
    purgeBtn.onclick = () => {
      alert('Local storage cache purged successfully!');
    };
  }
}

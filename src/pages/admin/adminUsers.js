import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockUsers } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderAdminUsersPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const role = query.get('role') || '';
  const branch = query.get('branch') || '';
  const semester = query.get('semester') || '';
  const status = query.get('status') || '';
  const verified = query.get('verified') || '';

  let list = [...mockUsers];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term) || u.college.toLowerCase().includes(term));
  }
  if (role) list = list.filter(u => u.role.toLowerCase() === role.toLowerCase());
  if (branch) list = list.filter(u => u.branch.toLowerCase() === branch.toLowerCase());
  if (semester) list = list.filter(u => String(u.semester) === String(semester));
  if (status) list = list.filter(u => u.status.toLowerCase() === status.toLowerCase());
  if (verified) list = list.filter(u => String(u.isEmailVerified) === String(verified === 'true'));

  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">User Directory & Permission Management</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Audit students, teachers, email verification KYC, and credit ledger allocations.
      </p>
    </div>

    <!-- Advanced Filter Controls -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-users-search" 
            class="form-input" 
            placeholder="Search users by name, email, or college..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select user-filter-sel" data-key="role" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Roles</option>
          <option value="Student" ${role === 'Student' ? 'selected' : ''}>Student</option>
          <option value="Teacher" ${role === 'Teacher' ? 'selected' : ''}>Teacher</option>
          <option value="Admin" ${role === 'Admin' ? 'selected' : ''}>Admin</option>
        </select>

        <select class="form-select user-filter-sel" data-key="branch" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Branches</option>
          <option value="CSE" ${branch === 'CSE' ? 'selected' : ''}>CSE</option>
          <option value="IT" ${branch === 'IT' ? 'selected' : ''}>IT</option>
          <option value="AIDS" ${branch === 'AIDS' ? 'selected' : ''}>AIDS</option>
          <option value="ECE" ${branch === 'ECE' ? 'selected' : ''}>ECE</option>
          <option value="EE" ${branch === 'EE' ? 'selected' : ''}>EE</option>
          <option value="ME" ${branch === 'ME' ? 'selected' : ''}>ME</option>
        </select>

        <select class="form-select user-filter-sel" data-key="semester" style="width: 130px; font-size: 0.825rem;">
          <option value="">All Sems</option>
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `
            <option value="${s}" ${semester === String(s) ? 'selected' : ''}>Sem ${s}</option>
          `).join('')}
        </select>

        <select class="form-select user-filter-sel" data-key="status" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Statuses</option>
          <option value="Active" ${status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Suspended" ${status === 'Suspended' ? 'selected' : ''}>Suspended</option>
        </select>

        <select class="form-select user-filter-sel" data-key="verified" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Verification</option>
          <option value="true" ${verified === 'true' ? 'selected' : ''}>Email Verified</option>
          <option value="false" ${verified === 'false' ? 'selected' : ''}>Unverified</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span style="font-size: 0.9rem; font-weight: 700; color: #fff;">Showing ${list.length} accounts</span>
      </div>

      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">User</th>
              <th style="padding: 0.75rem 1rem;">Role</th>
              <th style="padding: 0.75rem 1rem;">Branch / Sem</th>
              <th style="padding: 0.75rem 1rem;">College</th>
              <th style="padding: 0.75rem 1rem;">Email KYC</th>
              <th style="padding: 0.75rem 1rem;">Credits</th>
              <th style="padding: 0.75rem 1rem;">Status</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(u => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem;">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #fff;">
                      ${u.name.charAt(0)}
                    </div>
                    <div>
                      <div style="font-weight: 600; color: #fff;">${u.name}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${u.email}</div>
                    </div>
                  </div>
                </td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${u.role === 'Admin' ? 'badge-danger' : u.role === 'Teacher' ? 'badge-primary' : 'badge-outline'}">
                    ${u.role}
                  </span>
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${u.branch} (Sem ${u.semester})</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary); max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${u.college}</td>
                <td style="padding: 0.85rem 1rem;">
                  ${u.isEmailVerified ? '<span style="color: #10b981; font-weight: 600;">✓ Verified</span>' : '<span style="color: #ef4444; font-weight: 600;">⚠ Pending</span>'}
                </td>
                <td style="padding: 0.85rem 1rem; font-weight: 700; color: #f59e0b;">🪙 ${u.credits} Cr</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}">${u.status}</span>
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right;">
                  <button class="btn btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;" onclick="alert('Managing user: ${u.name}')">
                    Manage
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'users', 'User Directory & Authentication', 'Search, filter, and inspect user profiles across universities');
}

export function bindAdminUsersEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-users-search');
  if (searchInput) {
    let timer;
    searchInput.oninput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = router.getQueryParams();
        if (searchInput.value.trim()) q.set('q', searchInput.value.trim());
        else q.delete('q');
        router.setQueryParams(Object.fromEntries(q.entries()));
      }, 300);
    };
  }

  container.querySelectorAll('.user-filter-sel').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const val = sel.value;
      const q = router.getQueryParams();
      if (val) q.set(key, val);
      else q.delete(key);
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  });
}

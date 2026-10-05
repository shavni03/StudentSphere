import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockCompanies } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderAdminCompaniesPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const industry = query.get('industry') || '';
  const hiringType = query.get('hiringType') || '';
  const status = query.get('status') || '';

  let list = [...mockCompanies];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(term) || c.industry.toLowerCase().includes(term));
  }
  if (industry) list = list.filter(c => c.industry.toLowerCase().includes(industry.toLowerCase()));
  if (hiringType) list = list.filter(c => c.hiringType.toLowerCase() === hiringType.toLowerCase());
  if (status) list = list.filter(c => c.status.toLowerCase() === status.toLowerCase());

  const content = `
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Partner Companies & Recruiter Directory</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
          Manage campus recruiters, compensation packages, and interview difficulty ratings.
        </p>
      </div>
      <button class="btn btn-primary" onclick="alert('Company registration modal opened')">
        + Add New Company
      </button>
    </div>

    <!-- Filters -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-comp-search" 
            class="form-input" 
            placeholder="Search companies by name or industry..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select comp-filter-sel" data-key="industry" style="width: 150px; font-size: 0.825rem;">
          <option value="">All Industries</option>
          <option value="Technology" ${industry === 'Technology' ? 'selected' : ''}>Technology</option>
          <option value="FinTech" ${industry === 'FinTech' ? 'selected' : ''}>FinTech</option>
          <option value="E-Commerce" ${industry === 'E-Commerce' ? 'selected' : ''}>E-Commerce</option>
          <option value="IT Services" ${industry === 'IT Services' ? 'selected' : ''}>IT Services</option>
        </select>

        <select class="form-select comp-filter-sel" data-key="hiringType" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Types</option>
          <option value="On-Campus" ${hiringType === 'On-Campus' ? 'selected' : ''}>On-Campus</option>
          <option value="Off-Campus" ${hiringType === 'Off-Campus' ? 'selected' : ''}>Off-Campus</option>
        </select>

        <select class="form-select comp-filter-sel" data-key="status" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Status</option>
          <option value="Active" ${status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Inactive" ${status === 'Inactive' ? 'selected' : ''}>Inactive</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">Company</th>
              <th style="padding: 0.75rem 1rem;">Industry</th>
              <th style="padding: 0.75rem 1rem;">Hiring Channel</th>
              <th style="padding: 0.75rem 1rem;">Avg Package</th>
              <th style="padding: 0.75rem 1rem;">Max Package</th>
              <th style="padding: 0.75rem 1rem;">Difficulty</th>
              <th style="padding: 0.75rem 1rem;">Status</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(c => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem;">
                  <div style="font-weight: 700; color: #fff;">${c.name}</div>
                  ${c.featured ? '<span class="badge badge-primary" style="font-size: 0.65rem;">★ Featured</span>' : ''}
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${c.industry}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge badge-outline">${c.hiringType}</span>
                </td>
                <td style="padding: 0.85rem 1rem; font-weight: 600; color: #10b981;">${c.avgPackage}</td>
                <td style="padding: 0.85rem 1rem; font-weight: 600; color: #f59e0b;">${c.highestPackage}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${c.difficulty}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${c.status === 'Active' ? 'badge-success' : 'badge-danger'}">${c.status}</span>
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right;">
                  <a href="/companies/${c.id}" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
                    View Profile
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'companies', 'Recruiting Partners Management', 'Track campus recruiters and recruitment metrics');
}

export function bindAdminCompaniesEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-comp-search');
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

  container.querySelectorAll('.comp-filter-sel').forEach(sel => {
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

import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockJobs } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderAdminJobsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const company = query.get('company') || '';
  const mode = query.get('mode') || '';
  const type = query.get('type') || '';
  const status = query.get('status') || '';

  let list = [...mockJobs];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(j => j.title.toLowerCase().includes(term) || j.company.toLowerCase().includes(term) || j.location.toLowerCase().includes(term));
  }
  if (company) list = list.filter(j => j.company.toLowerCase() === company.toLowerCase());
  if (mode) list = list.filter(j => j.mode.toLowerCase() === mode.toLowerCase());
  if (type) list = list.filter(j => j.type.toLowerCase() === type.toLowerCase());
  if (status) list = list.filter(j => j.status?.toLowerCase() === status.toLowerCase());

  const content = `
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Job Radar & Recruitment Postings</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
          Verify employer job notices, application deadlines, eligibility criteria, and CTC transparency.
        </p>
      </div>
      <button class="btn btn-primary" onclick="alert('Job creation modal opened')">
        + Post New Job Opening
      </button>
    </div>

    <!-- Filters -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-jobs-search" 
            class="form-input" 
            placeholder="Search jobs by title, company, or city..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select job-filter-sel" data-key="company" style="width: 150px; font-size: 0.825rem;">
          <option value="">All Companies</option>
          <option value="Google" ${company === 'Google' ? 'selected' : ''}>Google</option>
          <option value="Microsoft" ${company === 'Microsoft' ? 'selected' : ''}>Microsoft</option>
          <option value="Amazon" ${company === 'Amazon' ? 'selected' : ''}>Amazon</option>
          <option value="Atlassian" ${company === 'Atlassian' ? 'selected' : ''}>Atlassian</option>
          <option value="Flipkart" ${company === 'Flipkart' ? 'selected' : ''}>Flipkart</option>
        </select>

        <select class="form-select job-filter-sel" data-key="mode" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Modes</option>
          <option value="Remote" ${mode === 'Remote' ? 'selected' : ''}>Remote</option>
          <option value="Hybrid" ${mode === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
          <option value="On-Site" ${mode === 'On-Site' ? 'selected' : ''}>On-Site</option>
        </select>

        <select class="form-select job-filter-sel" data-key="type" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Types</option>
          <option value="Full-Time" ${type === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
          <option value="Internship" ${type === 'Internship' ? 'selected' : ''}>Internship</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">Role & Company</th>
              <th style="padding: 0.75rem 1rem;">Type & Mode</th>
              <th style="padding: 0.75rem 1rem;">Location</th>
              <th style="padding: 0.75rem 1rem;">Compensation</th>
              <th style="padding: 0.75rem 1rem;">Deadline</th>
              <th style="padding: 0.75rem 1rem;">Verified</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(j => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem;">
                  <div style="font-weight: 700; color: #fff;">${j.title}</div>
                  <div style="font-size: 0.75rem; color: #818cf8;">${j.company}</div>
                </td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge badge-primary">${j.type}</span>
                  <span class="badge badge-outline" style="margin-left: 0.3rem;">${j.mode}</span>
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${j.location}</td>
                <td style="padding: 0.85rem 1rem; font-weight: 700; color: #10b981;">${j.package}</td>
                <td style="padding: 0.85rem 1rem; color: #fca5a5; font-weight: 600;">${j.deadline}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span style="color: #10b981; font-weight: 600;">✓ Verified</span>
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right;">
                  <a href="/jobs/${j.id}" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
                    Inspect
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'jobs', 'Job Openings & Placement Radar', 'Publish verified job notices and track student applications');
}

export function bindAdminJobsEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-jobs-search');
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

  container.querySelectorAll('.job-filter-sel').forEach(sel => {
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

import { mockJobs } from '../data/mockData.js';
import { appState } from '../state.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { renderSearchBar, bindSearchBarEvents } from '../components/common/searchBar.js';
import { renderFilterChips, renderFilterDrawer } from '../components/common/filters.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderJobsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const company = query.get('company') || '';
  const role = query.get('role') || '';
  const location = query.get('location') || '';
  const workMode = query.get('workMode') || '';
  const type = query.get('type') || '';
  const track = query.get('track') || '';
  const experience = query.get('experience') || '';

  const activeChips = [];
  if (company) activeChips.push({ key: 'company', label: `Company: ${company}` });
  if (role) activeChips.push({ key: 'role', label: `Role: ${role}` });
  if (location) activeChips.push({ key: 'location', label: `Location: ${location}` });
  if (workMode) activeChips.push({ key: 'workMode', label: `Mode: ${workMode}` });
  if (type) activeChips.push({ key: 'type', label: `Type: ${type}` });
  if (track) activeChips.push({ key: 'track', label: `Track: ${track}` });
  if (experience) activeChips.push({ key: 'experience', label: `Exp: ${experience}` });

  let list = mockJobs.filter(j => j.status === 'Active');
  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(j => j.role.toLowerCase().includes(term) || j.company.toLowerCase().includes(term) || j.skills.some(s => s.toLowerCase().includes(term)));
  }
  if (company) list = list.filter(j => j.company.toLowerCase() === company.toLowerCase());
  if (location) list = list.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
  if (workMode) list = list.filter(j => j.workMode.toLowerCase() === workMode.toLowerCase());
  if (type) list = list.filter(j => j.type.toLowerCase() === type.toLowerCase());
  if (track) list = list.filter(j => j.track.toLowerCase() === track.toLowerCase());
  if (experience) list = list.filter(j => j.experience.toLowerCase().includes(experience.toLowerCase()));

  const filterFormHtml = `
    <div class="form-group">
      <label class="form-label">Opportunity Type</label>
      <select class="form-select jobs-filter-input" data-key="type">
        <option value="">All Types (Internship & FTE)</option>
        <option value="Internship" ${type === 'Internship' ? 'selected' : ''}>Internship</option>
        <option value="Full-time" ${type === 'Full-time' ? 'selected' : ''}>Full-time Role</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Campus Track</label>
      <select class="form-select jobs-filter-input" data-key="track">
        <option value="">All Tracks</option>
        <option value="On-campus" ${track === 'On-campus' ? 'selected' : ''}>On-Campus Drive</option>
        <option value="Off-campus" ${track === 'Off-campus' ? 'selected' : ''}>Off-Campus Opening</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Work Mode</label>
      <select class="form-select jobs-filter-input" data-key="workMode">
        <option value="">All Modes</option>
        <option value="Remote" ${workMode === 'Remote' ? 'selected' : ''}>Remote</option>
        <option value="Hybrid" ${workMode === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
        <option value="On-site" ${workMode === 'On-site' ? 'selected' : ''}>On-site</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Company</label>
      <select class="form-select jobs-filter-input" data-key="company">
        <option value="">All Companies</option>
        <option value="Google" ${company === 'Google' ? 'selected' : ''}>Google</option>
        <option value="Amazon India" ${company === 'Amazon India' ? 'selected' : ''}>Amazon India</option>
        <option value="Microsoft" ${company === 'Microsoft' ? 'selected' : ''}>Microsoft</option>
        <option value="CRED" ${company === 'CRED' ? 'selected' : ''}>CRED</option>
        <option value="Zomato" ${company === 'Zomato' ? 'selected' : ''}>Zomato</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Location</label>
      <select class="form-select jobs-filter-input" data-key="location">
        <option value="">All Locations</option>
        <option value="Bengaluru" ${location === 'Bengaluru' ? 'selected' : ''}>Bengaluru</option>
        <option value="Hyderabad" ${location === 'Hyderabad' ? 'selected' : ''}>Hyderabad</option>
        <option value="Noida" ${location === 'Noida' ? 'selected' : ''}>Noida</option>
        <option value="Gurugram" ${location === 'Gurugram' ? 'selected' : ''}>Gurugram</option>
      </select>
    </div>

    ${renderAdSlot('jobs-sidebar')}
  `;

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem;">
      <div style="padding: 0.85rem 1.25rem; border-radius: var(--radius-lg); background: linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%); border: 1px solid rgba(56, 189, 248, 0.25); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1.75rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('sparkles', 20, '#38bdf8')}
          <span style="font-size: 0.875rem; font-weight: 600; color: #f8fafc;">
            Direct Student Career Radar: Verified campus drives, summer internships, and fresher roles. Real deadlines.
          </span>
        </div>
        <a href="/jobs/saved" data-link class="btn btn-secondary btn-sm">
          ${createIcon('bookmark', 14, 'currentColor')} Saved Jobs (${appState.savedJobIds.length})
        </a>
      </div>

      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h1 style="font-size: 1.85rem; font-weight: 800;">Jobs & Internship Opportunities</h1>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">
            Curated engineering & tech job openings with direct application URLs.
          </p>
        </div>

        <button id="jobs-open-mobile-filter-btn" class="btn btn-secondary mobile-filter-btn" style="display: none;">
          ${createIcon('sliders', 16, 'currentColor')} Filters ${activeChips.length > 0 ? `(${activeChips.length})` : ''}
        </button>
      </div>

      <div style="margin-bottom: 1rem;">
        ${renderSearchBar({ value: q, placeholder: 'Search by role, company, or stack (e.g. SDE, React, Amazon)...', id: 'jobs-search-input' })}
        ${renderFilterChips(activeChips)}
      </div>

      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;" class="jobs-page-grid">
        ${renderFilterDrawer({ title: 'Filter Opportunities', contentHtml: filterFormHtml, isMobile: false })}

        <div>
          ${list.length === 0 ? `
            <div class="card" style="text-align: center; padding: 3.5rem 1rem;">
              <div style="opacity: 0.4; margin-bottom: 1rem;">${createIcon('briefcase', 44, 'var(--text-muted)')}</div>
              <h3 style="font-size: 1.15rem; color: var(--text-primary);">No job openings found</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
                Try relaxing the location, mode, or campus track filter.
              </p>
              <button id="jobs-empty-clear-btn" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">
                Clear all filters
              </button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              ${list.map((job, idx) => {
                const isSaved = appState.savedJobIds.includes(job.id);
                return `
                  <div class="card" style="padding: 1.35rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                      <div style="flex: 1;">
                        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 0.45rem;">
                          <span class="badge badge-primary">${job.type}</span>
                          <span class="badge badge-info">${job.workMode}</span>
                          <span class="badge badge-secondary">${job.track}</span>
                          <span class="badge badge-success">✓ Verified by T&P</span>
                        </div>

                        <a href="/jobs/${job.id}" data-link>
                          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">
                            ${job.role}
                          </h3>
                        </a>

                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.65rem;">
                          <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">${job.company}</span>
                          <span style="color: var(--text-muted);">•</span>
                          <span style="font-size: 0.825rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem;">
                            ${createIcon('mapPin', 13, 'currentColor')} ${job.location}
                          </span>
                        </div>

                        <p style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
                          ${job.description}
                        </p>

                        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem;">
                          ${job.skills.map(s => `
                            <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; background: rgba(255,255,255,0.05); color: var(--text-secondary);">
                              ${s}
                            </span>
                          `).join('')}
                        </div>

                        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; font-size: 0.775rem; color: var(--text-muted);">
                          <span style="color: #10b981; font-weight: 700;">💰 ${job.salary}</span>
                          <span style="display: flex; align-items: center; gap: 0.25rem; color: #f87171;">
                            ${createIcon('clock', 13, 'currentColor')} Deadline: ${job.deadline}
                          </span>
                        </div>
                      </div>

                      <div style="display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;">
                        <a href="/jobs/${job.id}" data-link class="btn btn-primary btn-sm" style="min-width: 120px;">
                          Apply Now ${createIcon('externalLink', 13, 'currentColor')}
                        </a>
                        <button class="btn btn-secondary btn-sm jobs-toggle-save-btn" data-id="${job.id}" style="min-width: 120px;">
                          ${createIcon('bookmark', 14, isSaved ? '#6366f1' : 'currentColor')}
                          ${isSaved ? 'Saved' : 'Save Job'}
                        </button>
                      </div>
                    </div>
                  </div>

                  ${idx === 1 ? renderAdSlot('jobs-between') : ''}
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>

      ${renderFilterDrawer({ title: 'Filter Opportunities', contentHtml: filterFormHtml, isMobile: true })}

      <style>
        @media (max-width: 900px) {
          .jobs-page-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: inline-flex !important; }
        }
      </style>
    </div>
  `;
}

export function bindJobsPageEvents(container) {
  bindSearchBarEvents(container, 'jobs-search-input', (val) => {
    const q = router.getQueryParams();
    const obj = Object.fromEntries(q.entries());
    obj.q = val;
    router.setQueryParams(obj);
  });

  container.querySelectorAll('.jobs-filter-input').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const q = router.getQueryParams();
      const obj = Object.fromEntries(q.entries());
      obj[key] = sel.value;
      router.setQueryParams(obj);
    };
  });

  container.querySelectorAll('.filter-chip-remove').forEach(btn => {
    btn.onclick = () => {
      const key = btn.getAttribute('data-remove-key');
      const q = router.getQueryParams();
      const obj = Object.fromEntries(q.entries());
      delete obj[key];
      router.setQueryParams(obj);
    };
  });

  const resetBtn = container.querySelector('#filter-reset-all-btn');
  const emptyClearBtn = container.querySelector('#jobs-empty-clear-btn');
  const sidebarResetBtn = container.querySelector('#sidebar-reset-btn');
  [resetBtn, emptyClearBtn, sidebarResetBtn].forEach(b => {
    if (b) b.onclick = () => router.navigate('/jobs');
  });

  container.querySelectorAll('.jobs-toggle-save-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      appState.toggleSaveJob(id);
      router.resolve();
    };
  });

  const openMobileBtn = container.querySelector('#jobs-open-mobile-filter-btn');
  const mobileModal = container.querySelector('#mobile-filter-modal');
  const closeMobileBtn = container.querySelector('#mobile-filter-close-btn');
  const applyMobileBtn = container.querySelector('#mobile-filter-apply-btn');

  if (openMobileBtn && mobileModal) openMobileBtn.onclick = () => { mobileModal.style.display = 'flex'; };
  if (closeMobileBtn && mobileModal) closeMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
  if (applyMobileBtn && mobileModal) applyMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
}

import { mockCompanies } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { renderSearchBar, bindSearchBarEvents } from '../components/common/searchBar.js';
import { renderFilterChips, renderFilterDrawer } from '../components/common/filters.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderCompaniesPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const industry = query.get('industry') || '';
  const hiringType = query.get('hiringType') || '';
  const difficulty = query.get('difficulty') || '';

  const activeChips = [];
  if (industry) activeChips.push({ key: 'industry', label: `Industry: ${industry}` });
  if (hiringType) activeChips.push({ key: 'hiringType', label: `Type: ${hiringType}` });
  if (difficulty) activeChips.push({ key: 'difficulty', label: `Diff: ${difficulty}` });

  let list = mockCompanies.filter(c => c.status === 'Active');
  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(term) || c.industry.toLowerCase().includes(term));
  }
  if (industry) list = list.filter(c => c.industry.toLowerCase().includes(industry.toLowerCase()));
  if (hiringType) list = list.filter(c => c.hiringType.toLowerCase() === hiringType.toLowerCase());
  if (difficulty) list = list.filter(c => c.difficulty.toLowerCase() === difficulty.toLowerCase());

  const filterFormHtml = `
    <div class="form-group">
      <label class="form-label">Industry</label>
      <select class="form-select companies-filter-input" data-key="industry">
        <option value="">All Industries</option>
        <option value="Technology" ${industry === 'Technology' ? 'selected' : ''}>Technology & Cloud</option>
        <option value="FinTech" ${industry === 'FinTech' ? 'selected' : ''}>FinTech</option>
        <option value="E-Commerce" ${industry === 'E-Commerce' ? 'selected' : ''}>E-Commerce</option>
        <option value="IT Services" ${industry === 'IT Services' ? 'selected' : ''}>IT Services</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Hiring Channel</label>
      <select class="form-select companies-filter-input" data-key="hiringType">
        <option value="">All Types</option>
        <option value="On-Campus" ${hiringType === 'On-Campus' ? 'selected' : ''}>On-Campus</option>
        <option value="Off-Campus" ${hiringType === 'Off-Campus' ? 'selected' : ''}>Off-Campus</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Interview Difficulty</label>
      <select class="form-select companies-filter-input" data-key="difficulty">
        <option value="">All Difficulties</option>
        <option value="Easy" ${difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
        <option value="Medium" ${difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
        <option value="Hard" ${difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
      </select>
    </div>

    ${renderAdSlot('jobs-sidebar')}
  `;

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem;">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h1 style="font-size: 1.85rem; font-weight: 800;">Companies Directory</h1>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">
            Recruiting partners, interview archives, hiring types, and past selection patterns.
          </p>
        </div>

        <button id="companies-open-mobile-filter-btn" class="btn btn-secondary mobile-filter-btn" style="display: none;">
          ${createIcon('sliders', 16, 'currentColor')} Filters ${activeChips.length > 0 ? `(${activeChips.length})` : ''}
        </button>
      </div>

      <div style="margin-bottom: 1rem;">
        ${renderSearchBar({ value: q, placeholder: 'Search companies by name or industry...', id: 'companies-search-input' })}
        ${renderFilterChips(activeChips)}
      </div>

      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;" class="companies-page-grid">
        ${renderFilterDrawer({ title: 'Filter Companies', contentHtml: filterFormHtml, isMobile: false })}

        <div>
          ${list.length === 0 ? `
            <div class="card" style="text-align: center; padding: 3.5rem 1rem;">
              <div style="opacity: 0.4; margin-bottom: 1rem;">${createIcon('building', 44, 'var(--text-muted)')}</div>
              <h3 style="font-size: 1.15rem; color: #fff;">No companies found</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
                Try relaxing the industry or difficulty filter.
              </p>
              <button id="companies-empty-clear-btn" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">
                Clear all filters
              </button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              ${list.map(comp => `
                <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                      <span class="badge badge-primary">${comp.hiringType}</span>
                      <span class="badge ${comp.difficulty === 'Hard' ? 'badge-danger' : comp.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'}">
                        ${comp.difficulty}
                      </span>
                    </div>

                    <a href="/companies/${comp.id}" data-link>
                      <h3 style="font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.25rem;">
                        ${comp.name}
                      </h3>
                    </a>

                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                      ${comp.industry}
                    </p>

                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem;">
                      ${comp.roles.map(r => `
                        <span style="font-size: 0.7rem; padding: 0.15rem 0.45rem; border-radius: 4px; background: rgba(255,255,255,0.05); color: var(--text-secondary);">
                          ${r}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: var(--text-dim);">${comp.interviewCount} Reviews</span>
                    <a href="/companies/${comp.id}" data-link class="btn btn-secondary btn-sm">
                      Company Hub ${createIcon('arrowRight', 13, 'currentColor')}
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      ${renderFilterDrawer({ title: 'Filter Companies', contentHtml: filterFormHtml, isMobile: true })}

      <style>
        @media (max-width: 900px) {
          .companies-page-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: inline-flex !important; }
        }
      </style>
    </div>
  `;
}

export function bindCompaniesPageEvents(container) {
  bindSearchBarEvents(container, 'companies-search-input', (val) => {
    const q = router.getQueryParams();
    const obj = Object.fromEntries(q.entries());
    obj.q = val;
    router.setQueryParams(obj);
  });

  container.querySelectorAll('.companies-filter-input').forEach(sel => {
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
  const emptyClearBtn = container.querySelector('#companies-empty-clear-btn');
  const sidebarResetBtn = container.querySelector('#sidebar-reset-btn');
  [resetBtn, emptyClearBtn, sidebarResetBtn].forEach(b => {
    if (b) b.onclick = () => router.navigate('/companies');
  });

  const openMobileBtn = container.querySelector('#companies-open-mobile-filter-btn');
  const mobileModal = container.querySelector('#mobile-filter-modal');
  const closeMobileBtn = container.querySelector('#mobile-filter-close-btn');
  const applyMobileBtn = container.querySelector('#mobile-filter-apply-btn');

  if (openMobileBtn && mobileModal) openMobileBtn.onclick = () => { mobileModal.style.display = 'flex'; };
  if (closeMobileBtn && mobileModal) closeMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
  if (applyMobileBtn && mobileModal) applyMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
}

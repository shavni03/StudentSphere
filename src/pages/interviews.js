import { mockInterviews } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { renderSearchBar, bindSearchBarEvents } from '../components/common/searchBar.js';
import { renderFilterChips, renderFilterDrawer } from '../components/common/filters.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderInterviewsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const company = query.get('company') || '';
  const role = query.get('role') || '';
  const year = query.get('year') || '';
  const difficulty = query.get('difficulty') || '';
  const hiringType = query.get('hiringType') || '';
  const verifiedOnly = query.get('verified') === 'true';

  const activeChips = [];
  if (company) activeChips.push({ key: 'company', label: `Company: ${company}` });
  if (role) activeChips.push({ key: 'role', label: `Role: ${role}` });
  if (year) activeChips.push({ key: 'year', label: `Year: ${year}` });
  if (difficulty) activeChips.push({ key: 'difficulty', label: `Difficulty: ${difficulty}` });
  if (hiringType) activeChips.push({ key: 'hiringType', label: `Type: ${hiringType}` });
  if (verifiedOnly) activeChips.push({ key: 'verified', label: 'Verified Only' });

  let list = mockInterviews.filter(item => item.status === 'Approved');
  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(i => i.company.toLowerCase().includes(term) || i.role.toLowerCase().includes(term) || i.summary.toLowerCase().includes(term));
  }
  if (company) list = list.filter(i => i.company.toLowerCase() === company.toLowerCase());
  if (role) list = list.filter(i => i.role.toLowerCase().includes(role.toLowerCase()));
  if (year) list = list.filter(i => i.year === year);
  if (difficulty) list = list.filter(i => i.difficulty.toLowerCase() === difficulty.toLowerCase());
  if (hiringType) list = list.filter(i => i.hiringType.toLowerCase() === hiringType.toLowerCase());
  if (verifiedOnly) list = list.filter(i => i.verified);

  const filterFormHtml = `
    <div class="form-group">
      <label class="form-label">Company</label>
      <select class="form-select interviews-filter-input" data-key="company">
        <option value="">All Companies</option>
        <option value="Microsoft" ${company === 'Microsoft' ? 'selected' : ''}>Microsoft</option>
        <option value="Google" ${company === 'Google' ? 'selected' : ''}>Google</option>
        <option value="Amazon" ${company === 'Amazon' ? 'selected' : ''}>Amazon</option>
        <option value="Uber" ${company === 'Uber' ? 'selected' : ''}>Uber</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Interview Difficulty</label>
      <select class="form-select interviews-filter-input" data-key="difficulty">
        <option value="">All Difficulties</option>
        <option value="Easy" ${difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
        <option value="Medium" ${difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
        <option value="Hard" ${difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Hiring Channel</label>
      <select class="form-select interviews-filter-input" data-key="hiringType">
        <option value="">All Channels</option>
        <option value="On-Campus" ${hiringType === 'On-Campus' ? 'selected' : ''}>On-Campus</option>
        <option value="Off-Campus" ${hiringType === 'Off-Campus' ? 'selected' : ''}>Off-Campus</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Graduation Year</label>
      <select class="form-select interviews-filter-input" data-key="year">
        <option value="">Any Year</option>
        <option value="2026" ${year === '2026' ? 'selected' : ''}>2026</option>
        <option value="2025" ${year === '2025' ? 'selected' : ''}>2025</option>
      </select>
    </div>

    <div class="form-group" style="flex-direction: row; align-items: center; gap: 0.65rem;">
      <input type="checkbox" id="interviews-verified-checkbox" ${verifiedOnly ? 'checked' : ''} style="width: 16px; height: 16px;">
      <label for="interviews-verified-checkbox" class="form-label" style="margin: 0; cursor: pointer;">
        Verified Alumni Only
      </label>
    </div>

    ${renderAdSlot('notes-sidebar')}
  `;

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem;">
      <div style="padding: 0.85rem 1.25rem; border-radius: var(--radius-lg); background: linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%); border: 1px solid rgba(236, 72, 153, 0.25); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1.75rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('sparkles', 20, '#f472b6')}
          <span style="font-size: 0.875rem; font-weight: 600; color: #f8fafc;">
            Real University Placement Archives: Unfiltered interview questions, rounds leaks, and compensation tips.
          </span>
        </div>
        <a href="/interviews/upload" data-link class="btn btn-primary btn-sm">+ Share Experience (+60 Cr)</a>
      </div>

      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h1 style="font-size: 1.85rem; font-weight: 800;">Verified Interview Experiences</h1>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">
            Learn what tech firms and unicorn startups test in on-campus & off-campus rounds.
          </p>
        </div>

        <button id="interviews-open-mobile-filter-btn" class="btn btn-secondary mobile-filter-btn" style="display: none;">
          ${createIcon('sliders', 16, 'currentColor')} Filters ${activeChips.length > 0 ? `(${activeChips.length})` : ''}
        </button>
      </div>

      <div style="margin-bottom: 1rem;">
        ${renderSearchBar({ value: q, placeholder: 'Search interview experiences (e.g. Graph, Microsoft, LLD)...', id: 'interviews-search-input' })}
        ${renderFilterChips(activeChips)}
      </div>

      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;" class="interviews-page-grid">
        ${renderFilterDrawer({ title: 'Filter Experiences', contentHtml: filterFormHtml, isMobile: false })}

        <div>
          ${list.length === 0 ? `
            <div class="card" style="text-align: center; padding: 3.5rem 1rem;">
              <div style="opacity: 0.4; margin-bottom: 1rem;">${createIcon('messageSquare', 44, 'var(--text-muted)')}</div>
              <h3 style="font-size: 1.15rem; color: #fff;">No experiences found</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
                Try choosing another difficulty or clearing filters.
              </p>
              <button id="interviews-empty-clear-btn" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">
                Clear all filters
              </button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              ${list.map(exp => `
                <div class="card" style="padding: 1.5rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                    <div style="flex: 1;">
                      <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 0.45rem;">
                        <span class="badge badge-primary">${exp.company}</span>
                        <span class="badge badge-secondary">${exp.hiringType}</span>
                        <span class="badge ${exp.difficulty === 'Hard' ? 'badge-danger' : 'badge-warning'}">${exp.difficulty} Difficulty</span>
                        ${exp.verified ? '<span class="badge badge-success">✓ Verified Placement</span>' : ''}
                      </div>

                      <a href="/interviews/${exp.id}" data-link>
                        <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem;">
                          ${exp.company} — ${exp.role} (${exp.year})
                        </h3>
                      </a>

                      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.85rem;">
                        ${exp.summary}
                      </p>

                      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; font-size: 0.775rem; color: var(--text-muted);">
                        <span style="color: #10b981; font-weight: 600;">💰 Offered: ${exp.stipendOrSalary}</span>
                        <span>Candidate: ${exp.uploader}</span>
                        <span>📋 ${exp.roundsCount} Rounds Breakdown</span>
                      </div>
                    </div>

                    <a href="/interviews/${exp.id}" data-link class="btn btn-secondary btn-sm" style="flex-shrink: 0;">
                      Read Breakdown
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      ${renderFilterDrawer({ title: 'Filter Experiences', contentHtml: filterFormHtml, isMobile: true })}

      <style>
        @media (max-width: 900px) {
          .interviews-page-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: inline-flex !important; }
        }
      </style>
    </div>
  `;
}

export function bindInterviewsPageEvents(container) {
  bindSearchBarEvents(container, 'interviews-search-input', (val) => {
    const q = router.getQueryParams();
    const obj = Object.fromEntries(q.entries());
    obj.q = val;
    router.setQueryParams(obj);
  });

  container.querySelectorAll('.interviews-filter-input').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const q = router.getQueryParams();
      const obj = Object.fromEntries(q.entries());
      obj[key] = sel.value;
      router.setQueryParams(obj);
    };
  });

  const verifiedCheck = container.querySelector('#interviews-verified-checkbox');
  if (verifiedCheck) {
    verifiedCheck.onchange = () => {
      const q = router.getQueryParams();
      const obj = Object.fromEntries(q.entries());
      obj.verified = verifiedCheck.checked ? 'true' : '';
      router.setQueryParams(obj);
    };
  }

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
  const emptyClearBtn = container.querySelector('#interviews-empty-clear-btn');
  const sidebarResetBtn = container.querySelector('#sidebar-reset-btn');
  [resetBtn, emptyClearBtn, sidebarResetBtn].forEach(b => {
    if (b) b.onclick = () => router.navigate('/interviews');
  });

  const openMobileBtn = container.querySelector('#interviews-open-mobile-filter-btn');
  const mobileModal = container.querySelector('#mobile-filter-modal');
  const closeMobileBtn = container.querySelector('#mobile-filter-close-btn');
  const applyMobileBtn = container.querySelector('#mobile-filter-apply-btn');

  if (openMobileBtn && mobileModal) openMobileBtn.onclick = () => { mobileModal.style.display = 'flex'; };
  if (closeMobileBtn && mobileModal) closeMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
  if (applyMobileBtn && mobileModal) applyMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
}

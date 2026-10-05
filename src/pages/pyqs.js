import { mockPYQs } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { appState } from '../state.js';
import { renderSearchBar, bindSearchBarEvents } from '../components/common/searchBar.js';
import { renderFilterChips, renderFilterDrawer } from '../components/common/filters.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

let downloadNoticeItem = null;

export function renderPYQsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const university = query.get('university') || '';
  const branch = query.get('branch') || '';
  const semester = query.get('semester') || '';
  const subject = query.get('subject') || '';
  const year = query.get('year') || '';
  const examType = query.get('examType') || '';

  const universities = appState.universities || [
    'Graphic Era (Deemed to be University) - GEU Dehradun',
    'Graphic Era Hill University (GEHU Dehradun)',
    'Graphic Era Hill University (GEHU Bhimtal)',
    'Graphic Era Hill University (GEHU Haldwani)'
  ];
  const branches = appState.branches || ['CSE', 'IT', 'AIDS', 'ECE', 'EE', 'ME', 'Civil', 'Biotechnology', 'MCA', 'BCA', 'MBA'];

  const activeChips = [];
  if (university) activeChips.push({ key: 'university', label: `Campus: ${university.includes('Deemed') ? 'GEU Deemed' : university.includes('Hill') ? 'GEHU Hill' : university}` });
  if (branch) activeChips.push({ key: 'branch', label: `Branch: ${branch}` });
  if (semester) activeChips.push({ key: 'semester', label: `Sem ${semester}` });
  if (subject) activeChips.push({ key: 'subject', label: `Subject: ${subject}` });
  if (year) activeChips.push({ key: 'year', label: `Year: ${year}` });
  if (examType) activeChips.push({ key: 'examType', label: `Type: ${examType}` });

  let list = mockPYQs.filter(item => item.status === 'Approved');
  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(p => p.subject.toLowerCase().includes(term) || (p.university || '').toLowerCase().includes(term));
  }
  if (university) list = list.filter(p => (p.university || '').toLowerCase().includes(university.toLowerCase()) || (p.university || '').toLowerCase().includes('graphic era'));
  if (branch) list = list.filter(p => p.branch.toLowerCase() === branch.toLowerCase() || p.branch.toLowerCase().includes(branch.toLowerCase()));
  if (semester) list = list.filter(p => p.semester === semester);
  if (subject) list = list.filter(p => p.subject.toLowerCase().includes(subject.toLowerCase()));
  if (year) list = list.filter(p => p.year === year);
  if (examType) list = list.filter(p => p.examType.toLowerCase() === examType.toLowerCase());

  const filterFormHtml = `
    <div class="form-group">
      <label class="form-label">Graphic Era Campus</label>
      <select class="form-select pyqs-filter-input" data-key="university">
        <option value="">All Graphic Era Campuses</option>
        ${universities.map(u => `
          <option value="${u}" ${university === u ? 'selected' : ''}>${u.includes('Deemed') ? 'Graphic Era Deemed (GEU)' : u.includes('Bhimtal') ? 'GEHU Bhimtal' : u.includes('Haldwani') ? 'GEHU Haldwani' : 'Graphic Era Hill (GEHU)'}</option>
        `).join('')}
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Branch</label>
      <select class="form-select pyqs-filter-input" data-key="branch">
        <option value="">All Branches</option>
        ${branches.map(b => `
          <option value="${b}" ${branch.toLowerCase() === b.toLowerCase() ? 'selected' : ''}>${b}</option>
        `).join('')}
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Semester</label>
      <select class="form-select pyqs-filter-input" data-key="semester">
        <option value="">All Semesters</option>
        ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `
          <option value="${s}" ${semester === String(s) ? 'selected' : ''}>Semester ${s}</option>
        `).join('')}
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Exam Type</label>
      <select class="form-select pyqs-filter-input" data-key="examType">
        <option value="">All Types</option>
        <option value="End-Term" ${examType === 'End-Term' ? 'selected' : ''}>End-Term</option>
        <option value="Mid-Term" ${examType === 'Mid-Term' ? 'selected' : ''}>Mid-Term</option>
        <option value="Supplementary" ${examType === 'Supplementary' ? 'selected' : ''}>Supplementary</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Examination Year</label>
      <select class="form-select pyqs-filter-input" data-key="year">
        <option value="">Any Year</option>
        <option value="2025" ${year === '2025' ? 'selected' : ''}>2025</option>
        <option value="2024" ${year === '2024' ? 'selected' : ''}>2024</option>
        <option value="2023" ${year === '2023' ? 'selected' : ''}>2023</option>
      </select>
    </div>

    ${renderAdSlot('notes-sidebar')}
  `;

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem;">
      <div style="padding: 0.85rem 1.25rem; border-radius: var(--radius-lg); background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1px solid rgba(99, 102, 241, 0.3); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1.75rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('layers', 20, '#6366f1')}
          <span style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary);">
            Free Past Question Papers (PYQs): Official end-term & mid-term question sets with answer keys. 0 Credits cost.
          </span>
        </div>
        <a href="/pyqs/upload" data-link class="btn btn-primary btn-sm">+ Upload PYQ (+40 Cr)</a>
      </div>

      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h1 style="font-size: 1.85rem; font-weight: 800;">Previous Year Question Papers (PYQs)</h1>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">
            Search question sets across Graphic Era campuses, semester exams, and branches.
          </p>
        </div>

        <button id="pyqs-open-mobile-filter-btn" class="btn btn-secondary mobile-filter-btn" style="display: none;">
          ${createIcon('sliders', 16, 'currentColor')} Filters ${activeChips.length > 0 ? `(${activeChips.length})` : ''}
        </button>
      </div>

      <div style="margin-bottom: 1rem;">
        ${renderSearchBar({ value: q, placeholder: 'Search PYQs by subject or university name...', id: 'pyqs-search-input' })}
        ${renderFilterChips(activeChips)}
      </div>

      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;" class="pyqs-page-grid">
        ${renderFilterDrawer({ title: 'Filter PYQs', contentHtml: filterFormHtml, isMobile: false })}

        <div>
          ${downloadNoticeItem ? `
            <div style="padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #047857; font-size: 0.85rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('check', 18, '#10b981')}
              <span>Free download started for <strong>${downloadNoticeItem.subject} (${downloadNoticeItem.examType})</strong>!</span>
            </div>
          ` : ''}

          ${list.length === 0 ? `
            <div class="card" style="text-align: center; padding: 3.5rem 1rem;">
              <div style="opacity: 0.4; margin-bottom: 1rem;">${createIcon('layers', 44, 'var(--text-muted)')}</div>
              <h3 style="font-size: 1.15rem; color: var(--text-primary);">No question papers found</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
                Try adjusting the university, branch, or exam type filters.
              </p>
              <button id="pyqs-empty-clear-btn" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">
                Clear all filters
              </button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              ${list.map(item => `
                <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem;">
                      <span class="badge badge-primary">${item.branch} • Sem ${item.semester}</span>
                      <span class="badge badge-info">${item.examType}</span>
                      <span class="badge badge-secondary">${item.year}</span>
                    </div>

                    <a href="/pyqs/${item.id}" data-link>
                      <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">
                        ${item.subject}
                      </h3>
                    </a>

                    <p style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.75rem;">
                      ${createIcon('building', 14, 'var(--text-dim)')} ${item.university}
                    </p>
                  </div>

                  <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; font-size: 0.75rem; color: var(--text-dim);">
                      <span>${item.fileSize} • ${item.downloadCount} downloads</span>
                      <span class="badge badge-success">Free (0 Cr)</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                      <button class="btn btn-primary btn-sm pyqs-download-btn" data-id="${item.id}" style="flex: 1;">
                        ${createIcon('download', 14, '#fff')} Download
                      </button>
                      <a href="/pyqs/${item.id}" data-link class="btn btn-secondary btn-sm">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      ${renderFilterDrawer({ title: 'Filter PYQs', contentHtml: filterFormHtml, isMobile: true })}

      <style>
        @media (max-width: 900px) {
          .pyqs-page-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: inline-flex !important; }
        }
      </style>
    </div>
  `;
}

export function bindPYQsPageEvents(container) {
  bindSearchBarEvents(container, 'pyqs-search-input', (val) => {
    const q = router.getQueryParams();
    const obj = Object.fromEntries(q.entries());
    obj.q = val;
    router.setQueryParams(obj);
  });

  container.querySelectorAll('.pyqs-filter-input').forEach(sel => {
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
  const emptyClearBtn = container.querySelector('#pyqs-empty-clear-btn');
  const sidebarResetBtn = container.querySelector('#sidebar-reset-btn');
  [resetBtn, emptyClearBtn, sidebarResetBtn].forEach(b => {
    if (b) b.onclick = () => router.navigate('/pyqs');
  });

  container.querySelectorAll('.pyqs-download-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const found = mockPYQs.find(p => p.id === id);
      downloadNoticeItem = found;
      router.resolve();
      setTimeout(() => {
        downloadNoticeItem = null;
        router.resolve();
      }, 3500);
    };
  });

  const openMobileBtn = container.querySelector('#pyqs-open-mobile-filter-btn');
  const mobileModal = container.querySelector('#mobile-filter-modal');
  const closeMobileBtn = container.querySelector('#mobile-filter-close-btn');
  const applyMobileBtn = container.querySelector('#mobile-filter-apply-btn');

  if (openMobileBtn && mobileModal) openMobileBtn.onclick = () => { mobileModal.style.display = 'flex'; };
  if (closeMobileBtn && mobileModal) closeMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
  if (applyMobileBtn && mobileModal) applyMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
}

import { mockNotes } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { appState } from '../state.js';
import { renderSearchBar, bindSearchBarEvents } from '../components/common/searchBar.js';
import { renderFilterChips, renderFilterDrawer } from '../components/common/filters.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

let downloadNoticeNote = null;

export function renderNotesPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const campus = query.get('campus') || '';
  const branch = query.get('branch') || '';
  const semester = query.get('semester') || '';
  const subject = query.get('subject') || '';
  const subjectCode = query.get('subjectCode') || '';
  const year = query.get('year') || '';
  const resourceType = query.get('resourceType') || '';
  const minRating = query.get('minRating') || '';
  const uploader = query.get('uploader') || '';
  const sortBy = query.get('sort') || 'popular';

  const branches = appState.branches || ['CSE', 'IT', 'AIDS', 'ECE', 'EE', 'ME', 'Civil', 'Biotechnology', 'MCA', 'BCA', 'MBA'];

  // Build active chips
  const activeChips = [];
  if (campus) activeChips.push({ key: 'campus', label: `Campus: ${campus}` });
  if (branch) activeChips.push({ key: 'branch', label: `Branch: ${branch}` });
  if (semester) activeChips.push({ key: 'semester', label: `Sem ${semester}` });
  if (subject) activeChips.push({ key: 'subject', label: `Subject: ${subject}` });
  if (subjectCode) activeChips.push({ key: 'subjectCode', label: `Code: ${subjectCode}` });
  if (year) activeChips.push({ key: 'year', label: `Year: ${year}` });
  if (resourceType) activeChips.push({ key: 'resourceType', label: `Format: ${resourceType}` });
  if (minRating) activeChips.push({ key: 'minRating', label: `★ ≥ ${minRating}` });
  if (uploader) activeChips.push({ key: 'uploader', label: `Uploader: ${uploader}` });

  // Filter notes
  let list = mockNotes.filter(n => n.status === 'Approved');

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(n => 
      n.title.toLowerCase().includes(term) ||
      n.subject.toLowerCase().includes(term) ||
      n.subjectCode.toLowerCase().includes(term) ||
      n.description.toLowerCase().includes(term)
    );
  }
  if (campus) list = list.filter(n => (n.university || '').toLowerCase().includes(campus.toLowerCase()));
  if (branch) list = list.filter(n => n.branch.toLowerCase() === branch.toLowerCase() || n.branch.toLowerCase().includes(branch.toLowerCase()));
  if (semester) list = list.filter(n => n.semester === semester);
  if (subject) list = list.filter(n => n.subject.toLowerCase().includes(subject.toLowerCase()));
  if (subjectCode) list = list.filter(n => n.subjectCode.toLowerCase() === subjectCode.toLowerCase());
  if (year) list = list.filter(n => n.year === year);
  if (resourceType) list = list.filter(n => n.resourceType.toLowerCase() === resourceType.toLowerCase());
  if (minRating) list = list.filter(n => n.rating >= parseFloat(minRating));
  if (uploader) list = list.filter(n => n.uploader.toLowerCase().includes(uploader.toLowerCase()));

  // Sorting
  list.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return new Date(b.uploadDate) - new Date(a.uploadDate);
    return b.downloads - a.downloads;
  });

  const filterFormHtml = `
    <div class="form-group">
      <label class="form-label">Graphic Era Campus</label>
      <select class="form-select notes-filter-input" data-key="campus">
        <option value="">All Campuses</option>
        <option value="GEU" ${campus === 'GEU' ? 'selected' : ''}>Graphic Era Deemed (GEU)</option>
        <option value="GEHU" ${campus === 'GEHU' ? 'selected' : ''}>Graphic Era Hill (GEHU)</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Branch</label>
      <select class="form-select notes-filter-input" data-key="branch">
        <option value="">All Branches</option>
        ${branches.map(b => `<option value="${b}" ${branch.toLowerCase() === b.toLowerCase() ? 'selected' : ''}>${b}</option>`).join('')}
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Semester</label>
      <select class="form-select notes-filter-input" data-key="semester">
        <option value="">All Semesters</option>
        ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `
          <option value="${s}" ${semester === String(s) ? 'selected' : ''}>Semester ${s}</option>
        `).join('')}
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Resource Format</label>
      <select class="form-select notes-filter-input" data-key="resourceType">
        <option value="">All Formats</option>
        <option value="Handwritten" ${resourceType === 'Handwritten' ? 'selected' : ''}>Handwritten Notes</option>
        <option value="Typed" ${resourceType === 'Typed' ? 'selected' : ''}>Typed PDF Document</option>
        <option value="Formula Sheet" ${resourceType === 'Formula Sheet' ? 'selected' : ''}>Formula / Cheat Sheet</option>
        <option value="Slides" ${resourceType === 'Slides' ? 'selected' : ''}>Presentation Slides</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Academic Year</label>
      <select class="form-select notes-filter-input" data-key="year">
        <option value="">Any Year</option>
        <option value="2026" ${year === '2026' ? 'selected' : ''}>2026 Curriculum</option>
        <option value="2025" ${year === '2025' ? 'selected' : ''}>2025</option>
        <option value="2024" ${year === '2024' ? 'selected' : ''}>2024</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Minimum Rating</label>
      <select class="form-select notes-filter-input" data-key="minRating">
        <option value="">Any Rating</option>
        <option value="4.5" ${minRating === '4.5' ? 'selected' : ''}>★ 4.5 & higher</option>
        <option value="4.0" ${minRating === '4.0' ? 'selected' : ''}>★ 4.0 & higher</option>
      </select>
    </div>

    ${renderAdSlot('notes-sidebar')}
  `;

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem;">
      <!-- Free Download Notice Banner -->
      <div style="padding: 0.85rem 1.25rem; border-radius: var(--radius-lg); background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%); border: 1px solid rgba(16, 185, 129, 0.3); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1.75rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('sparkles', 20, '#10b981')}
          <span style="font-size: 0.875rem; font-weight: 600; color: #f8fafc;">
            Free Academic Downloads Policy: All verified student notes and formula sheets are 100% free. No credits deducted.
          </span>
        </div>
        <a href="/notes/upload" data-link class="btn btn-primary btn-sm">+ Upload Notes (+50 Cr)</a>
      </div>

      <!-- Header -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h1 style="font-size: 1.85rem; font-weight: 800;">Verified University Notes</h1>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">
            Handwritten toppers' notes, lecture summaries, and solved formula sheets.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <button id="notes-open-mobile-filter-btn" class="btn btn-secondary mobile-filter-btn" style="display: none;">
            ${createIcon('sliders', 16, 'currentColor')} Filters ${activeChips.length > 0 ? `(${activeChips.length})` : ''}
          </button>

          <div style="display: flex; align-items: center; gap: 0.45rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted);">Sort:</span>
            <select id="notes-sort-select" class="form-select" style="width: auto; padding: 0.4rem 0.75rem; font-size: 0.8125rem;">
              <option value="popular" ${sortBy === 'popular' ? 'selected' : ''}>Most Popular</option>
              <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
              <option value="newest" ${sortBy === 'newest' ? 'selected' : ''}>Newest Uploads</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Search & Chips -->
      <div style="margin-bottom: 1rem;">
        ${renderSearchBar({ value: q, placeholder: 'Search notes by subject, code, or topic (e.g. Distributed Systems, CS602)...', id: 'notes-search-input' })}
        ${renderFilterChips(activeChips)}
      </div>

      <!-- Grid Layout -->
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;" class="notes-page-grid">
        <!-- Desktop Sidebar -->
        ${renderFilterDrawer({ title: 'Filter Notes', contentHtml: filterFormHtml, isMobile: false })}

        <!-- Stream of Notes -->
        <div>
          ${downloadNoticeNote ? `
            <div style="padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #6ee7b7; font-size: 0.85rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('check', 18, '#10b981')}
              <span>Free download started for <strong>${downloadNoticeNote.title}</strong>! (0 Credits charged)</span>
            </div>
          ` : ''}

          ${list.length === 0 ? `
            <div class="card" style="text-align: center; padding: 3.5rem 1rem;">
              <div style="opacity: 0.4; margin-bottom: 1rem;">${createIcon('fileText', 44, 'var(--text-muted)')}</div>
              <h3 style="font-size: 1.15rem; color: #fff;">No notes found</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
                Try removing some filters or search for another subject.
              </p>
              <button id="notes-empty-clear-btn" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">
                Clear all filters
              </button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              ${list.map((note, idx) => `
                <div class="card" style="padding: 1.35rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                    <div style="flex: 1;">
                      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
                        <span class="badge badge-primary">${note.branch} • Sem ${note.semester}</span>
                        <span class="badge badge-secondary">${note.subjectCode}</span>
                        <span class="badge badge-info">${note.resourceType}</span>
                        <span class="badge badge-success">Free Download</span>
                      </div>

                      <a href="/notes/${note.id}" data-link>
                        <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem;">
                          ${note.title}
                        </h3>
                      </a>

                      <p style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
                        ${note.description}
                      </p>

                      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; font-size: 0.75rem; color: var(--text-muted);">
                        <span style="display: flex; align-items: center; gap: 0.25rem; color: #f59e0b; font-weight: 600;">
                          ${createIcon('star', 13, '#f59e0b')} ${note.rating} (${note.reviewsCount} reviews)
                        </span>
                        <span>👥 ${note.uploader} (${note.uploaderRole})</span>
                        <span>📄 ${note.pages} pages • ${note.fileSize}</span>
                        <span>📅 ${note.uploadDate}</span>
                      </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;">
                      <button class="btn btn-primary btn-sm notes-download-btn" data-id="${note.id}" style="min-width: 130px;">
                        ${createIcon('download', 14, '#fff')} Free Download
                      </button>
                      <a href="/notes/${note.id}" data-link class="btn btn-secondary btn-sm" style="min-width: 130px;">
                        Preview Document
                      </a>
                    </div>
                  </div>
                </div>

                ${idx === 1 ? renderAdSlot('notes-between') : ''}
              `).join('')}
            </div>
          `}
        </div>
      </div>

      <!-- Mobile Drawer -->
      ${renderFilterDrawer({ title: 'Filter Notes', contentHtml: filterFormHtml, isMobile: true })}

      <style>
        @media (max-width: 900px) {
          .notes-page-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: inline-flex !important; }
        }
      </style>
    </div>
  `;
}

export function bindNotesPageEvents(container) {
  // Search
  bindSearchBarEvents(container, 'notes-search-input', (val) => {
    const q = router.getQueryParams();
    const obj = Object.fromEntries(q.entries());
    obj.q = val;
    router.setQueryParams(obj);
  });

  // Sort
  const sortSelect = container.querySelector('#notes-sort-select');
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      const q = router.getQueryParams();
      const obj = Object.fromEntries(q.entries());
      obj.sort = e.target.value;
      router.setQueryParams(obj);
    };
  }

  // Filter dropdown changes
  container.querySelectorAll('.notes-filter-input').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const q = router.getQueryParams();
      const obj = Object.fromEntries(q.entries());
      obj[key] = sel.value;
      router.setQueryParams(obj);
    };
  });

  // Filter chip removal
  container.querySelectorAll('.filter-chip-remove').forEach(btn => {
    btn.onclick = () => {
      const key = btn.getAttribute('data-remove-key');
      const q = router.getQueryParams();
      const obj = Object.fromEntries(q.entries());
      delete obj[key];
      router.setQueryParams(obj);
    };
  });

  // Reset all
  const resetBtn = container.querySelector('#filter-reset-all-btn');
  const sidebarResetBtn = container.querySelector('#sidebar-reset-btn');
  const emptyClearBtn = container.querySelector('#notes-empty-clear-btn');
  [resetBtn, sidebarResetBtn, emptyClearBtn].forEach(b => {
    if (b) {
      b.onclick = () => router.navigate('/notes');
    }
  });

  // Free Download Action
  container.querySelectorAll('.notes-download-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const found = mockNotes.find(n => n.id === id);
      downloadNoticeNote = found;
      router.resolve();
      setTimeout(() => {
        downloadNoticeNote = null;
        router.resolve();
      }, 3500);
    };
  });

  // Mobile Filter Drawer toggle
  const openMobileBtn = container.querySelector('#notes-open-mobile-filter-btn');
  const mobileModal = container.querySelector('#mobile-filter-modal');
  const closeMobileBtn = container.querySelector('#mobile-filter-close-btn');
  const applyMobileBtn = container.querySelector('#mobile-filter-apply-btn');

  if (openMobileBtn && mobileModal) {
    openMobileBtn.onclick = () => { mobileModal.style.display = 'flex'; };
  }
  if (closeMobileBtn && mobileModal) {
    closeMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
  }
  if (applyMobileBtn && mobileModal) {
    applyMobileBtn.onclick = () => { mobileModal.style.display = 'none'; };
  }
}

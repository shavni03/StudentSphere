import { createIcon } from '../../icons.js';

export function renderFilterChips(chips = []) {
  if (!chips || chips.length === 0) return '';

  return `
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin: 0.75rem 0 1rem 0;">
      <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Active Filters:</span>
      ${chips.map(c => `
        <span class="filter-chip">
          <span>${c.label}</span>
          <button class="filter-chip-remove" data-remove-key="${c.key}" aria-label="Remove filter">
            ${createIcon('x', 12, 'currentColor')}
          </button>
        </span>
      `).join('')}
      <button id="filter-reset-all-btn" class="btn-ghost btn-sm" style="font-size: 0.75rem; color: var(--danger); padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.25rem;">
        ${createIcon('rotateCcw', 12, 'currentColor')} Clear all
      </button>
    </div>
  `;
}

export function renderFilterDrawer({ title = 'Filters', contentHtml, isMobile = false }) {
  if (isMobile) {
    return `
      <div id="mobile-filter-modal" class="modal-backdrop" style="z-index: 1500; display: none;">
        <div style="position: fixed; bottom: 0; left: 0; right: 0; max-height: 85vh; background: #111827; border-top: 1px solid var(--border-medium); border-top-left-radius: 20px; border-top-right-radius: 20px; padding: 1.25rem; display: flex; flex-direction: column; box-shadow: 0 -10px 40px rgba(0,0,0,0.8); overflow-y: auto;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('sliders', 18, 'var(--primary)')}
              <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff;">${title}</h3>
            </div>
            <button id="mobile-filter-close-btn" class="btn-icon btn-ghost">
              ${createIcon('x', 20, 'currentColor')}
            </button>
          </div>
          <div style="flex: 1; overflow-y: auto; margin-bottom: 1.25rem;">
            ${contentHtml}
          </div>
          <div style="display: flex; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
            <button id="mobile-filter-reset-btn" class="btn btn-secondary" style="flex: 1;">
              ${createIcon('rotateCcw', 15, 'currentColor')} Reset
            </button>
            <button id="mobile-filter-apply-btn" class="btn btn-primary" style="flex: 2;">
              ${createIcon('check', 15, 'currentColor')} Apply Filters
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <aside class="desktop-filter-sidebar card" style="padding: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          ${createIcon('sliders', 18, 'var(--primary)')}
          <h3 style="font-size: 1rem; font-weight: 700; color: #fff;">${title}</h3>
        </div>
        <button id="sidebar-reset-btn" class="btn-ghost btn-sm" style="font-size: 0.75rem; color: var(--text-muted);">
          Reset
        </button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${contentHtml}
      </div>
    </aside>
  `;
}

/**
 * AdSlot Component (Vanilla JS)
 * Google AdSense Ready Component complying with clean advertising rules:
 * - Placements: home-top, home-middle, notes-sidebar, notes-between, jobs-sidebar, jobs-between, footer, mobile-banner
 * - Non-misleading, no fake ads, never in auth forms or admin overlays.
 */

const PLACEMENT_DIMENSIONS = {
  'home-top': { minHeight: '90px', label: 'Sponsored Partner • Top Banner' },
  'home-middle': { minHeight: '110px', label: 'Career & Learning Sponsor' },
  'notes-sidebar': { minHeight: '260px', label: 'Academic Sponsor' },
  'notes-between': { minHeight: '95px', label: 'Campus Partner' },
  'jobs-sidebar': { minHeight: '260px', label: 'Hiring Platform Partner' },
  'jobs-between': { minHeight: '95px', label: 'Featured Employer Sponsor' },
  'footer': { minHeight: '90px', label: 'StudentSphere Community Sponsor' },
  'mobile-banner': { minHeight: '50px', label: 'Partner' }
};

export function renderAdSlot(placement = 'home-middle', _slotId = null) {
  const config = PLACEMENT_DIMENSIONS[placement] || PLACEMENT_DIMENSIONS['home-middle'];

  return `
    <aside class="ad-slot-container" aria-label="Advertisement container" style="min-height: ${config.minHeight}">
      <div class="ad-slot-label">${config.label}</div>
      <div class="ad-slot-box" style="min-height: calc(${config.minHeight} - 28px)">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; opacity: 0.75; padding: 12px; text-align: center;">
          <span style="font-size: 0.72rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted);">
            Reserved Sponsor Placement (${placement})
          </span>
          <span style="font-size: 0.7rem; color: var(--text-dim);">
            StudentSphere Clean Ads Network • Google AdSense Compliant
          </span>
        </div>
      </div>
    </aside>
  `;
}

/**
 * StudentSphere AdSense Ad Slot System
 * 
 * Strict Compliance Rules:
 * - Never place ads inside login forms, on download buttons, or inside admin dashboard.
 * - Ad containers display clean developer placeholders when unconfigured, never fake ads.
 * - Supports 11 standard placements:
 *   1. home-top
 *   2. home-middle
 *   3. notes-sidebar
 *   4. notes-content
 *   5. pyqs-content
 *   6. jobs-sidebar
 *   7. jobs-content
 *   8. placements-content
 *   9. interviews-content
 *   10. footer
 *   11. mobile
 */

export const ADSENSE_CONFIG = {
  clientId: import.meta.env.VITE_ADSENSE_CLIENT_ID || '', // Configured via .env: VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
  slots: {
    'home-top': import.meta.env.VITE_ADSENSE_SLOT_HOME_TOP || 'ADSENSE_SLOT_HOME_TOP',
    'home-middle': import.meta.env.VITE_ADSENSE_SLOT_HOME_MIDDLE || 'ADSENSE_SLOT_HOME_MIDDLE',
    'notes-sidebar': import.meta.env.VITE_ADSENSE_SLOT_NOTES_SIDEBAR || 'ADSENSE_SLOT_NOTES_SIDEBAR',
    'notes-content': import.meta.env.VITE_ADSENSE_SLOT_NOTES_CONTENT || 'ADSENSE_SLOT_NOTES_CONTENT',
    'pyqs-content': import.meta.env.VITE_ADSENSE_SLOT_PYQS_CONTENT || 'ADSENSE_SLOT_PYQS_CONTENT',
    'jobs-sidebar': import.meta.env.VITE_ADSENSE_SLOT_JOBS_SIDEBAR || 'ADSENSE_SLOT_JOBS_SIDEBAR',
    'jobs-content': import.meta.env.VITE_ADSENSE_SLOT_JOBS_CONTENT || 'ADSENSE_SLOT_JOBS_CONTENT',
    'placements-content': import.meta.env.VITE_ADSENSE_SLOT_PLACEMENTS_CONTENT || 'ADSENSE_SLOT_PLACEMENTS_CONTENT',
    'interviews-content': import.meta.env.VITE_ADSENSE_SLOT_INTERVIEWS_CONTENT || 'ADSENSE_SLOT_INTERVIEWS_CONTENT',
    'footer': import.meta.env.VITE_ADSENSE_SLOT_FOOTER || 'ADSENSE_SLOT_FOOTER',
    'mobile': import.meta.env.VITE_ADSENSE_SLOT_MOBILE || 'ADSENSE_SLOT_MOBILE'
  }
};

const PLACEMENT_METADATA = {
  'home-top': { minHeight: '90px', label: 'Advertisement' },
  'home-middle': { minHeight: '110px', label: 'Advertisement' },
  'notes-sidebar': { minHeight: '250px', label: 'Advertisement' },
  'notes-content': { minHeight: '90px', label: 'Advertisement' },
  'pyqs-content': { minHeight: '90px', label: 'Advertisement' },
  'jobs-sidebar': { minHeight: '250px', label: 'Advertisement' },
  'jobs-content': { minHeight: '90px', label: 'Advertisement' },
  'placements-content': { minHeight: '90px', label: 'Advertisement' },
  'interviews-content': { minHeight: '90px', label: 'Advertisement' },
  'footer': { minHeight: '90px', label: 'Advertisement' },
  'mobile': { minHeight: '50px', label: 'Advertisement' }
};

/**
 * Render AdSlot HTML container
 * @param {string} placement One of the 11 recognized placement IDs
 */
export function renderAdSlot(placement = 'home-middle') {
  const meta = PLACEMENT_METADATA[placement] || { minHeight: '90px', label: 'Advertisement' };
  const isAdSenseConfigured = Boolean(ADSENSE_CONFIG.clientId && ADSENSE_CONFIG.clientId.trim() !== '');
  const slotId = ADSENSE_CONFIG.slots[placement] || `ADSENSE_SLOT_${placement.toUpperCase().replace(/-/g, '_')}`;

  if (isAdSenseConfigured) {
    // Production Google AdSense Tag
    return `
      <div class="ad-slot-container" aria-label="Advertisement" style="min-height: ${meta.minHeight}; margin: 1.5rem auto; text-align: center; overflow: hidden;">
        <span class="ad-slot-label" style="display: block; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); margin-bottom: 4px;">
          ${meta.label}
        </span>
        <ins class="adsbygoogle"
             style="display:block; min-height: calc(${meta.minHeight} - 20px)"
             data-ad-client="${ADSENSE_CONFIG.clientId}"
             data-ad-slot="${slotId}"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    `;
  }

  // Developer-only compliant placeholder (clearly labeled as unconfigured placement)
  return `
    <aside class="ad-slot-container" aria-label="Advertisement area" style="min-height: ${meta.minHeight}; margin: 1.5rem auto; border: 1px dashed var(--border-medium); border-radius: var(--radius-md); padding: 12px; background: rgba(0, 0, 0, 0.02); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
      <span style="font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim);">
        ${meta.label} Space (${placement})
      </span>
      <span style="font-size: 0.72rem; color: var(--text-muted); max-width: 440px;">
        Google AdSense placement ready • Awaiting publisher configuration (${slotId})
      </span>
    </aside>
  `;
}

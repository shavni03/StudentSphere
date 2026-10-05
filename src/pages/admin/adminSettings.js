import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';

export function renderAdminSettingsPage() {
  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">System Architecture & Platform Policies</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Core configuration for notification integrations, zero-credit rules, and ad network toggles.
      </p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 800px;">
      <!-- Free Downloads Locked Rule -->
      <div class="card" style="padding: 1.5rem; border-left: 4px solid #10b981;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">Universal 0-Credit Download Rule</h4>
            <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.3rem;">
              Enforces that students can download all lecture handouts, handwritten notes, and past examination papers without any credit deduction.
            </p>
          </div>
          <span class="badge badge-success" style="font-size: 0.75rem;">PERMANENTLY LOCKED ON</span>
        </div>
      </div>

      <!-- Integrations Status -->
      <div class="card" style="padding: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1.25rem;">Backend Service Connectors</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">Resend Transactional Email API</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Secure server-side relay • Webhook endpoint: /api/v1/webhooks/resend</div>
            </div>
            <span class="badge badge-success">✓ Operational</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">Telegram Bot Webhook (@StudentSphereBot)</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Long-polling / webhook • Token isolated on backend</div>
            </div>
            <span class="badge badge-success">✓ Operational</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">Google AdSense Container</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Active placements: 8 • Ads forbidden in Auth & Admin</div>
            </div>
            <span class="badge badge-primary">Ready</span>
          </div>
        </div>
      </div>

      <!-- Storage & Cache -->
      <div class="card" style="padding: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Maintenance Controls</h4>
        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-outline" style="font-size: 0.8rem;" onclick="alert('Application cache cleared!')">
            Purge Edge Cache
          </button>
          <button class="btn btn-outline" style="font-size: 0.8rem; color: #fca5a5; border-color: rgba(239, 68, 68, 0.3);" onclick="alert('Maintenance mode simulated.')">
            Trigger Scheduled Maintenance
          </button>
        </div>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'settings', 'Platform Policy & Integrations Settings', 'Manage backend connectors, free download locks, and security policies');
}

export function bindAdminSettingsEvents(container) {
  bindAdminLayoutEvents(container);
}

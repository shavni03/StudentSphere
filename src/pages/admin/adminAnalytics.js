import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';

export function renderAdminAnalyticsPage() {
  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Platform Growth & Channel Engagement</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Key telemetry metrics covering free downloads, Telegram pairing activations, and student retention.
      </p>
    </div>

    <!-- Analytics Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
      <div class="card" style="padding: 1.5rem;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Free Downloads</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #10b981; margin-top: 0.3rem;">148,240</div>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.3rem;">0 Credits deducted across all downloads</p>
      </div>

      <div class="card" style="padding: 1.5rem;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Telegram Bot Users</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #38bdf8; margin-top: 0.3rem;">3,820 Connected</div>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.3rem;">89.4% paired via one-time codes</p>
      </div>

      <div class="card" style="padding: 1.5rem;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Resend Email Open Rate</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #818cf8; margin-top: 0.3rem;">68.4%</div>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.3rem;">Job alerts & placement announcements</p>
      </div>

      <div class="card" style="padding: 1.5rem;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Academic Contributors</span>
        <div style="font-size: 1.85rem; font-weight: 800; color: #f59e0b; margin-top: 0.3rem;">1,420 Students</div>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.3rem;">Uploaded verified notes & PYQs</p>
      </div>
    </div>

    <!-- Growth Charts Simulation -->
    <div class="card" style="padding: 1.75rem;">
      <h4 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1.25rem;">
        Daily Notification Deliveries by Channel (Last 7 Days)
      </h4>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.3rem;">
            <span style="color: #fff;">🌐 In-App Website Notifications</span>
            <span style="color: #6366f1; font-weight: 700;">18,400 delivered (100%)</span>
          </div>
          <div style="height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden;">
            <div style="width: 100%; height: 100%; background: #6366f1;"></div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.3rem;">
            <span style="color: #fff;">📧 Resend Transactional Emails</span>
            <span style="color: #10b981; font-weight: 700;">14,250 delivered (99.8%)</span>
          </div>
          <div style="height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden;">
            <div style="width: 82%; height: 100%; background: #10b981;"></div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.3rem;">
            <span style="color: #fff;">✈️ Telegram Bot Alerts</span>
            <span style="color: #38bdf8; font-weight: 700;">12,980 delivered (99.4%)</span>
          </div>
          <div style="height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden;">
            <div style="width: 74%; height: 100%; background: #38bdf8;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'analytics', 'Growth & Channel Analytics', 'System-wide telemetry and delivery metrics');
}

export function bindAdminAnalyticsEvents(container) {
  bindAdminLayoutEvents(container);
}

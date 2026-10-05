import { appState } from '../state.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';

let isModalOpen = false;
let currentCode = '';
let copiedNotice = false;

const categories = [
  { key: 'jobAlerts', label: 'Job Alerts', desc: 'New internships, full-time openings, and deadline reminders' },
  { key: 'placementAlerts', label: 'Placement Alerts', desc: 'On-campus drive dates, shortlists, and eligibility notices' },
  { key: 'academicUpdates', label: 'Academic Updates', desc: 'Verified notes approval, syllabus revisions, and exam dates' },
  { key: 'interviewUpdates', label: 'Interview Updates', desc: 'New verified company interview rounds and question breakdowns' },
  { key: 'creditUpdates', label: 'Credit Updates', desc: 'Credits rewarded for uploads, peer downloads, and badges' },
  { key: 'announcements', label: 'Announcements', desc: 'University notifications, hackathons, and platform updates' },
  { key: 'securityAlerts', label: 'Security Alerts', desc: 'New logins, password updates, and session verifications (Required)' }
];

export function renderNotificationPreferencesPage() {
  const prefs = appState.preferences;
  const tg = appState.telegram;
  const user = appState.currentUser;

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem; max-width: 1000px;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 1.85rem; font-weight: 800;">Notification & Channel Preferences</h1>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
          Configure which channels (Website in-app, Email, Telegram Bot) deliver your real-time alerts.
        </p>
      </div>

      <!-- Telegram Bot Integration Card -->
      <section class="card" style="margin-bottom: 2rem; padding: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: ${tg.isConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(14, 165, 233, 0.15)'}; border: 1px solid ${tg.isConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(14, 165, 233, 0.3)'}; display: flex; align-items: center; justify-content: center;">
              ${createIcon('send', 24, tg.isConnected ? '#10b981' : '#38bdf8')}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff;">Telegram Bot Integration</h3>
                ${tg.isConnected ? `
                  <span class="badge badge-success">✓ Connected</span>
                ` : `
                  <span class="badge badge-secondary">Not Connected</span>
                `}
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.2rem;">
                ${tg.isConnected ? `
                  Linked to Telegram account: <strong style="color: #fff;">${tg.username || '@student'}</strong>. Instant message delivery active.
                ` : `
                  Receive immediate push notifications on Telegram without app installs or SMS bottlenecks.
                `}
              </p>
            </div>
          </div>

          <div>
            ${tg.isConnected ? `
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <a href="#channel-table" class="btn btn-secondary btn-sm">Notification Settings</a>
                <button id="tg-disconnect-btn" class="btn btn-danger btn-sm">Disconnect</button>
              </div>
            ` : `
              <button id="tg-connect-trigger-btn" class="btn btn-primary btn-sm" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);">
                ${createIcon('send', 15, '#fff')} Connect Telegram
              </button>
            `}
          </div>
        </div>

        <!-- Telegram Preference Summary -->
        ${tg.isConnected ? `
          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); font-size: 0.8rem; color: var(--text-muted); display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
            <span style="font-weight: 600; color: var(--text-secondary);">Telegram Push Subscriptions:</span>
            <span class="badge badge-primary">Job Alerts: ${prefs.jobAlerts?.telegram ? 'ON' : 'OFF'}</span>
            <span class="badge badge-primary">Placement: ${prefs.placementAlerts?.telegram ? 'ON' : 'OFF'}</span>
            <span class="badge badge-primary">Interviews: ${prefs.interviewUpdates?.telegram ? 'ON' : 'OFF'}</span>
            <span class="badge badge-secondary">Academic: ${prefs.academicUpdates?.telegram ? 'ON' : 'OFF'}</span>
          </div>
        ` : ''}
      </section>

      <!-- Transactional Email (Resend Ready) Card -->
      <section class="card" style="margin-bottom: 2rem; padding: 1.25rem 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(99, 102, 241, 0.12); display: flex; align-items: center; justify-content: center;">
              ${createIcon('mail', 22, 'var(--primary)')}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h3 style="font-size: 1rem; font-weight: 700; color: #fff;">Transactional Email Engine (Resend)</h3>
                <span class="badge badge-success">Verified: ${user.email}</span>
              </div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                Dispatched securely via backend REST endpoints. Resend private API credentials never leak to the client.
              </p>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-dim); text-align: right;">
            Abstraction: <code style="color: #818cf8; font-family: var(--font-mono);">notificationApi.sendEmailNotification()</code>
          </div>
        </div>
      </section>

      <!-- Channels Preference Matrix Table -->
      <section class="card" id="channel-table" style="padding: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.25rem; fontWeight: 700; color: #fff;">Notification Channels Matrix</h2>
            <p style="font-size: 0.8125rem; color: var(--text-secondary);">
              Toggle delivery channels across all StudentSphere alert categories.
            </p>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th style="width: 46%;">Notification Category</th>
                <th style="text-align: center; width: 18%;">🌐 Website</th>
                <th style="text-align: center; width: 18%;">✉️ Email (Resend)</th>
                <th style="text-align: center; width: 18%;">✈️ Telegram</th>
              </tr>
            </thead>
            <tbody>
              ${categories.map(cat => {
                const p = prefs[cat.key] || { website: true, email: true, telegram: false };
                const isSec = cat.key === 'securityAlerts';

                return `
                  <tr>
                    <td>
                      <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">${cat.label}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">${cat.desc}</div>
                    </td>

                    <!-- Website -->
                    <td style="text-align: center;">
                      <label class="switch">
                        <input type="checkbox" class="pref-toggle" data-cat="${cat.key}" data-ch="website" ${p.website ? 'checked' : ''} ${isSec ? 'disabled' : ''}>
                        <span class="slider"></span>
                      </label>
                      ${isSec ? '<div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 2px;">Required</div>' : ''}
                    </td>

                    <!-- Email -->
                    <td style="text-align: center;">
                      <label class="switch">
                        <input type="checkbox" class="pref-toggle" data-cat="${cat.key}" data-ch="email" ${p.email ? 'checked' : ''} ${isSec ? 'disabled' : ''}>
                        <span class="slider"></span>
                      </label>
                      ${isSec ? '<div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 2px;">Required</div>' : ''}
                    </td>

                    <!-- Telegram -->
                    <td style="text-align: center;">
                      <label class="switch">
                        <input type="checkbox" class="pref-toggle" data-cat="${cat.key}" data-ch="telegram" ${p.telegram ? 'checked' : ''} ${!tg.isConnected ? 'disabled' : ''}>
                        <span class="slider"></span>
                      </label>
                      ${!tg.isConnected ? '<div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 2px;">Unlinked</div>' : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div style="margin-top: 1.25rem; padding: 0.85rem 1rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.75rem; font-size: 0.785rem; color: var(--text-secondary);">
          ${createIcon('shield', 20, 'var(--primary)')}
          <span>
            <strong>Account Security Policy:</strong> Security notifications (password changes, suspicious sessions) cannot be disabled on Website and Email channels.
          </span>
        </div>
      </section>

      <!-- Telegram Pairing Modal -->
      ${isModalOpen ? `
        <div id="tg-modal-backdrop" class="modal-backdrop">
          <div class="modal-card" style="padding: 1.75rem;" onclick="event.stopPropagation()">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(14, 165, 233, 0.15); display: flex; align-items: center; justify-content: center;">
                  ${createIcon('send', 22, '#38bdf8')}
                </div>
                <div>
                  <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff;">Connect StudentSphere Telegram Bot</h3>
                  <p style="font-size: 0.75rem; color: var(--text-secondary);">Pair with @StudentSphereBot in 3 easy steps</p>
                </div>
              </div>
              <button id="tg-modal-close-btn" class="btn-icon btn-ghost">
                ${createIcon('x', 20, 'currentColor')}
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
              <div style="padding: 0.85rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">Step 1: Open Bot on Telegram</div>
                <a href="https://t.me/StudentSphereBot?start=${currentCode}" target="_blank" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.25rem;">
                  ${createIcon('send', 14, '#38bdf8')} Open Telegram Bot (@StudentSphereBot) ${createIcon('externalLink', 12, 'currentColor')}
                </a>
              </div>

              <div style="padding: 0.85rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">Step 2: Send this one-time pairing code</div>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                  <code style="flex: 1; padding: 0.5rem 0.75rem; border-radius: 6px; background: #0b0f19; border: 1px solid var(--border-medium); color: #a5b4fc; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.05em;">
                    ${currentCode}
                  </code>
                  <button id="tg-copy-code-btn" class="btn btn-secondary btn-sm">
                    ${copiedNotice ? createIcon('check', 14, '#10b981') : createIcon('copy', 14, 'currentColor')} ${copiedNotice ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <form id="tg-verify-form" style="padding: 0.85rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">Step 3: Confirm your Telegram username</div>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                  <input type="text" id="tg-username-input" placeholder="@your_handle" required class="form-input" style="flex: 1;" />
                  <button type="submit" class="btn btn-primary">Verify & Link</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function bindNotificationPreferencesEvents(container) {
  // Toggle matrix changes
  container.querySelectorAll('.pref-toggle').forEach(input => {
    input.onchange = () => {
      const cat = input.getAttribute('data-cat');
      const ch = input.getAttribute('data-ch');
      const current = { ...appState.preferences };
      current[cat] = { ...current[cat], [ch]: input.checked };
      appState.updatePreferences(current);
    };
  });

  // Open Telegram Connect modal
  const openTgBtn = container.querySelector('#tg-connect-trigger-btn');
  if (openTgBtn) {
    openTgBtn.onclick = async () => {
      const tgStatus = await appState.generateTelegramCode();
      currentCode = tgStatus.pendingCode || 'SS_CONNECT_948271';
      isModalOpen = true;
      router.resolve();
    };
  }

  // Disconnect Telegram
  const disconnectTgBtn = container.querySelector('#tg-disconnect-btn');
  if (disconnectTgBtn) {
    disconnectTgBtn.onclick = async () => {
      await appState.disconnectTelegram();
      router.resolve();
    };
  }

  // Close Telegram modal
  const closeTgBtn = container.querySelector('#tg-modal-close-btn');
  if (closeTgBtn) {
    closeTgBtn.onclick = () => {
      isModalOpen = false;
      router.resolve();
    };
  }

  const modalBackdrop = container.querySelector('#tg-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.onclick = () => {
      isModalOpen = false;
      router.resolve();
    };
  }

  // Copy code
  const copyBtn = container.querySelector('#tg-copy-code-btn');
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(currentCode);
      copiedNotice = true;
      router.resolve();
      setTimeout(() => {
        copiedNotice = false;
        router.resolve();
      }, 2500);
    };
  }

  // Submit verification form
  const verifyForm = container.querySelector('#tg-verify-form');
  if (verifyForm) {
    verifyForm.onsubmit = async (e) => {
      e.preventDefault();
      const input = container.querySelector('#tg-username-input');
      const username = input ? input.value : '@student';
      await appState.connectTelegram(currentCode, username);
      isModalOpen = false;
      router.resolve();
    };
  }
}

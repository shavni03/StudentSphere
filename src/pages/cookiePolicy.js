import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderCookiePolicyPage() {
  const lastUpdated = 'October 2026';

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 4rem; max-width: 960px;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        <a href="/" data-link style="color: var(--text-muted); text-decoration: none;">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">Cookie Policy</span>
      </nav>

      <!-- Header -->
      <div style="margin-bottom: 2.5rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem;">
          ${createIcon('layers', 16, 'currentColor')} Browser Storage & Cookies
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); line-height: 1.2; margin-bottom: 0.5rem;">
          Cookie & Local Storage Policy
        </h1>
        <p style="font-size: 0.875rem; color: var(--text-muted);">
          Effective Date: ${lastUpdated} • Last Reviewed: ${lastUpdated}
        </p>
      </div>

      <!-- Content AdSlot -->
      ${renderAdSlot('notes-content')}

      <!-- Main Cookie Policy Body -->
      <div class="card" style="padding: 2.5rem; display: flex; flex-direction: column; gap: 2rem; line-height: 1.8; color: var(--text-secondary);">

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            1. What Are Cookies and Local Storage Technologies?
          </h2>
          <p>
            Cookies are small text files placed on your computer or mobile device by websites you visit. They are widely used to make websites work properly, improve user navigation, and provide aggregate reporting.
          </p>
          <p>
            In addition to cookies, modern web applications utilize browser <strong>Local Storage</strong> and <strong>Session Storage</strong> (Web Storage API) to persist user preferences such as your interface theme (Light or Dark mode) across browser refreshes without transmitting that data on every single network request.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            2. Categories of Storage Used on StudentSphere
          </h2>
          <p>We classify the storage mechanisms utilized or planned across StudentSphere into four distinct categories:</p>

          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1rem;">
            <!-- Category 1 -->
            <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
                ${createIcon('check', 18, '#10b981')} Strictly Essential & Functional Storage (Active)
              </h3>
              <p style="font-size: 0.9rem;">
                These technologies are required for core website functionality, allowing you to move around the platform and use secure features:
              </p>
              <ul style="margin-left: 1.5rem; font-size: 0.875rem; margin-top: 0.5rem;">
                <li><code>studentsphere_theme</code>: Saves your preferred interface theme (Light or Dark mode).</li>
                <li>Authentication Session Tokens (Firebase Auth): Retains your signed-in state across pages securely.</li>
                <li>Notification State: Tracks locally dismissed alerts and unread counts for fast UI responsiveness.</li>
              </ul>
            </div>

            <!-- Category 2 -->
            <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
                ${createIcon('star', 18, '#f59e0b')} Advertising & Google AdSense Cookies (Ready / Configurable)
              </h3>
              <p style="font-size: 0.9rem;">
                To keep all academic notes, previous year exam papers, and placement debriefs 100% free forever for all university students, StudentSphere integrates with Google AdSense:
              </p>
              <ul style="margin-left: 1.5rem; font-size: 0.875rem; margin-top: 0.5rem;">
                <li>Google and its third-party vendors use cookies to serve ads based on prior visits to our site or other websites.</li>
                <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to StudentSphere and/or other sites on the Internet.</li>
                <li>You may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">Ads Settings</a>.</li>
              </ul>
            </div>

            <!-- Category 3 -->
            <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
                ${createIcon('shield', 18, '#6366f1')} Analytics Cookies (Planned / Optional)
              </h3>
              <p style="font-size: 0.9rem;">
                Aggregated, anonymized performance measurement cookies that help us understand which notes and PYQs are most helpful, identify broken links, and measure page load speed across devices.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            3. Transparency Statement on Implemented Services
          </h2>
          <p>
            In strict compliance with AdSense publisher guidelines and fair disclosure standards, we distinguish active features from upcoming integrations:
          </p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><strong>Active Today:</strong> Theme persistence (<code>localStorage</code>), frontend routing state, and client-side session representations.</li>
            <li><strong>Backend & Publisher Ready:</strong> Firebase token validation, Google AdSense tag loader (activated upon publisher client ID configuration), and server-side session cookies.</li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            4. Managing Your Cookie Choices
          </h2>
          <p>
            Most modern web browsers allow you to control cookies through their settings preferences:
          </p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>You can set your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
            <li>You can clear existing cookies and local storage from your browser's history or developer tools at any time.</li>
            <li>To opt out of third-party vendor interest-based advertising cookies, visit <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">www.aboutads.info/choices</a> or <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">www.youronlinechoices.eu</a>.</li>
          </ul>
          <p style="margin-top: 0.5rem;">
            Please note that blocking essential cookies may affect the ability to maintain a persistent logged-in session.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            5. Contact Information
          </h2>
          <p>
            If you have questions about our use of cookies or browser storage technologies, please contact our team:
          </p>
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 0.75rem;">
            <div><strong>StudentSphere Technical & Privacy Desk</strong></div>
            <div>Email: <a href="mailto:privacy@studentsphere.internal" style="color: var(--primary);">privacy@studentsphere.internal</a></div>
            <div>Support Portal: <a href="/contact" data-link style="color: var(--primary);">studentsphere.internal/contact</a></div>
          </div>
        </section>
      </div>
    </div>
  `;
}

import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderPrivacyPage() {
  const lastUpdated = 'October 2026';

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 4rem; max-width: 960px;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        <a href="/" data-link style="color: var(--text-muted); text-decoration: none;">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">Privacy Policy</span>
      </nav>

      <!-- Header -->
      <div style="margin-bottom: 2.5rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem;">
          ${createIcon('shield', 16, 'currentColor')} Data Protection & Transparency
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); line-height: 1.2; margin-bottom: 0.5rem;">
          Privacy Policy
        </h1>
        <p style="font-size: 0.875rem; color: var(--text-muted);">
          Effective Date: ${lastUpdated} • Last Reviewed: ${lastUpdated}
        </p>
      </div>

      <!-- Content AdSlot -->
      ${renderAdSlot('notes-content')}

      <!-- Main Policy Body -->
      <div class="card" style="padding: 2.5rem; display: flex; flex-direction: column; gap: 2rem; line-height: 1.8; color: var(--text-secondary);">
        
        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            1. Introduction & Overview
          </h2>
          <p>
            Welcome to StudentSphere ("we", "our", or "us"). We provide an open academic learning and career preparation platform designed to empower university students through shared lecture notes, previous year question papers (PYQs), placement debriefs, and real-time alerts.
          </p>
          <p>
            This Privacy Policy explains how we collect, process, store, and safeguard your personal information when you visit our website, register an account, or contribute educational materials. We are committed to transparency and clarity regarding which features are currently operational and which represent planned backend capabilities.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            2. Information We Collect
          </h2>
          <p>We may collect information directly from you or automatically during your interaction with the platform:</p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li>
              <strong>Account Information:</strong> When you register on StudentSphere, we request your full name, student or institutional email address, academic department/branch, graduation year, and a secure password.
            </li>
            <li>
              <strong>Firebase Authentication:</strong> We utilize Google Firebase Authentication for account identity. Firebase collects your email address, unique User ID (UID), sign-in timestamps, and IP addresses to prevent unauthorized access and credential abuse.
            </li>
            <li>
              <strong>Email Verification Data:</strong> To guarantee community trustworthiness and reduce disposable accounts, email verification status is recorded. Access to uploading and administrative operations requires verified email credentials.
            </li>
            <li>
              <strong>User-Generated Content (UGC):</strong> Information you submit when contributing lecture notes, PYQs with solutions, syllabus roadmaps, and interview experiences. This includes file metadata (subject, course code, university, branch, semester) and any commentary provided.
            </li>
            <li>
              <strong>Device & Telemetry Information:</strong> Browser type, operating system, preferred language, theme preferences (light/dark mode stored locally), and standard server access logs.
            </li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            3. File Storage & Cloud Data Architecture
          </h2>
          <p>To deliver fast academic downloads while maintaining security, our planned infrastructure divides responsibilities across specialized providers:</p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li>
              <strong>Cloudinary File Storage (Planned):</strong> Uploaded PDF documents, handwritten notes, and solution scans will be securely stored on Cloudinary via signed backend upload signatures. Frontend clients never hold master administrative API secrets.
            </li>
            <li>
              <strong>Supabase Database (Planned):</strong> Structured metadata (courses, subjects, PYQ years, user credit ledgers, moderation flags, company placement debriefs) will be stored in PostgreSQL via Supabase using Row-Level Security (RLS). Direct database access credentials remain strictly server-side.
            </li>
            <li>
              <strong>Local Browser Storage (Current):</strong> For frontend responsiveness, non-sensitive preferences such as your UI theme choice (light/dark) and temporary mock session flags are retained in your browser's <code>localStorage</code>.
            </li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            4. Multi-Channel Notifications (Email & Telegram)
          </h2>
          <p>StudentSphere provides an optional multi-channel notification architecture:</p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li>
              <strong>Email Notifications:</strong> We utilize transactional email services (such as Resend) to send account verification links, password reset tokens, and notifications when your submitted study resources are approved. You can adjust email digest settings from your notification preferences.
            </li>
            <li>
              <strong>Telegram Bot Notifications:</strong> If you optionally connect your Telegram account by providing your Telegram Chat ID, our notification bot dispatches real-time alerts for newly published off-campus hiring drives and exam handouts. You can disconnect your Telegram handle at any time.
            </li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            5. Cookies, Analytics & Advertising (Google AdSense)
          </h2>
          <p>
            StudentSphere is committed to high-trust, respectful browsing. We do not engage in aggressive tracking or deceptive advertising:
          </p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li>
              <strong>Essential Cookies:</strong> Cookies and local browser tokens required to maintain authentication sessions and security state.
            </li>
            <li>
              <strong>Google AdSense & Third-Party Vendors:</strong> In order to keep academic handouts and past examination papers 100% free for all students, StudentSphere uses or plans to use Google AdSense and affiliated advertising partners to display non-intrusive advertisements.
            </li>
            <li>
              <strong>AdSense Cookie Notice:</strong> Google uses cookies (such as the DoubleClick cookie) to serve ads based on your visits to this and other websites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">Google Ad Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">aboutads.info</a>.
            </li>
            <li>
              <strong>Ad Placement Integrity:</strong> In strict compliance with Google AdSense Policies, advertisements are clearly separated from download buttons, navigation elements, and login forms. No ads appear on admin pages or inside interactive modals.
            </li>
          </ul>
          <p style="margin-top: 0.75rem;">
            For comprehensive details on managing your preferences, please consult our dedicated <a href="/cookie-policy" data-link style="color: var(--primary);">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            6. How We Protect Your Data (Security)
          </h2>
          <p>
            We implement security safeguards designed to protect personal information from loss, theft, misuse, and unauthorized access:
          </p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li>All client-to-server communications utilize encrypted Transport Layer Security (HTTPS/TLS).</li>
            <li>Passwords are hashed via cryptographic algorithms handled through Google Firebase; plaintext passwords are never visible to administrators.</li>
            <li>Zero frontend exposure of sensitive keys: Cloudinary secrets, Supabase service roles, Resend API keys, and Telegram bot tokens remain strictly secured within backend environments.</li>
            <li>Role-Based Access Control (RBAC): Administrative dashboards and moderation interfaces are restricted to verified personnel.</li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            7. Data Retention & Your Rights
          </h2>
          <p>
            We retain account data for as long as your account remains active. Academic notes and PYQs published under creative or open student licenses remain available to the student community unless removed following a verified takedown request.
          </p>
          <p>Depending on your jurisdiction, you have the following rights regarding your personal information:</p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li><strong>Access:</strong> The right to request a copy of the personal information we hold about you.</li>
            <li><strong>Correction:</strong> The right to update or rectify inaccurate profile information.</li>
            <li><strong>Deletion:</strong> The right to request the deletion of your account and personal identifiers.</li>
            <li><strong>Objection:</strong> The right to opt out of promotional digests or personalized advertisements.</li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            8. Policy Updates & Contact Information
          </h2>
          <p>
            We may periodically revise this Privacy Policy to reflect platform enhancements, legal obligations, or service provider updates. Revisions will be published on this page with a revised effective date.
          </p>
          <p>
            If you have questions, feedback, or concerns regarding your privacy on StudentSphere, please contact our privacy coordinator:
          </p>
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 0.75rem;">
            <div><strong>StudentSphere Privacy Office</strong></div>
            <div>Email: <a href="mailto:privacy@studentsphere.internal" style="color: var(--primary);">privacy@studentsphere.internal</a></div>
            <div>Contact Form: <a href="/contact" data-link style="color: var(--primary);">studentsphere.internal/contact</a></div>
          </div>
        </section>
      </div>
    </div>
  `;
}

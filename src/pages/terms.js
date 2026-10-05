import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderTermsPage() {
  const lastUpdated = 'October 2026';

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 4rem; max-width: 960px;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        <a href="/" data-link style="color: var(--text-muted); text-decoration: none;">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">Terms & Conditions</span>
      </nav>

      <!-- Header -->
      <div style="margin-bottom: 2.5rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem;">
          ${createIcon('fileText', 16, 'currentColor')} Legal Agreement & Platform Rules
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); line-height: 1.2; margin-bottom: 0.5rem;">
          Terms & Conditions of Service
        </h1>
        <p style="font-size: 0.875rem; color: var(--text-muted);">
          Effective Date: ${lastUpdated} • Last Reviewed: ${lastUpdated}
        </p>
      </div>

      <!-- Content AdSlot -->
      ${renderAdSlot('notes-content')}

      <!-- Main Terms Body -->
      <div class="card" style="padding: 2.5rem; display: flex; flex-direction: column; gap: 2rem; line-height: 1.8; color: var(--text-secondary);">

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using StudentSphere ("Platform", "we", "us"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not access or use the Platform.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            2. Account Registration & Security
          </h2>
          <p>
            When creating an account, you must provide accurate, current, and complete information. You are responsible for safeguarding your credentials and for all activities occurring under your account. You must immediately notify us of any unauthorized use or security breach.
          </p>
          <p>
            StudentSphere requires email verification before granting access to contribute study materials or utilize advanced services. Creation of automated, disposable, or fraudulent accounts is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            3. Free Academic Downloads Guarantee
          </h2>
          <p>
            All academic study resources, handwritten lecture notes, formula sheets, and previous year university examination papers (PYQs) published on StudentSphere are <strong>100% free to download</strong>.
          </p>
          <p>
            We do <strong>not</strong> require payments, subscriptions, or credit deductions to access educational handouts. Reputation credits are earned exclusively through approved academic contributions and serve solely for community standing.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            4. User-Generated Content & Copyright Responsibility
          </h2>
          <p>
            Users may contribute academic notes, past examination papers, syllabus breakdowns, and interview debriefs. By uploading content to StudentSphere, you represent and warrant that:
          </p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li>You own the material or hold explicit authorization or legal rights to share it under educational fair use.</li>
            <li>The content does not infringe copyright, trademark, trade secret, or privacy rights of any third party.</li>
            <li>The content is accurate, non-misleading, and relates directly to university education or legitimate career preparation.</li>
          </ul>
        </section>

        <section style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-md); padding: 1.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #ef4444; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
            ${createIcon('shieldAlert', 20, '#ef4444')} 5. Prohibited Uploads & Content Violations
          </h2>
          <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem;">
            Uploading any of the following items will result in immediate content removal and permanent account suspension:
          </p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary);">
            <li><strong>Commercial Pirated Textbooks:</strong> Scanned copies or unauthorized digital editions of commercially published textbooks.</li>
            <li><strong>Paid Course Leaks:</strong> Proprietary slides, videos, or homework repositories leaked from paid commercial coaching platforms or bootcamps.</li>
            <li><strong>Confidential Assessment Material:</strong> Live/unreleased examination papers, unreleased test keys, or breach of non-disclosure agreements (NDAs).</li>
            <li><strong>Malicious Code or Software:</strong> Files containing viruses, keyloggers, Trojans, obfuscated scripts, or harmful URLs.</li>
            <li><strong>Private Personal Identifiers (PII):</strong> Personal contact numbers, residential addresses, grades, or private identifiers belonging to faculty, students, or recruiters without explicit consent.</li>
            <li><strong>Harassment, Hate Speech & Defamation:</strong> Unsubstantiated personal attacks directed at specific professors, interviewers, or classmates.</li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            6. Moderation, Admin Rights & Account Suspension
          </h2>
          <p>
            StudentSphere maintains human-in-the-loop editorial oversight. All uploads enter a <code>PENDING</code> moderation queue and are reviewed prior to publication.
          </p>
          <p>
            We reserve the right, at our sole discretion, to reject, modify, flag, or remove any resource that violates these Terms or our community guidelines. We may temporarily or permanently suspend accounts engaging in repeated copyright infringement, platform abuse, or submission of fraudulent information.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            7. Job Postings & Interview Debriefs
          </h2>
          <p>
            StudentSphere aggregates and publishes student-submitted information on internships, campus recruitment drives, and company interview debriefs. While we make reasonable efforts to curate verified information:
          </p>
          <ul style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <li>We do not guarantee hiring outcomes, interview calls, or the ongoing accuracy of third-party job vacancies.</li>
            <li>Students must independently verify company legitimacy and must never pay money to any party claiming to offer jobs or placements.</li>
            <li>Interview debriefs represent personal perspectives of student contributors and do not constitute official assessments by the hiring companies.</li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            8. Disclaimer of Warranties
          </h2>
          <p>
            The Platform and all educational materials are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. StudentSphere disclaims all warranties, including but not limited to merchantability, fitness for a particular academic purpose, non-infringement, or freedom from errors.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            9. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, StudentSphere and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the Platform, study materials, or external application links.
          </p>
        </section>

        <section>
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            10. Changes to Terms & Contact
          </h2>
          <p>
            We may modify these Terms at any time by updating this document. Your continued use of StudentSphere after changes are posted constitutes your acceptance of the updated Terms.
          </p>
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 0.75rem;">
            <div><strong>Questions Regarding Terms of Service?</strong></div>
            <div>Email: <a href="mailto:legal@studentsphere.internal" style="color: var(--primary);">legal@studentsphere.internal</a></div>
            <div>Contact Form: <a href="/contact?subject=General+Inquiry" data-link style="color: var(--primary);">studentsphere.internal/contact</a></div>
          </div>
        </section>
      </div>
    </div>
  `;
}

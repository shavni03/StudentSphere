import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderAboutPage() {
  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 4rem; max-width: 960px;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        <a href="/" data-link style="color: var(--text-muted); text-decoration: none;">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">About StudentSphere</span>
      </nav>

      <!-- Header Hero -->
      <div style="margin-bottom: 2.5rem; text-align: left;">
        <div style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem;">
          ${createIcon('graduationCap', 16, 'currentColor')} Peer-to-Peer Academic Ecosystem
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); line-height: 1.2; margin-bottom: 1rem;">
          Democratizing Higher Education & Career Readiness for Every Student
        </h1>
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; max-width: 820px;">
          StudentSphere is an open academic and career platform created to streamline student learning, semester examination prep, and campus placements through verified peer contributions and community moderation.
        </p>
      </div>

      <!-- Content AdSlot (Non-intrusive) -->
      ${renderAdSlot('notes-content')}

      <!-- Main Body Sections -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Section 1: What is StudentSphere? -->
        <article class="card" style="padding: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem;">
            ${createIcon('sparkles', 22, 'var(--primary)')} What is StudentSphere?
          </h2>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
            StudentSphere is an open-access collaborative hub engineered specifically for university students, educators, and aspiring software engineers. Higher education often suffers from fragmented study resources, gatekept previous year examination papers, inconsistent placement debriefs, and siloed campus opportunities. 
          </p>
          <p style="color: var(--text-secondary); line-height: 1.7;">
            We unite these essential pillars into a clean, searchable, and dependable platform where every academic download is completely free.
          </p>
        </article>

        <!-- Section 2: Platform Pillars -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('fileText', 20, '#6366f1')} Lecture Handouts & Notes
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              Curated notes, handwritten summaries, formulas, and syllabus checklists categorized by university, engineering branch, course code, and semester.
            </p>
          </div>

          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('layers', 20, '#06b6d4')} Previous Year Questions (PYQs)
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              University past examination papers with verified solutions and answer keys, enabling students to practice under authentic examination conditions.
            </p>
          </div>

          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('star', 20, '#f59e0b')} Placement Preparation
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              In-depth salary package statistics, eligibility criteria, interview rounds, and preparation roadmaps across top service and product companies.
            </p>
          </div>

          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('messageSquare', 20, '#ec4899')} Authentic Interview Debriefs
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              Real experiences contributed by seniors detailing online assessment questions, technical coding rounds, system design discussions, and HR tips.
            </p>
          </div>

          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('briefcase', 20, '#10b981')} Jobs & Internship Radar
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              Real-time directory of verified on-campus and off-campus internships, fresher openings, work-mode criteria, and direct application links.
            </p>
          </div>

          <div class="card" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon('send', 20, '#38bdf8')} Instant Multi-Channel Alerts
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              Stay notified via in-app alerts, institutional email summaries, and our official Telegram bot when fresh papers or job vacancies drop.
            </p>
          </div>
        </div>

        <!-- Section 3: Community Contributions & Human Moderation Concept -->
        <article id="moderation" class="card" style="padding: 2rem;">
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            ${createIcon('shield', 22, '#10b981')} Contribution Ethics & Human-in-the-Loop Moderation
          </h2>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
            Quality and authenticity are fundamental to StudentSphere. To safeguard academic integrity and prevent copyright violations, we do <strong>not</strong> support instantaneous, unmoderated public publishing of user uploads.
          </p>
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Our Multi-Tier Review Workflow:</div>
            <ol style="margin-left: 1.5rem; color: var(--text-secondary); line-height: 1.7; font-size: 0.9rem;">
              <li><strong>Student Upload:</strong> Contributor uploads original or authorized study handouts or an interview debrief with metadata.</li>
              <li><strong>Pending Review Queue:</strong> Upload enters an isolated review staging state invisible to the public directory.</li>
              <li><strong>Admin Quality & Copyright Screening:</strong> Moderators verify that the submission is free of copyright leaks, commercial pirated books, or spam.</li>
              <li><strong>Approval & Publication:</strong> Once verified, the resource is published publicly and the contributor receives recognition credits.</li>
              <li><strong>Community Reporting:</strong> Every published item features an active report modal allowing immediate flag submission for review.</li>
            </ol>
          </div>
          <p style="color: var(--text-secondary); line-height: 1.7;">
            Contributors receive recognition credits when their submissions are reviewed and approved. Credits serve as community reputation and do <strong>not</strong> restrict or gatekeep any learner from downloading resources for free.
          </p>
        </article>

        <!-- Section 4: Academic Disclaimer & Copyright Statement -->
        <article class="card" style="padding: 2rem;">
          <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            ${createIcon('shieldAlert', 22, '#f59e0b')} Academic Disclaimer & Fair Use
          </h2>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
            StudentSphere does not claim ownership of proprietary curricula, lecture slides, or official exam question papers produced by individual educational boards or universities. All trademarks, college logos, and company emblems mentioned belong to their respective proprietors and are referenced strictly under nominative fair use for identification and study purposes.
          </p>
          <p style="color: var(--text-secondary); line-height: 1.7;">
            If you are a copyright holder or university authority and believe any uploaded material infringes your intellectual property, please review our <a href="/terms" data-link style="color: var(--primary);">Terms & Conditions</a> and submit a takedown request via our <a href="/contact?subject=DMCA" data-link style="color: var(--primary);">Contact Page</a> for prompt resolution.
          </p>
        </article>

        <!-- Section 5: Get in Touch -->
        <div class="card" style="padding: 2rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%); border: 1px solid rgba(99, 102, 241, 0.2); text-align: center;">
          <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Have Questions, Feedback, or Ideas for Collaboration?
          </h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">
            Our team welcomes contributions from students, student club leads, university placement representatives, and campus ambassadors.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="/contact" data-link class="btn btn-primary">
              ${createIcon('send', 16, '#fff')} Contact Support Team
            </a>
            <a href="/uploads" data-link class="btn btn-outline">
              ${createIcon('fileText', 16, 'currentColor')} Share Notes or PYQs
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

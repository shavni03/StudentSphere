import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderFeaturesPage() {
  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 4rem; max-width: 960px;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        <a href="/" data-link style="color: var(--text-muted); text-decoration: none;">Home</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">Platform Features</span>
      </nav>

      <!-- Header -->
      <div style="margin-bottom: 2.5rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); color: var(--primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem;">
          ${createIcon('sparkles', 16, 'currentColor')} Comprehensive Student Platform
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); line-height: 1.2; margin-bottom: 1rem;">
          Features Built for University Students & Placement Aspirants
        </h1>
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; max-width: 780px;">
          StudentSphere combines verified academic study resources with authentic campus recruitment intelligence and real-time alerts.
        </p>
      </div>

      <!-- Top AdSlot -->
      ${renderAdSlot('home-top')}

      <!-- Feature Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
        
        <div class="card" style="padding: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            ${createIcon('fileText', 24, '#6366f1')}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Verified Lecture Handouts
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Topper-curated notes, typed PDF summaries, formulas, and syllabus checklists categorized by university branch, course code, and semester.
          </p>
          <span style="font-size: 0.8rem; color: #10b981; font-weight: 700;">100% Free Downloads (0 Credits)</span>
        </div>

        <div class="card" style="padding: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(6, 182, 212, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            ${createIcon('layers', 24, '#06b6d4')}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Solved Exam Papers (PYQs)
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            End-term and mid-term examination question papers across universities with step-by-step model solutions and weightage analysis.
          </p>
          <span style="font-size: 0.8rem; color: #10b981; font-weight: 700;">Instant PDF Access</span>
        </div>

        <div class="card" style="padding: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(236, 72, 153, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            ${createIcon('messageSquare', 24, '#ec4899')}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Authentic Interview Debriefs
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Actual coding rounds, system design questions, and HR tips shared by seniors who recently interviewed at top technology firms.
          </p>
          <span style="font-size: 0.8rem; color: #ec4899; font-weight: 700;">Round-by-Round Breakdown</span>
        </div>

        <div class="card" style="padding: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            ${createIcon('briefcase', 24, '#f59e0b')}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Job & Internship Radar
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Curated on-campus drives and verified off-campus hiring opportunities with transparent CTC, eligibility, and direct apply links.
          </p>
          <span style="font-size: 0.8rem; color: #f59e0b; font-weight: 700;">Verified Openings</span>
        </div>

        <div class="card" style="padding: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            ${createIcon('shield', 24, '#10b981')}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Human Moderation Workflow
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            User submissions transition through our review pipeline before going live, preventing copyright leaks and poor scans.
          </p>
          <span style="font-size: 0.8rem; color: #10b981; font-weight: 700;">Zero Piracy / Verified Content</span>
        </div>

        <div class="card" style="padding: 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(168, 85, 247, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            ${createIcon('bell', 24, '#a855f7')}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Multi-Channel Alerts
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Receive emergency exam notifications and placement updates via our In-App Notification Center, Email digests, and Telegram Bot.
          </p>
          <span style="font-size: 0.8rem; color: #a855f7; font-weight: 700;">Web • Email • Telegram</span>
        </div>
      </div>

      <!-- CTA -->
      <div class="card" style="margin-top: 3rem; padding: 2.5rem; text-align: center; background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%); border: 1px solid rgba(99, 102, 241, 0.25);">
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
          Ready to Elevate Your Academic Preparation?
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">
          Create your free StudentSphere student account today and access verified academic archives.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="/register" data-link class="btn btn-primary">
            Create Free Account
          </a>
          <a href="/login" data-link class="btn btn-outline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  `;
}

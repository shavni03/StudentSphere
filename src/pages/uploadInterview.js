import { CREDIT_CONFIG } from '../config/credits.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';

export function renderUploadInterviewPage() {
  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem; max-width: 860px;">
      <a href="/interviews" data-link class="btn btn-ghost btn-sm" style="margin-bottom: 1.25rem; display: inline-flex; align-items: center; gap: 0.35rem;">
        ${createIcon('arrowLeft', 16, 'currentColor')} Back to Interview Debriefs
      </a>

      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;">
          Share Your Interview Experience
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Help fellow college students prepare for technical rounds. Earn <strong>+${CREDIT_CONFIG.INTERVIEW_APPROVED} Credits</strong> upon approval!
        </p>
      </div>

      <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
        <form id="upload-interview-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Company Name *</label>
              <input type="text" id="inv-company" class="form-input" required placeholder="e.g. Google, Microsoft, Atlassian" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Job Role / Title *</label>
              <input type="text" id="inv-role" class="form-input" required placeholder="e.g. Software Engineer (L3) or Intern" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Hiring Channel *</label>
              <select id="inv-hiring-type" class="form-select">
                <option value="On-Campus">On-Campus Placement Drive</option>
                <option value="Off-Campus">Off-Campus Referral / Career Portal</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Graduation Batch Year</label>
              <input type="text" id="inv-batch" class="form-input" value="2026" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Interview Difficulty</label>
              <select id="inv-difficulty" class="form-select">
                <option value="Easy">Easy</option>
                <option value="Medium" selected>Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Outcome / Result *</label>
              <select id="inv-result" class="form-select">
                <option value="Accepted">Offer Received & Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="In-Progress">Awaiting Final Results</option>
              </select>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Debrief Summary *</label>
              <textarea id="inv-summary" class="form-textarea" rows="3" required placeholder="Brief overview of the interview process, timeline, and overall atmosphere..."></textarea>
            </div>

            <!-- Round Breakdown Section -->
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Round 1: Online Assessment / Screening</label>
              <textarea id="inv-round-1" class="form-textarea" rows="2" placeholder="Platform (HackerRank/LeetCode), number of coding questions, time limit, MCQ topics..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Round 2: Technical Interview 1 (DSA / Core)</label>
              <textarea id="inv-round-2" class="form-textarea" rows="2" placeholder="Specific DSA problems asked, tree/graph traversals, edge cases discussed..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Round 3: System Design / Projects / Tech 2</label>
              <textarea id="inv-round-3" class="form-textarea" rows="2" placeholder="Resume project deep dive, architectural choices, database questions..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Round 4: Behavioral & HR Questions</label>
              <textarea id="inv-round-4" class="form-textarea" rows="2" placeholder="STAR method questions, why this company, leadership examples..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Recommended Preparation Resources & Tips</label>
              <textarea id="inv-resources" class="form-textarea" rows="2" placeholder="Courses, books (e.g. Striver SDE sheet, NeetCode 150), or advice for juniors..."></textarea>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
            <a href="/interviews" data-link class="btn btn-ghost" style="color: var(--text-muted);">
              Cancel
            </a>
            <button type="submit" class="btn btn-primary" style="padding: 0.65rem 1.5rem;">
              Submit for Moderation (+${CREDIT_CONFIG.INTERVIEW_APPROVED} Cr)
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function bindUploadInterviewEvents(container) {
  const form = container.querySelector('#upload-interview-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      alert(`Interview debrief submitted! Upon moderation approval, +${CREDIT_CONFIG.INTERVIEW_APPROVED} Credits will be added to your account.`);
      router.navigate('/interviews');
    };
  }
}

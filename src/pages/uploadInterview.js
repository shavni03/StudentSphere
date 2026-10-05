import { CREDIT_CONFIG } from '../config/credits.js';
import { createIcon } from '../icons.js';

export function renderUploadInterviewPage() {
  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem; max-width: 860px;">
      <a href="/interviews" data-link class="btn btn-ghost btn-sm" style="margin-bottom: 1.25rem; display: inline-flex; align-items: center; gap: 0.35rem;">
        ${createIcon('arrowLeft', 16, 'currentColor')} Back to Interview Debriefs
      </a>

      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">
          Share Your Interview Experience
        </h1>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.4rem;">
          Help fellow college students prepare for technical and HR rounds. Earn <strong>+${CREDIT_CONFIG.INTERVIEW_APPROVED || 20} Credits</strong> upon human moderation approval!
        </p>
      </div>

      <!-- NDA & Community Guidelines Notice -->
      <div class="card" style="padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid #6366f1; background: rgba(99, 102, 241, 0.08);">
        <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
          <div style="margin-top: 2px;">
            ${createIcon('shield', 20, '#6366f1')}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
            <strong style="color: var(--text-primary); display: block; margin-bottom: 0.2rem;">Authentic & Responsible Sharing</strong>
            Please describe the recruitment stages, general difficulty, algorithmic topics, and behavioral questions. Do not disclose confidential company IP, proprietary assessment questions, or personally identifiable interviewer contact details.
          </div>
        </div>
      </div>

      <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
        <div id="inv-status-alert" style="display: none; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.9rem;"></div>

        <form id="upload-interview-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Company Name *</label>
              <input type="text" id="inv-company" class="form-input" required placeholder="e.g. Google, Microsoft, Atlassian" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Job Role / Title *</label>
              <input type="text" id="inv-role" class="form-input" required placeholder="e.g. Software Engineer (L3) or Intern" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Hiring Channel *</label>
              <select id="inv-hiring-type" class="form-select">
                <option value="On-Campus">On-Campus Placement Drive</option>
                <option value="Off-Campus">Off-Campus Referral / Career Portal</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Graduation Batch Year</label>
              <input type="text" id="inv-batch" class="form-input" value="2026" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Interview Difficulty</label>
              <select id="inv-difficulty" class="form-select">
                <option value="Easy">Easy</option>
                <option value="Medium" selected>Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Outcome / Result *</label>
              <select id="inv-result" class="form-select">
                <option value="Accepted">Offer Received & Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="In-Progress">Awaiting Final Results</option>
              </select>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Debrief Summary *</label>
              <textarea id="inv-summary" class="form-textarea" rows="3" required placeholder="Brief overview of the interview process, timeline, and overall atmosphere..."></textarea>
            </div>

            <!-- Round Breakdown Section -->
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Round 1: Online Assessment / Screening</label>
              <textarea id="inv-round-1" class="form-textarea" rows="2" placeholder="Platform (HackerRank/LeetCode), number of coding questions, time limit, MCQ topics..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Round 2: Technical Interview 1 (DSA / Core)</label>
              <textarea id="inv-round-2" class="form-textarea" rows="2" placeholder="Specific DSA problems asked, tree/graph traversals, edge cases discussed..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Round 3: System Design / Projects / Tech 2</label>
              <textarea id="inv-round-3" class="form-textarea" rows="2" placeholder="Resume project deep dive, architectural choices, database questions..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Round 4: Behavioral & HR Questions</label>
              <textarea id="inv-round-4" class="form-textarea" rows="2" placeholder="STAR method questions, why this company, leadership examples..."></textarea>
            </div>

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Recommended Preparation Resources & Tips</label>
              <textarea id="inv-resources" class="form-textarea" rows="2" placeholder="Courses, books (e.g. Striver SDE sheet, NeetCode 150), or advice for juniors..."></textarea>
            </div>

            <!-- Authentic statement affirmation -->
            <div class="form-group" style="grid-column: span 2;">
              <label style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer;">
                <input type="checkbox" id="inv-affirm-check" required style="margin-top: 3px;" />
                <span>
                  I confirm that this debrief reflects my personal authentic experience and does not violate any non-disclosure agreements or proprietary testing rules.
                </span>
              </label>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
            <a href="/interviews" data-link class="btn btn-ghost" style="color: var(--text-muted);">
              Cancel
            </a>
            <button type="submit" class="btn btn-primary" style="padding: 0.65rem 1.5rem;">
              Submit for Moderation Review (+${CREDIT_CONFIG.INTERVIEW_APPROVED || 20} Cr)
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function bindUploadInterviewEvents(container) {
  const form = container.querySelector('#upload-interview-form');
  const alertBox = container.querySelector('#inv-status-alert');

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const check = container.querySelector('#inv-affirm-check');
      if (check && !check.checked) {
        alert('Please affirm the non-disclosure & authenticity guidelines.');
        return;
      }

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.style.background = 'rgba(16, 185, 129, 0.12)';
        alertBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        alertBox.style.color = '#10b981';
        alertBox.innerHTML = `<strong>Interview Debrief Submitted!</strong> Your submission is currently in the <strong>Pending Review</strong> queue. Once verified by our moderation team, it will be published and <strong>+${CREDIT_CONFIG.INTERVIEW_APPROVED || 20} Credits</strong> will be added to your account.`;
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  }
}

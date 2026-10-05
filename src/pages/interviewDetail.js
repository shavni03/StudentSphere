import { mockInterviews } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderInterviewDetailPage(params) {
  const id = params.id;
  const exp = mockInterviews.find(i => i.id === id) || mockInterviews[0];

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem; max-width: 960px;">
      <a href="/interviews" data-link class="btn btn-ghost btn-sm" style="margin-bottom: 1.25rem; display: inline-flex; align-items: center; gap: 0.35rem;">
        ${createIcon('arrowLeft', 16, 'currentColor')} Back to All Experiences
      </a>

      <div class="card" style="padding: 2rem; margin-bottom: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span class="badge badge-primary">${exp.company}</span>
          <span class="badge badge-secondary">${exp.hiringType}</span>
          <span class="badge badge-warning">${exp.difficulty} Difficulty</span>
          ${exp.verified ? '<span class="badge badge-success">✓ Verified Placement</span>' : ''}
        </div>

        <h1 style="font-size: 1.85rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem;">
          ${exp.role} Interview Debrief (${exp.year})
        </h1>

        <div style="display: flex; align-items: center; gap: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.875rem;">
          <span>Candidate: <strong style="color: #fff;">${exp.uploader}</strong></span>
          <span>•</span>
          <span style="color: #10b981; font-weight: 600;">Offered Package: ${exp.stipendOrSalary}</span>
        </div>

        <!-- Round Breakdown -->
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">
            Rounds Breakdown
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 1rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 0.95rem; color: #818cf8; margin-bottom: 0.35rem;">Round 1: Online Assessment (OA)</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">2 Algorithmic challenges in 70 minutes. Focused on dynamic programming on arrays and binary search.</p>
            </div>
            <div style="padding: 1rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 0.95rem; color: #818cf8; margin-bottom: 0.35rem;">Round 2: Technical DSA & Algorithms</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Live Google Meet coding. Problem on Graph shortest paths with state transitions. Concurrency questions.</p>
            </div>
            <div style="padding: 1rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 0.95rem; color: #818cf8; margin-bottom: 0.35rem;">Round 3: Low-Level System Design (LLD)</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Design an in-memory pub-sub dispatcher. Discussed SOLID principles and Observer patterns.</p>
            </div>
            <div style="padding: 1rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
              <h4 style="font-size: 0.95rem; color: #818cf8; margin-bottom: 0.35rem;">Round 4: Engineering Manager & Behavioral</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Behavioral questions using STAR framework regarding project ownership and technical disagreements.</p>
            </div>
          </div>
        </div>

        <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25);">
          <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 0.35rem;">Author's Advice for Juniors:</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
            "${exp.summary} Practice writing clean code without an IDE. Verbalizing assumptions and dry-running test cases is key."
          </p>
        </div>
      </div>

      ${renderAdSlot('notes-between')}
    </div>
  `;
}
export function bindInterviewDetailPageEvents() {}

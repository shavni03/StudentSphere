import { mockJobs } from '../data/mockData.js';
import { appState } from '../state.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

let appliedSuccess = false;

export function renderJobDetailPage(params) {
  const id = params.id;
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];
  const isSaved = appState.savedJobIds.includes(job.id);

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem; max-width: 960px;">
      <a href="/jobs" data-link class="btn btn-ghost btn-sm" style="margin-bottom: 1.25rem; display: inline-flex; align-items: center; gap: 0.35rem;">
        ${createIcon('arrowLeft', 16, 'currentColor')} Back to Job Radar
      </a>

      ${appliedSuccess ? `
        <div style="padding: 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #6ee7b7; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('check', 20, '#10b981')}
          <span>Redirecting to the official company careers page for <strong>${job.company}</strong>...</span>
        </div>
      ` : ''}

      <div class="card" style="padding: 2rem; margin-bottom: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 0.75rem;">
          <span class="badge badge-primary">${job.type}</span>
          <span class="badge badge-info">${job.workMode}</span>
          <span class="badge badge-secondary">${job.track}</span>
          <span class="badge badge-success">Verified Official Opening</span>
        </div>

        <h1 style="font-size: 1.85rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem;">
          ${job.role}
        </h1>

        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
          <span style="font-size: 1.1rem; font-weight: 700; color: var(--primary);">${job.company}</span>
          <span style="color: var(--text-muted);">•</span>
          <span style="font-size: 0.875rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.3rem;">
            ${createIcon('mapPin', 15, 'currentColor')} ${job.location}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.75rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Compensation / Stipend</span>
            <p style="font-weight: 700; color: #10b981;">${job.salary}</p>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Experience Track</span>
            <p style="font-weight: 600; color: #fff;">${job.experience}</p>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Application Deadline</span>
            <p style="font-weight: 600; color: #f87171;">${job.deadline}</p>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Posting Source</span>
            <p style="font-weight: 600; color: #fff;">${job.source}</p>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">
            Role Description & Scope
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            ${job.description}
          </p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">
            Preferred Skills & Stack
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${job.skills.map(skill => `
              <span class="filter-chip" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
                ${skill}
              </span>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem; border-radius: var(--radius-md); background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(56, 189, 248, 0.15) 100%); border: 1px solid rgba(99, 102, 241, 0.35);">
          <div>
            <h4 style="font-size: 1rem; color: #fff; font-weight: 700;">Direct Application Link</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">Verified official company portal referral link.</p>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button id="job-detail-save-btn" class="btn btn-secondary">
              ${createIcon('bookmark', 16, isSaved ? '#6366f1' : 'currentColor')} ${isSaved ? 'Saved' : 'Save'}
            </button>
            <button id="job-detail-apply-btn" class="btn btn-primary btn-lg">
              Apply Now ${createIcon('externalLink', 16, '#fff')}
            </button>
          </div>
        </div>
      </div>

      ${renderAdSlot('jobs-between')}
    </div>
  `;
}

export function bindJobDetailPageEvents(container, params) {
  const id = params.id;
  const saveBtn = container.querySelector('#job-detail-save-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      appState.toggleSaveJob(id);
      router.resolve();
    };
  }

  const applyBtn = container.querySelector('#job-detail-apply-btn');
  if (applyBtn) {
    applyBtn.onclick = () => {
      appliedSuccess = true;
      router.resolve();
      setTimeout(() => {
        window.open('https://careers.google.com', '_blank');
        appliedSuccess = false;
        router.resolve();
      }, 700);
    };
  }
}

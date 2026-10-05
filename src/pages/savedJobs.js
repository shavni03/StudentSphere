import { appState } from '../state.js';
import { mockJobs } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';

export function renderSavedJobsPage() {
  const savedJobs = mockJobs.filter(j => appState.savedJobIds.includes(j.id));

  return `
    <div class="container" style="padding: 2rem 1rem 4rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">
            Saved Job Opportunities
          </h1>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
            Keep track of application deadlines, CTC packages, and interview stages.
          </p>
        </div>
        <a href="/jobs" data-link class="btn btn-outline" style="font-size: 0.85rem;">
          Browse More Jobs
        </a>
      </div>

      ${savedJobs.length === 0 ? `
        <div class="card" style="padding: 4rem 2rem; text-align: center;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(99, 102, 241, 0.1); margin: 0 auto 1.25rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('bookmark', 28, '#818cf8')}
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">No bookmarked jobs yet</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); max-width: 440px; margin: 0.5rem auto 1.5rem;">
            When you find a campus recruitment or off-campus opening you are interested in, click the bookmark icon to save it here.
          </p>
          <a href="/jobs" data-link class="btn btn-primary">
            Explore Job Radar
          </a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${savedJobs.map(job => `
            <div class="card" style="padding: 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1.25rem;">
              <div style="flex: 1; min-width: 280px;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${job.title}</h3>
                  <span class="badge badge-primary">${job.type}</span>
                  <span class="badge ${job.mode === 'Remote' ? 'badge-success' : 'badge-warning'}">${job.mode}</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.3rem;">
                  <strong style="color: var(--text-primary);">${job.company}</strong> • ${job.location} • CTC: <span style="color: #10b981; font-weight: 700;">${job.package}</span>
                </p>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.6rem; font-size: 0.8rem; color: var(--text-muted);">
                  <span>Deadline: <strong style="color: #fca5a5;">${job.deadline}</strong></span>
                  <span>Batch: ${job.eligibleBatches?.join(', ') || '2026/2027'}</span>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <button class="btn btn-outline remove-saved-btn" data-id="${job.id}" style="font-size: 0.8rem; color: #fca5a5; border-color: rgba(239, 68, 68, 0.3);">
                  ${createIcon('trash', 14, 'currentColor')} Remove
                </button>
                <a href="/jobs/${job.id}" data-link class="btn btn-primary" style="font-size: 0.85rem;">
                  View & Apply &rarr;
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

export function bindSavedJobsEvents(container) {
  container.querySelectorAll('.remove-saved-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      appState.toggleSaveJob(id);
      router.resolve();
    };
  });
}

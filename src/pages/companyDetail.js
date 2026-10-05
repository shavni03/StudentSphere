import { mockCompanies, mockJobs, mockInterviews } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderCompanyDetailPage(params) {
  const company = mockCompanies.find(c => c.id === params.id) || mockCompanies[0];
  const linkedJobs = mockJobs.filter(j => j.company.toLowerCase() === company.name.toLowerCase());
  const linkedInterviews = mockInterviews.filter(i => i.company.toLowerCase() === company.name.toLowerCase());

  return `
    <div class="container" style="padding: 2rem 1rem 4rem;">
      <a href="/companies" data-link style="display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.5rem;">
        ${createIcon('arrowLeft', 16, 'currentColor')} Back to Companies Directory
      </a>

      <!-- Company Hero Banner -->
      <div class="card" style="padding: 2.5rem; margin-bottom: 2rem; background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);">
        <div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 1.5rem;">
          <div style="display: flex; gap: 1.5rem; align-items: center;">
            <div style="width: 72px; height: 72px; border-radius: 16px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; font-weight: 800; color: #818cf8;">
              ${company.name.charAt(0)}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <h1 style="font-size: 1.85rem; font-weight: 800; color: #fff;">${company.name}</h1>
                ${company.featured ? '<span class="badge badge-primary">★ Featured Recruiter</span>' : ''}
              </div>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.3rem;">
                ${company.industry} • Headquartered in ${company.headquarters || 'Bengaluru, India'} • ${company.hiringType}
              </p>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <a href="${company.website || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.85rem;">
              Visit Website ${createIcon('externalLink', 14, 'currentColor')}
            </a>
            <a href="/jobs?company=${encodeURIComponent(company.name)}" data-link class="btn btn-primary" style="font-size: 0.85rem;">
              View Open Roles
            </a>
          </div>
        </div>

        <p style="margin-top: 1.5rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; max-width: 900px;">
          ${company.description}
        </p>

        <!-- Metric highlights -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Average CTC</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #10b981; margin-top: 0.2rem;">${company.avgPackage}</div>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Highest Package</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #f59e0b; margin-top: 0.2rem;">${company.highestPackage}</div>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Rating</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #fff; margin-top: 0.2rem; display: flex; align-items: center; gap: 0.3rem;">
              ★ ${company.rating} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 400;">(${company.reviewsCount} reviews)</span>
            </div>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Interview Difficulty</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #ec4899; margin-top: 0.2rem;">${company.difficulty}</div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 340px; gap: 2rem;" class="company-detail-grid">
        <div>
          <!-- Open Jobs section -->
          <div style="margin-bottom: 2.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Open Job Positions (${linkedJobs.length})</h3>
              <a href="/jobs?company=${encodeURIComponent(company.name)}" data-link style="font-size: 0.85rem; color: var(--primary);">View all jobs &rarr;</a>
            </div>

            ${linkedJobs.length === 0 ? `
              <div class="card" style="padding: 2rem; text-align: center; color: var(--text-muted);">
                No active openings listed right now. Check back soon or set an alert in notifications.
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${linkedJobs.map(j => `
                  <div class="card" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">${j.title}</h4>
                      <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                        ${j.location} • ${j.mode} • ${j.package} • Deadline: ${j.deadline}
                      </p>
                    </div>
                    <a href="/jobs/${j.id}" data-link class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                      Details
                    </a>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Interview Debriefs section -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Interview Experiences (${linkedInterviews.length})</h3>
              <a href="/interviews?company=${encodeURIComponent(company.name)}" data-link style="font-size: 0.85rem; color: var(--primary);">View all experiences &rarr;</a>
            </div>

            ${linkedInterviews.length === 0 ? `
              <div class="card" style="padding: 2rem; text-align: center; color: var(--text-muted);">
                No interview experiences uploaded yet for this company. Be the first student to share your debrief!
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${linkedInterviews.map(inv => `
                  <div class="card" style="padding: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                      <div>
                        <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">${inv.title}</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                          Candidate: ${inv.candidateName} (${inv.batch}) • ${inv.hiringType} • Result: <span style="color: #10b981; font-weight: 600;">${inv.result}</span>
                        </p>
                      </div>
                      <span class="badge ${inv.difficulty === 'Hard' ? 'badge-danger' : inv.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'}">
                        ${inv.difficulty}
                      </span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.75rem; line-height: 1.5;">
                      ${inv.summary}
                    </p>
                    <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 0.75rem; color: var(--text-muted);">${inv.roundsCount} interview rounds</span>
                      <a href="/interviews/${inv.id}" data-link class="btn btn-primary" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">
                        Read Debrief &rarr;
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
            <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Quick Overview</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Industry</span>
                <span style="color: #fff; font-weight: 600;">${company.industry}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Hiring Mode</span>
                <span style="color: #fff; font-weight: 600;">${company.hiringType}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Open Positions</span>
                <span style="color: #818cf8; font-weight: 700;">${linkedJobs.length} active</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Total Hires</span>
                <span style="color: #10b981; font-weight: 700;">${company.totalHires || '120+'}</span>
              </div>
            </div>
          </div>

          ${renderAdSlot('jobs-sidebar')}
        </div>
      </div>
    </div>
  `;
}

export function bindCompanyDetailEvents() {
  // Navigation links handled via router
}

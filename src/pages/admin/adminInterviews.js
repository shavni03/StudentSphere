import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockInterviews } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderAdminInterviewsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const company = query.get('company') || '';
  const difficulty = query.get('difficulty') || '';
  const hiringType = query.get('hiringType') || '';
  const status = query.get('status') || '';

  let list = [...mockInterviews];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(i => i.title.toLowerCase().includes(term) || i.company.toLowerCase().includes(term) || i.candidateName.toLowerCase().includes(term));
  }
  if (company) list = list.filter(i => i.company.toLowerCase() === company.toLowerCase());
  if (difficulty) list = list.filter(i => i.difficulty.toLowerCase() === difficulty.toLowerCase());
  if (hiringType) list = list.filter(i => i.hiringType.toLowerCase() === hiringType.toLowerCase());
  if (status) list = list.filter(i => i.status?.toLowerCase() === status.toLowerCase());

  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Interview Experiences & Debrief Moderation</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Verify student interview submissions, candidate identity, and round breakdowns.
      </p>
    </div>

    <!-- Filters -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-inv-search" 
            class="form-input" 
            placeholder="Search by company, role, or candidate name..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select inv-filter-sel" data-key="company" style="width: 150px; font-size: 0.825rem;">
          <option value="">All Companies</option>
          <option value="Google" ${company === 'Google' ? 'selected' : ''}>Google</option>
          <option value="Microsoft" ${company === 'Microsoft' ? 'selected' : ''}>Microsoft</option>
          <option value="Amazon" ${company === 'Amazon' ? 'selected' : ''}>Amazon</option>
          <option value="Atlassian" ${company === 'Atlassian' ? 'selected' : ''}>Atlassian</option>
          <option value="Flipkart" ${company === 'Flipkart' ? 'selected' : ''}>Flipkart</option>
        </select>

        <select class="form-select inv-filter-sel" data-key="difficulty" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Difficulties</option>
          <option value="Easy" ${difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
          <option value="Medium" ${difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="Hard" ${difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
        </select>

        <select class="form-select inv-filter-sel" data-key="hiringType" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Types</option>
          <option value="On-Campus" ${hiringType === 'On-Campus' ? 'selected' : ''}>On-Campus</option>
          <option value="Off-Campus" ${hiringType === 'Off-Campus' ? 'selected' : ''}>Off-Campus</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">Candidate & Role</th>
              <th style="padding: 0.75rem 1rem;">Company</th>
              <th style="padding: 0.75rem 1rem;">Type & Batch</th>
              <th style="padding: 0.75rem 1rem;">Difficulty</th>
              <th style="padding: 0.75rem 1rem;">Rounds</th>
              <th style="padding: 0.75rem 1rem;">Result</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(inv => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem;">
                  <div style="font-weight: 600; color: #fff;">${inv.candidateName}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${inv.title}</div>
                </td>
                <td style="padding: 0.85rem 1rem; font-weight: 700; color: #818cf8;">${inv.company}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${inv.hiringType} • ${inv.batch}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${inv.difficulty === 'Hard' ? 'badge-danger' : inv.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'}">
                    ${inv.difficulty}
                  </span>
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${inv.roundsCount} Rounds</td>
                <td style="padding: 0.85rem 1rem;">
                  <span style="color: #10b981; font-weight: 600;">${inv.result}</span>
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right;">
                  <a href="/interviews/${inv.id}" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
                    Review
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'interviews', 'Interview Debriefs Moderation', 'Verify candidate hiring rounds and technical debriefs');
}

export function bindAdminInterviewsEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-inv-search');
  if (searchInput) {
    let timer;
    searchInput.oninput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = router.getQueryParams();
        if (searchInput.value.trim()) q.set('q', searchInput.value.trim());
        else q.delete('q');
        router.setQueryParams(Object.fromEntries(q.entries()));
      }, 300);
    };
  }

  container.querySelectorAll('.inv-filter-sel').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const val = sel.value;
      const q = router.getQueryParams();
      if (val) q.set(key, val);
      else q.delete(key);
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  });
}

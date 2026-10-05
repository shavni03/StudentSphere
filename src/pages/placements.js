import { mockCompanies } from '../data/mockData.js';
import { router } from '../router.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderPlacementsPage() {
  const query = router.getQueryParams();
  const branch = query.get('branch') || '';
  const year = query.get('year') || '2026';

  const branchStats = [
    { branch: 'CSE', avg: '18.4 LPA', highest: '52.0 LPA', placed: '94%', offers: 340 },
    { branch: 'IT', avg: '16.8 LPA', highest: '46.0 LPA', placed: '91%', offers: 280 },
    { branch: 'AIDS', avg: '17.2 LPA', highest: '48.5 LPA', placed: '92%', offers: 120 },
    { branch: 'ECE', avg: '12.5 LPA', highest: '38.0 LPA', placed: '84%', offers: 210 },
    { branch: 'EE', avg: '10.2 LPA', highest: '26.0 LPA', placed: '78%', offers: 150 },
    { branch: 'ME', avg: '9.4 LPA', highest: '22.0 LPA', placed: '74%', offers: 130 },
  ];

  const filteredStats = branch ? branchStats.filter(b => b.branch === branch) : branchStats;

  return `
    <div class="container" style="padding: 2rem 1rem 4rem;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;">
          Campus Placement & Salary Analytics
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Verified placement records, branch-wise compensation benchmarks, and top recruiting partners.
        </p>
      </div>

      <!-- Top Summary Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        <div class="card" style="padding: 1.5rem; border-left: 4px solid #6366f1;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Overall Average CTC</span>
          <div style="font-size: 1.85rem; font-weight: 800; color: #fff; margin-top: 0.4rem;">15.8 LPA</div>
          <span style="font-size: 0.75rem; color: #10b981; margin-top: 0.2rem; display: block;">↑ 12.4% vs previous batch</span>
        </div>

        <div class="card" style="padding: 1.5rem; border-left: 4px solid #f59e0b;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Highest International CTC</span>
          <div style="font-size: 1.85rem; font-weight: 800; color: #f59e0b; margin-top: 0.4rem;">1.25 Cr</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">Offer by Google Zurich</span>
        </div>

        <div class="card" style="padding: 1.5rem; border-left: 4px solid #10b981;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Highest Domestic CTC</span>
          <div style="font-size: 1.85rem; font-weight: 800; color: #10b981; margin-top: 0.4rem;">52.0 LPA</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">Offer by Microsoft IDC</span>
        </div>

        <div class="card" style="padding: 1.5rem; border-left: 4px solid #ec4899;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Placement Percentage</span>
          <div style="font-size: 1.85rem; font-weight: 800; color: #ec4899; margin-top: 0.4rem;">88.6%</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">1,230 students placed</span>
        </div>
      </div>

      <!-- Filters & controls -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 2rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 0.85rem; font-weight: 600; color: #fff;">Batch Year:</span>
          <div style="display: flex; gap: 0.5rem;">
            ${['2026', '2025', '2024'].map(y => `
              <button 
                class="btn ${year === y ? 'btn-primary' : 'btn-outline'} placement-year-btn" 
                data-year="${y}" 
                style="padding: 0.35rem 0.8rem; font-size: 0.8rem;"
              >
                ${y} Batch
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <label style="font-size: 0.85rem; color: var(--text-muted);">Branch:</label>
          <select id="placements-branch-select" class="form-select" style="width: 160px; padding: 0.4rem 0.6rem; font-size: 0.85rem;">
            <option value="">All Branches</option>
            <option value="CSE" ${branch === 'CSE' ? 'selected' : ''}>CSE</option>
            <option value="IT" ${branch === 'IT' ? 'selected' : ''}>IT</option>
            <option value="AIDS" ${branch === 'AIDS' ? 'selected' : ''}>AIDS</option>
            <option value="ECE" ${branch === 'ECE' ? 'selected' : ''}>ECE</option>
            <option value="EE" ${branch === 'EE' ? 'selected' : ''}>EE</option>
            <option value="ME" ${branch === 'ME' ? 'selected' : ''}>ME</option>
          </select>
        </div>
      </div>

      <!-- Branch-wise Breakdown Table -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">
          Branch-Wise Compensation Breakdown
        </h3>
        <div style="overflow-x: auto;">
          <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">
                <th style="padding: 0.75rem 1rem;">Branch</th>
                <th style="padding: 0.75rem 1rem;">Average CTC</th>
                <th style="padding: 0.75rem 1rem;">Highest CTC</th>
                <th style="padding: 0.75rem 1rem;">Placement Rate</th>
                <th style="padding: 0.75rem 1rem;">Total Offers</th>
                <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStats.map(b => `
                <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.9rem;">
                  <td style="padding: 1rem; font-weight: 700; color: #fff;">${b.branch}</td>
                  <td style="padding: 1rem; color: #10b981; font-weight: 600;">${b.avg}</td>
                  <td style="padding: 1rem; color: #f59e0b; font-weight: 600;">${b.highest}</td>
                  <td style="padding: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <span>${b.placed}</span>
                      <div style="width: 60px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                        <div style="width: ${b.placed}; height: 100%; background: #6366f1;"></div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 1rem; color: var(--text-secondary);">${b.offers}</td>
                  <td style="padding: 1rem; text-align: right;">
                    <a href="/jobs?branch=${b.branch}" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;">
                      View Openings
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      ${renderAdSlot('home-middle')}

      <!-- Top Recruiters Grid -->
      <div style="margin-top: 3rem;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 1.25rem;">
          Key Recruiting Partners (${mockCompanies.length})
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
          ${mockCompanies.map(c => `
            <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h4 style="font-size: 1.1rem; font-weight: 700; color: #fff;">${c.name}</h4>
                  <span class="badge badge-primary">${c.hiringType}</span>
                </div>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">${c.industry}</p>
                <div style="margin-top: 1rem; display: flex; gap: 1rem;">
                  <div>
                    <span style="font-size: 0.7rem; color: var(--text-muted);">Avg Package</span>
                    <div style="font-weight: 700; color: #10b981; font-size: 0.95rem;">${c.avgPackage}</div>
                  </div>
                  <div>
                    <span style="font-size: 0.7rem; color: var(--text-muted);">Max Package</span>
                    <div style="font-weight: 700; color: #f59e0b; font-size: 0.95rem;">${c.highestPackage}</div>
                  </div>
                </div>
              </div>
              <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <a href="/companies/${c.id}" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">
                  Company Profile &rarr;
                </a>
                <a href="/jobs?company=${encodeURIComponent(c.name)}" data-link style="font-size: 0.75rem; color: var(--primary);">
                  Jobs &rarr;
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function bindPlacementsEvents(container) {
  container.querySelectorAll('.placement-year-btn').forEach(btn => {
    btn.onclick = () => {
      const year = btn.getAttribute('data-year');
      const q = router.getQueryParams();
      q.set('year', year);
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  });

  const branchSelect = container.querySelector('#placements-branch-select');
  if (branchSelect) {
    branchSelect.onchange = () => {
      const branch = branchSelect.value;
      const q = router.getQueryParams();
      if (branch) q.set('branch', branch);
      else q.delete('branch');
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  }
}

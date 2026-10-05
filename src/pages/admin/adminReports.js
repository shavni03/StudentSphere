import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockReports } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderAdminReportsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const type = query.get('type') || '';
  const priority = query.get('priority') || '';
  const status = query.get('status') || '';

  let list = [...mockReports];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(r => r.reason.toLowerCase().includes(term) || r.reporter.toLowerCase().includes(term) || r.reportedUser.toLowerCase().includes(term));
  }
  if (type) list = list.filter(r => r.contentType.toLowerCase() === type.toLowerCase());
  if (priority) list = list.filter(r => r.priority.toLowerCase() === priority.toLowerCase());
  if (status) list = list.filter(r => r.status.toLowerCase() === status.toLowerCase());

  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Content Moderation & Policy Reports</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Investigate user reports regarding copyright infringements, spam, incorrect answers, or abusive content.
      </p>
    </div>

    <!-- Filters -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-rep-search" 
            class="form-input" 
            placeholder="Search reports by reason, reporter, or reported user..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select rep-filter-sel" data-key="type" style="width: 150px; font-size: 0.825rem;">
          <option value="">All Content Types</option>
          <option value="Note" ${type === 'Note' ? 'selected' : ''}>Note</option>
          <option value="PYQ" ${type === 'PYQ' ? 'selected' : ''}>PYQ</option>
          <option value="Interview" ${type === 'Interview' ? 'selected' : ''}>Interview</option>
          <option value="Comment" ${type === 'Comment' ? 'selected' : ''}>Comment</option>
        </select>

        <select class="form-select rep-filter-sel" data-key="priority" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Priorities</option>
          <option value="High" ${priority === 'High' ? 'selected' : ''}>High</option>
          <option value="Medium" ${priority === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="Low" ${priority === 'Low' ? 'selected' : ''}>Low</option>
        </select>

        <select class="form-select rep-filter-sel" data-key="status" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Statuses</option>
          <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Resolved" ${status === 'Resolved' ? 'selected' : ''}>Resolved</option>
          <option value="Dismissed" ${status === 'Dismissed' ? 'selected' : ''}>Dismissed</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">Reason & Content Type</th>
              <th style="padding: 0.75rem 1rem;">Reporter</th>
              <th style="padding: 0.75rem 1rem;">Reported User</th>
              <th style="padding: 0.75rem 1rem;">Date</th>
              <th style="padding: 0.75rem 1rem;">Priority</th>
              <th style="padding: 0.75rem 1rem;">Status</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(r => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem;">
                  <div style="font-weight: 700; color: #fff;">${r.reason}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Target: ${r.contentType} (ID: ${r.contentId})</div>
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${r.reporter}</td>
                <td style="padding: 0.85rem 1rem; color: #fca5a5;">${r.reportedUser}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-muted);">${r.date}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${r.priority === 'High' ? 'badge-danger' : r.priority === 'Medium' ? 'badge-warning' : 'badge-primary'}">
                    ${r.priority}
                  </span>
                </td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${r.status === 'Pending' ? 'badge-warning' : r.status === 'Resolved' ? 'badge-success' : 'badge-outline'}">
                    ${r.status}
                  </span>
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right;">
                  <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                    <button class="btn btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" onclick="alert('Report dismissed.')">
                      Dismiss
                    </button>
                    <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #ef4444; border-color: #ef4444;" onclick="alert('Content removed and warning issued.')">
                      Take Action
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'reports', 'Security & Content Policy Reports', 'Review user complaints and moderate university academic materials');
}

export function bindAdminReportsEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-rep-search');
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

  container.querySelectorAll('.rep-filter-sel').forEach(sel => {
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

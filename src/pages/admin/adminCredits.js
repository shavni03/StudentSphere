import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockCreditTransactions } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderAdminCreditsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const type = query.get('type') || '';
  const status = query.get('status') || '';

  let list = [...mockCreditTransactions];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(t => t.description.toLowerCase().includes(term) || t.userId?.toLowerCase().includes(term));
  }
  if (type) list = list.filter(t => t.type.toLowerCase() === type.toLowerCase());
  if (status) list = list.filter(t => t.status.toLowerCase() === status.toLowerCase());

  const content = `
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Credit Economy & Transaction Ledger</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
          Audit community reward points, upload bonuses, and redeemable mentorship packages.
        </p>
      </div>
      <button class="btn btn-primary" onclick="alert('Manual credit adjustment modal')">
        + Adjust User Credits
      </button>
    </div>

    <!-- Assurance Banner -->
    <div class="card" style="padding: 1rem 1.25rem; margin-bottom: 1.5rem; border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.08); display: flex; align-items: center; gap: 0.75rem;">
      ${createIcon('checkCheck', 18, '#10b981')}
      <span style="font-size: 0.85rem; color: #34d399;">
        <strong>Zero-Credit Download Policy:</strong> Note downloads and PYQ accesses do NOT trigger credit deductions in the ledger. Academic access is strictly 100% free for all students.
      </span>
    </div>

    <!-- Filters -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-credit-search" 
            class="form-input" 
            placeholder="Search transactions by user or description..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select credit-filter-sel" data-key="type" style="width: 150px; font-size: 0.825rem;">
          <option value="">All Types</option>
          <option value="EARNED" ${type === 'EARNED' ? 'selected' : ''}>Earned (Contributions)</option>
          <option value="REDEEMED" ${type === 'REDEEMED' ? 'selected' : ''}>Redeemed (Rewards)</option>
        </select>

        <select class="form-select credit-filter-sel" data-key="status" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Statuses</option>
          <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
          <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">Transaction Details</th>
              <th style="padding: 0.75rem 1rem;">User ID</th>
              <th style="padding: 0.75rem 1rem;">Type</th>
              <th style="padding: 0.75rem 1rem;">Credits Delta</th>
              <th style="padding: 0.75rem 1rem;">Date</th>
              <th style="padding: 0.75rem 1rem;">Status</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(t => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem; font-weight: 600; color: #fff;">${t.description}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-muted); font-family: monospace;">${t.userId || 'usr-001'}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${t.type === 'EARNED' ? 'badge-success' : 'badge-warning'}">${t.type}</span>
                </td>
                <td style="padding: 0.85rem 1rem; font-weight: 700; color: ${t.type === 'EARNED' ? '#10b981' : '#f59e0b'};">
                  ${t.type === 'EARNED' ? '+' : '-'}${t.amount} Cr
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${t.date}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span style="color: #10b981; font-weight: 600;">✓ ${t.status}</span>
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right;">
                  <button class="btn btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" onclick="alert('Viewing transaction ledger audit trail.')">
                    Audit
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return renderAdminLayout(content, 'credits', 'Credit Economy & Rewards Ledger', 'Monitor user contributions, reward redemptions, and verify 0-credit download policies');
}

export function bindAdminCreditsEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-credit-search');
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

  container.querySelectorAll('.credit-filter-sel').forEach(sel => {
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

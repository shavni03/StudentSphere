import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockPYQs } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';
import { CREDIT_CONFIG } from '../../config/credits.js';

export function renderAdminPYQsPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const branch = query.get('branch') || '';
  const semester = query.get('semester') || '';
  const examType = query.get('examType') || '';
  const status = query.get('status') || '';

  let list = [...mockPYQs];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(term) || p.subject.toLowerCase().includes(term) || p.university.toLowerCase().includes(term));
  }
  if (branch) list = list.filter(p => p.branch.toLowerCase() === branch.toLowerCase());
  if (semester) list = list.filter(p => String(p.semester) === String(semester));
  if (examType) list = list.filter(p => p.examType.toLowerCase() === examType.toLowerCase());
  if (status) list = list.filter(p => p.status.toLowerCase() === status.toLowerCase());

  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Previous Years Question Papers (PYQ) Moderation</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Validate exam paper authenticity, solution keys, approve/reject papers, and guarantee 100% free (0 credit) downloads.
      </p>
    </div>

    <!-- Filters -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-pyq-search" 
            class="form-input" 
            placeholder="Search PYQs by subject, university, or title..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select pyq-filter-sel" data-key="branch" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Branches</option>
          <option value="CSE" ${branch === 'CSE' ? 'selected' : ''}>CSE</option>
          <option value="IT" ${branch === 'IT' ? 'selected' : ''}>IT</option>
          <option value="AIDS" ${branch === 'AIDS' ? 'selected' : ''}>AIDS</option>
          <option value="ECE" ${branch === 'ECE' ? 'selected' : ''}>ECE</option>
          <option value="EE" ${branch === 'EE' ? 'selected' : ''}>EE</option>
          <option value="ME" ${branch === 'ME' ? 'selected' : ''}>ME</option>
        </select>

        <select class="form-select pyq-filter-sel" data-key="semester" style="width: 130px; font-size: 0.825rem;">
          <option value="">All Sems</option>
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `
            <option value="${s}" ${semester === String(s) ? 'selected' : ''}>Sem ${s}</option>
          `).join('')}
        </select>

        <select class="form-select pyq-filter-sel" data-key="examType" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Exams</option>
          <option value="End-Sem" ${examType === 'End-Sem' ? 'selected' : ''}>End-Sem</option>
          <option value="Mid-Sem" ${examType === 'Mid-Sem' ? 'selected' : ''}>Mid-Sem</option>
          <option value="Quiz" ${examType === 'Quiz' ? 'selected' : ''}>Quiz / Unit</option>
        </select>

        <select class="form-select pyq-filter-sel" data-key="status" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Statuses</option>
          <option value="Approved" ${status === 'Approved' ? 'selected' : ''}>Approved</option>
          <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Rejected" ${status === 'Rejected' ? 'selected' : ''}>Rejected</option>
        </select>
      </div>
    </div>

    <!-- PYQ Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span style="font-size: 0.9rem; font-weight: 700; color: #fff;">Showing ${list.length} exam papers</span>
        <span class="badge badge-success">✓ 100% Free Downloads Guaranteed</span>
      </div>

      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">Subject & Exam</th>
              <th style="padding: 0.75rem 1rem;">University</th>
              <th style="padding: 0.75rem 1rem;">Branch / Sem</th>
              <th style="padding: 0.75rem 1rem;">Year</th>
              <th style="padding: 0.75rem 1rem;">Solutions</th>
              <th style="padding: 0.75rem 1rem;">Downloads</th>
              <th style="padding: 0.75rem 1rem;">Status</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Moderation Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(p => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem;">
                  <div style="font-weight: 600; color: #fff;">${p.subject}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${p.examType} Examination</div>
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary); max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.university}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${p.branch} (Sem ${p.semester})</td>
                <td style="padding: 0.85rem 1rem; font-weight: 600; color: #fff;">${p.year}</td>
                <td style="padding: 0.85rem 1rem;">
                  ${p.hasSolutions ? '<span class="badge badge-success">✓ With Solutions</span>' : '<span class="badge badge-outline">Paper Only</span>'}
                </td>
                <td style="padding: 0.85rem 1rem; font-weight: 600; color: #10b981;">${p.downloads}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${p.status === 'Approved' ? 'badge-success' : p.status === 'Pending' ? 'badge-warning' : 'badge-danger'}">${p.status}</span>
                  ${p.rejectionReason ? `<div style="font-size: 0.7rem; color: #ef4444; max-width: 130px; margin-top: 0.2rem; overflow: hidden; text-overflow: ellipsis;">${p.rejectionReason}</div>` : ''}
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right; white-space: nowrap;">
                  <div style="display: flex; gap: 0.35rem; justify-content: flex-end; align-items: center;">
                    <a href="/pyqs/${p.id}" data-link class="btn btn-ghost" style="font-size: 0.72rem; padding: 0.25rem 0.5rem; color: var(--text-secondary);" title="View Details">
                      Inspect
                    </a>
                    ${p.status !== 'Approved' ? `
                      <button class="btn btn-outline pyq-approve-btn" data-id="${p.id}" style="font-size: 0.72rem; padding: 0.25rem 0.5rem; color: #10b981; border-color: rgba(16, 185, 129, 0.4);">
                        Approve
                      </button>
                    ` : ''}
                    ${p.status !== 'Rejected' ? `
                      <button class="btn btn-outline pyq-reject-btn" data-id="${p.id}" style="font-size: 0.72rem; padding: 0.25rem 0.5rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">
                        Reject
                      </button>
                    ` : ''}
                    <button class="btn btn-ghost pyq-delete-btn" data-id="${p.id}" style="font-size: 0.72rem; padding: 0.25rem 0.4rem; color: var(--text-muted);" title="Delete Paper">
                      ✕
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

  return renderAdminLayout(content, 'pyqs', 'Past Question Papers (PYQ) Moderation', 'Audit question papers, model answer keys, and past exams');
}

export function bindAdminPYQsEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-pyq-search');
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

  container.querySelectorAll('.pyq-filter-sel').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const val = sel.value;
      const q = router.getQueryParams();
      if (val) q.set(key, val);
      else q.delete(key);
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  });

  // PYQ Moderation Handlers
  container.querySelectorAll('.pyq-approve-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const pyq = mockPYQs.find(p => p.id === id);
      if (pyq) {
        pyq.status = 'Approved';
        delete pyq.rejectionReason;
        alert(`PYQ "${pyq.subject} (${pyq.year})" approved! +${CREDIT_CONFIG.PYQ_APPROVED} credits awarded to uploader.`);
        router.resolve();
      }
    };
  });

  container.querySelectorAll('.pyq-reject-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const pyq = mockPYQs.find(p => p.id === id);
      if (pyq) {
        const reason = prompt('Please enter a mandatory rejection reason for this PYQ:');
        if (!reason || !reason.trim()) {
          alert('Rejection aborted. A valid rejection reason is mandatory.');
          return;
        }
        pyq.status = 'Rejected';
        pyq.rejectionReason = reason.trim();
        alert(`PYQ "${pyq.subject}" marked as Rejected. Reason: "${pyq.rejectionReason}". Uploader notified.`);
        router.resolve();
      }
    };
  });

  container.querySelectorAll('.pyq-delete-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to permanently delete this exam paper?')) {
        const idx = mockPYQs.findIndex(p => p.id === id);
        if (idx !== -1) {
          mockPYQs.splice(idx, 1);
          alert('Exam paper removed.');
          router.resolve();
        }
      }
    };
  });
}

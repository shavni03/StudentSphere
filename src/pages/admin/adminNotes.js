import { renderAdminLayout, bindAdminLayoutEvents } from './adminLayout.js';
import { mockNotes } from '../../data/mockData.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';
import { CREDIT_CONFIG } from '../../config/credits.js';

export function renderAdminNotesPage() {
  const query = router.getQueryParams();
  const q = query.get('q') || '';
  const branch = query.get('branch') || '';
  const semester = query.get('semester') || '';
  const format = query.get('format') || '';
  const status = query.get('status') || '';
  const reported = query.get('reported') || '';

  let list = [...mockNotes];

  if (q.trim()) {
    const term = q.toLowerCase();
    list = list.filter(n => n.title.toLowerCase().includes(term) || n.subject.toLowerCase().includes(term) || n.uploader.toLowerCase().includes(term));
  }
  if (branch) list = list.filter(n => n.branch.toLowerCase() === branch.toLowerCase());
  if (semester) list = list.filter(n => String(n.semester) === String(semester));
  if (format) list = list.filter(n => n.resourceType.toLowerCase() === format.toLowerCase());
  if (status) list = list.filter(n => n.status.toLowerCase() === status.toLowerCase());
  if (reported === 'true') list = list.filter(n => (n.reportCount || 0) > 0);

  const content = `
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Notes & Lecture Handouts Moderation</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
        Inspect uploaded documents, verify academic rigor, approve/reject submissions, and enforce 0-credit downloads.
      </p>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="admin-notes-search" 
            class="form-input" 
            placeholder="Search notes by title, subject, or author..." 
            value="${q}" 
            style="padding-left: 2.25rem;"
          />
          <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
            ${createIcon('search', 16, 'currentColor')}
          </div>
        </div>

        <select class="form-select notes-filter-sel" data-key="branch" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Branches</option>
          <option value="CSE" ${branch === 'CSE' ? 'selected' : ''}>CSE</option>
          <option value="IT" ${branch === 'IT' ? 'selected' : ''}>IT</option>
          <option value="AIDS" ${branch === 'AIDS' ? 'selected' : ''}>AIDS</option>
          <option value="ECE" ${branch === 'ECE' ? 'selected' : ''}>ECE</option>
          <option value="EE" ${branch === 'EE' ? 'selected' : ''}>EE</option>
          <option value="ME" ${branch === 'ME' ? 'selected' : ''}>ME</option>
        </select>

        <select class="form-select notes-filter-sel" data-key="semester" style="width: 130px; font-size: 0.825rem;">
          <option value="">All Sems</option>
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `
            <option value="${s}" ${semester === String(s) ? 'selected' : ''}>Sem ${s}</option>
          `).join('')}
        </select>

        <select class="form-select notes-filter-sel" data-key="format" style="width: 150px; font-size: 0.825rem;">
          <option value="">All Formats</option>
          <option value="Handwritten" ${format === 'Handwritten' ? 'selected' : ''}>Handwritten</option>
          <option value="Typed" ${format === 'Typed' ? 'selected' : ''}>Typed PDF</option>
          <option value="Formula Sheet" ${format === 'Formula Sheet' ? 'selected' : ''}>Formula Sheet</option>
          <option value="Slides" ${format === 'Slides' ? 'selected' : ''}>Slides</option>
        </select>

        <select class="form-select notes-filter-sel" data-key="status" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Statuses</option>
          <option value="Approved" ${status === 'Approved' ? 'selected' : ''}>Approved</option>
          <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Rejected" ${status === 'Rejected' ? 'selected' : ''}>Rejected</option>
        </select>

        <select class="form-select notes-filter-sel" data-key="reported" style="width: 140px; font-size: 0.825rem;">
          <option value="">All Reports</option>
          <option value="true" ${reported === 'true' ? 'selected' : ''}>Reported Flags</option>
          <option value="false" ${reported === 'false' ? 'selected' : ''}>No Reports</option>
        </select>
      </div>
    </div>

    <!-- Notes Table -->
    <div class="card" style="padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span style="font-size: 0.9rem; font-weight: 700; color: #fff;">Showing ${list.length} handouts</span>
        <span class="badge badge-success">✓ 100% Free Downloads Guaranteed</span>
      </div>

      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 1rem;">Title & Subject</th>
              <th style="padding: 0.75rem 1rem;">Branch / Sem</th>
              <th style="padding: 0.75rem 1rem;">Format</th>
              <th style="padding: 0.75rem 1rem;">Uploader</th>
              <th style="padding: 0.75rem 1rem;">Pages & Size</th>
              <th style="padding: 0.75rem 1rem;">Downloads</th>
              <th style="padding: 0.75rem 1rem;">Status</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Moderation Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(n => `
              <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                <td style="padding: 0.85rem 1rem;">
                  <div style="font-weight: 600; color: #fff; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.title}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${n.subject} (${n.subjectCode || 'GEN'})</div>
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${n.branch} (Sem ${n.semester})</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge badge-outline">${n.resourceType}</span>
                </td>
                <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">${n.uploader}</td>
                <td style="padding: 0.85rem 1rem; color: var(--text-muted);">${n.pages}p • ${n.fileSize}</td>
                <td style="padding: 0.85rem 1rem; font-weight: 600; color: #10b981;">${n.downloads}</td>
                <td style="padding: 0.85rem 1rem;">
                  <span class="badge ${n.status === 'Approved' ? 'badge-success' : n.status === 'Pending' ? 'badge-warning' : 'badge-danger'}">
                    ${n.status}
                  </span>
                  ${n.rejectionReason ? `<div style="font-size: 0.7rem; color: #ef4444; max-width: 140px; margin-top: 0.2rem; overflow: hidden; text-overflow: ellipsis;">${n.rejectionReason}</div>` : ''}
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right; white-space: nowrap;">
                  <div style="display: flex; gap: 0.35rem; justify-content: flex-end; align-items: center;">
                    <a href="/notes/${n.id}" data-link class="btn btn-ghost" style="font-size: 0.72rem; padding: 0.25rem 0.5rem; color: var(--text-secondary);" title="View Details">
                      Inspect
                    </a>
                    ${n.status !== 'Approved' ? `
                      <button class="btn btn-outline note-approve-btn" data-id="${n.id}" style="font-size: 0.72rem; padding: 0.25rem 0.5rem; color: #10b981; border-color: rgba(16, 185, 129, 0.4);">
                        Approve
                      </button>
                    ` : ''}
                    ${n.status !== 'Rejected' ? `
                      <button class="btn btn-outline note-reject-btn" data-id="${n.id}" style="font-size: 0.72rem; padding: 0.25rem 0.5rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">
                        Reject
                      </button>
                    ` : ''}
                    <button class="btn btn-ghost note-delete-btn" data-id="${n.id}" style="font-size: 0.72rem; padding: 0.25rem 0.4rem; color: var(--text-muted);" title="Delete Record">
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

  return renderAdminLayout(content, 'notes', 'Notes & Lecture Handouts Moderation', 'Inspect uploaded documents, verify academic rigor, approve/reject submissions, and enforce 0-credit downloads');
}

export function bindAdminNotesEvents(container) {
  bindAdminLayoutEvents(container);

  const searchInput = container.querySelector('#admin-notes-search');
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

  container.querySelectorAll('.notes-filter-sel').forEach(sel => {
    sel.onchange = () => {
      const key = sel.getAttribute('data-key');
      const val = sel.value;
      const q = router.getQueryParams();
      if (val) q.set(key, val);
      else q.delete(key);
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  });

  // Moderation Handlers
  container.querySelectorAll('.note-approve-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const note = mockNotes.find(n => n.id === id);
      if (note) {
        note.status = 'Approved';
        delete note.rejectionReason;
        alert(`Note "${note.title}" approved! +${CREDIT_CONFIG.NOTE_APPROVED} credits awarded to ${note.uploader}.`);
        router.resolve();
      }
    };
  });

  container.querySelectorAll('.note-reject-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const note = mockNotes.find(n => n.id === id);
      if (note) {
        const reason = prompt('Please enter a mandatory rejection reason for this handout:');
        if (!reason || !reason.trim()) {
          alert('Rejection aborted. A valid rejection reason is mandatory.');
          return;
        }
        note.status = 'Rejected';
        note.rejectionReason = reason.trim();
        alert(`Note "${note.title}" marked as Rejected. Reason: "${note.rejectionReason}". Uploader has been notified.`);
        router.resolve();
      }
    };
  });

  container.querySelectorAll('.note-delete-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to permanently delete this resource?')) {
        const idx = mockNotes.findIndex(n => n.id === id);
        if (idx !== -1) {
          mockNotes.splice(idx, 1);
          alert('Resource removed successfully.');
          router.resolve();
        }
      }
    };
  });
}

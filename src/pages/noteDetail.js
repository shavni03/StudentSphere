import { mockNotes } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { router } from '../router.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

let downloadSuccess = false;
let userRating = 0;
let ratingSubmitted = false;
let isReportModalOpen = false;
let reportSubmitted = false;

export function renderNoteDetailPage(params) {
  const id = params.id;
  const note = mockNotes.find(n => n.id === id) || mockNotes[0];

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem; max-width: 960px;">
      <a href="/notes" data-link class="btn btn-ghost btn-sm" style="margin-bottom: 1.25rem; display: inline-flex; align-items: center; gap: 0.35rem;">
        ${createIcon('arrowLeft', 16, 'currentColor')} Back to All Notes
      </a>

      ${downloadSuccess ? `
        <div style="padding: 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #6ee7b7; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('check', 20, '#10b981')}
          <span>Download started: <strong>${note.title}</strong> (0 Credits deducted — StudentSphere Universal Free Download Guarantee).</span>
        </div>
      ` : ''}

      ${ratingSubmitted ? `
        <div style="padding: 0.85rem 1rem; border-radius: var(--radius-md); background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #fde68a; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('star', 18, '#f59e0b')}
          <span>Thank you for rating this resource ${userRating} stars! Contributor earned community score points.</span>
        </div>
      ` : ''}

      ${reportSubmitted ? `
        <div style="padding: 0.85rem 1rem; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.65rem;">
          ${createIcon('shieldAlert', 18, '#ef4444')}
          <span>Your report has been submitted to the StudentSphere Moderation Team for review.</span>
        </div>
      ` : ''}

      <div class="card" style="padding: 2rem; margin-bottom: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem;">
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span class="badge badge-primary">${note.branch} Engineering</span>
            <span class="badge badge-secondary">Semester ${note.semester}</span>
            <span class="badge badge-info">${note.subjectCode}</span>
            <span class="badge badge-success">✓ Verified Handout</span>
          </div>
          <button id="note-open-report-btn" class="btn btn-ghost btn-sm" style="color: #fca5a5; font-size: 0.75rem; display: flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.5rem;">
            ${createIcon('flag', 14, 'currentColor')} Report Resource
          </button>
        </div>

        <h1 style="font-size: 1.85rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">
          ${note.title}
        </h1>

        <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          ${note.description}
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.75rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Uploader</span>
            <p style="font-weight: 600; color: #fff;">${note.uploader}</p>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Format & Pages</span>
            <p style="font-weight: 600; color: #fff;">${note.resourceType} • ${note.pages} pages</p>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">File Size</span>
            <p style="font-weight: 600; color: #fff;">${note.fileSize}</p>
          </div>
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Community Rating</span>
            <p style="font-weight: 600; color: #f59e0b;">★ ${note.rating} / 5.0 (${note.reviewsCount || 42} reviews)</p>
          </div>
        </div>

        <!-- Rating UI Component -->
        <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff;">Rate this Academic Resource</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Help fellow peers discover accurate and high-quality exam material.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            ${[1, 2, 3, 4, 5].map(star => `
              <button 
                class="note-star-btn" 
                data-star="${star}" 
                style="background: transparent; border: none; font-size: 1.4rem; cursor: pointer; color: ${star <= userRating ? '#f59e0b' : 'var(--text-muted)'}; padding: 2px;"
                title="Rate ${star} Stars"
              >
                ★
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Free Download CTA Banner -->
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem; border-radius: var(--radius-md); background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%); border: 1px solid rgba(99, 102, 241, 0.35);">
          <div>
            <h4 style="font-size: 1.05rem; color: #fff; font-weight: 700;">Open Academic Access Guarantee</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
              Universal student access: <strong>0 Credits deducted</strong>. Downloading notes is 100% free forever.
            </p>
          </div>
          <button id="note-detail-download-btn" class="btn btn-primary btn-lg" style="font-weight: 800; letter-spacing: 0.03em;">
            ${createIcon('download', 18, '#fff')} FREE DOWNLOAD
          </button>
        </div>
      </div>

      ${renderAdSlot('notes-between')}

      <!-- Report Modal -->
      ${isReportModalOpen ? `
        <div class="modal-backdrop" id="report-modal-backdrop">
          <div class="modal-content" style="max-width: 500px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff;">Report Note Resource</h3>
              <button id="report-modal-close-btn" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.2rem;">✕</button>
            </div>
            <form id="note-report-form">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label" style="font-weight: 600; color: #fff;">Reason for Report *</label>
                <select id="report-reason-select" class="form-select" required>
                  <option value="Inaccurate syllabus or answers">Inaccurate syllabus or answers</option>
                  <option value="Copyright or author infringement">Copyright or author infringement</option>
                  <option value="Corrupted or unreadable PDF">Corrupted or unreadable PDF</option>
                  <option value="Incomplete or missing pages">Incomplete or missing pages</option>
                  <option value="Spam or promotional content">Spam or promotional content</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-weight: 600; color: #fff;">Additional Details (Optional)</label>
                <textarea id="report-details-textarea" class="form-textarea" rows="3" placeholder="Please describe the specific issue or page number..."></textarea>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
                <button type="button" id="report-modal-cancel-btn" class="btn btn-ghost" style="color: var(--text-muted);">Cancel</button>
                <button type="submit" class="btn btn-primary" style="background: #ef4444; border-color: #ef4444;">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function bindNoteDetailPageEvents(container, _params) {
  const downloadBtn = container.querySelector('#note-detail-download-btn');
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      downloadSuccess = true;
      router.resolve();
      setTimeout(() => {
        downloadSuccess = false;
        router.resolve();
      }, 4000);
    };
  }

  // Star Rating Click
  container.querySelectorAll('.note-star-btn').forEach(btn => {
    btn.onclick = () => {
      userRating = parseInt(btn.getAttribute('data-star'), 10);
      ratingSubmitted = true;
      router.resolve();
      setTimeout(() => {
        ratingSubmitted = false;
        router.resolve();
      }, 3500);
    };
  });

  // Report Modal
  const openReportBtn = container.querySelector('#note-open-report-btn');
  if (openReportBtn) {
    openReportBtn.onclick = () => {
      isReportModalOpen = true;
      router.resolve();
    };
  }

  const closeReportModal = () => {
    isReportModalOpen = false;
    router.resolve();
  };

  const closeBtn = container.querySelector('#report-modal-close-btn');
  const cancelBtn = container.querySelector('#report-modal-cancel-btn');
  if (closeBtn) closeBtn.onclick = closeReportModal;
  if (cancelBtn) cancelBtn.onclick = closeReportModal;

  const reportForm = container.querySelector('#note-report-form');
  if (reportForm) {
    reportForm.onsubmit = (e) => {
      e.preventDefault();
      isReportModalOpen = false;
      reportSubmitted = true;
      router.resolve();
      setTimeout(() => {
        reportSubmitted = false;
        router.resolve();
      }, 4000);
    };
  }
}

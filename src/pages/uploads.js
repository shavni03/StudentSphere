import { createIcon } from '../icons.js';

export function renderUploadsPage() {
  const currentPath = window.location.pathname;
  const isPYQUpload = currentPath.includes('/pyqs/upload');

  return `
    <div class="container" style="padding: 2rem 1rem 4rem; max-width: 900px;">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
        <a href="/" data-link style="color: var(--text-muted); text-decoration: none;">Home</a>
        <span>/</span>
        <a href="${isPYQUpload ? '/pyqs' : '/notes'}" data-link style="color: var(--text-muted); text-decoration: none;">${isPYQUpload ? 'PYQs' : 'Notes'}</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">Upload Resource</span>
      </nav>

      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">
          ${isPYQUpload ? 'Contribute Past Exam Paper (PYQ)' : 'Upload Lecture Handouts & Notes'}
        </h1>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.4rem;">
          Help fellow college students excel. Every submission is human-reviewed by our moderation team before publication. Earn <strong>${isPYQUpload ? '+15 Credits' : '+10 Credits'}</strong> upon admin approval!
        </p>
      </div>

      <!-- Free Downloads Assurance Banner -->
      <div class="card" style="padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.08);">
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          ${createIcon('checkCheck', 20, '#10b981')}
          <span style="font-size: 0.875rem; color: #10b981;">
            <strong>Open Academic Community:</strong> All uploaded resources remain permanently 100% Free (0 Credits deducted) for every student to read and download.
          </span>
        </div>
      </div>

      <!-- Section 7: Mandatory Copyright & Content Disclaimer -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 2rem; border-left: 4px solid #f59e0b; background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.2);">
        <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
          <div style="margin-top: 2px;">
            ${createIcon('shieldAlert', 22, '#f59e0b')}
          </div>
          <div style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
            <strong style="color: var(--text-primary); font-size: 0.95rem; display: block; margin-bottom: 0.35rem;">
              Strict Copyright & Contribution Guidelines
            </strong>
            <p style="margin-bottom: 0.5rem;">
              <strong>Upload only content that you own, have permission to share, or are legally allowed to distribute.</strong>
            </p>
            <p style="margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.825rem;">
              StudentSphere enforces strict anti-infringement policies. Do NOT upload:
            </p>
            <ul style="margin-left: 1.25rem; font-size: 0.825rem; color: var(--text-secondary); display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.25rem;">
              <li>❌ Pirated or commercial textbooks</li>
              <li>❌ Paid course slides / exam dumps</li>
              <li>❌ Unauthorized proprietary PDFs</li>
              <li>❌ Malicious files or executables</li>
              <li>❌ Illegal or abusive content</li>
              <li>❌ Personal / private contact data (PII)</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Upload Form -->
      <div class="card" style="padding: 2rem; margin-bottom: 2.5rem;">
        <div id="upload-status-alert" style="display: none; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.9rem;"></div>

        <form id="upload-resource-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Resource Title *</label>
              <input type="text" class="form-input" required placeholder="e.g. Distributed Systems Unit 1-5 Handwritten Complete Notes" id="upload-title" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Subject Name *</label>
              <input type="text" class="form-input" required placeholder="e.g. Operating Systems" id="upload-subject" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Subject Code</label>
              <input type="text" class="form-input" placeholder="e.g. CS501" id="upload-code" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Branch / Discipline *</label>
              <select class="form-select" id="upload-branch" required>
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="AIDS">AI & Data Science (AIDS)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EE">Electrical Engineering (EE)</option>
                <option value="ME">Mechanical Engineering (ME)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Semester *</label>
              <select class="form-select" id="upload-semester" required>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5" selected>Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>

            ${isPYQUpload ? `
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Exam Type *</label>
                <select class="form-select" id="upload-exam-type">
                  <option value="End-Term">End-Term Final Examination</option>
                  <option value="Mid-Term">Mid-Term Sessional</option>
                  <option value="Improvement">Improvement Exam</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Solutions Included?</label>
                <select class="form-select" id="upload-solutions">
                  <option value="true">Yes, with Step-by-Step Solutions</option>
                  <option value="false">Question Paper Only</option>
                </select>
              </div>
            ` : `
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Format Type *</label>
                <select class="form-select" id="upload-format">
                  <option value="Handwritten">Handwritten Notes</option>
                  <option value="Typed">Typed Document / PDF</option>
                  <option value="Formula Sheet">Formula Sheet / Cheat Sheet</option>
                  <option value="Slides">Lecture Presentation Slides</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Academic Year</label>
                <input type="text" class="form-input" value="2026" id="upload-year" />
              </div>
            `}

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">Description & Key Topics</label>
              <textarea class="form-textarea" rows="3" placeholder="Briefly describe the syllabus units covered..." id="upload-desc"></textarea>
            </div>

            <!-- Drag & Drop Zone -->
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: var(--text-primary);">PDF / Document File *</label>
              <div style="border: 2px dashed var(--border-medium); border-radius: var(--radius-md); padding: 2.5rem 1rem; text-align: center; background: rgba(255, 255, 255, 0.02); cursor: pointer;" id="upload-dropzone">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(99, 102, 241, 0.15); margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;">
                  ${createIcon('upload', 24, '#6366f1')}
                </div>
                <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Click to select document or drag and drop</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">PDF, DOCX, or PPT up to 50MB</p>
                <div id="selected-file-label" style="margin-top: 0.75rem; font-size: 0.85rem; color: #10b981; font-weight: 600; display: none;"></div>
              </div>
            </div>

            <!-- Copyright affirmation checkbox -->
            <div class="form-group" style="grid-column: span 2;">
              <label style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer;">
                <input type="checkbox" id="upload-copyright-check" required style="margin-top: 3px;" />
                <span>
                  I confirm that this document is my own work or authorized educational material, and does not contain pirated textbooks, proprietary exam leaks, or copyrighted content.
                </span>
              </label>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
            <a href="/dashboard" data-link class="btn btn-ghost" style="color: var(--text-muted);">
              Cancel
            </a>
            <button type="submit" class="btn btn-primary" style="padding: 0.65rem 1.5rem;">
              Submit for Admin Review (${isPYQUpload ? '+15 Cr' : '+10 Cr'})
            </button>
          </div>
        </form>
      </div>

      <!-- Upload History with Clear Moderation Statuses -->
      <div class="card" style="padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
          Your Contribution Status
        </h3>
        <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1rem;">
          Every submission transitions through our human review pipeline: <code>PENDING</code> → <code>APPROVED</code> or <code>REJECTED</code>.
        </p>

        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          <!-- Item 1: Pending -->
          <div style="padding: 1rem; border-radius: var(--radius-sm); background: var(--bg-tertiary); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">Computer Networks Socket Programming Handout</h5>
                <span class="badge badge-warning" style="font-size: 0.7rem;">PENDING REVIEW</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Submitted 2 hours ago • Awaiting admin editorial verification</p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Expected Reward: <strong>+10 Cr</strong></span>
            </div>
          </div>

          <!-- Item 2: Approved -->
          <div style="padding: 1rem; border-radius: var(--radius-sm); background: var(--bg-tertiary); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">Compiler Design Unit 1-4 Complete Notes</h5>
                <span class="badge badge-success" style="font-size: 0.7rem;">APPROVED</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Verified by Admin • Published • 84 pages • CSE 6th Sem</p>
            </div>
            <div style="text-align: right;">
              <span style="color: #10b981; font-weight: 700; font-size: 0.8rem;">+10 Credits Earned</span>
              <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">480 free student downloads</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindUploadsEvents(container) {
  const form = container.querySelector('#upload-resource-form');
  const dropzone = container.querySelector('#upload-dropzone');
  const fileLabel = container.querySelector('#selected-file-label');
  const statusAlert = container.querySelector('#upload-status-alert');

  if (dropzone) {
    dropzone.onclick = () => {
      if (fileLabel) {
        fileLabel.textContent = '✓ lecture_handout_complete_notes.pdf (14.2 MB)';
        fileLabel.style.display = 'block';
      }
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const copyrightCheck = container.querySelector('#upload-copyright-check');
      if (copyrightCheck && !copyrightCheck.checked) {
        alert('Please confirm the copyright & authorized distribution affirmation.');
        return;
      }

      if (statusAlert) {
        statusAlert.style.display = 'block';
        statusAlert.style.background = 'rgba(16, 185, 129, 0.12)';
        statusAlert.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        statusAlert.style.color = '#10b981';
        statusAlert.innerHTML = '<strong>Submission Received!</strong> Your upload has been placed in the <strong>Pending Review</strong> queue. Once our moderation team reviews and approves the resource, it will be published and your credits will be updated.';
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  }
}

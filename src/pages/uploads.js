import { createIcon } from '../icons.js';
import { router } from '../router.js';

export function renderUploadsPage() {
  const currentPath = window.location.pathname;
  const isPYQUpload = currentPath.includes('/pyqs/upload');

  return `
    <div class="container" style="padding: 2rem 1rem 4rem; max-width: 900px;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;">
          ${isPYQUpload ? 'Upload Past Exam Paper (PYQ)' : 'Upload Lecture Handouts & Notes'}
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Help fellow college students excel. You will be credited <strong>${isPYQUpload ? '+40 Credits' : '+50 Credits'}</strong> upon automated verification!
        </p>
      </div>

      <!-- Free Downloads Assurance Banner -->
      <div class="card" style="padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.08);">
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          ${createIcon('checkCheck', 20, '#10b981')}
          <span style="font-size: 0.875rem; color: #34d399;">
            <strong>Open Academic Community:</strong> All uploaded resources remain permanently 100% Free (0 Credits deducted) for every student to read and download.
          </span>
        </div>
      </div>

      <!-- Upload Form -->
      <div class="card" style="padding: 2rem; margin-bottom: 2.5rem;">
        <form id="upload-resource-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Resource Title *</label>
              <input type="text" class="form-input" required placeholder="e.g. Distributed Systems Unit 1-5 Handwritten Complete Notes" id="upload-title" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Subject Name *</label>
              <input type="text" class="form-input" required placeholder="e.g. Operating Systems" id="upload-subject" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Subject Code</label>
              <input type="text" class="form-input" placeholder="e.g. CS501" id="upload-code" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 600; color: #fff;">Branch / Discipline *</label>
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
              <label class="form-label" style="font-weight: 600; color: #fff;">Semester *</label>
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
                <label class="form-label" style="font-weight: 600; color: #fff;">Exam Type *</label>
                <select class="form-select" id="upload-exam-type">
                  <option value="End-Term">End-Term Final Examination</option>
                  <option value="Mid-Term">Mid-Term Sessional</option>
                  <option value="Improvement">Improvement Exam</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: #fff;">Solutions Included?</label>
                <select class="form-select" id="upload-solutions">
                  <option value="true">Yes, with Step-by-Step Solutions</option>
                  <option value="false">Question Paper Only</option>
                </select>
              </div>
            ` : `
              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: #fff;">Format Type *</label>
                <select class="form-select" id="upload-format">
                  <option value="Handwritten">Handwritten Notes</option>
                  <option value="Typed">Typed Document / PDF</option>
                  <option value="Formula Sheet">Formula Sheet / Cheat Sheet</option>
                  <option value="Slides">Lecture Presentation Slides</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-weight: 600; color: #fff;">Academic Year</label>
                <input type="text" class="form-input" value="2026" id="upload-year" />
              </div>
            `}

            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">Description & Key Topics</label>
              <textarea class="form-textarea" rows="3" placeholder="Briefly describe the syllabus units covered..." id="upload-desc"></textarea>
            </div>

            <!-- Drag & Drop Zone -->
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" style="font-weight: 600; color: #fff;">PDF / Document File *</label>
              <div style="border: 2px dashed var(--border-medium); border-radius: var(--radius-md); padding: 2.5rem 1rem; text-align: center; background: rgba(255, 255, 255, 0.02); cursor: pointer;" id="upload-dropzone">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(99, 102, 241, 0.15); margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;">
                  ${createIcon('upload', 24, '#818cf8')}
                </div>
                <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">Click to select file or drag and drop</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">PDF, DOCX, or PPT up to 50MB</p>
                <div id="selected-file-label" style="margin-top: 0.75rem; font-size: 0.85rem; color: #10b981; font-weight: 600; display: none;"></div>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
            <a href="/dashboard" data-link class="btn btn-ghost" style="color: var(--text-muted);">
              Cancel
            </a>
            <button type="submit" class="btn btn-primary" style="padding: 0.65rem 1.5rem;">
              Submit for Verification (${isPYQUpload ? '+40 Cr' : '+50 Cr'})
            </button>
          </div>
        </form>
      </div>

      <!-- Upload History -->
      <div class="card" style="padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Your Uploaded Contributions</h3>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div style="padding: 1rem; border-radius: var(--radius-sm); background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h5 style="font-size: 0.9rem; font-weight: 700; color: #fff;">Compiler Design Unit 1-4 Complete Notes</h5>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Submitted on 2026-09-20 • 84 pages • CSE 6th Sem</p>
            </div>
            <div style="text-align: right;">
              <span class="badge badge-success">Approved (+50 Cr)</span>
              <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">480 downloads</span>
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

  if (dropzone) {
    dropzone.onclick = () => {
      // Simulate file select
      if (fileLabel) {
        fileLabel.textContent = '✓ lecture_handout_complete_notes.pdf (14.2 MB)';
        fileLabel.style.display = 'block';
      }
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      alert('Upload received! Our automated OCR parser will verify the document and credit your account shortly.');
      router.navigate('/dashboard');
    };
  }
}

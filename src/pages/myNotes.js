import { appState } from '../state.js';
import { mockNotes } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { CREDIT_CONFIG } from '../config/credits.js';

export function renderMyNotesPage() {
  const user = appState.currentUser;
  // Match user's uploaded notes
  const userNotes = mockNotes.filter(n => n.uploader.toLowerCase() === user.name.toLowerCase() || n.uploader === 'Aarav Mehta');

  return `
    <div class="container" style="padding: 2rem 1.25rem 4rem 1.25rem;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;">
            My Uploaded Notes & Contributions
          </h1>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
            Track your shared lecture handouts, moderation statuses, and community contribution rewards.
          </p>
        </div>
        <a href="/notes/upload" data-link class="btn btn-primary">
          ${createIcon('upload', 16, '#fff')} Upload New Notes (+${CREDIT_CONFIG.NOTE_APPROVED} Cr)
        </a>
      </div>

      <!-- Stats Overview Banner -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Uploads</span>
          <div style="font-size: 1.75rem; font-weight: 800; color: #fff; margin-top: 0.3rem;">${userNotes.length} Handouts</div>
        </div>

        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Peer Downloads</span>
          <div style="font-size: 1.75rem; font-weight: 800; color: #10b981; margin-top: 0.3rem;">
            ${userNotes.reduce((acc, curr) => acc + (curr.downloads || 0), 0)}
          </div>
          <span style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.2rem; display: block;">100% Free Downloads</span>
        </div>

        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Credits Rewarded</span>
          <div style="font-size: 1.75rem; font-weight: 800; color: #f59e0b; margin-top: 0.3rem;">
            🪙 ${userNotes.filter(n => n.status === 'Approved').length * CREDIT_CONFIG.NOTE_APPROVED} Cr
          </div>
        </div>
      </div>

      <!-- Notes List -->
      ${userNotes.length === 0 ? `
        <div class="card" style="padding: 3rem; text-align: center;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(99, 102, 241, 0.1); margin: 0 auto 1.25rem; display: flex; align-items: center; justify-content: center;">
            ${createIcon('fileText', 28, '#818cf8')}
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">No uploads yet</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); max-width: 440px; margin: 0.5rem auto 1.5rem;">
            Share your handwritten class notes, formula sheets, or exam solutions to earn community credits!
          </p>
          <a href="/notes/upload" data-link class="btn btn-primary">Upload First Handout</a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${userNotes.map(n => `
            <div class="card" style="padding: 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
              <div style="flex: 1; min-width: 280px;">
                <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                  <h4 style="font-size: 1.05rem; font-weight: 700; color: #fff;">${n.title}</h4>
                  <span class="badge ${n.status === 'Approved' ? 'badge-success' : 'badge-warning'}">
                    ${n.status}
                  </span>
                  <span class="badge badge-primary">${n.branch}</span>
                  <span class="badge badge-secondary">Sem ${n.semester}</span>
                </div>
                <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.35rem;">
                  ${n.subject} (${n.subjectCode}) • ${n.resourceType} • ${n.pages} pages • ${n.fileSize} • Uploaded on ${n.uploadDate}
                </p>
                <div style="display: flex; gap: 1rem; align-items: center; margin-top: 0.5rem; font-size: 0.8rem; color: #10b981;">
                  <span>📥 ${n.downloads} downloads (Free)</span>
                  <span>★ ${n.rating} rating</span>
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <a href="/notes/${n.id}" data-link class="btn btn-outline" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
                  View Note
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

export function bindMyNotesEvents() {}

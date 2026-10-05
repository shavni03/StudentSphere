import { appState } from '../state.js';
import { mockNotes, mockPYQs, mockJobs } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { CREDIT_CONFIG } from '../config/credits.js';
import { renderAdSlot } from '../components/ads/adSlot.js';

export function renderDashboardPage() {
  const user = appState.currentUser;
  const unreadCount = appState.unreadCount;
  const savedJobs = mockJobs.filter(j => appState.savedJobIds.includes(j.id));
  const recentNotes = mockNotes.slice(0, 3);
  const recentPYQs = mockPYQs.slice(0, 3);
  const recentJobs = mockJobs.slice(0, 3);

  return `
    <div class="container" style="padding: 2rem 1rem 4rem;">
      <!-- Welcome Header -->
      <div class="card" style="padding: 2rem; margin-bottom: 2rem; background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%);">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: #fff;">
              ${user.name.charAt(0)}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary);">Welcome back, ${user.name}!</h1>
                <span class="badge ${user.role === 'admin' ? 'badge-danger' : 'badge-primary'}">
                  ${user.role === 'admin' ? '🛡️ Administrator' : '🎓 Student'}
                </span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem;">
                ${user.branch} • Semester ${user.semester} • ${user.university}
              </p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="text-align: right;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Credit Balance</span>
              <div style="font-size: 1.4rem; font-weight: 800; color: #f59e0b;">🪙 ${user.credits} Credits</div>
            </div>
            <a href="/credits" data-link class="btn btn-primary" style="font-size: 0.85rem;">
              Redeem Rewards
            </a>
          </div>
        </div>

        <!-- Guarantee Banner -->
        <div style="margin-top: 1.5rem; padding: 0.75rem 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: #34d399;">
          ${createIcon('checkCheck', 18, '#10b981')}
          <span><strong>100% Free Downloads Active:</strong> All lecture handouts, PYQs, and exam solutions cost 0 credits. Credits are strictly for community contributions and rewards.</span>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">Quick Actions</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <a href="/notes/upload" data-link class="card" style="padding: 1.25rem; text-decoration: none; display: flex; align-items: center; gap: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center;">
              ${createIcon('upload', 22, '#818cf8')}
            </div>
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Upload Notes</h4>
              <p style="font-size: 0.75rem; color: #10b981; font-weight: 600;">+${CREDIT_CONFIG.NOTE_APPROVED} Credits</p>
            </div>
          </a>

          <a href="/pyqs/upload" data-link class="card" style="padding: 1.25rem; text-decoration: none; display: flex; align-items: center; gap: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center;">
              ${createIcon('fileText', 22, '#10b981')}
            </div>
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Upload PYQ</h4>
              <p style="font-size: 0.75rem; color: #10b981; font-weight: 600;">+${CREDIT_CONFIG.PYQ_APPROVED} Credits</p>
            </div>
          </a>

          <a href="/upload-interview" data-link class="card" style="padding: 1.25rem; text-decoration: none; display: flex; align-items: center; gap: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center;">
              ${createIcon('messageSquare', 22, '#f59e0b')}
            </div>
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Share Interview</h4>
              <p style="font-size: 0.75rem; color: #10b981; font-weight: 600;">+${CREDIT_CONFIG.INTERVIEW_APPROVED} Credits</p>
            </div>
          </a>

          <a href="/jobs" data-link class="card" style="padding: 1.25rem; text-decoration: none; display: flex; align-items: center; gap: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(236, 72, 153, 0.15); display: flex; align-items: center; justify-content: center;">
              ${createIcon('briefcase', 22, '#ec4899')}
            </div>
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Find Jobs</h4>
              <p style="font-size: 0.75rem; color: var(--text-muted);">Campus & Off-Campus</p>
            </div>
          </a>
        </div>
      </div>

      <!-- User Engagement Metrics (Total Uploads, Approved, Downloads, Saved Jobs, Interviews, Contribution Score) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Uploads</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-top: 0.2rem;">6 Handouts</div>
          <span style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem; display: block;">Notes & PYQs</span>
        </div>

        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Approved Uploads</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin-top: 0.2rem;">5 Approved</div>
          <span style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem; display: block;">1 In Moderation</span>
        </div>

        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Free Downloads</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #38bdf8; margin-top: 0.2rem;">14 Files</div>
          <span style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem; display: block;">0 Credits Deducted</span>
        </div>

        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Saved Jobs</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #ec4899; margin-top: 0.2rem;">${savedJobs.length} Positions</div>
          <span style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem; display: block;">Application Tracker</span>
        </div>

        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Interview Debriefs</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #a855f7; margin-top: 0.2rem;">2 Debriefs</div>
          <span style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem; display: block;">Published Experiences</span>
        </div>

        <div class="card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Contribution Score</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #f59e0b; margin-top: 0.2rem;">Rank #14</div>
          <span style="font-size: 0.75rem; color: #10b981; margin-top: 0.2rem; display: block;">Top 5% Contributor</span>
        </div>
      </div>

      <!-- Main Layout -->
      <div style="display: grid; grid-template-columns: 1fr 340px; gap: 2rem;" class="dashboard-grid">
        <div>
          <!-- Recent Activity Log -->
          <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Recent Activity</h3>
              <a href="/notifications" data-link style="font-size: 0.85rem; color: var(--primary);">View all notifications (${unreadCount}) &rarr;</a>
            </div>
            <div class="card" style="padding: 1rem;">
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <span style="color: #10b981;">✓</span>
                    <span style="color: var(--text-primary);">Note Approved: <strong>Distributed Systems Unit 1-5</strong></span>
                  </div>
                  <span style="color: #10b981; font-weight: 700;">+${CREDIT_CONFIG.NOTE_APPROVED} Cr</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <span style="color: #38bdf8;">📥</span>
                    <span style="color: var(--text-primary);">Downloaded: <strong>DBMS Formula Sheet</strong></span>
                  </div>
                  <span style="color: var(--text-muted); font-weight: 600;">0 Cr (Free)</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <span style="color: #f59e0b;">💼</span>
                    <span style="color: var(--text-primary);">Bookmarked: <strong>Google SWE Intern 2027</strong></span>
                  </div>
                  <span style="color: var(--text-muted);">Deadline: Oct 28</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Latest Notes -->
          <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Latest Lecture Notes</h3>
              <a href="/notes" data-link style="font-size: 0.85rem; color: var(--primary);">Explore all notes &rarr;</a>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              ${recentNotes.map(n => `
                <div class="card" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${n.title}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                      ${n.subject} (${n.subjectCode}) • ${n.branch} • ${n.pages} pages • Free Download
                    </p>
                  </div>
                  <a href="/notes/${n.id}" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.35rem 0.75rem;">
                    FREE DOWNLOAD
                  </a>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Latest PYQs -->
          <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Latest Exam PYQs</h3>
              <a href="/pyqs" data-link style="font-size: 0.85rem; color: var(--primary);">Explore all PYQs &rarr;</a>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              ${recentPYQs.map(p => `
                <div class="card" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${p.subject} — ${p.examType} (${p.year})</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                      ${p.university} • ${p.branch} Sem ${p.semester} • Free Exam Paper
                    </p>
                  </div>
                  <a href="/pyqs/${p.id}" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.35rem 0.75rem;">
                    FREE DOWNLOAD
                  </a>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Latest Jobs -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Latest Job & Internship Openings</h3>
              <a href="/jobs" data-link style="font-size: 0.85rem; color: var(--primary);">View job radar &rarr;</a>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              ${recentJobs.map(j => `
                <div class="card" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${j.title}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                      ${j.company} • ${j.location} (${j.mode}) • ${j.package} • Deadline: ${j.deadline}
                    </p>
                  </div>
                  <a href="/jobs/${j.id}" data-link class="btn btn-primary" style="font-size: 0.75rem; padding: 0.35rem 0.75rem;">
                    Apply
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">Student Profile</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Name:</span>
                <span style="color: var(--text-primary); font-weight: 600;">${user.name}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Email:</span>
                <span style="color: var(--text-primary); font-weight: 600;">${user.email}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Branch:</span>
                <span style="color: var(--text-primary); font-weight: 600;">${user.branch}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Semester:</span>
                <span style="color: var(--text-primary); font-weight: 600;">Sem ${user.semester}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Email KYC:</span>
                <span style="color: #10b981; font-weight: 600;">✓ Verified</span>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.5rem;">
              <a href="/my-notes" data-link class="btn btn-outline" style="width: 100%; font-size: 0.8rem; justify-content: center;">
                My Uploaded Notes
              </a>
              <a href="/profile" data-link class="btn btn-ghost" style="width: 100%; font-size: 0.8rem; justify-content: center; color: var(--text-secondary);">
                Edit Profile
              </a>
            </div>
          </div>

          ${renderAdSlot('jobs-sidebar')}
        </div>
      </div>
    </div>
  `;
}

export function bindDashboardEvents() {}

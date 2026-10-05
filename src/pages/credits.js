import { appState } from '../state.js';
import { mockCreditTransactions } from '../data/mockData.js';
import { createIcon } from '../icons.js';
import { CREDIT_CONFIG } from '../config/credits.js';

export function renderCreditsPage() {
  const user = appState.currentUser;

  return `
    <div class="container" style="padding: 2rem 1rem 4rem;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">
          Credits & Community Rewards
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Earn credits by contributing academic handouts and interview debriefs. Redeem for career mentorship and premium perks.
        </p>
      </div>

      <!-- Free Downloads Assurance Banner -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 2rem; border-left: 4px solid #10b981; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%);">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(16, 185, 129, 0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${createIcon('checkCheck', 24, '#10b981')}
          </div>
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #10b981;">
              Zero-Credit Academic Downloads Guaranteed
            </h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
              You do <strong>NOT</strong> need credits to download lecture notes, handwritten sheets, or past university question papers (PYQs). Academic knowledge is 100% free for every student on StudentSphere. Credits are strictly for voluntary contributions and career rewards!
            </p>
          </div>
        </div>
      </div>

      <!-- Credit Stats Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
        <div class="card" style="padding: 1.5rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Current Credits</span>
          <div style="font-size: 2rem; font-weight: 800; color: #f59e0b; margin-top: 0.3rem;">🪙 ${user.credits} Cr</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">Available to spend</span>
        </div>

        <div class="card" style="padding: 1.5rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Earned</span>
          <div style="font-size: 2rem; font-weight: 800; color: #10b981; margin-top: 0.3rem;">🪙 590 Cr</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">From approved contributions</span>
        </div>

        <div class="card" style="padding: 1.5rem;">
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Contribution Score</span>
          <div style="font-size: 2rem; font-weight: 800; color: #6366f1; margin-top: 0.3rem;">Top Contributor</div>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: block;">Rank #14 this month</span>
        </div>
      </div>

      <!-- Ways to Earn Credits -->
      <div class="card" style="padding: 1.75rem; margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.25rem;">Ways to Earn Credits</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
          <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Note Approved</h4>
              <span class="badge badge-success">+${CREDIT_CONFIG.NOTE_APPROVED} Cr</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">
              Share high-quality handwritten or typed handouts for any university course.
            </p>
            <a href="/notes/upload" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; margin-top: 0.75rem;">
              Upload Notes
            </a>
          </div>

          <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">PYQ Approved</h4>
              <span class="badge badge-success">+${CREDIT_CONFIG.PYQ_APPROVED} Cr</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">
              Submit end-sem or mid-sem exam papers with answer keys or model solutions.
            </p>
            <a href="/pyqs/upload" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; margin-top: 0.75rem;">
              Upload PYQs
            </a>
          </div>

          <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Interview Experience Approved</h4>
              <span class="badge badge-success">+${CREDIT_CONFIG.INTERVIEW_APPROVED} Cr</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">
              Publish a round-by-round interview breakdown for campus or off-campus recruitment.
            </p>
            <a href="/upload-interview" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; margin-top: 0.75rem;">
              Share Experience
            </a>
          </div>
        </div>
      </div>

      <!-- Rewards Catalog -->
      <div class="card" style="padding: 1.75rem; margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.25rem;">Redeem Rewards Store</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
          <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="badge badge-warning" style="margin-bottom: 0.5rem;">300 Credits</span>
              <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Senior Resume Review</h4>
              <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.3rem;">
                Get personalized ATS review and annotated feedback from placed alumni.
              </p>
            </div>
            <button class="btn btn-primary" style="margin-top: 1rem; font-size: 0.8rem;">Redeem for 300 Cr</button>
          </div>

          <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="badge badge-warning" style="margin-bottom: 0.5rem;">500 Credits</span>
              <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">1-on-1 Mock Tech Interview</h4>
              <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.3rem;">
                45-minute live DSA / System Design mock session with real-time rubric score.
              </p>
            </div>
            <button class="btn btn-primary" style="margin-top: 1rem; font-size: 0.8rem;">Redeem for 500 Cr</button>
          </div>

          <div style="padding: 1.25rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="badge badge-warning" style="margin-bottom: 0.5rem;">200 Credits</span>
              <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Golden Scholar Profile Badge</h4>
              <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.3rem;">
                Permanent highlighted badge next to your name across discussions and notes.
              </p>
            </div>
            <button class="btn btn-primary" style="margin-top: 1rem; font-size: 0.8rem;">Redeem for 200 Cr</button>
          </div>
        </div>
      </div>

      <!-- Transaction History Table -->
      <div class="card" style="padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">Credit Ledger History</h3>
        <div style="overflow-x: auto;">
          <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">
                <th style="padding: 0.75rem 1rem;">Transaction</th>
                <th style="padding: 0.75rem 1rem;">Type</th>
                <th style="padding: 0.75rem 1rem;">Amount</th>
                <th style="padding: 0.75rem 1rem;">Date</th>
                <th style="padding: 0.75rem 1rem;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${mockCreditTransactions.slice(0, 8).map(tx => `
                <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.85rem;">
                  <td style="padding: 0.85rem 1rem; color: var(--text-primary); font-weight: 600;">${tx.description}</td>
                  <td style="padding: 0.85rem 1rem;">
                    <span class="badge ${tx.type === 'EARNED' ? 'badge-success' : 'badge-warning'}">
                      ${tx.type}
                    </span>
                  </td>
                  <td style="padding: 0.85rem 1rem; font-weight: 700; color: ${tx.type === 'EARNED' ? '#10b981' : '#f59e0b'};">
                    ${tx.type === 'EARNED' ? '+' : '-'}${tx.amount} Cr
                  </td>
                  <td style="padding: 0.85rem 1rem; color: var(--text-muted);">${tx.date}</td>
                  <td style="padding: 0.85rem 1rem;">
                    <span style="color: #10b981;">✓ ${tx.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function bindCreditsEvents() {}

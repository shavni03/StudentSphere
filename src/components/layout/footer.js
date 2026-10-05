import { renderAdSlot } from '../ads/adSlot.js';
import { createIcon } from '../../icons.js';

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="site-footer" style="border-top: 1px solid var(--border-subtle); background: var(--bg-secondary); margin-top: auto; padding-top: 2.5rem; padding-bottom: 2rem;">
      <div class="container">
        <!-- Footer Ad Placement (Compliant, Non-intrusive) -->
        <div style="margin-bottom: 2rem;">
          ${renderAdSlot('footer')}
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2.5rem; margin-bottom: 2.5rem;">
          <!-- Col 1: STUDENTSPHERE -->
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.85rem;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); display: flex; align-items: center; justify-content: center;">
                ${createIcon('graduationCap', 18, '#fff')}
              </div>
              <span style="font-weight: 800; font-size: 1.15rem; color: var(--text-primary);">StudentSphere</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
              Open, student-centered academic and career platform. Verified lecture notes, university PYQs with solutions, real interview debriefs, and multi-channel student alerts.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
              <li><a href="/about" data-link style="color: var(--text-secondary); text-decoration: none;">About StudentSphere</a></li>
              <li><a href="/contact" data-link style="color: var(--text-secondary); text-decoration: none;">Contact Support</a></li>
              <li><a href="/uploads" data-link style="color: var(--text-secondary); text-decoration: none;">Contribute Resources</a></li>
              <li><a href="/leaderboard" data-link style="color: var(--text-secondary); text-decoration: none;">Community Leaderboard</a></li>
            </ul>
          </div>

          <!-- Col 2: RESOURCES -->
          <div>
            <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-primary); margin-bottom: 0.85rem; font-weight: 700;">
              Resources
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
              <li><a href="/notes" data-link style="color: var(--text-secondary); text-decoration: none;">Handwritten & Typed Notes</a></li>
              <li><a href="/pyqs" data-link style="color: var(--text-secondary); text-decoration: none;">Previous Year Questions (PYQs)</a></li>
              <li><a href="/placements" data-link style="color: var(--text-secondary); text-decoration: none;">Placement Preparation & Stats</a></li>
              <li><a href="/interviews" data-link style="color: var(--text-secondary); text-decoration: none;">Interview Experiences</a></li>
              <li><a href="/jobs" data-link style="color: var(--text-secondary); text-decoration: none;">Student Jobs & Internships</a></li>
              <li><a href="/companies" data-link style="color: var(--text-secondary); text-decoration: none;">Hiring Companies Directory</a></li>
            </ul>
          </div>

          <!-- Col 3: LEGAL -->
          <div>
            <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-primary); margin-bottom: 0.85rem; font-weight: 700;">
              Legal & Trust
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
              <li><a href="/privacy" data-link style="color: var(--text-secondary); text-decoration: none;">Privacy Policy</a></li>
              <li><a href="/terms" data-link style="color: var(--text-secondary); text-decoration: none;">Terms & Conditions</a></li>
              <li><a href="/cookie-policy" data-link style="color: var(--text-secondary); text-decoration: none;">Cookie Policy</a></li>
              <li><a href="/about#moderation" data-link style="color: var(--text-secondary); text-decoration: none;">Content Guidelines & Moderation</a></li>
              <li><a href="/contact?subject=DMCA" data-link style="color: var(--text-secondary); text-decoration: none;">Copyright & DMCA Inquiries</a></li>
            </ul>
          </div>

          <!-- Col 4: SOCIAL & COMMUNITY -->
          <div>
            <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-primary); margin-bottom: 0.85rem; font-weight: 700;">
              Connect With Us
            </h4>
            <p style="font-size: 0.825rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.85rem;">
              Stay updated with academic drops, off-campus drives, and platform updates.
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                ${createIcon('share2', 15, 'currentColor')} LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                ${createIcon('sparkles', 15, 'currentColor')} Instagram
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                ${createIcon('layers', 15, 'currentColor')} YouTube
              </a>
              <a href="/settings/notifications" data-link style="color: var(--text-secondary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                ${createIcon('send', 15, '#38bdf8')} Telegram Alert Channel
              </a>
            </div>
          </div>
        </div>

        <!-- Academic Disclaimer & Copyright -->
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.775rem; color: var(--text-muted);">
          <div style="line-height: 1.6;">
            <strong>Academic Disclaimer:</strong> StudentSphere is an independent peer learning and community educational repository. All academic handouts, notes, and previous year examination papers are shared by student contributors for personal study and reference purposes only. All lecture materials remain the intellectual property of their respective educators, universities, or creators. All student downloads on StudentSphere are 100% free forever (0 Credits required for downloading).
          </div>
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; padding-top: 0.5rem;">
            <div>
              © ${currentYear} StudentSphere. All rights reserved.
            </div>
            <div style="display: flex; gap: 1.25rem;">
              <a href="/about" data-link style="color: var(--text-muted); text-decoration: none;">About</a>
              <a href="/privacy" data-link style="color: var(--text-muted); text-decoration: none;">Privacy</a>
              <a href="/terms" data-link style="color: var(--text-muted); text-decoration: none;">Terms</a>
              <a href="/cookie-policy" data-link style="color: var(--text-muted); text-decoration: none;">Cookies</a>
              <a href="/contact" data-link style="color: var(--text-muted); text-decoration: none;">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

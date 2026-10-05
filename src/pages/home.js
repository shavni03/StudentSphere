import { renderAdSlot } from '../components/ads/adSlot.js';
import { createIcon } from '../icons.js';

export function renderHomePage() {
  return `
    <div>
      <!-- Hero Section -->
      <section style="padding: 4.5rem 1.25rem 3.5rem 1.25rem; text-align: center; position: relative;">
        <div class="container" style="max-width: 880px;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); color: #a5b4fc; font-size: 0.8rem; font-weight: 600; margin-bottom: 1.5rem;">
            ${createIcon('sparkles', 14, '#818cf8')} Open Academic & Placement Intelligence
          </div>

          <h1 style="font-size: 2.85rem; font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 1.25rem;">
            Empowering University Students with <br/>
            <span style="background: linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #c084fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              Free Knowledge & Career Alerts
            </span>
          </h1>

          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; max-width: 720px; margin: 0 auto 2rem auto;">
            Access verified lecture handouts, previous year question papers (PYQs), real company interview experiences, and instant multi-channel alerts across Website, Email, and Telegram.
          </p>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="/notes" data-link class="btn btn-primary btn-lg">
              ${createIcon('fileText', 18, '#fff')} Browse Notes (Free)
            </a>
            <a href="/jobs" data-link class="btn btn-secondary btn-lg">
              ${createIcon('briefcase', 18, 'currentColor')} Explore Jobs & Internships
            </a>
            <a href="/settings/notifications" data-link class="btn btn-outline btn-lg">
              ${createIcon('send', 18, '#38bdf8')} Connect Telegram
            </a>
          </div>

          <!-- Guarantee Pill -->
          <div style="margin-top: 2rem; display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.5rem 1rem; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); color: #6ee7b7; font-size: 0.825rem;">
            ${createIcon('check', 16, '#10b981')} 100% Free Downloads Forever • Zero credit cost for notes & exam papers
          </div>
        </div>
      </section>

      <!-- Top Banner AdSlot -->
      <div class="container" style="max-width: 980px;">
        ${renderAdSlot('home-top')}
      </div>

      <!-- Feature Pillar Cards -->
      <section style="padding: 2.5rem 1.25rem 3.5rem 1.25rem;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.85rem; font-weight: 800;">Everything a Student Needs in One Place</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
              Built by university toppers and placement mentors for the community.
            </p>
          </div>

          <div class="grid-cols-3">
            <div class="card" style="padding: 1.5rem; display: flex; flexDirection: column; justify-content: space-between;">
              <div>
                <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                  ${createIcon('graduationCap', 24, '#818cf8')}
                </div>
                <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem;">Verified Lecture Notes</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                  Filter handwritten notes, slides, and cheat sheets by branch, semester, subject code, and academic year.
                </p>
              </div>
              <a href="/notes" data-link class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;">
                Browse Notes ${createIcon('arrowRight', 14, 'currentColor')}
              </a>
            </div>

            <div class="card" style="padding: 1.5rem; display: flex; flexDirection: column; justify-content: space-between;">
              <div>
                <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                  ${createIcon('layers', 24, '#38bdf8')}
                </div>
                <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem;">Past Exam Papers (PYQs)</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                  University end-term, mid-term, and supplementary papers with solved answers and difficulty ratings.
                </p>
              </div>
              <a href="/pyqs" data-link class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;">
                Explore PYQs ${createIcon('arrowRight', 14, 'currentColor')}
              </a>
            </div>

            <div class="card" style="padding: 1.5rem; display: flex; flexDirection: column; justify-content: space-between;">
              <div>
                <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(236, 72, 153, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                  ${createIcon('messageSquare', 24, '#ec4899')}
                </div>
                <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem;">Interview Experiences</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                  Actual coding questions, system design rounds, and HR tips shared by placed students at Microsoft, Google, CRED & more.
                </p>
              </div>
              <a href="/interviews" data-link class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;">
                Read Debriefs ${createIcon('arrowRight', 14, 'currentColor')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Middle AdSlot -->
      <div class="container" style="max-width: 980px;">
        ${renderAdSlot('home-middle')}
      </div>
    </div>
  `;
}

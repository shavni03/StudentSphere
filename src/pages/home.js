import { renderAdSlot } from '../components/ads/adSlot.js';
import { createIcon } from '../icons.js';
import { mockNotes, mockPYQs, mockCompanies } from '../data/mockData.js';
import { CREDIT_CONFIG } from '../config/credits.js';
import { router } from '../router.js';

export function renderHomePage() {
  const topNotes = mockNotes.slice(0, 3);
  const featuredPYQs = mockPYQs.slice(0, 2);
  const topCompanies = mockCompanies.slice(0, 4);

  return `
    <div>
      <!-- Hero Section -->
      <section style="padding: 5rem 1.25rem 4rem 1.25rem; text-align: center; position: relative;">
        <div class="container" style="max-width: 920px;">
          
          <!-- Announcement Pill -->
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); color: #818cf8; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.75rem;">
            ${createIcon('sparkles', 16, '#818cf8')} Open Student Academic & Career Intelligence Hub
          </div>

          <!-- Main Title -->
          <h1 style="font-size: clamp(2.25rem, 5vw, 3.4rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 1.25rem; color: #fff;">
            Everything You Need for College, <br/>
            <span style="background: linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #c084fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              Exam Prep & Placements in One Place
            </span>
          </h1>

          <!-- Subtitle -->
          <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; max-width: 760px; margin: 0 auto 2.25rem auto;">
            Access verified lecture handouts, previous year question papers (PYQs), placement archives, company interview rounds, and instant alerts across Website, Email, and Telegram.
          </p>

          <!-- Interactive Quick Search Bar -->
          <div class="card" style="padding: 0.6rem; max-width: 680px; margin: 0 auto 1.5rem auto; display: flex; align-items: center; gap: 0.6rem; background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
            <div style="padding-left: 0.75rem; color: var(--text-muted); display: flex; align-items: center;">
              ${createIcon('search', 20, 'currentColor')}
            </div>
            <input 
              type="text" 
              id="hero-quick-search-input" 
              placeholder="Search DBMS notes, OS PYQs, Google interview rounds..." 
              style="flex: 1; background: transparent; border: none; outline: none; color: var(--text-primary); font-size: 0.95rem; font-family: inherit;"
            />
            <button id="hero-quick-search-btn" class="btn btn-primary" style="padding: 0.6rem 1.4rem; font-size: 0.9rem;">
              Search
            </button>
          </div>

          <!-- Quick Branch Filter Pills -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-right: 0.3rem;">Popular Branches:</span>
            ${['CSE', 'IT', 'AIDS', 'ECE', 'ME', 'EE'].map(b => `
              <a href="/notes?branch=${b}" data-link class="badge badge-outline" style="text-decoration: none; padding: 0.3rem 0.7rem; font-size: 0.75rem; cursor: pointer;">
                ${b}
              </a>
            `).join('')}
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <a href="/notes" data-link class="btn btn-primary btn-lg">
              ${createIcon('fileText', 18, '#fff')} Browse Notes (Free)
            </a>
            <a href="/pyqs" data-link class="btn btn-secondary btn-lg">
              ${createIcon('layers', 18, 'currentColor')} Explore PYQs
            </a>
            <a href="/jobs" data-link class="btn btn-secondary btn-lg">
              ${createIcon('briefcase', 18, 'currentColor')} Job Radar
            </a>
            <a href="/settings/notifications" data-link class="btn btn-outline btn-lg">
              ${createIcon('send', 18, '#38bdf8')} Connect Telegram
            </a>
          </div>

          <!-- Guarantee Badge -->
          <div style="display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.6rem 1.25rem; border-radius: var(--radius-full); background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); color: #10b981; font-size: 0.85rem; font-weight: 600;">
            ${createIcon('check', 16, '#10b981')} 100% Free Downloads Forever • Zero credit cost for notes & exam papers
          </div>
        </div>
      </section>

      <!-- Platform Live Metrics -->
      <section style="padding: 1.5rem 1.25rem 3rem 1.25rem;">
        <div class="container">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.25rem;">
            <div class="card" style="padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 800; color: #818cf8;">12,500+</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">Curated Lecture Notes</p>
            </div>
            <div class="card" style="padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 800; color: #38bdf8;">4,200+</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">Solved Past PYQ Papers</p>
            </div>
            <div class="card" style="padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 800; color: #10b981;">350+</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">Verified Hiring Companies</p>
            </div>
            <div class="card" style="padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 800; color: #f59e0b;">₹48.5 LPA</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">Highest Placement Offer</p>
            </div>
            <div class="card" style="padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 800; color: #a855f7;">28,000+</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">Empowered Students</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AdSlot Top -->
      <div class="container" style="max-width: 980px; margin-bottom: 2.5rem;">
        ${renderAdSlot('home-top')}
      </div>

      <!-- Core Academic & Placement Pillars -->
      <section style="padding: 2rem 1.25rem 3.5rem 1.25rem;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <h2 style="font-size: 2rem; font-weight: 800;">Academic & Career Platform Pillars</h2>
            <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.4rem; max-width: 600px; margin-left: auto; margin-right: auto;">
              Designed by college toppers and university placement mentors to accelerate your semester grades and placement prep.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            <!-- Pillar 1 -->
            <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                  ${createIcon('graduationCap', 26, '#818cf8')}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Verified Lecture Notes</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
                  Handwritten toppers' notes, typed PDF summaries, formulas, and cheat sheets filtered by branch, semester, and course code.
                </p>
              </div>
              <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.8rem; color: #10b981; font-weight: 600;">100% Free Downloads</span>
                <a href="/notes" data-link class="btn btn-secondary btn-sm">
                  Browse Notes ${createIcon('arrowRight', 14, 'currentColor')}
                </a>
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(56, 189, 248, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                  ${createIcon('layers', 26, '#38bdf8')}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Past Exam Papers (PYQs)</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
                  End-term and mid-term exam question papers across universities with step-by-step model solutions and weightage analysis.
                </p>
              </div>
              <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.8rem; color: #10b981; font-weight: 600;">Solved Answer Keys</span>
                <a href="/pyqs" data-link class="btn btn-secondary btn-sm">
                  Explore PYQs ${createIcon('arrowRight', 14, 'currentColor')}
                </a>
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(236, 72, 153, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                  ${createIcon('messageSquare', 26, '#ec4899')}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Interview Experiences</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
                  Real coding problems, system design rounds, and behavioral questions shared by placed seniors at top tier tech companies.
                </p>
              </div>
              <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.8rem; color: #ec4899; font-weight: 600;">Google, MS, Atlassian</span>
                <a href="/interviews" data-link class="btn btn-secondary btn-sm">
                  Read Debriefs ${createIcon('arrowRight', 14, 'currentColor')}
                </a>
              </div>
            </div>

            <!-- Pillar 4 -->
            <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                  ${createIcon('briefcase', 26, '#f59e0b')}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Job Radar & Openings</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
                  Curated on-campus drives and verified off-campus hiring opportunities with transparent CTC, eligibility, and direct apply links.
                </p>
              </div>
              <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.8rem; color: #f59e0b; font-weight: 600;">Internships & Full-Time</span>
                <a href="/jobs" data-link class="btn btn-secondary btn-sm">
                  Find Jobs ${createIcon('arrowRight', 14, 'currentColor')}
                </a>
              </div>
            </div>

            <!-- Pillar 5 -->
            <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                  ${createIcon('building', 26, '#10b981')}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Company Placement Hub</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
                  Company profiles with average compensation packages, branch hiring preferences, and interview preparation resource sheets.
                </p>
              </div>
              <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.8rem; color: #10b981; font-weight: 600;">Salary Benchmarks</span>
                <a href="/companies" data-link class="btn btn-secondary btn-sm">
                  View Companies ${createIcon('arrowRight', 14, 'currentColor')}
                </a>
              </div>
            </div>

            <!-- Pillar 6 -->
            <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(168, 85, 247, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                  ${createIcon('bell', 26, '#a855f7')}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Multi-Channel Alerts</h3>
                <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
                  Never miss an off-campus deadline, exam schedule change, or handout upload. Receive instant notifications via Website, Email, and Telegram.
                </p>
              </div>
              <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.8rem; color: #a855f7; font-weight: 600;">@StudentSphereBot</span>
                <a href="/settings/notifications" data-link class="btn btn-secondary btn-sm">
                  Alert Settings ${createIcon('arrowRight', 14, 'currentColor')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trending Notes Showcase -->
      <section style="padding: 3rem 1.25rem; background: rgba(255, 255, 255, 0.015); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
        <div class="container">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; gap: 1rem;">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Most Popular Handouts</span>
              <h2 style="font-size: 1.85rem; font-weight: 800; color: #fff;">Featured Semester Notes</h2>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
                Verified and downloaded by thousands of engineering and university students.
              </p>
            </div>
            <a href="/notes" data-link class="btn btn-outline">
              View All Notes (${mockNotes.length}+) ${createIcon('arrowRight', 14, 'currentColor')}
            </a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            ${topNotes.map(n => `
              <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                    <span class="badge badge-primary">${n.branch}</span>
                    <span class="badge badge-secondary">Sem ${n.semester}</span>
                  </div>
                  <h4 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem; line-height: 1.4;">
                    ${n.title}
                  </h4>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                    ${n.subject} (${n.subjectCode}) • ${n.resourceType}
                  </p>
                  <div style="font-size: 0.75rem; color: var(--text-dim); display: flex; gap: 0.75rem; margin-bottom: 1rem;">
                    <span>★ ${n.rating} / 5</span>
                    <span>📥 ${n.downloads} downloads</span>
                    <span>📄 ${n.pages} pages</span>
                  </div>
                </div>

                <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.75rem; color: #10b981; font-weight: 700;">FREE (0 Credits)</span>
                  <a href="/notes/${n.id}" data-link class="btn btn-primary btn-sm">
                    ${createIcon('download', 14, '#fff')} Free Download
                  </a>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Featured Solved Exam Papers (PYQs) -->
          <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px dashed var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Featured Solved PYQ Papers</h3>
              <a href="/pyqs" data-link style="font-size: 0.825rem; color: var(--primary); font-weight: 600;">
                All Question Papers &rarr;
              </a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem;">
              ${featuredPYQs.map(p => `
                <div class="card" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                  <div>
                    <span class="badge badge-success">${p.examType}</span>
                    <h5 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0.4rem 0 0.2rem 0;">${p.subject} (${p.year})</h5>
                    <p style="font-size: 0.75rem; color: var(--text-muted);">${p.university} • ${p.branch} Sem ${p.semester}</p>
                  </div>
                  <a href="/pyqs/${p.id}" data-link class="btn btn-outline btn-sm" style="white-space: nowrap;">
                    ${createIcon('download', 14, 'currentColor')} Free Paper
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Recruiting Partners & Companies -->
      <section style="padding: 3.5rem 1.25rem;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.85rem; font-weight: 800;">Top Placement Partners & Recruiters</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
              Companies hiring from university campuses across India.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
            ${topCompanies.map(c => `
              <div class="card" style="padding: 1.5rem; text-align: center;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.2rem; font-weight: 800; color: #818cf8;">
                  ${c.name.charAt(0)}
                </div>
                <h4 style="font-size: 1.1rem; font-weight: 700; color: #fff;">${c.name}</h4>
                <p style="font-size: 0.8rem; color: #10b981; font-weight: 600; margin-top: 0.25rem;">
                  Avg CTC: ${c.avgPackage || '₹28 LPA'}
                </p>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">
                  ${c.tier || 'Dream'} Recruiter • ${c.rolesCount || '4'} Openings
                </div>
                <a href="/companies/${c.id}" data-link class="btn btn-outline btn-sm" style="margin-top: 1rem; width: 100%;">
                  Company Insights
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Community Contributor Rewards / Credits Economy Banner -->
      <section style="padding: 3rem 1.25rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
        <div class="container" style="max-width: 900px; text-align: center;">
          <span class="badge badge-warning" style="margin-bottom: 0.75rem;">Community Credit Economy</span>
          <h2 style="font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">
            Share What You Know, Earn Community Recognition
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 680px; margin: 0 auto 2rem auto; line-height: 1.6;">
            Contribute your handwritten notes, formula cheat sheets, or interview experiences to earn credits and climb the university contributor leaderboard.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
            <div class="card" style="padding: 1.25rem;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #10b981;">+${CREDIT_CONFIG.NOTE_APPROVED} Credits</div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Per Approved Note</p>
            </div>
            <div class="card" style="padding: 1.25rem;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #38bdf8;">+${CREDIT_CONFIG.PYQ_APPROVED} Credits</div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Per Approved PYQ</p>
            </div>
            <div class="card" style="padding: 1.25rem;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #ec4899;">+${CREDIT_CONFIG.INTERVIEW_APPROVED} Credits</div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Per Interview Debrief</p>
            </div>
            <div class="card" style="padding: 1.25rem;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #f59e0b;">+${CREDIT_CONFIG.SIGNUP_BONUS} Credits</div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Welcome Signup Bonus</p>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="/notes/upload" data-link class="btn btn-primary">
              ${createIcon('upload', 16, '#fff')} Upload Notes
            </a>
            <a href="/upload-interview" data-link class="btn btn-secondary">
              ${createIcon('messageSquare', 16, 'currentColor')} Share Interview Experience
            </a>
            <a href="/credits" data-link class="btn btn-outline">
              Credits Ledger
            </a>
          </div>
        </div>
      </section>

      <!-- Student Testimonials -->
      <section style="padding: 3.5rem 1.25rem;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.85rem; font-weight: 800;">Trusted by University Students</h2>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
              Here is how StudentSphere helps engineering students succeed.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <div class="card" style="padding: 1.5rem;">
              <div style="color: #f59e0b; margin-bottom: 0.75rem;">★★★★★</div>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; font-style: italic;">
                "The 0-credit free download guarantee is real. During end-semesters, getting complete handwritten DBMS and Compiler Design notes saved my CGPA!"
              </p>
              <div style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #6366f1; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">A</div>
                <div>
                  <h5 style="font-size: 0.85rem; font-weight: 700; color: #fff;">Aarav Mehta</h5>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">CSE 6th Sem, DTU</span>
                </div>
              </div>
            </div>

            <div class="card" style="padding: 1.5rem;">
              <div style="color: #f59e0b; margin-bottom: 0.75rem;">★★★★★</div>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; font-style: italic;">
                "The interview debriefs for Microsoft and Atlassian helped me crack my SWE summer internship. The round-by-round breakdown was 100% accurate."
              </p>
              <div style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #10b981; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">P</div>
                <div>
                  <h5 style="font-size: 0.85rem; font-weight: 700; color: #fff;">Priya Sharma</h5>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">Placed at Atlassian (₹32 LPA)</span>
                </div>
              </div>
            </div>

            <div class="card" style="padding: 1.5rem;">
              <div style="color: #f59e0b; margin-bottom: 0.75rem;">★★★★★</div>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; font-style: italic;">
                "Connecting Telegram took 10 seconds. Now I get immediate alerts on off-campus hiring drives and exam dates without checking email all day."
              </p>
              <div style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #38bdf8; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">R</div>
                <div>
                  <h5 style="font-size: 0.85rem; font-weight: 700; color: #fff;">Rohan Verma</h5>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">IT 4th Sem, NSUT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom AdSlot -->
      <div class="container" style="max-width: 980px; margin-bottom: 3rem;">
        ${renderAdSlot('home-middle')}
      </div>
    </div>
  `;
}

export function bindHomePageEvents(container) {
  const searchInput = container.querySelector('#hero-quick-search-input');
  const searchBtn = container.querySelector('#hero-quick-search-btn');

  const executeSearch = () => {
    const q = searchInput?.value.trim();
    if (q) {
      router.navigate(`/notes?q=${encodeURIComponent(q)}`);
    } else {
      router.navigate('/notes');
    }
  };

  if (searchBtn) {
    searchBtn.onclick = executeSearch;
  }
  if (searchInput) {
    searchInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        executeSearch();
      }
    };
  }
}

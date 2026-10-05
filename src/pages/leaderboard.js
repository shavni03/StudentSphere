import { mockUsers } from '../data/mockData.js';
import { router } from '../router.js';

export function renderLeaderboardPage() {
  const query = router.getQueryParams();
  const period = query.get('period') || 'monthly';

  // Sort mock users by credits descending
  const sorted = [...mockUsers].sort((a, b) => b.credits - a.credits);

  return `
    <div class="container" style="padding: 2rem 1rem 4rem;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;">
          Academic Contribution Leaderboard
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.4rem;">
          Celebrating students and teachers who empower university peers with lecture handouts, exam solutions, and interview experiences.
        </p>
      </div>

      <!-- Time frame switch -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem;">
        <button class="btn ${period === 'monthly' ? 'btn-primary' : 'btn-outline'} leaderboard-tab" data-period="monthly">
          This Month
        </button>
        <button class="btn ${period === 'semester' ? 'btn-primary' : 'btn-outline'} leaderboard-tab" data-period="semester">
          This Semester
        </button>
        <button class="btn ${period === 'alltime' ? 'btn-primary' : 'btn-outline'} leaderboard-tab" data-period="alltime">
          All Time
        </button>
      </div>

      <!-- Top 3 Podium Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
        ${sorted.slice(0, 3).map((u, idx) => {
          const medal = idx === 0 ? '🥇 1st Place' : idx === 1 ? '🥈 2nd Place' : '🥉 3rd Place';
          const borderColor = idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : '#b45309';
          return `
            <div class="card" style="padding: 2rem 1.5rem; text-align: center; border-top: 4px solid ${borderColor};">
              <span style="font-size: 0.85rem; font-weight: 700; color: ${borderColor};">${medal}</span>
              <div style="width: 64px; height: 64px; border-radius: 50%; margin: 1rem auto 0.75rem; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: #fff;">
                ${u.name.charAt(0)}
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #fff;">${u.name}</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                ${u.branch} • ${u.college}
              </p>
              <div style="margin-top: 1rem; font-size: 1.25rem; font-weight: 800; color: #f59e0b;">
                🪙 ${u.credits} Cr
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Full Table -->
      <div class="card" style="padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Community Rankings</h3>
        <div style="overflow-x: auto;">
          <table class="table" style="width: 100%; text-align: left; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">
                <th style="padding: 0.75rem 1rem;">Rank</th>
                <th style="padding: 0.75rem 1rem;">Contributor</th>
                <th style="padding: 0.75rem 1rem;">Branch & College</th>
                <th style="padding: 0.75rem 1rem;">Role</th>
                <th style="padding: 0.75rem 1rem;">Credits</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map((u, i) => `
                <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.875rem;">
                  <td style="padding: 1rem; font-weight: 700; color: ${i < 3 ? '#f59e0b' : 'var(--text-muted)'};">
                    #${i + 1}
                  </td>
                  <td style="padding: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(99, 102, 241, 0.2); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: #818cf8;">
                        ${u.name.charAt(0)}
                      </div>
                      <span style="font-weight: 600; color: #fff;">${u.name}</span>
                    </div>
                  </td>
                  <td style="padding: 1rem; color: var(--text-secondary);">${u.branch} • ${u.college}</td>
                  <td style="padding: 1rem;">
                    <span class="badge ${u.role === 'Teacher' ? 'badge-primary' : 'badge-outline'}">${u.role}</span>
                  </td>
                  <td style="padding: 1rem; font-weight: 700; color: #f59e0b;">🪙 ${u.credits} Cr</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function bindLeaderboardEvents(container) {
  container.querySelectorAll('.leaderboard-tab').forEach(btn => {
    btn.onclick = () => {
      const period = btn.getAttribute('data-period');
      const q = router.getQueryParams();
      q.set('period', period);
      router.setQueryParams(Object.fromEntries(q.entries()));
    };
  });
}

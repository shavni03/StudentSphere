import { appState } from '../../state.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';

export function renderAdminLayout(contentHtml, activeTab = 'dashboard', title = 'Admin Portal', subtitle = '') {
  const user = appState.currentUser;
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/admin', icon: 'layers' },
    { key: 'notifications', label: 'Broadcast Hub', path: '/admin/notifications', icon: 'bell' },
    { key: 'users', label: 'User Directory', path: '/admin/users', icon: 'users' },
    { key: 'notes', label: 'Notes Moderation', path: '/admin/notes', icon: 'fileText' },
    { key: 'pyqs', label: 'PYQ Papers', path: '/admin/pyqs', icon: 'bookOpen' },
    { key: 'interviews', label: 'Interview Debriefs', path: '/admin/interviews', icon: 'messageSquare' },
    { key: 'companies', label: 'Companies', path: '/admin/companies', icon: 'briefcase' },
    { key: 'jobs', label: 'Job Radar & Openings', path: '/admin/jobs', icon: 'briefcase' },
    { key: 'reports', label: 'Content Reports', path: '/admin/reports', icon: 'shieldAlert' },
    { key: 'credits', label: 'Credit Ledger', path: '/admin/credits', icon: 'coins' },
    { key: 'analytics', label: 'Growth Analytics', path: '/admin/analytics', icon: 'barChart' },
    { key: 'settings', label: 'Platform Settings', path: '/admin/settings', icon: 'settings' }
  ];

  return `
    <div style="min-height: calc(100vh - 140px); display: flex;" class="admin-wrapper">
      <!-- Admin Sidebar -->
      <aside style="width: 260px; background: rgba(15, 23, 42, 0.95); border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; flex-shrink: 0;" class="admin-sidebar">
        <div style="padding: 1.5rem 1.25rem 1rem; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); display: flex; align-items: center; justify-content: center;">
              ${createIcon('shield', 18, '#fff')}
            </div>
            <div>
              <span style="font-weight: 800; font-size: 0.95rem; color: #fff;">Admin Hub</span>
              <span style="display: block; font-size: 0.65rem; color: #ef4444; font-weight: 700; text-transform: uppercase;">StudentSphere</span>
            </div>
          </div>
          <span class="badge badge-danger" style="font-size: 0.65rem;">ROOT</span>
        </div>

        <nav style="padding: 1rem 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; flex: 1; overflow-y: auto;">
          ${navItems.map(item => {
            const isActive = activeTab === item.key;
            return `
              <a 
                href="${item.path}" 
                data-link 
                style="display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.85rem; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: ${isActive ? '700' : '500'}; color: ${isActive ? '#fff' : 'var(--text-secondary)'}; background: ${isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent'}; border: 1px solid ${isActive ? 'rgba(99, 102, 241, 0.3)' : 'transparent'}; text-decoration: none;"
              >
                ${createIcon(item.icon, 16, isActive ? '#818cf8' : 'currentColor')}
                <span>${item.label}</span>
              </a>
            `;
          }).join('')}
        </nav>

        <div style="padding: 1rem; border-top: 1px solid var(--border-subtle); background: rgba(0, 0, 0, 0.2);">
          <button 
            id="admin-exit-view-btn"
            style="width: 100%; padding: 0.5rem 0.75rem; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); color: var(--text-secondary); font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem;"
          >
            ${createIcon('arrowLeft', 14, 'currentColor')} Exit to Student View
          </button>
        </div>
      </aside>

      <!-- Main Admin Content Area -->
      <main style="flex: 1; min-width: 0; display: flex; flex-direction: column; background: var(--bg-primary);">
        <!-- Admin Top Navigation Bar -->
        <div style="height: 64px; border-bottom: 1px solid var(--border-subtle); background: rgba(11, 15, 25, 0.8); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem;">
          <div>
            <h2 style="font-size: 1.15rem; font-weight: 700; color: #fff;">${title}</h2>
            ${subtitle ? `<p style="font-size: 0.75rem; color: var(--text-muted);">${subtitle}</p>` : ''}
          </div>

          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); font-size: 0.75rem; color: #a5b4fc;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span>
              Admin Session: <strong>${user.name}</strong>
            </div>
            <a href="/" data-link class="btn btn-outline" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">
              Portal Home &rarr;
            </a>
          </div>
        </div>

        <!-- Rendered Sub-Page Content -->
        <div style="flex: 1; padding: 2rem; overflow-y: auto;">
          ${contentHtml}
        </div>
      </main>
    </div>
  `;
}

export function bindAdminLayoutEvents(container) {
  const exitBtn = container.querySelector('#admin-exit-view-btn');
  if (exitBtn) {
    exitBtn.onclick = () => {
      appState.switchRole('student');
      router.navigate('/');
    };
  }
}

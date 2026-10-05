import { appState } from '../../state.js';
import { createIcon } from '../../icons.js';
import { router } from '../../router.js';
import { logout } from '../../auth.js';

function formatTimeAgo(dateString) {
  try {
    const diffSec = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  } catch {
    return 'Recently';
  }
}

function getTypeIcon(type) {
  switch (type) {
    case 'JOB_ALERT': return createIcon('briefcase', 16, '#38bdf8');
    case 'ACADEMIC': return createIcon('graduationCap', 16, '#818cf8');
    case 'PLACEMENT': return createIcon('star', 16, '#f59e0b');
    case 'INTERVIEW': return createIcon('messageSquare', 16, '#ec4899');
    case 'CREDIT': return createIcon('coins', 16, '#10b981');
    case 'SECURITY': return createIcon('shieldAlert', 16, '#ef4444');
    default: return createIcon('sparkles', 16, '#a855f7');
  }
}

export function renderNavbar() {
  const currentPath = window.location.pathname;
  const unread = appState.unreadCount;
  const user = appState.currentUser;
  const isDropdownOpen = appState.isDropdownOpen;
  const isUserMenuOpen = appState.isUserMenuOpen;
  const recent = appState.notifications ? appState.notifications.slice(0, 5) : [];

  // Dynamic Navigation Links based on Authentication State
  // LOGGED OUT: Home, About, Features, Contact
  // LOGGED IN: Home, Notes, PYQs, Placements, Jobs, Interviews, Dashboard
  const links = user ? [
    { label: 'Home', path: '/' },
    { label: 'Notes', path: '/notes' },
    { label: 'PYQs', path: '/pyqs' },
    { label: 'Placements', path: '/placements' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Interviews', path: '/interviews' },
    { label: 'Dashboard', path: '/dashboard' }
  ] : [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Contact', path: '/contact' }
  ];

  return `
    <header class="navbar-header" style="position: sticky; top: 0; z-index: 100; background: var(--bg-glass); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-subtle);">
      <div class="container" style="display: flex; align-items: center; justify-content: space-between; height: 70px;">
        
        <!-- Brand -->
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <a href="/" data-link style="display: flex; align-items: center; gap: 0.65rem; text-decoration: none;">
            <div style="width: 38px; height: 38px; border-radius: 12px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);">
              ${createIcon('graduationCap', 22, '#fff')}
            </div>
            <div>
              <span style="font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary);">
                Student<span style="color: #6366f1;">Sphere</span>
              </span>
              <span style="display: block; font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); line-height: 1;">
                Academic & Career Hub
              </span>
            </div>
          </a>

          <!-- Nav links (Desktop) -->
          <nav style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;" class="desktop-only-nav">
            ${links.map(l => {
              const active = l.path === '/' ? currentPath === '/' : currentPath.startsWith(l.path);
              return `
                <a href="${l.path}" data-link style="display: inline-flex; align-items: center; padding: 0.4rem 0.65rem; font-size: 0.85rem; font-weight: 600; border-radius: var(--radius-md); text-decoration: none; color: ${active ? 'var(--primary)' : 'var(--text-secondary)'}; background: ${active ? 'rgba(99, 102, 241, 0.12)' : 'transparent'}; border: 1px solid ${active ? 'rgba(99, 102, 241, 0.25)' : 'transparent'};">
                  ${l.label}
                </a>
              `;
            }).join('')}
          </nav>
        </div>

        <!-- Right Section -->
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          
          <!-- Theme Toggle (Light / Dark) -->
          <button
            id="navbar-theme-toggle-btn"
            title="Switch to ${appState.theme === 'dark' ? 'Light' : 'Dark'} Mode"
            style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--bg-tertiary); border: 1px solid var(--border-medium); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-primary); transition: var(--transition-fast);"
          >
            ${appState.theme === 'dark' ? createIcon('sun', 18, '#f59e0b') : createIcon('moon', 18, '#6366f1')}
          </button>

          ${user ? `
            <!-- 🔔 Notification Bell & Dropdown (Logged In) -->
            <div style="position: relative;" id="navbar-bell-container">
              <button
                id="notification-bell-btn"
                aria-label="Notifications"
                style="position: relative; width: 42px; height: 42px; border-radius: var(--radius-md); background: ${isDropdownOpen ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-tertiary)'}; border: 1px solid ${isDropdownOpen ? 'var(--primary)' : 'var(--border-medium)'}; color: ${isDropdownOpen ? '#fff' : 'var(--text-primary)'}; display: flex; align-items: center; justify-content: center; cursor: pointer;"
              >
                ${createIcon('bell', 20, isDropdownOpen ? '#fff' : 'currentColor')}
                ${unread > 0 ? `
                  <span id="navbar-unread-badge" style="position: absolute; top: -4px; right: -4px; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 10px; background: #ef4444; color: #fff; font-size: 0.72rem; font-weight: 700; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(239, 68, 68, 0.6); border: 2px solid #0b0f19;">
                    ${unread > 99 ? '99+' : unread}
                  </span>
                ` : ''}
              </button>

              <!-- Notification Dropdown -->
              ${isDropdownOpen ? `
                <div class="notification-dropdown">
                  <div style="padding: 1rem; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.02);">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <span style="font-weight: 700; font-size: 0.95rem; color: #fff;">Notifications</span>
                      ${unread > 0 ? `<span class="badge badge-primary">${unread} new</span>` : ''}
                    </div>
                    ${unread > 0 ? `
                      <button id="nav-mark-all-read-btn" style="background: transparent; border: none; color: var(--text-secondary); font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.3rem;">
                        ${createIcon('checkCheck', 14, 'currentColor')} Mark all read
                      </button>
                    ` : ''}
                  </div>

                  <div style="max-height: 340px; overflow-y: auto;">
                    ${recent.length === 0 ? `
                      <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                        No notifications right now
                      </div>
                    ` : recent.map(item => `
                      <div 
                        class="nav-notif-row" 
                        data-id="${item.id}"
                        data-url="${item.actionUrl || ''}"
                        style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-subtle); background: ${item.isRead ? 'transparent' : 'rgba(99, 102, 241, 0.07)'}; display: flex; gap: 0.75rem; align-items: flex-start; cursor: pointer; position: relative;"
                      >
                        <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255, 255, 255, 0.05); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                          ${getTypeIcon(item.type)}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                            <h5 style="font-size: 0.825rem; font-weight: ${item.isRead ? '600' : '700'}; color: ${item.isRead ? 'var(--text-secondary)' : '#fff'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                              ${item.title}
                            </h5>
                            ${!item.isRead ? '<span style="width: 7px; height: 7px; border-radius: 50%; background: #6366f1; flex-shrink: 0;"></span>' : ''}
                          </div>
                          <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
                            ${item.message}
                          </p>
                          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.4rem; font-size: 0.7rem;">
                            <span style="color: var(--text-dim);">${formatTimeAgo(item.createdAt)}</span>
                            <div style="display: flex; align-items: center; gap: 0.4rem;" class="nav-row-actions">
                              ${!item.isRead ? `
                                <button class="nav-mark-read-single-btn" data-id="${item.id}" title="Mark read" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 2px;">
                                  ${createIcon('check', 13, 'currentColor')}
                                </button>
                              ` : ''}
                              <button class="nav-delete-single-btn" data-id="${item.id}" title="Delete" style="background: transparent; border: none; color: var(--text-dim); cursor: pointer; padding: 2px;">
                                ${createIcon('trash', 13, 'currentColor')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <div style="padding: 0.75rem 1rem; border-top: 1px solid var(--border-subtle); background: rgba(15, 23, 42, 0.95); display: flex; align-items: center; justify-content: space-between;">
                    <a href="/notifications" data-link style="font-size: 0.8rem; font-weight: 600; color: var(--primary); display: flex; align-items: center; gap: 0.35rem;">
                      View all notifications ${createIcon('externalLink', 12, 'currentColor')}
                    </a>
                    <a href="/settings/notifications" data-link style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem;">
                      ${createIcon('settings', 13, 'currentColor')} Preferences
                    </a>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- User Profile Dropdown (Logged In) -->
            <div style="position: relative;" id="navbar-user-container">
              <button
                id="navbar-user-btn"
                style="display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.65rem; border-radius: var(--radius-md); background: var(--bg-tertiary); border: 1px solid var(--border-medium); cursor: pointer; color: var(--text-primary);"
              >
                <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">
                  ${user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <span style="font-size: 0.825rem; font-weight: 600;" class="desktop-username">${user.name || 'Account'}</span>
                ${createIcon('chevronDown', 14, 'currentColor')}
              </button>

              ${isUserMenuOpen ? `
                <div style="position: absolute; top: calc(100% + 10px); right: 0; width: 250px; background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); padding: 0.5rem; z-index: 1000;">
                  <div style="padding: 0.6rem; border-bottom: 1px solid var(--border-subtle);">
                    <p style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">${user.name}</p>
                    <p style="font-size: 0.75rem; color: var(--text-muted); word-break: break-all;">${user.email}</p>
                    <div style="display: flex; gap: 0.4rem; margin-top: 0.5rem; flex-wrap: wrap;">
                      <span class="badge ${user.role === 'admin' ? 'badge-danger' : 'badge-primary'}">
                        ${user.role === 'admin' ? '🛡️ Admin' : '🎓 Student'}
                      </span>
                      <span class="badge ${user.isEmailVerified ? 'badge-success' : 'badge-warning'}">
                        ${user.isEmailVerified ? '✓ Verified' : '⚠️ Unverified'}
                      </span>
                      <span class="badge badge-warning">🪙 ${user.credits || 0} Cr</span>
                    </div>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 2px; padding: 0.4rem 0; border-bottom: 1px solid var(--border-subtle);">
                    <a href="/dashboard" data-link class="btn-ghost" style="padding: 0.45rem 0.65rem; font-size: 0.82rem; justify-content: flex-start; text-decoration: none;">
                      ${createIcon('grid', 14, 'currentColor')} My Dashboard
                    </a>
                    <a href="/profile" data-link class="btn-ghost" style="padding: 0.45rem 0.65rem; font-size: 0.82rem; justify-content: flex-start; text-decoration: none;">
                      ${createIcon('user', 14, 'currentColor')} Student Profile
                    </a>
                    <a href="/my-notes" data-link class="btn-ghost" style="padding: 0.45rem 0.65rem; font-size: 0.82rem; justify-content: flex-start; text-decoration: none;">
                      ${createIcon('fileText', 14, 'currentColor')} My Academic Uploads
                    </a>
                    <a href="/saved-jobs" data-link class="btn-ghost" style="padding: 0.45rem 0.65rem; font-size: 0.82rem; justify-content: flex-start; text-decoration: none;">
                      ${createIcon('bookmark', 14, 'currentColor')} Saved Jobs
                    </a>
                    <a href="/credits" data-link class="btn-ghost" style="padding: 0.45rem 0.65rem; font-size: 0.82rem; justify-content: flex-start; text-decoration: none;">
                      ${createIcon('coins', 14, 'currentColor')} Credits & Rewards
                    </a>
                    <a href="/settings" data-link class="btn-ghost" style="padding: 0.45rem 0.65rem; font-size: 0.82rem; justify-content: flex-start; text-decoration: none;">
                      ${createIcon('settings', 14, 'currentColor')} Account Settings
                    </a>
                    ${user.role === 'admin' ? `
                      <a href="/admin" data-link class="btn-ghost" style="padding: 0.45rem 0.65rem; font-size: 0.82rem; justify-content: flex-start; color: #f87171; text-decoration: none;">
                        ${createIcon('shield', 14, '#f87171')} Admin Moderation Suite
                      </a>
                    ` : ''}
                  </div>

                  <div style="padding-top: 0.4rem;">
                    <button
                      id="nav-logout-btn"
                      style="width: 100%; padding: 0.45rem 0.65rem; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-sm); color: #ef4444; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem; transition: var(--transition-fast);"
                    >
                      ${createIcon('logOut', 14, 'currentColor')} Logout
                    </button>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : `
            <!-- Logged Out Actions: Sign In & Register -->
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <a href="/login" data-link class="btn btn-outline" style="padding: 0.4rem 0.85rem; font-size: 0.825rem; font-weight: 600; text-decoration: none;">
                Login
              </a>
              <a href="/register" data-link class="btn btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.825rem; font-weight: 600; text-decoration: none;">
                Register
              </a>
            </div>
          `}
        </div>
      </div>
    </header>
  `;
}

export function bindNavbarEvents(container) {
  // Theme toggle
  const themeToggle = container.querySelector('#navbar-theme-toggle-btn');
  if (themeToggle) {
    themeToggle.onclick = () => {
      appState.toggleTheme();
    };
  }

  // Bell toggle
  const bellBtn = container.querySelector('#notification-bell-btn');
  if (bellBtn) {
    bellBtn.onclick = (e) => {
      e.stopPropagation();
      appState.setDropdownOpen(!appState.isDropdownOpen);
      appState.setUserMenuOpen(false);
    };
  }

  // User menu toggle
  const userBtn = container.querySelector('#navbar-user-btn');
  if (userBtn) {
    userBtn.onclick = (e) => {
      e.stopPropagation();
      appState.setUserMenuOpen(!appState.isUserMenuOpen);
      appState.setDropdownOpen(false);
    };
  }

  // Logout button
  const logoutBtn = container.querySelector('#nav-logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await logout();
    };
  }

  // Mark all notifications read
  const markAllBtn = container.querySelector('#nav-mark-all-read-btn');
  if (markAllBtn) {
    markAllBtn.onclick = (e) => {
      e.stopPropagation();
      appState.markAllAsRead();
    };
  }

  // Notification row clicks
  container.querySelectorAll('.nav-notif-row').forEach(row => {
    row.onclick = (e) => {
      if (e.target.closest('.nav-row-actions')) return;
      const id = row.getAttribute('data-id');
      const url = row.getAttribute('data-url');
      appState.markAsRead(id);
      appState.setDropdownOpen(false);
      if (url) router.navigate(url);
    };
  });

  // Mark single read
  container.querySelectorAll('.nav-mark-read-single-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      appState.markAsRead(id);
    };
  });

  // Delete single notification
  container.querySelectorAll('.nav-delete-single-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      appState.deleteNotification(id);
    };
  });
}

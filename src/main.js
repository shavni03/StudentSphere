import './index.css';
import { router } from './router.js';
import { appState } from './state.js';
import { renderNavbar, bindNavbarEvents } from './components/layout/navbar.js';
import { renderFooter } from './components/layout/footer.js';

// Public Academic & Career Pages
import { renderHomePage, bindHomePageEvents } from './pages/home.js';
import { renderNotesPage, bindNotesPageEvents } from './pages/notes.js';
import { renderNoteDetailPage, bindNoteDetailPageEvents } from './pages/noteDetail.js';
import { renderPYQsPage, bindPYQsPageEvents } from './pages/pyqs.js';
import { renderPYQDetailPage, bindPYQDetailPageEvents } from './pages/pyqDetail.js';
import { renderJobsPage, bindJobsPageEvents } from './pages/jobs.js';
import { renderJobDetailPage, bindJobDetailPageEvents } from './pages/jobDetail.js';
import { renderInterviewsPage, bindInterviewsPageEvents } from './pages/interviews.js';
import { renderInterviewDetailPage, bindInterviewDetailPageEvents } from './pages/interviewDetail.js';
import { renderCompaniesPage, bindCompaniesPageEvents } from './pages/companies.js';
import { renderCompanyDetailPage, bindCompanyDetailEvents } from './pages/companyDetail.js';
import { renderPlacementsPage, bindPlacementsEvents } from './pages/placements.js';

// Notification Center Pages
import { renderNotificationsPage, bindNotificationsPageEvents } from './pages/notifications.js';
import { renderNotificationPreferencesPage, bindNotificationPreferencesEvents } from './pages/notificationPreferences.js';

// User & Community Pages
import { renderDashboardPage, bindDashboardEvents } from './pages/dashboard.js';
import { renderProfilePage, bindProfileEvents } from './pages/profile.js';
import { renderSettingsPage, bindSettingsEvents } from './pages/settings.js';
import { renderCreditsPage, bindCreditsEvents } from './pages/credits.js';
import { renderLeaderboardPage, bindLeaderboardEvents } from './pages/leaderboard.js';
import { renderSavedJobsPage, bindSavedJobsEvents } from './pages/savedJobs.js';
import { renderUploadsPage, bindUploadsEvents } from './pages/uploads.js';
import { renderMyNotesPage, bindMyNotesEvents } from './pages/myNotes.js';
import { renderUploadInterviewPage, bindUploadInterviewEvents } from './pages/uploadInterview.js';
import { checkAuth } from './auth.js';

// Auth Pages (No Ads)
import { renderLoginPage, bindLoginEvents } from './pages/auth/login.js';
import { renderRegisterPage, bindRegisterEvents } from './pages/auth/register.js';
import { renderVerifyEmailPage, bindVerifyEmailEvents } from './pages/auth/verifyEmail.js';
import { renderForgotPasswordPage, bindForgotPasswordEvents } from './pages/auth/forgotPassword.js';

// Admin Suite Pages (No Ads)
import { renderAdminDashboardPage, bindAdminDashboardEvents } from './pages/admin/adminDashboard.js';
import { renderAdminNotificationsPage, bindAdminNotificationsEvents } from './pages/admin/adminNotifications.js';
import { renderAdminUsersPage, bindAdminUsersEvents } from './pages/admin/adminUsers.js';
import { renderAdminNotesPage, bindAdminNotesEvents } from './pages/admin/adminNotes.js';
import { renderAdminPYQsPage, bindAdminPYQsEvents } from './pages/admin/adminPYQs.js';
import { renderAdminInterviewsPage, bindAdminInterviewsEvents } from './pages/admin/adminInterviews.js';
import { renderAdminCompaniesPage, bindAdminCompaniesEvents } from './pages/admin/adminCompanies.js';
import { renderAdminJobsPage, bindAdminJobsEvents } from './pages/admin/adminJobs.js';
import { renderAdminReportsPage, bindAdminReportsEvents } from './pages/admin/adminReports.js';
import { renderAdminCreditsPage, bindAdminCreditsEvents } from './pages/admin/adminCredits.js';
import { renderAdminAnalyticsPage, bindAdminAnalyticsEvents } from './pages/admin/adminAnalytics.js';
import { renderAdminSettingsPage, bindAdminSettingsEvents } from './pages/admin/adminSettings.js';

const rootEl = document.getElementById('root');

function renderAppShell(contentHtml, bindContentFn, pageTitle = 'StudentSphere', options = {}) {
  document.title = `${pageTitle} — StudentSphere`;

  const isAuth = options.isAuth || false;
  const isAdmin = options.isAdmin || false;

  rootEl.innerHTML = `
    <div id="navbar-mount"></div>
    <main id="app-content" style="flex: 1 0 auto; display: flex; flex-direction: column;">
      ${contentHtml}
    </main>
    <div id="footer-mount"></div>
  `;

  const navMount = document.getElementById('navbar-mount');
  const footerMount = document.getElementById('footer-mount');
  const appContent = document.getElementById('app-content');

  // Render Navbar
  navMount.innerHTML = renderNavbar();
  bindNavbarEvents(navMount);

  // Render Footer (except on full auth screens or admin layout which has its own sidebar)
  if (!isAuth && !isAdmin) {
    footerMount.innerHTML = renderFooter();
  }

  // Bind page interactions
  if (typeof bindContentFn === 'function') {
    bindContentFn(appContent, options.params);
  }
}

// Global outside-click handler for dropdowns
document.addEventListener('click', (e) => {
  if (appState.isDropdownOpen) {
    const bellContainer = document.getElementById('navbar-bell-container');
    if (bellContainer && !bellContainer.contains(e.target)) {
      appState.setDropdownOpen(false);
    }
  }

  if (appState.isUserMenuOpen) {
    const userContainer = document.getElementById('navbar-user-container');
    if (userContainer && !userContainer.contains(e.target)) {
      appState.setUserMenuOpen(false);
    }
  }
});

// Reactively update navbar when state changes (e.g. notifications marked read)
appState.subscribe(() => {
  const navMount = document.getElementById('navbar-mount');
  if (navMount) {
    navMount.innerHTML = renderNavbar();
    bindNavbarEvents(navMount);
  }
});

// Register SPA Routes
router
  // Public & Academic
  .addRoute('/', () => {
    renderAppShell(renderHomePage(), bindHomePageEvents, 'Open Academic & Career Platform');
  })
  .addRoute('/notes', () => {
    renderAppShell(renderNotesPage(), bindNotesPageEvents, 'Lecture Notes & Study Material');
  })
  .addRoute('/notes/:id', (params) => {
    renderAppShell(renderNoteDetailPage(params), bindNoteDetailPageEvents, 'Handout Details', { params });
  })
  .addRoute('/pyqs', () => {
    renderAppShell(renderPYQsPage(), bindPYQsPageEvents, 'Previous Examination Papers');
  })
  .addRoute('/pyqs/:id', (params) => {
    renderAppShell(renderPYQDetailPage(params), bindPYQDetailPageEvents, 'PYQ Paper Details', { params });
  })
  .addRoute('/jobs', () => {
    renderAppShell(renderJobsPage(), bindJobsPageEvents, 'Campus Placements & Job Radar');
  })
  .addRoute('/jobs/:id', (params) => {
    renderAppShell(renderJobDetailPage(params), bindJobDetailPageEvents, 'Job Position Details', { params });
  })
  .addRoute('/interviews', () => {
    renderAppShell(renderInterviewsPage(), bindInterviewsPageEvents, 'Company Interview Debriefs');
  })
  .addRoute('/interviews/:id', (params) => {
    renderAppShell(renderInterviewDetailPage(params), bindInterviewDetailPageEvents, 'Interview Experience', { params });
  })
  .addRoute('/companies', () => {
    renderAppShell(renderCompaniesPage(), bindCompaniesPageEvents, 'Recruiter & Company Directory');
  })
  .addRoute('/companies/:id', (params) => {
    renderAppShell(renderCompanyDetailPage(params), bindCompanyDetailEvents, 'Company Profile', { params });
  })
  .addRoute('/placements', () => {
    renderAppShell(renderPlacementsPage(), bindPlacementsEvents, 'Placement & Salary Benchmark Statistics');
  })

  // Notifications
  .addRoute('/notifications', () => {
    renderAppShell(renderNotificationsPage(), bindNotificationsPageEvents, 'Notification Center');
  })
  .addRoute('/settings/notifications', () => {
    renderAppShell(renderNotificationPreferencesPage(), bindNotificationPreferencesEvents, 'Notification & Channel Preferences');
  })

  // User Space & Community
  .addRoute('/dashboard', () => {
    if (!checkAuth()) return;
    renderAppShell(renderDashboardPage(), bindDashboardEvents, 'Student Dashboard');
  })
  .addRoute('/my-notes', () => {
    if (!checkAuth()) return;
    renderAppShell(renderMyNotesPage(), bindMyNotesEvents, 'My Academic Contributions');
  })
  .addRoute('/upload-interview', () => {
    if (!checkAuth()) return;
    renderAppShell(renderUploadInterviewPage(), bindUploadInterviewEvents, 'Share Interview Experience');
  })
  .addRoute('/profile', () => {
    if (!checkAuth()) return;
    renderAppShell(renderProfilePage(), bindProfileEvents, 'My Student Profile');
  })
  .addRoute('/settings', () => {
    if (!checkAuth()) return;
    renderAppShell(renderSettingsPage(), bindSettingsEvents, 'Account Settings');
  })
  .addRoute('/credits', () => {
    renderAppShell(renderCreditsPage(), bindCreditsEvents, 'Credits & Rewards');
  })
  .addRoute('/leaderboard', () => {
    renderAppShell(renderLeaderboardPage(), bindLeaderboardEvents, 'Academic Leaderboard');
  })
  .addRoute('/saved-jobs', () => {
    if (!checkAuth()) return;
    renderAppShell(renderSavedJobsPage(), bindSavedJobsEvents, 'Saved Job Opportunities');
  })
  .addRoute('/uploads', (params) => {
    if (!checkAuth()) return;
    renderAppShell(renderUploadsPage(params), bindUploadsEvents, 'Upload Academic Resource');
  })
  .addRoute('/notes/upload', (params) => {
    if (!checkAuth()) return;
    renderAppShell(renderUploadsPage(params), bindUploadsEvents, 'Upload Lecture Notes (+50 Cr)');
  })
  .addRoute('/pyqs/upload', (params) => {
    if (!checkAuth()) return;
    renderAppShell(renderUploadsPage(params), bindUploadsEvents, 'Upload Past Exam Paper (+40 Cr)');
  })

  // Auth Routes (No Ads)
  .addRoute('/login', () => {
    renderAppShell(renderLoginPage(), bindLoginEvents, 'Sign In', { isAuth: true });
  })
  .addRoute('/register', () => {
    renderAppShell(renderRegisterPage(), bindRegisterEvents, 'Create Student Account', { isAuth: true });
  })
  .addRoute('/verify-email', () => {
    renderAppShell(renderVerifyEmailPage(), bindVerifyEmailEvents, 'Verify Email KYC', { isAuth: true });
  })
  .addRoute('/forgot-password', () => {
    renderAppShell(renderForgotPasswordPage(), bindForgotPasswordEvents, 'Forgot Password', { isAuth: true });
  })

  // Admin Portal Routes (No Ads)
  .addRoute('/admin', () => {
    renderAppShell(renderAdminDashboardPage(), bindAdminDashboardEvents, 'Admin Dashboard', { isAdmin: true });
  })
  .addRoute('/admin/dashboard', () => {
    renderAppShell(renderAdminDashboardPage(), bindAdminDashboardEvents, 'Admin Dashboard', { isAdmin: true });
  })
  .addRoute('/admin/notifications', () => {
    renderAppShell(renderAdminNotificationsPage(), bindAdminNotificationsEvents, 'Admin Broadcast Hub', { isAdmin: true });
  })
  .addRoute('/admin/users', () => {
    renderAppShell(renderAdminUsersPage(), bindAdminUsersEvents, 'Admin User Management', { isAdmin: true });
  })
  .addRoute('/admin/notes', () => {
    renderAppShell(renderAdminNotesPage(), bindAdminNotesEvents, 'Admin Notes Moderation', { isAdmin: true });
  })
  .addRoute('/admin/pyqs', () => {
    renderAppShell(renderAdminPYQsPage(), bindAdminPYQsEvents, 'Admin PYQ Moderation', { isAdmin: true });
  })
  .addRoute('/admin/interviews', () => {
    renderAppShell(renderAdminInterviewsPage(), bindAdminInterviewsEvents, 'Admin Interview Debriefs', { isAdmin: true });
  })
  .addRoute('/admin/companies', () => {
    renderAppShell(renderAdminCompaniesPage(), bindAdminCompaniesEvents, 'Admin Partner Companies', { isAdmin: true });
  })
  .addRoute('/admin/jobs', () => {
    renderAppShell(renderAdminJobsPage(), bindAdminJobsEvents, 'Admin Job Postings', { isAdmin: true });
  })
  .addRoute('/admin/reports', () => {
    renderAppShell(renderAdminReportsPage(), bindAdminReportsEvents, 'Admin Content Reports', { isAdmin: true });
  })
  .addRoute('/admin/credits', () => {
    renderAppShell(renderAdminCreditsPage(), bindAdminCreditsEvents, 'Admin Credit Economy', { isAdmin: true });
  })
  .addRoute('/admin/analytics', () => {
    renderAppShell(renderAdminAnalyticsPage(), bindAdminAnalyticsEvents, 'Admin Platform Analytics', { isAdmin: true });
  })
  .addRoute('/admin/settings', () => {
    renderAppShell(renderAdminSettingsPage(), bindAdminSettingsEvents, 'Admin System Policies', { isAdmin: true });
  })

  // 404 Fallback
  .addRoute('*', () => {
    renderAppShell(`
      <div class="container" style="padding: 5rem 1rem; text-align: center;">
        <h1 style="font-size: 3.5rem; font-weight: 800; color: #818cf8;">404</h1>
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0.5rem 0 1rem;">Page Not Found</h2>
        <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 2rem;">
          The academic module or resource you requested is not available. Check the URL or return to home.
        </p>
        <a href="/" data-link class="btn btn-primary">Return to Homepage</a>
      </div>
    `, null, 'Page Not Found');
  });

// Launch SPA
router.resolve();

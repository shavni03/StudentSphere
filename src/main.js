import './index.css';
import { router } from './router.js';
import { appState } from './state.js';
import { createIcon } from './icons.js';
import { renderNavbar, bindNavbarEvents } from './components/layout/navbar.js';
import { renderFooter } from './components/layout/footer.js';
import { waitForAuthInit, isLoggedIn, isEmailVerified, verifyAdminStatus } from './auth.js';

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

// Legal & Trust Pages (AdSense Compliance - Public)
import { renderAboutPage } from './pages/about.js';
import { renderFeaturesPage } from './pages/features.js';
import { renderContactPage, bindContactEvents } from './pages/contact.js';
import { renderPrivacyPage } from './pages/privacy.js';
import { renderTermsPage } from './pages/terms.js';
import { renderCookiePolicyPage } from './pages/cookiePolicy.js';

// User & Community Pages (Protected)
import { renderDashboardPage, bindDashboardEvents } from './pages/dashboard.js';
import { renderProfilePage, bindProfileEvents } from './pages/profile.js';
import { renderSettingsPage, bindSettingsEvents } from './pages/settings.js';
import { renderCreditsPage, bindCreditsEvents } from './pages/credits.js';
import { renderLeaderboardPage, bindLeaderboardEvents } from './pages/leaderboard.js';
import { renderSavedJobsPage, bindSavedJobsEvents } from './pages/savedJobs.js';
import { renderUploadsPage, bindUploadsEvents } from './pages/uploads.js';
import { renderMyNotesPage, bindMyNotesEvents } from './pages/myNotes.js';
import { renderUploadInterviewPage, bindUploadInterviewEvents } from './pages/uploadInterview.js';

// Auth Pages (No Ads)
import { renderLoginPage, bindLoginEvents } from './pages/auth/login.js';
import { renderRegisterPage, bindRegisterEvents } from './pages/auth/register.js';
import { renderVerifyEmailPage, bindVerifyEmailEvents } from './pages/auth/verifyEmail.js';
import { renderForgotPasswordPage, bindForgotPasswordEvents } from './pages/auth/forgotPassword.js';

// Admin Suite Pages (No Ads - Admin Authorization Required)
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

export function renderAppShell(contentHtml, bindContentFn, pageTitle = 'StudentSphere', options = {}) {
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

  // Render Footer (except on auth screens or admin layout)
  if (!isAuth && !isAdmin) {
    footerMount.innerHTML = renderFooter();
  }

  // Bind page interactions
  if (typeof bindContentFn === 'function') {
    bindContentFn(appContent, options.params);
  }
}

/**
 * Protected Page Guard
 * Strictly enforces:
 * 1. Authentication loading state while Firebase initializes
 * 2. Login required prompt if unauthenticated (with ?redirect=... preservation)
 * 3. Mandatory email verification check (redirects to /auth/verify-email.html)
 * 4. Administrator role check for /admin/*
 */
async function renderProtectedPage(renderFn, bindFn, pageTitle, options = {}) {
  const currentPathWithQuery = window.location.pathname + window.location.search;

  // 1. Auth Loading State (Do not expose protected content before auth completes)
  if (!appState.isAuthInitialized) {
    renderAppShell(`
      <div class="container" style="padding: 6rem 1rem; text-align: center; max-width: 480px; margin: 0 auto;">
        <div style="width: 48px; height: 48px; border: 3px solid rgba(99, 102, 241, 0.2); border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.5rem;"></div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Checking your account...</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted);">Verifying StudentSphere session and credentials.</p>
      </div>
    `, null, 'Checking Authorization...', { isProtected: true });

    await waitForAuthInit();
    return renderProtectedPage(renderFn, bindFn, pageTitle, options);
  }

  // 2. Unauthenticated User Check (Show Login Required card, no blank page)
  if (!isLoggedIn()) {
    const targetRedirect = currentPathWithQuery.startsWith('/auth/') ? '/' : currentPathWithQuery;
    const loginUrl = `/auth/login.html?redirect=${encodeURIComponent(targetRedirect)}`;
    const registerUrl = `/auth/register.html?redirect=${encodeURIComponent(targetRedirect)}`;

    renderAppShell(`
      <div class="container" style="padding: 5rem 1rem; max-width: 520px; margin: 0 auto; text-align: center;">
        <div class="card" style="padding: 2.5rem 2rem; border: 1px solid var(--border-medium); box-shadow: var(--shadow-lg);">
          <div style="width: 60px; height: 60px; border-radius: 16px; background: rgba(99, 102, 241, 0.12); color: #6366f1; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            ${createIcon('lock', 28, '#6366f1')}
          </div>
          <span class="badge badge-warning" style="margin-bottom: 0.85rem;">Access Restricted</span>
          <h1 style="font-size: 1.65rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
            Login required
          </h1>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.75rem;">
            Create your free StudentSphere account to access student resources.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <a href="${loginUrl}" data-link class="btn btn-primary" style="padding: 0.65rem 1.6rem; font-size: 0.9rem; text-decoration: none;">
              Login
            </a>
            <a href="${registerUrl}" data-link class="btn btn-outline" style="padding: 0.65rem 1.6rem; font-size: 0.9rem; text-decoration: none;">
              Create Account
            </a>
          </div>
          <p style="margin-top: 1.5rem; font-size: 0.825rem; color: var(--text-muted);">
            Please login to continue.
          </p>
        </div>
      </div>
    `, null, 'Login Required', { isProtected: true });
    return;
  }

  // 3. Admin Role Check or Student Email Verification Check
  if (options.isAdmin) {
    const adminCheck = await verifyAdminStatus();
    if (!adminCheck.allowed) {
      if (adminCheck.status === 'EMAIL_UNVERIFIED') {
        const targetRedirect = currentPathWithQuery.startsWith('/auth/') ? '/' : currentPathWithQuery;
        const verifyUrl = `/auth/verify-email.html?redirect=${encodeURIComponent(targetRedirect)}`;
        router.navigate(verifyUrl);
        return;
      }

      const heading = adminCheck.status === 'PROFILE_NOT_FOUND'
        ? 'User Profile Not Found'
        : adminCheck.status === 'FIRESTORE_ERROR'
          ? 'Verification Error'
          : 'Access Denied';

      const badgeText = adminCheck.status === 'PROFILE_NOT_FOUND'
        ? 'Profile Missing'
        : adminCheck.status === 'FIRESTORE_ERROR'
          ? 'Service Unavailable'
          : 'Access Restricted (403)';

      renderAppShell(`
        <div class="container" style="padding: 5rem 1rem; max-width: 520px; margin: 0 auto; text-align: center;">
          <div class="card" style="padding: 2.5rem 2rem; border: 1px solid rgba(239, 68, 68, 0.3); box-shadow: var(--shadow-lg);">
            <div style="width: 60px; height: 60px; border-radius: 16px; background: rgba(239, 68, 68, 0.12); color: #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
              ${createIcon('shieldAlert', 28, '#ef4444')}
            </div>
            <span class="badge badge-danger" style="margin-bottom: 0.85rem;">${badgeText}</span>
            <h1 style="font-size: 1.65rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
              ${heading}
            </h1>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.75rem;">
              ${adminCheck.message || 'Access Denied. Administrator permissions are required.'}
            </p>
            <a href="/dashboard" data-link class="btn btn-primary" style="text-decoration: none;">
              Return to Student Dashboard
            </a>
          </div>
        </div>
      `, null, heading, { isAdmin: true });
      return;
    }
  } else {
    // Standard Student protected page -> requires verified email
    if (!isEmailVerified()) {
      const targetRedirect = currentPathWithQuery.startsWith('/auth/') ? '/' : currentPathWithQuery;
      const verifyUrl = `/auth/verify-email.html?redirect=${encodeURIComponent(targetRedirect)}`;
      router.navigate(verifyUrl);
      return;
    }
  }

  // Authorized -> Render requested content
  const content = typeof renderFn === 'function' ? renderFn(options.params) : renderFn;
  renderAppShell(content, bindFn, pageTitle, options);
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

// Reactively update navbar when state changes
appState.subscribe(() => {
  const navMount = document.getElementById('navbar-mount');
  if (navMount) {
    navMount.innerHTML = renderNavbar();
    bindNavbarEvents(navMount);
  }
});

// ==========================================
// SPA ROUTE DEFINITIONS
// ==========================================
router
  // ----------------------------------------
  // 1. PUBLIC PAGES (No Login Required)
  // ----------------------------------------
  .addRoute('/', () => {
    renderAppShell(renderHomePage(), bindHomePageEvents, 'Open Academic & Career Platform');
  })
  .addRoute('/index.html', () => {
    renderAppShell(renderHomePage(), bindHomePageEvents, 'Open Academic & Career Platform');
  })
  .addRoute('/about', () => {
    renderAppShell(renderAboutPage(), null, 'About StudentSphere — Mission & Moderation');
  })
  .addRoute('/about.html', () => {
    renderAppShell(renderAboutPage(), null, 'About StudentSphere — Mission & Moderation');
  })
  .addRoute('/features', () => {
    renderAppShell(renderFeaturesPage(), null, 'Platform Features & Academic Tools');
  })
  .addRoute('/features.html', () => {
    renderAppShell(renderFeaturesPage(), null, 'Platform Features & Academic Tools');
  })
  .addRoute('/contact', () => {
    renderAppShell(renderContactPage(), bindContactEvents, 'Contact Us & Student Support');
  })
  .addRoute('/contact.html', () => {
    renderAppShell(renderContactPage(), bindContactEvents, 'Contact Us & Student Support');
  })
  .addRoute('/privacy', () => {
    renderAppShell(renderPrivacyPage(), null, 'Privacy Policy');
  })
  .addRoute('/privacy.html', () => {
    renderAppShell(renderPrivacyPage(), null, 'Privacy Policy');
  })
  .addRoute('/terms', () => {
    renderAppShell(renderTermsPage(), null, 'Terms & Conditions of Service');
  })
  .addRoute('/terms.html', () => {
    renderAppShell(renderTermsPage(), null, 'Terms & Conditions of Service');
  })
  .addRoute('/cookie-policy', () => {
    renderAppShell(renderCookiePolicyPage(), null, 'Cookie & Storage Policy');
  })
  .addRoute('/cookie-policy.html', () => {
    renderAppShell(renderCookiePolicyPage(), null, 'Cookie & Storage Policy');
  })

  // ----------------------------------------
  // 2. AUTHENTICATION PAGES (Public - No Ads)
  // ----------------------------------------
  .addRoute('/login', () => {
    renderAppShell(renderLoginPage(), bindLoginEvents, 'Sign In', { isAuth: true });
  })
  .addRoute('/auth/login', () => {
    renderAppShell(renderLoginPage(), bindLoginEvents, 'Sign In', { isAuth: true });
  })
  .addRoute('/auth/login.html', () => {
    renderAppShell(renderLoginPage(), bindLoginEvents, 'Sign In', { isAuth: true });
  })
  .addRoute('/register', () => {
    renderAppShell(renderRegisterPage(), bindRegisterEvents, 'Create Student Account', { isAuth: true });
  })
  .addRoute('/auth/register', () => {
    renderAppShell(renderRegisterPage(), bindRegisterEvents, 'Create Student Account', { isAuth: true });
  })
  .addRoute('/auth/register.html', () => {
    renderAppShell(renderRegisterPage(), bindRegisterEvents, 'Create Student Account', { isAuth: true });
  })
  .addRoute('/verify-email', () => {
    renderAppShell(renderVerifyEmailPage(), bindVerifyEmailEvents, 'Verify Email KYC', { isAuth: true });
  })
  .addRoute('/auth/verify-email', () => {
    renderAppShell(renderVerifyEmailPage(), bindVerifyEmailEvents, 'Verify Email KYC', { isAuth: true });
  })
  .addRoute('/auth/verify-email.html', () => {
    renderAppShell(renderVerifyEmailPage(), bindVerifyEmailEvents, 'Verify Email KYC', { isAuth: true });
  })
  .addRoute('/forgot-password', () => {
    renderAppShell(renderForgotPasswordPage(), bindForgotPasswordEvents, 'Forgot Password', { isAuth: true });
  })
  .addRoute('/auth/forgot-password', () => {
    renderAppShell(renderForgotPasswordPage(), bindForgotPasswordEvents, 'Forgot Password', { isAuth: true });
  })
  .addRoute('/auth/forgot-password.html', () => {
    renderAppShell(renderForgotPasswordPage(), bindForgotPasswordEvents, 'Forgot Password', { isAuth: true });
  })

  // ----------------------------------------
  // 3. PROTECTED STUDENT RESOURCES (Login + Verified Email Required)
  // ----------------------------------------
  .addRoute('/notes', () => {
    renderProtectedPage(renderNotesPage, bindNotesPageEvents, 'Lecture Notes & Study Material');
  })
  .addRoute('/notes.html', () => {
    renderProtectedPage(renderNotesPage, bindNotesPageEvents, 'Lecture Notes & Study Material');
  })
  .addRoute('/notes/:id', (params) => {
    renderProtectedPage(() => renderNoteDetailPage(params), bindNoteDetailPageEvents, 'Handout Details', { params });
  })
  .addRoute('/note-details.html', (params) => {
    renderProtectedPage(() => renderNoteDetailPage(params), bindNoteDetailPageEvents, 'Handout Details', { params });
  })
  .addRoute('/pyqs', () => {
    renderProtectedPage(renderPYQsPage, bindPYQsPageEvents, 'Previous Examination Papers');
  })
  .addRoute('/pyqs.html', () => {
    renderProtectedPage(renderPYQsPage, bindPYQsPageEvents, 'Previous Examination Papers');
  })
  .addRoute('/pyqs/:id', (params) => {
    renderProtectedPage(() => renderPYQDetailPage(params), bindPYQDetailPageEvents, 'PYQ Paper Details', { params });
  })
  .addRoute('/pyq-details.html', (params) => {
    renderProtectedPage(() => renderPYQDetailPage(params), bindPYQDetailPageEvents, 'PYQ Paper Details', { params });
  })
  .addRoute('/jobs', () => {
    renderProtectedPage(renderJobsPage, bindJobsPageEvents, 'Campus Placements & Job Radar');
  })
  .addRoute('/jobs.html', () => {
    renderProtectedPage(renderJobsPage, bindJobsPageEvents, 'Campus Placements & Job Radar');
  })
  .addRoute('/jobs/:id', (params) => {
    renderProtectedPage(() => renderJobDetailPage(params), bindJobDetailPageEvents, 'Job Position Details', { params });
  })
  .addRoute('/job-details.html', (params) => {
    renderProtectedPage(() => renderJobDetailPage(params), bindJobDetailPageEvents, 'Job Position Details', { params });
  })
  .addRoute('/interviews', () => {
    renderProtectedPage(renderInterviewsPage, bindInterviewsPageEvents, 'Company Interview Debriefs');
  })
  .addRoute('/interviews.html', () => {
    renderProtectedPage(renderInterviewsPage, bindInterviewsPageEvents, 'Company Interview Debriefs');
  })
  .addRoute('/interviews/:id', (params) => {
    renderProtectedPage(() => renderInterviewDetailPage(params), bindInterviewDetailPageEvents, 'Interview Experience', { params });
  })
  .addRoute('/interview-details.html', (params) => {
    renderProtectedPage(() => renderInterviewDetailPage(params), bindInterviewDetailPageEvents, 'Interview Experience', { params });
  })
  .addRoute('/companies', () => {
    renderProtectedPage(renderCompaniesPage, bindCompaniesPageEvents, 'Recruiter & Company Directory');
  })
  .addRoute('/companies.html', () => {
    renderProtectedPage(renderCompaniesPage, bindCompaniesPageEvents, 'Recruiter & Company Directory');
  })
  .addRoute('/companies/:id', (params) => {
    renderProtectedPage(() => renderCompanyDetailPage(params), bindCompanyDetailEvents, 'Company Profile', { params });
  })
  .addRoute('/company-details.html', (params) => {
    renderProtectedPage(() => renderCompanyDetailPage(params), bindCompanyDetailEvents, 'Company Profile', { params });
  })
  .addRoute('/placements', () => {
    renderProtectedPage(renderPlacementsPage, bindPlacementsEvents, 'Placement & Salary Benchmark Statistics');
  })
  .addRoute('/placements.html', () => {
    renderProtectedPage(renderPlacementsPage, bindPlacementsEvents, 'Placement & Salary Benchmark Statistics');
  })
  .addRoute('/leaderboard', () => {
    renderProtectedPage(renderLeaderboardPage, bindLeaderboardEvents, 'Academic Leaderboard');
  })
  .addRoute('/leaderboard.html', () => {
    renderProtectedPage(renderLeaderboardPage, bindLeaderboardEvents, 'Academic Leaderboard');
  })
  .addRoute('/notifications', () => {
    renderProtectedPage(renderNotificationsPage, bindNotificationsPageEvents, 'Notification Center');
  })
  .addRoute('/notifications.html', () => {
    renderProtectedPage(renderNotificationsPage, bindNotificationsPageEvents, 'Notification Center');
  })
  .addRoute('/settings/notifications', () => {
    renderProtectedPage(renderNotificationPreferencesPage, bindNotificationPreferencesEvents, 'Notification & Channel Preferences');
  })

  // ----------------------------------------
  // 4. USER PROTECTED PAGES (Dashboard, Profile, Uploads, Credits)
  // ----------------------------------------
  .addRoute('/dashboard', () => {
    renderProtectedPage(renderDashboardPage, bindDashboardEvents, 'Student Dashboard');
  })
  .addRoute('/user/dashboard', () => {
    renderProtectedPage(renderDashboardPage, bindDashboardEvents, 'Student Dashboard');
  })
  .addRoute('/user/dashboard.html', () => {
    renderProtectedPage(renderDashboardPage, bindDashboardEvents, 'Student Dashboard');
  })
  .addRoute('/profile', () => {
    renderProtectedPage(renderProfilePage, bindProfileEvents, 'My Student Profile');
  })
  .addRoute('/user/profile.html', () => {
    renderProtectedPage(renderProfilePage, bindProfileEvents, 'My Student Profile');
  })
  .addRoute('/settings', () => {
    renderProtectedPage(renderSettingsPage, bindSettingsEvents, 'Account Settings');
  })
  .addRoute('/user/settings.html', () => {
    renderProtectedPage(renderSettingsPage, bindSettingsEvents, 'Account Settings');
  })
  .addRoute('/user/notifications.html', () => {
    renderProtectedPage(renderNotificationsPage, bindNotificationsPageEvents, 'Notification Center');
  })
  .addRoute('/credits', () => {
    renderProtectedPage(renderCreditsPage, bindCreditsEvents, 'Credits & Rewards');
  })
  .addRoute('/user/credits.html', () => {
    renderProtectedPage(renderCreditsPage, bindCreditsEvents, 'Credits & Rewards');
  })
  .addRoute('/saved-jobs', () => {
    renderProtectedPage(renderSavedJobsPage, bindSavedJobsEvents, 'Saved Job Opportunities');
  })
  .addRoute('/user/saved-jobs.html', () => {
    renderProtectedPage(renderSavedJobsPage, bindSavedJobsEvents, 'Saved Job Opportunities');
  })
  .addRoute('/my-notes', () => {
    renderProtectedPage(renderMyNotesPage, bindMyNotesEvents, 'My Academic Contributions');
  })
  .addRoute('/user/my-notes.html', () => {
    renderProtectedPage(renderMyNotesPage, bindMyNotesEvents, 'My Academic Contributions');
  })
  .addRoute('/uploads', (params) => {
    renderProtectedPage(() => renderUploadsPage(params), bindUploadsEvents, 'Upload Academic Resource', { params });
  })
  .addRoute('/notes/upload', (params) => {
    renderProtectedPage(() => renderUploadsPage(params), bindUploadsEvents, 'Upload Lecture Notes (+50 Cr)', { params });
  })
  .addRoute('/user/upload-note.html', (params) => {
    renderProtectedPage(() => renderUploadsPage(params), bindUploadsEvents, 'Upload Lecture Notes (+50 Cr)', { params });
  })
  .addRoute('/pyqs/upload', (params) => {
    renderProtectedPage(() => renderUploadsPage(params), bindUploadsEvents, 'Upload Past Exam Paper (+40 Cr)', { params });
  })
  .addRoute('/user/upload-pyq.html', (params) => {
    renderProtectedPage(() => renderUploadsPage(params), bindUploadsEvents, 'Upload Past Exam Paper (+40 Cr)', { params });
  })
  .addRoute('/upload-interview', () => {
    renderProtectedPage(renderUploadInterviewPage, bindUploadInterviewEvents, 'Share Interview Experience');
  })
  .addRoute('/user/upload-interview.html', () => {
    renderProtectedPage(renderUploadInterviewPage, bindUploadInterviewEvents, 'Share Interview Experience');
  })

  // ----------------------------------------
  // 5. ADMIN PORTAL (Login + Verified Email + Admin Authorization Required)
  // ----------------------------------------
  .addRoute('/admin', () => {
    renderProtectedPage(renderAdminDashboardPage, bindAdminDashboardEvents, 'Admin Dashboard', { isAdmin: true });
  })
  .addRoute('/admin/index', () => {
    renderProtectedPage(renderAdminDashboardPage, bindAdminDashboardEvents, 'Admin Dashboard', { isAdmin: true });
  })
  .addRoute('/admin/index.html', () => {
    renderProtectedPage(renderAdminDashboardPage, bindAdminDashboardEvents, 'Admin Dashboard', { isAdmin: true });
  })
  .addRoute('/admin/dashboard', () => {
    renderProtectedPage(renderAdminDashboardPage, bindAdminDashboardEvents, 'Admin Dashboard', { isAdmin: true });
  })
  .addRoute('/admin/notifications', () => {
    renderProtectedPage(renderAdminNotificationsPage, bindAdminNotificationsEvents, 'Admin Broadcast Hub', { isAdmin: true });
  })
  .addRoute('/admin/users', () => {
    renderProtectedPage(renderAdminUsersPage, bindAdminUsersEvents, 'Admin User Management', { isAdmin: true });
  })
  .addRoute('/admin/notes', () => {
    renderProtectedPage(renderAdminNotesPage, bindAdminNotesEvents, 'Admin Notes Moderation', { isAdmin: true });
  })
  .addRoute('/admin/pyqs', () => {
    renderProtectedPage(renderAdminPYQsPage, bindAdminPYQsEvents, 'Admin PYQ Moderation', { isAdmin: true });
  })
  .addRoute('/admin/interviews', () => {
    renderProtectedPage(renderAdminInterviewsPage, bindAdminInterviewsEvents, 'Admin Interview Debriefs', { isAdmin: true });
  })
  .addRoute('/admin/companies', () => {
    renderProtectedPage(renderAdminCompaniesPage, bindAdminCompaniesEvents, 'Admin Partner Companies', { isAdmin: true });
  })
  .addRoute('/admin/jobs', () => {
    renderProtectedPage(renderAdminJobsPage, bindAdminJobsEvents, 'Admin Job Postings', { isAdmin: true });
  })
  .addRoute('/admin/reports', () => {
    renderProtectedPage(renderAdminReportsPage, bindAdminReportsEvents, 'Admin Content Reports', { isAdmin: true });
  })
  .addRoute('/admin/credits', () => {
    renderProtectedPage(renderAdminCreditsPage, bindAdminCreditsEvents, 'Admin Credit Economy', { isAdmin: true });
  })
  .addRoute('/admin/analytics', () => {
    renderProtectedPage(renderAdminAnalyticsPage, bindAdminAnalyticsEvents, 'Admin Platform Analytics', { isAdmin: true });
  })
  .addRoute('/admin/settings', () => {
    renderProtectedPage(renderAdminSettingsPage, bindAdminSettingsEvents, 'Admin System Policies', { isAdmin: true });
  })

  // ----------------------------------------
  // 6. 404 FALLBACK
  // ----------------------------------------
  .addRoute('*', () => {
    renderAppShell(`
      <div class="container" style="padding: 5rem 1rem; text-align: center;">
        <h1 style="font-size: 3.5rem; font-weight: 800; color: #818cf8;">404</h1>
        <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin: 0.5rem 0 1rem;">Page Not Found</h2>
        <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 2rem;">
          The academic module or resource you requested is not available. Check the URL or return to home.
        </p>
        <a href="/" data-link class="btn btn-primary" style="text-decoration: none;">Return to Homepage</a>
      </div>
    `, null, 'Page Not Found');
  });

// Launch SPA
router.resolve();

# StudentSphere — Open Academic & Career Intelligence Hub

StudentSphere is an open, student-centered academic learning and campus career platform built for college students, engineering undergraduates, and university placement aspirants. It provides verified lecture handouts, previous year exam papers (PYQs) with step-by-step solutions, authentic interview debriefs, job radar tracking, and real-time multi-channel alerts (Web, Email, Telegram).

---

## 🌟 Key Platform Features

- **🎓 100% Free Academic Downloads (0 Credits):** Lecture handouts and PYQ papers are permanently free to download. Zero credits are deducted for accessing knowledge.
- **📄 Previous Year Question Papers (PYQs):** University exam papers categorized by university, branch, semester, and year with verified model solutions.
- **💼 Placement & Job Radar:** Transparent off-campus and on-campus hiring opportunities with CTC benchmarks, work modes, and direct application links.
- **💬 Authentic Interview Debriefs:** Round-by-round recruitment experiences detailing coding challenges, system design rounds, and behavioral questions.
- **🛡️ Human-in-the-Loop Moderation:** User uploads transition from `PENDING` review queue to `APPROVED` or `REJECTED` by moderators before publication.
- **🪙 Contribution-Based Credits:** Students earn recognition credits for contributing approved study materials and interview insights.
- **🔔 Multi-Channel Notification Center:** Instant alerts across In-App Notification Center, Email digests (Resend), and official Telegram Bot (`@StudentSphereBot`).
- **🌓 Dynamic Light & Dark Theme:** Full UI accessibility with persistent theme switching, zero contrast loss, and responsive design across mobile (320px) to desktop (1440px).
- **📢 Google AdSense Compliant:** Reusable 11-slot advertising system with zero misleading placements, no fake ads, and developer placeholder safeguards.
- **📜 Legal & Trust Pages:** Complete production-grade pages for About, Contact, Privacy Policy, Terms & Conditions, and Cookie Policy.

---

## 🛠️ Technology Stack & Architecture

- **Core Frontend:** Semantic HTML5, Modular Vanilla JavaScript (ES Modules).
- **Styling:** Pure Vanilla CSS3 with design tokens, glassmorphism, responsive CSS Grid/Flexbox, and accessible light/dark theme variables.
- **Build & Development Tooling:** Vite v8 (ultra-fast HMR and minified production bundling).
- **Code Quality:** Oxlint (high-performance JavaScript linter with zero errors).
- **Authentication:** Google Firebase Web SDK (Email/Password, Email Verification KYC, Token Refresh).
- **Routing:** Custom Vanilla JS Client-Side Router with parameter extraction (`/notes/:id`, `/pyqs/:id`) and query string handling.
- **State Management:** Lightweight observer pattern (`appState`) managing auth, notifications, unread counts, and UI dropdowns.
- **Strictly Framework-Free:** 0% React, 0% Next.js, 0% Vue, 0% Angular.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/shavni03/StudentSphere.git
cd StudentSphere
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Firebase credentials and configure AdSense settings when ready.

### 3. Start Development Server
```bash
npm run dev
```
Vite will start the dev server at `http://localhost:5173/` (or next available port).

### 4. Build for Production & Preview
```bash
npm run build
npm run preview
```
The production bundle will be served at `http://localhost:4173/`.

### 5. Run Linter
```bash
npm run lint
```

---

## ⚙️ Environment Variables

| Variable | Description | Default / Example |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Authentication Domain | `studentsphere-71a6a.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `studentsphere-71a6a` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `studentsphere-71a6a.firebasestorage.app` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary Client Cloud Name | `nwzgyz2h` |
| `VITE_USE_MOCK_API` | Toggle between local mock and live backend | `true` (dev) / `false` (prod) |
| `VITE_API_BASE_URL` | Base endpoint for REST Backend API | `https://api.studentsphere.internal/v1` |
| `VITE_ADSENSE_CLIENT_ID` | Publisher Client ID (keep blank before approval) | `ca-pub-XXXXXXXXXXXXXXXX` |
| `VITE_ADSENSE_SLOT_*` | Individual slot IDs for 11 ad placements | `ADSENSE_SLOT_HOME_TOP`, etc. |

---

## 📢 Google AdSense Integration & Policy Compliance

StudentSphere is architected for strict compliance with Google AdSense Publisher Policies:

1. **11 Standardized Ad Slots (`js/ads.js` / `src/js/ads.js`):**
   - `home-top`: Header banner on home landing page.
   - `home-middle`: Contextual sponsor slot on homepage.
   - `notes-sidebar`: Academic partner slot in notes directory sidebar.
   - `notes-content`: Clean non-intrusive slot within study guides.
   - `pyqs-content`: Solved examination paper sponsor slot.
   - `jobs-sidebar`: Career partner slot in job search view.
   - `jobs-content`: Opportunities listing placement.
   - `placements-content`: Placement statistics guide sponsor.
   - `interviews-content`: Tech debriefs educational placement.
   - `footer`: Site-wide universal footer advertisement.
   - `mobile`: Responsive mobile banner container.

2. **No Fake Ads:** Ad slots render clear developer placeholders when `VITE_ADSENSE_CLIENT_ID` is blank.
3. **No Deceptive Placements:** Ads are never placed over, beside, or styled to resemble Free Download buttons.
4. **Restricted Areas:** Advertisements are strictly prohibited and never rendered inside authentication forms (`/login`, `/register`) or within the Admin Portal (`/admin/*`).
5. **Free Knowledge Guarantee:** Downloading study resources does not require viewing ads or spending credits.

---

## 🔒 Security Architecture

- **Frontend Public Scope Only:** Zero private database credentials, Cloudinary API secrets, Resend API keys, or Telegram Bot tokens exist in the client repository.
- **Firebase Token Authentication:** Authenticated requests transmit the Firebase ID Token via `Authorization: Bearer <token>` to be verified on the backend.
- **Sanitized Inputs:** Client-side HTML entities and form inputs are strictly sanitized to prevent XSS.

---

## 🗺️ Legal & Trust Pages

The following pages are fully written and accessible:
- `/about` & `/about.html`: Platform mission, educational pillars, and human moderation workflow.
- `/contact` & `/contact.html`: Validated support form with backend-ready feedback states and official DMCA contacts.
- `/privacy` & `/privacy.html`: Comprehensive privacy policy covering Firebase, storage, AdSense cookies, and user rights.
- `/terms` & `/terms.html`: Complete terms of service detailing acceptable use, prohibited uploads, and moderation rights.
- `/cookie-policy` & `/cookie-policy.html`: Transparent breakdown of essential local storage and advertising cookies.

---

## 🚢 Deployment Instructions

### Vercel / Netlify / Cloudflare Pages
- **Framework Preset:** Other / Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Single Page App Routing:** Ensure rewrites route `/*` to `/index.html`.

### Firebase Hosting
```bash
firebase deploy --only hosting
```
Configured in `firebase.json` with single-page app rewrites targeting `dist`.

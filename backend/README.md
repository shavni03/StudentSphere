# StudentSphere Backend & Firebase Admin Role System

This backend service powers **StudentSphere** using **Node.js, Express, and the Firebase Admin SDK**. It provides cryptographically secure role assignment, custom claims verification, and protected administrative routes.

---

## 1. Security Architecture

1. **Role Source of Truth**:
   The administrator role is **exclusively managed via Firebase Custom Claims** (`{ "admin": true }`).
2. **Untrusted Frontend**:
   The frontend UI does **not** determine or grant administrator status. It reads claims via `user.getIdTokenResult()` strictly for navigation and display.
3. **Protected Admin Routes**:
   All `/admin/*` frontend routes and `/api/admin/*` backend routes strictly verify:
   * Firebase user authentication session.
   * Verified email address (`email_verified === true`).
   * Cryptographic presence of `{ admin: true }` in the decoded token claims.

---

## 2. Directory Structure

```
backend/
├── .env.example              # Sample environment configuration
├── package.json              # Backend dependencies (express, firebase-admin, cors, dotenv)
├── README.md                 # Backend documentation
├── scripts/
│   ├── makeAdmin.js          # Production administrator provisioning script
│   └── verifyAdmin.js        # Claims inspection utility
└── src/
    ├── firebaseAdmin.js      # Secure Firebase Admin SDK initialization
    ├── middleware/
    │   └── authMiddleware.js # Bearer token verification & admin claims guard
    ├── routes/
    │   └── adminRoutes.js    # Protected /api/admin endpoints
    └── server.js             # Express server entrypoint
```

---

## 3. Provisioning the Initial Administrator (`makeAdmin.js`)

The initial administrator account is:
* **Designated Email**: `shavni.390@gmail.com`

### Safety Checks Enforced Before Role Assignment:
1. **User Existence**: Validates that the account has already registered in Firebase Authentication.
2. **Account Match**: Verifies that the user's email strictly matches `shavni.390@gmail.com`.
3. **Mandatory Email Verification**: If the user's email is unverified, role assignment is **aborted** with:
   ```
   "Admin account email must be verified first."
   ```
4. **Idempotent Execution**: If the user already has `{ admin: true }`, the script safely reports:
   ```
   "User is already an administrator."
   ```
   It will not create duplicate entries or alter other custom claims (such as `moderator: true`).

### Running the Setup Script

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure your environment credentials in `backend/.env` (see Section 4).

3. Execute the script:
   ```bash
   # Method A: Providing the UID via environment variable
   ADMIN_FIREBASE_UID=<YOUR_FIREBASE_UID> npm run make-admin

   # Method B: Passing UID as command-line argument
   node scripts/makeAdmin.js <YOUR_FIREBASE_UID>

   # Method C: Auto-lookup by designated email (shavni.390@gmail.com)
   npm run make-admin
   ```

### Example Successful Output:
```
==================================================
StudentSphere Admin Setup
==================================================
-------------------------
Email: shavni.390@gmail.com
UID: eaVvQMVCfrVsTkJ2Z8GFOmH8j8F3
Role: ADMIN
Status: SUCCESS
-------------------------
Custom claim { admin: true } has been securely assigned.
The user can now sign in or refresh their token to access /admin/ routes.
```

---

## 4. Server-Side Credentials Setup

> [!CAUTION]
> **Never commit your Firebase service account private key to Git or expose it in client-side code.**
> Service account JSON files and `.env` are automatically ignored by `.gitignore`.

### Option A: Local Development via Service Account JSON
1. In the [Firebase Console](https://console.firebase.google.com/), go to **Project Settings > Service Accounts**.
2. Click **Generate New Private Key** and save the JSON file securely on your computer (outside of Git).
3. Set the path in `backend/.env`:
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/serviceAccountKey.json
   ADMIN_FIREBASE_UID=eaVvQMVCfrVsTkJ2Z8GFOmH8j8F3
   ADMIN_FIREBASE_EMAIL=shavni.390@gmail.com
   ```

### Option B: Cloud Hosting (Render, Railway, Heroku)
In your cloud provider's Environment Variables dashboard, set either:
1. `FIREBASE_SERVICE_ACCOUNT_KEY`: The entire JSON string of the service account.
2. Or individual variables:
   * `FIREBASE_PROJECT_ID`: `studentsphere-71a6a`
   * `FIREBASE_CLIENT_EMAIL`: `firebase-adminsdk-xxxxx@studentsphere-71a6a.iam.gserviceaccount.com`
   * `FIREBASE_PRIVATE_KEY`: `"-----BEGIN PRIVATE KEY-----\nMIIEvg...-----END PRIVATE KEY-----\n"`

---

## 5. Running the Backend Server

```bash
# Start server
npm start

# Development mode with file watch
npm run dev
```

* Express server runs on `http://localhost:5001`.
* Health check: `http://localhost:5001/health`
* Protected route: `GET /api/admin/verify-status` (Requires `Authorization: Bearer <idToken>`).

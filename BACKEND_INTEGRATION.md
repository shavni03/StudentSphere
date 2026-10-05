# StudentSphere Backend Integration Specification

This document provides the technical integration contracts, database schemas, and service architecture required to connect the StudentSphere Vanilla JavaScript frontend to production backend microservices and databases.

---

## 1. Firebase Token & Authentication Flow

### 1.1 Architecture & Token Flow
1. **User Authentication:**
   - User signs in with institutional email & password via Firebase Auth SDK (`src/auth.js`).
   - Firebase verifies credentials, checks `emailVerified` flag, and issues a JSON Web Token (Firebase ID Token).
2. **Authorization Header:**
   - The centralized frontend API client (`src/api/api.js` / `src/js/api.js`) automatically retrieves the active ID token using `auth.currentUser.getIdToken()` and attaches it to every outgoing HTTP request:
     ```http
     Authorization: Bearer <Firebase ID Token>
     Content-Type: application/json
     ```
3. **Backend Token Verification:**
   - The backend server (Node.js/Express, Go, or Python FastAPI) validates the JWT using the Firebase Admin SDK:
     ```javascript
     const decodedToken = await admin.auth().verifyIdToken(idToken);
     const uid = decodedToken.uid;
     const emailVerified = decodedToken.email_verified;
     ```
   - If token is missing or expired, return `401 Unauthorized`.
   - If action requires verified email and `emailVerified === false`, return `403 Forbidden` (`{ error: "EMAIL_VERIFICATION_REQUIRED" }`).

---

## 2. Cloudinary Upload Architecture

### 2.1 Security & Secret Isolation
- **Cloud Name:** `nwzgyz2h`
- **Secret Isolation:** `CLOUDINARY_API_SECRET` must **never** be included in frontend code.
- **Workflow:**
  ```mermaid
  sequenceDiagram
    participant User as Frontend Client
    participant API as Backend API Server
    participant Cloudinary as Cloudinary CDN
    participant DB as Supabase / PostgreSQL

    User->>API: 1. POST /api/v1/uploads/sign (filename, folder, resource_type)
    API-->>User: 2. Return { signature, timestamp, apiKey, uploadPreset }
    User->>Cloudinary: 3. POST https://api.cloudinary.com/v1_1/nwzgyz2h/auto/upload
    Cloudinary-->>User: 4. Return { secure_url, public_id, format, bytes }
    User->>API: 5. POST /api/v1/notes (with secure_url & metadata)
    API->>DB: 6. Insert metadata into Supabase
  ```

---

## 3. Standard HTTP Response & Error Schemas

All backend responses must conform to the unified envelope:

### Success Response:
```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 128
  }
}
```

### Error Response Codes & Handling:
| Status Code | Reason | Handled By Client (`src/api/api.js`) |
|---|---|---|
| `401 Unauthorized` | Invalid or expired token | Clears session cache and redirects to `/login.html` |
| `403 Forbidden` | Unverified email or student role violation | Prompts email verification or permissions toast |
| `404 Not Found` | Entity not found | Displays 404 resource message with fallback links |
| `422 Unprocessable` | Validation error (e.g. invalid password format) | Displays field-level validation errors |
| `429 Rate Limited` | Exceeded request quota | Displays cool-off message |
| `500 Server Error` | Backend exception | User-friendly message ("Our team has been notified") |

---

## 4. API Endpoints & Request/Response Contracts

### 4.1 Notes (`/api/v1/notes`)
- **GET `/api/v1/notes`**
  - **Query Params:**
    - `branch` (e.g. `CSE`, `IT`, `ECE`)
    - `semester` (e.g. `1`..`8`)
    - `subject` (e.g. `DBMS`, `Operating Systems`)
    - `subjectCode` (e.g. `CS-301`)
    - `format` (`Handwritten`, `Typed`, `Formula Sheet`, `Slides`)
    - `sort` (`popular`, `rating`, `newest`)
    - `page`, `limit`, `q` (Search keyword)
  - **Response `200 OK`:**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "note-1",
          "title": "DBMS Complete Unit 1-5 Lecture Notes",
          "subject": "Database Management Systems",
          "subjectCode": "CS-501",
          "branch": "CSE",
          "semester": 5,
          "resourceType": "Handwritten",
          "uploader": "Aarav Mehta",
          "downloads": 1420,
          "rating": 4.9,
          "fileUrl": "https://res.cloudinary.com/nwzgyz2h/raw/upload/dbms_handout.pdf",
          "fileSize": "14.2 MB",
          "pages": 68,
          "status": "Approved"
        }
      ],
      "meta": { "page": 1, "limit": 10, "total": 142 }
    }
    ```

- **POST `/api/v1/notes`**
  - **Payload:** `{ title, subject, subjectCode, branch, semester, resourceType, fileUrl, fileSize, pages }`
  - **Response `201 Created`:** Award `+10 Credits` upon approval.

- **POST `/api/v1/notes/:id/rating`**
  - **Payload:** `{ rating: 5, review: "Incredibly clear explanations!" }`

- **POST `/api/v1/notes/:id/report`**
  - **Payload:** `{ reason: "Incorrect syllabus", details: "Unit 3 missing" }`

---

### 4.2 Past Exam Papers (`/api/v1/pyqs`)
- **GET `/api/v1/pyqs`**
  - **Query Params:** `university`, `branch`, `semester`, `subject`, `year`, `examType` (`End-Sem`, `Mid-Sem`, `Quiz`), `sort`, `page`, `limit`.
  - **Critical Rule:** Every download response returns public PDF URL with **0 credits deducted**.

---

### 4.3 Job Radar & Placements (`/api/v1/jobs` & `/api/v1/companies`)
- **GET `/api/v1/jobs`**
  - **Query Params:** `company`, `role`, `location`, `mode` (`Remote`, `Hybrid`, `On-site`), `type` (`Internship`, `Full-time`), `channel` (`On-campus`, `Off-campus`), `page`, `limit`.
- **POST `/api/v1/jobs/:id/bookmark`**
  - Toggle saved job status for current authenticated student.

---

### 4.4 Interview Debriefs (`/api/v1/interviews`)
- **GET `/api/v1/interviews`**
  - **Query Params:** `company`, `difficulty` (`Easy`, `Medium`, `Hard`), `hiringType` (`On-Campus`, `Off-Campus`), `year`, `status` (`Approved`).
- **POST `/api/v1/interviews`**
  - **Payload:** `{ company, role, hiringType, batch, difficulty, outcome, summary, rounds: [...], resources: "..." }`
  - **Credits:** Awards `+20 Credits` to student upon admin moderation approval.

---

### 4.5 Community Credit Economy (`/api/v1/credits`)
- **Configured Central Ledger Rules:**
  - `NOTE_APPROVED`: `+10 Credits`
  - `PYQ_APPROVED`: `+15 Credits`
  - `INTERVIEW_APPROVED`: `+20 Credits`
  - `SIGNUP_BONUS`: `+100 Credits`
  - `DOWNLOAD_COST`: `0 Credits` (100% Free Guaranteed)

---

### 4.6 Notifications, Resend Email & Telegram Bot
- **GET `/api/v1/notifications`** (In-app notification list)
- **GET `/api/v1/notifications/preferences`**
- **PUT `/api/v1/notifications/preferences`**
- **GET `/api/v1/telegram/status`** (Checks if student ID is paired with Telegram chat ID)
- **POST `/api/v1/telegram/connect`** (Generates 6-digit OTP code to send to `@StudentSphereBot`)
- **DELETE `/api/v1/telegram/disconnect`**
- **POST `/api/v1/notifications/email/dispatch`**
  - Backend worker routes to Resend API (`RESEND_API_KEY`) using transactional templates.

---

### 4.7 Admin Moderation Suite (`/api/v1/admin/*`)
- **POST `/api/v1/admin/notes/:id/approve`**
  - Transitions note status to `Approved`, releases to public listings, credits uploader with `+10 Credits`, dispatches approval notification.
- **POST `/api/v1/admin/notes/:id/reject`**
  - **Mandatory Payload:** `{ reason: "Blurry scan / missing pages 10-20" }`
  - Sets status to `Rejected`, records rejection reason, sends email/in-app alert to uploader explaining reason.
- **POST `/api/v1/admin/pyqs/:id/approve`** & **`/reject`**
- **POST `/api/v1/admin/broadcasts`**
  - Broadcast announcement to selected audience (`All`, `CSE`, `5th Sem`) via Website, Email, and Telegram.

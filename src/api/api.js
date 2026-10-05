/**
 * StudentSphere Unified API Layer
 * 
 * Provides:
 * - apiGet(endpoint, params)
 * - apiPost(endpoint, body)
 * - apiPut(endpoint, body)
 * - apiPatch(endpoint, body)
 * - apiDelete(endpoint)
 * 
 * Features:
 * - Automatically attaches Firebase ID Token via `Authorization: Bearer <token>`
 * - Friendly error interception: 401, 403, 404, 422, 429, 500
 * - Seamless toggle between Mock Data and Production Backend:
 *     USE_MOCK_API=true  -> Local mock database (instant demonstration)
 *     USE_MOCK_API=false -> Live REST Backend
 * - Zero secret leakage: Cloudinary secret and Supabase service keys are handled server-side.
 */

import { getAuthToken } from '../auth.js';
import {
  mockNotes,
  mockPYQs,
  mockJobs,
  mockInterviews,
  mockCompanies,
  mockUsers,
  mockReports,
  mockCreditTransactions
} from '../data/mockData.js';
import { notificationApi } from './notificationApi.js';
import { adminNotificationApi } from './adminNotificationApi.js';

export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.studentsphere.edu/v1';

const delay = (ms = 120) => new Promise(res => setTimeout(res, ms));

/**
 * Friendly error messages mapping
 */
function handleHttpError(status, statusText, errorBody = {}) {
  let message = errorBody.message || statusText;
  switch (status) {
    case 401:
      message = 'Your session has expired. Please sign in again.';
      break;
    case 403:
      message = 'You do not have administrative permission to perform this action.';
      break;
    case 404:
      message = 'The requested resource was not found on StudentSphere.';
      break;
    case 422:
      message = errorBody.message || 'Validation failed. Please review your input.';
      break;
    case 429:
      message = 'Rate limit exceeded. Please wait a moment before trying again.';
      break;
    case 500:
    case 502:
    case 503:
      message = 'Server encountered a temporary issue. Please try again shortly.';
      break;
    default:
      message = message || 'An unexpected error occurred.';
  }
  const err = new Error(message);
  err.status = status;
  err.details = errorBody;
  return err;
}

/**
 * Build authorized headers
 */
async function buildHeaders(customHeaders = {}) {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...customHeaders
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Mock dispatcher for USE_MOCK_API=true
 */
async function dispatchMock(method, endpoint, payload = null, _queryParams = {}) {
  await delay();

  const cleanEndpoint = endpoint.replace(/^\/+/, '').split('?')[0];

  // Notes
  if (cleanEndpoint === 'notes' || cleanEndpoint.startsWith('notes/')) {
    if (method === 'GET') {
      const parts = cleanEndpoint.split('/');
      if (parts.length > 1 && parts[1]) {
        const found = mockNotes.find(n => n.id === parts[1]);
        if (!found) throw handleHttpError(404, 'Not Found');
        return { success: true, data: found };
      }
      return { success: true, count: mockNotes.length, data: mockNotes };
    }
    if (method === 'POST') {
      return { success: true, message: 'Notes uploaded for review (+50 Credits)', id: `note-${Date.now()}` };
    }
  }

  // PYQs
  if (cleanEndpoint === 'pyqs' || cleanEndpoint.startsWith('pyqs/')) {
    if (method === 'GET') {
      const parts = cleanEndpoint.split('/');
      if (parts.length > 1 && parts[1]) {
        const found = mockPYQs.find(p => p.id === parts[1]);
        if (!found) throw handleHttpError(404, 'Not Found');
        return { success: true, data: found };
      }
      return { success: true, count: mockPYQs.length, data: mockPYQs };
    }
    if (method === 'POST') {
      return { success: true, message: 'PYQ uploaded for review (+40 Credits)', id: `pyq-${Date.now()}` };
    }
  }

  // Jobs
  if (cleanEndpoint === 'jobs' || cleanEndpoint.startsWith('jobs/')) {
    if (method === 'GET') {
      const parts = cleanEndpoint.split('/');
      if (parts.length > 1 && parts[1]) {
        const found = mockJobs.find(j => j.id === parts[1]);
        if (!found) throw handleHttpError(404, 'Not Found');
        return { success: true, data: found };
      }
      return { success: true, count: mockJobs.length, data: mockJobs };
    }
  }

  // Interviews
  if (cleanEndpoint === 'interviews' || cleanEndpoint.startsWith('interviews/')) {
    if (method === 'GET') {
      const parts = cleanEndpoint.split('/');
      if (parts.length > 1 && parts[1]) {
        const found = mockInterviews.find(i => i.id === parts[1]);
        if (!found) throw handleHttpError(404, 'Not Found');
        return { success: true, data: found };
      }
      return { success: true, count: mockInterviews.length, data: mockInterviews };
    }
  }

  // Companies
  if (cleanEndpoint === 'companies' || cleanEndpoint.startsWith('companies/')) {
    if (method === 'GET') {
      const parts = cleanEndpoint.split('/');
      if (parts.length > 1 && parts[1]) {
        const found = mockCompanies.find(c => c.id === parts[1]);
        if (!found) throw handleHttpError(404, 'Not Found');
        return { success: true, data: found };
      }
      return { success: true, count: mockCompanies.length, data: mockCompanies };
    }
  }

  // Notifications
  if (cleanEndpoint === 'notifications') {
    if (method === 'GET') {
      const data = await notificationApi.getNotifications();
      return { success: true, count: data.length, data };
    }
  }

  // Admin Broadcasts
  if (cleanEndpoint === 'admin/broadcasts' || cleanEndpoint === 'admin/notifications') {
    if (method === 'GET') {
      const data = await adminNotificationApi.getAdminNotifications();
      return { success: true, count: data.length, data };
    }
    if (method === 'POST') {
      return await adminNotificationApi.createAnnouncement(payload);
    }
  }

  // Users
  if (cleanEndpoint === 'users') {
    return { success: true, count: mockUsers.length, data: mockUsers };
  }

  // Reports
  if (cleanEndpoint === 'reports') {
    return { success: true, count: mockReports.length, data: mockReports };
  }

  // Credits
  if (cleanEndpoint === 'credits') {
    return { success: true, count: mockCreditTransactions.length, data: mockCreditTransactions };
  }

  // Generic fallback
  return { success: true, message: 'Mock response', data: payload || {} };
}

/**
 * Core HTTP Request Execution
 */
async function request(method, endpoint, body = null, queryParams = {}) {
  if (USE_MOCK_API) {
    return await dispatchMock(method, endpoint, body, queryParams);
  }

  // Build full URL
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(queryParams)) {
    if (v !== undefined && v !== null && v !== '') {
      qs.set(k, v);
    }
  }
  const queryString = qs.toString();
  const url = `${API_BASE_URL}/${endpoint.replace(/^\/+/, '')}${queryString ? `?${queryString}` : ''}`;

  const headers = await buildHeaders();

  const fetchOptions = {
    method,
    headers
  };

  if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, fetchOptions);

    let json;
    try {
      json = await res.json();
    } catch {
      json = null;
    }

    if (!res.ok) {
      throw handleHttpError(res.status, res.statusText, json);
    }

    return json;
  } catch (err) {
    if (err.status) throw err;
    const networkErr = new Error('Unable to connect to StudentSphere servers. Please check your internet connection.');
    networkErr.status = 0;
    throw networkErr;
  }
}

/**
 * Public API Methods
 */
export async function apiGet(endpoint, params = {}) {
  return request('GET', endpoint, null, params);
}

export async function apiPost(endpoint, body = {}) {
  return request('POST', endpoint, body);
}

export async function apiPut(endpoint, body = {}) {
  return request('PUT', endpoint, body);
}

export async function apiPatch(endpoint, body = {}) {
  return request('PATCH', endpoint, body);
}

export async function apiDelete(endpoint) {
  return request('DELETE', endpoint);
}

/**
 * Cloudinary Frontend Upload Abstraction
 * 
 * In production:
 * 1. Frontend sends file to backend: POST /api/v1/uploads/sign
 * 2. Backend signs request with server-side CLOUDINARY_API_SECRET
 * 3. Frontend uploads directly to Cloudinary or backend relays it
 * 4. Cloudinary public URL returned and saved in Supabase
 */
export async function uploadToCloudinary(file, folder = 'documents') {
  if (USE_MOCK_API) {
    await delay(300);
    return {
      success: true,
      url: `https://res.cloudinary.com/nwzgyz2h/image/upload/v1/studentsphere/${folder}/${file.name}`,
      publicId: `studentsphere/${folder}/${file.name.replace(/\.[^/.]+$/, '')}`,
      format: file.name.split('.').pop(),
      bytes: file.size
    };
  }

  // Real backend upload relay
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const token = await getAuthToken();
  const res = await fetch(`${API_BASE_URL}/uploads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) {
    throw handleHttpError(res.status, res.statusText);
  }

  return await res.json();
}

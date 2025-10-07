/**
 * Simple API client using fetch. Reads base URL from REACT_APP_API_BASE_URL.
 * If the user is authenticated with Supabase, attaches Authorization: Bearer <jwt>.
 */
import { supabase } from '../supabaseClient';

// PUBLIC_INTERFACE
export async function apiFetch(path, { method = 'GET', headers = {}, body, signal } = {}) {
  /** Perform an API request with optional auth token from Supabase. */
  const base = process.env.REACT_APP_API_BASE_URL || '';
  const url = `${base}${path}`;

  let token;
  try {
    const { data } = await supabase.auth.getSession();
    token = data?.session?.access_token;
  } catch (e) {
    // ignore token retrieval error, proceed unauthenticated
  }

  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const contentType = res.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const err = new Error(`API error: ${res.status}`);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

// PUBLIC_INTERFACE
export function get(path, options) {
  /** Convenience GET */
  return apiFetch(path, { ...options, method: 'GET' });
}

// PUBLIC_INTERFACE
export function post(path, body, options) {
  /** Convenience POST */
  return apiFetch(path, { ...options, method: 'POST', body });
}

// PUBLIC_INTERFACE
export function put(path, body, options) {
  /** Convenience PUT */
  return apiFetch(path, { ...options, method: 'PUT', body });
}

// PUBLIC_INTERFACE
export function del(path, options) {
  /** Convenience DELETE */
  return apiFetch(path, { ...options, method: 'DELETE' });
}

import { environment } from '../../../environments/environment';

/**
 * Single source of truth for the Choom Vault API origin and endpoint URLs.
 *
 * Keeping endpoint construction here avoids repeating environment-specific
 * URL logic throughout feature services.
 */
const apiBaseUrl = environment.apiUrl.replace(/\/+$/, '');

const apiUrl = (path: string): string =>
  `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;

export const API_ENDPOINTS = {
  capabilities: apiUrl('/api/Capabilities'),
  cards: apiUrl('/api/Cards'),
  cardById: (id: number): string => apiUrl(`/api/Cards/${id}`),
  auth: {
    csrf: apiUrl('/api/Auth/csrf'),
    register: apiUrl('/api/Auth/register'),
    login: apiUrl('/api/Auth/login'),
    mfa: apiUrl('/api/Auth/mfa'),
    mfaRecovery: apiUrl('/api/Auth/mfa/recovery'),
    demo: apiUrl('/api/Auth/demo'),
    me: apiUrl('/api/Auth/me'),
    logout: apiUrl('/api/Auth/logout')
  }
} as const;

/**
 * Returns true only for requests going to Choom Vault's configured API.
 * Third-party requests must not automatically receive our credentials or
 * antiforgery header.
 */
export const isChoomVaultApiRequest = (url: string): boolean =>
  url === apiBaseUrl || url.startsWith(`${apiBaseUrl}/`);

/**
 * Converts an API-owned relative path into a full URL while leaving absolute
 * external URLs unchanged.
 */
export const toApiUrl = (path: string): string => {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }

  return apiUrl(path);
};

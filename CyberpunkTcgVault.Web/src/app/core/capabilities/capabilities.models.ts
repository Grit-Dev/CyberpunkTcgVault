/**
 * Product capabilities published by the backend.
 *
 * These values control whether optional public product entry points are
 * available. They are not security permissions; the API still enforces the
 * real rules server-side.
 */
export interface ProductCapabilities {
  publicRegistrationEnabled: boolean;
  demoAccessEnabled: boolean;
}

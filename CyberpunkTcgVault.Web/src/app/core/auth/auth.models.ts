/**
 * Deliberate authenticated-user contract returned by the backend.
 * Identity implementation details never belong in the browser model.
 */
export interface AuthUser {
  userId: string;
  userName: string;
  email: string;
  roles: string[];
  emailConfirmed: boolean;
  twoFactorEnabled: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  requiresTwoFactor: boolean;
  user: AuthUser | null;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface MfaLoginRequest {
  code: string;
}

export interface RecoveryCodeLoginRequest {
  recoveryCode: string;
}


export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  userId: string;
  token: string;
  newPassword: string;
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable, of, shareReplay, tap } from 'rxjs';

import { API_ENDPOINTS } from '../http/api-endpoints';
import { CsrfService } from '../http/csrf.service';
import {
  AuthUser,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  MfaLoginRequest,
  RecoveryCodeLoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  RegisterResponse,
} from './auth.models';
import { AuthStateService } from './auth-state.service';

/**
 * Shared frontend authentication API.
 *
 * Components never read cookies or Identity internals. They call this service,
 * while the backend and its HttpOnly cookie remain the authentication source
 * of truth.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authState = inject(AuthStateService);
  private readonly csrfService = inject(CsrfService);
  private restoreRequest$?: Observable<AuthUser | null>;

  readonly currentUser = this.authState.currentUser;
  readonly isInitialized = this.authState.isInitialized;
  readonly isAuthenticated = this.authState.isAuthenticated;
  readonly isDemo = this.authState.isDemo;
  readonly isAdmin = this.authState.isAdmin;

  /**
   * Restores the browser session from the backend's /me endpoint.
   * Concurrent startup/guard callers share one request.
   */
  restoreSession(): Observable<AuthUser | null> {
    if (this.authState.isInitialized()) {
      return of(this.authState.currentUser());
    }

    if (this.restoreRequest$) {
      return this.restoreRequest$;
    }

    this.restoreRequest$ = this.http.get<AuthUser>(API_ENDPOINTS.auth.me).pipe(
      tap((user) => this.authState.setUser(user)),
      catchError((error: unknown) => {
        // A missing/expired session is an expected anonymous state.
        // Other startup failures also fail closed rather than inventing an
        // authenticated browser identity.
        if (error instanceof HttpErrorResponse && error.status !== 401) {
          console.error('Unable to restore the Choom Vault session.');
        }

        this.authState.clearUser();
        return of(null);
      }),
      finalize(() => {
        this.restoreRequest$ = undefined;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    return this.restoreRequest$;
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.auth.login, request).pipe(
      tap((response) => {
        this.csrfService.invalidate();

        if (response.user) {
          this.authState.setUser(response.user);
        }
      }),
    );
  }

  loginDemo(): Observable<AuthUser> {
    return this.http.post<AuthUser>(API_ENDPOINTS.auth.demo, {}).pipe(
      tap((user) => {
        this.csrfService.invalidate();
        this.authState.setUser(user);
      }),
    );
  }

  completeMfa(code: string): Observable<AuthUser> {
    const request: MfaLoginRequest = { code };

    return this.http.post<AuthUser>(API_ENDPOINTS.auth.mfa, request).pipe(
      tap((user) => {
        this.csrfService.invalidate();
        this.authState.setUser(user);
      }),
    );
  }

  completeRecoveryLogin(recoveryCode: string): Observable<AuthUser> {
    const request: RecoveryCodeLoginRequest = { recoveryCode };

    return this.http.post<AuthUser>(API_ENDPOINTS.auth.mfaRecovery, request).pipe(
      tap((user) => {
        this.csrfService.invalidate();
        this.authState.setUser(user);
      }),
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(API_ENDPOINTS.auth.register, request)
      .pipe(tap(() => this.csrfService.invalidate()));
  }

  /**
   * Requests password recovery without revealing whether an account exists.
   * The backend owns account lookup, reset-token generation and email delivery.
   */
  forgotPassword(email: string): Observable<void> {
    const request: ForgotPasswordRequest = { email: email.trim() };

    return this.http.post<void>(API_ENDPOINTS.auth.forgotPassword, request);
  }

  /**
   * Submits the opaque Identity reset token exactly as received from the
   * backend-generated reset link. Angular never creates or validates tokens.
   */
  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.auth.resetPassword, request);
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(API_ENDPOINTS.auth.logout, {})
      .pipe(tap(() => this.clearAuthenticatedSession()));
  }

  /**
   * Clears Angular's public authenticated-user state after the backend has
   * already ended the Identity session (for example successful account
   * deletion). Logout uses the same cleanup path after its API call.
   */
  clearAuthenticatedSession(): void {
    this.csrfService.invalidate();
    this.authState.clearUser();
  }

  hasRole(role: string): boolean {
    return this.authState.currentUser()?.roles.includes(role) ?? false;
  }
}

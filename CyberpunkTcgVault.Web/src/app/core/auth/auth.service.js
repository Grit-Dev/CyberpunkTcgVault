import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, of, shareReplay, tap } from 'rxjs';
import { API_ENDPOINTS } from '../http/api-endpoints';
import { CsrfService } from '../http/csrf.service';
import { AuthStateService } from './auth-state.service';
import * as i0 from "@angular/core";
/**
 * Shared frontend authentication API.
 *
 * Components never read cookies or Identity internals. They call this service,
 * while the backend and its HttpOnly cookie remain the authentication source
 * of truth.
 */
export class AuthService {
    http = inject(HttpClient);
    authState = inject(AuthStateService);
    csrfService = inject(CsrfService);
    restoreRequest$;
    currentUser = this.authState.currentUser;
    isInitialized = this.authState.isInitialized;
    isAuthenticated = this.authState.isAuthenticated;
    isDemo = this.authState.isDemo;
    isAdmin = this.authState.isAdmin;
    /**
     * Restores the browser session from the backend's /me endpoint.
     * Concurrent startup/guard callers share one request.
     */
    restoreSession() {
        if (this.authState.isInitialized()) {
            return of(this.authState.currentUser());
        }
        if (this.restoreRequest$) {
            return this.restoreRequest$;
        }
        this.restoreRequest$ = this.http
            .get(API_ENDPOINTS.auth.me)
            .pipe(tap(user => this.authState.setUser(user)), catchError((error) => {
            // A missing/expired session is an expected anonymous state.
            // Other startup failures also fail closed rather than inventing an
            // authenticated browser identity.
            if (error instanceof HttpErrorResponse &&
                error.status !== 401) {
                console.error('Unable to restore the Choom Vault session.');
            }
            this.authState.clearUser();
            return of(null);
        }), finalize(() => {
            this.restoreRequest$ = undefined;
        }), shareReplay({
            bufferSize: 1,
            refCount: false
        }));
        return this.restoreRequest$;
    }
    login(request) {
        return this.http
            .post(API_ENDPOINTS.auth.login, request)
            .pipe(tap(response => {
            this.csrfService.invalidate();
            if (response.user) {
                this.authState.setUser(response.user);
            }
        }));
    }
    loginDemo() {
        return this.http
            .post(API_ENDPOINTS.auth.demo, {})
            .pipe(tap(user => {
            this.csrfService.invalidate();
            this.authState.setUser(user);
        }));
    }
    completeMfa(code) {
        const request = { code };
        return this.http
            .post(API_ENDPOINTS.auth.mfa, request)
            .pipe(tap(user => {
            this.csrfService.invalidate();
            this.authState.setUser(user);
        }));
    }
    completeRecoveryLogin(recoveryCode) {
        const request = { recoveryCode };
        return this.http
            .post(API_ENDPOINTS.auth.mfaRecovery, request)
            .pipe(tap(user => {
            this.csrfService.invalidate();
            this.authState.setUser(user);
        }));
    }
    register(request) {
        return this.http
            .post(API_ENDPOINTS.auth.register, request)
            .pipe(tap(() => this.csrfService.invalidate()));
    }
    /**
     * Requests password recovery without revealing whether an account exists.
     * The backend owns account lookup, reset-token generation and email delivery.
     */
    forgotPassword(email) {
        const request = { email: email.trim() };
        return this.http.post(API_ENDPOINTS.auth.forgotPassword, request);
    }
    /**
     * Submits the opaque Identity reset token exactly as received from the
     * backend-generated reset link. Angular never creates or validates tokens.
     */
    resetPassword(request) {
        return this.http.post(API_ENDPOINTS.auth.resetPassword, request);
    }
    logout() {
        return this.http
            .post(API_ENDPOINTS.auth.logout, {})
            .pipe(tap(() => {
            this.csrfService.invalidate();
            this.authState.clearUser();
        }));
    }
    hasRole(role) {
        return this.authState.currentUser()?.roles.includes(role) ?? false;
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

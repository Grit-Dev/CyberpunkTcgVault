import { computed, Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Small in-memory authentication store.
 *
 * It intentionally stores only the backend's public user contract. The real
 * authentication credential remains in the browser-managed HttpOnly cookie.
 */
export class AuthStateService {
    currentUserState = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentUserState" }] : /* istanbul ignore next */ []));
    initializedState = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "initializedState" }] : /* istanbul ignore next */ []));
    currentUser = this.currentUserState.asReadonly();
    isInitialized = this.initializedState.asReadonly();
    isAuthenticated = computed(() => this.currentUserState() !== null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
    isDemo = computed(() => this.currentUserState()?.roles.includes('Demo') ?? false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isDemo" }] : /* istanbul ignore next */ []));
    isAdmin = computed(() => this.currentUserState()?.roles.includes('Admin') ?? false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isAdmin" }] : /* istanbul ignore next */ []));
    setUser(user) {
        this.currentUserState.set(user);
        this.initializedState.set(true);
    }
    clearUser() {
        this.currentUserState.set(null);
        this.initializedState.set(true);
    }
    static ɵfac = function AuthStateService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthStateService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthStateService, factory: AuthStateService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthStateService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

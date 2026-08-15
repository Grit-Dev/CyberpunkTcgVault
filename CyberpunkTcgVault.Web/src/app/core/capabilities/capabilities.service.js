import { computed, Injectable, signal } from '@angular/core';
import { catchError, finalize, of, shareReplay, tap } from 'rxjs';
import { API_ENDPOINTS } from '../http/api-endpoints';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
const SAFE_DEFAULT_CAPABILITIES = {
    publicRegistrationEnabled: false,
    demoAccessEnabled: false
};
/**
 * Loads product availability from the backend once and exposes it as shared
 * application state.
 *
 * If capability discovery fails, the frontend fails closed by hiding optional
 * Registration and Demo entry points rather than inventing availability.
 */
export class CapabilitiesService {
    http;
    capabilitiesState = signal(SAFE_DEFAULT_CAPABILITIES, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "capabilitiesState" }] : /* istanbul ignore next */ []));
    loadedState = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loadedState" }] : /* istanbul ignore next */ []));
    loadRequest$;
    capabilities = this.capabilitiesState.asReadonly();
    isLoaded = this.loadedState.asReadonly();
    publicRegistrationEnabled = computed(() => this.capabilitiesState().publicRegistrationEnabled, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "publicRegistrationEnabled" }] : /* istanbul ignore next */ []));
    demoAccessEnabled = computed(() => this.capabilitiesState().demoAccessEnabled, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "demoAccessEnabled" }] : /* istanbul ignore next */ []));
    constructor(http) {
        this.http = http;
    }
    /**
     * Loads capabilities once. Concurrent callers share the same HTTP request.
     */
    load() {
        if (this.loadedState()) {
            return of(this.capabilitiesState());
        }
        if (this.loadRequest$) {
            return this.loadRequest$;
        }
        this.loadRequest$ = this.http
            .get(API_ENDPOINTS.capabilities)
            .pipe(tap(capabilities => {
            this.capabilitiesState.set(capabilities);
            this.loadedState.set(true);
        }), catchError(() => {
            this.capabilitiesState.set(SAFE_DEFAULT_CAPABILITIES);
            this.loadedState.set(true);
            return of(SAFE_DEFAULT_CAPABILITIES);
        }), finalize(() => {
            this.loadRequest$ = undefined;
        }), shareReplay({
            bufferSize: 1,
            refCount: false
        }));
        return this.loadRequest$;
    }
    static ɵfac = function CapabilitiesService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CapabilitiesService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CapabilitiesService, factory: CapabilitiesService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CapabilitiesService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();

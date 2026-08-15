import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, of, shareReplay } from 'rxjs';
import { API_ENDPOINTS } from './api-endpoints';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Owns Choom Vault's antiforgery request token.
 *
 * The token lives only in application memory. A raw HttpClient built from
 * HttpBackend is used for the token request so it does not recursively pass
 * through the API security interceptor that depends on this service.
 */
export class CsrfService {
    rawHttp;
    requestToken = null;
    tokenRequest$;
    constructor(httpBackend) {
        this.rawHttp = new HttpClient(httpBackend);
    }
    /**
     * Returns the cached request token or retrieves a fresh one from the API.
     * Concurrent unsafe requests share one token request.
     */
    getRequestToken() {
        if (this.requestToken) {
            return of(this.requestToken);
        }
        if (this.tokenRequest$) {
            return this.tokenRequest$;
        }
        this.tokenRequest$ = this.rawHttp
            .get(API_ENDPOINTS.auth.csrf, { withCredentials: true })
            .pipe(map(response => {
            this.requestToken = response.requestToken;
            return response.requestToken;
        }), finalize(() => {
            this.tokenRequest$ = undefined;
        }), shareReplay({
            bufferSize: 1,
            refCount: false
        }));
        return this.tokenRequest$;
    }
    /**
     * Authentication-state changes can invalidate an antiforgery token because
     * the backend token is tied to the current browser identity.
     */
    invalidate() {
        this.requestToken = null;
    }
    static ɵfac = function CsrfService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CsrfService)(i0.ɵɵinject(i1.HttpBackend)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CsrfService, factory: CsrfService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CsrfService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpBackend }], null); })();

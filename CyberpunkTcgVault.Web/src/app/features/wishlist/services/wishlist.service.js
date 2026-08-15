import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { finalize, map, of, shareReplay, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import * as i0 from "@angular/core";
/** Wishlist API state scoped to the current authenticated user. */
export class WishlistService {
    http = inject(HttpClient);
    authService = inject(AuthService);
    itemsState = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "itemsState" }] : /* istanbul ignore next */ []));
    loadedState = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loadedState" }] : /* istanbul ignore next */ []));
    loadRequest$;
    scopedUserId = null;
    items = this.itemsState.asReadonly();
    isLoaded = this.loadedState.asReadonly();
    constructor() {
        effect(() => {
            const userId = this.authService.currentUser()?.userId ?? null;
            if (userId !== this.scopedUserId) {
                this.scopedUserId = userId;
                this.itemsState.set([]);
                this.loadedState.set(false);
                this.loadRequest$ = undefined;
            }
        });
    }
    load(forceRefresh = false) {
        if (!this.authService.isAuthenticated()) {
            return of([]);
        }
        if (this.loadedState() && !forceRefresh) {
            return of(this.itemsState());
        }
        if (this.loadRequest$) {
            return this.loadRequest$;
        }
        this.loadRequest$ = this.http
            .get(API_ENDPOINTS.wishlist)
            .pipe(tap(items => {
            this.itemsState.set(items);
            this.loadedState.set(true);
        }), finalize(() => {
            this.loadRequest$ = undefined;
        }), shareReplay({
            bufferSize: 1,
            refCount: false
        }));
        return this.loadRequest$;
    }
    addPrinting(cardPrintingId) {
        const request = {
            cardPrintingId,
            wantedQuantity: 1
        };
        return this.http
            .post(API_ENDPOINTS.wishlist, request)
            .pipe(tap(item => {
            this.itemsState.update(items => [
                ...items.filter(existing => existing.id !== item.id),
                item
            ]);
        }));
    }
    /** Updates wanted quantity while preserving the record's other metadata. */
    updateQuantity(item, wantedQuantity) {
        const request = {
            wantedQuantity,
            priority: item.priority,
            reasonWanted: item.reasonWanted,
            wantRaw: item.wantRaw,
            wantGraded: item.wantGraded,
            preferredGradingCompany: item.preferredGradingCompany,
            isOpenToTrade: item.isOpenToTrade,
            notes: item.notes
        };
        return this.http
            .put(API_ENDPOINTS.wishlistItemById(item.id), request)
            .pipe(map(() => ({ ...item, wantedQuantity })), tap(updated => {
            this.itemsState.update(items => items.map(existing => existing.id === updated.id ? updated : existing));
        }));
    }
    /** Removes only the authenticated collector's Wishlist row. */
    remove(item) {
        return this.http
            .delete(API_ENDPOINTS.wishlistItemById(item.id))
            .pipe(tap(() => {
            this.itemsState.update(items => items.filter(existing => existing.id !== item.id));
        }));
    }
    static ɵfac = function WishlistService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WishlistService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WishlistService, factory: WishlistService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WishlistService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [], null); })();

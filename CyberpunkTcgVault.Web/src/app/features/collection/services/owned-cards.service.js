import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { finalize, map, of, shareReplay, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import * as i0 from "@angular/core";
/**
 * Reusable private Collection API state.
 *
 * Results are cached only for the current authenticated user. The cache is
 * cleared as soon as the frontend identity changes so private records from one
 * account cannot remain visible after logout/account switching.
 */
export class OwnedCardsService {
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
            .get(API_ENDPOINTS.ownedCards)
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
            quantityOwned: 1
        };
        return this.http
            .post(API_ENDPOINTS.ownedCards, request)
            .pipe(tap(item => {
            this.itemsState.update(items => [
                ...items.filter(existing => existing.id !== item.id),
                item
            ]);
        }));
    }
    /**
     * Changes the copy count on the existing OwnedCard row.
     *
     * PUT uses the backend's full update DTO, so all existing collector metadata
     * is deliberately preserved instead of being reset while quantity changes.
     */
    updateQuantity(item, quantityOwned) {
        const request = {
            quantityOwned,
            condition: item.condition,
            isInMasterCollection: item.isInMasterCollection,
            isDuplicate: item.isDuplicate,
            isGradingCandidate: item.isGradingCandidate,
            isOpenForTrade: item.isOpenForTrade,
            isOpenToMessages: item.isOpenToMessages,
            maySellLater: item.maySellLater,
            notes: item.notes
        };
        return this.updateRecord(item, request);
    }
    /**
     * Updates every editable field on an existing collector record.
     *
     * The API returns 204 No Content, so the updated record is reconstructed
     * from the current item and the request before the local cache is replaced.
     */
    updateRecord(item, request) {
        return this.http
            .put(API_ENDPOINTS.ownedCardById(item.id), request)
            .pipe(map(() => ({ ...item, ...request })), tap(updated => {
            this.itemsState.update(items => items.map(existing => existing.id === updated.id ? updated : existing));
        }));
    }
    /** Removes only the authenticated collector's OwnedCard record. */
    remove(item) {
        return this.http
            .delete(API_ENDPOINTS.ownedCardById(item.id))
            .pipe(tap(() => {
            this.itemsState.update(items => items.filter(existing => existing.id !== item.id));
        }));
    }
    static ɵfac = function OwnedCardsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OwnedCardsService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OwnedCardsService, factory: OwnedCardsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OwnedCardsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [], null); })();

import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CardCatalogueStateService {
    storageKey = 'choom-vault:card-catalogue-return-state';
    /**
     * Remembers the current Archive view immediately before card inspection.
     */
    save(state) {
        try {
            sessionStorage.setItem(this.storageKey, JSON.stringify(state));
        }
        catch {
            // Browsing the Archive must still work if storage is unavailable.
        }
    }
    /**
     * Restores the previous Archive view once, then removes it so normal
     * navigation to /cards still starts from a clean Archive.
     */
    consume() {
        try {
            const storedState = sessionStorage.getItem(this.storageKey);
            if (!storedState) {
                return null;
            }
            sessionStorage.removeItem(this.storageKey);
            const parsedState = JSON.parse(storedState);
            const currentPage = Number(parsedState.currentPage);
            if (!Number.isInteger(currentPage) ||
                currentPage < 1 ||
                !parsedState.filters) {
                return null;
            }
            return {
                filters: {
                    name: parsedState.filters.name ?? '',
                    setCode: parsedState.filters.setCode ?? '',
                    cardType: parsedState.filters.cardType ?? '',
                    rarity: parsedState.filters.rarity ?? '',
                    colour: parsedState.filters.colour ?? '',
                    classification: parsedState.filters.classification ?? '',
                    tags: parsedState.filters.tags ?? '',
                    cost: this.normaliseNumber(parsedState.filters.cost),
                    power: this.normaliseNumber(parsedState.filters.power),
                    ram: this.normaliseNumber(parsedState.filters.ram),
                    eddies: this.normaliseNumber(parsedState.filters.eddies),
                    sortBy: parsedState.filters.sortBy === 'name'
                        ? 'name'
                        : 'setOrder',
                    sortDirection: parsedState.filters.sortDirection === 'desc'
                        ? 'desc'
                        : 'asc'
                },
                currentPage
            };
        }
        catch {
            return null;
        }
    }
    normaliseNumber(value) {
        return typeof value === 'number' &&
            Number.isFinite(value)
            ? value
            : null;
    }
    static ɵfac = function CardCatalogueStateService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CardCatalogueStateService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CardCatalogueStateService, factory: CardCatalogueStateService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardCatalogueStateService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

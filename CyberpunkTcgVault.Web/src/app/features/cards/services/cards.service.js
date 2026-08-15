import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS, toApiUrl } from '../../../core/http/api-endpoints';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Provides access to the public card catalogue API.
 */
export class CardsService {
    http;
    /**
     * API endpoint used to retrieve cards.
     *
     * The base URL comes from environment configuration so the
     * application can use different API locations per environment.
     */
    cardsUrl = API_ENDPOINTS.cards;
    /**
     * Angular injects HttpClient when this service is created.
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * Retrieves cards from the public catalogue.
     *
     * Filters are optional so callers such as the homepage can
     * retrieve all cards while the Catalogue page can request
     * filtered results.
     */
    getCards(filters = {}) {
        const params = this.createFilterParams(filters);
        return this.http.get(this.cardsUrl, { params });
    }
    /**
     * Retrieves one server-owned Archive page and its authoritative count.
     */
    getCardsPage(filters = {}, page = 1, pageSize = 24) {
        let params = this.createFilterParams(filters);
        params = params
            .set('page', page)
            .set('pageSize', pageSize);
        return this.http.get(API_ENDPOINTS.cardsPaged, { params });
    }
    /**
     * Retrieves genuine filter choices from the current catalogue data.
     */
    getFilterOptions() {
        return this.http.get(API_ENDPOINTS.cardFilterOptions);
    }
    /**
     * Retrieves one public logical Card together with its authoritative
     * CardPrinting collection.
     */
    getCardById(id) {
        return this.http.get(API_ENDPOINTS.cardById(id));
    }
    /**
     * Converts a stored card image path into a URL that the
     * Angular application can display.
     */
    getImageUrl(imagePath) {
        if (!imagePath) {
            return toApiUrl('/images/cards/placeholder.png');
        }
        return toApiUrl(imagePath);
    }
    createFilterParams(filters) {
        let params = new HttpParams();
        const stringFilters = [
            ['name', filters.name],
            ['setCode', filters.setCode],
            ['cardType', filters.cardType],
            ['rarity', filters.rarity],
            ['colour', filters.colour],
            ['classification', filters.classification],
            ['tags', filters.tags],
            ['sortBy', filters.sortBy],
            ['sortDirection', filters.sortDirection]
        ];
        for (const [parameter, value] of stringFilters) {
            if (value?.trim()) {
                params = params.set(parameter, value.trim());
            }
        }
        const numericFilters = [
            ['cost', filters.cost],
            ['power', filters.power],
            ['ram', filters.ram],
            ['eddies', filters.eddies]
        ];
        for (const [parameter, value] of numericFilters) {
            if (value !== null && value !== undefined) {
                params = params.set(parameter, value);
            }
        }
        return params;
    }
    static ɵfac = function CardsService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CardsService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CardsService, factory: CardsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();

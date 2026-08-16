import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS, toApiUrl } from '../../../core/http/api-endpoints';
import { CardFilterOptions } from '../models/card-filter-options';
import { Card } from '../models/card';
import { CardFilters } from '../models/card-filters';
import { PagedResponse } from '../models/paged-response';

/**
 * Provides access to the public card catalogue API.
 */
@Injectable({
  providedIn: 'root',
})
export class CardsService {
  /**
   * API endpoint used to retrieve cards.
   *
   * The base URL comes from environment configuration so the
   * application can use different API locations per environment.
   */
  private readonly cardsUrl = API_ENDPOINTS.cards;

  /**
   * Angular injects HttpClient when this service is created.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves cards from the public catalogue.
   *
   * Filters are optional so callers such as the homepage can
   * retrieve all cards while the Catalogue page can request
   * filtered results.
   */
  getCards(filters: CardFilters = {}): Observable<Card[]> {
    const params = this.createFilterParams(filters);

    return this.http.get<Card[]>(this.cardsUrl, { params });
  }

  /**
   * Retrieves one server-owned Archive page and its authoritative count.
   */
  getCardsPage(
    filters: CardFilters = {},
    page = 1,
    pageSize = 24,
  ): Observable<PagedResponse<Card>> {
    let params = this.createFilterParams(filters);

    params = params.set('page', page).set('pageSize', pageSize);

    return this.http.get<PagedResponse<Card>>(API_ENDPOINTS.cardsPaged, { params });
  }

  /**
   * Retrieves genuine filter choices from the current catalogue data.
   */
  getFilterOptions(): Observable<CardFilterOptions> {
    return this.http.get<CardFilterOptions>(API_ENDPOINTS.cardFilterOptions);
  }

  /**
   * Retrieves one public logical Card together with its authoritative
   * CardPrinting collection.
   */
  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(API_ENDPOINTS.cardById(id));
  }

  /**
   * Converts a stored card image path into a URL that the
   * Angular application can display.
   */
  getImageUrl(imagePath: string | null): string {
    if (!imagePath) {
      return toApiUrl('/images/cards/placeholder.png');
    }

    return toApiUrl(imagePath);
  }

  private createFilterParams(filters: CardFilters): HttpParams {
    let params = new HttpParams();

    const stringFilters: Array<[string, string | undefined]> = [
      ['name', filters.name],
      ['setCode', filters.setCode],
      ['cardType', filters.cardType],
      ['rarity', filters.rarity],
      ['colour', filters.colour],
      ['classification', filters.classification],
      ['tags', filters.tags],
      ['sortBy', filters.sortBy],
      ['sortDirection', filters.sortDirection],
    ];

    for (const [parameter, value] of stringFilters) {
      if (value?.trim()) {
        params = params.set(parameter, value.trim());
      }
    }

    const numericFilters: Array<[string, number | null | undefined]> = [
      ['cost', filters.cost],
      ['power', filters.power],
      ['ram', filters.ram],
      ['eddies', filters.eddies],
    ];

    for (const [parameter, value] of numericFilters) {
      if (value !== null && value !== undefined) {
        params = params.set(parameter, value);
      }
    }

    return params;
  }
}

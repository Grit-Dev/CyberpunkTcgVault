import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  API_ENDPOINTS,
  toApiUrl
} from '../../../core/http/api-endpoints';
import { Card } from '../models/card';
import { CardFilters } from '../models/card-filters';

/**
 * Provides access to the public card catalogue API.
 */
@Injectable({
  providedIn: 'root'
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
  constructor(private readonly http: HttpClient) { }

  /**
   * Retrieves cards from the public catalogue.
   *
   * Filters are optional so callers such as the homepage can
   * retrieve all cards while the Catalogue page can request
   * filtered results.
   */
  getCards(filters: CardFilters = {}): Observable<Card[]> {
    let params = new HttpParams();

    if (filters.name?.trim()) {
      params = params.set(
        'name',
        filters.name.trim()
      );
    }

    if (filters.rarity?.trim()) {
      params = params.set(
        'rarity',
        filters.rarity.trim()
      );
    }

    if (filters.classification?.trim()) {
      params = params.set(
        'classification',
        filters.classification.trim()
      );
    }

    if (filters.cardType?.trim()) {
      params = params.set(
        'cardType',
        filters.cardType.trim()
      );
    }

    return this.http.get<Card[]>(
      this.cardsUrl,
      { params }
    );
  }

  /**
   * Retrieves one public logical Card together with its authoritative
   * CardPrinting collection.
   */
  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(
      API_ENDPOINTS.cardById(id)
    );
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
}
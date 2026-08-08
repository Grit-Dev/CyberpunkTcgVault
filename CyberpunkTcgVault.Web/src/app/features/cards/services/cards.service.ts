import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
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
  private readonly cardsUrl = `${environment.apiUrl}/api/Cards`;

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
   * Converts a stored card image path into a URL that the
   * Angular application can display.
   */
  getImageUrl(imagePath: string | null): string {
    if (!imagePath) {
      return `${environment.apiUrl}/images/cards/placeholder.png`;
    }

    // Allow externally hosted artwork without prefixing the API URL.
    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
    ) {
      return imagePath;
    }

    return `${environment.apiUrl}${imagePath}`;
  }
}
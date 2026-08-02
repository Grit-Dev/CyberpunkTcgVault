import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from '../models/card';

/*
 * Makes this service available through Angular's dependency-injection system.
 * providedIn: 'root' means Angular creates one shared CardsService instance
 * that can be injected anywhere in the application.
 */
@Injectable({
  providedIn: 'root'
})

export class CardsService {
  /*
  * API endpoint used to retrieve cards.
  *
  * The base URL comes from environment configuration,
  * allowing different API locations for development
  * and production without changing application code.
  */
  private readonly cardsUrl = `${environment.apiUrl}/api/Cards`;

  /*
   * Angular injects HttpClient when it creates this service.
   * HttpClient is responsible for sending HTTP requests to the backend API.
   * The readonly keyword prevents this reference from being reassigned.
   */
  constructor(private readonly http: HttpClient) { }

  /*
   * Retrieves the public card catalogue from the ASP.NET Core API.
   * Card[] describes the expected JSON response.
   * Observable means the HTTP response arrives asynchronously in the future.
   * The component calling this method must subscribe to receive the result.
   */
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl);
  }

  getImageUrl(imagePath: string | null): string {

    // TODO: Add Vault card placeholder image when artwork fallback is created.
    if (!imagePath) {
      return '';
    }

    return `${environment.apiUrl}${imagePath}`;
  }
}
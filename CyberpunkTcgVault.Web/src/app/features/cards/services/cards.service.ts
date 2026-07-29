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
   * A relative URL is used so the Angular development proxy can forward
   * requests from /api/Cards to the locally running ASP.NET Core API.
   * Later, production configuration can decide where the API is hosted
   * without components needing to know the full backend address.
   */
  private readonly cardsUrl = '/api/Cards';

  /*
   * Angular injects HttpClient when it creates this service.
   * HttpClient is responsible for sending HTTP requests to the backend API.
   * The readonly keyword prevents this reference from being reassigned.
   */
  constructor(private readonly http: HttpClient) {}

  /*
   * Retrieves the public card catalogue from the ASP.NET Core API.
   * Card[] describes the expected JSON response.
   * Observable means the HTTP response arrives asynchronously in the future.
   * The component calling this method must subscribe to receive the result.
   */
getCards(): Observable<Card[]> {
  return this.http.get<Card[]>(this.cardsUrl);
  }
}
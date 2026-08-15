import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  finalize,
  map,
  Observable,
  of,
  shareReplay
} from 'rxjs';

import { API_ENDPOINTS } from './api-endpoints';

interface CsrfTokenResponse {
  requestToken: string;
}

/**
 * Owns Choom Vault's antiforgery request token.
 *
 * The token lives only in application memory. A raw HttpClient built from
 * HttpBackend is used for the token request so it does not recursively pass
 * through the API security interceptor that depends on this service.
 */
@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  private readonly rawHttp: HttpClient;
  private requestToken: string | null = null;
  private tokenRequest$?: Observable<string>;

  constructor(httpBackend: HttpBackend) {
    this.rawHttp = new HttpClient(httpBackend);
  }

  /**
   * Returns the cached request token or retrieves a fresh one from the API.
   * Concurrent unsafe requests share one token request.
   */
  getRequestToken(): Observable<string> {
    if (this.requestToken) {
      return of(this.requestToken);
    }

    if (this.tokenRequest$) {
      return this.tokenRequest$;
    }

    this.tokenRequest$ = this.rawHttp
      .get<CsrfTokenResponse>(
        API_ENDPOINTS.auth.csrf,
        { withCredentials: true }
      )
      .pipe(
        map(response => {
          this.requestToken = response.requestToken;
          return response.requestToken;
        }),
        finalize(() => {
          this.tokenRequest$ = undefined;
        }),
        shareReplay({
          bufferSize: 1,
          refCount: false
        })
      );

    return this.tokenRequest$;
  }

  /**
   * Authentication-state changes can invalidate an antiforgery token because
   * the backend token is tied to the current browser identity.
   */
  invalidate(): void {
    this.requestToken = null;
  }
}

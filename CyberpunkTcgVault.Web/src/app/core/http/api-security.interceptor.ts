import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AuthStateService } from '../auth/auth-state.service';
import { isChoomVaultApiRequest } from './api-endpoints';
import { CsrfService } from './csrf.service';

const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * Applies the browser-security contract required by the Choom Vault API.
 *
 * - Choom Vault API requests include browser credentials so the HttpOnly
 *   Identity cookie can be sent.
 * - Unsafe API requests also receive the in-memory antiforgery request token.
 * - A rejected authenticated API session clears only Angular's public user
 *   state; the backend remains the source of truth for authentication.
 * - Third-party requests are left untouched.
 */
export const apiSecurityInterceptor: HttpInterceptorFn = (request, next) => {
  if (!isChoomVaultApiRequest(request.url)) {
    return next(request);
  }

  const csrfService = inject(CsrfService);
  const authState = inject(AuthStateService);

  const send = (securedRequest: HttpRequest<unknown>): Observable<HttpEvent<unknown>> =>
    next(securedRequest).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          authState.clearUser();
        }

        return throwError(() => error);
      }),
    );

  const credentialedRequest = request.clone({
    withCredentials: true,
  });

  if (!UNSAFE_METHODS.has(request.method.toUpperCase())) {
    return send(credentialedRequest);
  }

  return csrfService.getRequestToken().pipe(
    switchMap((requestToken) =>
      send(
        credentialedRequest.clone({
          setHeaders: {
            'X-XSRF-TOKEN': requestToken,
          },
        }),
      ),
    ),
  );
};

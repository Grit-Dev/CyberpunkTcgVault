import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs';

import { AuthUser } from '../../../core/auth/auth.models';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';

export interface DeleteAccountRequest {
  currentPassword: string;
  authenticatorCode: string | null;
}

/**
 * Collector-facing account API surface.
 *
 * The current MVP contract exposes account identity through /api/Auth/me and
 * self-service deletion through DELETE /api/Account. There is intentionally
 * no username/email update method because the backend does not provide one.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly http = inject(HttpClient);

  load(): Observable<AuthUser> {
    return this.http.get<AuthUser>(API_ENDPOINTS.auth.me);
  }

  deleteAccount(currentPassword: string): Observable<void> {
    const request: DeleteAccountRequest = {
      currentPassword,
      authenticatorCode: null
    };

    return this.http.delete<void>(API_ENDPOINTS.account, {
      body: request
    });
  }
}

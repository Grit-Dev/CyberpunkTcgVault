import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, of, shareReplay, tap } from 'rxjs';

import { API_ENDPOINTS } from '../http/api-endpoints';
import { ProductCapabilities } from './capabilities.models';

const SAFE_DEFAULT_CAPABILITIES: ProductCapabilities = {
  publicRegistrationEnabled: false,
  demoAccessEnabled: false,
};

/**
 * Loads product availability from the backend once and exposes it as shared
 * application state.
 *
 * If capability discovery fails, the frontend fails closed by hiding optional
 * Registration and Demo entry points rather than inventing availability.
 */
@Injectable({
  providedIn: 'root',
})
export class CapabilitiesService {
  private readonly capabilitiesState = signal<ProductCapabilities>(SAFE_DEFAULT_CAPABILITIES);
  private readonly loadedState = signal(false);
  private loadRequest$?: Observable<ProductCapabilities>;

  readonly capabilities = this.capabilitiesState.asReadonly();
  readonly isLoaded = this.loadedState.asReadonly();
  readonly publicRegistrationEnabled = computed(
    () => this.capabilitiesState().publicRegistrationEnabled,
  );
  readonly demoAccessEnabled = computed(() => this.capabilitiesState().demoAccessEnabled);

  constructor(private readonly http: HttpClient) {}

  /**
   * Loads capabilities once. Concurrent callers share the same HTTP request.
   */
  load(): Observable<ProductCapabilities> {
    if (this.loadedState()) {
      return of(this.capabilitiesState());
    }

    if (this.loadRequest$) {
      return this.loadRequest$;
    }

    this.loadRequest$ = this.http.get<ProductCapabilities>(API_ENDPOINTS.capabilities).pipe(
      tap((capabilities) => {
        this.capabilitiesState.set(capabilities);
        this.loadedState.set(true);
      }),
      catchError(() => {
        this.capabilitiesState.set(SAFE_DEFAULT_CAPABILITIES);
        this.loadedState.set(true);
        return of(SAFE_DEFAULT_CAPABILITIES);
      }),
      finalize(() => {
        this.loadRequest$ = undefined;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    return this.loadRequest$;
  }
}

import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal
} from '@angular/core';
import {
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  tap
} from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import {
  CreateOwnedCardRequest,
  OwnedCard,
  UpdateOwnedCardRequest
} from '../models/owned-card';

/**
 * Reusable private Collection API state.
 *
 * Results are cached only for the current authenticated user. The cache is
 * cleared as soon as the frontend identity changes so private records from one
 * account cannot remain visible after logout/account switching.
 */
@Injectable({
  providedIn: 'root'
})
export class OwnedCardsService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly itemsState = signal<OwnedCard[]>([]);
  private readonly loadedState = signal(false);
  private loadRequest$?: Observable<OwnedCard[]>;
  private scopedUserId: string | null = null;

  readonly items = this.itemsState.asReadonly();
  readonly isLoaded = this.loadedState.asReadonly();

  constructor() {
    effect(() => {
      const userId = this.authService.currentUser()?.userId ?? null;

      if (userId !== this.scopedUserId) {
        this.scopedUserId = userId;
        this.itemsState.set([]);
        this.loadedState.set(false);
        this.loadRequest$ = undefined;
      }
    });
  }

  load(forceRefresh = false): Observable<OwnedCard[]> {
    if (!this.authService.isAuthenticated()) {
      return of([]);
    }

    if (this.loadedState() && !forceRefresh) {
      return of(this.itemsState());
    }

    if (this.loadRequest$) {
      return this.loadRequest$;
    }

    this.loadRequest$ = this.http
      .get<OwnedCard[]>(API_ENDPOINTS.ownedCards)
      .pipe(
        tap(items => {
          this.itemsState.set(items);
          this.loadedState.set(true);
        }),
        finalize(() => {
          this.loadRequest$ = undefined;
        }),
        shareReplay({
          bufferSize: 1,
          refCount: false
        })
      );

    return this.loadRequest$;
  }

  addPrinting(cardPrintingId: number): Observable<OwnedCard> {
    const request: CreateOwnedCardRequest = {
      cardPrintingId,
      quantityOwned: 1
    };

    return this.http
      .post<OwnedCard>(API_ENDPOINTS.ownedCards, request)
      .pipe(
        tap(item => {
          this.itemsState.update(items => [
            ...items.filter(existing => existing.id !== item.id),
            item
          ]);
        })
      );
  }

  /**
   * Changes the copy count on the existing OwnedCard row.
   *
   * PUT uses the backend's full update DTO, so all existing collector metadata
   * is deliberately preserved instead of being reset while quantity changes.
   */
  updateQuantity(item: OwnedCard, quantityOwned: number): Observable<OwnedCard> {
    const request: UpdateOwnedCardRequest = {
      quantityOwned,
      condition: item.condition,
      isInMasterCollection: item.isInMasterCollection,
      isDuplicate: item.isDuplicate,
      isGradingCandidate: item.isGradingCandidate,
      isOpenForTrade: item.isOpenForTrade,
      isOpenToMessages: item.isOpenToMessages,
      maySellLater: item.maySellLater,
      notes: item.notes
    };

    return this.http
      .put<void>(API_ENDPOINTS.ownedCardById(item.id), request)
      .pipe(
        map(() => ({ ...item, quantityOwned })),
        tap(updated => {
          this.itemsState.update(items =>
            items.map(existing =>
              existing.id === updated.id ? updated : existing
            )
          );
        })
      );
  }

  /** Removes only the authenticated collector's OwnedCard record. */
  remove(item: OwnedCard): Observable<void> {
    return this.http
      .delete<void>(API_ENDPOINTS.ownedCardById(item.id))
      .pipe(
        tap(() => {
          this.itemsState.update(items =>
            items.filter(existing => existing.id !== item.id)
          );
        })
      );
  }

}

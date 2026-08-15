import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal
} from '@angular/core';
import {
  finalize,
  Observable,
  of,
  shareReplay,
  tap
} from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import {
  CreateWishlistItemRequest,
  WishlistItem
} from '../models/wishlist-item';

/** Wishlist API state scoped to the current authenticated user. */
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly itemsState = signal<WishlistItem[]>([]);
  private readonly loadedState = signal(false);
  private loadRequest$?: Observable<WishlistItem[]>;
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

  load(forceRefresh = false): Observable<WishlistItem[]> {
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
      .get<WishlistItem[]>(API_ENDPOINTS.wishlist)
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

  addPrinting(cardPrintingId: number): Observable<WishlistItem> {
    const request: CreateWishlistItemRequest = {
      cardPrintingId,
      wantedQuantity: 1
    };

    return this.http
      .post<WishlistItem>(API_ENDPOINTS.wishlist, request)
      .pipe(
        tap(item => {
          this.itemsState.update(items => [
            ...items.filter(existing => existing.id !== item.id),
            item
          ]);
        })
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable, of, shareReplay, tap } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS, toApiUrl } from '../../../core/http/api-endpoints';
import {
  CollectionProduct,
  CreateCollectionProductRequest,
  UpdateCollectionProductRequest,
} from '../models/collection-product';

/** Authenticated sealed/collection-product API state scoped to one user. */
@Injectable({
  providedIn: 'root',
})
export class CollectionProductsService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly itemsState = signal<CollectionProduct[]>([]);
  private readonly loadedState = signal(false);
  private loadRequest$?: Observable<CollectionProduct[]>;
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

  load(forceRefresh = false): Observable<CollectionProduct[]> {
    if (!this.authService.isAuthenticated()) {
      return of([]);
    }

    if (this.loadedState() && !forceRefresh) {
      return of(this.itemsState());
    }

    if (this.loadRequest$) {
      return this.loadRequest$;
    }

    this.loadRequest$ = this.http.get<CollectionProduct[]>(API_ENDPOINTS.collectionProducts).pipe(
      tap((items) => {
        this.itemsState.set(items);
        this.loadedState.set(true);
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

  create(request: CreateCollectionProductRequest): Observable<CollectionProduct> {
    return this.http.post<CollectionProduct>(API_ENDPOINTS.collectionProducts, request).pipe(
      tap((item) => {
        this.itemsState.update((items) => [
          ...items.filter((existing) => existing.id !== item.id),
          item,
        ]);
      }),
    );
  }

  /**
   * PUT uses the backend's full update DTO. Quantity changes preserve all
   * existing private product metadata rather than resetting fields that are
   * intentionally not shown in the default Sealed row.
   */
  updateQuantity(item: CollectionProduct, quantity: number): Observable<CollectionProduct> {
    return this.update(item, {
      ...this.toUpdateRequest(item),
      quantity,
    });
  }

  update(
    item: CollectionProduct,
    request: UpdateCollectionProductRequest,
  ): Observable<CollectionProduct> {
    return this.http.put<void>(API_ENDPOINTS.collectionProductById(item.id), request).pipe(
      map(() => ({ ...item, ...request })),
      tap((updated) => {
        this.itemsState.update((items) =>
          items.map((existing) => (existing.id === updated.id ? updated : existing)),
        );
      }),
    );
  }

  remove(item: CollectionProduct): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.collectionProductById(item.id)).pipe(
      tap(() => {
        this.itemsState.update((items) => items.filter((existing) => existing.id !== item.id));
      }),
    );
  }

  getImageUrl(imageUrl: string | null): string | null {
    const value = imageUrl?.trim();
    return value ? toApiUrl(value) : null;
  }

  private toUpdateRequest(item: CollectionProduct): UpdateCollectionProductRequest {
    return {
      productName: item.productName,
      productType: item.productType,
      edition: item.edition,
      quantity: item.quantity,
      isSealed: item.isSealed,
      isBetaProduct: item.isBetaProduct,
      isKickstarterProduct: item.isKickstarterProduct,
      isRetailProduct: item.isRetailProduct,
      isPledgeItem: item.isPledgeItem,
      purchaseCost: item.purchaseCost,
      shippingCost: item.shippingCost,
      vatCost: item.vatCost,
      estimatedValue: item.estimatedValue,
      minimumSellPrice: item.minimumSellPrice,
      storageLocation: item.storageLocation,
      isLongTermHold: item.isLongTermHold,
      isOpenToTrade: item.isOpenToTrade,
      maySellLater: item.maySellLater,
      imageUrl: item.imageUrl,
      notes: item.notes,
    };
  }
}

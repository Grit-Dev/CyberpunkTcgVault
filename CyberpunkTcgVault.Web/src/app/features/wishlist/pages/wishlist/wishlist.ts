import { ViewportScroller } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  OnInit,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import {
  catchError,
  finalize,
  forkJoin,
  of,
  throwError
} from 'rxjs';

import { FeedbackService } from '../../../../core/feedback/feedback.service';
import { CardArtworkDirective } from '../../../cards/directives/card-artwork.directive';
import { CardDetailReturnService } from '../../../cards/services/card-detail-return.service';
import { OwnedCardsService } from '../../../collection/services/owned-cards.service';
import { WishlistItem } from '../../models/wishlist-item';
import { WishlistService } from '../../services/wishlist.service';

/**
 * Private Wishlist / acquisition record.
 *
 * Every row represents one exact physical CardPrinting that the authenticated
 * collector still wants. A Printing can be both owned and wanted at the same
 * time; ownership is shown only as a quiet secondary reference.
 */
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    RouterLink,
    CardArtworkDirective
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist implements OnInit {
  readonly isLoading = signal(true);
  readonly loadError = signal(false);
  readonly searchQuery = signal('');
  readonly setFilter = signal('');
  readonly currentPage = signal(1);
  readonly pageSize = 10;
  readonly busyRecordIds = signal<ReadonlySet<number>>(new Set<number>());

  readonly setOptions = computed(() => {
    const options = this.wishlistService
      .items()
      .map(item => item.setName?.trim() ?? '')
      .filter(value => this.hasMeaningfulValue(value));

    return [...new Set(options)].sort((a, b) => a.localeCompare(b));
  });

  readonly filteredItems = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const set = this.setFilter();

    return this.wishlistService.items().filter(item => {
      const matchesSearch = !query || [
        item.cardName,
        item.cardNumber,
        item.setName,
        item.rarity
      ]
        .filter((value): value is string => Boolean(value))
        .some(value => value.toLowerCase().includes(query));

      const matchesSet = !set || (item.setName?.trim() ?? '') === set;

      return matchesSearch && matchesSet;
    });
  });

  readonly totalPages = computed(
    () => Math.ceil(this.filteredItems().length / this.pageSize)
  );

  readonly activePage = computed(() => {
    const totalPages = this.totalPages();

    if (totalPages <= 0) {
      return 1;
    }

    return Math.min(Math.max(this.currentPage(), 1), totalPages);
  });

  readonly pagedItems = computed(() => {
    const startIndex = (this.activePage() - 1) * this.pageSize;

    return this.filteredItems().slice(
      startIndex,
      startIndex + this.pageSize
    );
  });

  readonly visiblePageNumbers = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = this.activePage();
    const maximumVisiblePages = 5;

    if (totalPages <= maximumVisiblePages) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(
      totalPages,
      startPage + maximumVisiblePages - 1
    );

    if (endPage - startPage + 1 < maximumVisiblePages) {
      startPage = Math.max(
        1,
        endPage - maximumVisiblePages + 1
      );
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  });

  readonly firstVisibleRecord = computed(
    () => this.filteredItems().length === 0
      ? 0
      : (this.activePage() - 1) * this.pageSize + 1
  );

  readonly lastVisibleRecord = computed(
    () => Math.min(
      this.activePage() * this.pageSize,
      this.filteredItems().length
    )
  );

  readonly hasFilters = computed(
    () => Boolean(this.searchQuery().trim() || this.setFilter())
  );

  readonly ownedQuantityByPrinting = computed(() => {
    const quantities = new Map<number, number>();

    for (const item of this.ownedCardsService.items()) {
      quantities.set(item.cardPrintingId, item.quantityOwned);
    }

    return quantities;
  });

  constructor(
    readonly wishlistService: WishlistService,
    private readonly ownedCardsService: OwnedCardsService,
    private readonly feedback: FeedbackService,
    private readonly cardDetailReturnService: CardDetailReturnService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    const requestedPage = Number(queryParams.get('page'));

    this.searchQuery.set(queryParams.get('q') ?? '');
    this.setFilter.set(queryParams.get('set') ?? '');
    this.currentPage.set(
      Number.isInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1
    );

    this.loadWishlist();
  }

  retry(): void {
    this.loadWishlist(true);
  }

  rememberCardDetailReturn(): void {
    this.cardDetailReturnService.save(
      'wishlist',
      this.router.url
    );
  }

  updateSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.resetToFirstPage();
    this.syncUrlState();
  }

  updateSetFilter(event: Event): void {
    this.setFilter.set((event.target as HTMLSelectElement).value);
    this.resetToFirstPage();
    this.syncUrlState();
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.setFilter.set('');
    this.resetToFirstPage();
    this.syncUrlState();
  }

  previousPage(): void {
    this.goToPage(this.activePage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.activePage() + 1);
  }

  goToPage(page: number): void {
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      page > this.totalPages() ||
      page === this.activePage()
    ) {
      return;
    }

    this.currentPage.set(page);
    this.syncUrlState();

    queueMicrotask(() => {
      this.viewportScroller.scrollToAnchor('wishlist-records');
    });
  }

  increaseQuantity(item: WishlistItem): void {
    if (item.wantedQuantity >= 999 || this.isRecordBusy(item.id)) {
      return;
    }

    this.updateQuantity(item, item.wantedQuantity + 1);
  }

  decreaseQuantity(item: WishlistItem): void {
    // Quantity one is never converted into removal implicitly. The explicit
    // removal action keeps the collector's destructive intent unambiguous.
    if (item.wantedQuantity <= 1 || this.isRecordBusy(item.id)) {
      return;
    }

    this.updateQuantity(item, item.wantedQuantity - 1);
  }

  removeFromWishlist(item: WishlistItem): void {
    if (this.isRecordBusy(item.id)) {
      return;
    }

    this.setRecordBusy(item.id, true);

    this.wishlistService
      .remove(item)
      .pipe(
        finalize(() => this.setRecordBusy(item.id, false))
      )
      .subscribe({
        next: () => {
          this.ensureCurrentPageInRange();
          this.feedback.showStatus('Removed from Wishlist.');
        },
        error: error => this.handleMutationError(error)
      });
  }

  ownedQuantity(item: WishlistItem): number | null {
    return this.ownedQuantityByPrinting().get(item.cardPrintingId) ?? null;
  }

  isRecordBusy(id: number): boolean {
    return this.busyRecordIds().has(id);
  }

  hasMeaningfulValue(value: string | null | undefined): boolean {
    if (!value?.trim()) {
      return false;
    }

    return ![
      'unknown',
      'n/a',
      'null',
      'none',
      '-',
      '—'
    ].includes(value.trim().toLowerCase());
  }

  private loadWishlist(forceRefresh = false): void {
    this.isLoading.set(true);
    this.loadError.set(false);

    forkJoin({
      wishlist: this.wishlistService.load(forceRefresh),
      owned: this.ownedCardsService.load(forceRefresh).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return throwError(() => error);
          }

          // OWNED crossover is useful secondary context, but a non-auth
          // Collection failure must not make the primary Wishlist unusable.
          return of([]);
        })
      )
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.ensureCurrentPageInRange();
      },
      error: error => {
        this.isLoading.set(false);

        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.sendToLoginAfterSessionEnded();
          return;
        }

        this.loadError.set(true);
      }
    });
  }

  private updateQuantity(item: WishlistItem, wantedQuantity: number): void {
    this.setRecordBusy(item.id, true);

    this.wishlistService
      .updateQuantity(item, wantedQuantity)
      .pipe(
        finalize(() => this.setRecordBusy(item.id, false))
      )
      .subscribe({
        next: () => this.feedback.showStatus('Wishlist updated.'),
        error: error => this.handleMutationError(error)
      });
  }

  private setRecordBusy(id: number, isBusy: boolean): void {
    this.busyRecordIds.update(current => {
      const next = new Set(current);

      if (isBusy) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  }

  private handleMutationError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.sendToLoginAfterSessionEnded();
        return;
      }

      if (error.status === 403) {
        this.feedback.showError('This action is not available for your account.');
        return;
      }

      if (error.status === 404) {
        this.feedback.showError(
          'That Wishlist record is no longer available. Refreshing your Wishlist.'
        );
        this.loadWishlist(true);
        return;
      }

      if (error.status === 429) {
        this.feedback.showError('Too many requests. Try again shortly.');
        return;
      }

      if (error.status === 400) {
        this.feedback.showError(
          'We could not save that Wishlist change. Check the record and try again.'
        );
        return;
      }
    }

    this.feedback.showError('We could not update your Wishlist. Try again.');
  }

  private sendToLoginAfterSessionEnded(): void {
    this.feedback.showError('Your session ended. Sign in to continue.');

    void this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.currentWishlistUrl()
      }
    });
  }

  private resetToFirstPage(): void {
    this.currentPage.set(1);
  }

  private ensureCurrentPageInRange(): void {
    const totalPages = this.totalPages();
    const maximumPage = Math.max(totalPages, 1);

    if (this.currentPage() > maximumPage) {
      this.currentPage.set(maximumPage);
      this.syncUrlState();
    }
  }

  private syncUrlState(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.searchQuery().trim() || null,
        set: this.setFilter() || null,
        page: this.currentPage() > 1
          ? this.currentPage()
          : null
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  private currentWishlistUrl(): string {
    return this.router.serializeUrl(
      this.router.createUrlTree(['/wishlist'], {
        queryParams: {
          q: this.searchQuery().trim() || null,
          set: this.setFilter() || null,
          page: this.currentPage() > 1
            ? this.currentPage()
            : null
        }
      })
    );
  }
}

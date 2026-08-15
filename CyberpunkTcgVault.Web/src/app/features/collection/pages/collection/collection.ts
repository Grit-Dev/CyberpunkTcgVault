import { ViewportScroller } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  OnInit,
  signal
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { finalize } from 'rxjs';

import { FeedbackService } from '../../../../core/feedback/feedback.service';
import { CardArtworkDirective } from '../../../cards/directives/card-artwork.directive';
import { OwnedCard } from '../../models/owned-card';
import { OwnedCardsService } from '../../services/owned-cards.service';

interface ValidationProblemDetails {
  errors?: Record<string, string[]>;
}

/**
 * Private Collection / Working Archive.
 *
 * One row represents one exact CardPrinting owned by the authenticated
 * collector. Quantity and collector metadata belong to that OwnedCard record;
 * the shared Card/CardPrinting catalogue is never mutated here.
 */
@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CardArtworkDirective
  ],
  templateUrl: './collection.html',
  styleUrl: './collection.scss'
})
export class Collection implements OnInit {
  readonly isLoading = signal(true);
  readonly loadError = signal(false);
  readonly searchQuery = signal('');
  readonly setFilter = signal('');
  readonly currentPage = signal(1);
  readonly pageSize = 10;
  readonly editingRecordId = signal<number | null>(null);
  readonly isSavingRecord = signal(false);
  readonly busyRecordIds = signal<ReadonlySet<number>>(new Set<number>());
  readonly saveError = signal<string | null>(null);
  readonly conditionServerError = signal<string | null>(null);
  readonly notesServerError = signal<string | null>(null);

  readonly recordForm;

  readonly setOptions = computed(() => {
    const options = this.ownedCardsService
      .items()
      .map(item => item.setName?.trim() ?? '')
      .filter(value => this.hasMeaningfulValue(value));

    return [...new Set(options)].sort((a, b) => a.localeCompare(b));
  });

  readonly filteredItems = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const set = this.setFilter();

    return this.ownedCardsService.items().filter(item => {
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

  constructor(
    private readonly formBuilder: FormBuilder,
    readonly ownedCardsService: OwnedCardsService,
    private readonly feedback: FeedbackService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly viewportScroller: ViewportScroller
  ) {
    this.recordForm = this.formBuilder.nonNullable.group({
      condition: [
        '',
        [Validators.maxLength(50)]
      ],
      isInMasterCollection: [false],
      isDuplicate: [false],
      isGradingCandidate: [false],
      isOpenForTrade: [false],
      isOpenToMessages: [false],
      maySellLater: [false],
      notes: [
        '',
        [Validators.maxLength(2000)]
      ]
    });
  }

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

    this.loadCollection();
  }

  retry(): void {
    this.loadCollection(true);
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
    this.cancelEdit();
    this.syncUrlState();

    queueMicrotask(() => {
      this.viewportScroller.scrollToAnchor('collection-records');
    });
  }

  increaseQuantity(item: OwnedCard): void {
    if (item.quantityOwned >= 999 || this.isRecordBusy(item.id)) {
      return;
    }

    this.updateQuantity(item, item.quantityOwned + 1);
  }

  decreaseQuantity(item: OwnedCard): void {
    // Quantity one is never converted into deletion implicitly. The explicit
    // removal action keeps destructive intent clear.
    if (item.quantityOwned <= 1 || this.isRecordBusy(item.id)) {
      return;
    }

    this.updateQuantity(item, item.quantityOwned - 1);
  }

  removeFromCollection(item: OwnedCard): void {
    if (this.isRecordBusy(item.id)) {
      return;
    }

    this.setRecordBusy(item.id, true);

    this.ownedCardsService
      .remove(item)
      .pipe(
        finalize(() => this.setRecordBusy(item.id, false))
      )
      .subscribe({
        next: () => {
          if (this.editingRecordId() === item.id) {
            this.cancelEdit();
          }

          this.ensureCurrentPageInRange();
          this.feedback.showStatus('Removed from Collection.');
        },
        error: error => this.handleMutationError(error)
      });
  }

  beginEdit(item: OwnedCard): void {
    if (this.isSavingRecord() || this.isRecordBusy(item.id)) {
      return;
    }

    this.clearSaveErrors();
    this.editingRecordId.set(item.id);
    this.recordForm.reset({
      condition: item.condition ?? '',
      isInMasterCollection: item.isInMasterCollection,
      isDuplicate: item.isDuplicate,
      isGradingCandidate: item.isGradingCandidate,
      isOpenForTrade: item.isOpenForTrade,
      isOpenToMessages: item.isOpenToMessages,
      maySellLater: item.maySellLater,
      notes: item.notes ?? ''
    });
  }

  cancelEdit(): void {
    this.editingRecordId.set(null);
    this.clearSaveErrors();
    this.recordForm.reset();
  }

  saveEdit(item: OwnedCard): void {
    if (
      this.editingRecordId() !== item.id ||
      this.recordForm.invalid ||
      this.isSavingRecord() ||
      this.isRecordBusy(item.id)
    ) {
      this.recordForm.markAllAsTouched();
      return;
    }

    this.clearSaveErrors();
    const values = this.recordForm.getRawValue();

    this.isSavingRecord.set(true);
    this.setRecordBusy(item.id, true);

    /*
     * The backend UpdateOwnedCardRequest requires QuantityOwned to remain
     * between 1 and 999. Editing metadata must preserve the current quantity;
     * sending 0 causes ASP.NET Core model validation to return 400.
     */
    this.ownedCardsService
      .updateRecord(item, {
        quantityOwned: item.quantityOwned,
        condition: this.normaliseOptionalText(values.condition),
        isInMasterCollection: values.isInMasterCollection,
        isDuplicate: values.isDuplicate,
        isGradingCandidate: values.isGradingCandidate,
        isOpenForTrade: values.isOpenForTrade,
        isOpenToMessages: values.isOpenToMessages,
        maySellLater: values.maySellLater,
        notes: this.normaliseOptionalText(values.notes)
      })
      .pipe(
        finalize(() => {
          this.isSavingRecord.set(false);
          this.setRecordBusy(item.id, false);
        })
      )
      .subscribe({
        next: () => {
          this.editingRecordId.set(null);
          this.feedback.showStatus('RECORD SAVED');
        },
        error: error => this.handleSaveError(error)
      });
  }

  isRecordBusy(id: number): boolean {
    return this.busyRecordIds().has(id);
  }

  hasRecordDetails(item: OwnedCard): boolean {
    return Boolean(
      this.hasMeaningfulValue(item.condition) ||
      this.hasMeaningfulValue(item.notes) ||
      item.isInMasterCollection ||
      item.isDuplicate ||
      item.isGradingCandidate ||
      item.isOpenForTrade ||
      item.isOpenToMessages ||
      item.maySellLater
    );
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

  private loadCollection(forceRefresh = false): void {
    this.isLoading.set(true);
    this.loadError.set(false);

    this.ownedCardsService.load(forceRefresh).subscribe({
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

  private updateQuantity(item: OwnedCard, quantityOwned: number): void {
    this.setRecordBusy(item.id, true);

    this.ownedCardsService
      .updateQuantity(item, quantityOwned)
      .pipe(
        finalize(() => this.setRecordBusy(item.id, false))
      )
      .subscribe({
        next: () => this.feedback.showStatus('Collection updated.'),
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

  private handleSaveError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.sendToLoginAfterSessionEnded();
        return;
      }

      if (error.status === 403) {
        this.saveError.set('This record cannot be changed with the current account.');
        return;
      }

      if (error.status === 404) {
        this.saveError.set('This Collection record is no longer available.');
        return;
      }

      if (error.status === 429) {
        this.saveError.set('Too many requests. Try saving again shortly.');
        return;
      }

      if (error.status === 400) {
        this.applySafeValidationErrors(error.error);
        this.saveError.set(
          'We couldn\'t save this record. Check the details and try again.'
        );
        return;
      }
    }

    this.saveError.set(
      'We couldn\'t save this record. Check the details and try again.'
    );
  }

  private applySafeValidationErrors(errorBody: unknown): void {
    const details = errorBody as ValidationProblemDetails | null;
    const errors = details?.errors;

    if (!errors || typeof errors !== 'object') {
      return;
    }

    for (const key of Object.keys(errors)) {
      const normalisedKey = key.toLowerCase();

      if (normalisedKey === 'condition') {
        this.conditionServerError.set(
          'Condition must be 50 characters or fewer.'
        );
      }

      if (normalisedKey === 'notes') {
        this.notesServerError.set(
          'Notes must be 2,000 characters or fewer.'
        );
      }
    }
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
          'That collection record is no longer available. Refreshing your Collection.'
        );
        this.loadCollection(true);
        return;
      }

      if (error.status === 429) {
        this.feedback.showError('Too many requests. Try again shortly.');
        return;
      }

      if (error.status === 400) {
        this.feedback.showError(
          'We could not save that Collection change. Check the record and try again.'
        );
        return;
      }
    }

    this.feedback.showError('We could not update your Collection. Try again.');
  }

  private sendToLoginAfterSessionEnded(): void {
    this.feedback.showError('Your session ended. Sign in to continue.');

    void this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: '/collection'
      }
    });
  }

  private resetToFirstPage(): void {
    this.currentPage.set(1);
    this.cancelEdit();
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

  private clearSaveErrors(): void {
    this.saveError.set(null);
    this.conditionServerError.set(null);
    this.notesServerError.set(null);
  }

  private normaliseOptionalText(value: string): string | null {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
}

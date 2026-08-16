import { ViewportScroller } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { FeedbackService } from '../../../../core/feedback/feedback.service';
import { SealedArtworkStateDirective } from '../../directives/sealed-artwork-state.directive';
import {
  CollectionProduct,
  CreateCollectionProductRequest,
  UpdateCollectionProductRequest,
} from '../../models/collection-product';
import { CollectionProductsService } from '../../services/collection-products.service';

function optionalHttpUrlValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    const isHttpUrl = url.protocol === 'http:' || url.protocol === 'https:';

    return isHttpUrl && Boolean(url.hostname) ? null : { invalidArtworkUrl: true };
  } catch {
    return { invalidArtworkUrl: true };
  }
}

/** Private Sealed Products management surface. */
@Component({
  selector: 'app-sealed',
  standalone: true,
  imports: [ReactiveFormsModule, SealedArtworkStateDirective],
  templateUrl: './sealed.html',
  styleUrl: './sealed.scss',
})
export class Sealed implements OnInit {
  readonly isLoading = signal(true);
  readonly loadError = signal(false);
  readonly searchQuery = signal('');
  readonly currentPage = signal(1);
  readonly pageSize = 10;
  readonly isCreating = signal(false);
  readonly isSavingCreate = signal(false);
  readonly editingProductId = signal<number | null>(null);
  readonly isSavingEdit = signal(false);
  readonly formError = signal<string | null>(null);
  readonly busyProductIds = signal<ReadonlySet<number>>(new Set<number>());

  readonly createForm;
  readonly editForm;

  /** Only unopened records belong on this product surface. */
  readonly sealedItems = computed(() =>
    this.collectionProductsService.items().filter((item) => item.isSealed),
  );

  readonly filteredItems = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return this.sealedItems();
    }

    return this.sealedItems().filter((item) =>
      [item.productName, item.productType, item.edition]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLowerCase().includes(query)),
    );
  });

  readonly totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize));

  readonly activePage = computed(() => {
    const totalPages = this.totalPages();

    if (totalPages <= 0) {
      return 1;
    }

    return Math.min(Math.max(this.currentPage(), 1), totalPages);
  });

  readonly pagedItems = computed(() => {
    const start = (this.activePage() - 1) * this.pageSize;
    return this.filteredItems().slice(start, start + this.pageSize);
  });

  readonly visiblePageNumbers = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = this.activePage();
    const maximumVisiblePages = 5;

    if (totalPages <= maximumVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maximumVisiblePages - 1);

    if (endPage - startPage + 1 < maximumVisiblePages) {
      startPage = Math.max(1, endPage - maximumVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  });

  readonly firstVisibleRecord = computed(() =>
    this.filteredItems().length === 0 ? 0 : (this.activePage() - 1) * this.pageSize + 1,
  );

  readonly lastVisibleRecord = computed(() =>
    Math.min(this.activePage() * this.pageSize, this.filteredItems().length),
  );

  readonly hasFilters = computed(() => Boolean(this.searchQuery().trim()));
  readonly canCreateOrDelete = computed(() => !this.authService.isDemo());

  constructor(
    private readonly formBuilder: FormBuilder,
    readonly authService: AuthService,
    readonly collectionProductsService: CollectionProductsService,
    private readonly feedback: FeedbackService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly viewportScroller: ViewportScroller,
  ) {
    this.createForm = this.formBuilder.nonNullable.group({
      productName: ['', Validators.required],
      productType: [''],
      edition: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      imageUrl: ['', optionalHttpUrlValidator],
      storageLocation: [''],
      notes: [''],
    });

    this.editForm = this.formBuilder.nonNullable.group({
      productName: ['', Validators.required],
      productType: [''],
      edition: [''],
      imageUrl: ['', optionalHttpUrlValidator],
      storageLocation: [''],
      notes: [''],
    });
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    const requestedPage = Number(queryParams.get('page'));

    this.searchQuery.set(queryParams.get('q') ?? '');
    this.currentPage.set(Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1);

    this.loadProducts();
  }

  retry(): void {
    this.loadProducts(true);
  }

  updateSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.resetToFirstPage();
    this.syncUrlState();
  }

  clearFilters(): void {
    this.searchQuery.set('');
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
      this.viewportScroller.scrollToAnchor('sealed-records');
    });
  }

  openCreate(): void {
    if (!this.canCreateOrDelete() || this.isSavingCreate()) {
      return;
    }

    this.cancelEdit();
    this.formError.set(null);
    this.createForm.reset({
      productName: '',
      productType: '',
      edition: '',
      quantity: 1,
      imageUrl: '',
      storageLocation: '',
      notes: '',
    });
    this.isCreating.set(true);
  }

  cancelCreate(): void {
    this.isCreating.set(false);
    this.formError.set(null);
    this.createForm.reset({ quantity: 1 });
  }

  createProduct(): void {
    this.formError.set(null);
    this.createForm.markAllAsTouched();

    if (this.createForm.invalid || this.isSavingCreate() || !this.canCreateOrDelete()) {
      return;
    }

    const values = this.createForm.getRawValue();
    const request: CreateCollectionProductRequest = {
      productName: values.productName.trim(),
      productType: this.normaliseOptionalText(values.productType),
      edition: this.normaliseOptionalText(values.edition),
      quantity: values.quantity,
      isSealed: true,
      isBetaProduct: false,
      isKickstarterProduct: false,
      isRetailProduct: false,
      isPledgeItem: false,
      purchaseCost: null,
      shippingCost: null,
      vatCost: null,
      estimatedValue: null,
      minimumSellPrice: null,
      storageLocation: this.normaliseOptionalText(values.storageLocation),
      isLongTermHold: false,
      isOpenToTrade: false,
      maySellLater: false,
      imageUrl: this.normaliseOptionalText(values.imageUrl),
      notes: this.normaliseOptionalText(values.notes),
    };

    this.isSavingCreate.set(true);

    this.collectionProductsService
      .create(request)
      .pipe(finalize(() => this.isSavingCreate.set(false)))
      .subscribe({
        next: () => {
          this.isCreating.set(false);
          this.ensureCurrentPageInRange();
          this.feedback.showStatus('Sealed product added.');
        },
        error: (error) => this.handleFormMutationError(error),
      });
  }

  beginEdit(item: CollectionProduct): void {
    if (this.isProductBusy(item.id) || this.isSavingEdit()) {
      return;
    }

    this.isCreating.set(false);
    this.formError.set(null);
    this.editingProductId.set(item.id);
    this.editForm.reset({
      productName: item.productName,
      productType: item.productType ?? '',
      edition: item.edition ?? '',
      imageUrl: item.imageUrl ?? '',
      storageLocation: item.storageLocation ?? '',
      notes: item.notes ?? '',
    });
  }

  cancelEdit(): void {
    this.editingProductId.set(null);
    this.formError.set(null);
    this.editForm.reset();
  }

  saveEdit(item: CollectionProduct): void {
    this.formError.set(null);
    this.editForm.markAllAsTouched();

    if (
      this.editingProductId() !== item.id ||
      this.editForm.invalid ||
      this.isSavingEdit() ||
      this.isProductBusy(item.id)
    ) {
      return;
    }

    const values = this.editForm.getRawValue();
    const request: UpdateCollectionProductRequest = {
      ...this.toUpdateRequest(item),
      productName: values.productName.trim(),
      productType: this.normaliseOptionalText(values.productType),
      edition: this.normaliseOptionalText(values.edition),
      imageUrl: this.normaliseOptionalText(values.imageUrl),
      storageLocation: this.normaliseOptionalText(values.storageLocation),
      notes: this.normaliseOptionalText(values.notes),
    };

    this.isSavingEdit.set(true);
    this.setProductBusy(item.id, true);

    this.collectionProductsService
      .update(item, request)
      .pipe(
        finalize(() => {
          this.isSavingEdit.set(false);
          this.setProductBusy(item.id, false);
        }),
      )
      .subscribe({
        next: () => {
          this.editingProductId.set(null);
          this.feedback.showStatus('Sealed record saved.');
        },
        error: (error) => this.handleFormMutationError(error),
      });
  }

  increaseQuantity(item: CollectionProduct): void {
    if (this.isProductBusy(item.id)) {
      return;
    }

    this.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CollectionProduct): void {
    if (item.quantity <= 1 || this.isProductBusy(item.id)) {
      return;
    }

    this.updateQuantity(item, item.quantity - 1);
  }

  removeProduct(item: CollectionProduct): void {
    if (!this.canCreateOrDelete() || this.isProductBusy(item.id)) {
      return;
    }

    this.setProductBusy(item.id, true);

    this.collectionProductsService
      .remove(item)
      .pipe(finalize(() => this.setProductBusy(item.id, false)))
      .subscribe({
        next: () => {
          if (this.editingProductId() === item.id) {
            this.cancelEdit();
          }
          this.ensureCurrentPageInRange();
          this.feedback.showStatus('Sealed product removed.');
        },
        error: (error) => this.handleMutationError(error),
      });
  }

  isProductBusy(id: number): boolean {
    return this.busyProductIds().has(id);
  }

  imageUrl(item: CollectionProduct): string | null {
    return this.collectionProductsService.getImageUrl(item.imageUrl);
  }

  hasMeaningfulValue(value: string | null | undefined): boolean {
    const normalised = value?.trim().toLowerCase();
    return Boolean(normalised && normalised !== 'unknown');
  }

  private loadProducts(forceRefresh = false): void {
    this.isLoading.set(true);
    this.loadError.set(false);

    this.collectionProductsService
      .load(forceRefresh)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => this.ensureCurrentPageInRange(),
        error: (error) => {
          this.loadError.set(true);
          this.handleSessionError(error);
        },
      });
  }

  private updateQuantity(item: CollectionProduct, quantity: number): void {
    this.setProductBusy(item.id, true);

    this.collectionProductsService
      .updateQuantity(item, quantity)
      .pipe(finalize(() => this.setProductBusy(item.id, false)))
      .subscribe({
        next: () => this.feedback.showStatus('Sealed quantity updated.'),
        error: (error) => this.handleMutationError(error),
      });
  }

  private handleMutationError(error: unknown): void {
    if (this.handleSessionError(error)) {
      return;
    }

    if (error instanceof HttpErrorResponse && error.status === 403) {
      this.feedback.showError('This sealed-product action is not available for this account.');
      return;
    }

    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.feedback.showError('That sealed record is no longer available.');
      this.loadProducts(true);
      return;
    }

    if (error instanceof HttpErrorResponse && error.status === 429) {
      this.feedback.showError('Too many changes at once. Try again shortly.');
      return;
    }

    this.feedback.showError("We couldn't update your sealed products. Try again.");
  }

  private handleFormMutationError(error: unknown): void {
    if (this.handleSessionError(error)) {
      return;
    }

    if (error instanceof HttpErrorResponse && error.status === 403) {
      this.formError.set('This sealed-product action is not available for this account.');
      return;
    }

    if (error instanceof HttpErrorResponse && error.status === 400) {
      this.formError.set('Check the product details and try again.');
      return;
    }

    if (error instanceof HttpErrorResponse && error.status === 429) {
      this.formError.set('Too many changes at once. Try again shortly.');
      return;
    }

    this.formError.set("We couldn't save this sealed product. Try again.");
  }

  private handleSessionError(error: unknown): boolean {
    if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
      return false;
    }

    this.feedback.showError('Your session ended. Sign in to continue.');
    void this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
    return true;
  }

  private setProductBusy(id: number, busy: boolean): void {
    this.busyProductIds.update((current) => {
      const next = new Set(current);
      busy ? next.add(id) : next.delete(id);
      return next;
    });
  }

  private resetToFirstPage(): void {
    this.currentPage.set(1);
    this.cancelEdit();
  }

  private ensureCurrentPageInRange(): void {
    const totalPages = this.totalPages();
    const nextPage = totalPages <= 0 ? 1 : Math.min(this.currentPage(), totalPages);

    if (nextPage !== this.currentPage()) {
      this.currentPage.set(nextPage);
      this.syncUrlState();
    }
  }

  private syncUrlState(): void {
    const queryParams: Record<string, string | number | null> = {
      q: this.searchQuery().trim() || null,
      page: this.activePage() > 1 ? this.activePage() : null,
    };

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true,
    });
  }

  private normaliseOptionalText(value: string): string | null {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
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

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardArtworkDirective } from '../../directives/card-artwork.directive';
import { CardFilters } from '../../models/card-filters';
import { Card } from '../../models/card';
import { CardCatalogueStateService } from '../../services/card-catalogue-state.service';
import { CardsService } from '../../services/cards.service';

/**
 * Public Vault Archive for browsing Choom Vault cards.
 *
 * The homepage remains the curated discovery surface while this page owns
 * the searchable, filterable and paginated card-browsing experience.
 */
@Component({
  selector: 'app-card-catalogue',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CardArtworkDirective
  ],
  templateUrl: './card-catalogue.html',
  styleUrl: './card-catalogue.scss'
})
export class CardCatalogue implements OnInit, OnDestroy {
  // Cards displayed on the current Archive page.
  cards: Card[] = [];

  // Complete result returned for the current API filters.
  // This can be removed when pagination moves fully to the backend.
  private matchingCards: Card[] = [];

  // Current search and filter state.
  filters: CardFilters = this.createEmptyFilters();

  // Stable filter options captured from the initial full Archive response.
  rarityOptions: string[] = [];
  classificationOptions: string[] = [];
  cardTypeOptions: string[] = [];

  // Pagination state.
  currentPage = 1;
  readonly pageSize = 24;
  totalCount = 0;
  totalPages = 0;

  // Request state.
  isLoading = true;
  errorMessage = '';

  // Prevents an API request for every individual search keystroke.
  private searchDebounceTimer:
    ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly cardsService: CardsService,
    private readonly catalogueStateService: CardCatalogueStateService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const restoredState =
      this.catalogueStateService.consume();

    if (restoredState) {
      this.filters = restoredState.filters;
      this.currentPage = restoredState.currentPage;
      this.rarityOptions = restoredState.rarityOptions;
      this.classificationOptions =
        restoredState.classificationOptions;
      this.cardTypeOptions =
        restoredState.cardTypeOptions;
    }

    const shouldCaptureFilterOptions =
      this.rarityOptions.length === 0 &&
      this.classificationOptions.length === 0 &&
      this.cardTypeOptions.length === 0;

    this.loadCards(shouldCaptureFilterOptions);
  }

  ngOnDestroy(): void {
    this.clearSearchDebounce();
  }

  /**
   * Returns a small window of page numbers around the current page.
   *
   * This prevents hundreds of pagination controls being rendered
   * if the Archive eventually contains a much larger card library.
   */
  get visiblePageNumbers(): number[] {
    const maximumVisiblePages = 5;

    if (this.totalPages <= maximumVisiblePages) {
      return Array.from(
        { length: this.totalPages },
        (_, index) => index + 1
      );
    }

    let startPage = Math.max(
      1,
      this.currentPage - 2
    );

    const endPage = Math.min(
      this.totalPages,
      startPage + maximumVisiblePages - 1
    );

    if (
      endPage - startPage + 1 <
      maximumVisiblePages
    ) {
      startPage = Math.max(
        1,
        endPage - maximumVisiblePages + 1
      );
    }

    return Array.from(
      {
        length: endPage - startPage + 1
      },
      (_, index) => startPage + index
    );
  }

  /**
   * Indicates whether the card-name search contains a value.
   */
  get hasSearchQuery(): boolean {
    return Boolean(
      this.filters.name?.trim()
    );
  }

  /**
   * Indicates whether any Archive search or filter is active.
   */
  get hasActiveFilters(): boolean {
    return Boolean(
      this.filters.name?.trim() ||
      this.filters.rarity?.trim() ||
      this.filters.classification?.trim() ||
      this.filters.cardType?.trim()
    );
  }

  /**
   * Returns true when metadata contains a useful collector-facing value.
   *
   * Placeholder values stored in seed data are deliberately hidden.
   */
  hasMeaningfulValue(
    value: string | null | undefined
  ): boolean {
    if (!value?.trim()) {
      return false;
    }

    const normalisedValue =
      value.trim().toLowerCase();

    const placeholderValues = [
      'unknown',
      'n/a',
      'null',
      'none',
      '-',
      '—'
    ];

    return !placeholderValues.includes(
      normalisedValue
    );
  }

  /**
   * Runs when the user types into the card-name search.
   *
   * The API request waits briefly until the user stops typing.
   */
  onSearchChange(value: string): void {
    this.filters = {
      ...this.filters,
      name: value
    };

    this.currentPage = 1;

    this.clearSearchDebounce();

    this.searchDebounceTimer = setTimeout(
      () => {
        this.searchDebounceTimer = null;

        this.loadCards();
      },
      300
    );
  }

  /**
   * Applies a dropdown filter immediately.
   */
  onFilterChange(
    filter: keyof CardFilters,
    value: string
  ): void {
    this.filters = {
      ...this.filters,
      [filter]: value
    };

    this.currentPage = 1;

    this.clearSearchDebounce();

    this.loadCards();
  }

  /**
   * Allows Enter or the Search button to run
   * the current search immediately.
   */
  applyFilters(): void {
    this.clearSearchDebounce();

    this.currentPage = 1;

    this.loadCards();
  }

  /**
   * Clears only the card-name search.
   *
   * Secondary filters remain active.
   */
  clearSearch(): void {
    if (!this.hasSearchQuery) {
      return;
    }

    this.clearSearchDebounce();

    this.filters = {
      ...this.filters,
      name: ''
    };

    this.currentPage = 1;

    this.loadCards();
  }

  /**
   * Clears every search/filter value and restores page one.
   */
  clearFilters(): void {
    this.clearSearchDebounce();

    this.filters =
      this.createEmptyFilters();

    this.currentPage = 1;

    this.loadCards();
  }

  /**
   * Retries the current Archive request after an error.
   *
   * If the initial request failed, filter options are captured
   * when the retry succeeds.
   */
  retryLoad(): void {
    const shouldCaptureFilterOptions =
      this.rarityOptions.length === 0 &&
      this.classificationOptions.length === 0 &&
      this.cardTypeOptions.length === 0;

    this.loadCards(
      shouldCaptureFilterOptions
    );
  }

  /**
   * Remembers the exact Archive view before opening Card Detail.
   *
   * Returning through the Card Detail back link restores the current page,
   * search and filters instead of rebuilding the Archive at page one.
   */
  rememberArchiveState(): void {
    this.catalogueStateService.save({
      filters: { ...this.filters },
      currentPage: this.currentPage,
      rarityOptions: [...this.rarityOptions],
      classificationOptions: [
        ...this.classificationOptions
      ],
      cardTypeOptions: [...this.cardTypeOptions]
    });
  }

  /**
   * Moves directly to an Archive page.
   */
  goToPage(page: number): void {
    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.currentPage = page;

    this.applyCurrentPage();
  }

  /**
   * Moves backwards one Archive page.
   */
  previousPage(): void {
    this.goToPage(
      this.currentPage - 1
    );
  }

  /**
   * Moves forwards one Archive page.
   */
  nextPage(): void {
    this.goToPage(
      this.currentPage + 1
    );
  }

  /**
   * Requests cards from the API using the current filters.
   *
   * The API currently returns the complete matching result.
   * Angular displays the current 24-card page from that result.
   *
   * When server-side pagination is introduced, this method can consume
   * the paged response without redesigning the Archive UI.
   */
  private loadCards(
    captureFilterOptions = false
  ): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.cardsService
      .getCards(this.filters)
      .subscribe({
        next: cards => {
          this.matchingCards = cards;

          this.totalCount =
            this.matchingCards.length;

          this.totalPages =
            Math.ceil(
              this.totalCount /
              this.pageSize
            );

          if (this.totalPages === 0) {
            this.currentPage = 1;
          } else if (
            this.currentPage >
            this.totalPages
          ) {
            this.currentPage =
              this.totalPages;
          }

          if (captureFilterOptions) {
            this.captureFilterOptions(
              cards
            );
          }

          this.applyCurrentPage();

          this.isLoading = false;

          this.changeDetectorRef
            .markForCheck();
        },

        error: () => {
          this.cards = [];
          this.matchingCards = [];

          this.totalCount = 0;
          this.totalPages = 0;
          this.currentPage = 1;

          this.errorMessage =
            'The Vault Archive could not be loaded.';

          this.isLoading = false;

          this.changeDetectorRef
            .markForCheck();
        }
      });
  }

  /**
   * Selects only the cards belonging to the current page.
   *
   * This stays isolated so it can be removed when the API
   * becomes responsible for Skip/Take pagination.
   */
  private applyCurrentPage(): void {
    const startIndex =
      (this.currentPage - 1) *
      this.pageSize;

    const endIndex =
      startIndex +
      this.pageSize;

    this.cards =
      this.matchingCards.slice(
        startIndex,
        endIndex
      );

    this.changeDetectorRef
      .markForCheck();
  }

  /**
   * Builds stable filters from the complete initial Archive response.
   */
  private captureFilterOptions(
    cards: Card[]
  ): void {
    this.rarityOptions =
      this.uniqueValues(
        cards.map(
          card => card.rarity
        )
      );

    this.classificationOptions =
      this.uniqueValues(
        cards.map(
          card => card.classification
        )
      );

    this.cardTypeOptions =
      this.uniqueValues(
        cards.map(
          card => card.cardType
        )
      );
  }

  /**
   * Removes placeholder values and duplicates before
   * sorting filter options alphabetically.
   */
  private uniqueValues(
    values: Array<string | null | undefined>
  ): string[] {
    const meaningfulValues =
      values
        .map(
          value => value?.trim()
        )
        .filter(
          (value): value is string =>
            this.hasMeaningfulValue(value)
        );

    return [
      ...new Set(meaningfulValues)
    ].sort(
      (left, right) =>
        left.localeCompare(right)
    );
  }

  /**
   * Cancels a pending automatic name search.
   */
  private clearSearchDebounce(): void {
    if (
      this.searchDebounceTimer === null
    ) {
      return;
    }

    clearTimeout(
      this.searchDebounceTimer
    );

    this.searchDebounceTimer = null;
  }

  /**
   * Creates the default empty Archive filter state.
   */
  private createEmptyFilters(): CardFilters {
    return {
      name: '',
      rarity: '',
      classification: '',
      cardType: ''
    };
  }
}
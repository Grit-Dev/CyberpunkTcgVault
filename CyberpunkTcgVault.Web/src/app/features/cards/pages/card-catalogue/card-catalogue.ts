import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardArtworkDirective } from '../../directives/card-artwork.directive';
import { CardFilters } from '../../models/card-filters';
import { Card } from '../../models/card';
import { CardsService } from '../../services/cards.service';

/**
 * Functional public card catalogue.
 *
 * The homepage remains the curated discovery surface while this page owns
 * the searchable, filterable and paginated catalogue experience.
 */
@Component({
  selector: 'app-card-catalogue',
  standalone: true,
  imports: [
    FormsModule,
    CardArtworkDirective
  ],
  templateUrl: './card-catalogue.html',
  styleUrl: './card-catalogue.scss'
})
export class CardCatalogue implements OnInit, OnDestroy {

  // Cards displayed on the current catalogue page.
  cards: Card[] = [];

  // All cards returned for the current API filters.
  // This will be removed once pagination moves fully to the backend.
  private matchingCards: Card[] = [];

  // Values currently entered or selected by the user.
  filters: CardFilters = this.createEmptyFilters();

  // Filter options captured from the initial full catalogue response.
  rarityOptions: string[] = [];
  classificationOptions: string[] = [];
  cardTypeOptions: string[] = [];

  // Pagination state.
  currentPage = 1;
  readonly pageSize = 24;
  totalCount = 0;
  totalPages = 0;

  isLoading = true;
  errorMessage = '';

  // Prevents an API request being made for every individual keystroke.
  private searchDebounceTimer:
    ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly cardsService: CardsService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCards(true);
  }

  ngOnDestroy(): void {
    this.clearSearchDebounce();
  }

  /**
   * Returns a small window of page numbers around the current page.
   *
   * This prevents the Catalogue from eventually rendering hundreds
   * of pagination buttons when the card database becomes much larger.
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

    let endPage = Math.min(
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
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }

  /**
   * Indicates whether any catalogue filter is currently active.
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
   * Runs when the user types into the card-name search.
   *
   * The API request waits briefly until the user has stopped typing.
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
   * Allows Enter or the Search Catalogue button
   * to run the current search immediately.
   */
  applyFilters(): void {
    this.clearSearchDebounce();

    this.currentPage = 1;

    this.loadCards();
  }

  /**
   * Clears all filters and restores the first page.
   */
  clearFilters(): void {
    this.clearSearchDebounce();

    this.filters = this.createEmptyFilters();
    this.currentPage = 1;

    this.loadCards();
  }

  /**
   * Moves directly to a catalogue page.
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
   * Moves backwards one catalogue page.
   */
  previousPage(): void {
    this.goToPage(
      this.currentPage - 1
    );
  }

  /**
   * Moves forwards one catalogue page.
   */
  nextPage(): void {
    this.goToPage(
      this.currentPage + 1
    );
  }

  /**
   * Requests cards from the API using the current filters.
   *
   * For now the API returns the complete matching result.
   * Angular then displays only the current 24-card page.
   *
   * When server-side pagination is introduced, this method will
   * consume the paged API response instead of slicing locally.
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
              this.totalCount / this.pageSize
            );

          if (this.totalPages === 0) {
            this.currentPage = 1;
          } else if (
            this.currentPage > this.totalPages
          ) {
            this.currentPage = this.totalPages;
          }

          if (captureFilterOptions) {
            this.captureFilterOptions(cards);
          }

          this.applyCurrentPage();

          this.isLoading = false;

          this.changeDetectorRef.markForCheck();
        },

        error: () => {
          this.cards = [];
          this.matchingCards = [];

          this.totalCount = 0;
          this.totalPages = 0;
          this.currentPage = 1;

          this.errorMessage =
            'The card catalogue could not be loaded. Try again in a moment.';

          this.isLoading = false;

          this.changeDetectorRef.markForCheck();
        }
      });
  }

  /**
   * Selects only the cards belonging to the current page.
   *
   * This is intentionally isolated so it can be removed easily
   * when the backend becomes responsible for Skip/Take paging.
   */
  private applyCurrentPage(): void {
    const startIndex =
      (this.currentPage - 1) *
      this.pageSize;

    const endIndex =
      startIndex + this.pageSize;

    this.cards =
      this.matchingCards.slice(
        startIndex,
        endIndex
      );

    this.changeDetectorRef.markForCheck();
  }

  /**
   * Builds stable filter options from the complete initial catalogue.
   */
  private captureFilterOptions(
    cards: Card[]
  ): void {
    this.rarityOptions =
      this.uniqueValues(
        cards.map(card => card.rarity)
      );

    this.classificationOptions =
      this.uniqueValues(
        cards.map(card => card.classification)
      );

    this.cardTypeOptions =
      this.uniqueValues(
        cards.map(card => card.cardType)
      );
  }

  /**
   * Removes empty and Unknown values, removes duplicates,
   * and sorts the remaining values alphabetically.
   */
  private uniqueValues(
    values: Array<string | null | undefined>
  ): string[] {
    const meaningfulValues = values
      .map(value => value?.trim())
      .filter(
        (value): value is string =>
          value !== undefined &&
          value.length > 0 &&
          value.toLowerCase() !== 'unknown'
      );

    return [...new Set(meaningfulValues)]
      .sort(
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
   * Creates the default empty catalogue filter state.
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
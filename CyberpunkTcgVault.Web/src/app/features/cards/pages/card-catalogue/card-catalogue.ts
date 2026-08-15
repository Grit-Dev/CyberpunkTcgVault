import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterLink
} from '@angular/router';
import { Subscription } from 'rxjs';

import { CardArtworkDirective } from '../../directives/card-artwork.directive';
import {
  CardFilterOptions,
  CardSetFilterOption
} from '../../models/card-filter-options';
import {
  CardFilterKey,
  CardFilters,
  CardSortBy,
  CardSortDirection
} from '../../models/card-filters';
import { Card } from '../../models/card';
import { CardCatalogueStateService } from '../../services/card-catalogue-state.service';
import { CardDetailReturnService } from '../../services/card-detail-return.service';
import { CardsService } from '../../services/cards.service';

interface ActiveArchiveFilter {
  key: CardFilterKey;
  label: string;
  value: string;
}

type ArchiveSortValue =
  'setOrder-asc' |
  'name-asc' |
  'name-desc';

/**
 * Public Vault Archive for fast, artwork-first card discovery.
 *
 * Angular owns presentation and URL state. The Cards API remains authoritative
 * for supported filter values, combined filtering, sorting and pagination.
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
  cards: Card[] = [];
  filters: CardFilters = this.createEmptyFilters();
  filterOptions: CardFilterOptions =
    this.createEmptyFilterOptions();

  currentPage = 1;
  readonly pageSize = 24;
  totalCount = 0;
  totalPages = 0;

  isLoading = true;
  isRefreshing = false;
  hasLoadedOnce = false;
  isFilterOptionsLoading = true;
  filterOptionsUnavailable = false;
  errorMessage = '';
  filtersExpanded = false;

  private searchDebounceTimer:
    ReturnType<typeof setTimeout> | null = null;
  private cardRequest?: Subscription;
  private filterOptionsRequest?: Subscription;

  constructor(
    private readonly cardsService: CardsService,
    private readonly catalogueStateService: CardCatalogueStateService,
    private readonly cardDetailReturnService: CardDetailReturnService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const queryParams =
      this.route.snapshot.queryParamMap;
    const restoredState =
      this.catalogueStateService.consume();

    if (this.hasArchiveQueryState(queryParams)) {
      this.filters =
        this.readFiltersFromQuery(queryParams);
      this.currentPage =
        this.readPositiveInteger(
          queryParams.get('page')
        ) ?? 1;
    } else if (restoredState) {
      this.filters = restoredState.filters;
      this.currentPage = restoredState.currentPage;
      this.syncUrlState();
    }

    this.loadFilterOptions();
    this.loadCards();
  }

  ngOnDestroy(): void {
    this.clearSearchDebounce();
    this.cardRequest?.unsubscribe();
    this.filterOptionsRequest?.unsubscribe();
  }

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
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }

  get hasSearchQuery(): boolean {
    return Boolean(
      this.filters.name?.trim()
    );
  }

  get activeFilters(): ActiveArchiveFilter[] {
    const activeFilters: ActiveArchiveFilter[] = [];

    this.addStringFilter(
      activeFilters,
      'setCode',
      'Set',
      this.filters.setCode,
      this.getSetLabel(this.filters.setCode)
    );
    this.addStringFilter(
      activeFilters,
      'cardType',
      'Type',
      this.filters.cardType
    );
    this.addStringFilter(
      activeFilters,
      'rarity',
      'Rarity',
      this.filters.rarity
    );
    this.addStringFilter(
      activeFilters,
      'colour',
      'Colour',
      this.filters.colour
    );
    this.addStringFilter(
      activeFilters,
      'classification',
      'Classification',
      this.filters.classification
    );
    this.addStringFilter(
      activeFilters,
      'tags',
      'Tag',
      this.filters.tags
    );
    this.addNumericFilter(
      activeFilters,
      'cost',
      'Cost',
      this.filters.cost
    );
    this.addNumericFilter(
      activeFilters,
      'power',
      'Power',
      this.filters.power
    );
    this.addNumericFilter(
      activeFilters,
      'ram',
      'RAM',
      this.filters.ram
    );
    this.addNumericFilter(
      activeFilters,
      'eddies',
      'Eddies',
      this.filters.eddies
    );

    return activeFilters;
  }

  get activeFilterCount(): number {
    return this.activeFilters.length;
  }

  get hasSelectedFilters(): boolean {
    return this.activeFilterCount > 0;
  }

  get hasActiveFilters(): boolean {
    return this.hasSearchQuery ||
      this.hasSelectedFilters;
  }

  get hasMoreFiltersActive(): boolean {
    return Boolean(
      this.filters.colour?.trim() ||
      this.filters.classification?.trim() ||
      this.filters.tags?.trim() ||
      this.filters.cost !== null ||
      this.filters.power !== null ||
      this.filters.ram !== null ||
      this.filters.eddies !== null
    );
  }

  get activeMoreFilterCount(): number {
    return this.activeFilters.filter(
      filter => ![
        'setCode',
        'cardType',
        'rarity'
      ].includes(filter.key)
    ).length;
  }

  get sortValue(): ArchiveSortValue {
    if (this.filters.sortBy === 'name') {
      return this.filters.sortDirection === 'desc'
        ? 'name-desc'
        : 'name-asc';
    }

    return 'setOrder-asc';
  }

  hasMeaningfulValue(
    value: string | null | undefined
  ): boolean {
    if (!value?.trim()) {
      return false;
    }

    const normalisedValue =
      value.trim().toLowerCase();

    return ![
      'unknown',
      'n/a',
      'null',
      'none',
      '-',
      '—'
    ].includes(normalisedValue);
  }

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
        this.syncUrlState();
        this.loadCards();
      },
      300
    );
  }

  onFilterChange(
    filter: CardFilterKey,
    value: string | number | null
  ): void {
    this.filters = {
      ...this.filters,
      [filter]: value
    };
    this.currentPage = 1;
    this.clearSearchDebounce();
    this.syncUrlState();
    this.loadCards();
  }

  onClassificationChange(value: string): void {
    this.onFilterChange(
      'classification',
      value.trim()
    );
  }

  onSortChange(value: ArchiveSortValue): void {
    const [sortBy, sortDirection] =
      value.split('-') as [
        CardSortBy,
        CardSortDirection
      ];

    this.filters = {
      ...this.filters,
      sortBy,
      sortDirection
    };
    this.currentPage = 1;
    this.syncUrlState();
    this.loadCards();
  }

  applyFilters(): void {
    this.clearSearchDebounce();
    this.currentPage = 1;
    this.syncUrlState();
    this.loadCards();
  }

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
    this.syncUrlState();
    this.loadCards();
  }

  removeFilter(filter: CardFilterKey): void {
    const emptyValue = [
      'cost',
      'power',
      'ram',
      'eddies'
    ].includes(filter)
      ? null
      : '';

    this.onFilterChange(
      filter,
      emptyValue
    );
  }

  clearFilters(): void {
    this.clearSearchDebounce();
    const sortBy = this.filters.sortBy;
    const sortDirection =
      this.filters.sortDirection;
    this.filters =
      {
        ...this.createEmptyFilters(),
        sortBy,
        sortDirection
      };
    this.currentPage = 1;
    this.syncUrlState();
    this.loadCards();
  }

  toggleFilters(): void {
    this.filtersExpanded =
      !this.filtersExpanded;
  }

  retryLoad(): void {
    this.loadCards();

    if (this.filterOptionsUnavailable) {
      this.loadFilterOptions();
    }
  }

  rememberArchiveState(): void {
    this.cardDetailReturnService.save(
      'archive',
      this.router.url
    );

    this.catalogueStateService.save({
      filters: { ...this.filters },
      currentPage: this.currentPage
    });
  }

  goToPage(page: number): void {
    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.currentPage = page;
    this.syncUrlState();
    this.loadCards();
  }

  previousPage(): void {
    this.goToPage(
      this.currentPage - 1
    );
  }

  nextPage(): void {
    this.goToPage(
      this.currentPage + 1
    );
  }

  formatSetOption(
    set: CardSetFilterOption
  ): string {
    return set.name && set.name !== set.code
      ? `${set.code} — ${set.name}`
      : set.code;
  }

  private loadFilterOptions(): void {
    this.filterOptionsRequest?.unsubscribe();
    this.isFilterOptionsLoading = true;
    this.filterOptionsUnavailable = false;

    this.filterOptionsRequest =
      this.cardsService
        .getFilterOptions()
        .subscribe({
          next: options => {
            this.filterOptions =
              this.normaliseFilterOptions(options);
            this.mergeVisibleRarities(this.cards);
            this.isFilterOptionsLoading = false;
            this.changeDetectorRef.markForCheck();
          },
          error: () => {
            this.filterOptions =
              this.createEmptyFilterOptions();
            this.filterOptionsUnavailable = true;
            this.isFilterOptionsLoading = false;
            this.changeDetectorRef.markForCheck();
          }
        });
  }

  private loadCards(): void {
    this.cardRequest?.unsubscribe();
    this.errorMessage = '';

    if (this.hasLoadedOnce) {
      this.isRefreshing = true;
    } else {
      this.isLoading = true;
    }

    this.cardRequest =
      this.cardsService
        .getCardsPage(
          this.filters,
          this.currentPage,
          this.pageSize
        )
        .subscribe({
          next: response => {
            if (
              response.totalPages > 0 &&
              this.currentPage > response.totalPages
            ) {
              this.currentPage = response.totalPages;
              this.syncUrlState();
              this.loadCards();
              return;
            }

            const requestedPage = this.currentPage;

            this.cards = response.items;
            this.mergeVisibleRarities(response.items);
            this.totalCount = response.totalCount;
            this.totalPages = response.totalPages;
            this.currentPage = response.totalCount === 0
              ? 1
              : response.page;

            if (requestedPage !== this.currentPage) {
              this.syncUrlState();
            }

            this.isLoading = false;
            this.isRefreshing = false;
            this.hasLoadedOnce = true;
            this.changeDetectorRef.markForCheck();
          },
          error: () => {
            this.cards = [];
            this.totalCount = 0;
            this.totalPages = 0;
            this.currentPage = 1;
            this.errorMessage =
              'The Vault Archive could not be loaded.';
            this.isLoading = false;
            this.isRefreshing = false;
            this.hasLoadedOnce = true;
            this.changeDetectorRef.markForCheck();
          }
        });
  }

  private syncUrlState(): void {
    const queryParams: Record<
      string,
      string | number
    > = {};

    this.setStringQuery(queryParams, 'q', this.filters.name);
    this.setStringQuery(queryParams, 'set', this.filters.setCode);
    this.setStringQuery(queryParams, 'type', this.filters.cardType);
    this.setStringQuery(queryParams, 'rarity', this.filters.rarity);
    this.setStringQuery(queryParams, 'colour', this.filters.colour);
    this.setStringQuery(
      queryParams,
      'classification',
      this.filters.classification
    );
    this.setStringQuery(queryParams, 'tag', this.filters.tags);
    this.setNumberQuery(queryParams, 'cost', this.filters.cost);
    this.setNumberQuery(queryParams, 'power', this.filters.power);
    this.setNumberQuery(queryParams, 'ram', this.filters.ram);
    this.setNumberQuery(queryParams, 'eddies', this.filters.eddies);

    if (this.sortValue !== 'setOrder-asc') {
      queryParams['sort'] = this.sortValue;
    }

    if (this.currentPage > 1) {
      queryParams['page'] = this.currentPage;
    }

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }

  private readFiltersFromQuery(
    queryParams: ParamMap
  ): CardFilters {
    const sort = queryParams.get('sort');
    let sortBy: CardSortBy = 'setOrder';
    let sortDirection: CardSortDirection = 'asc';

    if (sort === 'name-asc') {
      sortBy = 'name';
    } else if (sort === 'name-desc') {
      sortBy = 'name';
      sortDirection = 'desc';
    }

    return {
      name: queryParams.get('q') ?? '',
      setCode: queryParams.get('set') ?? '',
      cardType: queryParams.get('type') ?? '',
      rarity: queryParams.get('rarity') ?? '',
      colour: queryParams.get('colour') ?? '',
      classification:
        queryParams.get('classification') ?? '',
      tags: queryParams.get('tag') ?? '',
      cost: this.readInteger(queryParams.get('cost')),
      power: this.readInteger(queryParams.get('power')),
      ram: this.readInteger(queryParams.get('ram')),
      eddies: this.readInteger(queryParams.get('eddies')),
      sortBy,
      sortDirection
    };
  }

  private hasArchiveQueryState(
    queryParams: ParamMap
  ): boolean {
    const archiveQueryKeys = [
      'q',
      'set',
      'type',
      'rarity',
      'colour',
      'classification',
      'tag',
      'cost',
      'power',
      'ram',
      'eddies',
      'sort',
      'page'
    ];

    return archiveQueryKeys.some(
      key => queryParams.has(key)
    );
  }

  private getSetLabel(
    setCode: string | undefined
  ): string | undefined {
    if (!setCode) {
      return undefined;
    }

    const set = this.filterOptions.sets.find(
      option => option.code === setCode
    );

    return set
      ? this.formatSetOption(set)
      : setCode;
  }

  private addStringFilter(
    activeFilters: ActiveArchiveFilter[],
    key: CardFilterKey,
    label: string,
    value: string | undefined,
    displayValue = value
  ): void {
    if (value?.trim() && displayValue) {
      activeFilters.push({
        key,
        label,
        value: displayValue
      });
    }
  }

  private addNumericFilter(
    activeFilters: ActiveArchiveFilter[],
    key: CardFilterKey,
    label: string,
    value: number | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      activeFilters.push({
        key,
        label,
        value: String(value)
      });
    }
  }

  private setStringQuery(
    queryParams: Record<string, string | number>,
    key: string,
    value: string | undefined
  ): void {
    if (value?.trim()) {
      queryParams[key] = value.trim();
    }
  }

  private setNumberQuery(
    queryParams: Record<string, string | number>,
    key: string,
    value: number | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      queryParams[key] = value;
    }
  }

  private readInteger(
    value: string | null
  ): number | null {
    if (value === null || value.trim() === '') {
      return null;
    }

    const numberValue = Number(value);

    return Number.isInteger(numberValue)
      ? numberValue
      : null;
  }

  private readPositiveInteger(
    value: string | null
  ): number | null {
    const numberValue = this.readInteger(value);

    return numberValue !== null && numberValue > 0
      ? numberValue
      : null;
  }

  private clearSearchDebounce(): void {
    if (this.searchDebounceTimer === null) {
      return;
    }

    clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = null;
  }

  private createEmptyFilters(): CardFilters {
    return {
      name: '',
      setCode: '',
      cardType: '',
      rarity: '',
      colour: '',
      classification: '',
      tags: '',
      cost: null,
      power: null,
      ram: null,
      eddies: null,
      sortBy: 'setOrder',
      sortDirection: 'asc'
    };
  }

  private createEmptyFilterOptions(): CardFilterOptions {
    return {
      colours: [],
      cardTypes: [],
      tags: [],
      costs: [],
      powers: [],
      ramValues: [],
      eddiesValues: [],
      sets: [],
      rarities: []
    };
  }

  /**
   * Keeps the Archive usable when an older API response omits one of the
   * newer option arrays. No choices are invented.
   */
  private normaliseFilterOptions(
    options: CardFilterOptions
  ): CardFilterOptions {
    return {
      colours: options.colours ?? [],
      cardTypes: options.cardTypes ?? [],
      tags: options.tags ?? [],
      costs: options.costs ?? [],
      powers: options.powers ?? [],
      ramValues: options.ramValues ?? [],
      eddiesValues: options.eddiesValues ?? [],
      sets: options.sets ?? [],
      rarities: options.rarities ?? []
    };
  }

  /**
   * Rarity belongs to a genuine CardPrinting. If the options response does
   * not yet include rarities, retain meaningful values already returned by
   * the Cards API instead of hard-coding game data or disabling the field.
   */
  private mergeVisibleRarities(cards: Card[]): void {
    const rarities = cards
      .map(card => card.rarity?.trim() ?? '')
      .filter(rarity => this.hasMeaningfulValue(rarity));

    if (rarities.length === 0) {
      return;
    }

    this.filterOptions = {
      ...this.filterOptions,
      rarities: [
        ...new Set([
          ...this.filterOptions.rarities,
          ...rarities
        ])
      ].sort((left, right) => left.localeCompare(right))
    };
  }
}

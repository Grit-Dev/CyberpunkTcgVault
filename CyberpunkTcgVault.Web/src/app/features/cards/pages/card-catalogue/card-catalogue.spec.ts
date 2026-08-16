import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CardCatalogue } from './card-catalogue';
import { CardsService } from '../../services/cards.service';

describe('CardCatalogue', () => {
  let component: CardCatalogue;
  let fixture: ComponentFixture<CardCatalogue>;

  const cardsServiceMock = {
    getFilterOptions: () =>
      of({
        colours: ['Blue'],
        cardTypes: ['Unit'],
        tags: ['Solo'],
        costs: [3],
        powers: [5],
        ramValues: [2],
        eddiesValues: [4],
        sets: [
          {
            code: 'NCL',
            name: 'Night City Legends',
          },
        ],
        rarities: ['Legendary'],
      }),
    getCardsPage: () =>
      of({
        items: [],
        page: 1,
        pageSize: 24,
        totalCount: 0,
        totalPages: 0,
      }),
    getImageUrl: (imagePath: string | null) => imagePath ?? '/images/cards/placeholder.png',
  };

  beforeEach(async () => {
    sessionStorage.clear();

    await TestBed.configureTestingModule({
      imports: [CardCatalogue],
      providers: [
        provideRouter([]),
        {
          provide: CardsService,
          useValue: cardsServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCatalogue);

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps Archive result count and page metadata together in the results rail', () => {
    component.cards = [
      {
        id: 1,
        name: 'Test Card',
        cardType: null,
        classification: null,
        rarity: null,
        cardNumber: 'CVO-001',
        setName: 'Choom Vault Origins',
        setCode: 'CVO',
        imageUrl: '/images/cards/test.png',
        hasBetaSymbol: false,
        isKickstarterVersion: false,
        isRetailVersion: false,
        isFoil: false,
        isAltArt: false,
        isBoxTopper: false,
        isPromo: false,
        isStarterDeckExclusive: false,
        printings: [],
      } as any,
    ];
    component.totalCount = 49;
    component.totalPages = 3;
    component.currentPage = 2;
    component.isLoading = false;
    component.hasLoadedOnce = true;
    fixture.detectChanges();

    const rail = fixture.nativeElement.querySelector('.catalogue-results__rail') as HTMLElement;
    expect(rail.textContent).toContain('49 cards');
    expect(rail.textContent).toContain('Page 2 of 3');
    expect(rail.textContent).toContain('·');
  });

  it('keeps Classification and Tags as separate active filters', () => {
    component.filters = {
      ...component.filters,
      classification: 'Character',
      tags: 'Solo',
    };

    expect(component.activeFilters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'classification',
          label: 'Classification',
          value: 'Character',
        }),
        expect.objectContaining({
          key: 'tags',
          label: 'Tag',
          value: 'Solo',
        }),
      ]),
    );
  });

  it('counts only selected filters in the mobile Filters control', () => {
    component.filters = {
      ...component.filters,
      name: 'v',
      setCode: 'NCL',
      rarity: 'Legendary',
      ram: 2,
    };

    expect(component.activeFilterCount).toBe(3);
    expect(component.hasSearchQuery).toBe(true);
  });

  it('hides the Rarity dimension when there are no meaningful options', () => {
    component.filterOptions = {
      ...component.filterOptions,
      rarities: ['Unknown', '  '],
    };
    component.isFilterOptionsLoading = false;
    component.filterOptionsUnavailable = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('select[name="rarity"]')).toBeNull();
  });

  it('excludes Unknown while keeping genuine Rarity options available', () => {
    component.filterOptions = {
      ...component.filterOptions,
      rarities: ['Unknown', 'Iconic', 'Rare'],
    };
    component.isFilterOptionsLoading = false;
    fixture.detectChanges();

    const raritySelect = fixture.nativeElement.querySelector(
      'select[name="rarity"]',
    ) as HTMLSelectElement;
    const optionText = Array.from(raritySelect.options).map((option) => option.textContent?.trim());

    expect(optionText).toContain('Iconic');
    expect(optionText).toContain('Rare');
    expect(optionText).not.toContain('Unknown');
  });

  it('renders search as a removable active record without changing filter count', () => {
    component.filters = {
      ...component.filters,
      name: 'V',
    };
    fixture.detectChanges();

    const activeFilterText =
      fixture.nativeElement.querySelector('.catalogue-active-filters')?.textContent ?? '';

    expect(activeFilterText).toContain('Search:');
    expect(activeFilterText).toContain('V');
    expect(component.activeFilterCount).toBe(0);
  });

  it('expands More filters with an accessible disclosure state', () => {
    const toggle = fixture.nativeElement.querySelector(
      '.catalogue-filter-toggle--desktop',
    ) as HTMLButtonElement;
    const panel = fixture.nativeElement.querySelector('#archive-more-filters') as HTMLElement;

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hidden).toBe(true);

    toggle.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hidden).toBe(false);
  });

  it('does not render secondary select filters that have no usable values', () => {
    component.filterOptions = {
      ...component.filterOptions,
      colours: [],
      tags: [],
      costs: [],
      powers: [],
      ramValues: [],
      eddiesValues: [],
    };
    component.isFilterOptionsLoading = false;
    component.filtersExpanded = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('select[name="colour"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('select[name="tags"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('select[name="cost"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('select[name="power"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('select[name="ram"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('select[name="eddies"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('input[name="classification"]')).not.toBeNull();
  });

  it('renders and removes a selected rarity as an active filter', () => {
    component.filters = {
      ...component.filters,
      rarity: 'Legendary',
    };
    fixture.detectChanges();

    const rarityRecords = fixture.nativeElement.querySelectorAll(
      '.catalogue-active-filter',
    ) as NodeListOf<HTMLButtonElement>;
    const rarityRecord = Array.from(rarityRecords).find((element) =>
      element.textContent?.includes('Rarity:'),
    ) as HTMLButtonElement;

    expect(rarityRecord.textContent).toContain('Legendary');

    rarityRecord.click();

    expect(component.filters.rarity).toBe('');
  });
});

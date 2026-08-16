import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { DynamicSeoService } from '../../../../core/seo/dynamic-seo.service';
import { OwnedCardsService } from '../../../collection/services/owned-cards.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { Card } from '../../models/card';
import { CardDetailReturnService } from '../../services/card-detail-return.service';
import { CardsService } from '../../services/cards.service';
import { CardDetail } from './card-detail';

const card: Card = {
  id: 17,
  name: 'V // StreetKid',
  colour: 'Red',
  cardType: 'Legend',
  classification: 'Merc',
  keywords: null,
  cost: 5,
  power: 6,
  ramCost: 2,
  eddies: 3,
  isLegend: true,
  notes: null,
  cardPrintingId: 101,
  setName: 'Welcome to Night City',
  rarity: 'Rare',
  hasBetaSymbol: false,
  isKickstarterVersion: false,
  isRetailVersion: true,
  isFoil: false,
  isAltArt: false,
  isBoxTopper: false,
  isPromo: false,
  isStarterDeckExclusive: false,
  cardNumber: '005a',
  imageUrl: '/images/cards/v-streetkid.webp',
  printings: [
    {
      id: 101,
      cardSetId: 1,
      setName: 'Welcome to Night City',
      setCode: 'WNC',
      cardNumber: '005a',
      rarity: 'Rare',
      imageUrl: '/images/cards/v-streetkid.webp',
      languageCode: 'en',
      hasBetaSymbol: false,
      isKickstarterVersion: false,
      isRetailVersion: true,
      isFoil: false,
      isAltArt: false,
      isBoxTopper: false,
      isPromo: false,
      isStarterDeckExclusive: false,
    },
    {
      id: 102,
      cardSetId: 1,
      setName: 'Welcome to Night City',
      setCode: 'WNC',
      cardNumber: '005b',
      rarity: 'Rare',
      imageUrl: '/images/cards/v-streetkid-alt.webp',
      languageCode: 'en',
      hasBetaSymbol: false,
      isKickstarterVersion: true,
      isRetailVersion: false,
      isFoil: true,
      isAltArt: false,
      isBoxTopper: false,
      isPromo: false,
      isStarterDeckExclusive: false,
    },
  ],
};

describe('CardDetail', () => {
  let fixture: ComponentFixture<CardDetail>;

  const currentUser = signal(null);

  beforeEach(async () => {
    const authServiceStub = {
      currentUser,
      isAuthenticated: signal(false),
      isInitialized: signal(true),
      restoreSession: () => of(null),
    };

    const ownedCardsServiceStub = {
      items: signal([]),
      load: () => of([]),
      addPrinting: () => of({}),
      updateQuantity: () => of({}),
      remove: () => of(undefined),
    };

    const wishlistServiceStub = {
      items: signal([]),
      load: () => of([]),
      addPrinting: () => of({}),
      updateQuantity: () => of({}),
      remove: () => of(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [CardDetail],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '17' })),
            snapshot: {
              paramMap: convertToParamMap({ id: '17' }),
              queryParamMap: convertToParamMap({}),
            },
          },
        },
        {
          provide: CardsService,
          useValue: {
            getCardById: () => of(card),
            getImageUrl: (path: string | null) => path ?? '/placeholder.png',
          },
        },
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        {
          provide: OwnedCardsService,
          useValue: ownedCardsServiceStub,
        },
        {
          provide: WishlistService,
          useValue: wishlistServiceStub,
        },
        DynamicSeoService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDetail);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('renders the public card record', () => {
    const heading = fixture.nativeElement.querySelector('h1') as HTMLElement;
    const collectorHeading = fixture.nativeElement.querySelector(
      '.collector-record__heading',
    ) as HTMLElement;

    expect(heading.textContent?.trim()).toBe('V // StreetKid');
    expect(collectorHeading.textContent?.trim()).toBe('Your record');
    expect(fixture.nativeElement.textContent).toContain('Set Code WNC');
    expect(fixture.componentInstance.selectedPrinting()?.id).toBe(101);
  });

  it('describes genuine printing variants without inventing labels', () => {
    expect(fixture.componentInstance.printingVariants(card.printings[1])).toEqual([
      'Foil',
      'Kickstarter',
    ]);
  });

  it('falls back to Vault Archive for a direct Card Detail visit', () => {
    const backLink = fixture.nativeElement.querySelector('.card-detail-back') as HTMLAnchorElement;

    expect(backLink.textContent?.trim()).toContain('Vault Archive');
    expect(backLink.getAttribute('href')).toBe('/cards');
  });

  it('returns to the exact Collection state when Card Detail was opened from Collection', async () => {
    fixture.destroy();

    const returnService = TestBed.inject(CardDetailReturnService);
    returnService.save('collection', '/collection?q=echo&set=Choom%20Vault%20Origins&page=2');

    fixture = TestBed.createComponent(CardDetail);
    fixture.detectChanges();
    await fixture.whenStable();

    const backLink = fixture.nativeElement.querySelector('.card-detail-back') as HTMLAnchorElement;

    expect(backLink.textContent?.trim()).toContain('Collection');
    expect(backLink.getAttribute('href')).toContain('/collection?');
    expect(backLink.getAttribute('href')).toContain('q=echo');
    expect(backLink.getAttribute('href')).toContain('page=2');
  });

  it('treats unsupported metadata sentinels as absent presentation data', () => {
    expect(fixture.componentInstance.hasMeaningfulValue('Unknown')).toBe(false);
    expect(fixture.componentInstance.hasMeaningfulValue('NO-ID')).toBe(false);
    expect(fixture.componentInstance.hasMeaningfulValue('—')).toBe(false);
    expect(fixture.componentInstance.hasMeaningfulValue('Rare')).toBe(true);
  });

  it('does not render an empty printing metadata line', () => {
    const sparseCard: Card = {
      ...card,
      rarity: null,
      printings: [
        {
          ...card.printings[0],
          rarity: null,
          languageCode: 'Unknown',
          setCode: 'Unknown',
        },
      ],
    };

    fixture.componentInstance.card.set(sparseCard);
    fixture.componentInstance.selectedPrinting.set(sparseCard.printings[0]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.printing-record__line')).toBeNull();
  });
});

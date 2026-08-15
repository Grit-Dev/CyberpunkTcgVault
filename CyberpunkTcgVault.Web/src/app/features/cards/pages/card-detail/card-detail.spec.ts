import { signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter
} from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { DynamicSeoService } from '../../../../core/seo/dynamic-seo.service';
import { OwnedCardsService } from '../../../collection/services/owned-cards.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { Card } from '../../models/card';
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
      isStarterDeckExclusive: false
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
      isStarterDeckExclusive: false
    }
  ]
};

describe('CardDetail', () => {
  let fixture: ComponentFixture<CardDetail>;

  const currentUser = signal(null);

  beforeEach(async () => {
    const authServiceStub = {
      currentUser,
      isAuthenticated: signal(false),
      restoreSession: () => of(null)
    };

    const ownedCardsServiceStub = {
      items: signal([]),
      load: () => of([]),
      addPrinting: () => of({})
    };

    const wishlistServiceStub = {
      items: signal([]),
      load: () => of([]),
      addPrinting: () => of({})
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
              queryParamMap: convertToParamMap({})
            }
          }
        },
        {
          provide: CardsService,
          useValue: {
            getCardById: () => of(card),
            getImageUrl: (path: string | null) => path ?? '/placeholder.png'
          }
        },
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: OwnedCardsService,
          useValue: ownedCardsServiceStub
        },
        {
          provide: WishlistService,
          useValue: wishlistServiceStub
        },
        DynamicSeoService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDetail);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('renders the public card record', () => {
    const heading = fixture.nativeElement.querySelector('h1') as HTMLElement;

    expect(heading.textContent?.trim()).toBe('V // StreetKid');
    expect(fixture.componentInstance.selectedPrinting()?.id).toBe(101);
  });

  it('describes genuine printing variants without inventing labels', () => {
    expect(
      fixture.componentInstance.printingVariants(card.printings[1])
    ).toEqual(['Foil', 'Kickstarter']);
  });
});

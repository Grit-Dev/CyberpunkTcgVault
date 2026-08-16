import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Card } from '../../features/cards/models/card';
import { CardsService } from '../../features/cards/services/cards.service';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let cardsResponse: Card[] = [];

  const cardsServiceStub = {
    getCards: () => of(cardsResponse),

    getImageUrl: (imagePath: string | null) => imagePath ?? '',
  };

  beforeEach(async () => {
    cardsResponse = [];

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        {
          provide: CardsService,
          useValue: cardsServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should route Explore cards into the real catalogue', () => {
    const exploreLink = fixture.nativeElement.querySelector(
      '.hero-actions .btn--primary',
    ) as HTMLAnchorElement;

    expect(exploreLink.getAttribute('href')).toBe('/cards');
  });

  it('does not treat unsupported featured-card metadata as displayable', () => {
    expect(component.hasMeaningfulValue('Unknown')).toBe(false);

    expect(component.hasMeaningfulValue('unknown')).toBe(false);

    expect(component.hasMeaningfulValue('NO-ID')).toBe(false);

    expect(component.hasMeaningfulValue('')).toBe(false);

    expect(component.hasMeaningfulValue(null)).toBe(false);

    expect(component.hasMeaningfulValue('Iconic')).toBe(true);

    expect(component.hasMeaningfulValue('CVO-036')).toBe(true);

    expect(component.hasMeaningfulValue('Nomad')).toBe(true);
  });

  it('describes Wishlist using only the implemented MVP behaviour', () => {
    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(text).toContain(
      'Track the exact card printings you are still chasing, manage wanted quantities and see what you already own.',
    );

    expect(text).not.toContain('grading preference');

    expect(text).not.toContain('the reason each item belongs on your list');
  });

  it('describes Sealed without stale valuation claims', () => {
    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(text).toContain(
      'Archive the sealed products you keep unopened, with quantity, edition details, artwork references and private storage information.',
    );

    expect(text).not.toContain('purchase costs');

    expect(text).not.toContain('estimated values');
  });

  it('omits unsupported Featured Card stats instead of rendering placeholder dashes', () => {
    cardsResponse = [
      {
        id: 99,
        name: 'Black Clinic Miracle',
        colour: null,
        cardType: null,
        classification: null,
        keywords: null,
        cost: null,
        power: null,
        ramCost: null,
        eddies: null,
        isLegend: false,
        notes: null,
        cardPrintingId: 999,
        setName: 'Choom Vault Origins',
        rarity: null,
        hasBetaSymbol: false,
        isKickstarterVersion: false,
        isRetailVersion: false,
        isFoil: false,
        isAltArt: false,
        isBoxTopper: false,
        isPromo: false,
        isStarterDeckExclusive: false,
        cardNumber: 'CVO-999',
        imageUrl: '/images/cards/sparse-prototype.png',
        printings: [],
      },
    ];

    component.ngOnInit();
    fixture.detectChanges();

    const preview = fixture.nativeElement.querySelector('.prototype-card') as HTMLElement;

    expect(preview).not.toBeNull();

    const text = preview.textContent?.replace(/\s+/g, ' ').trim() ?? '';

    expect(preview.querySelector('.card-statline')).toBeNull();

    expect(text).not.toContain('PWR —');
    expect(text).not.toContain('RAM —');

    expect(text.toLowerCase()).not.toContain('unknown');
  });

  it('keeps collector examples meaningful when catalogue rarity is unavailable', () => {
    component.collectionExampleCard = null;
    component.wishlistExampleCard = null;

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(text).toContain('Near Mint');

    expect(text).toContain('Priority want');

    expect(text).not.toContain('Legendary · Near Mint');

    expect(text).not.toContain('Legendary · Priority want');
  });
});

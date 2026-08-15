import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CardsService } from '../../features/cards/services/cards.service';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  const cardsServiceStub = {
    getCards: () => of([]),
    getImageUrl: (imagePath: string | null) => imagePath ?? ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        {
          provide: CardsService,
          useValue: cardsServiceStub
        }
      ]
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
      '.hero-actions .btn--primary'
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
      'Track the exact card printings you are still chasing, manage wanted quantities and see what you already own.'
    );
    expect(text).not.toContain('grading preference');
    expect(text).not.toContain('the reason each item belongs on your list');
  });

  it('describes Sealed without stale valuation claims', () => {
    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(text).toContain(
      'Archive the sealed products you keep unopened, with quantity, edition details, artwork references and private storage information.'
    );
    expect(text).not.toContain('purchase costs');
    expect(text).not.toContain('estimated values');
  });
});

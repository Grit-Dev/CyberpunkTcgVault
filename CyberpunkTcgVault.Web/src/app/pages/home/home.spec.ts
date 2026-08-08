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
});

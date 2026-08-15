import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CardCatalogue } from './card-catalogue';
import { CardsService } from '../../services/cards.service';

describe('CardCatalogue', () => {
  let component: CardCatalogue;
  let fixture: ComponentFixture<CardCatalogue>;

  const cardsServiceMock = {
    getCards: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardCatalogue
      ],
      providers: [
        provideRouter([]),
        {
          provide: CardsService,
          useValue: cardsServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(CardCatalogue);

    component =
      fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
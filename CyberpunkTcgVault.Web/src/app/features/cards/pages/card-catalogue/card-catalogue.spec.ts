import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCatalogue } from './card-catalogue';

describe('CardCatalogue', () => {
  let component: CardCatalogue;
  let fixture: ComponentFixture<CardCatalogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCatalogue],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCatalogue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

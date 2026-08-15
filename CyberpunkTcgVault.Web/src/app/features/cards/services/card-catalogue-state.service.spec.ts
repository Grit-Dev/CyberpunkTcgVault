import { TestBed } from '@angular/core/testing';

import {
  CardCatalogueState,
  CardCatalogueStateService
} from './card-catalogue-state.service';

describe('CardCatalogueStateService', () => {
  let service: CardCatalogueStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCatalogueStateService);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('restores the Archive state once and then clears it', () => {
    const state: CardCatalogueState = {
      filters: {
        name: 'malvik',
        rarity: 'Legendary',
        classification: '',
        cardType: ''
      },
      currentPage: 2,
      rarityOptions: ['Legendary', 'Rare'],
      classificationOptions: ['Character'],
      cardTypeOptions: ['Unit']
    };

    service.save(state);

    expect(service.consume()).toEqual(state);
    expect(service.consume()).toBeNull();
  });
});

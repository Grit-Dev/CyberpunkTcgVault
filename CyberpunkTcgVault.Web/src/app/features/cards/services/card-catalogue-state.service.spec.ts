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
        setCode: 'NCL',
        cardType: 'Unit',
        rarity: 'Legendary',
        classification: '',
        colour: 'Yellow',
        tags: 'Solo',
        cost: 7,
        power: null,
        ram: 2,
        eddies: null,
        sortBy: 'name',
        sortDirection: 'asc'
      },
      currentPage: 2
    };

    service.save(state);

    expect(service.consume()).toEqual(state);
    expect(service.consume()).toBeNull();
  });
});

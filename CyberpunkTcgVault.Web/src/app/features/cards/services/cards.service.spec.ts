import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CardsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('sends combined Archive filters to the paged backend endpoint', () => {
    service.getCardsPage(
      {
        name: 'v',
        setCode: 'NCL',
        cardType: 'Unit',
        rarity: 'Legendary',
        colour: 'Blue',
        classification: 'Character',
        tags: 'Solo',
        cost: 7,
        power: 5,
        ram: 2,
        eddies: 4,
        sortBy: 'name',
        sortDirection: 'desc'
      },
      2,
      24
    ).subscribe();

    const request = httpTesting.expectOne(
      candidate => candidate.url === API_ENDPOINTS.cardsPaged
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('name')).toBe('v');
    expect(request.request.params.get('setCode')).toBe('NCL');
    expect(request.request.params.get('cardType')).toBe('Unit');
    expect(request.request.params.get('rarity')).toBe('Legendary');
    expect(request.request.params.get('colour')).toBe('Blue');
    expect(request.request.params.get('classification')).toBe('Character');
    expect(request.request.params.get('tags')).toBe('Solo');
    expect(request.request.params.get('cost')).toBe('7');
    expect(request.request.params.get('power')).toBe('5');
    expect(request.request.params.get('ram')).toBe('2');
    expect(request.request.params.get('eddies')).toBe('4');
    expect(request.request.params.get('sortBy')).toBe('name');
    expect(request.request.params.get('sortDirection')).toBe('desc');
    expect(request.request.params.get('page')).toBe('2');
    expect(request.request.params.get('pageSize')).toBe('24');

    request.flush({
      items: [],
      page: 2,
      pageSize: 24,
      totalCount: 0,
      totalPages: 0
    });
  });

  it('loads genuine filter choices from the backend', () => {
    service.getFilterOptions().subscribe();

    const request = httpTesting.expectOne(
      API_ENDPOINTS.cardFilterOptions
    );

    expect(request.request.method).toBe('GET');

    request.flush({
      colours: [],
      cardTypes: [],
      tags: [],
      costs: [],
      powers: [],
      ramValues: [],
      eddiesValues: [],
      sets: [],
      rarities: []
    });
  });
});

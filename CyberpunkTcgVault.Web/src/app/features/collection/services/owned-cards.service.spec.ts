import {
  provideHttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import {
  OwnedCard,
  UpdateOwnedCardRequest
} from '../models/owned-card';
import { OwnedCardsService } from './owned-cards.service';

const user = {
  userId: 'user-1',
  userName: 'collector',
  email: 'collector@example.com',
  roles: ['User'],
  emailConfirmed: true,
  twoFactorEnabled: false
};

const ownedCard: OwnedCard = {
  id: 8,
  cardPrintingId: 101,
  cardId: 17,
  cardName: 'V // StreetKid',
  setName: 'Welcome to Night City',
  cardNumber: '005a',
  rarity: 'Rare',
  colour: 'Red',
  imageUrl: '/cards/v.webp',
  quantityOwned: 2,
  condition: 'Near Mint',
  isInMasterCollection: true,
  isDuplicate: false,
  isGradingCandidate: true,
  isOpenForTrade: false,
  isOpenToMessages: true,
  maySellLater: false,
  notes: 'Keep this copy.'
};

describe('OwnedCardsService', () => {
  let service: OwnedCardsService;
  let httpTesting: HttpTestingController;
  const currentUser = signal(user);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: {
            currentUser,
            isAuthenticated: signal(true)
          }
        }
      ]
    });

    service = TestBed.inject(OwnedCardsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('preserves collector metadata when updating quantity', () => {
    service.updateQuantity(ownedCard, 3).subscribe(updated => {
      expect(updated.quantityOwned).toBe(3);
      expect(updated.notes).toBe('Keep this copy.');
    });

    const request = httpTesting.expectOne(API_ENDPOINTS.ownedCardById(8));

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({
      quantityOwned: 3,
      condition: 'Near Mint',
      isInMasterCollection: true,
      isDuplicate: false,
      isGradingCandidate: true,
      isOpenForTrade: false,
      isOpenToMessages: true,
      maySellLater: false,
      notes: 'Keep this copy.'
    });

    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });
  });

  it('updates a complete collector record and replaces it in local state', () => {
    service.load().subscribe();
    httpTesting.expectOne(API_ENDPOINTS.ownedCards).flush([ownedCard]);

    const update: UpdateOwnedCardRequest = {
      quantityOwned: 4,
      condition: 'Excellent',
      isInMasterCollection: false,
      isDuplicate: true,
      isGradingCandidate: false,
      isOpenForTrade: true,
      isOpenToMessages: false,
      maySellLater: true,
      notes: 'Trade copy.'
    };

    service.updateRecord(ownedCard, update).subscribe(updated => {
      expect(updated).toEqual({ ...ownedCard, ...update });
    });

    const request = httpTesting.expectOne(API_ENDPOINTS.ownedCardById(8));
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(update);
    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });

    expect(service.items()).toEqual([{ ...ownedCard, ...update }]);
  });

  it('removes only the selected owned-card record from local state after API success', () => {
    service.load().subscribe();
    httpTesting.expectOne(API_ENDPOINTS.ownedCards).flush([ownedCard]);

    service.remove(ownedCard).subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.ownedCardById(8));
    expect(request.request.method).toBe('DELETE');
    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });

    expect(service.items()).toEqual([]);
  });
});

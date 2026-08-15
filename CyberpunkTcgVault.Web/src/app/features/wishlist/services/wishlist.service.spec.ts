import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import { WishlistItem } from '../models/wishlist-item';
import { WishlistService } from './wishlist.service';

const user = {
  userId: 'user-1',
  userName: 'collector',
  email: 'collector@example.com',
  roles: ['User'],
  emailConfirmed: true,
  twoFactorEnabled: false
};

const wishlistItem: WishlistItem = {
  id: 12,
  cardPrintingId: 101,
  cardId: 17,
  cardName: 'V // StreetKid',
  setName: 'Welcome to Night City',
  cardNumber: '005a',
  rarity: 'Rare',
  colour: 'Red',
  imageUrl: '/cards/v.webp',
  wantedQuantity: 2,
  priority: 'High',
  reasonWanted: 'Binder copy',
  wantRaw: true,
  wantGraded: false,
  preferredGradingCompany: null,
  isOpenToTrade: true,
  notes: 'Prefer clean copy.'
};

describe('WishlistService', () => {
  let service: WishlistService;
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

    service = TestBed.inject(WishlistService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('preserves wishlist metadata when updating wanted quantity', () => {
    service.updateQuantity(wishlistItem, 3).subscribe(updated => {
      expect(updated.wantedQuantity).toBe(3);
      expect(updated.priority).toBe('High');
    });

    const request = httpTesting.expectOne(API_ENDPOINTS.wishlistItemById(12));

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({
      wantedQuantity: 3,
      priority: 'High',
      reasonWanted: 'Binder copy',
      wantRaw: true,
      wantGraded: false,
      preferredGradingCompany: null,
      isOpenToTrade: true,
      notes: 'Prefer clean copy.'
    });

    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });
  });

  it('removes only the selected wishlist record from local state after API success', () => {
    service.load().subscribe();
    httpTesting.expectOne(API_ENDPOINTS.wishlist).flush([wishlistItem]);

    service.remove(wishlistItem).subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.wishlistItemById(12));
    expect(request.request.method).toBe('DELETE');
    request.flush(null, {
      status: 204,
      statusText: 'No Content'
    });

    expect(service.items()).toEqual([]);
  });
});

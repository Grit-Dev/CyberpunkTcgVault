import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/http/api-endpoints';
import { CollectionProduct } from '../models/collection-product';
import { CollectionProductsService } from './collection-products.service';

const user = {
  userId: 'user-1',
  userName: 'collector',
  email: 'collector@example.com',
  roles: ['User'],
  emailConfirmed: true,
  twoFactorEnabled: false,
};

const product: CollectionProduct = {
  id: 7,
  productName: 'Night City Legend Display',
  productType: 'Booster Display',
  edition: 'Night City Legend',
  quantity: 2,
  isSealed: true,
  isBetaProduct: false,
  isKickstarterProduct: true,
  isRetailProduct: false,
  isPledgeItem: false,
  purchaseCost: 100,
  shippingCost: 8,
  vatCost: 20,
  estimatedValue: 125,
  minimumSellPrice: 120,
  storageLocation: 'Case A',
  isLongTermHold: true,
  isOpenToTrade: false,
  maySellLater: false,
  imageUrl: '/images/products/ncl-display.png',
  notes: 'Keep sealed.',
};

describe('CollectionProductsService', () => {
  let service: CollectionProductsService;
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
            isAuthenticated: signal(true),
          },
        },
      ],
    });

    service = TestBed.inject(CollectionProductsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('preserves the complete sealed record while changing quantity', () => {
    service.updateQuantity(product, 3).subscribe((updated) => {
      expect(updated.quantity).toBe(3);
      expect(updated.storageLocation).toBe('Case A');
      expect(updated.purchaseCost).toBe(100);
    });

    const request = httpTesting.expectOne(API_ENDPOINTS.collectionProductById(7));

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({
      productName: 'Night City Legend Display',
      productType: 'Booster Display',
      edition: 'Night City Legend',
      quantity: 3,
      isSealed: true,
      isBetaProduct: false,
      isKickstarterProduct: true,
      isRetailProduct: false,
      isPledgeItem: false,
      purchaseCost: 100,
      shippingCost: 8,
      vatCost: 20,
      estimatedValue: 125,
      minimumSellPrice: 120,
      storageLocation: 'Case A',
      isLongTermHold: true,
      isOpenToTrade: false,
      maySellLater: false,
      imageUrl: '/images/products/ncl-display.png',
      notes: 'Keep sealed.',
    });

    request.flush(null, {
      status: 204,
      statusText: 'No Content',
    });
  });

  it('adds the server-confirmed created product to local state', () => {
    service
      .create({
        productName: 'Starter Deck',
        productType: 'Starter',
        edition: null,
        quantity: 1,
        isSealed: true,
        isBetaProduct: false,
        isKickstarterProduct: false,
        isRetailProduct: true,
        isPledgeItem: false,
        purchaseCost: null,
        shippingCost: null,
        vatCost: null,
        estimatedValue: null,
        minimumSellPrice: null,
        storageLocation: null,
        isLongTermHold: false,
        isOpenToTrade: false,
        maySellLater: false,
        imageUrl: null,
        notes: null,
      })
      .subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.collectionProducts);
    expect(request.request.method).toBe('POST');
    request.flush({
      ...product,
      id: 8,
      productName: 'Starter Deck',
      productType: 'Starter',
      quantity: 1,
    });

    expect(service.items().some((item) => item.id === 8)).toBe(true);
  });

  it('removes only the selected product after API success', () => {
    service.load().subscribe();
    httpTesting.expectOne(API_ENDPOINTS.collectionProducts).flush([product]);

    service.remove(product).subscribe();

    const request = httpTesting.expectOne(API_ENDPOINTS.collectionProductById(7));
    expect(request.request.method).toBe('DELETE');
    request.flush(null, {
      status: 204,
      statusText: 'No Content',
    });

    expect(service.items()).toEqual([]);
  });
});

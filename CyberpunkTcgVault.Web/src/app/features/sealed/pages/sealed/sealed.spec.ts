import { signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { FeedbackService } from '../../../../core/feedback/feedback.service';
import { CollectionProduct } from '../../models/collection-product';
import { CollectionProductsService } from '../../services/collection-products.service';
import { Sealed } from './sealed';

describe('Sealed', () => {
  let fixture: ComponentFixture<Sealed>;
  let items = signal<CollectionProduct[]>([]);
  let updateQuantityCalls = 0;
  let createCalls = 0;
  const isDemo = signal(false);

  const createProduct = (id: number): CollectionProduct => ({
    id,
    productName: `Sealed Product ${id}`,
    productType: id % 2 === 0 ? 'Booster Display' : 'Starter Deck',
    edition: id % 2 === 0 ? 'Night City Legend' : 'Choom Vault Origins',
    quantity: 2,
    isSealed: true,
    isBetaProduct: false,
    isKickstarterProduct: id % 2 === 0,
    isRetailProduct: id % 2 !== 0,
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
    imageUrl: `https://images.example.test/products/product-${id}.png`,
    notes: null
  });

  const serviceMock = {
    items: items.asReadonly(),
    isLoaded: signal(true),
    load: () => of(items()),
    updateQuantity: (item: CollectionProduct, quantity: number) => {
      updateQuantityCalls += 1;
      const updated = { ...item, quantity };
      items.update(current => current.map(existing =>
        existing.id === item.id ? updated : existing
      ));
      return of(updated);
    },
    update: (item: CollectionProduct, request: any) => {
      const updated = { ...item, ...request };
      items.update(current => current.map(existing =>
        existing.id === item.id ? updated : existing
      ));
      return of(updated);
    },
    create: () => {
      createCalls += 1;
      return of(createProduct(99));
    },
    remove: (item: CollectionProduct) => {
      items.update(current => current.filter(existing => existing.id !== item.id));
      return of(undefined);
    },
    getImageUrl: (path: string | null) => path
  };

  beforeEach(async () => {
    items = signal(Array.from({ length: 12 }, (_, index) => createProduct(index + 1)));
    updateQuantityCalls = 0;
    createCalls = 0;
    isDemo.set(false);

    Object.defineProperty(serviceMock, 'items', {
      value: items.asReadonly(),
      configurable: true
    });

    await TestBed.configureTestingModule({
      imports: [Sealed],
      providers: [
        provideRouter([]),
        FeedbackService,
        {
          provide: AuthService,
          useValue: {
            isDemo,
            isAuthenticated: signal(true)
          }
        },
        {
          provide: CollectionProductsService,
          useValue: serviceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Sealed);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the approved Sealed product identity', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Sealed');
    expect(text).toContain('Kept sealed.');
    expect(text).toContain('Keep track of the unopened products in your collection.');
  });

  it('paginates sealed products at 10 records per page', () => {
    expect(fixture.componentInstance.pageSize).toBe(10);
    expect(fixture.componentInstance.pagedItems()).toHaveLength(10);
    expect(fixture.componentInstance.totalPages()).toBe(2);

    fixture.componentInstance.goToPage(2);

    expect(fixture.componentInstance.activePage()).toBe(2);
    expect(fixture.componentInstance.pagedItems()).toHaveLength(2);
  });

  it('resets pagination when search changes', () => {
    fixture.componentInstance.goToPage(2);

    fixture.componentInstance.updateSearch({
      target: { value: 'Product 1' }
    } as unknown as Event);

    expect(fixture.componentInstance.activePage()).toBe(1);
  });

  it('updates quantity with one service mutation', () => {
    const item = items()[0];

    fixture.componentInstance.increaseQuantity(item);

    expect(updateQuantityCalls).toBe(1);
    expect(items()[0].quantity).toBe(3);
  });

  it('hides create and remove controls for Demo while keeping quantity management available', () => {
    isDemo.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.sealed-add')).toBeNull();
    expect(fixture.nativeElement.querySelector('.sealed-record__remove')).toBeNull();
    expect(fixture.nativeElement.querySelector('.quantity-control')).not.toBeNull();
  });

  it('accepts only empty or HTTP/HTTPS artwork URLs in both sealed forms', () => {
    const createArtworkUrl = fixture.componentInstance.createForm.controls.imageUrl;

    createArtworkUrl.setValue('');
    expect(createArtworkUrl.valid).toBe(true);

    createArtworkUrl.setValue('https://images.example.test/product.webp');
    expect(createArtworkUrl.valid).toBe(true);

    createArtworkUrl.setValue('http://localhost:5000/images/product.png');
    expect(createArtworkUrl.valid).toBe(true);

    createArtworkUrl.setValue('not a url');
    expect(createArtworkUrl.hasError('invalidArtworkUrl')).toBe(true);

    createArtworkUrl.setValue('ftp://images.example.test/product.webp');
    expect(createArtworkUrl.hasError('invalidArtworkUrl')).toBe(true);

    fixture.componentInstance.beginEdit(items()[0]);
    const editArtworkUrl = fixture.componentInstance.editForm.controls.imageUrl;
    editArtworkUrl.setValue('javascript:alert(1)');

    expect(editArtworkUrl.hasError('invalidArtworkUrl')).toBe(true);
  });

  it('blocks create when the artwork URL format is invalid and shows the approved message', () => {
    fixture.componentInstance.openCreate();
    fixture.componentInstance.createForm.controls.productName.setValue('Night City Display');
    fixture.componentInstance.createForm.controls.imageUrl.setValue('www.example.com/artwork.jpg');

    fixture.componentInstance.createProduct();
    fixture.detectChanges();

    expect(createCalls).toBe(0);
    expect(fixture.nativeElement.textContent).toContain(
      'Enter a valid artwork URL or leave this field empty.'
    );
  });

  it('keeps the controlled fallback while artwork is empty, pending, changed, or failed', () => {
    items.set([{ ...createProduct(1), imageUrl: 'https://images.example.test/product.webp' }]);
    fixture.detectChanges();

    let fallback = fixture.nativeElement.querySelector('.sealed-record__art-fallback') as HTMLElement;
    let image = fixture.nativeElement.querySelector('.sealed-record__art-image') as HTMLImageElement;

    expect(fallback.textContent?.trim()).toBe('Product artwork unavailable');
    expect(image.alt).toBe('');
    expect(image.classList.contains('sealed-record__art-image--loaded')).toBe(false);

    image.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(image.classList.contains('sealed-record__art-image--loaded')).toBe(true);

    items.set([{ ...createProduct(1), imageUrl: 'https://images.example.test/replacement.webp' }]);
    fixture.detectChanges();
    image = fixture.nativeElement.querySelector('.sealed-record__art-image') as HTMLImageElement;
    expect(image.classList.contains('sealed-record__art-image--loaded')).toBe(false);

    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(image.classList.contains('sealed-record__art-image--loaded')).toBe(false);
    expect(fallback.textContent?.trim()).toBe('Product artwork unavailable');

    items.set([{ ...createProduct(1), imageUrl: null }]);
    fixture.detectChanges();

    fallback = fixture.nativeElement.querySelector('.sealed-record__art-fallback') as HTMLElement;
    expect(fallback.textContent?.trim()).toBe('Product artwork unavailable');
    expect(fixture.nativeElement.querySelector('.sealed-record__art-image')).toBeNull();
  });

  it('shows filtered empty separately from the true empty state', () => {
    fixture.componentInstance.updateSearch({
      target: { value: 'not-a-product' }
    } as unknown as Event);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'No sealed products match these filters.'
    );
    expect(fixture.nativeElement.textContent).not.toContain('The shelf is clear.');
  });
});

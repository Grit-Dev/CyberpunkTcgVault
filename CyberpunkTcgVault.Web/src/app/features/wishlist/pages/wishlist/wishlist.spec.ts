import { signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { FeedbackService } from '../../../../core/feedback/feedback.service';
import { CardsService } from '../../../cards/services/cards.service';
import { OwnedCard } from '../../../collection/models/owned-card';
import { OwnedCardsService } from '../../../collection/services/owned-cards.service';
import { WishlistItem } from '../../models/wishlist-item';
import { WishlistService } from '../../services/wishlist.service';
import { Wishlist } from './wishlist';

describe('Wishlist', () => {
  let fixture: ComponentFixture<Wishlist>;
  let items = signal<WishlistItem[]>([]);
  let ownedItems = signal<OwnedCard[]>([]);
  let updateQuantityCalls = 0;

  const createWishlistItem = (id: number): WishlistItem => ({
    id,
    cardPrintingId: 100 + id,
    cardId: 200 + id,
    cardName: `Wanted Card ${id}`,
    setName: id % 2 === 0 ? 'Choom Vault Origins' : 'Night City Legends',
    cardNumber: `CVO-${String(id).padStart(3, '0')}`,
    rarity: 'Rare',
    colour: null,
    imageUrl: `/images/cards/wanted-${id}.png`,
    wantedQuantity: 2,
    priority: id === 1 ? 'High' : null,
    reasonWanted: id === 1 ? 'Second copy' : null,
    wantRaw: true,
    wantGraded: false,
    preferredGradingCompany: null,
    isOpenToTrade: false,
    notes: null
  });

  const wishlistServiceMock = {
    items: items.asReadonly(),
    isLoaded: signal(true),
    load: () => of(items()),
    updateQuantity: (item: WishlistItem, wantedQuantity: number) => {
      updateQuantityCalls += 1;
      const updated = { ...item, wantedQuantity };
      items.update(current => current.map(existing =>
        existing.id === item.id ? updated : existing
      ));
      return of(updated);
    },
    remove: (item: WishlistItem) => {
      items.update(current => current.filter(existing => existing.id !== item.id));
      return of(undefined);
    }
  };

  const ownedCardsServiceMock = {
    items: ownedItems.asReadonly(),
    isLoaded: signal(true),
    load: () => of(ownedItems())
  };

  beforeEach(async () => {
    items = signal(Array.from({ length: 12 }, (_, index) => createWishlistItem(index + 1)));
    ownedItems = signal<OwnedCard[]>([{
      id: 88,
      cardPrintingId: 101,
      cardId: 201,
      cardName: 'Wanted Card 1',
      setName: 'Night City Legends',
      cardNumber: 'CVO-001',
      rarity: 'Rare',
      colour: null,
      imageUrl: '/images/cards/wanted-1.png',
      quantityOwned: 1,
      condition: null,
      isInMasterCollection: false,
      isDuplicate: false,
      isGradingCandidate: false,
      isOpenForTrade: false,
      isOpenToMessages: false,
      maySellLater: false,
      notes: null
    }]);
    updateQuantityCalls = 0;

    Object.defineProperty(wishlistServiceMock, 'items', {
      value: items.asReadonly(),
      configurable: true
    });
    Object.defineProperty(ownedCardsServiceMock, 'items', {
      value: ownedItems.asReadonly(),
      configurable: true
    });

    await TestBed.configureTestingModule({
      imports: [Wishlist],
      providers: [
        provideRouter([]),
        FeedbackService,
        {
          provide: WishlistService,
          useValue: wishlistServiceMock
        },
        {
          provide: OwnedCardsService,
          useValue: ownedCardsServiceMock
        },
        {
          provide: CardsService,
          useValue: {
            getImageUrl: (path: string | null) => path ?? '/images/cards/placeholder.png'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Wishlist);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });


  it('uses the approved chase identity and shows passive ownership context for unowned Printings', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Wishlist');
    expect(text).toContain('Still chasing.');
    expect(text).toContain('Not yet owned');
  });

  it('renders exact Printing identity and an owned crossover when the same Printing is owned', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Wanted Card 1');
    expect(text).toContain('CVO-001');
    expect(text).toContain('Wanted');
    expect(text).toContain('Owned');
  });


  it('renders the shared compact desktop pagination rail when multiple pages exist', () => {
    const pagination = fixture.nativeElement.querySelector('.wishlist-pagination') as HTMLElement;
    const controls = pagination.querySelector('.wishlist-pagination__controls') as HTMLElement;
    const pages = pagination.querySelector('.wishlist-pagination__pages') as HTMLElement;

    expect(pagination).not.toBeNull();
    expect(controls.textContent).toContain('Previous');
    expect(pages.textContent).toContain('1');
    expect(pages.textContent).toContain('2');
    expect(controls.textContent).toContain('Next');
  });

  it('paginates Wishlist records at 10 per page', () => {
    expect(fixture.componentInstance.pageSize).toBe(10);
    expect(fixture.componentInstance.pagedItems()).toHaveLength(10);
    expect(fixture.componentInstance.totalPages()).toBe(2);

    fixture.componentInstance.goToPage(2);

    expect(fixture.componentInstance.activePage()).toBe(2);
    expect(fixture.componentInstance.pagedItems()).toHaveLength(2);
  });

  it('resets to page one when search changes', () => {
    fixture.componentInstance.goToPage(2);

    fixture.componentInstance.updateSearch({
      target: { value: 'Wanted Card 1' }
    } as unknown as Event);

    expect(fixture.componentInstance.activePage()).toBe(1);
  });

  it('updates wanted quantity once while preserving Wishlist metadata in the service contract', () => {
    const item = items()[0];

    fixture.componentInstance.increaseQuantity(item);

    expect(updateQuantityCalls).toBe(1);
    expect(items()[0].wantedQuantity).toBe(3);
    expect(items()[0].priority).toBe('High');
    expect(items()[0].reasonWanted).toBe('Second copy');
  });

  it('moves to the previous valid page after removing the only item on the final page', () => {
    items.set(Array.from({ length: 11 }, (_, index) => createWishlistItem(index + 1)));
    fixture.componentInstance.goToPage(2);

    fixture.componentInstance.removeFromWishlist(items()[10]);

    expect(fixture.componentInstance.totalPages()).toBe(1);
    expect(fixture.componentInstance.activePage()).toBe(1);
  });

  it('shows the filtered-empty state separately from the true-empty state', () => {
    fixture.componentInstance.updateSearch({
      target: { value: 'not-a-card' }
    } as unknown as Event);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'No wanted printings match these filters.'
    );
    expect(fixture.nativeElement.textContent).not.toContain(
      'Nothing on the chase list.'
    );
  });
});

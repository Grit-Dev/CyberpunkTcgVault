import { TestBed } from '@angular/core/testing';

import { CardDetailReturnService } from './card-detail-return.service';

describe('CardDetailReturnService', () => {
  let service: CardDetailReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDetailReturnService);
  });

  it('returns to Vault Archive through its existing one-shot state restoration', () => {
    service.save('archive', '/cards?q=echo&set=CVO&rarity=Legendary&sort=name-asc&page=2');

    expect(service.consume()).toEqual({
      label: 'Vault Archive',
      path: '/cards',
      queryParams: {},
    });
    expect(service.consume()).toBeNull();
  });

  it('preserves Collection page, search and set state', () => {
    service.save('collection', '/collection?q=malvik&set=Choom%20Vault%20Origins&page=4');

    expect(service.consume()).toEqual({
      label: 'Collection',
      path: '/collection',
      queryParams: {
        q: 'malvik',
        set: 'Choom Vault Origins',
        page: '4',
      },
    });
  });

  it('preserves Wishlist page, search and set state', () => {
    service.save('wishlist', '/wishlist?q=echo&set=CVO&page=2');

    expect(service.consume()).toEqual({
      label: 'Wishlist',
      path: '/wishlist',
      queryParams: {
        q: 'echo',
        set: 'CVO',
        page: '2',
      },
    });
  });

  it('rejects an invalid or mismatched origin URL', () => {
    service.save('collection', '/wishlist?page=2');
    expect(service.consume()).toBeNull();

    service.save('archive', '/cards/17');
    expect(service.consume()).toBeNull();

    service.save('wishlist', 'https://example.com/wishlist');
    expect(service.consume()).toBeNull();
  });
});

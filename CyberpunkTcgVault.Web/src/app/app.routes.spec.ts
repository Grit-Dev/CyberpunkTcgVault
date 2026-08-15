import { authGuard } from './core/auth/auth.guard';
import { Collection } from './features/collection/pages/collection/collection';
import { Wishlist } from './features/wishlist/pages/wishlist/wishlist';
import { routes } from './app.routes';

describe('application routes', () => {
  it('protects the private Collection route with the shared auth guard', () => {
    const collectionRoute = routes.find(route => route.path === 'collection');

    expect(collectionRoute).toBeTruthy();
    expect(collectionRoute?.component).toBe(Collection);
    expect(collectionRoute?.canActivate).toEqual([authGuard]);
    expect(collectionRoute?.data?.['robots']).toBe('noindex, nofollow');
  });

  it('protects the private Wishlist route with the shared auth guard', () => {
    const wishlistRoute = routes.find(route => route.path === 'wishlist');

    expect(wishlistRoute).toBeTruthy();
    expect(wishlistRoute?.component).toBe(Wishlist);
    expect(wishlistRoute?.canActivate).toEqual([authGuard]);
    expect(wishlistRoute?.data?.['robots']).toBe('noindex, nofollow');
  });
});

import { authGuard } from './core/auth/auth.guard';
import { Account } from './features/account/pages/account/account';
import { Collection } from './features/collection/pages/collection/collection';
import { Wishlist } from './features/wishlist/pages/wishlist/wishlist';
import { Sealed } from './features/sealed/pages/sealed/sealed';
import { Terms } from './pages/terms/terms';
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

  it('protects the private Sealed route with the shared auth guard', () => {
    const sealedRoute = routes.find(route => route.path === 'sealed');

    expect(sealedRoute).toBeTruthy();
    expect(sealedRoute?.component).toBe(Sealed);
    expect(sealedRoute?.canActivate).toEqual([authGuard]);
    expect(sealedRoute?.data?.['robots']).toBe('noindex, nofollow');
  });

  it('protects the private Account route with the shared auth guard', () => {
    const accountRoute = routes.find(route => route.path === 'account');

    expect(accountRoute).toBeTruthy();
    expect(accountRoute?.component).toBe(Account);
    expect(accountRoute?.canActivate).toEqual([authGuard]);
    expect(accountRoute?.data?.['robots']).toBe('noindex, nofollow');
  });

  it('registers the public Terms route with the approved metadata', () => {
    const termsRoute = routes.find(route => route.path === 'terms');

    expect(termsRoute).toBeTruthy();
    expect(termsRoute?.component).toBe(Terms);
    expect(termsRoute?.title).toBe('Terms of Use | Choom Vault');
    expect(termsRoute?.data?.['description']).toBe(
      'Terms governing use of Choom Vault and the Demo Vault collector experience.'
    );
    expect(termsRoute?.data?.['robots']).toBe('index, follow');
  });
});

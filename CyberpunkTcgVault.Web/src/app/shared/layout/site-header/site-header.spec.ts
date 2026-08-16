import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { AuthUser } from '../../../core/auth/auth.models';
import { CapabilitiesService } from '../../../core/capabilities/capabilities.service';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  let fixture: ComponentFixture<SiteHeader>;

  const currentUser = signal<AuthUser | null>(null);
  const isAuthenticated = signal(false);
  const isDemo = signal(false);
  const publicRegistrationEnabled = signal(false);

  const authServiceStub = {
    currentUser,
    isInitialized: signal(true),
    isAuthenticated,
    isDemo,
    logout: () => of(undefined),
  };

  beforeEach(async () => {
    currentUser.set(null);
    isAuthenticated.set(false);
    isDemo.set(false);
    publicRegistrationEnabled.set(false);

    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        {
          provide: CapabilitiesService,
          useValue: {
            publicRegistrationEnabled,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
  });

  it('keeps public registration out of the signed-out header when the capability is disabled', () => {
    const login = fixture.nativeElement.querySelector('.header-login') as HTMLAnchorElement | null;
    const register = fixture.nativeElement.querySelector(
      '.header-register',
    ) as HTMLAnchorElement | null;

    expect(login?.textContent?.trim()).toBe('Log in');
    expect(login?.getAttribute('href')).toBe('/login');
    expect(register).toBeFalsy();
  });

  it('shows Join the Vault only when public registration is enabled', () => {
    publicRegistrationEnabled.set(true);
    fixture.detectChanges();

    const register = fixture.nativeElement.querySelector(
      '.header-register',
    ) as HTMLAnchorElement | null;

    expect(register?.textContent?.trim()).toBe('Join the Vault');
    expect(register?.getAttribute('href')).toBe('/register');
  });

  it('keeps Catalogue public and hides private collector navigation anonymously', () => {
    const navigationText = getNavigationText();

    expect(navigationText).toContain('Catalogue');
    expect(navigationText).not.toContain('Collection');
    expect(navigationText).not.toContain('Wishlist');
    expect(navigationText).not.toContain('Sealed');
  });

  it('shows Collection after an authenticated session is restored', () => {
    currentUser.set({
      userId: 'collector-1',
      userName: 'paul',
      email: 'paul@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false,
    });
    isAuthenticated.set(true);
    fixture.detectChanges();

    const navigationText = getNavigationText();

    expect(navigationText).toContain('Catalogue');
    expect(navigationText).toContain('Collection');
    expect(navigationText).toContain('Wishlist');
    expect(navigationText).toContain('Sealed');
  });

  it('uses the authenticated username as the direct Account entry without adding Account to primary navigation', () => {
    currentUser.set({
      userId: 'collector-1',
      userName: 'paul',
      email: 'paul@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false,
    });
    isAuthenticated.set(true);
    fixture.detectChanges();

    const identity = fixture.nativeElement.querySelector('.header-identity') as HTMLAnchorElement;

    expect(identity.tagName).toBe('A');
    expect(identity.getAttribute('href')).toBe('/account');
    expect(identity.textContent).toContain('paul');
    expect(getNavigationText()).not.toContain('Account');
  });

  it('renders one clear Demo identity group with Collection and Wishlist navigation', () => {
    currentUser.set({
      userId: 'demo-1',
      userName: 'demo-vault',
      email: 'demo@example.com',
      roles: ['Demo'],
      emailConfirmed: true,
      twoFactorEnabled: false,
    });
    isAuthenticated.set(true);
    isDemo.set(true);
    fixture.detectChanges();

    const identity = fixture.nativeElement.querySelector('.header-identity') as HTMLElement;
    const username = fixture.nativeElement.querySelector('.header-username') as HTMLElement;
    const demoContexts = fixture.nativeElement.querySelectorAll(
      '.header-demo-context',
    ) as NodeListOf<HTMLElement>;

    expect(identity.classList.contains('header-identity--demo')).toBe(true);
    expect(username.textContent?.trim()).toBe('demo-vault');
    expect(demoContexts).toHaveLength(1);
    expect(demoContexts[0].textContent?.trim()).toBe('Demo Vault');
    expect(getNavigationText()).toContain('Collection');
    expect(getNavigationText()).toContain('Wishlist');
    expect(getNavigationText()).toContain('Sealed');
    expect(fixture.nativeElement.querySelectorAll('.brand')).toHaveLength(1);
  });

  it('keeps primary navigation geometry stable for a 20-character username', () => {
    currentUser.set({
      userId: 'collector-1',
      userName: 'short',
      email: 'collector@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false,
    });
    isAuthenticated.set(true);
    fixture.detectChanges();

    const headerInner = fixture.nativeElement.querySelector('.header-inner') as HTMLElement;
    const navigation = fixture.nativeElement.querySelector('.site-navigation') as HTMLElement;
    const actions = fixture.nativeElement.querySelector('.header-actions') as HTMLElement;
    const logout = fixture.nativeElement.querySelector('.header-logout') as HTMLButtonElement;

    const gridBefore = getComputedStyle(headerInner).gridTemplateColumns;
    const heightBefore = getComputedStyle(headerInner).minHeight;
    const actionsWidthBefore = getComputedStyle(actions).width;

    currentUser.set({
      userId: 'collector-1',
      userName: 'abcdefghijklmnopqrst',
      email: 'collector@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false,
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.site-navigation')).toBe(navigation);
    expect(fixture.nativeElement.querySelector('.header-logout')).toBe(logout);
    expect(getComputedStyle(headerInner).gridTemplateColumns).toBe(gridBefore);
    expect(getComputedStyle(headerInner).minHeight).toBe(heightBefore);
    expect(getComputedStyle(actions).width).toBe(actionsWidthBefore);
    expect(getComputedStyle(actions).justifyContent).toBe('flex-end');
  });

  it('truncates an unexpectedly long restored username inside the identity region', () => {
    const legacyUserName = 'collector-name-created-before-the-mvp-limit';

    currentUser.set({
      userId: 'legacy-collector',
      userName: legacyUserName,
      email: 'legacy@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false,
    });
    isAuthenticated.set(true);
    fixture.detectChanges();

    const identity = fixture.nativeElement.querySelector('.header-identity') as HTMLElement;
    const username = fixture.nativeElement.querySelector('.header-username') as HTMLElement;
    const actions = fixture.nativeElement.querySelector('.header-actions') as HTMLElement;

    const identityStyle = getComputedStyle(identity);
    const usernameStyle = getComputedStyle(username);
    const actionsStyle = getComputedStyle(actions);

    expect(username.textContent?.trim()).toBe(legacyUserName);
    expect(identity.getAttribute('aria-label')).toContain(legacyUserName);
    expect(identityStyle.overflow).toBe('hidden');
    expect(usernameStyle.overflow).toBe('hidden');
    expect(usernameStyle.textOverflow).toBe('ellipsis');
    expect(usernameStyle.whiteSpace).toBe('nowrap');
    expect(actionsStyle.width).toBe('300px');
  });

  it('renders the header brand mark as fixed SVG geometry', () => {
    const symbol = fixture.nativeElement.querySelector('.brand-symbol') as HTMLElement;
    const shape = symbol.querySelector('.brand-symbol-shape') as SVGElement;
    const path = shape.querySelector('path') as SVGPathElement;

    expect(shape).toBeTruthy();
    expect(shape.getAttribute('viewBox')).toBe('0 0 48 48');
    expect(path.getAttribute('d')).toBe('M0 0H37.44L48 10.56V48H10.56L0 37.44V0Z');
  });

  it('does not let a mouse press leave focus on the brand link', () => {
    const brand = fixture.nativeElement.querySelector('.brand') as HTMLAnchorElement;
    const pointerPress = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });

    brand.dispatchEvent(pointerPress);

    expect(pointerPress.defaultPrevented).toBe(true);
  });

  it('keeps the same brand presentation when authentication state changes', () => {
    const brandBefore = fixture.nativeElement.querySelector('.brand') as HTMLElement;
    const symbolBefore = fixture.nativeElement.querySelector('.brand-symbol') as HTMLElement;

    currentUser.set({
      userId: 'collector-1',
      userName: 'paul',
      email: 'paul@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false,
    });
    isAuthenticated.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.brand')).toBe(brandBefore);
    expect(fixture.nativeElement.querySelector('.brand-symbol')).toBe(symbolBefore);
    expect(fixture.nativeElement.querySelectorAll('.brand')).toHaveLength(1);
  });

  function getNavigationText(): string {
    return (
      (fixture.nativeElement.querySelector('.site-navigation') as HTMLElement).textContent ?? ''
    );
  }
});

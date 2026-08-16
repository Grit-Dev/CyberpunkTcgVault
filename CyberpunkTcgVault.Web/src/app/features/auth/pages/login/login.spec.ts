import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { AuthService } from '../../../../core/auth/auth.service';
import { CapabilitiesService } from '../../../../core/capabilities/capabilities.service';
import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let router: Router;
  let route: ActivatedRoute;

  const capabilitiesServiceStub = {
    demoAccessEnabled: signal(true),
    publicRegistrationEnabled: signal(false),
  };

  const authServiceStub = {
    isAuthenticated: signal(false),
    login: () =>
      of({
        requiresTwoFactor: false,
        user: {
          userId: '1',
          userName: 'collector',
          email: 'collector@example.com',
          roles: ['User'],
          emailConfirmed: false,
          twoFactorEnabled: false,
        },
      }),
    loginDemo: () =>
      of({
        userId: '2',
        userName: 'demo',
        email: 'demo@example.com',
        roles: ['Demo'],
        emailConfirmed: true,
        twoFactorEnabled: false,
      }),
    completeMfa: () => of({}),
    completeRecoveryLogin: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        {
          provide: CapabilitiesService,
          useValue: capabilitiesServiceStub,
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(Login);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the approved login statement', () => {
    const heading = fixture.nativeElement.querySelector('h1') as HTMLElement;

    expect(heading.textContent?.trim()).toBe('Return to your Vault.');
  });

  it('should expose Demo access only when the capability is enabled', () => {
    const demoAction = fixture.nativeElement.querySelector(
      '.login-demo__action',
    ) as HTMLButtonElement | null;

    expect(demoAction).toBeTruthy();
  });

  it('sends a direct successful Demo login to Collection', () => {
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.componentInstance.enterDemoVault();

    expect(navigateByUrl).toHaveBeenCalledTimes(1);
    expect(navigateByUrl).toHaveBeenCalledWith('/collection');
  });

  it('preserves a valid implemented Collection return destination for Demo', () => {
    vi.spyOn(route.snapshot.queryParamMap, 'get').mockImplementation((key) =>
      key === 'returnUrl' ? '/collection?page=3&q=echo&set=CVO' : null,
    );
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.componentInstance.enterDemoVault();

    expect(navigateByUrl).toHaveBeenCalledWith('/collection?page=3&q=echo&set=CVO');
  });

  it('preserves a valid implemented Wishlist return destination for Demo', () => {
    vi.spyOn(route.snapshot.queryParamMap, 'get').mockImplementation((key) =>
      key === 'returnUrl' ? '/wishlist?page=2&q=echo&set=CVO' : null,
    );
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.componentInstance.enterDemoVault();

    expect(navigateByUrl).toHaveBeenCalledWith('/wishlist?page=2&q=echo&set=CVO');
  });

  it('preserves a valid implemented Sealed return destination for Demo', () => {
    vi.spyOn(route.snapshot.queryParamMap, 'get').mockImplementation((key) =>
      key === 'returnUrl' ? '/sealed?page=2&q=display' : null,
    );
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.componentInstance.enterDemoVault();

    expect(navigateByUrl).toHaveBeenCalledWith('/sealed?page=2&q=display');
  });

  it('falls back to Collection when Demo receives a stale return destination', () => {
    vi.spyOn(route.snapshot.queryParamMap, 'get').mockImplementation((key) =>
      key === 'returnUrl' ? '/my-vault' : null,
    );
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.componentInstance.enterDemoVault();

    expect(navigateByUrl).toHaveBeenCalledWith('/collection');
  });

  it('accepts Account as a valid internal authentication return destination', () => {
    const component = fixture.componentInstance as unknown as {
      getValidAuthenticationReturnUrl: (returnUrl: string | null) => string | null;
    };

    expect(component.getValidAuthenticationReturnUrl('/account')).toBe('/account');
  });

  it('rejects malformed external-style return destinations', () => {
    const component = fixture.componentInstance as unknown as {
      getValidAuthenticationReturnUrl: (returnUrl: string | null) => string | null;
    };

    expect(component.getValidAuthenticationReturnUrl('//example.com')).toBeNull();
    expect(component.getValidAuthenticationReturnUrl('/\\example.com')).toBeNull();
    expect(component.getValidAuthenticationReturnUrl('https://example.com')).toBeNull();
  });

  it('should not expose registration when public registration is disabled', () => {
    const registerLink = fixture.nativeElement.querySelector('.login-register-link');

    expect(registerLink).toBeFalsy();
  });
});

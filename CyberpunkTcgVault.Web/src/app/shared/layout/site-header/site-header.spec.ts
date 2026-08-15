import { signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
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

  const authServiceStub = {
    currentUser,
    isInitialized: signal(true),
    isAuthenticated,
    isDemo,
    logout: () => of(undefined)
  };

  beforeEach(async () => {
    currentUser.set(null);
    isAuthenticated.set(false);
    isDemo.set(false);

    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: CapabilitiesService,
          useValue: {
            publicRegistrationEnabled: signal(false)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
  });

  it('keeps Catalogue public and hides Collection anonymously', () => {
    const navigationText = getNavigationText();

    expect(navigationText).toContain('Catalogue');
    expect(navigationText).not.toContain('Collection');
  });

  it('shows Collection after an authenticated session is restored', () => {
    currentUser.set({
      userId: 'collector-1',
      userName: 'paul',
      email: 'paul@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false
    });
    isAuthenticated.set(true);
    fixture.detectChanges();

    const navigationText = getNavigationText();

    expect(navigationText).toContain('Catalogue');
    expect(navigationText).toContain('Collection');
  });


  it('renders one clear Demo identity group with Collection navigation', () => {
    currentUser.set({
      userId: 'demo-1',
      userName: 'demo-vault',
      email: 'demo@example.com',
      roles: ['Demo'],
      emailConfirmed: true,
      twoFactorEnabled: false
    });
    isAuthenticated.set(true);
    isDemo.set(true);
    fixture.detectChanges();

    const identity = fixture.nativeElement.querySelector(
      '.header-identity'
    ) as HTMLElement;
    const username = fixture.nativeElement.querySelector(
      '.header-username'
    ) as HTMLElement;
    const demoContexts = fixture.nativeElement.querySelectorAll(
      '.header-demo-context'
    ) as NodeListOf<HTMLElement>;

    expect(identity.classList.contains('header-identity--demo')).toBe(true);
    expect(username.textContent?.trim()).toBe('demo-vault');
    expect(demoContexts).toHaveLength(1);
    expect(demoContexts[0].textContent?.trim()).toBe('Demo Vault');
    expect(getNavigationText()).toContain('Collection');
    expect(fixture.nativeElement.querySelectorAll('.brand')).toHaveLength(1);
  });

  it('keeps the same brand presentation when authentication state changes', () => {
    const brandBefore = fixture.nativeElement.querySelector(
      '.brand'
    ) as HTMLElement;
    const symbolBefore = fixture.nativeElement.querySelector(
      '.brand-symbol'
    ) as HTMLElement;

    currentUser.set({
      userId: 'collector-1',
      userName: 'paul',
      email: 'paul@example.com',
      roles: ['User'],
      emailConfirmed: true,
      twoFactorEnabled: false
    });
    isAuthenticated.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.brand')).toBe(brandBefore);
    expect(fixture.nativeElement.querySelector('.brand-symbol')).toBe(symbolBefore);
    expect(fixture.nativeElement.querySelectorAll('.brand')).toHaveLength(1);
  });

  function getNavigationText(): string {
    return (
      fixture.nativeElement.querySelector('.site-navigation') as HTMLElement
    ).textContent ?? '';
  }
});

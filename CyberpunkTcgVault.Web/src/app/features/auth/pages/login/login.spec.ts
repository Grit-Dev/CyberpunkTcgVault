import { signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { CapabilitiesService } from '../../../../core/capabilities/capabilities.service';
import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;

  const capabilitiesServiceStub = {
    demoAccessEnabled: signal(true),
    publicRegistrationEnabled: signal(false)
  };

  const authServiceStub = {
    isAuthenticated: signal(false),
    login: () => of({
      requiresTwoFactor: false,
      user: {
        userId: '1',
        userName: 'collector',
        email: 'collector@example.com',
        roles: ['User'],
        emailConfirmed: false,
        twoFactorEnabled: false
      }
    }),
    loginDemo: () => of({
      userId: '2',
      userName: 'demo',
      email: 'demo@example.com',
      roles: ['Demo'],
      emailConfirmed: true,
      twoFactorEnabled: false
    }),
    completeMfa: () => of({}),
    completeRecoveryLogin: () => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: CapabilitiesService,
          useValue: capabilitiesServiceStub
        }
      ]
    }).compileComponents();

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
      '.login-demo__action'
    ) as HTMLButtonElement | null;

    expect(demoAction).toBeTruthy();
  });

  it('should not expose registration when public registration is disabled', () => {
    const registerLink = fixture.nativeElement.querySelector(
      '.login-register-link'
    );

    expect(registerLink).toBeFalsy();
  });
});

import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  Observable,
  of,
  throwError
} from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { CapabilitiesService } from '../../../../core/capabilities/capabilities.service';
import { Register } from './register';

describe('Register', () => {
  let fixture: ComponentFixture<Register>;
  let registerResult$: Observable<unknown>;

  const publicRegistrationEnabled = signal(false);

  const capabilitiesServiceStub = {
    isLoaded: signal(true),
    publicRegistrationEnabled,
    load: () => of({
      publicRegistrationEnabled: publicRegistrationEnabled(),
      demoAccessEnabled: true
    })
  };

  const authServiceStub = {
    register: () => registerResult$
  };

  beforeEach(async () => {
    publicRegistrationEnabled.set(false);
    registerResult$ = of({
      message: 'User registered successfully.'
    });

    await TestBed.configureTestingModule({
      imports: [Register],
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

    fixture = TestBed.createComponent(Register);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not expose a registration form when registration is disabled', () => {
    const form = fixture.nativeElement.querySelector('form');
    const heading = fixture.nativeElement.querySelector('h1') as HTMLElement;

    expect(form).toBeFalsy();
    expect(heading.textContent?.trim()).toBe('Registration is not open.');
  });

  it('should reject an email address entered as the username', () => {
    publicRegistrationEnabled.set(true);
    fixture.detectChanges();

    const userName = fixture.componentInstance.registerForm.controls.userName;
    userName.setValue('collector@example.com');
    userName.markAsTouched();

    expect(userName.hasError('pattern')).toBe(true);
    expect(fixture.componentInstance.registerForm.invalid).toBe(true);
  });

  it('should restore the submit state and show a safe message after a 409 conflict', () => {
    publicRegistrationEnabled.set(true);

    registerResult$ = throwError(() => new HttpErrorResponse({
      status: 409
    }));

    const component = fixture.componentInstance;
    component.registerForm.setValue({
      userName: 'nightcity_guest',
      email: 'collector@example.com',
      password: 'password123'
    });

    component.submitRegistration();

    expect(component.isSubmitting()).toBe(false);
    expect(component.registrationError()).toContain(
      'Try a different username or email'
    );
  });
});

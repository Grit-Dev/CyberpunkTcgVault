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
  let registerCalls: number;

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
    register: () => {
      registerCalls += 1;
      return registerResult$;
    }
  };

  beforeEach(async () => {
    publicRegistrationEnabled.set(false);
    registerCalls = 0;
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

  it('rejects a 2-character username', () => {
    publicRegistrationEnabled.set(true);
    fixture.detectChanges();

    const userName = fixture.componentInstance.registerForm.controls.userName;
    userName.setValue('ab');
    userName.markAsTouched();
    fixture.detectChanges();

    expect(userName.hasError('usernameLength')).toBe(true);
    expect(fixture.nativeElement.querySelector('#register-username-error')?.textContent?.trim()).toBe(
      'Username must be between 3 and 20 characters.'
    );
  });

  it('does not submit when the username is outside the MVP length rule', () => {
    publicRegistrationEnabled.set(true);

    const component = fixture.componentInstance;
    component.registerForm.setValue({
      userName: 'ab',
      email: 'collector@example.com',
      password: 'password123'
    });

    component.submitRegistration();

    expect(registerCalls).toBe(0);
    expect(component.isSubmitting()).toBe(false);
  });

  it('accepts a 3-character username', () => {
    const userName = fixture.componentInstance.registerForm.controls.userName;
    userName.setValue('abc');

    expect(userName.valid).toBe(true);
  });

  it('accepts a 20-character username', () => {
    const userName = fixture.componentInstance.registerForm.controls.userName;
    userName.setValue('abcdefghijklmnopqrst');

    expect(userName.valid).toBe(true);
  });

  it('rejects a 21-character username', () => {
    const userName = fixture.componentInstance.registerForm.controls.userName;
    userName.setValue('abcdefghijklmnopqrstu');

    expect(userName.hasError('usernameLength')).toBe(true);
  });

  it('validates username length after trimming surrounding whitespace', () => {
    const userName = fixture.componentInstance.registerForm.controls.userName;

    userName.setValue(' a ');
    expect(userName.hasError('usernameLength')).toBe(true);

    userName.setValue('  abc  ');
    expect(userName.valid).toBe(true);
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

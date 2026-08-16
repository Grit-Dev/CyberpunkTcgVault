import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { ForgotPassword } from './forgot-password';

describe('ForgotPassword', () => {
  let fixture: ComponentFixture<ForgotPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassword],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            forgotPassword: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassword);
    fixture.detectChanges();
  });

  it('shows the same neutral completion message after a successful request', () => {
    const component = fixture.componentInstance;
    component.forgotPasswordForm.setValue({
      email: 'collector@example.com',
    });

    component.submit();
    fixture.detectChanges();

    expect(component.isComplete()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain(
      'If an account exists for that email, a password reset link has been sent.',
    );
  });
});

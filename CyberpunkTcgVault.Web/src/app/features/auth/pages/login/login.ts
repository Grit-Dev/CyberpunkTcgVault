import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  signal
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { CapabilitiesService } from '../../../../core/capabilities/capabilities.service';

type MfaMode = 'authenticator' | 'recovery' | null;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  readonly loginForm;
  readonly mfaForm;
  readonly recoveryForm;

  readonly isSubmitting = signal(false);
  readonly isDemoSubmitting = signal(false);
  readonly authError = signal('');
  readonly registeredMessage = signal('');
  readonly mfaMode = signal<MfaMode>(null);

  constructor(
    private readonly formBuilder: FormBuilder,
    readonly authService: AuthService,
    readonly capabilitiesService: CapabilitiesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(256)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128)
        ]
      ]
    });

    this.mfaForm = this.formBuilder.nonNullable.group({
      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ]
    });

    this.recoveryForm = this.formBuilder.nonNullable.group({
      recoveryCode: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ]
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('registered') === '1') {
      this.registeredMessage.set('Account created. Sign in to continue.');
    }
  }

  submitLogin(): void {
    this.authError.set('');
    this.registeredMessage.set('');
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.authService.login(this.loginForm.getRawValue())
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: response => {
          if (response.requiresTwoFactor) {
            this.mfaMode.set('authenticator');
            this.mfaForm.reset();
            this.recoveryForm.reset();
            return;
          }

          this.navigateAfterAuthentication();
        },
        error: error => {
          this.authError.set(this.getLoginError(error));
        }
      });
  }

  submitMfa(): void {
    this.authError.set('');
    this.mfaForm.markAllAsTouched();

    if (this.mfaForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.authService.completeMfa(
      this.mfaForm.controls.code.value
    )
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.navigateAfterAuthentication();
        },
        error: error => {
          this.authError.set(this.getMfaError(error, 'authenticator'));
        }
      });
  }

  submitRecoveryCode(): void {
    this.authError.set('');
    this.recoveryForm.markAllAsTouched();

    if (this.recoveryForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.authService.completeRecoveryLogin(
      this.recoveryForm.controls.recoveryCode.value
    )
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.navigateAfterAuthentication();
        },
        error: error => {
          this.authError.set(this.getMfaError(error, 'recovery'));
        }
      });
  }

  enterDemoVault(): void {
    this.authError.set('');

    if (
      this.isDemoSubmitting() ||
      !this.capabilitiesService.demoAccessEnabled()
    ) {
      return;
    }

    this.isDemoSubmitting.set(true);

    this.authService.loginDemo()
      .pipe(
        finalize(() => {
          this.isDemoSubmitting.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.navigateAfterAuthentication();
        },
        error: error => {
          this.authError.set(this.getDemoError(error));
        }
      });
  }

  useRecoveryCode(): void {
    this.authError.set('');
    this.mfaMode.set('recovery');
  }

  useAuthenticatorCode(): void {
    this.authError.set('');
    this.mfaMode.set('authenticator');
  }

  private navigateAfterAuthentication(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    // Only permit an internal Choom Vault path as a return destination.
    // This avoids creating an open redirect through a future returnUrl.
    const destination =
      returnUrl?.startsWith('/') && !returnUrl.startsWith('//')
        ? returnUrl
        : '/cards';

    void this.router.navigateByUrl(destination);
  }

  private getLoginError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'We could not sign you in. Try again.';
    }

    if (error.status === 401) {
      return "We couldn't sign you in. Check your details and try again.";
    }

    if (error.status === 429) {
      return 'Too many sign-in attempts. Try again shortly.';
    }

    return 'We could not sign you in. Try again.';
  }

  private getMfaError(
    error: unknown,
    mode: 'authenticator' | 'recovery'
  ): string {
    if (error instanceof HttpErrorResponse && error.status === 429) {
      return 'Too many verification attempts. Try again shortly.';
    }

    if (error instanceof HttpErrorResponse && error.status === 401) {
      return mode === 'authenticator'
        ? 'That authenticator code was not accepted. Check the code and try again.'
        : 'That recovery code was not accepted. Check the code and try again.';
    }

    return 'We could not complete sign-in. Try again.';
  }

  private getDemoError(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 429) {
      return 'Demo access has been requested too often. Try again shortly.';
    }

    if (
      error instanceof HttpErrorResponse &&
      (error.status === 404 || error.status === 503)
    ) {
      return 'Demo access is temporarily unavailable.';
    }

    return 'We could not open the Demo Vault. Try again.';
  }
}

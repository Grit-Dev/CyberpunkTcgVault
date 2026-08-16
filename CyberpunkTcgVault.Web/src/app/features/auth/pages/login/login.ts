import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { CapabilitiesService } from '../../../../core/capabilities/capabilities.service';

type MfaMode = 'authenticator' | 'recovery' | null;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  readonly loginForm;
  readonly mfaForm;
  readonly recoveryForm;

  readonly isSubmitting = signal(false);
  readonly isDemoSubmitting = signal(false);
  readonly authError = signal('');
  readonly registeredMessage = signal('');
  readonly collectorIntent = signal<'collection' | 'wishlist' | null>(null);
  readonly mfaMode = signal<MfaMode>(null);

  constructor(
    private readonly formBuilder: FormBuilder,
    readonly authService: AuthService,
    readonly capabilitiesService: CapabilitiesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
    });

    this.mfaForm = this.formBuilder.nonNullable.group({
      code: ['', [Validators.required, Validators.maxLength(20)]],
    });

    this.recoveryForm = this.formBuilder.nonNullable.group({
      recoveryCode: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('registered') === '1') {
      this.registeredMessage.set('Account created. Sign in to continue.');
    } else if (this.route.snapshot.queryParamMap.get('passwordReset') === '1') {
      this.registeredMessage.set('Password updated. Sign in with your new password.');
    }

    const intent = this.route.snapshot.queryParamMap.get('intent');

    if (intent === 'collection' || intent === 'wishlist') {
      this.collectorIntent.set(intent);
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

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          if (response.requiresTwoFactor) {
            this.mfaMode.set('authenticator');
            this.mfaForm.reset();
            this.recoveryForm.reset();
            return;
          }

          this.navigateAfterAuthentication();
        },
        error: (error) => {
          this.authError.set(this.getLoginError(error));
        },
      });
  }

  submitMfa(): void {
    this.authError.set('');
    this.mfaForm.markAllAsTouched();

    if (this.mfaForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.authService
      .completeMfa(this.mfaForm.controls.code.value)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.navigateAfterAuthentication();
        },
        error: (error) => {
          this.authError.set(this.getMfaError(error, 'authenticator'));
        },
      });
  }

  submitRecoveryCode(): void {
    this.authError.set('');
    this.recoveryForm.markAllAsTouched();

    if (this.recoveryForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.authService
      .completeRecoveryLogin(this.recoveryForm.controls.recoveryCode.value)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.navigateAfterAuthentication();
        },
        error: (error) => {
          this.authError.set(this.getMfaError(error, 'recovery'));
        },
      });
  }

  enterDemoVault(): void {
    this.authError.set('');

    if (this.isDemoSubmitting() || !this.capabilitiesService.demoAccessEnabled()) {
      return;
    }

    this.isDemoSubmitting.set(true);

    this.authService
      .loginDemo()
      .pipe(
        finalize(() => {
          this.isDemoSubmitting.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.navigateAfterAuthentication('/collection');
        },
        error: (error) => {
          this.authError.set(this.getDemoError(error));
        },
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

  private navigateAfterAuthentication(fallbackDestination = '/cards'): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const destination = this.getValidAuthenticationReturnUrl(returnUrl) ?? fallbackDestination;

    void this.router.navigateByUrl(destination);
  }

  /**
   * Authentication return URLs are intentionally limited to product journeys
   * that currently exist and can legitimately lead through Login. This keeps a
   * stale pre-MVP route (for example /my-vault) from authenticating correctly
   * and then dropping the collector onto the global 404 page.
   */
  private getValidAuthenticationReturnUrl(returnUrl: string | null): string | null {
    if (
      !returnUrl ||
      !returnUrl.startsWith('/') ||
      returnUrl.startsWith('//') ||
      returnUrl.includes('\\')
    ) {
      return null;
    }

    try {
      const urlTree = this.router.parseUrl(returnUrl);
      const primarySegments =
        urlTree.root.children['primary']?.segments.map((segment) => segment.path) ?? [];

      // Implemented private MVP utilities preserve their query state so a
      // guarded Collection/Wishlist/Sealed URL can return to the same page/filter.
      if (
        primarySegments.length === 1 &&
        (primarySegments[0] === 'collection' ||
          primarySegments[0] === 'wishlist' ||
          primarySegments[0] === 'sealed' ||
          primarySegments[0] === 'account')
      ) {
        return returnUrl;
      }

      // Card Detail can legitimately send a signed-out collector to Login after
      // they choose an exact Printing action. Preserve that inspection context.
      if (
        primarySegments.length === 2 &&
        primarySegments[0] === 'cards' &&
        primarySegments[1].length > 0
      ) {
        return returnUrl;
      }
    } catch {
      return null;
    }

    return null;
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

  private getMfaError(error: unknown, mode: 'authenticator' | 'recovery'): string {
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

    if (error instanceof HttpErrorResponse && (error.status === 404 || error.status === 503)) {
      return 'Demo access is temporarily unavailable.';
    }

    return 'We could not open the Demo Vault. Try again.';
  }
}

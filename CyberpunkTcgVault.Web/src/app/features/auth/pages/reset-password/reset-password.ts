import {
  Location
} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  signal
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';

const matchingPasswords: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('newPassword')?.value as string | undefined;
  const confirmPassword = control.get('confirmPassword')?.value as string | undefined;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
};

/**
 * Completes backend-owned Identity password reset.
 *
 * The opaque reset token is read once into memory and immediately removed from
 * the visible URL. It is never stored in localStorage/sessionStorage and the
 * browser never attempts to validate or interpret it.
 */
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.html',
  styleUrl: '../../styles/auth-recovery.scss'
})
export class ResetPassword implements OnInit {
  readonly resetPasswordForm;
  readonly isSubmitting = signal(false);
  readonly resetError = signal('');
  readonly hasValidLink = signal(false);

  private readonly userId = signal('');
  private readonly token = signal('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {
    this.resetPasswordForm = this.formBuilder.nonNullable.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(128)
          ]
        ],
        confirmPassword: [
          '',
          [Validators.required]
        ]
      },
      { validators: matchingPasswords }
    );
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId')?.trim() ?? '';
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';

    if (!userId || !token) {
      this.hasValidLink.set(false);
      return;
    }

    this.userId.set(userId);
    this.token.set(token);
    this.hasValidLink.set(true);

    // Reset tokens are bearer-like secrets. Keep them in component memory and
    // remove them from the address bar/history entry after Angular reads them.
    this.location.replaceState('/reset-password');
  }

  submit(): void {
    this.resetError.set('');
    this.resetPasswordForm.markAllAsTouched();

    if (
      !this.hasValidLink() ||
      this.resetPasswordForm.invalid ||
      this.isSubmitting()
    ) {
      return;
    }

    this.isSubmitting.set(true);

    this.authService
      .resetPassword({
        userId: this.userId(),
        token: this.token(),
        newPassword: this.resetPasswordForm.controls.newPassword.value
      })
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: () => {
          // Clear the in-memory token before leaving this component.
          this.userId.set('');
          this.token.set('');
          void this.router.navigate(['/login'], {
            queryParams: { passwordReset: '1' }
          });
        },
        error: error => {
          this.resetError.set(this.getResetError(error));
        }
      });
  }

  private getResetError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'We could not reset your password. Request a new reset link and try again.';
    }

    if (error.status === 429) {
      return 'Too many password-reset attempts. Try again shortly.';
    }

    if (error.status === 400) {
      const validationMessage = this.getSafeValidationMessage(error.error);

      return validationMessage ??
        'This reset link is invalid or has expired. Request a new password reset link.';
    }

    return 'We could not reset your password. Request a new reset link and try again.';
  }

  private getSafeValidationMessage(body: unknown): string | null {
    if (!body || typeof body !== 'object') {
      return null;
    }

    const errors = (body as { errors?: unknown }).errors;

    if (Array.isArray(errors)) {
      const messages = errors.filter(
        (value): value is string => typeof value === 'string'
      );

      return messages.length > 0 ? messages.join(' ') : null;
    }

    if (!errors || typeof errors !== 'object') {
      return null;
    }

    const messages = Object.values(errors)
      .flatMap(value => Array.isArray(value) ? value : [])
      .filter((value): value is string => typeof value === 'string');

    return messages.length > 0 ? messages.join(' ') : null;
  }
}

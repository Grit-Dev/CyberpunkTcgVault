import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  signal
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';

/**
 * Public password-recovery request.
 *
 * The success state is deliberately neutral. The browser never learns whether
 * the supplied email address belongs to an account.
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: '../../styles/auth-recovery.scss'
})
export class ForgotPassword {
  readonly forgotPasswordForm;
  readonly isSubmitting = signal(false);
  readonly isComplete = signal(false);
  readonly requestError = signal('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.forgotPasswordForm = this.formBuilder.nonNullable.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(256)
        ]
      ]
    });
  }

  submit(): void {
    this.requestError.set('');
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    this.authService
      .forgotPassword(this.forgotPasswordForm.controls.email.value)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.isComplete.set(true);
        },
        error: error => {
          this.requestError.set(this.getRequestError(error));
        }
      });
  }

  private getRequestError(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 429) {
      return 'Too many password-recovery attempts. Try again shortly.';
    }

    if (error instanceof HttpErrorResponse && error.status === 400) {
      return 'Enter a valid email address and try again.';
    }

    return 'We could not start password recovery. Try again.';
  }
}

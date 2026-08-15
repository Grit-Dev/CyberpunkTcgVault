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
  Router,
  RouterLink
} from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { CapabilitiesService } from '../../../../core/capabilities/capabilities.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {
  readonly registerForm;

  readonly isSubmitting = signal(false);
  readonly registrationError = signal('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    readonly capabilitiesService: CapabilitiesService,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.nonNullable.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          // Username and email are separate concepts. This is UX validation;
          // the API must enforce the same rule server-side.
          Validators.pattern(/^[^@\s]+$/)
        ]
      ],
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
  }

  ngOnInit(): void {
    this.capabilitiesService.load().subscribe();
  }

  submitRegistration(): void {
    this.registrationError.set('');
    this.registerForm.markAllAsTouched();

    if (
      !this.capabilitiesService.publicRegistrationEnabled() ||
      this.registerForm.invalid ||
      this.isSubmitting()
    ) {
      return;
    }

    this.isSubmitting.set(true);

    const formValue = this.registerForm.getRawValue();

    const request = {
      userName: formValue.userName.trim(),
      email: formValue.email.trim(),
      password: formValue.password
    };

    this.authService.register(request)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: () => {
          void this.router.navigate(
            ['/login'],
            {
              queryParams: {
                registered: '1'
              }
            }
          );
        },
        error: error => {
          this.registrationError.set(this.getRegistrationError(error));
        }
      });
  }

  private getRegistrationError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'We could not create your account. Try again.';
    }

    if (error.status === 404) {
      return 'Public registration is not available.';
    }

    if (error.status === 409) {
      return 'We could not create that account. Try a different username or email, or log in if you already have an account.';
    }

    if (error.status === 400) {
      return 'Please review your account details and try again.';
    }

    if (error.status === 429) {
      return 'Too many registration attempts. Try again shortly.';
    }

    return 'We could not create your account. Try again.';
  }
}

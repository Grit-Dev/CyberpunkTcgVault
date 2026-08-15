import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthUser } from '../../../../core/auth/auth.models';
import { AuthService } from '../../../../core/auth/auth.service';
import { AccountService } from '../../services/account.service';

/**
 * Quiet authenticated account-maintenance surface.
 *
 * Username/email are read-only because the current backend exposes no account
 * update endpoint. The only account lifecycle mutation in the MVP contract is
 * deletion for normal User-role accounts.
 */
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})
export class Account implements OnInit {
  @ViewChild('deleteDialog')
  private deleteDialog?: ElementRef<HTMLDialogElement>;

  @ViewChild('deleteTrigger')
  private deleteTrigger?: ElementRef<HTMLButtonElement>;

  @ViewChild('deletePassword')
  private deletePassword?: ElementRef<HTMLInputElement>;

  readonly isLoading = signal(true);
  readonly loadError = signal(false);
  readonly account = signal<AuthUser | null>(null);
  readonly isLoggingOut = signal(false);
  readonly logoutError = signal<string | null>(null);
  readonly isDeleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  readonly deleteForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.deleteForm = this.formBuilder.nonNullable.group({
      currentPassword: [
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
    this.loadAccount();
  }

  retry(): void {
    this.loadAccount();
  }

  logout(): void {
    if (this.isLoggingOut()) {
      return;
    }

    this.logoutError.set(null);
    this.isLoggingOut.set(true);

    this.authService.logout()
      .pipe(finalize(() => this.isLoggingOut.set(false)))
      .subscribe({
        next: () => {
          void this.router.navigate(['/']);
        },
        error: error => {
          if (this.handleSessionError(error)) {
            return;
          }

          this.logoutError.set("We couldn't log you out. Try again.");
        }
      });
  }

  canDeleteAccount(): boolean {
    const user = this.account();

    if (!user) {
      return false;
    }

    // The backend AccountDelete policy is intentionally User-only. Demo and
    // Admin identities are shared/privileged and cannot use self-service
    // deletion. Two-factor account deletion is also outside this MVP surface.
    return (
      user.roles.includes('User') &&
      !user.roles.includes('Demo') &&
      !user.roles.includes('Admin') &&
      !user.twoFactorEnabled
    );
  }

  isDemoAccount(): boolean {
    return this.account()?.roles.includes('Demo') ?? false;
  }

  openDeleteDialog(): void {
    if (!this.canDeleteAccount() || this.isDeleting()) {
      return;
    }

    this.deleteError.set(null);
    this.deleteForm.reset({ currentPassword: '' });

    const dialog = this.deleteDialog?.nativeElement;

    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();

    queueMicrotask(() => {
      this.deletePassword?.nativeElement.focus();
    });
  }

  cancelDelete(): void {
    if (this.isDeleting()) {
      return;
    }

    this.deleteError.set(null);
    this.deleteForm.reset({ currentPassword: '' });
    this.deleteDialog?.nativeElement.close();
    this.returnFocusToDeleteTrigger();
  }

  onDeleteDialogCancel(event: Event): void {
    event.preventDefault();

    if (!this.isDeleting()) {
      this.cancelDelete();
    }
  }

  confirmDelete(): void {
    this.deleteError.set(null);
    this.deleteForm.markAllAsTouched();

    if (
      !this.canDeleteAccount() ||
      this.deleteForm.invalid ||
      this.isDeleting()
    ) {
      return;
    }

    this.isDeleting.set(true);

    this.accountService
      .deleteAccount(this.deleteForm.controls.currentPassword.value)
      .pipe(finalize(() => this.isDeleting.set(false)))
      .subscribe({
        next: () => {
          this.deleteDialog?.nativeElement.close();

          // DELETE /api/Account signs out the server-side Identity session.
          // Reuse AuthService's existing local-session cleanup so stale private
          // navigation cannot remain visible after successful deletion.
          this.authService.clearAuthenticatedSession();
          void this.router.navigate(['/']);
        },
        error: error => {
          if (this.handleSessionError(error)) {
            this.deleteDialog?.nativeElement.close();
            return;
          }

          this.deleteError.set(
            "We couldn't delete your account. Try again."
          );
        }
      });
  }

  private loadAccount(): void {
    this.isLoading.set(true);
    this.loadError.set(false);

    this.accountService
      .load()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: user => this.account.set(user),
        error: error => {
          if (this.handleSessionError(error)) {
            return;
          }

          this.loadError.set(true);
        }
      });
  }

  private handleSessionError(error: unknown): boolean {
    if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
      return false;
    }

    void this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: '/account'
      }
    });

    return true;
  }

  private returnFocusToDeleteTrigger(): void {
    queueMicrotask(() => {
      this.deleteTrigger?.nativeElement.focus();
    });
  }
}

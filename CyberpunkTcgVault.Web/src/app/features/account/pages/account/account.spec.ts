import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../core/auth/auth.service';
import { AccountService } from '../../services/account.service';
import { Account } from './account';

const normalUser = {
  userId: 'collector-1',
  userName: 'IAMATEST',
  email: 'collector@example.com',
  roles: ['User'],
  emailConfirmed: true,
  twoFactorEnabled: false,
};

const demoUser = {
  ...normalUser,
  userId: 'demo-1',
  userName: 'Demo',
  email: 'demo@example.com',
  roles: ['Demo'],
};

describe('Account', () => {
  let fixture: ComponentFixture<Account>;
  let loadResult: typeof normalUser;
  let deleteResult: 'success' | 'failure';

  const currentUser = signal(normalUser);
  const authServiceStub = {
    currentUser,
    isDemo: signal(false),
    logout: () => of(undefined),
    clearAuthenticatedSession: vi.fn(),
  };

  const accountServiceStub = {
    load: () => of(loadResult),
    deleteAccount: () =>
      deleteResult === 'success'
        ? of(undefined)
        : throwError(() => new HttpErrorResponse({ status: 400 })),
  };

  beforeEach(async () => {
    // jsdom exposes <dialog> but does not currently implement the modal
    // methods that browsers provide. Keep the component production-native and
    // supply the smallest test-only behaviour needed by these interaction tests.
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function (): void {
        this.open = true;
      };
    }

    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function (): void {
        this.open = false;
      };
    }

    loadResult = normalUser;
    deleteResult = 'success';
    currentUser.set(normalUser);
    authServiceStub.isDemo.set(false);
    authServiceStub.clearAuthenticatedSession.mockClear();

    await TestBed.configureTestingModule({
      imports: [Account],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceStub },
        { provide: AccountService, useValue: accountServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Account);
    fixture.detectChanges();
  });

  it('shows only the collector-facing username and email as read-only account details', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Your Vault. Your account.');
    expect(text).toContain('IAMATEST');
    expect(text).toContain('collector@example.com');
    expect(text).not.toContain('collector-1');
    expect(fixture.nativeElement.querySelector('input[type="email"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('input[name="username"]')).toBeNull();
  });

  it('shows deletion for a normal User account and requires the current password in the confirmation dialog', () => {
    const deleteButton = fixture.nativeElement.querySelector(
      '.account-delete__trigger',
    ) as HTMLButtonElement;

    expect(deleteButton).toBeTruthy();

    deleteButton.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector(
      '.account-delete-dialog',
    ) as HTMLDialogElement;
    const password = fixture.nativeElement.querySelector(
      '#account-delete-password',
    ) as HTMLInputElement;

    expect(dialog.open).toBe(true);
    expect(password.getAttribute('autocomplete')).toBe('current-password');
    expect(dialog.textContent).toContain(
      'Account lifecycleDelete your account? This permanently removes your Choom Vault account and private collector records. This cannot be undone. Current password Cancel  Delete account',
    );
    expect(dialog.textContent).toContain('This cannot be undone.');
  });

  it('does not render a destructive delete action for Demo', () => {
    loadResult = demoUser;
    fixture = TestBed.createComponent(Account);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.account-delete__trigger')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain(
      'Account deletion is unavailable in the Demo Vault.',
    );
  });

  it('keeps the account intact and surfaces the approved message when deletion fails', () => {
    deleteResult = 'failure';

    const deleteButton = fixture.nativeElement.querySelector(
      '.account-delete__trigger',
    ) as HTMLButtonElement;
    deleteButton.click();
    fixture.detectChanges();

    const password = fixture.nativeElement.querySelector(
      '#account-delete-password',
    ) as HTMLInputElement;
    password.value = 'password-123';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submit = fixture.nativeElement.querySelector(
      '.account-dialog-delete',
    ) as HTMLButtonElement;
    submit.click();
    fixture.detectChanges();

    expect(authServiceStub.clearAuthenticatedSession).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain(
      "We couldn't delete your account. Try again.",
    );
  });
});

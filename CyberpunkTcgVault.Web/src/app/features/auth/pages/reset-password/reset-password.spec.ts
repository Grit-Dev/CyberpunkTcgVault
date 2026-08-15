import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter
} from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { ResetPassword } from './reset-password';

describe('ResetPassword', () => {
  let fixture: ComponentFixture<ResetPassword>;
  let resetRequest: unknown;

  beforeEach(async () => {
    resetRequest = undefined;

    await TestBed.configureTestingModule({
      imports: [ResetPassword],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({
                userId: 'user-id',
                token: 'opaque-token'
              })
            }
          }
        },
        {
          provide: AuthService,
          useValue: {
            resetPassword: (request: unknown) => {
              resetRequest = request;
              return of(undefined);
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('accepts a complete backend-issued reset link', () => {
    expect(fixture.componentInstance.hasValidLink()).toBe(true);
  });

  it('submits matching passwords with the backend-issued token', () => {
    const component = fixture.componentInstance;

    component.resetPasswordForm.setValue({
      newPassword: 'new-password-123',
      confirmPassword: 'new-password-123'
    });

    component.submit();

    expect(resetRequest).toEqual({
      userId: 'user-id',
      token: 'opaque-token',
      newPassword: 'new-password-123'
    });
  });
});

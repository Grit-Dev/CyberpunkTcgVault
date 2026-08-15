import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../../core/auth/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function ResetPassword_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 2)(1, "p", 3);
    i0.ɵɵtext(2, "Password Recovery");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 4);
    i0.ɵɵtext(4, "Reset link unavailable.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " This password reset link is incomplete or no longer available. Request a new link and try again. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 5);
    i0.ɵɵtext(8, "Request a New Link");
    i0.ɵɵelementEnd()();
} }
function ResetPassword_Conditional_3_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.resetError(), " ");
} }
function ResetPassword_Conditional_3_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1, "Enter a new password.");
    i0.ɵɵelementEnd();
} }
function ResetPassword_Conditional_3_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1, "Password must be between 8 and 128 characters.");
    i0.ɵɵelementEnd();
} }
function ResetPassword_Conditional_3_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, "Confirm your new password.");
    i0.ɵɵelementEnd();
} }
function ResetPassword_Conditional_3_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, "Passwords do not match.");
    i0.ɵɵelementEnd();
} }
function ResetPassword_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 6)(1, "p", 3);
    i0.ɵɵtext(2, "Password Recovery");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 7);
    i0.ɵɵtext(4, "Choose a new password.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " Set the password you'll use the next time you return to your private Choom Vault collection. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "section", 8)(8, "div", 9)(9, "h2", 10);
    i0.ɵɵtext(10, "New Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12, "The reset link is validated by the backend when you submit.");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(13, ResetPassword_Conditional_3_Conditional_13_Template, 2, 1, "p", 11);
    i0.ɵɵelementStart(14, "form", 12);
    i0.ɵɵlistener("ngSubmit", function ResetPassword_Conditional_3_Template_form_ngSubmit_14_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(15, "div", 13)(16, "label", 14);
    i0.ɵɵtext(17, "New password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "input", 15);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(19, "p", 16);
    i0.ɵɵtext(20, "Use at least 8 characters.");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(21, ResetPassword_Conditional_3_Conditional_21_Template, 2, 0, "p", 17)(22, ResetPassword_Conditional_3_Conditional_22_Template, 2, 0, "p", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 13)(24, "label", 18);
    i0.ɵɵtext(25, "Confirm password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "input", 19);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(27, ResetPassword_Conditional_3_Conditional_27_Template, 2, 0, "p", 20)(28, ResetPassword_Conditional_3_Conditional_28_Template, 2, 0, "p", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 21);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "p", 22);
    i0.ɵɵtext(32, " Need another link? ");
    i0.ɵɵelementStart(33, "a", 23);
    i0.ɵɵtext(34, "Request password reset");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵconditional(ctx_r1.resetError() ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.resetPasswordForm);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.resetPasswordForm.controls.newPassword.invalid && ctx_r1.resetPasswordForm.controls.newPassword.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.resetPasswordForm.controls.newPassword.touched && ctx_r1.resetPasswordForm.controls.newPassword.hasError("required") ? 21 : ctx_r1.resetPasswordForm.controls.newPassword.touched && ctx_r1.resetPasswordForm.controls.newPassword.invalid ? 22 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵattribute("aria-invalid", ctx_r1.resetPasswordForm.controls.confirmPassword.invalid && ctx_r1.resetPasswordForm.controls.confirmPassword.touched || ctx_r1.resetPasswordForm.hasError("passwordMismatch") && ctx_r1.resetPasswordForm.controls.confirmPassword.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.resetPasswordForm.controls.confirmPassword.touched && ctx_r1.resetPasswordForm.controls.confirmPassword.hasError("required") ? 27 : ctx_r1.resetPasswordForm.controls.confirmPassword.touched && ctx_r1.resetPasswordForm.hasError("passwordMismatch") ? 28 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting() ? "Updating password\u2026" : "Update Password", " ");
} }
const matchingPasswords = (control) => {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
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
export class ResetPassword {
    formBuilder;
    authService;
    route;
    router;
    location;
    resetPasswordForm;
    isSubmitting = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    resetError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resetError" }] : /* istanbul ignore next */ []));
    hasValidLink = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasValidLink" }] : /* istanbul ignore next */ []));
    userId = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "userId" }] : /* istanbul ignore next */ []));
    token = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "token" }] : /* istanbul ignore next */ []));
    constructor(formBuilder, authService, route, router, location) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.resetPasswordForm = this.formBuilder.nonNullable.group({
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
        }, { validators: matchingPasswords });
    }
    ngOnInit() {
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
    submit() {
        this.resetError.set('');
        this.resetPasswordForm.markAllAsTouched();
        if (!this.hasValidLink() ||
            this.resetPasswordForm.invalid ||
            this.isSubmitting()) {
            return;
        }
        this.isSubmitting.set(true);
        this.authService
            .resetPassword({
            userId: this.userId(),
            token: this.token(),
            newPassword: this.resetPasswordForm.controls.newPassword.value
        })
            .pipe(finalize(() => {
            this.isSubmitting.set(false);
        }))
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
    getResetError(error) {
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
    getSafeValidationMessage(body) {
        if (!body || typeof body !== 'object') {
            return null;
        }
        const errors = body.errors;
        if (Array.isArray(errors)) {
            const messages = errors.filter((value) => typeof value === 'string');
            return messages.length > 0 ? messages.join(' ') : null;
        }
        if (!errors || typeof errors !== 'object') {
            return null;
        }
        const messages = Object.values(errors)
            .flatMap(value => Array.isArray(value) ? value : [])
            .filter((value) => typeof value === 'string');
        return messages.length > 0 ? messages.join(' ') : null;
    }
    static ɵfac = function ResetPassword_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || ResetPassword)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i4.Location)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResetPassword, selectors: [["app-reset-password"]], decls: 4, vars: 1, consts: [[1, "auth-recovery-page"], [1, "auth-recovery-layout"], ["aria-labelledby", "invalid-reset-title", 1, "auth-recovery-status"], [1, "eyebrow"], ["id", "invalid-reset-title"], ["routerLink", "/forgot-password", 1, "btn", "btn--primary"], ["aria-labelledby", "reset-password-title", 1, "auth-recovery-intro"], ["id", "reset-password-title"], ["aria-labelledby", "new-password-title", 1, "auth-recovery-form-area"], [1, "auth-recovery-form-heading"], ["id", "new-password-title"], ["role", "alert", 1, "form-message", "form-message--error"], ["novalidate", "", 1, "form-stack", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "reset-new-password", 1, "form-label"], ["id", "reset-new-password", "type", "password", "formControlName", "newPassword", "autocomplete", "new-password", "aria-describedby", "reset-password-help reset-password-error", 1, "form-control"], ["id", "reset-password-help", 1, "form-help"], ["id", "reset-password-error", 1, "form-error"], ["for", "reset-confirm-password", 1, "form-label"], ["id", "reset-confirm-password", "type", "password", "formControlName", "confirmPassword", "autocomplete", "new-password", "aria-describedby", "reset-confirm-error", 1, "form-control"], ["id", "reset-confirm-error", 1, "form-error"], ["type", "submit", 1, "btn", "btn--primary", "auth-recovery-submit", 3, "disabled"], [1, "auth-recovery-back"], ["routerLink", "/forgot-password"]], template: function ResetPassword_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, ResetPassword_Conditional_2_Template, 9, 0, "section", 2)(3, ResetPassword_Conditional_3_Template, 35, 8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.hasValidLink() ? 2 : 3);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n\n.auth-recovery-page[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  width: 100%;\n  flex: 1;\n  overflow: hidden;\n  background: var(--colour-background);\n}\n\n.auth-recovery-page[_ngcontent-%COMP%]::before {\n  position: absolute;\n  z-index: 0;\n  inset-block: 0;\n  right: max(\n    var(--page-padding),\n    calc((100% - 1420px) / 2)\n  );\n  width: min(\n    calc((100% - (var(--page-padding) * 2)) * 0.42),\n    596px\n  );\n  background: var(--colour-background-soft);\n  content: \"\";\n  pointer-events: none;\n}\n\n.auth-recovery-layout[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1420px);\n  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.78fr);\n  gap: clamp(56px, 7vw, 112px);\n  align-items: start;\n  margin-inline: auto;\n  padding-block: clamp(68px, 9vh, 112px);\n}\n\n.auth-recovery-intro[_ngcontent-%COMP%] {\n  padding-top: clamp(10px, 2vw, 26px);\n}\n\n.auth-recovery-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.auth-recovery-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.2rem, 7.2vw, 7.6rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.024em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child, \n.auth-recovery-status[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 30px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.1vw, 1.08rem);\n  line-height: 1.8;\n}\n\n.auth-recovery-form-area[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 470px;\n  padding: clamp(24px, 3vw, 38px) 0 0 clamp(34px, 4vw, 58px);\n  --form-control-background: #0b1017;\n}\n\n.auth-recovery-form-area[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 34px;\n  left: 0;\n  width: 3px;\n  height: 40px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n.auth-recovery-form-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 3vw, 2.7rem);\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-form-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 430px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.auth-recovery-form-area[_ngcontent-%COMP%]   .form-stack[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n.auth-recovery-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 4px;\n}\n\n.auth-recovery-back[_ngcontent-%COMP%] {\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n}\n\n.auth-recovery-back[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n}\n\n.auth-recovery-back[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--colour-yellow);\n}\n\n.auth-recovery-status[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  max-width: 820px;\n  padding-block: 20px 74px;\n}\n\n.auth-recovery-status[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n@media (max-width: 760px) {\n  .auth-recovery-page[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n\n  .auth-recovery-layout[_ngcontent-%COMP%] {\n    display: block;\n    padding-block: 52px 66px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%] {\n    padding: 0 0 46px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n   .auth-recovery-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(4rem, 15vw, 6rem);\n  }\n\n  .auth-recovery-form-area[_ngcontent-%COMP%] {\n    min-height: 0;\n    padding: 40px 0 0;\n    border-top: 1px solid var(--colour-border-strong);\n  }\n\n  .auth-recovery-form-area[_ngcontent-%COMP%]::before {\n    top: -3px;\n    left: 0;\n    width: 46px;\n    height: 5px;\n  }\n}\n\n@media (max-width: 390px) {\n  .auth-recovery-layout[_ngcontent-%COMP%] {\n    padding-block: 42px 54px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%] {\n    padding-bottom: 38px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n   .auth-recovery-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(3.6rem, 17vw, 4.8rem);\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResetPassword, [{
        type: Component,
        args: [{ selector: 'app-reset-password', standalone: true, imports: [
                    ReactiveFormsModule,
                    RouterLink
                ], template: "<main class=\"auth-recovery-page\">\n  <div class=\"auth-recovery-layout\">\n    @if (!hasValidLink()) {\n      <section class=\"auth-recovery-status\" aria-labelledby=\"invalid-reset-title\">\n        <p class=\"eyebrow\">Password Recovery</p>\n        <h1 id=\"invalid-reset-title\">Reset link unavailable.</h1>\n        <p>\n          This password reset link is incomplete or no longer available. Request\n          a new link and try again.\n        </p>\n        <a class=\"btn btn--primary\" routerLink=\"/forgot-password\">Request a New Link</a>\n      </section>\n    } @else {\n      <section class=\"auth-recovery-intro\" aria-labelledby=\"reset-password-title\">\n        <p class=\"eyebrow\">Password Recovery</p>\n        <h1 id=\"reset-password-title\">Choose a new password.</h1>\n        <p>\n          Set the password you'll use the next time you return to your private\n          Choom Vault collection.\n        </p>\n      </section>\n\n      <section class=\"auth-recovery-form-area\" aria-labelledby=\"new-password-title\">\n        <div class=\"auth-recovery-form-heading\">\n          <h2 id=\"new-password-title\">New Password</h2>\n          <p>The reset link is validated by the backend when you submit.</p>\n        </div>\n\n        @if (resetError()) {\n          <p class=\"form-message form-message--error\" role=\"alert\">\n            {{ resetError() }}\n          </p>\n        }\n\n        <form\n          class=\"form-stack\"\n          [formGroup]=\"resetPasswordForm\"\n          (ngSubmit)=\"submit()\"\n          novalidate\n        >\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"reset-new-password\">New password</label>\n            <input\n              id=\"reset-new-password\"\n              class=\"form-control\"\n              type=\"password\"\n              formControlName=\"newPassword\"\n              autocomplete=\"new-password\"\n              [attr.aria-invalid]=\"resetPasswordForm.controls.newPassword.invalid && resetPasswordForm.controls.newPassword.touched\"\n              aria-describedby=\"reset-password-help reset-password-error\"\n            />\n            <p id=\"reset-password-help\" class=\"form-help\">Use at least 8 characters.</p>\n\n            @if (resetPasswordForm.controls.newPassword.touched && resetPasswordForm.controls.newPassword.hasError('required')) {\n              <p id=\"reset-password-error\" class=\"form-error\">Enter a new password.</p>\n            } @else if (resetPasswordForm.controls.newPassword.touched && resetPasswordForm.controls.newPassword.invalid) {\n              <p id=\"reset-password-error\" class=\"form-error\">Password must be between 8 and 128 characters.</p>\n            }\n          </div>\n\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"reset-confirm-password\">Confirm password</label>\n            <input\n              id=\"reset-confirm-password\"\n              class=\"form-control\"\n              type=\"password\"\n              formControlName=\"confirmPassword\"\n              autocomplete=\"new-password\"\n              [attr.aria-invalid]=\"resetPasswordForm.controls.confirmPassword.invalid && resetPasswordForm.controls.confirmPassword.touched || resetPasswordForm.hasError('passwordMismatch') && resetPasswordForm.controls.confirmPassword.touched\"\n              aria-describedby=\"reset-confirm-error\"\n            />\n\n            @if (resetPasswordForm.controls.confirmPassword.touched && resetPasswordForm.controls.confirmPassword.hasError('required')) {\n              <p id=\"reset-confirm-error\" class=\"form-error\">Confirm your new password.</p>\n            } @else if (resetPasswordForm.controls.confirmPassword.touched && resetPasswordForm.hasError('passwordMismatch')) {\n              <p id=\"reset-confirm-error\" class=\"form-error\">Passwords do not match.</p>\n            }\n          </div>\n\n          <button\n            class=\"btn btn--primary auth-recovery-submit\"\n            type=\"submit\"\n            [disabled]=\"isSubmitting()\"\n          >\n            {{ isSubmitting() ? 'Updating password\u2026' : 'Update Password' }}\n          </button>\n        </form>\n\n        <p class=\"auth-recovery-back\">\n          Need another link? <a routerLink=\"/forgot-password\">Request password reset</a>\n        </p>\n      </section>\n    }\n  </div>\n</main>\n", styles: [":host {\n  display: flex;\n  flex: 1;\n}\n\n.auth-recovery-page {\n  position: relative;\n  display: flex;\n  width: 100%;\n  flex: 1;\n  overflow: hidden;\n  background: var(--colour-background);\n}\n\n.auth-recovery-page::before {\n  position: absolute;\n  z-index: 0;\n  inset-block: 0;\n  right: max(\n    var(--page-padding),\n    calc((100% - 1420px) / 2)\n  );\n  width: min(\n    calc((100% - (var(--page-padding) * 2)) * 0.42),\n    596px\n  );\n  background: var(--colour-background-soft);\n  content: \"\";\n  pointer-events: none;\n}\n\n.auth-recovery-layout {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1420px);\n  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.78fr);\n  gap: clamp(56px, 7vw, 112px);\n  align-items: start;\n  margin-inline: auto;\n  padding-block: clamp(68px, 9vh, 112px);\n}\n\n.auth-recovery-intro {\n  padding-top: clamp(10px, 2vw, 26px);\n}\n\n.auth-recovery-intro h1,\n.auth-recovery-status h1 {\n  max-width: 760px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.2rem, 7.2vw, 7.6rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.024em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-intro > p:last-child,\n.auth-recovery-status > p {\n  max-width: 560px;\n  margin: 30px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.1vw, 1.08rem);\n  line-height: 1.8;\n}\n\n.auth-recovery-form-area {\n  position: relative;\n  min-height: 470px;\n  padding: clamp(24px, 3vw, 38px) 0 0 clamp(34px, 4vw, 58px);\n  --form-control-background: #0b1017;\n}\n\n.auth-recovery-form-area::before {\n  position: absolute;\n  top: 34px;\n  left: 0;\n  width: 3px;\n  height: 40px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n.auth-recovery-form-heading h2 {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 3vw, 2.7rem);\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-form-heading p {\n  max-width: 430px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.auth-recovery-form-area .form-stack {\n  margin-top: 30px;\n}\n\n.auth-recovery-submit {\n  width: 100%;\n  margin-top: 4px;\n}\n\n.auth-recovery-back {\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n}\n\n.auth-recovery-back a {\n  color: var(--colour-text);\n}\n\n.auth-recovery-back a:hover {\n  color: var(--colour-yellow);\n}\n\n.auth-recovery-status {\n  grid-column: 1 / -1;\n  max-width: 820px;\n  padding-block: 20px 74px;\n}\n\n.auth-recovery-status .btn {\n  margin-top: 30px;\n}\n\n@media (max-width: 760px) {\n  .auth-recovery-page::before {\n    display: none;\n  }\n\n  .auth-recovery-layout {\n    display: block;\n    padding-block: 52px 66px;\n  }\n\n  .auth-recovery-intro {\n    padding: 0 0 46px;\n  }\n\n  .auth-recovery-intro h1,\n  .auth-recovery-status h1 {\n    font-size: clamp(4rem, 15vw, 6rem);\n  }\n\n  .auth-recovery-form-area {\n    min-height: 0;\n    padding: 40px 0 0;\n    border-top: 1px solid var(--colour-border-strong);\n  }\n\n  .auth-recovery-form-area::before {\n    top: -3px;\n    left: 0;\n    width: 46px;\n    height: 5px;\n  }\n}\n\n@media (max-width: 390px) {\n  .auth-recovery-layout {\n    padding-block: 42px 54px;\n  }\n\n  .auth-recovery-intro {\n    padding-bottom: 38px;\n  }\n\n  .auth-recovery-intro h1,\n  .auth-recovery-status h1 {\n    font-size: clamp(3.6rem, 17vw, 4.8rem);\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.ActivatedRoute }, { type: i3.Router }, { type: i4.Location }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ResetPassword, { className: "ResetPassword", filePath: "src/app/features/auth/pages/reset-password/reset-password.ts", lineNumber: 59 }); })();

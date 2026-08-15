import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../../core/auth/auth.service";
function ForgotPassword_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 2)(1, "p", 3);
    i0.ɵɵtext(2, "Password Recovery");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 4);
    i0.ɵɵtext(4, "Check your email.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 5);
    i0.ɵɵtext(6, " If an account exists for that email, a password reset link has been sent. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 6);
    i0.ɵɵtext(8, "Return to Login");
    i0.ɵɵelementEnd()();
} }
function ForgotPassword_Conditional_3_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.requestError(), " ");
} }
function ForgotPassword_Conditional_3_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1, "Enter your email address.");
    i0.ɵɵelementEnd();
} }
function ForgotPassword_Conditional_3_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1, "Enter a valid email address.");
    i0.ɵɵelementEnd();
} }
function ForgotPassword_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 7)(1, "p", 3);
    i0.ɵɵtext(2, "Password Recovery");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 8);
    i0.ɵɵtext(4, "Reset your password.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " Enter the email address attached to your collector account. If the account exists, Choom Vault will send a time-limited reset link. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "section", 9)(8, "div", 10)(9, "h2", 11);
    i0.ɵɵtext(10, "Recovery Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12, "No account details are revealed by this request.");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(13, ForgotPassword_Conditional_3_Conditional_13_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(14, "form", 13);
    i0.ɵɵlistener("ngSubmit", function ForgotPassword_Conditional_3_Template_form_ngSubmit_14_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(15, "div", 14)(16, "label", 15);
    i0.ɵɵtext(17, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "input", 16);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(19, ForgotPassword_Conditional_3_Conditional_19_Template, 2, 0, "p", 17)(20, ForgotPassword_Conditional_3_Conditional_20_Template, 2, 0, "p", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 18);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "p", 19);
    i0.ɵɵtext(24, " Remembered it? ");
    i0.ɵɵelementStart(25, "a", 20);
    i0.ɵɵtext(26, "Return to Login");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵconditional(ctx_r1.requestError() ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.forgotPasswordForm);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.forgotPasswordForm.controls.email.invalid && ctx_r1.forgotPasswordForm.controls.email.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.forgotPasswordForm.controls.email.touched && ctx_r1.forgotPasswordForm.controls.email.hasError("required") ? 19 : ctx_r1.forgotPasswordForm.controls.email.touched && ctx_r1.forgotPasswordForm.controls.email.invalid ? 20 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting() ? "Sending\u2026" : "Send Reset Link", " ");
} }
/**
 * Public password-recovery request.
 *
 * The success state is deliberately neutral. The browser never learns whether
 * the supplied email address belongs to an account.
 */
export class ForgotPassword {
    formBuilder;
    authService;
    forgotPasswordForm;
    isSubmitting = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    isComplete = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isComplete" }] : /* istanbul ignore next */ []));
    requestError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "requestError" }] : /* istanbul ignore next */ []));
    constructor(formBuilder, authService) {
        this.formBuilder = formBuilder;
        this.authService = authService;
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
    submit() {
        this.requestError.set('');
        this.forgotPasswordForm.markAllAsTouched();
        if (this.forgotPasswordForm.invalid || this.isSubmitting()) {
            return;
        }
        this.isSubmitting.set(true);
        this.authService
            .forgotPassword(this.forgotPasswordForm.controls.email.value)
            .pipe(finalize(() => {
            this.isSubmitting.set(false);
        }))
            .subscribe({
            next: () => {
                this.isComplete.set(true);
            },
            error: error => {
                this.requestError.set(this.getRequestError(error));
            }
        });
    }
    getRequestError(error) {
        if (error instanceof HttpErrorResponse && error.status === 429) {
            return 'Too many password-recovery attempts. Try again shortly.';
        }
        if (error instanceof HttpErrorResponse && error.status === 400) {
            return 'Enter a valid email address and try again.';
        }
        return 'We could not start password recovery. Try again.';
    }
    static ɵfac = function ForgotPassword_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || ForgotPassword)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForgotPassword, selectors: [["app-forgot-password"]], decls: 4, vars: 1, consts: [[1, "auth-recovery-page"], [1, "auth-recovery-layout"], ["aria-labelledby", "recovery-sent-title", 1, "auth-recovery-status"], [1, "eyebrow"], ["id", "recovery-sent-title"], ["role", "status"], ["routerLink", "/login", 1, "btn", "btn--primary"], ["aria-labelledby", "forgot-password-title", 1, "auth-recovery-intro"], ["id", "forgot-password-title"], ["aria-labelledby", "recovery-email-title", 1, "auth-recovery-form-area"], [1, "auth-recovery-form-heading"], ["id", "recovery-email-title"], ["role", "alert", 1, "form-message", "form-message--error"], ["novalidate", "", 1, "form-stack", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "forgot-email", 1, "form-label"], ["id", "forgot-email", "type", "email", "formControlName", "email", "autocomplete", "email", "inputmode", "email", "autocapitalize", "none", "spellcheck", "false", "aria-describedby", "forgot-email-error", 1, "form-control"], ["id", "forgot-email-error", 1, "form-error"], ["type", "submit", 1, "btn", "btn--primary", "auth-recovery-submit", 3, "disabled"], [1, "auth-recovery-back"], ["routerLink", "/login"]], template: function ForgotPassword_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, ForgotPassword_Conditional_2_Template, 9, 0, "section", 2)(3, ForgotPassword_Conditional_3_Template, 27, 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isComplete() ? 2 : 3);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n\n.auth-recovery-page[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  width: 100%;\n  flex: 1;\n  overflow: hidden;\n  background: var(--colour-background);\n}\n\n.auth-recovery-page[_ngcontent-%COMP%]::before {\n  position: absolute;\n  z-index: 0;\n  inset-block: 0;\n  right: max(\n    var(--page-padding),\n    calc((100% - 1420px) / 2)\n  );\n  width: min(\n    calc((100% - (var(--page-padding) * 2)) * 0.42),\n    596px\n  );\n  background: var(--colour-background-soft);\n  content: \"\";\n  pointer-events: none;\n}\n\n.auth-recovery-layout[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1420px);\n  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.78fr);\n  gap: clamp(56px, 7vw, 112px);\n  align-items: start;\n  margin-inline: auto;\n  padding-block: clamp(68px, 9vh, 112px);\n}\n\n.auth-recovery-intro[_ngcontent-%COMP%] {\n  padding-top: clamp(10px, 2vw, 26px);\n}\n\n.auth-recovery-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.auth-recovery-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.2rem, 7.2vw, 7.6rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.024em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child, \n.auth-recovery-status[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 30px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.1vw, 1.08rem);\n  line-height: 1.8;\n}\n\n.auth-recovery-form-area[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 470px;\n  padding: clamp(24px, 3vw, 38px) 0 0 clamp(34px, 4vw, 58px);\n  --form-control-background: #0b1017;\n}\n\n.auth-recovery-form-area[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 34px;\n  left: 0;\n  width: 3px;\n  height: 40px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n.auth-recovery-form-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 3vw, 2.7rem);\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-form-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 430px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.auth-recovery-form-area[_ngcontent-%COMP%]   .form-stack[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n.auth-recovery-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 4px;\n}\n\n.auth-recovery-back[_ngcontent-%COMP%] {\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n}\n\n.auth-recovery-back[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n}\n\n.auth-recovery-back[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--colour-yellow);\n}\n\n.auth-recovery-status[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  max-width: 820px;\n  padding-block: 20px 74px;\n}\n\n.auth-recovery-status[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n@media (max-width: 760px) {\n  .auth-recovery-page[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n\n  .auth-recovery-layout[_ngcontent-%COMP%] {\n    display: block;\n    padding-block: 52px 66px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%] {\n    padding: 0 0 46px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n   .auth-recovery-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(4rem, 15vw, 6rem);\n  }\n\n  .auth-recovery-form-area[_ngcontent-%COMP%] {\n    min-height: 0;\n    padding: 40px 0 0;\n    border-top: 1px solid var(--colour-border-strong);\n  }\n\n  .auth-recovery-form-area[_ngcontent-%COMP%]::before {\n    top: -3px;\n    left: 0;\n    width: 46px;\n    height: 5px;\n  }\n}\n\n@media (max-width: 390px) {\n  .auth-recovery-layout[_ngcontent-%COMP%] {\n    padding-block: 42px 54px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%] {\n    padding-bottom: 38px;\n  }\n\n  .auth-recovery-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n   .auth-recovery-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(3.6rem, 17vw, 4.8rem);\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotPassword, [{
        type: Component,
        args: [{ selector: 'app-forgot-password', standalone: true, imports: [
                    ReactiveFormsModule,
                    RouterLink
                ], template: "<main class=\"auth-recovery-page\">\n  <div class=\"auth-recovery-layout\">\n    @if (isComplete()) {\n      <section class=\"auth-recovery-status\" aria-labelledby=\"recovery-sent-title\">\n        <p class=\"eyebrow\">Password Recovery</p>\n        <h1 id=\"recovery-sent-title\">Check your email.</h1>\n        <p role=\"status\">\n          If an account exists for that email, a password reset link has been sent.\n        </p>\n        <a class=\"btn btn--primary\" routerLink=\"/login\">Return to Login</a>\n      </section>\n    } @else {\n      <section class=\"auth-recovery-intro\" aria-labelledby=\"forgot-password-title\">\n        <p class=\"eyebrow\">Password Recovery</p>\n        <h1 id=\"forgot-password-title\">Reset your password.</h1>\n        <p>\n          Enter the email address attached to your collector account. If the\n          account exists, Choom Vault will send a time-limited reset link.\n        </p>\n      </section>\n\n      <section class=\"auth-recovery-form-area\" aria-labelledby=\"recovery-email-title\">\n        <div class=\"auth-recovery-form-heading\">\n          <h2 id=\"recovery-email-title\">Recovery Email</h2>\n          <p>No account details are revealed by this request.</p>\n        </div>\n\n        @if (requestError()) {\n          <p class=\"form-message form-message--error\" role=\"alert\">\n            {{ requestError() }}\n          </p>\n        }\n\n        <form\n          class=\"form-stack\"\n          [formGroup]=\"forgotPasswordForm\"\n          (ngSubmit)=\"submit()\"\n          novalidate\n        >\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"forgot-email\">Email</label>\n            <input\n              id=\"forgot-email\"\n              class=\"form-control\"\n              type=\"email\"\n              formControlName=\"email\"\n              autocomplete=\"email\"\n              inputmode=\"email\"\n              autocapitalize=\"none\"\n              spellcheck=\"false\"\n              [attr.aria-invalid]=\"forgotPasswordForm.controls.email.invalid && forgotPasswordForm.controls.email.touched\"\n              aria-describedby=\"forgot-email-error\"\n            />\n\n            @if (forgotPasswordForm.controls.email.touched && forgotPasswordForm.controls.email.hasError('required')) {\n              <p id=\"forgot-email-error\" class=\"form-error\">Enter your email address.</p>\n            } @else if (forgotPasswordForm.controls.email.touched && forgotPasswordForm.controls.email.invalid) {\n              <p id=\"forgot-email-error\" class=\"form-error\">Enter a valid email address.</p>\n            }\n          </div>\n\n          <button\n            class=\"btn btn--primary auth-recovery-submit\"\n            type=\"submit\"\n            [disabled]=\"isSubmitting()\"\n          >\n            {{ isSubmitting() ? 'Sending\u2026' : 'Send Reset Link' }}\n          </button>\n        </form>\n\n        <p class=\"auth-recovery-back\">\n          Remembered it? <a routerLink=\"/login\">Return to Login</a>\n        </p>\n      </section>\n    }\n  </div>\n</main>\n", styles: [":host {\n  display: flex;\n  flex: 1;\n}\n\n.auth-recovery-page {\n  position: relative;\n  display: flex;\n  width: 100%;\n  flex: 1;\n  overflow: hidden;\n  background: var(--colour-background);\n}\n\n.auth-recovery-page::before {\n  position: absolute;\n  z-index: 0;\n  inset-block: 0;\n  right: max(\n    var(--page-padding),\n    calc((100% - 1420px) / 2)\n  );\n  width: min(\n    calc((100% - (var(--page-padding) * 2)) * 0.42),\n    596px\n  );\n  background: var(--colour-background-soft);\n  content: \"\";\n  pointer-events: none;\n}\n\n.auth-recovery-layout {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1420px);\n  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.78fr);\n  gap: clamp(56px, 7vw, 112px);\n  align-items: start;\n  margin-inline: auto;\n  padding-block: clamp(68px, 9vh, 112px);\n}\n\n.auth-recovery-intro {\n  padding-top: clamp(10px, 2vw, 26px);\n}\n\n.auth-recovery-intro h1,\n.auth-recovery-status h1 {\n  max-width: 760px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.2rem, 7.2vw, 7.6rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.024em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-intro > p:last-child,\n.auth-recovery-status > p {\n  max-width: 560px;\n  margin: 30px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.1vw, 1.08rem);\n  line-height: 1.8;\n}\n\n.auth-recovery-form-area {\n  position: relative;\n  min-height: 470px;\n  padding: clamp(24px, 3vw, 38px) 0 0 clamp(34px, 4vw, 58px);\n  --form-control-background: #0b1017;\n}\n\n.auth-recovery-form-area::before {\n  position: absolute;\n  top: 34px;\n  left: 0;\n  width: 3px;\n  height: 40px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n.auth-recovery-form-heading h2 {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 3vw, 2.7rem);\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n}\n\n.auth-recovery-form-heading p {\n  max-width: 430px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.auth-recovery-form-area .form-stack {\n  margin-top: 30px;\n}\n\n.auth-recovery-submit {\n  width: 100%;\n  margin-top: 4px;\n}\n\n.auth-recovery-back {\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n}\n\n.auth-recovery-back a {\n  color: var(--colour-text);\n}\n\n.auth-recovery-back a:hover {\n  color: var(--colour-yellow);\n}\n\n.auth-recovery-status {\n  grid-column: 1 / -1;\n  max-width: 820px;\n  padding-block: 20px 74px;\n}\n\n.auth-recovery-status .btn {\n  margin-top: 30px;\n}\n\n@media (max-width: 760px) {\n  .auth-recovery-page::before {\n    display: none;\n  }\n\n  .auth-recovery-layout {\n    display: block;\n    padding-block: 52px 66px;\n  }\n\n  .auth-recovery-intro {\n    padding: 0 0 46px;\n  }\n\n  .auth-recovery-intro h1,\n  .auth-recovery-status h1 {\n    font-size: clamp(4rem, 15vw, 6rem);\n  }\n\n  .auth-recovery-form-area {\n    min-height: 0;\n    padding: 40px 0 0;\n    border-top: 1px solid var(--colour-border-strong);\n  }\n\n  .auth-recovery-form-area::before {\n    top: -3px;\n    left: 0;\n    width: 46px;\n    height: 5px;\n  }\n}\n\n@media (max-width: 390px) {\n  .auth-recovery-layout {\n    padding-block: 42px 54px;\n  }\n\n  .auth-recovery-intro {\n    padding-bottom: 38px;\n  }\n\n  .auth-recovery-intro h1,\n  .auth-recovery-status h1 {\n    font-size: clamp(3.6rem, 17vw, 4.8rem);\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ForgotPassword, { className: "ForgotPassword", filePath: "src/app/features/auth/pages/forgot-password/forgot-password.ts", lineNumber: 32 }); })();

import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../../core/auth/auth.service";
import * as i3 from "../../../../core/capabilities/capabilities.service";
import * as i4 from "@angular/router";
function Register_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 2)(1, "p", 4);
    i0.ɵɵtext(2, "Collector Registration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1");
    i0.ɵɵtext(4, "Checking registration.");
    i0.ɵɵelementEnd()();
} }
function Register_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 3)(1, "p", 4);
    i0.ɵɵtext(2, "Public Registration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 5);
    i0.ɵɵtext(4, "Registration is not open.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " Choom Vault is not accepting public account registrations at this time. The public Vault Archive remains available to browse. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 6)(8, "a", 7);
    i0.ɵɵtext(9, "Browse the Archive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "a", 8);
    i0.ɵɵtext(11, "Log in");
    i0.ɵɵelementEnd()()();
} }
function Register_Conditional_4_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.registrationError(), " ");
} }
function Register_Conditional_4_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, " Enter a username. ");
    i0.ɵɵelementEnd();
} }
function Register_Conditional_4_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, " Username cannot contain spaces or an @ symbol. ");
    i0.ɵɵelementEnd();
} }
function Register_Conditional_4_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, " Username must be 50 characters or fewer. ");
    i0.ɵɵelementEnd();
} }
function Register_Conditional_4_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, " Enter your email address. ");
    i0.ɵɵelementEnd();
} }
function Register_Conditional_4_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, " Enter a valid email address. ");
    i0.ɵɵelementEnd();
} }
function Register_Conditional_4_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1, " Enter a password. ");
    i0.ɵɵelementEnd();
} }
function Register_Conditional_4_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1, " Password must be between 8 and 128 characters. ");
    i0.ɵɵelementEnd();
} }
function Register_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "p", 4);
    i0.ɵɵtext(2, "Collector Registration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 10);
    i0.ɵɵtext(4, "Make the Vault yours.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " Create the account that will hold your private collection records. You can start adding exact printings once you sign in. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "section", 11)(8, "div", 12)(9, "h2", 13);
    i0.ɵɵtext(10, "Collector Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12, "Use details you will recognise when returning to your Vault.");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(13, Register_Conditional_4_Conditional_13_Template, 2, 1, "p", 14);
    i0.ɵɵelementStart(14, "form", 15);
    i0.ɵɵlistener("ngSubmit", function Register_Conditional_4_Template_form_ngSubmit_14_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitRegistration()); });
    i0.ɵɵelementStart(15, "div", 16)(16, "label", 17);
    i0.ɵɵtext(17, "Username");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "input", 18);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(19, "p", 19);
    i0.ɵɵtext(20, " This is your collector name. Use a username, not your email address. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(21, Register_Conditional_4_Conditional_21_Template, 2, 0, "p", 20)(22, Register_Conditional_4_Conditional_22_Template, 2, 0, "p", 20)(23, Register_Conditional_4_Conditional_23_Template, 2, 0, "p", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 16)(25, "label", 21);
    i0.ɵɵtext(26, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(27, "input", 22);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(28, Register_Conditional_4_Conditional_28_Template, 2, 0, "p", 23)(29, Register_Conditional_4_Conditional_29_Template, 2, 0, "p", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 16)(31, "label", 24);
    i0.ɵɵtext(32, "Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 25);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(34, "p", 26);
    i0.ɵɵtext(35, " Use at least 8 characters. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(36, Register_Conditional_4_Conditional_36_Template, 2, 0, "p", 27)(37, Register_Conditional_4_Conditional_37_Template, 2, 0, "p", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 28);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "p", 29);
    i0.ɵɵtext(41, " Already have an account? ");
    i0.ɵɵelementStart(42, "a", 30);
    i0.ɵɵtext(43, "Log in");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵconditional(ctx_r1.registrationError() ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.registerForm);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.registerForm.controls.userName.invalid && ctx_r1.registerForm.controls.userName.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.registerForm.controls.userName.touched && ctx_r1.registerForm.controls.userName.hasError("required") ? 21 : ctx_r1.registerForm.controls.userName.touched && ctx_r1.registerForm.controls.userName.hasError("pattern") ? 22 : ctx_r1.registerForm.controls.userName.touched && ctx_r1.registerForm.controls.userName.hasError("maxlength") ? 23 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵattribute("aria-invalid", ctx_r1.registerForm.controls.email.invalid && ctx_r1.registerForm.controls.email.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.registerForm.controls.email.touched && ctx_r1.registerForm.controls.email.hasError("required") ? 28 : ctx_r1.registerForm.controls.email.touched && ctx_r1.registerForm.controls.email.invalid ? 29 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵattribute("aria-invalid", ctx_r1.registerForm.controls.password.invalid && ctx_r1.registerForm.controls.password.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.registerForm.controls.password.touched && ctx_r1.registerForm.controls.password.hasError("required") ? 36 : ctx_r1.registerForm.controls.password.touched && ctx_r1.registerForm.controls.password.invalid ? 37 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting() ? "Creating account\u2026" : "Create account", " ");
} }
export class Register {
    formBuilder;
    authService;
    capabilitiesService;
    router;
    registerForm;
    isSubmitting = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    registrationError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "registrationError" }] : /* istanbul ignore next */ []));
    constructor(formBuilder, authService, capabilitiesService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.capabilitiesService = capabilitiesService;
        this.router = router;
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
    ngOnInit() {
        this.capabilitiesService.load().subscribe();
    }
    submitRegistration() {
        this.registrationError.set('');
        this.registerForm.markAllAsTouched();
        if (!this.capabilitiesService.publicRegistrationEnabled() ||
            this.registerForm.invalid ||
            this.isSubmitting()) {
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
            .pipe(finalize(() => {
            this.isSubmitting.set(false);
        }))
            .subscribe({
            next: () => {
                void this.router.navigate(['/login'], {
                    queryParams: {
                        registered: '1'
                    }
                });
            },
            error: error => {
                this.registrationError.set(this.getRegistrationError(error));
            }
        });
    }
    getRegistrationError(error) {
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
    static ɵfac = function Register_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Register)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.CapabilitiesService), i0.ɵɵdirectiveInject(i4.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Register, selectors: [["app-register"]], decls: 5, vars: 1, consts: [[1, "register-page"], [1, "container", "register-layout"], ["aria-live", "polite", 1, "register-status"], ["aria-labelledby", "registration-closed-title", 1, "register-status"], [1, "eyebrow"], ["id", "registration-closed-title"], [1, "register-status__actions"], ["routerLink", "/cards", 1, "btn", "btn--primary"], ["routerLink", "/login", 1, "btn", "btn--text"], ["aria-labelledby", "register-title", 1, "register-intro"], ["id", "register-title"], ["aria-labelledby", "register-form-title", 1, "register-form-area"], [1, "register-form-heading"], ["id", "register-form-title"], ["role", "alert", 1, "form-message", "form-message--error"], ["novalidate", "", 1, "form-stack", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "register-username", 1, "form-label"], ["id", "register-username", "type", "text", "formControlName", "userName", "autocomplete", "username", "autocapitalize", "none", "spellcheck", "false", "aria-describedby", "register-username-help register-username-error", 1, "form-control"], ["id", "register-username-help", 1, "form-help"], ["id", "register-username-error", 1, "form-error"], ["for", "register-email", 1, "form-label"], ["id", "register-email", "type", "email", "formControlName", "email", "autocomplete", "email", "inputmode", "email", "autocapitalize", "none", "spellcheck", "false", "aria-describedby", "register-email-error", 1, "form-control"], ["id", "register-email-error", 1, "form-error"], ["for", "register-password", 1, "form-label"], ["id", "register-password", "type", "password", "formControlName", "password", "autocomplete", "new-password", "aria-describedby", "register-password-help register-password-error", 1, "form-control"], ["id", "register-password-help", 1, "form-help"], ["id", "register-password-error", 1, "form-error"], ["type", "submit", 1, "btn", "btn--primary", "register-submit", 3, "disabled"], [1, "register-login-link"], ["routerLink", "/login"]], template: function Register_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, Register_Conditional_2_Template, 5, 0, "section", 2)(3, Register_Conditional_3_Template, 12, 0, "section", 3)(4, Register_Conditional_4_Template, 44, 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.capabilitiesService.isLoaded() ? 2 : !ctx.capabilitiesService.publicRegistrationEnabled() ? 3 : 4);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n\n.register-page[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  flex: 1;\n  background: var(--colour-background);\n}\n\n.register-layout[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1440px);\n  grid-template-columns: minmax(0, 1.1fr) minmax(380px, 0.74fr);\n  gap: clamp(54px, 7vw, 112px);\n  align-items: start;\n  margin-inline: auto;\n  padding-block: clamp(68px, 9vh, 112px);\n}\n\n.register-intro[_ngcontent-%COMP%] {\n  padding-top: 18px;\n}\n\n.register-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.register-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 780px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.4rem, 7.6vw, 8rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.024em;\n  text-transform: uppercase;\n}\n\n.register-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child, \n.register-status[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-of-type {\n  max-width: 580px;\n  margin: 30px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.1vw, 1.08rem);\n  line-height: 1.8;\n}\n\n\n\n\n\n\n.register-form-area[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 500px;\n  justify-self: end;\n  padding: 20px 0 0 clamp(28px, 3.2vw, 48px);\n  --form-control-background: #090d13;\n}\n\n.register-form-area[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 1px;\n  background: linear-gradient(\n    to bottom,\n    rgba(255, 255, 255, 0.2),\n    rgba(255, 255, 255, 0.06) 78%,\n    transparent\n  );\n  content: '';\n}\n\n.register-form-area[_ngcontent-%COMP%]::after {\n  position: absolute;\n  top: 30px;\n  left: -1px;\n  width: 3px;\n  height: 34px;\n  background: var(--colour-yellow);\n  content: '';\n}\n\n.register-form-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 2.7vw, 2.6rem);\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n}\n\n.register-form-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.register-form-area[_ngcontent-%COMP%]   .form-stack[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n.register-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 6px;\n}\n\n.register-login-link[_ngcontent-%COMP%] {\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n}\n\n.register-login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n}\n\n.register-login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--colour-yellow);\n}\n\n.register-status[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  max-width: 820px;\n  padding-block: 36px 80px;\n}\n\n.register-status__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 34px;\n}\n\n@media (max-width: 820px) {\n  .register-layout[_ngcontent-%COMP%] {\n    display: block;\n    padding-block: 54px 70px;\n  }\n\n  .register-intro[_ngcontent-%COMP%] {\n    padding-bottom: 46px;\n  }\n\n  .register-form-area[_ngcontent-%COMP%] {\n    max-width: 620px;\n    padding: 40px 0 0;\n    border-top: 1px solid var(--colour-border);\n  }\n\n  .register-form-area[_ngcontent-%COMP%]::before {\n    top: 0;\n    right: 0;\n    bottom: auto;\n    left: 0;\n    width: auto;\n    height: 1px;\n    background: linear-gradient(\n      to right,\n      rgba(255, 255, 255, 0.2),\n      rgba(255, 255, 255, 0.06) 78%,\n      transparent\n    );\n  }\n\n  .register-form-area[_ngcontent-%COMP%]::after {\n    top: -2px;\n    left: 0;\n    width: 42px;\n    height: 4px;\n  }\n}\n\n@media (max-width: 390px) {\n  .register-layout[_ngcontent-%COMP%] {\n    padding-block: 42px 54px;\n  }\n\n  .register-intro[_ngcontent-%COMP%] {\n    padding-bottom: 38px;\n  }\n\n  .register-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n   .register-status[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(3.7rem, 18vw, 4.8rem);\n  }\n\n  .register-status__actions[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Register, [{
        type: Component,
        args: [{ selector: 'app-register', standalone: true, imports: [
                    ReactiveFormsModule,
                    RouterLink
                ], template: "<main class=\"register-page\">\n  <div class=\"container register-layout\">\n    @if (!capabilitiesService.isLoaded()) {\n      <section class=\"register-status\" aria-live=\"polite\">\n        <p class=\"eyebrow\">Collector Registration</p>\n        <h1>Checking registration.</h1>\n      </section>\n    } @else if (!capabilitiesService.publicRegistrationEnabled()) {\n      <section class=\"register-status\" aria-labelledby=\"registration-closed-title\">\n        <p class=\"eyebrow\">Public Registration</p>\n        <h1 id=\"registration-closed-title\">Registration is not open.</h1>\n        <p>\n          Choom Vault is not accepting public account registrations at this\n          time. The public Vault Archive remains available to browse.\n        </p>\n\n        <div class=\"register-status__actions\">\n          <a class=\"btn btn--primary\" routerLink=\"/cards\">Browse the Archive</a>\n          <a class=\"btn btn--text\" routerLink=\"/login\">Log in</a>\n        </div>\n      </section>\n    } @else {\n      <section class=\"register-intro\" aria-labelledby=\"register-title\">\n        <p class=\"eyebrow\">Collector Registration</p>\n        <h1 id=\"register-title\">Make the Vault yours.</h1>\n        <p>\n          Create the account that will hold your private collection records.\n          You can start adding exact printings once you sign in.\n        </p>\n      </section>\n\n      <section class=\"register-form-area\" aria-labelledby=\"register-form-title\">\n        <div class=\"register-form-heading\">\n          <h2 id=\"register-form-title\">Collector Details</h2>\n          <p>Use details you will recognise when returning to your Vault.</p>\n        </div>\n\n        @if (registrationError()) {\n          <p class=\"form-message form-message--error\" role=\"alert\">\n            {{ registrationError() }}\n          </p>\n        }\n\n        <form\n          class=\"form-stack\"\n          [formGroup]=\"registerForm\"\n          (ngSubmit)=\"submitRegistration()\"\n          novalidate\n        >\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"register-username\">Username</label>\n            <input\n              id=\"register-username\"\n              class=\"form-control\"\n              type=\"text\"\n              formControlName=\"userName\"\n              autocomplete=\"username\"\n              autocapitalize=\"none\"\n              spellcheck=\"false\"\n              [attr.aria-invalid]=\"registerForm.controls.userName.invalid && registerForm.controls.userName.touched\"\n              aria-describedby=\"register-username-help register-username-error\"\n            />\n\n            <p id=\"register-username-help\" class=\"form-help\">\n              This is your collector name. Use a username, not your email address.\n            </p>\n\n            @if (registerForm.controls.userName.touched && registerForm.controls.userName.hasError('required')) {\n              <p id=\"register-username-error\" class=\"form-error\">\n                Enter a username.\n              </p>\n            } @else if (registerForm.controls.userName.touched && registerForm.controls.userName.hasError('pattern')) {\n              <p id=\"register-username-error\" class=\"form-error\">\n                Username cannot contain spaces or an @ symbol.\n              </p>\n            } @else if (registerForm.controls.userName.touched && registerForm.controls.userName.hasError('maxlength')) {\n              <p id=\"register-username-error\" class=\"form-error\">\n                Username must be 50 characters or fewer.\n              </p>\n            }\n          </div>\n\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"register-email\">Email</label>\n            <input\n              id=\"register-email\"\n              class=\"form-control\"\n              type=\"email\"\n              formControlName=\"email\"\n              autocomplete=\"email\"\n              inputmode=\"email\"\n              autocapitalize=\"none\"\n              spellcheck=\"false\"\n              [attr.aria-invalid]=\"registerForm.controls.email.invalid && registerForm.controls.email.touched\"\n              aria-describedby=\"register-email-error\"\n            />\n\n            @if (registerForm.controls.email.touched && registerForm.controls.email.hasError('required')) {\n              <p id=\"register-email-error\" class=\"form-error\">\n                Enter your email address.\n              </p>\n            } @else if (registerForm.controls.email.touched && registerForm.controls.email.invalid) {\n              <p id=\"register-email-error\" class=\"form-error\">\n                Enter a valid email address.\n              </p>\n            }\n          </div>\n\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"register-password\">Password</label>\n            <input\n              id=\"register-password\"\n              class=\"form-control\"\n              type=\"password\"\n              formControlName=\"password\"\n              autocomplete=\"new-password\"\n              [attr.aria-invalid]=\"registerForm.controls.password.invalid && registerForm.controls.password.touched\"\n              aria-describedby=\"register-password-help register-password-error\"\n            />\n\n            <p id=\"register-password-help\" class=\"form-help\">\n              Use at least 8 characters.\n            </p>\n\n            @if (registerForm.controls.password.touched && registerForm.controls.password.hasError('required')) {\n              <p id=\"register-password-error\" class=\"form-error\">\n                Enter a password.\n              </p>\n            } @else if (registerForm.controls.password.touched && registerForm.controls.password.invalid) {\n              <p id=\"register-password-error\" class=\"form-error\">\n                Password must be between 8 and 128 characters.\n              </p>\n            }\n          </div>\n\n          <button\n            class=\"btn btn--primary register-submit\"\n            type=\"submit\"\n            [disabled]=\"isSubmitting()\"\n          >\n            {{ isSubmitting() ? 'Creating account\u2026' : 'Create account' }}\n          </button>\n        </form>\n\n        <p class=\"register-login-link\">\n          Already have an account?\n          <a routerLink=\"/login\">Log in</a>\n        </p>\n      </section>\n    }\n  </div>\n</main>\n", styles: [":host {\n  display: flex;\n  flex: 1;\n}\n\n.register-page {\n  display: flex;\n  width: 100%;\n  flex: 1;\n  background: var(--colour-background);\n}\n\n.register-layout {\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1440px);\n  grid-template-columns: minmax(0, 1.1fr) minmax(380px, 0.74fr);\n  gap: clamp(54px, 7vw, 112px);\n  align-items: start;\n  margin-inline: auto;\n  padding-block: clamp(68px, 9vh, 112px);\n}\n\n.register-intro {\n  padding-top: 18px;\n}\n\n.register-intro h1,\n.register-status h1 {\n  max-width: 780px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.4rem, 7.6vw, 8rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.024em;\n  text-transform: uppercase;\n}\n\n.register-intro > p:last-child,\n.register-status > p:last-of-type {\n  max-width: 580px;\n  margin: 30px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.1vw, 1.08rem);\n  line-height: 1.8;\n}\n\n/*\n * Registration is intentionally more open than Login. A quiet graphite spine\n * and one yellow index establish the first record without drawing a literal\n * account card.\n */\n.register-form-area {\n  position: relative;\n  max-width: 500px;\n  justify-self: end;\n  padding: 20px 0 0 clamp(28px, 3.2vw, 48px);\n  --form-control-background: #090d13;\n}\n\n.register-form-area::before {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 1px;\n  background: linear-gradient(\n    to bottom,\n    rgba(255, 255, 255, 0.2),\n    rgba(255, 255, 255, 0.06) 78%,\n    transparent\n  );\n  content: '';\n}\n\n.register-form-area::after {\n  position: absolute;\n  top: 30px;\n  left: -1px;\n  width: 3px;\n  height: 34px;\n  background: var(--colour-yellow);\n  content: '';\n}\n\n.register-form-heading h2 {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 2.7vw, 2.6rem);\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n}\n\n.register-form-heading p {\n  max-width: 420px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.register-form-area .form-stack {\n  margin-top: 30px;\n}\n\n.register-submit {\n  width: 100%;\n  margin-top: 6px;\n}\n\n.register-login-link {\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n}\n\n.register-login-link a {\n  color: var(--colour-text);\n}\n\n.register-login-link a:hover {\n  color: var(--colour-yellow);\n}\n\n.register-status {\n  grid-column: 1 / -1;\n  max-width: 820px;\n  padding-block: 36px 80px;\n}\n\n.register-status__actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 34px;\n}\n\n@media (max-width: 820px) {\n  .register-layout {\n    display: block;\n    padding-block: 54px 70px;\n  }\n\n  .register-intro {\n    padding-bottom: 46px;\n  }\n\n  .register-form-area {\n    max-width: 620px;\n    padding: 40px 0 0;\n    border-top: 1px solid var(--colour-border);\n  }\n\n  .register-form-area::before {\n    top: 0;\n    right: 0;\n    bottom: auto;\n    left: 0;\n    width: auto;\n    height: 1px;\n    background: linear-gradient(\n      to right,\n      rgba(255, 255, 255, 0.2),\n      rgba(255, 255, 255, 0.06) 78%,\n      transparent\n    );\n  }\n\n  .register-form-area::after {\n    top: -2px;\n    left: 0;\n    width: 42px;\n    height: 4px;\n  }\n}\n\n@media (max-width: 390px) {\n  .register-layout {\n    padding-block: 42px 54px;\n  }\n\n  .register-intro {\n    padding-bottom: 38px;\n  }\n\n  .register-intro h1,\n  .register-status h1 {\n    font-size: clamp(3.7rem, 18vw, 4.8rem);\n  }\n\n  .register-status__actions {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.CapabilitiesService }, { type: i4.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Register, { className: "Register", filePath: "src/app/features/auth/pages/register/register.ts", lineNumber: 31 }); })();

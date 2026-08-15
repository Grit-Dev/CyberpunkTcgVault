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
function Login_Conditional_13_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Sign in to add this printing to your Collection.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_13_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Sign in to add this printing to your Wishlist.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_13_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Use the email address attached to your collector account.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_13_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.registeredMessage(), " ");
} }
function Login_Conditional_13_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authError(), " ");
} }
function Login_Conditional_13_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1, "Enter your email address.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_13_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1, "Enter a valid email address.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_13_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, "Enter your password.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_13_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, " Password must be at least 8 characters. ");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_13_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "p", 24);
    i0.ɵɵtext(2, "Demo Access");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 25);
    i0.ɵɵlistener("click", function Login_Conditional_13_Conditional_23_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.enterDemoVault()); });
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 26);
    i0.ɵɵtext(7, "\u2192");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting() || ctx_r1.isDemoSubmitting());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isDemoSubmitting() ? "Opening prepared Vault\u2026" : "Explore a prepared collector Vault", " ");
} }
function Login_Conditional_13_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, " New collector? ");
    i0.ɵɵelementStart(2, "a", 27);
    i0.ɵɵtext(3, "Join the Vault");
    i0.ɵɵelementEnd()();
} }
function Login_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "h2", 10);
    i0.ɵɵtext(2, "Vault Access");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, Login_Conditional_13_Conditional_3_Template, 2, 0, "p")(4, Login_Conditional_13_Conditional_4_Template, 2, 0, "p")(5, Login_Conditional_13_Conditional_5_Template, 2, 0, "p");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, Login_Conditional_13_Conditional_6_Template, 2, 1, "p", 11);
    i0.ɵɵconditionalCreate(7, Login_Conditional_13_Conditional_7_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(8, "form", 13);
    i0.ɵɵlistener("ngSubmit", function Login_Conditional_13_Template_form_ngSubmit_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitLogin()); });
    i0.ɵɵelementStart(9, "div", 14)(10, "label", 15);
    i0.ɵɵtext(11, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 16);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(13, Login_Conditional_13_Conditional_13_Template, 2, 0, "p", 17)(14, Login_Conditional_13_Conditional_14_Template, 2, 0, "p", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 14)(16, "label", 18);
    i0.ɵɵtext(17, "Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "input", 19);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(19, Login_Conditional_13_Conditional_19_Template, 2, 0, "p", 20)(20, Login_Conditional_13_Conditional_20_Template, 2, 0, "p", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 21);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(23, Login_Conditional_13_Conditional_23_Template, 8, 2, "div", 22);
    i0.ɵɵconditionalCreate(24, Login_Conditional_13_Conditional_24_Template, 4, 0, "p", 23);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.collectorIntent() === "collection" ? 3 : ctx_r1.collectorIntent() === "wishlist" ? 4 : 5);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.registeredMessage() ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.authError() ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.loginForm);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.loginForm.controls.email.invalid && ctx_r1.loginForm.controls.email.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.loginForm.controls.email.touched && ctx_r1.loginForm.controls.email.hasError("required") ? 13 : ctx_r1.loginForm.controls.email.touched && ctx_r1.loginForm.controls.email.invalid ? 14 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵattribute("aria-invalid", ctx_r1.loginForm.controls.password.invalid && ctx_r1.loginForm.controls.password.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.loginForm.controls.password.touched && ctx_r1.loginForm.controls.password.hasError("required") ? 19 : ctx_r1.loginForm.controls.password.touched && ctx_r1.loginForm.controls.password.invalid ? 20 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting() || ctx_r1.isDemoSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting() ? "Signing in\u2026" : "Enter the Vault", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.capabilitiesService.demoAccessEnabled() ? 23 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.capabilitiesService.publicRegistrationEnabled() ? 24 : -1);
} }
function Login_Conditional_14_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Enter the code from your authenticator app. ");
} }
function Login_Conditional_14_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Enter one of your unused recovery codes. ");
} }
function Login_Conditional_14_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authError(), " ");
} }
function Login_Conditional_14_Conditional_7_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵtext(1, "Enter your authenticator code.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_14_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 13);
    i0.ɵɵlistener("ngSubmit", function Login_Conditional_14_Conditional_7_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitMfa()); });
    i0.ɵɵelementStart(1, "div", 14)(2, "label", 28);
    i0.ɵɵtext(3, "Authenticator code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 29);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(5, Login_Conditional_14_Conditional_7_Conditional_5_Template, 2, 0, "p", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 21);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 31);
    i0.ɵɵlistener("click", function Login_Conditional_14_Conditional_7_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.useRecoveryCode()); });
    i0.ɵɵtext(9, " Use a recovery code ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r1.mfaForm);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.mfaForm.controls.code.invalid && ctx_r1.mfaForm.controls.code.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.mfaForm.controls.code.touched && ctx_r1.mfaForm.controls.code.invalid ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting() ? "Verifying\u2026" : "Continue", " ");
} }
function Login_Conditional_14_Conditional_8_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 34);
    i0.ɵɵtext(1, "Enter a recovery code.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_14_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 13);
    i0.ɵɵlistener("ngSubmit", function Login_Conditional_14_Conditional_8_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitRecoveryCode()); });
    i0.ɵɵelementStart(1, "div", 14)(2, "label", 32);
    i0.ɵɵtext(3, "Recovery code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 33);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(5, Login_Conditional_14_Conditional_8_Conditional_5_Template, 2, 0, "p", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 21);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 31);
    i0.ɵɵlistener("click", function Login_Conditional_14_Conditional_8_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.useAuthenticatorCode()); });
    i0.ɵɵtext(9, " Use an authenticator code ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r1.recoveryForm);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.recoveryForm.controls.recoveryCode.invalid && ctx_r1.recoveryForm.controls.recoveryCode.touched);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.recoveryForm.controls.recoveryCode.touched && ctx_r1.recoveryForm.controls.recoveryCode.invalid ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting() ? "Verifying\u2026" : "Continue", " ");
} }
function Login_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "h2", 10);
    i0.ɵɵtext(2, "Verify Sign-In");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵconditionalCreate(4, Login_Conditional_14_Conditional_4_Template, 1, 0)(5, Login_Conditional_14_Conditional_5_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(6, Login_Conditional_14_Conditional_6_Template, 2, 1, "p", 12);
    i0.ɵɵconditionalCreate(7, Login_Conditional_14_Conditional_7_Template, 10, 5)(8, Login_Conditional_14_Conditional_8_Template, 10, 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.mfaMode() === "authenticator" ? 4 : 5);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.authError() ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.mfaMode() === "authenticator" ? 7 : 8);
} }
export class Login {
    formBuilder;
    authService;
    capabilitiesService;
    route;
    router;
    loginForm;
    mfaForm;
    recoveryForm;
    isSubmitting = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    isDemoSubmitting = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isDemoSubmitting" }] : /* istanbul ignore next */ []));
    authError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "authError" }] : /* istanbul ignore next */ []));
    registeredMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "registeredMessage" }] : /* istanbul ignore next */ []));
    collectorIntent = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "collectorIntent" }] : /* istanbul ignore next */ []));
    mfaMode = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "mfaMode" }] : /* istanbul ignore next */ []));
    constructor(formBuilder, authService, capabilitiesService, route, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.capabilitiesService = capabilitiesService;
        this.route = route;
        this.router = router;
        this.loginForm = this.formBuilder.nonNullable.group({
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
        this.mfaForm = this.formBuilder.nonNullable.group({
            code: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(20)
                ]
            ]
        });
        this.recoveryForm = this.formBuilder.nonNullable.group({
            recoveryCode: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(100)
                ]
            ]
        });
    }
    ngOnInit() {
        if (this.route.snapshot.queryParamMap.get('registered') === '1') {
            this.registeredMessage.set('Account created. Sign in to continue.');
        }
        else if (this.route.snapshot.queryParamMap.get('passwordReset') === '1') {
            this.registeredMessage.set('Password updated. Sign in with your new password.');
        }
        const intent = this.route.snapshot.queryParamMap.get('intent');
        if (intent === 'collection' || intent === 'wishlist') {
            this.collectorIntent.set(intent);
        }
    }
    submitLogin() {
        this.authError.set('');
        this.registeredMessage.set('');
        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid || this.isSubmitting()) {
            return;
        }
        this.isSubmitting.set(true);
        this.authService.login(this.loginForm.getRawValue())
            .pipe(finalize(() => {
            this.isSubmitting.set(false);
        }))
            .subscribe({
            next: response => {
                if (response.requiresTwoFactor) {
                    this.mfaMode.set('authenticator');
                    this.mfaForm.reset();
                    this.recoveryForm.reset();
                    return;
                }
                this.navigateAfterAuthentication();
            },
            error: error => {
                this.authError.set(this.getLoginError(error));
            }
        });
    }
    submitMfa() {
        this.authError.set('');
        this.mfaForm.markAllAsTouched();
        if (this.mfaForm.invalid || this.isSubmitting()) {
            return;
        }
        this.isSubmitting.set(true);
        this.authService.completeMfa(this.mfaForm.controls.code.value)
            .pipe(finalize(() => {
            this.isSubmitting.set(false);
        }))
            .subscribe({
            next: () => {
                this.navigateAfterAuthentication();
            },
            error: error => {
                this.authError.set(this.getMfaError(error, 'authenticator'));
            }
        });
    }
    submitRecoveryCode() {
        this.authError.set('');
        this.recoveryForm.markAllAsTouched();
        if (this.recoveryForm.invalid || this.isSubmitting()) {
            return;
        }
        this.isSubmitting.set(true);
        this.authService.completeRecoveryLogin(this.recoveryForm.controls.recoveryCode.value)
            .pipe(finalize(() => {
            this.isSubmitting.set(false);
        }))
            .subscribe({
            next: () => {
                this.navigateAfterAuthentication();
            },
            error: error => {
                this.authError.set(this.getMfaError(error, 'recovery'));
            }
        });
    }
    enterDemoVault() {
        this.authError.set('');
        if (this.isDemoSubmitting() ||
            !this.capabilitiesService.demoAccessEnabled()) {
            return;
        }
        this.isDemoSubmitting.set(true);
        this.authService.loginDemo()
            .pipe(finalize(() => {
            this.isDemoSubmitting.set(false);
        }))
            .subscribe({
            next: () => {
                this.navigateAfterAuthentication('/collection');
            },
            error: error => {
                this.authError.set(this.getDemoError(error));
            }
        });
    }
    useRecoveryCode() {
        this.authError.set('');
        this.mfaMode.set('recovery');
    }
    useAuthenticatorCode() {
        this.authError.set('');
        this.mfaMode.set('authenticator');
    }
    navigateAfterAuthentication(fallbackDestination = '/cards') {
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
    getValidAuthenticationReturnUrl(returnUrl) {
        if (!returnUrl ||
            !returnUrl.startsWith('/') ||
            returnUrl.startsWith('//') ||
            returnUrl.includes('\\')) {
            return null;
        }
        try {
            const urlTree = this.router.parseUrl(returnUrl);
            const primarySegments = urlTree.root.children['primary']?.segments.map(segment => segment.path) ?? [];
            // /collection is the implemented private MVP destination. Query state is
            // preserved so a guarded Collection URL can return to the same page/filter.
            if (primarySegments.length === 1 &&
                primarySegments[0] === 'collection') {
                return returnUrl;
            }
            // Card Detail can legitimately send a signed-out collector to Login after
            // they choose an exact Printing action. Preserve that inspection context.
            if (primarySegments.length === 2 &&
                primarySegments[0] === 'cards' &&
                primarySegments[1].length > 0) {
                return returnUrl;
            }
        }
        catch {
            return null;
        }
        return null;
    }
    getLoginError(error) {
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
    getMfaError(error, mode) {
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
    getDemoError(error) {
        if (error instanceof HttpErrorResponse && error.status === 429) {
            return 'Demo access has been requested too often. Try again shortly.';
        }
        if (error instanceof HttpErrorResponse &&
            (error.status === 404 || error.status === 503)) {
            return 'Demo access is temporarily unavailable.';
        }
        return 'We could not open the Demo Vault. Try again.';
    }
    static ɵfac = function Login_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Login)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.CapabilitiesService), i0.ɵɵdirectiveInject(i4.ActivatedRoute), i0.ɵɵdirectiveInject(i4.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Login, selectors: [["app-login"]], decls: 15, vars: 1, consts: [[1, "login-page"], [1, "container", "login-layout"], ["aria-labelledby", "login-title", 1, "login-intro"], [1, "eyebrow"], ["id", "login-title"], [1, "login-intro__copy"], ["aria-labelledby", "vault-access-title", 1, "login-access"], ["aria-hidden", "true", 1, "login-access__index"], [1, "login-access__context"], [1, "login-access__heading"], ["id", "vault-access-title"], ["role", "status", 1, "form-message"], ["role", "alert", 1, "form-message", "form-message--error"], ["novalidate", "", 1, "form-stack", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "login-email", 1, "form-label"], ["id", "login-email", "type", "email", "formControlName", "email", "autocomplete", "email", "inputmode", "email", "aria-describedby", "login-email-error", 1, "form-control"], ["id", "login-email-error", 1, "form-error"], ["for", "login-password", 1, "form-label"], ["id", "login-password", "type", "password", "formControlName", "password", "autocomplete", "current-password", "aria-describedby", "login-password-error", 1, "form-control"], ["id", "login-password-error", 1, "form-error"], ["type", "submit", 1, "btn", "btn--primary", "login-submit", 3, "disabled"], [1, "login-demo"], [1, "login-register-link"], [1, "login-demo__label"], ["type", "button", 1, "login-demo__action", 3, "click", "disabled"], ["aria-hidden", "true"], ["routerLink", "/register"], ["for", "mfa-code", 1, "form-label"], ["id", "mfa-code", "type", "text", "formControlName", "code", "autocomplete", "one-time-code", "inputmode", "numeric", "aria-describedby", "mfa-code-error", 1, "form-control", "form-control--code"], ["id", "mfa-code-error", 1, "form-error"], ["type", "button", 1, "text-action", "login-mfa-switch", 3, "click"], ["for", "recovery-code", 1, "form-label"], ["id", "recovery-code", "type", "text", "formControlName", "recoveryCode", "autocomplete", "off", "aria-describedby", "recovery-code-error", 1, "form-control", "form-control--code"], ["id", "recovery-code-error", 1, "form-error"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1)(2, "section", 2)(3, "p", 3);
            i0.ɵɵtext(4, "Private Collection Access");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 4);
            i0.ɵɵtext(6, "Return to your Vault.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8, " The Vault Archive is open to browse. Your collection records remain private to your account. Sign in to continue. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "section", 6);
            i0.ɵɵelement(10, "span", 7);
            i0.ɵɵelementStart(11, "p", 8);
            i0.ɵɵtext(12, "Public Archive / Private Collection");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(13, Login_Conditional_13_Template, 25, 12)(14, Login_Conditional_14_Template, 9, 3);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵconditional(ctx.mfaMode() === null ? 13 : 14);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n\n.login-page[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  width: 100%;\n  flex: 1;\n  align-items: stretch;\n  overflow: hidden;\n  background: var(--colour-background);\n}\n\n\n\n\n\n\n.login-page[_ngcontent-%COMP%]::before {\n  position: absolute;\n  z-index: 0;\n  inset-block: 0;\n  right: max(var(--page-padding), calc((100% - 1440px) / 2));\n  width: min(calc((100% - (var(--page-padding) * 2)) * 0.42), 605px);\n  background: #07090e;\n  content: '';\n  pointer-events: none;\n}\n\n.login-layout[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1440px);\n  grid-template-columns: minmax(0, 1.16fr) minmax(360px, 0.84fr);\n  align-items: stretch;\n  margin-inline: auto;\n  padding-block: clamp(62px, 8vh, 100px);\n}\n\n.login-intro[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 540px;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: clamp(34px, 5vw, 68px) clamp(64px, 7vw, 118px) 48px 0;\n}\n\n.login-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 730px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.6rem, 8vw, 8.4rem);\n  font-weight: 900;\n  line-height: 0.86;\n  letter-spacing: -0.025em;\n  text-transform: uppercase;\n}\n\n.login-intro__copy[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 34px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.15vw, 1.1rem);\n  line-height: 1.8;\n}\n\n\n\n\n\n\n.login-access[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  min-height: 540px;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: clamp(42px, 5vw, 68px) 0 clamp(42px, 5vw, 68px) clamp(42px, 5vw, 66px);\n  border-left: 1px solid rgba(255, 255, 255, 0.13);\n  background: transparent;\n  --form-control-background: #090d13;\n}\n\n.login-access__index[_ngcontent-%COMP%] {\n  position: absolute;\n  top: clamp(58px, 6vw, 82px);\n  left: -2px;\n  width: 3px;\n  height: 40px;\n  background: var(--colour-yellow);\n}\n\n.login-access__context[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n\n.login-access__heading[_ngcontent-%COMP%] {\n  margin-top: 42px;\n}\n\n.login-access__heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 3vw, 2.8rem);\n  font-weight: 800;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n}\n\n.login-access__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.form-stack[_ngcontent-%COMP%] {\n  margin-top: 32px;\n}\n\n.login-register-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.login-mfa-switch[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  font-size: 0.86rem;\n  text-underline-offset: 4px;\n}\n\n.login-register-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--colour-yellow);\n}\n\n.login-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 2px;\n}\n\n.login-demo[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  padding-top: 26px;\n  border-top: 1px solid rgba(255, 255, 255, 0.09);\n}\n\n.login-register-link[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n  line-height: 1.6;\n}\n\n.login-demo__label[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n\n.login-demo__action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-height: 44px;\n  align-items: center;\n  gap: 12px;\n  margin-top: 8px;\n  padding: 0;\n  color: #bdc4ce;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 0.86rem;\n  font-weight: 600;\n  text-align: left;\n}\n\n.login-demo__action[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  color: var(--colour-yellow);\n  font-size: 1rem;\n}\n\n.login-demo__action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--colour-text);\n}\n\n.login-demo__action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n\n.login-register-link[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n\n.login-mfa-switch[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n\n@media (max-width: 940px) {\n  .login-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.92fr);\n  }\n\n  .login-intro[_ngcontent-%COMP%] {\n    padding-right: clamp(36px, 5vw, 64px);\n  }\n}\n\n@media (max-width: 760px) {\n  .login-page[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n\n  .login-layout[_ngcontent-%COMP%] {\n    display: block;\n    padding-block: 52px 64px;\n  }\n\n  .login-intro[_ngcontent-%COMP%] {\n    min-height: 0;\n    padding: 0 0 48px;\n  }\n\n  .login-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    max-width: 620px;\n    font-size: clamp(4rem, 15vw, 6.4rem);\n  }\n\n  .login-intro__copy[_ngcontent-%COMP%] {\n    margin-top: 26px;\n  }\n\n  .login-access[_ngcontent-%COMP%] {\n    min-height: 0;\n    padding: 42px 0 0;\n    border-top: 1px solid var(--colour-border-strong);\n    border-left: 0;\n  }\n\n  .login-access__index[_ngcontent-%COMP%] {\n    top: -3px;\n    left: 0;\n    width: 46px;\n    height: 5px;\n  }\n\n  .login-access__heading[_ngcontent-%COMP%] {\n    margin-top: 34px;\n  }\n}\n\n@media (max-width: 390px) {\n  .login-layout[_ngcontent-%COMP%] {\n    padding-block: 42px 54px;\n  }\n\n  .login-intro[_ngcontent-%COMP%] {\n    padding-bottom: 40px;\n  }\n\n  .login-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    margin-top: 22px;\n    font-size: clamp(3.7rem, 18vw, 4.8rem);\n  }\n\n  .login-intro__copy[_ngcontent-%COMP%] {\n    margin-top: 22px;\n    line-height: 1.7;\n  }\n\n  .login-access[_ngcontent-%COMP%] {\n    padding-top: 36px;\n  }\n\n  .login-demo[_ngcontent-%COMP%], \n   .login-register-link[_ngcontent-%COMP%] {\n    margin-top: 24px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Login, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [
                    ReactiveFormsModule,
                    RouterLink
                ], template: "<main class=\"login-page\">\n  <div class=\"container login-layout\">\n    <section class=\"login-intro\" aria-labelledby=\"login-title\">\n      <p class=\"eyebrow\">Private Collection Access</p>\n\n      <h1 id=\"login-title\">Return to your Vault.</h1>\n\n      <p class=\"login-intro__copy\">\n        The Vault Archive is open to browse. Your collection records remain private to your account.\n        Sign in to continue.\n      </p>\n    </section>\n\n    <section class=\"login-access\" aria-labelledby=\"vault-access-title\">\n      <span class=\"login-access__index\" aria-hidden=\"true\"></span>\n\n      <p class=\"login-access__context\">Public Archive / Private Collection</p>\n\n      @if (mfaMode() === null) {\n        <div class=\"login-access__heading\">\n          <h2 id=\"vault-access-title\">Vault Access</h2>\n          @if (collectorIntent() === 'collection') {\n            <p>Sign in to add this printing to your Collection.</p>\n          } @else if (collectorIntent() === 'wishlist') {\n            <p>Sign in to add this printing to your Wishlist.</p>\n          } @else {\n            <p>Use the email address attached to your collector account.</p>\n          }\n        </div>\n\n        @if (registeredMessage()) {\n          <p class=\"form-message\" role=\"status\">\n            {{ registeredMessage() }}\n          </p>\n        }\n\n        @if (authError()) {\n          <p class=\"form-message form-message--error\" role=\"alert\">\n            {{ authError() }}\n          </p>\n        }\n\n        <form class=\"form-stack\" [formGroup]=\"loginForm\" (ngSubmit)=\"submitLogin()\" novalidate>\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"login-email\">Email</label>\n            <input\n              id=\"login-email\"\n              class=\"form-control\"\n              type=\"email\"\n              formControlName=\"email\"\n              autocomplete=\"email\"\n              inputmode=\"email\"\n              [attr.aria-invalid]=\"\n                loginForm.controls.email.invalid && loginForm.controls.email.touched\n              \"\n              aria-describedby=\"login-email-error\"\n            />\n\n            @if (\n              loginForm.controls.email.touched && loginForm.controls.email.hasError('required')\n            ) {\n              <p id=\"login-email-error\" class=\"form-error\">Enter your email address.</p>\n            } @else if (loginForm.controls.email.touched && loginForm.controls.email.invalid) {\n              <p id=\"login-email-error\" class=\"form-error\">Enter a valid email address.</p>\n            }\n          </div>\n\n          <div class=\"form-field\">\n            <label class=\"form-label\" for=\"login-password\">Password</label>\n            <input\n              id=\"login-password\"\n              class=\"form-control\"\n              type=\"password\"\n              formControlName=\"password\"\n              autocomplete=\"current-password\"\n              [attr.aria-invalid]=\"\n                loginForm.controls.password.invalid && loginForm.controls.password.touched\n              \"\n              aria-describedby=\"login-password-error\"\n            />\n\n            @if (\n              loginForm.controls.password.touched &&\n              loginForm.controls.password.hasError('required')\n            ) {\n              <p id=\"login-password-error\" class=\"form-error\">Enter your password.</p>\n            } @else if (\n              loginForm.controls.password.touched && loginForm.controls.password.invalid\n            ) {\n              <p id=\"login-password-error\" class=\"form-error\">\n                Password must be at least 8 characters.\n              </p>\n            }\n          </div>\n\n          <!--\n            TODO: Password reset UI ready \u2014 enable entry point when transactional\n            email delivery is configured.\n          -->\n\n          <button\n            class=\"btn btn--primary login-submit\"\n            type=\"submit\"\n            [disabled]=\"isSubmitting() || isDemoSubmitting()\"\n          >\n            {{ isSubmitting() ? 'Signing in\u2026' : 'Enter the Vault' }}\n          </button>\n        </form>\n\n        @if (capabilitiesService.demoAccessEnabled()) {\n          <div class=\"login-demo\">\n            <p class=\"login-demo__label\">Demo Access</p>\n\n            <button\n              class=\"login-demo__action\"\n              type=\"button\"\n              [disabled]=\"isSubmitting() || isDemoSubmitting()\"\n              (click)=\"enterDemoVault()\"\n            >\n              <span>\n                {{\n                  isDemoSubmitting()\n                    ? 'Opening prepared Vault\u2026'\n                    : 'Explore a prepared collector Vault'\n                }}\n              </span>\n              <span aria-hidden=\"true\">\u2192</span>\n            </button>\n          </div>\n        }\n\n        @if (capabilitiesService.publicRegistrationEnabled()) {\n          <p class=\"login-register-link\">\n            New collector?\n            <a routerLink=\"/register\">Join the Vault</a>\n          </p>\n        }\n      } @else {\n        <div class=\"login-access__heading\">\n          <h2 id=\"vault-access-title\">Verify Sign-In</h2>\n          <p>\n            @if (mfaMode() === 'authenticator') {\n              Enter the code from your authenticator app.\n            } @else {\n              Enter one of your unused recovery codes.\n            }\n          </p>\n        </div>\n\n        @if (authError()) {\n          <p class=\"form-message form-message--error\" role=\"alert\">\n            {{ authError() }}\n          </p>\n        }\n\n        @if (mfaMode() === 'authenticator') {\n          <form class=\"form-stack\" [formGroup]=\"mfaForm\" (ngSubmit)=\"submitMfa()\" novalidate>\n            <div class=\"form-field\">\n              <label class=\"form-label\" for=\"mfa-code\">Authenticator code</label>\n              <input\n                id=\"mfa-code\"\n                class=\"form-control form-control--code\"\n                type=\"text\"\n                formControlName=\"code\"\n                autocomplete=\"one-time-code\"\n                inputmode=\"numeric\"\n                [attr.aria-invalid]=\"mfaForm.controls.code.invalid && mfaForm.controls.code.touched\"\n                aria-describedby=\"mfa-code-error\"\n              />\n\n              @if (mfaForm.controls.code.touched && mfaForm.controls.code.invalid) {\n                <p id=\"mfa-code-error\" class=\"form-error\">Enter your authenticator code.</p>\n              }\n            </div>\n\n            <button class=\"btn btn--primary login-submit\" type=\"submit\" [disabled]=\"isSubmitting()\">\n              {{ isSubmitting() ? 'Verifying\u2026' : 'Continue' }}\n            </button>\n          </form>\n\n          <button class=\"text-action login-mfa-switch\" type=\"button\" (click)=\"useRecoveryCode()\">\n            Use a recovery code\n          </button>\n        } @else {\n          <form\n            class=\"form-stack\"\n            [formGroup]=\"recoveryForm\"\n            (ngSubmit)=\"submitRecoveryCode()\"\n            novalidate\n          >\n            <div class=\"form-field\">\n              <label class=\"form-label\" for=\"recovery-code\">Recovery code</label>\n              <input\n                id=\"recovery-code\"\n                class=\"form-control form-control--code\"\n                type=\"text\"\n                formControlName=\"recoveryCode\"\n                autocomplete=\"off\"\n                [attr.aria-invalid]=\"\n                  recoveryForm.controls.recoveryCode.invalid &&\n                  recoveryForm.controls.recoveryCode.touched\n                \"\n                aria-describedby=\"recovery-code-error\"\n              />\n\n              @if (\n                recoveryForm.controls.recoveryCode.touched &&\n                recoveryForm.controls.recoveryCode.invalid\n              ) {\n                <p id=\"recovery-code-error\" class=\"form-error\">Enter a recovery code.</p>\n              }\n            </div>\n\n            <button class=\"btn btn--primary login-submit\" type=\"submit\" [disabled]=\"isSubmitting()\">\n              {{ isSubmitting() ? 'Verifying\u2026' : 'Continue' }}\n            </button>\n          </form>\n\n          <button\n            class=\"text-action login-mfa-switch\"\n            type=\"button\"\n            (click)=\"useAuthenticatorCode()\"\n          >\n            Use an authenticator code\n          </button>\n        }\n      }\n    </section>\n  </div>\n</main>\n", styles: [":host {\n  display: flex;\n  flex: 1;\n}\n\n.login-page {\n  position: relative;\n  display: flex;\n  width: 100%;\n  flex: 1;\n  align-items: stretch;\n  overflow: hidden;\n  background: var(--colour-background);\n}\n\n/*\n * The private side is only a material change, not a grey login panel.\n * Keep the tonal shift extremely close to the public archive surface so the\n * seam carries the threshold instead of a large rectangle doing the work.\n */\n.login-page::before {\n  position: absolute;\n  z-index: 0;\n  inset-block: 0;\n  right: max(var(--page-padding), calc((100% - 1440px) / 2));\n  width: min(calc((100% - (var(--page-padding) * 2)) * 0.42), 605px);\n  background: #07090e;\n  content: '';\n  pointer-events: none;\n}\n\n.login-layout {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(100% - (var(--page-padding) * 2), 1440px);\n  grid-template-columns: minmax(0, 1.16fr) minmax(360px, 0.84fr);\n  align-items: stretch;\n  margin-inline: auto;\n  padding-block: clamp(62px, 8vh, 100px);\n}\n\n.login-intro {\n  display: flex;\n  min-height: 540px;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: clamp(34px, 5vw, 68px) clamp(64px, 7vw, 118px) 48px 0;\n}\n\n.login-intro h1 {\n  max-width: 730px;\n  margin: 26px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(4.6rem, 8vw, 8.4rem);\n  font-weight: 900;\n  line-height: 0.86;\n  letter-spacing: -0.025em;\n  text-transform: uppercase;\n}\n\n.login-intro__copy {\n  max-width: 560px;\n  margin: 34px 0 0;\n  color: var(--colour-text-muted);\n  font-size: clamp(1rem, 1.15vw, 1.1rem);\n  line-height: 1.8;\n}\n\n/*\n * The private side is a material transition, not a floating login card.\n * The page background owns the graphite plane; this section only establishes\n * the seam and content rhythm.\n */\n.login-access {\n  position: relative;\n  display: flex;\n  min-height: 540px;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: clamp(42px, 5vw, 68px) 0 clamp(42px, 5vw, 68px) clamp(42px, 5vw, 66px);\n  border-left: 1px solid rgba(255, 255, 255, 0.13);\n  background: transparent;\n  --form-control-background: #090d13;\n}\n\n.login-access__index {\n  position: absolute;\n  top: clamp(58px, 6vw, 82px);\n  left: -2px;\n  width: 3px;\n  height: 40px;\n  background: var(--colour-yellow);\n}\n\n.login-access__context {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n\n.login-access__heading {\n  margin-top: 42px;\n}\n\n.login-access__heading h2 {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 3vw, 2.8rem);\n  font-weight: 800;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n}\n\n.login-access__heading p {\n  max-width: 420px;\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.form-stack {\n  margin-top: 32px;\n}\n\n.login-register-link a,\n.login-mfa-switch {\n  color: var(--colour-text);\n  font-size: 0.86rem;\n  text-underline-offset: 4px;\n}\n\n.login-register-link a:hover {\n  color: var(--colour-yellow);\n}\n\n.login-submit {\n  width: 100%;\n  margin-top: 2px;\n}\n\n.login-demo {\n  margin-top: 32px;\n  padding-top: 26px;\n  border-top: 1px solid rgba(255, 255, 255, 0.09);\n}\n\n.login-register-link {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n  line-height: 1.6;\n}\n\n.login-demo__label {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n\n.login-demo__action {\n  display: inline-flex;\n  min-height: 44px;\n  align-items: center;\n  gap: 12px;\n  margin-top: 8px;\n  padding: 0;\n  color: #bdc4ce;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 0.86rem;\n  font-weight: 600;\n  text-align: left;\n}\n\n.login-demo__action > span:last-child {\n  color: var(--colour-yellow);\n  font-size: 1rem;\n}\n\n.login-demo__action:hover:not(:disabled) {\n  color: var(--colour-text);\n}\n\n.login-demo__action:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n\n.login-register-link {\n  margin-top: 24px;\n}\n\n.login-mfa-switch {\n  margin-top: 22px;\n}\n\n@media (max-width: 940px) {\n  .login-layout {\n    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.92fr);\n  }\n\n  .login-intro {\n    padding-right: clamp(36px, 5vw, 64px);\n  }\n}\n\n@media (max-width: 760px) {\n  .login-page::before {\n    display: none;\n  }\n\n  .login-layout {\n    display: block;\n    padding-block: 52px 64px;\n  }\n\n  .login-intro {\n    min-height: 0;\n    padding: 0 0 48px;\n  }\n\n  .login-intro h1 {\n    max-width: 620px;\n    font-size: clamp(4rem, 15vw, 6.4rem);\n  }\n\n  .login-intro__copy {\n    margin-top: 26px;\n  }\n\n  .login-access {\n    min-height: 0;\n    padding: 42px 0 0;\n    border-top: 1px solid var(--colour-border-strong);\n    border-left: 0;\n  }\n\n  .login-access__index {\n    top: -3px;\n    left: 0;\n    width: 46px;\n    height: 5px;\n  }\n\n  .login-access__heading {\n    margin-top: 34px;\n  }\n}\n\n@media (max-width: 390px) {\n  .login-layout {\n    padding-block: 42px 54px;\n  }\n\n  .login-intro {\n    padding-bottom: 40px;\n  }\n\n  .login-intro h1 {\n    margin-top: 22px;\n    font-size: clamp(3.7rem, 18vw, 4.8rem);\n  }\n\n  .login-intro__copy {\n    margin-top: 22px;\n    line-height: 1.7;\n  }\n\n  .login-access {\n    padding-top: 36px;\n  }\n\n  .login-demo,\n  .login-register-link {\n    margin-top: 24px;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.CapabilitiesService }, { type: i4.ActivatedRoute }, { type: i4.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Login, { className: "Login", filePath: "src/app/features/auth/pages/login/login.ts", lineNumber: 34 }); })();

import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/auth/auth.service";
import * as i2 from "../../../core/capabilities/capabilities.service";
import * as i3 from "@angular/router";
function SiteHeader_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 7);
    i0.ɵɵtext(1, " Collection ");
    i0.ɵɵelementEnd();
} }
function SiteHeader_Conditional_18_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 10);
    i0.ɵɵtext(1, " Join the Vault ");
    i0.ɵɵelementEnd();
} }
function SiteHeader_Conditional_18_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 9);
    i0.ɵɵtext(1, " Log in ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(2, SiteHeader_Conditional_18_Conditional_0_Conditional_2_Template, 2, 0, "a", 10);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.capabilitiesService.publicRegistrationEnabled() ? 2 : -1);
} }
function SiteHeader_Conditional_18_Conditional_1_Conditional_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1, "Demo Vault");
    i0.ɵɵelementEnd();
} }
function SiteHeader_Conditional_18_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "span", 15);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, SiteHeader_Conditional_18_Conditional_1_Conditional_0_Conditional_3_Template, 2, 0, "span", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r3 = ctx;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("header-identity--demo", ctx_r0.authService.isDemo());
    i0.ɵɵattribute("aria-label", "Signed in as " + user_r3.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r3.userName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.authService.isDemo() ? 3 : -1);
} }
function SiteHeader_Conditional_18_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, SiteHeader_Conditional_18_Conditional_1_Conditional_0_Template, 4, 5, "div", 11);
    i0.ɵɵelement(1, "span", 12);
    i0.ɵɵelementStart(2, "button", 13);
    i0.ɵɵlistener("click", function SiteHeader_Conditional_18_Conditional_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.logout()); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((tmp_2_0 = ctx_r0.authService.currentUser()) ? 0 : -1, tmp_2_0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isLoggingOut());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isLoggingOut() ? "Logging out\u2026" : "Log out", " ");
} }
function SiteHeader_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, SiteHeader_Conditional_18_Conditional_0_Template, 3, 1)(1, SiteHeader_Conditional_18_Conditional_1_Template, 4, 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(!ctx_r0.authService.isAuthenticated() ? 0 : 1);
} }
export class SiteHeader {
    authService;
    capabilitiesService;
    router;
    isLoggingOut = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoggingOut" }] : /* istanbul ignore next */ []));
    constructor(authService, capabilitiesService, router) {
        this.authService = authService;
        this.capabilitiesService = capabilitiesService;
        this.router = router;
    }
    logout() {
        if (this.isLoggingOut()) {
            return;
        }
        this.isLoggingOut.set(true);
        this.authService.logout()
            .pipe(finalize(() => {
            this.isLoggingOut.set(false);
        }))
            .subscribe({
            next: () => {
                void this.router.navigate(['/']);
            },
            error: () => {
                // The backend remains authoritative. A failed logout request leaves
                // the current session state unchanged and simply re-enables the UI.
            }
        });
    }
    static ɵfac = function SiteHeader_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || SiteHeader)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.CapabilitiesService), i0.ɵɵdirectiveInject(i3.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SiteHeader, selectors: [["app-site-header"]], decls: 19, vars: 4, consts: [[1, "site-header"], [1, "container", "header-inner"], ["routerLink", "/", "aria-label", "Choom Vault \u2014 Home", 1, "brand"], [1, "brand-symbol"], [1, "brand-name"], ["aria-label", "Primary navigation", 1, "site-navigation"], ["routerLink", "/cards", "routerLinkActive", "is-active", "ariaCurrentWhenActive", "page"], ["routerLink", "/collection", "routerLinkActive", "is-active", "ariaCurrentWhenActive", "page"], ["aria-label", "Account actions", 1, "header-actions"], ["routerLink", "/login", "routerLinkActive", "is-active", 1, "btn", "btn--text", "header-login"], ["routerLink", "/register", 1, "btn", "btn--primary", "header-register"], [1, "header-identity", 3, "header-identity--demo"], ["aria-hidden", "true", 1, "header-private-seam"], ["type", "button", 1, "btn", "btn--text", "header-login", "header-logout", 3, "click", "disabled"], [1, "header-identity"], [1, "header-username"], [1, "header-demo-context"]], template: function SiteHeader_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "a", 2)(3, "span", 3)(4, "span");
            i0.ɵɵtext(5, "CV");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "small");
            i0.ɵɵtext(7, "01");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "span", 4)(9, "strong");
            i0.ɵɵtext(10, "Choom Vault");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "small");
            i0.ɵɵtext(12, "Collection Vault");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "nav", 5)(14, "a", 6);
            i0.ɵɵtext(15, " Catalogue ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(16, SiteHeader_Conditional_16_Template, 2, 0, "a", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 8);
            i0.ɵɵconditionalCreate(18, SiteHeader_Conditional_18_Template, 2, 1);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵclassProp("header-inner--authenticated", ctx.authService.isAuthenticated());
            i0.ɵɵadvance(15);
            i0.ɵɵconditional(ctx.authService.isAuthenticated() ? 16 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.authService.isInitialized() ? 18 : -1);
        } }, dependencies: [RouterLink,
            RouterLinkActive], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.site-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 20;\n  border-bottom: 1px solid var(--colour-border);\n  background: rgba(6, 8, 13, 0.86);\n  backdrop-filter: blur(18px);\n}\n\n.header-inner[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 88px;\n  grid-template-columns:\n    minmax(0, 1fr)\n    minmax(220px, auto)\n    minmax(0, 1fr);\n  align-items: center;\n  gap: 30px;\n}\n\n.header-inner[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {\n  justify-self: start;\n}\n\n.site-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 220px;\n  align-items: center;\n  justify-content: center;\n  gap: 34px;\n}\n\n.site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 34px 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.86rem;\n  font-weight: 700;\n  letter-spacing: 0.09em;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::after {\n  position: absolute;\n  right: 0;\n  bottom: 24px;\n  left: 0;\n  height: 3px;\n  background: var(--colour-yellow);\n  content: '';\n  transform: scaleX(0);\n  transform-origin: right;\n  transition: transform 160ms ease;\n}\n\n.site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.site-navigation[_ngcontent-%COMP%]   a.is-active[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n}\n\n.site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover::after, \n.site-navigation[_ngcontent-%COMP%]   a.is-active[_ngcontent-%COMP%]::after {\n  transform: scaleX(1);\n  transform-origin: left;\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  min-height: 48px;\n  align-items: center;\n  justify-self: end;\n  justify-content: flex-end;\n  gap: 14px;\n  white-space: nowrap;\n}\n\n.header-login.is-active[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n}\n\n\n\n\n\n\n\n\n\n.header-identity[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-width: 0;\n  grid-template-columns: 3px minmax(0, auto);\n  align-items: center;\n  column-gap: 10px;\n  white-space: nowrap;\n}\n\n.header-identity[_ngcontent-%COMP%]::before {\n  width: 3px;\n  height: 10px;\n  grid-column: 1;\n  grid-row: 1;\n  background: var(--colour-yellow);\n  content: '';\n}\n\n.header-identity--demo[_ngcontent-%COMP%]::before {\n  height: 24px;\n  grid-row: 1 / span 2;\n}\n\n.header-username[_ngcontent-%COMP%] {\n  grid-column: 2;\n  max-width: 240px;\n  overflow: hidden;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.09em;\n  line-height: 1.1;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.header-demo-context[_ngcontent-%COMP%] {\n  grid-column: 2;\n  margin-top: 4px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.56rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  line-height: 1;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.header-private-seam[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 24px;\n  margin-inline: 3px;\n  background: var(--colour-border-strong);\n}\n\n.header-logout[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  color: #7d8693;\n  font-weight: 700;\n}\n\n\n\n\n@media (max-width: 1000px) {\n  .header-inner[_ngcontent-%COMP%] {\n    grid-template-columns:\n      minmax(0, 1fr)\n      minmax(200px, auto)\n      minmax(0, 1fr);\n    gap: 22px;\n  }\n\n  .site-navigation[_ngcontent-%COMP%] {\n    min-width: 200px;\n  }\n\n  .header-actions[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n\n  .header-username[_ngcontent-%COMP%] {\n    max-width: 170px;\n  }\n}\n\n\n\n\n\n\n\n@media (max-width: 820px) {\n  .header-inner[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr auto;\n    gap: 18px;\n  }\n\n  .site-navigation[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n\n  .header-actions[_ngcontent-%COMP%] {\n    width: auto;\n    min-width: 0;\n  }\n\n  .site-navigation[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n\n  .header-register[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .header-username[_ngcontent-%COMP%] {\n    max-width: 100px;\n    font-size: 0.72rem;\n  }\n}\n\n\n\n\n\n\n\n\n\n@media (max-width: 560px) {\n  .header-inner[_ngcontent-%COMP%] {\n    min-height: 74px;\n    gap: 14px;\n  }\n\n  .site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    padding-block: 27px;\n    font-size: 0.78rem;\n  }\n\n  .site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::after {\n    bottom: 18px;\n    height: 2px;\n  }\n\n  .header-login[_ngcontent-%COMP%] {\n    padding-inline: 10px;\n    font-size: 0.76rem;\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n    grid-template-rows: 74px auto;\n    grid-template-areas:\n      'brand actions'\n      'navigation navigation';\n    gap: 0 16px;\n    padding-top: 0;\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {\n    grid-area: brand;\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    grid-area: actions;\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%]   .site-navigation[_ngcontent-%COMP%] {\n    grid-area: navigation;\n    justify-content: flex-start;\n    gap: 24px;\n    border-top: 1px solid var(--colour-border);\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%]   .site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    padding-block: 16px 18px;\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%]   .site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::after {\n    bottom: 10px;\n  }\n\n  .header-private-seam[_ngcontent-%COMP%] {\n    height: 20px;\n  }\n}\n\n@media (max-width: 390px) {\n  .header-inner[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n\n  .site-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n    letter-spacing: 0.06em;\n  }\n\n  .header-login[_ngcontent-%COMP%] {\n    padding-inline: 6px;\n    font-size: 0.72rem;\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%] {\n    gap: 0 10px;\n  }\n\n  .header-inner--authenticated[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n\n  .header-username[_ngcontent-%COMP%] {\n    max-width: 86px;\n    font-size: 0.68rem;\n    letter-spacing: 0.07em;\n  }\n\n  .header-demo-context[_ngcontent-%COMP%] {\n    font-size: 0.52rem;\n    letter-spacing: 0.11em;\n  }\n\n  .header-private-seam[_ngcontent-%COMP%] {\n    display: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SiteHeader, [{
        type: Component,
        args: [{ selector: 'app-site-header', standalone: true, imports: [
                    RouterLink,
                    RouterLinkActive
                ], template: "<header class=\"site-header\">\n  <div\n    class=\"container header-inner\"\n    [class.header-inner--authenticated]=\"authService.isAuthenticated()\"\n  >\n    <!-- Brand / Home -->\n    <a class=\"brand\" routerLink=\"/\" aria-label=\"Choom Vault \u2014 Home\">\n      <span class=\"brand-symbol\">\n        <span>CV</span>\n        <small>01</small>\n      </span>\n\n      <span class=\"brand-name\">\n        <strong>Choom Vault</strong>\n        <small>Collection Vault</small>\n      </span>\n    </a>\n\n    <!-- Only real, implemented destinations belong in primary navigation. -->\n    <nav class=\"site-navigation\" aria-label=\"Primary navigation\">\n      <a routerLink=\"/cards\" routerLinkActive=\"is-active\" ariaCurrentWhenActive=\"page\">\n        Catalogue\n      </a>\n\n      @if (authService.isAuthenticated()) {\n        <a routerLink=\"/collection\" routerLinkActive=\"is-active\" ariaCurrentWhenActive=\"page\">\n          Collection\n        </a>\n      }\n    </nav>\n\n    <div class=\"header-actions\" aria-label=\"Account actions\">\n      @if (authService.isInitialized()) {\n        @if (!authService.isAuthenticated()) {\n          <a class=\"btn btn--text header-login\" routerLink=\"/login\" routerLinkActive=\"is-active\">\n            Log in\n          </a>\n\n          @if (capabilitiesService.publicRegistrationEnabled()) {\n            <a class=\"btn btn--primary header-register\" routerLink=\"/register\"> Join the Vault </a>\n          }\n        } @else {\n          @if (authService.currentUser(); as user) {\n            <div\n              class=\"header-identity\"\n              [class.header-identity--demo]=\"authService.isDemo()\"\n              [attr.aria-label]=\"'Signed in as ' + user.userName\"\n            >\n              <span class=\"header-username\">{{ user.userName }}</span>\n\n              @if (authService.isDemo()) {\n                <span class=\"header-demo-context\">Demo Vault</span>\n              }\n            </div>\n          }\n\n          <span class=\"header-private-seam\" aria-hidden=\"true\"></span>\n\n          <button\n            class=\"btn btn--text header-login header-logout\"\n            type=\"button\"\n            [disabled]=\"isLoggingOut()\"\n            (click)=\"logout()\"\n          >\n            {{ isLoggingOut() ? 'Logging out\u2026' : 'Log out' }}\n          </button>\n        }\n      }\n    </div>\n  </div>\n</header>\n", styles: [":host {\n  display: block;\n}\n\n.site-header {\n  position: relative;\n  z-index: 20;\n  border-bottom: 1px solid var(--colour-border);\n  background: rgba(6, 8, 13, 0.86);\n  backdrop-filter: blur(18px);\n}\n\n.header-inner {\n  display: grid;\n  min-height: 88px;\n  grid-template-columns:\n    minmax(0, 1fr)\n    minmax(220px, auto)\n    minmax(0, 1fr);\n  align-items: center;\n  gap: 30px;\n}\n\n.header-inner .brand {\n  justify-self: start;\n}\n\n.site-navigation {\n  display: flex;\n  min-width: 220px;\n  align-items: center;\n  justify-content: center;\n  gap: 34px;\n}\n\n.site-navigation a {\n  position: relative;\n  padding: 34px 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.86rem;\n  font-weight: 700;\n  letter-spacing: 0.09em;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.site-navigation a::after {\n  position: absolute;\n  right: 0;\n  bottom: 24px;\n  left: 0;\n  height: 3px;\n  background: var(--colour-yellow);\n  content: '';\n  transform: scaleX(0);\n  transform-origin: right;\n  transition: transform 160ms ease;\n}\n\n.site-navigation a:hover,\n.site-navigation a.is-active {\n  color: var(--colour-text);\n}\n\n.site-navigation a:hover::after,\n.site-navigation a.is-active::after {\n  transform: scaleX(1);\n  transform-origin: left;\n}\n\n.header-actions {\n  display: flex;\n  min-width: 0;\n  min-height: 48px;\n  align-items: center;\n  justify-self: end;\n  justify-content: flex-end;\n  gap: 14px;\n  white-space: nowrap;\n}\n\n.header-login.is-active {\n  color: var(--colour-text);\n}\n\n/*\n * Authenticated identity is deliberately just a quiet recognition mark.\n * It is not an account widget, role badge or gamer profile treatment.\n *\n * Demo context sits beneath the real username rather than competing with it\n * horizontally. This gives the account area enough breathing room while the\n * shared brand and centred primary navigation stay in exactly the same shell.\n */\n.header-identity {\n  position: relative;\n  display: grid;\n  min-width: 0;\n  grid-template-columns: 3px minmax(0, auto);\n  align-items: center;\n  column-gap: 10px;\n  white-space: nowrap;\n}\n\n.header-identity::before {\n  width: 3px;\n  height: 10px;\n  grid-column: 1;\n  grid-row: 1;\n  background: var(--colour-yellow);\n  content: '';\n}\n\n.header-identity--demo::before {\n  height: 24px;\n  grid-row: 1 / span 2;\n}\n\n.header-username {\n  grid-column: 2;\n  max-width: 240px;\n  overflow: hidden;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.09em;\n  line-height: 1.1;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.header-demo-context {\n  grid-column: 2;\n  margin-top: 4px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.56rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  line-height: 1;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.header-private-seam {\n  width: 1px;\n  height: 24px;\n  margin-inline: 3px;\n  background: var(--colour-border-strong);\n}\n\n.header-logout {\n  flex: 0 0 auto;\n  color: #7d8693;\n  font-weight: 700;\n}\n\n/*\n * Intermediate desktop / tablet widths.\n */\n@media (max-width: 1000px) {\n  .header-inner {\n    grid-template-columns:\n      minmax(0, 1fr)\n      minmax(200px, auto)\n      minmax(0, 1fr);\n    gap: 22px;\n  }\n\n  .site-navigation {\n    min-width: 200px;\n  }\n\n  .header-actions {\n    gap: 10px;\n  }\n\n  .header-username {\n    max-width: 170px;\n  }\n}\n\n/*\n * Tablet.\n *\n * Join the Vault disappears before the essential brand / Catalogue / Login\n * structure becomes cramped.\n */\n@media (max-width: 820px) {\n  .header-inner {\n    grid-template-columns: auto 1fr auto;\n    gap: 18px;\n  }\n\n  .site-navigation {\n    min-width: 0;\n  }\n\n  .header-actions {\n    width: auto;\n    min-width: 0;\n  }\n\n  .site-navigation {\n    justify-content: center;\n  }\n\n  .header-register {\n    display: none;\n  }\n\n  .header-username {\n    max-width: 100px;\n    font-size: 0.72rem;\n  }\n}\n\n/*\n * Mobile.\n *\n * Signed-out navigation keeps the established compact public shell. Once a\n * collector is authenticated, identity/utility stay together on the top row\n * and the real product navigation receives its own row. This avoids squeezing\n * private navigation into a desktop-shaped strip as more destinations ship.\n */\n@media (max-width: 560px) {\n  .header-inner {\n    min-height: 74px;\n    gap: 14px;\n  }\n\n  .site-navigation a {\n    padding-block: 27px;\n    font-size: 0.78rem;\n  }\n\n  .site-navigation a::after {\n    bottom: 18px;\n    height: 2px;\n  }\n\n  .header-login {\n    padding-inline: 10px;\n    font-size: 0.76rem;\n  }\n\n  .header-inner--authenticated {\n    grid-template-columns: auto 1fr;\n    grid-template-rows: 74px auto;\n    grid-template-areas:\n      'brand actions'\n      'navigation navigation';\n    gap: 0 16px;\n    padding-top: 0;\n  }\n\n  .header-inner--authenticated .brand {\n    grid-area: brand;\n  }\n\n  .header-inner--authenticated .header-actions {\n    grid-area: actions;\n  }\n\n  .header-inner--authenticated .site-navigation {\n    grid-area: navigation;\n    justify-content: flex-start;\n    gap: 24px;\n    border-top: 1px solid var(--colour-border);\n  }\n\n  .header-inner--authenticated .site-navigation a {\n    padding-block: 16px 18px;\n  }\n\n  .header-inner--authenticated .site-navigation a::after {\n    bottom: 10px;\n  }\n\n  .header-private-seam {\n    height: 20px;\n  }\n}\n\n@media (max-width: 390px) {\n  .header-inner {\n    gap: 10px;\n  }\n\n  .site-navigation a {\n    font-size: 0.72rem;\n    letter-spacing: 0.06em;\n  }\n\n  .header-login {\n    padding-inline: 6px;\n    font-size: 0.72rem;\n  }\n\n  .header-inner--authenticated {\n    gap: 0 10px;\n  }\n\n  .header-inner--authenticated .header-actions {\n    gap: 8px;\n  }\n\n  .header-username {\n    max-width: 86px;\n    font-size: 0.68rem;\n    letter-spacing: 0.07em;\n  }\n\n  .header-demo-context {\n    font-size: 0.52rem;\n    letter-spacing: 0.11em;\n  }\n\n  .header-private-seam {\n    display: none;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.CapabilitiesService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SiteHeader, { className: "SiteHeader", filePath: "src/app/shared/layout/site-header/site-header.ts", lineNumber: 25 }); })();

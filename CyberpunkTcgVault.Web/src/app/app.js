import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './shared/layout/site-footer/site-footer';
import { SiteHeader } from './shared/layout/site-header/site-header';
import * as i0 from "@angular/core";
import * as i1 from "./core/auth/auth.service";
import * as i2 from "./core/capabilities/capabilities.service";
/**
 * Root application shell.
 *
 * Global navigation is owned here so individual pages only need to concern
 * themselves with their own content. Startup also begins the two shared reads
 * needed across the application: product capabilities and session restoration.
 */
export class App {
    authService;
    capabilitiesService;
    constructor(authService, capabilitiesService) {
        this.authService = authService;
        this.capabilitiesService = capabilitiesService;
    }
    ngOnInit() {
        // Both calls are one-shot HTTP requests and complete automatically.
        // Their services share/cache in-flight work so future guards/components do
        // not duplicate startup requests.
        this.authService.restoreSession().subscribe();
        this.capabilitiesService.load().subscribe();
    }
    static ɵfac = function App_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || App)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.CapabilitiesService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 5, vars: 0, consts: [[1, "app-shell"], [1, "app-route"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-site-header");
            i0.ɵɵelementStart(2, "div", 1);
            i0.ɵɵelement(3, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "app-site-footer");
            i0.ɵɵelementEnd();
        } }, dependencies: [RouterOutlet,
            SiteHeader,
            SiteFooter], styles: ["[_nghost-%COMP%] {\r\n    display: block;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.app-shell[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    min-height: 100vh;\r\n    flex-direction: column;\r\n    color: var(--colour-text);\r\n    background: var(--colour-background);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.app-route[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex: 1;\r\n    flex-direction: column;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', imports: [
                    RouterOutlet,
                    SiteHeader,
                    SiteFooter
                ], template: "<div class=\"app-shell\">\r\n  <app-site-header />\r\n\r\n  <div class=\"app-route\">\r\n    <router-outlet />\r\n  </div>\r\n\r\n  <app-site-footer />\r\n</div>\r\n", styles: [":host {\r\n    display: block;\r\n}\r\n\r\n/*\r\n * Global Choom Vault application shell.\r\n *\r\n * The root owns shared navigation and keeps the footer at the bottom of short\r\n * pages without making individual routes repeat the same shell structure.\r\n */\r\n.app-shell {\r\n    display: flex;\r\n    min-height: 100vh;\r\n    flex-direction: column;\r\n    color: var(--colour-text);\r\n    background: var(--colour-background);\r\n}\r\n\r\n/*\r\n * The active route occupies the space between the shared header and footer.\r\n * Individual route components continue to own their page-specific layout.\r\n */\r\n.app-route {\r\n    display: flex;\r\n    flex: 1;\r\n    flex-direction: column;\r\n}"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.CapabilitiesService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 29 }); })();

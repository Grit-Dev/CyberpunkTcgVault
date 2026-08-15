import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PRIMARY_OUTLET, TitleStrategy } from '@angular/router';
import * as i0 from "@angular/core";
/**
 * Keeps public page titles and metadata in sync with Angular routing.
 */
export class SeoTitleStrategy extends TitleStrategy {
    title = inject(Title);
    meta = inject(Meta);
    /**
     * Updates the browser title, description and robots metadata after a
     * successful Angular route navigation.
     */
    updateTitle(routerState) {
        const pageTitle = this.buildTitle(routerState);
        if (pageTitle) {
            this.title.setTitle(pageTitle);
        }
        const activeRoute = this.getDeepestPrimaryRoute(routerState.root);
        const description = activeRoute.data['description'];
        const robots = activeRoute.data['robots'];
        if (description) {
            this.meta.updateTag({
                name: 'description',
                content: description
            });
        }
        else {
            this.meta.removeTag("name='description'");
        }
        this.meta.updateTag({
            name: 'robots',
            content: robots ?? 'index, follow'
        });
    }
    /**
     * Finds the active leaf route so nested routes can own their own metadata
     * without changing this strategy later.
     */
    getDeepestPrimaryRoute(route) {
        let currentRoute = route;
        while (true) {
            const primaryChild = currentRoute.children.find(child => child.outlet === PRIMARY_OUTLET);
            if (!primaryChild) {
                return currentRoute;
            }
            currentRoute = primaryChild;
        }
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵSeoTitleStrategy_BaseFactory; return function SeoTitleStrategy_Factory(__ngFactoryType__) { return (ɵSeoTitleStrategy_BaseFactory || (ɵSeoTitleStrategy_BaseFactory = i0.ɵɵgetInheritedFactory(SeoTitleStrategy)))(__ngFactoryType__ || SeoTitleStrategy); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SeoTitleStrategy, factory: SeoTitleStrategy.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SeoTitleStrategy, [{
        type: Injectable
    }], null, null); })();

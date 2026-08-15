import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * Applies metadata that can only be known after route data has loaded.
 *
 * Text is passed through Angular's Title/Meta APIs; it is never interpreted as
 * HTML. Canonical paths are application-owned paths rather than user-provided
 * external URLs.
 */
export class DynamicSeoService {
    document = inject(DOCUMENT);
    title = inject(Title);
    meta = inject(Meta);
    apply(metadata) {
        this.title.setTitle(metadata.title);
        this.meta.updateTag({
            name: 'description',
            content: metadata.description
        });
        this.meta.updateTag({
            name: 'robots',
            content: metadata.robots
        });
        if (metadata.canonicalPath) {
            this.setCanonical(metadata.canonicalPath);
        }
        else {
            this.removeCanonical();
        }
    }
    removeCanonical() {
        this.document
            .querySelector('link[rel="canonical"]')
            ?.remove();
    }
    setCanonical(path) {
        this.removeCanonical();
        const link = this.document.createElement('link');
        link.rel = 'canonical';
        link.href = new URL(path, this.document.location.origin).href;
        this.document.head.appendChild(link);
    }
    static ɵfac = function DynamicSeoService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DynamicSeoService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DynamicSeoService, factory: DynamicSeoService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DynamicSeoService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

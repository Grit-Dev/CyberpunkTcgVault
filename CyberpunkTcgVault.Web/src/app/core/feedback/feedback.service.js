import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * One restrained transient feedback language for collector mutations.
 *
 * Persistent truth stays in the page itself (quantity, owned/wanted state,
 * etc.). This service only acknowledges completed work or explains a failure.
 */
export class FeedbackService {
    messageState = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "messageState" }] : /* istanbul ignore next */ []));
    dismissTimer;
    message = this.messageState.asReadonly();
    showStatus(text, durationMs = 2800) {
        this.show({ text, tone: 'status' }, durationMs);
    }
    showError(text, durationMs = 4200) {
        this.show({ text, tone: 'error' }, durationMs);
    }
    clear() {
        if (this.dismissTimer) {
            clearTimeout(this.dismissTimer);
            this.dismissTimer = undefined;
        }
        this.messageState.set(null);
    }
    show(message, durationMs) {
        this.clear();
        this.messageState.set(message);
        this.dismissTimer = setTimeout(() => {
            this.messageState.set(null);
            this.dismissTimer = undefined;
        }, durationMs);
    }
    static ɵfac = function FeedbackService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FeedbackService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FeedbackService, factory: FeedbackService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FeedbackService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

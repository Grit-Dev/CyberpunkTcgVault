import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/cards.service";
/*
 * Keeps card artwork loading behaviour consistent across the app.
 *
 * The directive resolves API image paths and automatically falls back to the
 * shared Vault placeholder when a card has no image or the image returns 404.
 */
export class CardArtworkDirective {
    elementRef;
    cardsService;
    imagePath = null;
    placeholderPath = '/images/cards/placeholder.png';
    hasUsedFallback = false;
    constructor(elementRef, cardsService) {
        this.elementRef = elementRef;
        this.cardsService = cardsService;
    }
    /**
     * Resolves the latest image path whenever Angular updates the input.
     */
    ngOnChanges() {
        this.hasUsedFallback = false;
        this.elementRef.nativeElement.src =
            this.cardsService.getImageUrl(this.imagePath);
    }
    /**
     * Replaces missing artwork with the shared placeholder.
     */
    onImageError() {
        if (this.hasUsedFallback) {
            return;
        }
        this.hasUsedFallback = true;
        this.elementRef.nativeElement.src =
            this.cardsService.getImageUrl(this.placeholderPath);
    }
    static ɵfac = function CardArtworkDirective_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CardArtworkDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.CardsService)); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: CardArtworkDirective, selectors: [["img", "appCardArtwork", ""]], hostBindings: function CardArtworkDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("error", function CardArtworkDirective_error_HostBindingHandler() { return ctx.onImageError(); });
        } }, inputs: { imagePath: [0, "appCardArtwork", "imagePath"] }, features: [i0.ɵɵNgOnChangesFeature] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardArtworkDirective, [{
        type: Directive,
        args: [{
                selector: 'img[appCardArtwork]',
                standalone: true
            }]
    }], () => [{ type: i0.ElementRef }, { type: i1.CardsService }], { imagePath: [{
            type: Input,
            args: ['appCardArtwork']
        }], onImageError: [{
            type: HostListener,
            args: ['error']
        }] }); })();

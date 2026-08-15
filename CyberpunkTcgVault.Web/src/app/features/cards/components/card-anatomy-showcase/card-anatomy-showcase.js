import { Component, HostListener, ViewChild } from '@angular/core';
import { V_STREETKID_ANATOMY } from '../../../../pages/home/data/v-streetkid-anatomy';
import * as i0 from "@angular/core";
const _c0 = ["explainCardButton"];
const _c1 = ["guidedModeButton"];
const _c2 = ["studyCard"];
const _forTrack0 = ($index, $item) => $item.id;
function CardAnatomyShowcase_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 4)(1, "div", 13)(2, "span", 14);
    i0.ɵɵtext(3, " VAULT LENS // CARD ANATOMY ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "div", 15)(5, "button", 16);
    i0.ɵɵdomListener("click", function CardAnatomyShowcase_Conditional_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setMode("guided")); });
    i0.ɵɵtext(6, " Guided ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "button", 16);
    i0.ɵɵdomListener("click", function CardAnatomyShowcase_Conditional_2_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setMode("showAll")); });
    i0.ɵɵtext(8, " Show All ");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(9, "button", 17);
    i0.ɵɵdomListener("click", function CardAnatomyShowcase_Conditional_2_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCardAnatomy()); });
    i0.ɵɵtext(10, " Close ");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("is-active", ctx_r1.mode === "guided");
    i0.ɵɵattribute("aria-pressed", ctx_r1.mode === "guided");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("is-active", ctx_r1.mode === "showAll");
    i0.ɵɵattribute("aria-pressed", ctx_r1.mode === "showAll");
} }
function CardAnatomyShowcase_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 6)(1, "p", 18);
    i0.ɵɵtext(2, " Learn the cards ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "h2", 19);
    i0.ɵɵtext(4, " VAULT LENS ");
    i0.ɵɵdomElementStart(5, "span");
    i0.ɵɵtext(6, "// CARD ANATOMY");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(7, "p", 20);
    i0.ɵɵtext(8, " New to the game or need a refresher? Explore the key parts of a card and learn what each field means before heading into the full rules. ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "div", 21)(10, "button", 22, 1);
    i0.ɵɵdomListener("click", function CardAnatomyShowcase_Conditional_4_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCardAnatomy()); });
    i0.ɵɵtext(12, " Explain Card ");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(13, "p", 23);
    i0.ɵɵtext(14, " Vault Lens provides a quick visual guide. For the latest complete rules and rulings, visit the ");
    i0.ɵɵdomElementStart(15, "a", 24);
    i0.ɵɵtext(16, " Official Gameplay Guide ");
    i0.ɵɵdomElementStart(17, "span", 25);
    i0.ɵɵtext(18, " (opens in a new tab) ");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵtext(19, ". ");
    i0.ɵɵdomElementEnd()();
} }
function CardAnatomyShowcase_Conditional_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 27);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentFieldIndex + 1, " ");
} }
function CardAnatomyShowcase_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 26);
    i0.ɵɵconditionalCreate(1, CardAnatomyShowcase_Conditional_9_Conditional_1_Template, 2, 1, "span", 27);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("top", ctx_r1.currentField.region.top, "%")("left", ctx_r1.currentField.region.left, "%")("width", ctx_r1.currentField.region.width, "%")("height", ctx_r1.currentField.region.height, "%");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.mode === "guided" ? 1 : -1);
} }
function CardAnatomyShowcase_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 29);
    i0.ɵɵdomListener("click", function CardAnatomyShowcase_Conditional_10_For_2_Template_button_click_0_listener() { const ɵ$index_72_r5 = i0.ɵɵrestoreView(_r4).$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectField(ɵ$index_72_r5)); });
    i0.ɵɵdomElementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const field_r6 = ctx.$implicit;
    const ɵ$index_72_r5 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("top", field_r6.marker.top, "%")("left", field_r6.marker.left, "%");
    i0.ɵɵclassProp("is-selected", ɵ$index_72_r5 === ctx_r1.currentFieldIndex);
    i0.ɵɵattribute("aria-label", "Explain " + field_r6.title)("aria-pressed", ɵ$index_72_r5 === ctx_r1.currentFieldIndex);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ɵ$index_72_r5 + 1, " ");
} }
function CardAnatomyShowcase_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 11);
    i0.ɵɵrepeaterCreate(1, CardAnatomyShowcase_Conditional_10_For_2_Template, 3, 9, "button", 28, _forTrack0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.anatomyFields);
} }
function CardAnatomyShowcase_Conditional_16_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 34)(1, "button", 35);
    i0.ɵɵdomListener("click", function CardAnatomyShowcase_Conditional_16_Conditional_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.previousField()); });
    i0.ɵɵtext(2, " Previous ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "button", 36);
    i0.ɵɵdomListener("click", function CardAnatomyShowcase_Conditional_16_Conditional_9_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.nextField()); });
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("disabled", ctx_r1.isFirstField);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isLastField ? "Finish" : "Next", " ");
} }
function CardAnatomyShowcase_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 30);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(2, "aside", 31)(3, "span", 32);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "h3", 33);
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(9, CardAnatomyShowcase_Conditional_16_Conditional_9_Template, 5, 2, "div", 34);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate4(" Field ", ctx_r1.currentFieldIndex + 1, " of ", ctx_r1.anatomyFields.length, ". ", ctx_r1.currentField.title, ". ", ctx_r1.currentField.description, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.currentFieldIndex + 1, " / ", ctx_r1.anatomyFields.length, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentField.title, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentField.description, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.mode === "guided" ? 9 : -1);
} }
export class CardAnatomyShowcase {
    elementRef;
    // Reference used to restore focus after Card Anatomy closes.
    explainCardButton;
    // First control focused when the learning experience opens.
    guidedModeButton;
    // Reference used to control the subtle homepage card motion.
    studyCard;
    // Stores whether the Card Anatomy experience is currently open.
    isOpen = false;
    // Stores which Card Anatomy mode the user is currently viewing.
    mode = 'guided';
    // Stores the position of the field currently being explained.
    currentFieldIndex = 0;
    // Fields available for the V StreetKid homepage showcase.
    anatomyFields = V_STREETKID_ANATOMY;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * Returns the field currently being explained.
     */
    get currentField() {
        return this.anatomyFields[this.currentFieldIndex];
    }
    /**
     * Returns true when the user is viewing
     * the first field in Guided mode.
     */
    get isFirstField() {
        return this.currentFieldIndex === 0;
    }
    /**
     * Returns true when the user is viewing
     * the final field in Guided mode.
     */
    get isLastField() {
        return this.currentFieldIndex ===
            this.anatomyFields.length - 1;
    }
    /**
     * Opens Card Anatomy and starts Guided mode
     * from the first available card field.
     */
    /**
     * Opens Card Anatomy and starts Guided mode
     * from the first available card field.
     */
    openCardAnatomy() {
        // Return the card to its resting position
        // before the study experience opens.
        this.resetCardMotion();
        this.currentFieldIndex = 0;
        this.mode = 'guided';
        this.isOpen = true;
        // Wait for Angular to render the active controls
        // before moving keyboard focus into the experience.
        setTimeout(() => {
            this.guidedModeButton
                ?.nativeElement
                .focus();
        });
    }
    /**
     * Closes Card Anatomy and returns the showcase
     * to its normal homepage state.
     */
    closeCardAnatomy() {
        this.isOpen = false;
        // Explain Card is recreated when the closed state renders,
        // so focus is restored after Angular updates the template.
        setTimeout(() => {
            this.explainCardButton
                ?.nativeElement
                .focus();
        });
    }
    /**
 * Applies a restrained physical tilt while the user
 * moves the mouse across the homepage study card.
 */
    onCardPointerMove(event) {
        // Card motion is only used before Vault Lens opens
        // and only when a mouse is being used.
        if (this.isOpen ||
            event.pointerType !== 'mouse') {
            return;
        }
        const card = event.currentTarget;
        const bounds = card.getBoundingClientRect();
        // Convert the cursor position into values
        // between 0 and 1 across the card.
        const x = (event.clientX - bounds.left) /
            bounds.width;
        const y = (event.clientY - bounds.top) /
            bounds.height;
        // Keep the rotation deliberately restrained
        // so the card still feels like a physical collectible.
        const rotateX = (0.5 - y) * 3;
        const rotateY = (x - 0.5) * 3.6;
        card.style.setProperty('--card-rotate-x', `${rotateX}deg`);
        card.style.setProperty('--card-rotate-y', `${rotateY}deg`);
    }
    /**
     * Returns the showcase card to its resting position.
     */
    resetCardMotion() {
        const card = this.studyCard?.nativeElement;
        if (!card) {
            return;
        }
        card.style.setProperty('--card-rotate-x', '0deg');
        card.style.setProperty('--card-rotate-y', '0deg');
    }
    /**
     * Changes between Guided and Show All mode.
     *
     * The currently selected field is kept when changing
     * modes so the user does not lose their position.
     */
    setMode(mode) {
        this.mode = mode;
    }
    /**
     * Selects one of the numbered card fields
     * displayed during Show All mode.
     */
    selectField(index) {
        this.currentFieldIndex = index;
    }
    /**
     * Moves Guided mode to the next card field.
     *
     * When the user reaches the final field,
     * the same action finishes and closes the guide.
     */
    nextField() {
        if (this.isLastField) {
            this.closeCardAnatomy();
            return;
        }
        this.currentFieldIndex++;
    }
    /**
     * Moves Guided mode back to the previous field.
     */
    previousField() {
        if (this.isFirstField) {
            return;
        }
        this.currentFieldIndex--;
    }
    /**
     * Handles keyboard navigation while Card Anatomy
     * is active.
     */
    handleKeyboardNavigation(event) {
        if (!this.isOpen) {
            return;
        }
        // Escape is available from either mode.
        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeCardAnatomy();
            return;
        }
        // Keep keyboard focus inside the active
        // Card Anatomy experience.
        if (event.key === 'Tab') {
            this.trapFocus(event);
            return;
        }
        // Arrow and Home/End navigation only apply
        // to the sequential Guided experience.
        if (this.mode !== 'guided') {
            return;
        }
        switch (event.key) {
            case 'ArrowRight':
                event.preventDefault();
                this.nextField();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.previousField();
                break;
            case 'Home':
                event.preventDefault();
                this.currentFieldIndex = 0;
                break;
            case 'End':
                event.preventDefault();
                this.currentFieldIndex =
                    this.anatomyFields.length - 1;
                break;
        }
    }
    /**
     * Keeps Tab navigation inside Card Anatomy
     * while the learning experience is open.
     */
    trapFocus(event) {
        const focusableElements = this.getFocusableElements();
        if (focusableElements.length === 0) {
            return;
        }
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;
        if (event.shiftKey &&
            activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            return;
        }
        if (!event.shiftKey &&
            activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
    /**
     * Returns the controls that can currently receive
     * keyboard focus inside Card Anatomy.
     */
    getFocusableElements() {
        const selector = [
            'button:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');
        return Array.from(this.elementRef.nativeElement
            .querySelectorAll(selector)).filter(element => element.offsetParent !== null);
    }
    static ɵfac = function CardAnatomyShowcase_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CardAnatomyShowcase)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CardAnatomyShowcase, selectors: [["app-card-anatomy-showcase"]], viewQuery: function CardAnatomyShowcase_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5)(_c2, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.explainCardButton = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.guidedModeButton = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.studyCard = _t.first);
        } }, hostBindings: function CardAnatomyShowcase_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function CardAnatomyShowcase_keydown_HostBindingHandler($event) { return ctx.handleKeyboardNavigation($event); }, i0.ɵɵresolveDocument);
        } }, decls: 17, vars: 7, consts: [["studyCard", ""], ["explainCardButton", ""], ["aria-labelledby", "card-anatomy-title", 1, "card-anatomy-showcase"], [1, "container"], [1, "card-anatomy-showcase__command-rail"], [1, "card-anatomy-showcase__layout"], [1, "card-anatomy-showcase__copy"], [1, "card-anatomy-showcase__card-stage"], [1, "card-anatomy-showcase__card", 3, "pointermove", "pointerleave"], ["src", "images/showcase/v-streetkid.webp", "alt", "V StreetKid Legend card"], ["aria-hidden", "true", 1, "card-anatomy-showcase__highlight", 3, "top", "left", "width", "height"], [1, "card-anatomy-showcase__all-markers"], [1, "card-anatomy-showcase__card-label"], [1, "card-anatomy-showcase__command-main"], [1, "card-anatomy-showcase__command-code"], ["role", "group", "aria-label", "Card Anatomy view", 1, "card-anatomy-showcase__modes"], ["type", "button", 3, "click"], ["type", "button", "aria-label", "Close Card Anatomy", 1, "btn", "btn--text", 3, "click"], [1, "eyebrow"], ["id", "card-anatomy-title"], [1, "card-anatomy-showcase__description"], [1, "card-anatomy-showcase__actions"], ["type", "button", "aria-label", "Explain this card", 1, "btn", "btn--primary", 3, "click"], [1, "card-anatomy-showcase__note"], ["href", "https://cyberpunktcg.com/gameplay-guide", "target", "_blank", "rel", "noopener noreferrer"], [1, "sr-only"], ["aria-hidden", "true", 1, "card-anatomy-showcase__highlight"], [1, "card-anatomy-showcase__marker"], ["type", "button", 1, "card-anatomy-showcase__all-marker", 3, "is-selected", "top", "left"], ["type", "button", 1, "card-anatomy-showcase__all-marker", 3, "click"], ["aria-live", "polite", "aria-atomic", "true", 1, "sr-only"], ["aria-labelledby", "card-anatomy-field-title", 1, "card-anatomy-showcase__docket"], [1, "card-anatomy-showcase__progress"], ["id", "card-anatomy-field-title"], [1, "card-anatomy-showcase__navigation"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--primary", 3, "click"]], template: function CardAnatomyShowcase_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 2)(1, "div", 3);
            i0.ɵɵconditionalCreate(2, CardAnatomyShowcase_Conditional_2_Template, 11, 6, "div", 4);
            i0.ɵɵdomElementStart(3, "div", 5);
            i0.ɵɵconditionalCreate(4, CardAnatomyShowcase_Conditional_4_Template, 20, 0, "div", 6);
            i0.ɵɵdomElementStart(5, "div", 7)(6, "div", 8, 0);
            i0.ɵɵdomListener("pointermove", function CardAnatomyShowcase_Template_div_pointermove_6_listener($event) { return ctx.onCardPointerMove($event); })("pointerleave", function CardAnatomyShowcase_Template_div_pointerleave_6_listener() { return ctx.resetCardMotion(); });
            i0.ɵɵdomElement(8, "img", 9);
            i0.ɵɵconditionalCreate(9, CardAnatomyShowcase_Conditional_9_Template, 2, 9, "div", 10);
            i0.ɵɵconditionalCreate(10, CardAnatomyShowcase_Conditional_10_Template, 3, 0, "div", 11);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(11, "div", 12)(12, "span");
            i0.ɵɵtext(13, " VAULT LENS // STUDY CARD ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(14, "strong");
            i0.ɵɵtext(15, " V // StreetKid ");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵconditionalCreate(16, CardAnatomyShowcase_Conditional_16_Template, 10, 9);
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            i0.ɵɵclassProp("card-anatomy-showcase--active", ctx.isOpen);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isOpen ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.isOpen ? 4 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.isOpen ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isOpen && ctx.mode === "showAll" ? 10 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.isOpen ? 16 : -1);
        } }, styles: ["[_nghost-%COMP%] {\r\n    display: block;\r\n}\r\n\r\n.card-anatomy-showcase[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    padding-block: 120px;\r\n    color: var(--colour-text);\r\n    border-bottom: 1px solid var(--colour-border);\r\n    background:\r\n        radial-gradient(circle at 72% 42%,\r\n            rgba(242, 233, 0, 0.035),\r\n            transparent 32%),\r\n        var(--colour-background);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__layout[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    grid-template-columns:\r\n        minmax(0, 0.72fr) minmax(480px, 1.28fr);\r\n    align-items: center;\r\n    gap: 80px;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase--active[_ngcontent-%COMP%]   .card-anatomy-showcase__layout[_ngcontent-%COMP%] {\r\n    grid-template-columns:\r\n        minmax(480px, 1.18fr) minmax(320px, 0.82fr);\r\n    align-items: center;\r\n    gap: 64px;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__command-rail[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 30px;\r\n    margin-bottom: 34px;\r\n    padding-bottom: 18px;\r\n    border-bottom: 1px solid var(--colour-border);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__command-main[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 24px;\r\n}\r\n\r\n.card-anatomy-showcase__command-code[_ngcontent-%COMP%] {\r\n    color: var(--colour-yellow);\r\n    font-family: var(--font-display);\r\n    font-size: 0.67rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.13em;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__modes[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n}\r\n\r\n.card-anatomy-showcase__modes[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    min-height: 44px;\r\n    padding: 0 13px;\r\n    color: var(--colour-text-muted);\r\n    background: transparent;\r\n    border: 1px solid transparent;\r\n    cursor: pointer;\r\n    font-family: var(--font-display);\r\n    font-size: 0.64rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.09em;\r\n    text-transform: uppercase;\r\n    transition:\r\n        color 140ms ease,\r\n        background 140ms ease,\r\n        border-color 140ms ease;\r\n}\r\n\r\n.card-anatomy-showcase__modes[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n    color: var(--colour-text);\r\n}\r\n\r\n.card-anatomy-showcase__modes[_ngcontent-%COMP%]   button.is-active[_ngcontent-%COMP%] {\r\n    color: var(--colour-background);\r\n    background: var(--colour-yellow);\r\n    border-color: var(--colour-yellow);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__copy[_ngcontent-%COMP%] {\r\n    max-width: 650px;\r\n}\r\n\r\n.card-anatomy-showcase__copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    margin: 20px 0 0;\r\n    font-family: var(--font-display);\r\n    font-size: clamp(3rem, 4.5vw, 4.8rem);\r\n    font-weight: 900;\r\n    line-height: 0.95;\r\n    letter-spacing: -0.02em;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.card-anatomy-showcase__copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    display: block;\r\n    margin-top: 10px;\r\n    color: var(--colour-yellow);\r\n}\r\n\r\n.card-anatomy-showcase__description[_ngcontent-%COMP%] {\r\n    max-width: 590px;\r\n    margin: 28px 0 0;\r\n    color: var(--colour-text-muted);\r\n    font-size: 0.95rem;\r\n    line-height: 1.75;\r\n}\r\n\r\n.card-anatomy-showcase__actions[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    align-items: center;\r\n    gap: 18px;\r\n    margin-top: 34px;\r\n}\r\n\r\n.card-anatomy-showcase__note[_ngcontent-%COMP%] {\r\n    max-width: 560px;\r\n    margin: 26px 0 0;\r\n    padding-top: 22px;\r\n    color: var(--colour-text-muted);\r\n    border-top: 1px solid var(--colour-border);\r\n    font-size: 0.76rem;\r\n    line-height: 1.65;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    color: var(--colour-yellow);\r\n    font-weight: 700;\r\n    text-decoration-line: underline;\r\n    text-decoration-thickness: 1px;\r\n    text-underline-offset: 3px;\r\n    transition:\r\n        color 140ms ease,\r\n        text-decoration-color 140ms ease;\r\n}\r\n\r\n.card-anatomy-showcase__note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n    color: var(--colour-text);\r\n}\r\n\r\n.card-anatomy-showcase__note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible {\r\n    outline: 2px solid var(--colour-cyan);\r\n    outline-offset: 3px;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__card-stage[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    display: flex;\r\n    min-width: 0;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\n.card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n    --card-rotate-x: 0deg;\r\n    --card-rotate-y: 0deg;\r\n\r\n    position: relative;\r\n    width: min(100%, 580px);\r\n    transform:\r\n        perspective(1100px) translateY(0) rotateX(var(--card-rotate-x)) rotateY(var(--card-rotate-y)) scale(1);\r\n    transform-style: preserve-3d;\r\n    transition:\r\n        transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),\r\n        filter 180ms ease;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n@media (hover: hover) and (pointer: fine) {\r\n    .card-anatomy-showcase[_ngcontent-%COMP%]:not(.card-anatomy-showcase--active)   .card-anatomy-showcase__card[_ngcontent-%COMP%]:hover {\r\n        transform:\r\n            perspective(1100px) translateY(-4px) rotateX(var(--card-rotate-x)) rotateY(var(--card-rotate-y)) scale(1.01);\r\n        filter: drop-shadow(0 20px 28px rgba(0, 0, 0, 0.32));\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase--active[_ngcontent-%COMP%]   .card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n    transform: none;\r\n    filter: none;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__card[_ngcontent-%COMP%]::before {\r\n    position: absolute;\r\n    z-index: -1;\r\n    inset: 8% -5% -2%;\r\n    background: rgba(242, 233, 0, 0.045);\r\n    filter: blur(55px);\r\n    content: \"\";\r\n    pointer-events: none;\r\n}\r\n\r\n.card-anatomy-showcase__card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    display: block;\r\n    width: 100%;\r\n    height: auto;\r\n    object-fit: contain;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__highlight[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    z-index: 4;\r\n    border: 2px solid var(--colour-yellow);\r\n    pointer-events: none;\r\n    transition:\r\n        top 160ms ease,\r\n        left 160ms ease,\r\n        width 160ms ease,\r\n        height 160ms ease;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__marker[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    top: -13px;\r\n    right: -13px;\r\n    display: grid;\r\n    width: 27px;\r\n    height: 27px;\r\n    place-items: center;\r\n    color: var(--colour-background);\r\n    background: var(--colour-yellow);\r\n    border: 2px solid var(--colour-background);\r\n    font-family: var(--font-display);\r\n    font-size: 0.68rem;\r\n    font-weight: 900;\r\n    line-height: 1;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__all-markers[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    z-index: 6;\r\n    inset: 0;\r\n    pointer-events: none;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__all-marker[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    display: grid;\r\n    width: 44px;\r\n    height: 44px;\r\n    padding: 0;\r\n    place-items: center;\r\n    background: transparent;\r\n    border: 0;\r\n    cursor: pointer;\r\n    transform: translate(-50%, -50%);\r\n    pointer-events: auto;\r\n}\r\n\r\n.card-anatomy-showcase__all-marker[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    display: grid;\r\n    width: 27px;\r\n    height: 27px;\r\n    place-items: center;\r\n    color: var(--colour-background);\r\n    background: var(--colour-yellow);\r\n    border: 2px solid var(--colour-background);\r\n    font-family: var(--font-display);\r\n    font-size: 0.68rem;\r\n    font-weight: 900;\r\n    line-height: 1;\r\n    transition:\r\n        transform 160ms ease,\r\n        outline-offset 160ms ease;\r\n}\r\n\r\n.card-anatomy-showcase__all-marker[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\r\n    transform: scale(1.08);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__all-marker.is-selected[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    outline: 2px solid var(--colour-yellow);\r\n    outline-offset: 3px;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__card-label[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    width: min(100%, 580px);\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 18px;\r\n    margin-top: 18px;\r\n    padding-top: 14px;\r\n    border-top: 1px solid var(--colour-border);\r\n}\r\n\r\n.card-anatomy-showcase__card-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    color: var(--colour-yellow);\r\n    font-family: var(--font-display);\r\n    font-size: 0.58rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.12em;\r\n}\r\n\r\n.card-anatomy-showcase__card-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n    color: var(--colour-text-muted);\r\n    font-family: var(--font-display);\r\n    font-size: 0.68rem;\r\n    font-weight: 700;\r\n    letter-spacing: 0.08em;\r\n    text-align: right;\r\n    text-transform: uppercase;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.card-anatomy-showcase__docket[_ngcontent-%COMP%] {\r\n    align-self: center;\r\n    width: 100%;\r\n    padding: 34px;\r\n    background: var(--colour-surface);\r\n    border: 1px solid var(--colour-border-strong);\r\n    clip-path: polygon(0 0,\r\n            calc(100% - 18px) 0,\r\n            100% 18px,\r\n            100% 100%,\r\n            0 100%);\r\n}\r\n\r\n.card-anatomy-showcase__progress[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    color: var(--colour-yellow);\r\n    font-family: var(--font-display);\r\n    font-size: 0.7rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.12em;\r\n}\r\n\r\n.card-anatomy-showcase__docket[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n    margin: 18px 0 0;\r\n    font-family: var(--font-display);\r\n    font-size: clamp(2rem, 3vw, 3rem);\r\n    font-weight: 900;\r\n    line-height: 1;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.card-anatomy-showcase__docket[_ngcontent-%COMP%] > p[_ngcontent-%COMP%] {\r\n    margin: 20px 0 0;\r\n    color: var(--colour-text-muted);\r\n    font-size: 0.92rem;\r\n    line-height: 1.75;\r\n}\r\n\r\n.card-anatomy-showcase__navigation[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 10px;\r\n    margin-top: 32px;\r\n}\r\n\r\n.card-anatomy-showcase__navigation[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled {\r\n    cursor: not-allowed;\r\n    opacity: 0.45;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 1121px) and (max-width: 2000px) {\r\n    .card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n        width: min(100%, 520px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label[_ngcontent-%COMP%] {\r\n        width: min(100%, 520px);\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media (max-width: 1120px) {\r\n    .card-anatomy-showcase__layout[_ngcontent-%COMP%] {\r\n        grid-template-columns:\r\n            minmax(0, 0.8fr) minmax(360px, 1fr);\r\n        gap: 55px;\r\n    }\r\n\r\n    .card-anatomy-showcase--active[_ngcontent-%COMP%]   .card-anatomy-showcase__layout[_ngcontent-%COMP%] {\r\n        grid-template-columns:\r\n            minmax(400px, 1.1fr) minmax(300px, 0.9fr);\r\n        gap: 45px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n        width: min(100%, 500px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label[_ngcontent-%COMP%] {\r\n        width: min(100%, 500px);\r\n    }\r\n\r\n    .card-anatomy-showcase__docket[_ngcontent-%COMP%] {\r\n        padding: 28px;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n@media (max-width: 820px) {\r\n    .card-anatomy-showcase[_ngcontent-%COMP%] {\r\n        padding-block: 90px;\r\n    }\r\n\r\n    .card-anatomy-showcase__layout[_ngcontent-%COMP%] {\r\n        grid-template-columns: 1fr;\r\n        gap: 55px;\r\n    }\r\n\r\n    .card-anatomy-showcase--active[_ngcontent-%COMP%]   .card-anatomy-showcase__layout[_ngcontent-%COMP%] {\r\n        grid-template-columns: 1fr;\r\n        gap: 30px;\r\n    }\r\n\r\n    .card-anatomy-showcase__command-rail[_ngcontent-%COMP%] {\r\n        margin-bottom: 30px;\r\n    }\r\n\r\n    .card-anatomy-showcase__copy[_ngcontent-%COMP%] {\r\n        max-width: 700px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n        width: min(100%, 470px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label[_ngcontent-%COMP%] {\r\n        width: min(100%, 470px);\r\n    }\r\n\r\n    .card-anatomy-showcase__docket[_ngcontent-%COMP%] {\r\n        width: 100%;\r\n        padding: 28px;\r\n    }\r\n\r\n    .card-anatomy-showcase__docket[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n        font-size: clamp(2rem, 8vw, 2.7rem);\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n@media (max-width: 900px) and (orientation: landscape) and (max-height: 600px) {\r\n    .card-anatomy-showcase--active[_ngcontent-%COMP%]   .card-anatomy-showcase__layout[_ngcontent-%COMP%] {\r\n        grid-template-columns:\r\n            minmax(260px, 1fr) minmax(280px, 0.85fr);\r\n        align-items: center;\r\n        gap: 32px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n        width: min(100%, 360px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label[_ngcontent-%COMP%] {\r\n        width: min(100%, 360px);\r\n    }\r\n\r\n    .card-anatomy-showcase__docket[_ngcontent-%COMP%] {\r\n        padding: 24px;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media (max-width: 560px) {\r\n    .card-anatomy-showcase[_ngcontent-%COMP%] {\r\n        padding-block: 70px;\r\n    }\r\n\r\n    .card-anatomy-showcase__copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n        font-size: clamp(2.7rem, 13vw, 4rem);\r\n    }\r\n\r\n    .card-anatomy-showcase__actions[_ngcontent-%COMP%] {\r\n        align-items: stretch;\r\n        flex-direction: column;\r\n    }\r\n\r\n    .card-anatomy-showcase__actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\r\n        width: 100%;\r\n    }\r\n\r\n    \r\n\r\n\r\n\r\n    .card-anatomy-showcase__command-main[_ngcontent-%COMP%] {\r\n        align-items: flex-start;\r\n        flex-direction: column;\r\n        gap: 10px;\r\n    }\r\n\r\n    .card-anatomy-showcase__command-rail[_ngcontent-%COMP%] {\r\n        align-items: flex-start;\r\n    }\r\n\r\n    .card-anatomy-showcase__modes[_ngcontent-%COMP%] {\r\n        flex-wrap: wrap;\r\n    }\r\n\r\n    .card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n        width: min(100%, 390px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label[_ngcontent-%COMP%] {\r\n        width: min(100%, 390px);\r\n        align-items: flex-start;\r\n        flex-direction: column;\r\n        gap: 7px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n        text-align: left;\r\n    }\r\n\r\n    .card-anatomy-showcase__docket[_ngcontent-%COMP%] {\r\n        padding: 24px 22px;\r\n    }\r\n\r\n    .card-anatomy-showcase__navigation[_ngcontent-%COMP%] {\r\n        display: grid;\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n    .card-anatomy-showcase__navigation[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n@media (prefers-reduced-motion: reduce) {\r\n    .card-anatomy-showcase__card[_ngcontent-%COMP%] {\r\n        transform: none !important;\r\n        transition: none;\r\n    }\r\n\r\n    .card-anatomy-showcase__highlight[_ngcontent-%COMP%], \r\n   .card-anatomy-showcase__all-marker[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \r\n   .card-anatomy-showcase__modes[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \r\n   .card-anatomy-showcase__note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n        transition: none;\r\n    }\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardAnatomyShowcase, [{
        type: Component,
        args: [{ selector: 'app-card-anatomy-showcase', standalone: true, imports: [], template: "<section class=\"card-anatomy-showcase\" [class.card-anatomy-showcase--active]=\"isOpen\"\r\n    aria-labelledby=\"card-anatomy-title\">\r\n    <div class=\"container\">\r\n\r\n        @if (isOpen) {\r\n\r\n        <!-- Controls the active Card Anatomy study experience. -->\r\n        <div class=\"card-anatomy-showcase__command-rail\">\r\n\r\n            <div class=\"card-anatomy-showcase__command-main\">\r\n\r\n                <span class=\"card-anatomy-showcase__command-code\">\r\n                    VAULT LENS // CARD ANATOMY\r\n                </span>\r\n\r\n                <div class=\"card-anatomy-showcase__modes\" role=\"group\" aria-label=\"Card Anatomy view\">\r\n\r\n                    <button type=\"button\" [class.is-active]=\"mode === 'guided'\" [attr.aria-pressed]=\"mode === 'guided'\"\r\n                        (click)=\"setMode('guided')\">\r\n                        Guided\r\n                    </button>\r\n\r\n                    <button type=\"button\" [class.is-active]=\"mode === 'showAll'\"\r\n                        [attr.aria-pressed]=\"mode === 'showAll'\" (click)=\"setMode('showAll')\">\r\n                        Show All\r\n                    </button>\r\n\r\n                </div>\r\n\r\n            </div>\r\n\r\n            <button class=\"btn btn--text\" type=\"button\" aria-label=\"Close Card Anatomy\" (click)=\"closeCardAnatomy()\">\r\n                Close\r\n            </button>\r\n\r\n        </div>\r\n\r\n        }\r\n\r\n\r\n        <div class=\"card-anatomy-showcase__layout\">\r\n\r\n            @if (!isOpen) {\r\n\r\n            <!-- Homepage introduction shown before the learning mode is opened. -->\r\n            <div class=\"card-anatomy-showcase__copy\">\r\n\r\n                <p class=\"eyebrow\">\r\n                    Learn the cards\r\n                </p>\r\n\r\n                <h2 id=\"card-anatomy-title\">\r\n                    VAULT LENS\r\n                    <span>// CARD ANATOMY</span>\r\n                </h2>\r\n\r\n                <p class=\"card-anatomy-showcase__description\">\r\n                    New to the game or need a refresher? Explore the key parts of a\r\n                    card and learn what each field means before heading into the full\r\n                    rules.\r\n                </p>\r\n\r\n                <div class=\"card-anatomy-showcase__actions\">\r\n\r\n                    <button #explainCardButton class=\"btn btn--primary\" type=\"button\" aria-label=\"Explain this card\"\r\n                        (click)=\"openCardAnatomy()\">\r\n                        Explain Card\r\n                    </button>\r\n\r\n                </div>\r\n\r\n                <p class=\"card-anatomy-showcase__note\">\r\n                    Vault Lens provides a quick visual guide. For the latest complete\r\n                    rules and rulings, visit the\r\n\r\n                    <a href=\"https://cyberpunktcg.com/gameplay-guide\" target=\"_blank\" rel=\"noopener noreferrer\">\r\n                        Official Gameplay Guide\r\n                        <span class=\"sr-only\">\r\n                            (opens in a new tab)\r\n                        </span>\r\n                    </a>.\r\n                </p>\r\n\r\n            </div>\r\n\r\n            }\r\n\r\n\r\n            <!--\r\n        The same card is reused by both Guided and Show All mode.\r\n        Only the anatomy controls placed over it change.\r\n      -->\r\n            <div class=\"card-anatomy-showcase__card-stage\">\r\n\r\n                <div #studyCard class=\"card-anatomy-showcase__card\" (pointermove)=\"onCardPointerMove($event)\"\r\n                    (pointerleave)=\"resetCardMotion()\">\r\n\r\n                    <img src=\"images/showcase/v-streetkid.webp\" alt=\"V StreetKid Legend card\" />\r\n\r\n\r\n                    @if (isOpen) {\r\n\r\n                    <!--\r\n              Only the currently selected field receives a yellow highlight,\r\n              regardless of which Card Anatomy mode is active.\r\n            -->\r\n                    <div class=\"card-anatomy-showcase__highlight\" [style.top.%]=\"currentField.region.top\"\r\n                        [style.left.%]=\"currentField.region.left\" [style.width.%]=\"currentField.region.width\"\r\n                        [style.height.%]=\"currentField.region.height\" aria-hidden=\"true\">\r\n\r\n                        @if (mode === 'guided') {\r\n\r\n                        <span class=\"card-anatomy-showcase__marker\">\r\n                            {{ currentFieldIndex + 1 }}\r\n                        </span>\r\n\r\n                        }\r\n\r\n                    </div>\r\n\r\n                    }\r\n\r\n\r\n                    @if (isOpen && mode === 'showAll') {\r\n\r\n                    <!--\r\n              Show All exposes every available card field as a compact\r\n              numbered control around the perimeter of the card.\r\n            -->\r\n                    <div class=\"card-anatomy-showcase__all-markers\">\r\n\r\n                        @for (\r\n                        field of anatomyFields;\r\n                        track field.id;\r\n                        let index = $index\r\n                        ) {\r\n\r\n                        <button class=\"card-anatomy-showcase__all-marker\" type=\"button\"\r\n                            [class.is-selected]=\"index === currentFieldIndex\" [style.top.%]=\"field.marker.top\"\r\n                            [style.left.%]=\"field.marker.left\" [attr.aria-label]=\"'Explain ' + field.title\"\r\n                            [attr.aria-pressed]=\"index === currentFieldIndex\" (click)=\"selectField(index)\">\r\n                            <span>\r\n                                {{ index + 1 }}\r\n                            </span>\r\n                        </button>\r\n\r\n                        }\r\n\r\n                    </div>\r\n\r\n                    }\r\n\r\n                </div>\r\n\r\n\r\n                <div class=\"card-anatomy-showcase__card-label\">\r\n\r\n                    <span>\r\n                        VAULT LENS // STUDY CARD\r\n                    </span>\r\n\r\n                    <strong>\r\n                        V // StreetKid\r\n                    </strong>\r\n\r\n                </div>\r\n\r\n            </div>\r\n\r\n            @if (isOpen) {\r\n\r\n            <!-- Announces the selected Card Anatomy field to screen readers. -->\r\n            <div class=\"sr-only\" aria-live=\"polite\" aria-atomic=\"true\">\r\n                Field {{ currentFieldIndex + 1 }}\r\n                of {{ anatomyFields.length }}.\r\n                {{ currentField.title }}.\r\n                {{ currentField.description }}\r\n            </div>\r\n\r\n            <!--\r\n      A single stable learning docket is reused by both modes.\r\n      Selecting a different field changes only its content.\r\n    -->\r\n            <aside class=\"card-anatomy-showcase__docket\" aria-labelledby=\"card-anatomy-field-title\">\r\n\r\n                <span class=\"card-anatomy-showcase__progress\">\r\n                    {{ currentFieldIndex + 1 }} / {{ anatomyFields.length }}\r\n                </span>\r\n\r\n                <h3 id=\"card-anatomy-field-title\">\r\n                    {{ currentField.title }}\r\n                </h3>\r\n\r\n                <p>\r\n                    {{ currentField.description }}\r\n                </p>\r\n\r\n                @if (mode === 'guided') {\r\n\r\n                <div class=\"card-anatomy-showcase__navigation\">\r\n\r\n                    <button class=\"btn btn--secondary\" type=\"button\" [disabled]=\"isFirstField\"\r\n                        (click)=\"previousField()\">\r\n                        Previous\r\n                    </button>\r\n\r\n                    <button class=\"btn btn--primary\" type=\"button\" (click)=\"nextField()\">\r\n                        {{ isLastField ? 'Finish' : 'Next' }}\r\n                    </button>\r\n\r\n                </div>\r\n\r\n                }\r\n\r\n            </aside>\r\n            }\r\n\r\n        </div>\r\n    </div>\r\n</section>", styles: [":host {\r\n    display: block;\r\n}\r\n\r\n.card-anatomy-showcase {\r\n    position: relative;\r\n    padding-block: 120px;\r\n    color: var(--colour-text);\r\n    border-bottom: 1px solid var(--colour-border);\r\n    background:\r\n        radial-gradient(circle at 72% 42%,\r\n            rgba(242, 233, 0, 0.035),\r\n            transparent 32%),\r\n        var(--colour-background);\r\n}\r\n\r\n\r\n/*\r\n * Default homepage composition.\r\n *\r\n * The introduction sits beside the showcase card while\r\n * Card Anatomy is closed.\r\n */\r\n.card-anatomy-showcase__layout {\r\n    display: grid;\r\n    grid-template-columns:\r\n        minmax(0, 0.72fr) minmax(480px, 1.28fr);\r\n    align-items: center;\r\n    gap: 80px;\r\n}\r\n\r\n\r\n/*\r\n * Changes the composition when Card Anatomy is active.\r\n *\r\n * The card remains the largest visual object while the\r\n * explanation docket stays in a stable position beside it.\r\n */\r\n.card-anatomy-showcase--active .card-anatomy-showcase__layout {\r\n    grid-template-columns:\r\n        minmax(480px, 1.18fr) minmax(320px, 0.82fr);\r\n    align-items: center;\r\n    gap: 64px;\r\n}\r\n\r\n\r\n/*\r\n * Command rail shown only while the learning\r\n * experience is active.\r\n */\r\n.card-anatomy-showcase__command-rail {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 30px;\r\n    margin-bottom: 34px;\r\n    padding-bottom: 18px;\r\n    border-bottom: 1px solid var(--colour-border);\r\n}\r\n\r\n\r\n/*\r\n * Holds the Vault Lens title and mode controls.\r\n */\r\n.card-anatomy-showcase__command-main {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 24px;\r\n}\r\n\r\n.card-anatomy-showcase__command-code {\r\n    color: var(--colour-yellow);\r\n    font-family: var(--font-display);\r\n    font-size: 0.67rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.13em;\r\n}\r\n\r\n\r\n/*\r\n * Allows the user to switch between Guided\r\n * and Show All mode.\r\n */\r\n.card-anatomy-showcase__modes {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n}\r\n\r\n.card-anatomy-showcase__modes button {\r\n    min-height: 44px;\r\n    padding: 0 13px;\r\n    color: var(--colour-text-muted);\r\n    background: transparent;\r\n    border: 1px solid transparent;\r\n    cursor: pointer;\r\n    font-family: var(--font-display);\r\n    font-size: 0.64rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.09em;\r\n    text-transform: uppercase;\r\n    transition:\r\n        color 140ms ease,\r\n        background 140ms ease,\r\n        border-color 140ms ease;\r\n}\r\n\r\n.card-anatomy-showcase__modes button:hover {\r\n    color: var(--colour-text);\r\n}\r\n\r\n.card-anatomy-showcase__modes button.is-active {\r\n    color: var(--colour-background);\r\n    background: var(--colour-yellow);\r\n    border-color: var(--colour-yellow);\r\n}\r\n\r\n\r\n/*\r\n * Normal homepage introduction.\r\n */\r\n.card-anatomy-showcase__copy {\r\n    max-width: 650px;\r\n}\r\n\r\n.card-anatomy-showcase__copy h2 {\r\n    margin: 20px 0 0;\r\n    font-family: var(--font-display);\r\n    font-size: clamp(3rem, 4.5vw, 4.8rem);\r\n    font-weight: 900;\r\n    line-height: 0.95;\r\n    letter-spacing: -0.02em;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.card-anatomy-showcase__copy h2 span {\r\n    display: block;\r\n    margin-top: 10px;\r\n    color: var(--colour-yellow);\r\n}\r\n\r\n.card-anatomy-showcase__description {\r\n    max-width: 590px;\r\n    margin: 28px 0 0;\r\n    color: var(--colour-text-muted);\r\n    font-size: 0.95rem;\r\n    line-height: 1.75;\r\n}\r\n\r\n.card-anatomy-showcase__actions {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    align-items: center;\r\n    gap: 18px;\r\n    margin-top: 34px;\r\n}\r\n\r\n.card-anatomy-showcase__note {\r\n    max-width: 560px;\r\n    margin: 26px 0 0;\r\n    padding-top: 22px;\r\n    color: var(--colour-text-muted);\r\n    border-top: 1px solid var(--colour-border);\r\n    font-size: 0.76rem;\r\n    line-height: 1.65;\r\n}\r\n\r\n\r\n/*\r\n * Links users from the quick Vault Lens explanation\r\n * to the complete official Cyberpunk TCG rules.\r\n */\r\n.card-anatomy-showcase__note a {\r\n    color: var(--colour-yellow);\r\n    font-weight: 700;\r\n    text-decoration-line: underline;\r\n    text-decoration-thickness: 1px;\r\n    text-underline-offset: 3px;\r\n    transition:\r\n        color 140ms ease,\r\n        text-decoration-color 140ms ease;\r\n}\r\n\r\n.card-anatomy-showcase__note a:hover {\r\n    color: var(--colour-text);\r\n}\r\n\r\n.card-anatomy-showcase__note a:focus-visible {\r\n    outline: 2px solid var(--colour-cyan);\r\n    outline-offset: 3px;\r\n}\r\n\r\n\r\n/*\r\n * Holds the complete card image and anatomy overlay.\r\n */\r\n.card-anatomy-showcase__card-stage {\r\n    position: relative;\r\n    display: flex;\r\n    min-width: 0;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\n.card-anatomy-showcase__card {\r\n    --card-rotate-x: 0deg;\r\n    --card-rotate-y: 0deg;\r\n\r\n    position: relative;\r\n    width: min(100%, 580px);\r\n    transform:\r\n        perspective(1100px) translateY(0) rotateX(var(--card-rotate-x)) rotateY(var(--card-rotate-y)) scale(1);\r\n    transform-style: preserve-3d;\r\n    transition:\r\n        transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),\r\n        filter 180ms ease;\r\n}\r\n\r\n\r\n/*\r\n * Gives the closed homepage card a restrained physical\r\n * response on devices that have a real hover pointer.\r\n */\r\n@media (hover: hover) and (pointer: fine) {\r\n    .card-anatomy-showcase:not(.card-anatomy-showcase--active) .card-anatomy-showcase__card:hover {\r\n        transform:\r\n            perspective(1100px) translateY(-4px) rotateX(var(--card-rotate-x)) rotateY(var(--card-rotate-y)) scale(1.01);\r\n        filter: drop-shadow(0 20px 28px rgba(0, 0, 0, 0.32));\r\n    }\r\n}\r\n\r\n\r\n/*\r\n * Card motion is disabled while Card Anatomy is active.\r\n *\r\n * The card should remain completely stable while the user\r\n * is reading and selecting anatomy fields.\r\n */\r\n.card-anatomy-showcase--active .card-anatomy-showcase__card {\r\n    transform: none;\r\n    filter: none;\r\n}\r\n\r\n\r\n/*\r\n * Restrained ambient light around the card.\r\n *\r\n * This is decorative only and does not communicate\r\n * the currently selected anatomy field.\r\n */\r\n.card-anatomy-showcase__card::before {\r\n    position: absolute;\r\n    z-index: -1;\r\n    inset: 8% -5% -2%;\r\n    background: rgba(242, 233, 0, 0.045);\r\n    filter: blur(55px);\r\n    content: \"\";\r\n    pointer-events: none;\r\n}\r\n\r\n.card-anatomy-showcase__card img {\r\n    display: block;\r\n    width: 100%;\r\n    height: auto;\r\n    object-fit: contain;\r\n}\r\n\r\n\r\n/*\r\n * Highlights the card field currently being explained.\r\n *\r\n * Position and size come from the anatomy configuration\r\n * so individual fields do not require their own CSS.\r\n */\r\n.card-anatomy-showcase__highlight {\r\n    position: absolute;\r\n    z-index: 4;\r\n    border: 2px solid var(--colour-yellow);\r\n    pointer-events: none;\r\n    transition:\r\n        top 160ms ease,\r\n        left 160ms ease,\r\n        width 160ms ease,\r\n        height 160ms ease;\r\n}\r\n\r\n\r\n/*\r\n * Shows the Guided step number beside the\r\n * currently selected card region.\r\n */\r\n.card-anatomy-showcase__marker {\r\n    position: absolute;\r\n    top: -13px;\r\n    right: -13px;\r\n    display: grid;\r\n    width: 27px;\r\n    height: 27px;\r\n    place-items: center;\r\n    color: var(--colour-background);\r\n    background: var(--colour-yellow);\r\n    border: 2px solid var(--colour-background);\r\n    font-family: var(--font-display);\r\n    font-size: 0.68rem;\r\n    font-weight: 900;\r\n    line-height: 1;\r\n}\r\n\r\n\r\n/*\r\n * Invisible positioning layer used by Show All mode.\r\n *\r\n * The layer itself does not block interaction with\r\n * the card. Only the marker buttons receive input.\r\n */\r\n.card-anatomy-showcase__all-markers {\r\n    position: absolute;\r\n    z-index: 6;\r\n    inset: 0;\r\n    pointer-events: none;\r\n}\r\n\r\n\r\n/*\r\n * Provides a large interaction target while keeping\r\n * the visible perimeter marker compact.\r\n */\r\n.card-anatomy-showcase__all-marker {\r\n    position: absolute;\r\n    display: grid;\r\n    width: 44px;\r\n    height: 44px;\r\n    padding: 0;\r\n    place-items: center;\r\n    background: transparent;\r\n    border: 0;\r\n    cursor: pointer;\r\n    transform: translate(-50%, -50%);\r\n    pointer-events: auto;\r\n}\r\n\r\n.card-anatomy-showcase__all-marker span {\r\n    display: grid;\r\n    width: 27px;\r\n    height: 27px;\r\n    place-items: center;\r\n    color: var(--colour-background);\r\n    background: var(--colour-yellow);\r\n    border: 2px solid var(--colour-background);\r\n    font-family: var(--font-display);\r\n    font-size: 0.68rem;\r\n    font-weight: 900;\r\n    line-height: 1;\r\n    transition:\r\n        transform 160ms ease,\r\n        outline-offset 160ms ease;\r\n}\r\n\r\n.card-anatomy-showcase__all-marker:hover span {\r\n    transform: scale(1.08);\r\n}\r\n\r\n\r\n/*\r\n * Keeps the currently selected Show All marker\r\n * visually distinct from the other available fields.\r\n */\r\n.card-anatomy-showcase__all-marker.is-selected span {\r\n    outline: 2px solid var(--colour-yellow);\r\n    outline-offset: 3px;\r\n}\r\n\r\n\r\n/*\r\n * Small supporting information underneath\r\n * the complete study card.\r\n */\r\n.card-anatomy-showcase__card-label {\r\n    display: flex;\r\n    width: min(100%, 580px);\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 18px;\r\n    margin-top: 18px;\r\n    padding-top: 14px;\r\n    border-top: 1px solid var(--colour-border);\r\n}\r\n\r\n.card-anatomy-showcase__card-label span {\r\n    color: var(--colour-yellow);\r\n    font-family: var(--font-display);\r\n    font-size: 0.58rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.12em;\r\n}\r\n\r\n.card-anatomy-showcase__card-label strong {\r\n    color: var(--colour-text-muted);\r\n    font-family: var(--font-display);\r\n    font-size: 0.68rem;\r\n    font-weight: 700;\r\n    letter-spacing: 0.08em;\r\n    text-align: right;\r\n    text-transform: uppercase;\r\n}\r\n\r\n\r\n/*\r\n * Stable explanation docket used while Card Anatomy\r\n * is active.\r\n *\r\n * The panel is intentionally opaque and restrained\r\n * so the card remains the primary visual focus.\r\n */\r\n.card-anatomy-showcase__docket {\r\n    align-self: center;\r\n    width: 100%;\r\n    padding: 34px;\r\n    background: var(--colour-surface);\r\n    border: 1px solid var(--colour-border-strong);\r\n    clip-path: polygon(0 0,\r\n            calc(100% - 18px) 0,\r\n            100% 18px,\r\n            100% 100%,\r\n            0 100%);\r\n}\r\n\r\n.card-anatomy-showcase__progress {\r\n    display: inline-block;\r\n    color: var(--colour-yellow);\r\n    font-family: var(--font-display);\r\n    font-size: 0.7rem;\r\n    font-weight: 800;\r\n    letter-spacing: 0.12em;\r\n}\r\n\r\n.card-anatomy-showcase__docket h3 {\r\n    margin: 18px 0 0;\r\n    font-family: var(--font-display);\r\n    font-size: clamp(2rem, 3vw, 3rem);\r\n    font-weight: 900;\r\n    line-height: 1;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.card-anatomy-showcase__docket>p {\r\n    margin: 20px 0 0;\r\n    color: var(--colour-text-muted);\r\n    font-size: 0.92rem;\r\n    line-height: 1.75;\r\n}\r\n\r\n.card-anatomy-showcase__navigation {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 10px;\r\n    margin-top: 32px;\r\n}\r\n\r\n.card-anatomy-showcase__navigation .btn:disabled {\r\n    cursor: not-allowed;\r\n    opacity: 0.45;\r\n}\r\n\r\n\r\n/*\r\n * Standard desktop screens.\r\n *\r\n * Slightly reduces the study card so it does not dominate\r\n * a normal desktop viewport while preserving the larger\r\n * presentation on very wide screens.\r\n */\r\n@media (min-width: 1121px) and (max-width: 2000px) {\r\n    .card-anatomy-showcase__card {\r\n        width: min(100%, 520px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label {\r\n        width: min(100%, 520px);\r\n    }\r\n}\r\n\r\n\r\n/*\r\n * Medium desktop and smaller laptop screens.\r\n */\r\n@media (max-width: 1120px) {\r\n    .card-anatomy-showcase__layout {\r\n        grid-template-columns:\r\n            minmax(0, 0.8fr) minmax(360px, 1fr);\r\n        gap: 55px;\r\n    }\r\n\r\n    .card-anatomy-showcase--active .card-anatomy-showcase__layout {\r\n        grid-template-columns:\r\n            minmax(400px, 1.1fr) minmax(300px, 0.9fr);\r\n        gap: 45px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card {\r\n        width: min(100%, 500px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label {\r\n        width: min(100%, 500px);\r\n    }\r\n\r\n    .card-anatomy-showcase__docket {\r\n        padding: 28px;\r\n    }\r\n}\r\n\r\n\r\n/*\r\n * Portrait tablet and mobile composition.\r\n *\r\n * The desktop side-by-side study layout is removed and\r\n * the learning docket is placed directly below the card.\r\n */\r\n@media (max-width: 820px) {\r\n    .card-anatomy-showcase {\r\n        padding-block: 90px;\r\n    }\r\n\r\n    .card-anatomy-showcase__layout {\r\n        grid-template-columns: 1fr;\r\n        gap: 55px;\r\n    }\r\n\r\n    .card-anatomy-showcase--active .card-anatomy-showcase__layout {\r\n        grid-template-columns: 1fr;\r\n        gap: 30px;\r\n    }\r\n\r\n    .card-anatomy-showcase__command-rail {\r\n        margin-bottom: 30px;\r\n    }\r\n\r\n    .card-anatomy-showcase__copy {\r\n        max-width: 700px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card {\r\n        width: min(100%, 470px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label {\r\n        width: min(100%, 470px);\r\n    }\r\n\r\n    .card-anatomy-showcase__docket {\r\n        width: 100%;\r\n        padding: 28px;\r\n    }\r\n\r\n    .card-anatomy-showcase__docket h3 {\r\n        font-size: clamp(2rem, 8vw, 2.7rem);\r\n    }\r\n}\r\n\r\n\r\n/*\r\n * Landscape mobile uses a compact split layout\r\n * instead of the portrait learning tray arrangement.\r\n */\r\n@media (max-width: 900px) and (orientation: landscape) and (max-height: 600px) {\r\n    .card-anatomy-showcase--active .card-anatomy-showcase__layout {\r\n        grid-template-columns:\r\n            minmax(260px, 1fr) minmax(280px, 0.85fr);\r\n        align-items: center;\r\n        gap: 32px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card {\r\n        width: min(100%, 360px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label {\r\n        width: min(100%, 360px);\r\n    }\r\n\r\n    .card-anatomy-showcase__docket {\r\n        padding: 24px;\r\n    }\r\n}\r\n\r\n\r\n/*\r\n * Small mobile layout.\r\n */\r\n@media (max-width: 560px) {\r\n    .card-anatomy-showcase {\r\n        padding-block: 70px;\r\n    }\r\n\r\n    .card-anatomy-showcase__copy h2 {\r\n        font-size: clamp(2.7rem, 13vw, 4rem);\r\n    }\r\n\r\n    .card-anatomy-showcase__actions {\r\n        align-items: stretch;\r\n        flex-direction: column;\r\n    }\r\n\r\n    .card-anatomy-showcase__actions .btn {\r\n        width: 100%;\r\n    }\r\n\r\n    /*\r\n   * Stacks the command title above the mode switcher\r\n   * when horizontal space becomes limited.\r\n   */\r\n    .card-anatomy-showcase__command-main {\r\n        align-items: flex-start;\r\n        flex-direction: column;\r\n        gap: 10px;\r\n    }\r\n\r\n    .card-anatomy-showcase__command-rail {\r\n        align-items: flex-start;\r\n    }\r\n\r\n    .card-anatomy-showcase__modes {\r\n        flex-wrap: wrap;\r\n    }\r\n\r\n    .card-anatomy-showcase__card {\r\n        width: min(100%, 390px);\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label {\r\n        width: min(100%, 390px);\r\n        align-items: flex-start;\r\n        flex-direction: column;\r\n        gap: 7px;\r\n    }\r\n\r\n    .card-anatomy-showcase__card-label strong {\r\n        text-align: left;\r\n    }\r\n\r\n    .card-anatomy-showcase__docket {\r\n        padding: 24px 22px;\r\n    }\r\n\r\n    .card-anatomy-showcase__navigation {\r\n        display: grid;\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n    .card-anatomy-showcase__navigation .btn {\r\n        width: 100%;\r\n    }\r\n}\r\n\r\n\r\n/*\r\n * Removes movement for users who prefer reduced motion.\r\n *\r\n * The Card Anatomy feature remains fully functional.\r\n */\r\n@media (prefers-reduced-motion: reduce) {\r\n    .card-anatomy-showcase__card {\r\n        transform: none !important;\r\n        transition: none;\r\n    }\r\n\r\n    .card-anatomy-showcase__highlight,\r\n    .card-anatomy-showcase__all-marker span,\r\n    .card-anatomy-showcase__modes button,\r\n    .card-anatomy-showcase__note a {\r\n        transition: none;\r\n    }\r\n}"] }]
    }], () => [{ type: i0.ElementRef }], { explainCardButton: [{
            type: ViewChild,
            args: ['explainCardButton']
        }], guidedModeButton: [{
            type: ViewChild,
            args: ['guidedModeButton']
        }], studyCard: [{
            type: ViewChild,
            args: ['studyCard']
        }], handleKeyboardNavigation: [{
            type: HostListener,
            args: ['document:keydown',
                ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CardAnatomyShowcase, { className: "CardAnatomyShowcase", filePath: "src/app/features/cards/components/card-anatomy-showcase/card-anatomy-showcase.ts", lineNumber: 30 }); })();

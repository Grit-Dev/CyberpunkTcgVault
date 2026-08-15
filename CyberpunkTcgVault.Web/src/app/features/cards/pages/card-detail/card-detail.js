import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { CardArtworkDirective } from '../../directives/card-artwork.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/auth/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../../services/cards.service";
import * as i4 from "../../../collection/services/owned-cards.service";
import * as i5 from "../../../wishlist/services/wishlist.service";
import * as i6 from "../../../../core/seo/dynamic-seo.service";
const _forTrack0 = ($index, $item) => $item.id;
function CardDetail_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4)(1, "div", 8);
    i0.ɵɵelement(2, "div", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 10);
    i0.ɵɵelement(4, "span", 11)(5, "span", 12)(6, "span", 13)(7, "span", 14)(8, "span", 15)(9, "span", 16);
    i0.ɵɵelementEnd()();
} }
function CardDetail_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 5)(1, "p", 17);
    i0.ɵɵtext(2, "Vault Archive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 18);
    i0.ɵɵtext(4, "Card record not found.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "This card isn't currently stored in the Vault Archive.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 19);
    i0.ɵɵtext(8, "Return to Vault Archive");
    i0.ɵɵelementEnd()();
} }
function CardDetail_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 6)(1, "p", 17);
    i0.ɵɵtext(2, "Vault Archive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 20);
    i0.ɵɵtext(4, "We couldn't load this card.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Try the card again, or return to the Vault Archive.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 21)(8, "button", 22);
    i0.ɵɵlistener("click", function CardDetail_Conditional_8_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.retry()); });
    i0.ɵɵtext(9, "Try again");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "a", 23);
    i0.ɵɵtext(11, "Back to Vault Archive");
    i0.ɵɵelementEnd()()();
} }
function CardDetail_Conditional_9_Conditional_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.selectedPrinting()?.rarity);
} }
function CardDetail_Conditional_9_Conditional_9_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(currentCard_r3.cardType);
} }
function CardDetail_Conditional_9_Conditional_9_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(currentCard_r3.classification);
} }
function CardDetail_Conditional_9_Conditional_9_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(currentCard_r3.colour);
} }
function CardDetail_Conditional_9_Conditional_9_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(currentCard_r3.keywords);
} }
function CardDetail_Conditional_9_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵconditionalCreate(1, CardDetail_Conditional_9_Conditional_9_Conditional_1_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(2, CardDetail_Conditional_9_Conditional_9_Conditional_2_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(3, CardDetail_Conditional_9_Conditional_9_Conditional_3_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(4, CardDetail_Conditional_9_Conditional_9_Conditional_4_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(5, CardDetail_Conditional_9_Conditional_9_Conditional_5_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(ctx_r1.selectedPrinting()?.rarity) ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(currentCard_r3.cardType) ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(currentCard_r3.classification) ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(currentCard_r3.colour) ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(currentCard_r3.keywords) ? 5 : -1);
} }
function CardDetail_Conditional_9_Conditional_10_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "Cost");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(currentCard_r3.cost);
} }
function CardDetail_Conditional_9_Conditional_10_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "Power");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(currentCard_r3.power);
} }
function CardDetail_Conditional_9_Conditional_10_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "RAM");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(currentCard_r3.ramCost);
} }
function CardDetail_Conditional_9_Conditional_10_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "Eddies");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(currentCard_r3.eddies);
} }
function CardDetail_Conditional_9_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "dl", 31);
    i0.ɵɵconditionalCreate(1, CardDetail_Conditional_9_Conditional_10_Conditional_1_Template, 5, 1, "div");
    i0.ɵɵconditionalCreate(2, CardDetail_Conditional_9_Conditional_10_Conditional_2_Template, 5, 1, "div");
    i0.ɵɵconditionalCreate(3, CardDetail_Conditional_9_Conditional_10_Conditional_3_Template, 5, 1, "div");
    i0.ɵɵconditionalCreate(4, CardDetail_Conditional_9_Conditional_10_Conditional_4_Template, 5, 1, "div");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentCard_r3.cost !== null ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentCard_r3.power !== null ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentCard_r3.ramCost !== null ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentCard_r3.eddies !== null ? 4 : -1);
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const printing_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(printing_r4.setName);
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const printing_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(printing_r4.rarity);
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const printing_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(printing_r4.languageCode);
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const printing_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Set Code ", printing_r4.setCode);
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const printing_r4 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.printingVariants(printing_r4).join(" \u00B7 "), " ");
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_13_For_8_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const candidate_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.printingVariants(candidate_r6).join(" \u00B7 "));
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_13_For_8_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 54);
    i0.ɵɵtext(1, "Selected");
    i0.ɵɵelementEnd();
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_13_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_13_For_8_Template_button_click_0_listener() { const candidate_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.selectPrinting(candidate_r6)); });
    i0.ɵɵelementStart(1, "span", 51);
    i0.ɵɵelement(2, "img", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, CardDetail_Conditional_9_Conditional_11_Conditional_13_For_8_Conditional_8_Template, 2, 1, "small");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, CardDetail_Conditional_9_Conditional_11_Conditional_13_For_8_Conditional_9_Template, 2, 0, "span", 54);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const candidate_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("printing-option--selected", ctx_r1.selectedPrinting()?.id === candidate_r6.id);
    i0.ɵɵattribute("aria-pressed", ctx_r1.selectedPrinting()?.id === candidate_r6.id)("aria-label", ctx_r1.printingAccessibleLabel(candidate_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("appCardArtwork", candidate_r6.imageUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(candidate_r6.cardNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(candidate_r6.setName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.printingVariants(candidate_r6).length > 0 ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.selectedPrinting()?.id === candidate_r6.id ? 9 : -1);
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 39)(1, "div", 46)(2, "h2", 47);
    i0.ɵɵtext(3, "Available printings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Select another physical printing.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 48);
    i0.ɵɵrepeaterCreate(7, CardDetail_Conditional_9_Conditional_11_Conditional_13_For_8_Template, 10, 9, "button", 49, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const currentCard_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(currentCard_r3.printings);
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 43);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.collectorError(), " ");
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.collectorMessage(), " ");
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 45);
    i0.ɵɵtext(1, "Checking your collector record\u2026");
    i0.ɵɵelementEnd();
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const owned_r7 = ctx;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", owned_r7.quantityOwned, " ", owned_r7.quantityOwned === 1 ? "copy" : "copies", " ");
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Not in your collection");
    i0.ɵɵelementEnd();
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Sign in to record ownership");
    i0.ɵɵelementEnd();
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "button", 62);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_8_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.decreaseCollectionQuantity()); });
    i0.ɵɵtext(2, " \u2212 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 63);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 62);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_8_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.increaseCollectionQuantity()); });
    i0.ɵɵtext(6, " + ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 64);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_8_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.removeFromCollection()); });
    i0.ɵɵtext(8, " Remove from Collection ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const owned_r9 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", owned_r9.quantityOwned <= 1 || ctx_r1.isCollectionBusy());
    i0.ɵɵattribute("aria-label", "Decrease collection quantity from " + owned_r9.quantityOwned);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(owned_r9.quantityOwned);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", owned_r9.quantityOwned >= 999 || ctx_r1.isCollectionBusy());
    i0.ɵɵattribute("aria-label", "Increase collection quantity from " + owned_r9.quantityOwned);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isCollectionBusy());
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 65);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.addToCollection()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r1.isCollectionBusy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isCollectionBusy() ? "Adding\u2026" : "Add", " ");
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Wanted ", ctx.wantedQuantity, " ");
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Not on your wishlist");
    i0.ɵɵelementEnd();
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Sign in to record wanted state");
    i0.ɵɵelementEnd();
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 66)(1, "button", 62);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_18_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.decreaseWishlistQuantity()); });
    i0.ɵɵtext(2, " \u2212 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 63);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 62);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_18_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.increaseWishlistQuantity()); });
    i0.ɵɵtext(6, " + ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 64);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_18_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.removeFromWishlist()); });
    i0.ɵɵtext(8, " Remove from Wishlist ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const wanted_r12 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", wanted_r12.wantedQuantity <= 1 || ctx_r1.isWishlistBusy());
    i0.ɵɵattribute("aria-label", "Decrease wanted quantity from " + wanted_r12.wantedQuantity);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(wanted_r12.wantedQuantity);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", wanted_r12.wantedQuantity >= 999 || ctx_r1.isWishlistBusy());
    i0.ɵɵattribute("aria-label", "Increase wanted quantity from " + wanted_r12.wantedQuantity);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isWishlistBusy());
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 65);
    i0.ɵɵlistener("click", function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.addToWishlist()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r1.isWishlistBusy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isWishlistBusy() ? "Adding\u2026" : "Add", " ");
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, " Sign in only when you want to record Collection or Wishlist state. ");
    i0.ɵɵelementEnd();
} }
function CardDetail_Conditional_9_Conditional_11_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55)(1, "div", 56)(2, "span", 57);
    i0.ɵɵtext(3, "Collection");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_4_Template, 2, 2, "strong")(5, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_5_Template, 2, 0, "span")(6, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_6_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 58);
    i0.ɵɵconditionalCreate(8, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_8_Template, 9, 6)(9, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_9_Template, 2, 2, "button", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 55)(11, "div", 56)(12, "span", 57);
    i0.ɵɵtext(13, "Wishlist");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(14, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_14_Template, 2, 1, "strong")(15, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_15_Template, 2, 0, "span")(16, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_16_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 58);
    i0.ɵɵconditionalCreate(18, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_18_Template, 9, 6)(19, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_19_Template, 2, 2, "button", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(20, CardDetail_Conditional_9_Conditional_11_Conditional_21_Conditional_20_Template, 2, 0, "p", 60);
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional((tmp_5_0 = ctx_r1.ownedRecord()) ? 4 : ctx_r1.authService.isAuthenticated() ? 5 : 6, tmp_5_0);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional((tmp_6_0 = ctx_r1.ownedRecord()) ? 8 : 9, tmp_6_0);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional((tmp_7_0 = ctx_r1.wishlistRecord()) ? 14 : ctx_r1.authService.isAuthenticated() ? 15 : 16, tmp_7_0);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional((tmp_8_0 = ctx_r1.wishlistRecord()) ? 18 : 19, tmp_8_0);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r1.authService.isAuthenticated() ? 20 : -1);
} }
function CardDetail_Conditional_9_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 32)(1, "div", 33)(2, "span", 34);
    i0.ɵɵtext(3, "Printing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 29);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 35);
    i0.ɵɵconditionalCreate(7, CardDetail_Conditional_9_Conditional_11_Conditional_7_Template, 2, 1, "p", 36);
    i0.ɵɵelementStart(8, "p", 37);
    i0.ɵɵconditionalCreate(9, CardDetail_Conditional_9_Conditional_11_Conditional_9_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(10, CardDetail_Conditional_9_Conditional_11_Conditional_10_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(11, CardDetail_Conditional_9_Conditional_11_Conditional_11_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, CardDetail_Conditional_9_Conditional_11_Conditional_12_Template, 2, 1, "p", 38);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(13, CardDetail_Conditional_9_Conditional_11_Conditional_13_Template, 9, 0, "section", 39);
    i0.ɵɵelementStart(14, "section", 40)(15, "h2", 41);
    i0.ɵɵtext(16, " Your record ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 42);
    i0.ɵɵconditionalCreate(18, CardDetail_Conditional_9_Conditional_11_Conditional_18_Template, 2, 1, "p", 43);
    i0.ɵɵconditionalCreate(19, CardDetail_Conditional_9_Conditional_11_Conditional_19_Template, 2, 1, "p", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(20, CardDetail_Conditional_9_Conditional_11_Conditional_20_Template, 2, 0, "p", 45)(21, CardDetail_Conditional_9_Conditional_11_Conditional_21_Template, 21, 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const printing_r4 = ctx;
    const currentCard_r3 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-labelledby", "printing-id-" + printing_r4.id);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("id", "printing-id-" + printing_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(printing_r4.cardNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(printing_r4.setName) ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(printing_r4.rarity) ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(printing_r4.languageCode) ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(printing_r4.setCode) ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.printingVariants(printing_r4).length > 0 ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentCard_r3.printings.length > 1 ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-labelledby", "collector-record-title-" + printing_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", "collector-record-title-" + printing_r4.id);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.collectorError() ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.collectorMessage() ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.authService.isInitialized() || ctx_r1.isCollectorStateLoading() ? 20 : 21);
} }
function CardDetail_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 7)(1, "div", 8)(2, "div", 24)(3, "div", 25);
    i0.ɵɵelement(4, "img", 26);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(5, "div", 27)(6, "header", 28)(7, "h1", 29);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, CardDetail_Conditional_9_Conditional_9_Template, 6, 5, "p", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, CardDetail_Conditional_9_Conditional_10_Template, 5, 4, "dl", 31);
    i0.ɵɵconditionalCreate(11, CardDetail_Conditional_9_Conditional_11_Template, 22, 14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_9_0;
    const currentCard_r3 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-labelledby", "card-title-" + currentCard_r3.id);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("appCardArtwork", ctx_r1.selectedPrinting()?.imageUrl ?? currentCard_r3.imageUrl)("alt", currentCard_r3.name + (ctx_r1.selectedPrinting()?.cardNumber ? " \u2014 printing " + ctx_r1.selectedPrinting()?.cardNumber : ""));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("id", "card-title-" + currentCard_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", currentCard_r3.name, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(ctx_r1.selectedPrinting()?.rarity) || ctx_r1.hasMeaningfulValue(currentCard_r3.cardType) || ctx_r1.hasMeaningfulValue(currentCard_r3.classification) || ctx_r1.hasMeaningfulValue(currentCard_r3.colour) || ctx_r1.hasMeaningfulValue(currentCard_r3.keywords) ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentCard_r3.cost !== null || currentCard_r3.power !== null || currentCard_r3.ramCost !== null || currentCard_r3.eddies !== null ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_9_0 = ctx_r1.selectedPrinting()) ? 11 : -1, tmp_9_0);
} }
/**
 * Public Card Detail / Inspection Table.
 *
 * Shared Card/CardPrinting data is public. Collector state is private and is
 * loaded/mutated only for the authenticated browser session. Angular presents
 * that state; backend authentication, CSRF, role and ownership checks remain
 * authoritative for every private mutation.
 */
export class CardDetail {
    authService;
    route;
    router;
    cardsService;
    ownedCardsService;
    wishlistService;
    seo;
    card = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "card" }] : /* istanbul ignore next */ []));
    selectedPrinting = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedPrinting" }] : /* istanbul ignore next */ []));
    isLoading = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isNotFound = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isNotFound" }] : /* istanbul ignore next */ []));
    loadError = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loadError" }] : /* istanbul ignore next */ []));
    collectorError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "collectorError" }] : /* istanbul ignore next */ []));
    collectorMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "collectorMessage" }] : /* istanbul ignore next */ []));
    isCollectorStateLoading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isCollectorStateLoading" }] : /* istanbul ignore next */ []));
    isCollectionBusy = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isCollectionBusy" }] : /* istanbul ignore next */ []));
    isWishlistBusy = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isWishlistBusy" }] : /* istanbul ignore next */ []));
    ownedRecord = computed(() => {
        const printingId = this.selectedPrinting()?.id;
        if (!printingId) {
            return null;
        }
        return this.ownedCardsService
            .items()
            .find(item => item.cardPrintingId === printingId) ?? null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ownedRecord" }] : /* istanbul ignore next */ []));
    wishlistRecord = computed(() => {
        const printingId = this.selectedPrinting()?.id;
        if (!printingId) {
            return null;
        }
        return this.wishlistService
            .items()
            .find(item => item.cardPrintingId === printingId) ?? null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "wishlistRecord" }] : /* istanbul ignore next */ []));
    subscriptions = new Subscription();
    collectorMessageTimer;
    constructor(authService, route, router, cardsService, ownedCardsService, wishlistService, seo) {
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.cardsService = cardsService;
        this.ownedCardsService = ownedCardsService;
        this.wishlistService = wishlistService;
        this.seo = seo;
    }
    ngOnInit() {
        this.subscriptions.add(this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            if (!Number.isInteger(id) || id <= 0) {
                this.showNotFound();
                return;
            }
            this.loadCard(id);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.clearCollectorMessageTimer();
        this.seo.removeCanonical();
    }
    retry() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (Number.isInteger(id) && id > 0) {
            this.loadCard(id);
        }
    }
    selectPrinting(printing) {
        if (this.selectedPrinting()?.id === printing.id) {
            return;
        }
        this.selectedPrinting.set(printing);
        this.clearCollectorFeedback();
        const card = this.card();
        if (card) {
            this.applyCardSeo(card);
        }
        void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                printing: printing.id
            },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }
    addToCollection() {
        const printing = this.selectedPrinting();
        if (!printing || this.isCollectionBusy()) {
            return;
        }
        if (!this.authService.isAuthenticated()) {
            this.sendToLogin('collection');
            return;
        }
        if (this.ownedRecord()) {
            return;
        }
        this.clearCollectorFeedback();
        this.isCollectionBusy.set(true);
        this.subscriptions.add(this.ownedCardsService
            .addPrinting(printing.id)
            .subscribe({
            next: () => {
                this.isCollectionBusy.set(false);
                this.showCollectorMessage('Added to Collection.');
            },
            error: error => {
                this.isCollectionBusy.set(false);
                this.handleCollectorError(error, 'collection');
            }
        }));
    }
    increaseCollectionQuantity() {
        const owned = this.ownedRecord();
        if (!owned || owned.quantityOwned >= 999 || this.isCollectionBusy()) {
            return;
        }
        this.updateCollectionQuantity(owned, owned.quantityOwned + 1);
    }
    decreaseCollectionQuantity() {
        const owned = this.ownedRecord();
        // Quantity 1 is never silently converted into deletion. Removal has its
        // own explicit action so destructive intent stays unambiguous.
        if (!owned || owned.quantityOwned <= 1 || this.isCollectionBusy()) {
            return;
        }
        this.updateCollectionQuantity(owned, owned.quantityOwned - 1);
    }
    removeFromCollection() {
        const owned = this.ownedRecord();
        if (!owned || this.isCollectionBusy()) {
            return;
        }
        this.clearCollectorFeedback();
        this.isCollectionBusy.set(true);
        this.subscriptions.add(this.ownedCardsService.remove(owned).subscribe({
            next: () => {
                this.isCollectionBusy.set(false);
                this.showCollectorMessage('Removed from Collection.');
            },
            error: error => {
                this.isCollectionBusy.set(false);
                this.handleCollectorError(error, 'collection');
            }
        }));
    }
    addToWishlist() {
        const printing = this.selectedPrinting();
        if (!printing || this.isWishlistBusy()) {
            return;
        }
        if (!this.authService.isAuthenticated()) {
            this.sendToLogin('wishlist');
            return;
        }
        if (this.wishlistRecord()) {
            return;
        }
        this.clearCollectorFeedback();
        this.isWishlistBusy.set(true);
        this.subscriptions.add(this.wishlistService
            .addPrinting(printing.id)
            .subscribe({
            next: () => {
                this.isWishlistBusy.set(false);
                this.showCollectorMessage('Wishlist updated.');
            },
            error: error => {
                this.isWishlistBusy.set(false);
                this.handleCollectorError(error, 'wishlist');
            }
        }));
    }
    increaseWishlistQuantity() {
        const wanted = this.wishlistRecord();
        if (!wanted || wanted.wantedQuantity >= 999 || this.isWishlistBusy()) {
            return;
        }
        this.updateWishlistQuantity(wanted, wanted.wantedQuantity + 1);
    }
    decreaseWishlistQuantity() {
        const wanted = this.wishlistRecord();
        if (!wanted || wanted.wantedQuantity <= 1 || this.isWishlistBusy()) {
            return;
        }
        this.updateWishlistQuantity(wanted, wanted.wantedQuantity - 1);
    }
    removeFromWishlist() {
        const wanted = this.wishlistRecord();
        if (!wanted || this.isWishlistBusy()) {
            return;
        }
        this.clearCollectorFeedback();
        this.isWishlistBusy.set(true);
        this.subscriptions.add(this.wishlistService.remove(wanted).subscribe({
            next: () => {
                this.isWishlistBusy.set(false);
                this.showCollectorMessage('Removed from Wishlist.');
            },
            error: error => {
                this.isWishlistBusy.set(false);
                this.handleCollectorError(error, 'wishlist');
            }
        }));
    }
    hasMeaningfulValue(value) {
        if (!value?.trim()) {
            return false;
        }
        return ![
            'unknown',
            'n/a',
            'null',
            'none',
            '-',
            '—'
        ].includes(value.trim().toLowerCase());
    }
    printingVariants(printing) {
        const variants = [];
        if (printing.isFoil)
            variants.push('Foil');
        if (printing.isAltArt)
            variants.push('Alt Art');
        if (printing.isKickstarterVersion)
            variants.push('Kickstarter');
        if (printing.isRetailVersion)
            variants.push('Retail');
        if (printing.hasBetaSymbol)
            variants.push('Beta');
        if (printing.isPromo)
            variants.push('Promo');
        if (printing.isBoxTopper)
            variants.push('Box Topper');
        if (printing.isStarterDeckExclusive)
            variants.push('Starter Deck Exclusive');
        return variants;
    }
    printingAccessibleLabel(printing) {
        const variants = this.printingVariants(printing);
        const variantText = variants.length > 0
            ? `, ${variants.join(', ')}`
            : '';
        return `Inspect printing ${printing.cardNumber} from ${printing.setName}${variantText}`;
    }
    updateCollectionQuantity(owned, quantityOwned) {
        this.clearCollectorFeedback();
        this.isCollectionBusy.set(true);
        this.subscriptions.add(this.ownedCardsService
            .updateQuantity(owned, quantityOwned)
            .subscribe({
            next: () => {
                this.isCollectionBusy.set(false);
                this.showCollectorMessage('Collection updated.');
            },
            error: error => {
                this.isCollectionBusy.set(false);
                this.handleCollectorError(error, 'collection');
            }
        }));
    }
    updateWishlistQuantity(wanted, wantedQuantity) {
        this.clearCollectorFeedback();
        this.isWishlistBusy.set(true);
        this.subscriptions.add(this.wishlistService
            .updateQuantity(wanted, wantedQuantity)
            .subscribe({
            next: () => {
                this.isWishlistBusy.set(false);
                this.showCollectorMessage('Wishlist updated.');
            },
            error: error => {
                this.isWishlistBusy.set(false);
                this.handleCollectorError(error, 'wishlist');
            }
        }));
    }
    loadCard(id) {
        this.isLoading.set(true);
        this.isNotFound.set(false);
        this.loadError.set(false);
        this.card.set(null);
        this.selectedPrinting.set(null);
        this.clearCollectorFeedback();
        this.subscriptions.add(this.cardsService.getCardById(id).subscribe({
            next: card => {
                this.card.set(card);
                this.selectedPrinting.set(this.resolveInitialPrinting(card));
                this.isLoading.set(false);
                this.applyCardSeo(card);
                this.loadCollectorState();
            },
            error: error => {
                this.isLoading.set(false);
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.showNotFound();
                    return;
                }
                this.loadError.set(true);
                this.seo.apply({
                    title: 'Unable to Load Card | Choom Vault',
                    description: 'The requested Choom Vault card record could not be loaded.',
                    robots: 'noindex, nofollow'
                });
            }
        }));
    }
    loadCollectorState() {
        this.subscriptions.add(this.authService.restoreSession().subscribe(() => {
            if (!this.authService.isAuthenticated()) {
                this.isCollectorStateLoading.set(false);
                return;
            }
            this.isCollectorStateLoading.set(true);
            this.subscriptions.add(forkJoin([
                this.ownedCardsService.load(),
                this.wishlistService.load()
            ]).subscribe({
                next: () => {
                    this.isCollectorStateLoading.set(false);
                },
                error: () => {
                    this.isCollectorStateLoading.set(false);
                    // Public inspection still works if optional private enrichment
                    // fails. Any explicit mutation still receives the API's real
                    // authentication/authorization response.
                }
            }));
        }));
    }
    resolveInitialPrinting(card) {
        if (card.printings.length === 0) {
            return null;
        }
        const queryPrintingId = Number(this.route.snapshot.queryParamMap.get('printing'));
        if (Number.isInteger(queryPrintingId) && queryPrintingId > 0) {
            const requestedPrinting = card.printings.find(printing => printing.id === queryPrintingId);
            if (requestedPrinting) {
                return requestedPrinting;
            }
        }
        if (card.cardPrintingId) {
            const primaryPrinting = card.printings.find(printing => printing.id === card.cardPrintingId);
            if (primaryPrinting) {
                return primaryPrinting;
            }
        }
        return card.printings[0];
    }
    sendToLogin(intent) {
        const card = this.card();
        const printing = this.selectedPrinting();
        if (!card || !printing) {
            return;
        }
        const returnUrl = `/cards/${card.id}?printing=${printing.id}`;
        void this.router.navigate(['/login'], {
            queryParams: {
                returnUrl,
                intent
            }
        });
    }
    handleCollectorError(error, target) {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                this.sendToLogin(target);
                return;
            }
            if (error.status === 409) {
                if (target === 'collection') {
                    this.ownedCardsService.load(true).subscribe();
                }
                else {
                    this.wishlistService.load(true).subscribe();
                }
                this.showCollectorMessage(target === 'collection'
                    ? 'Collection state refreshed.'
                    : 'Wishlist state refreshed.');
                return;
            }
            if (error.status === 429) {
                this.collectorError.set('Too many requests. Try again shortly.');
                return;
            }
            if (error.status === 403) {
                this.collectorError.set('This action is not available for your account.');
                return;
            }
            if (error.status === 404) {
                this.collectorError.set('That collector record is no longer available. Refresh the card and try again.');
                return;
            }
        }
        this.collectorError.set(target === 'collection'
            ? 'We could not update your Collection. Try again.'
            : 'We could not update your Wishlist. Try again.');
    }
    showCollectorMessage(message) {
        this.clearCollectorMessageTimer();
        this.collectorMessage.set(message);
        this.collectorMessageTimer = setTimeout(() => {
            this.collectorMessage.set('');
            this.collectorMessageTimer = undefined;
        }, 2600);
    }
    clearCollectorFeedback() {
        this.clearCollectorMessageTimer();
        this.collectorError.set('');
        this.collectorMessage.set('');
    }
    clearCollectorMessageTimer() {
        if (this.collectorMessageTimer) {
            clearTimeout(this.collectorMessageTimer);
            this.collectorMessageTimer = undefined;
        }
    }
    showNotFound() {
        this.isLoading.set(false);
        this.card.set(null);
        this.selectedPrinting.set(null);
        this.isNotFound.set(true);
        this.loadError.set(false);
        this.seo.apply({
            title: 'Card Record Not Found | Choom Vault',
            description: 'The requested card is not currently stored in the Choom Vault Archive.',
            robots: 'noindex, nofollow'
        });
    }
    applyCardSeo(card) {
        const printing = this.selectedPrinting();
        const details = [
            this.hasMeaningfulValue(card.cardType) ? card.cardType : null,
            printing && this.hasMeaningfulValue(printing.setName) ? printing.setName : null,
            printing && this.hasMeaningfulValue(printing.rarity) ? printing.rarity : null
        ].filter((value) => Boolean(value));
        const qualifier = details.length > 0
            ? ` ${details.join(' · ')}.`
            : '';
        this.seo.apply({
            title: `${card.name} | Cyberpunk TCG Card | Choom Vault`,
            description: `Inspect ${card.name} in the public Choom Vault card archive.${qualifier}`,
            robots: 'index, follow',
            canonicalPath: `/cards/${card.id}`
        });
    }
    static ɵfac = function CardDetail_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CardDetail)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.CardsService), i0.ɵɵdirectiveInject(i4.OwnedCardsService), i0.ɵɵdirectiveInject(i5.WishlistService), i0.ɵɵdirectiveInject(i6.DynamicSeoService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CardDetail, selectors: [["app-card-detail"]], decls: 10, vars: 1, consts: [[1, "card-detail-page"], [1, "card-detail-shell"], ["routerLink", "/cards", 1, "card-detail-back"], ["aria-hidden", "true"], ["aria-label", "Loading card", 1, "inspection-layout", "inspection-layout--loading"], ["aria-labelledby", "card-not-found-title", 1, "card-detail-state"], ["aria-labelledby", "card-error-title", 1, "card-detail-state"], [1, "inspection-layout"], [1, "inspection-object"], ["aria-hidden", "true", 1, "card-detail-matte", "card-detail-matte--placeholder"], ["aria-hidden", "true", 1, "inspection-record"], [1, "record-placeholder", "record-placeholder--eyebrow"], [1, "record-placeholder", "record-placeholder--title"], [1, "record-placeholder", "record-placeholder--short"], [1, "record-placeholder", "record-placeholder--rail"], [1, "record-placeholder", "record-placeholder--copy"], [1, "record-placeholder", "record-placeholder--copy", "record-placeholder--copy-short"], [1, "eyebrow"], ["id", "card-not-found-title"], ["routerLink", "/cards", 1, "btn", "btn--primary"], ["id", "card-error-title"], [1, "card-detail-state__actions"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["routerLink", "/cards", 1, "btn", "btn--secondary"], [1, "inspection-object__sticky"], [1, "card-detail-matte"], ["decoding", "async", "fetchpriority", "high", 1, "card-detail-artwork", 3, "appCardArtwork", "alt"], [1, "inspection-record"], [1, "card-record-header"], [3, "id"], [1, "card-identity-line"], ["aria-label", "Gameplay values", 1, "gameplay-rail"], [1, "printing-record"], [1, "printing-record__identifier"], [1, "printing-record__label"], [1, "printing-record__body"], [1, "printing-record__set"], [1, "printing-record__line"], [1, "printing-record__variants"], ["aria-labelledby", "printing-selector-title", 1, "printing-selector"], [1, "collector-record"], [1, "collector-record__heading", 3, "id"], [1, "collector-feedback-slot"], ["role", "alert", 1, "collector-feedback", "collector-feedback--error"], ["role", "status", 1, "collector-feedback"], ["role", "status", 1, "collector-auth-note"], [1, "printing-selector__heading"], ["id", "printing-selector-title"], ["aria-label", "Available card printings", 1, "printing-rail"], ["type", "button", 1, "printing-option", 3, "printing-option--selected"], ["type", "button", 1, "printing-option", 3, "click"], ["aria-hidden", "true", 1, "printing-option__thumb"], ["alt", "", "loading", "lazy", "decoding", "async", 3, "appCardArtwork"], [1, "printing-option__copy"], [1, "sr-only"], [1, "collector-row"], [1, "collector-row__summary"], [1, "collector-row__label"], [1, "collector-row__actions"], ["type", "button", 1, "collector-inline-action", 3, "disabled"], [1, "collector-auth-note"], ["aria-label", "Collection quantity", 1, "quantity-control"], ["type", "button", 3, "click", "disabled"], ["aria-live", "polite"], ["type", "button", 1, "collector-inline-action", "collector-inline-action--muted", 3, "click", "disabled"], ["type", "button", 1, "collector-inline-action", 3, "click", "disabled"], ["aria-label", "Wishlist wanted quantity", 1, "quantity-control"]], template: function CardDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1)(2, "a", 2)(3, "span", 3);
            i0.ɵɵtext(4, "\u2190");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(5, " Vault Archive ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, CardDetail_Conditional_6_Template, 10, 0, "section", 4)(7, CardDetail_Conditional_7_Template, 9, 0, "section", 5)(8, CardDetail_Conditional_8_Template, 12, 0, "section", 6)(9, CardDetail_Conditional_9_Template, 12, 8, "section", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.isLoading() ? 6 : ctx.isNotFound() ? 7 : ctx.loadError() ? 8 : (tmp_0_0 = ctx.card()) ? 9 : -1, tmp_0_0);
        } }, dependencies: [RouterLink,
            CardArtworkDirective], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.card-detail-page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-block: clamp(34px, 4vw, 58px) clamp(76px, 8vw, 124px);\n  background: var(--colour-background);\n}\n\n\n.card-detail-shell[_ngcontent-%COMP%] {\n  width: min(100% - (var(--page-padding) * 2), 1760px);\n  margin-inline: auto;\n}\n\n.card-detail-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: clamp(36px, 4vw, 58px);\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.card-detail-back[_ngcontent-%COMP%]:hover {\n  color: var(--colour-text);\n}\n\n.inspection-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(420px, 0.84fr) minmax(0, 1.16fr);\n  gap: clamp(58px, 5.2vw, 96px);\n  align-items: start;\n}\n\n.inspection-object[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.inspection-object__sticky[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 116px;\n}\n\n\n\n\n\n.card-detail-matte[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: min(100%, 49vh, 640px);\n  max-width: 100%;\n  place-items: center;\n  padding: clamp(10px, 1.1vw, 16px);\n  background: #0a0f16;\n  box-shadow:\n    0 34px 90px rgba(0, 0, 0, 0.42),\n    inset 0 0 0 1px rgba(255, 255, 255, 0.06);\n}\n\n.card-detail-matte[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: -1px;\n  left: clamp(18px, 2vw, 30px);\n  width: 70px;\n  height: 2px;\n  background: var(--colour-yellow);\n  content: '';\n}\n\n.card-detail-artwork[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n  height: auto;\n  object-fit: contain;\n  transition:\n    transform 160ms ease,\n    filter 160ms ease;\n}\n\n@media (hover: hover) and (pointer: fine) {\n  .card-detail-matte[_ngcontent-%COMP%]:hover   .card-detail-artwork[_ngcontent-%COMP%] {\n    transform: translateY(-2px) scale(1.003);\n    filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.28));\n  }\n}\n\n.inspection-record[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding-top: 0;\n}\n\n.card-record-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 960px;\n  margin: 0;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: clamp(4.15rem, 5.35vw, 6.65rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.028em;\n  text-transform: uppercase;\n}\n\n.card-identity-line[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0;\n  margin: 24px 0 0;\n  color: #b2bac5;\n  font-size: 0.82rem;\n  font-weight: 700;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n}\n\n.card-identity-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]    + span[_ngcontent-%COMP%]::before {\n  margin-inline: 11px;\n  color: #626b77;\n  content: '\u00B7';\n}\n\n.gameplay-rail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0;\n  margin: clamp(26px, 3vw, 38px) 0 0;\n  padding: 18px 0 2px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.gameplay-rail[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 9px;\n  min-width: 126px;\n  padding-right: 30px;\n  margin-right: 30px;\n  border-right: 1px solid var(--colour-border);\n}\n\n.gameplay-rail[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n  margin-right: 0;\n  border-right: 0;\n}\n\n.gameplay-rail[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n\n.gameplay-rail[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.65rem;\n  font-weight: 800;\n  line-height: 1;\n}\n\n\n.printing-selector[_ngcontent-%COMP%] {\n  margin-top: clamp(26px, 3vw, 40px);\n}\n\n.printing-selector__heading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 10px 24px;\n}\n\n.printing-selector__heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: 1.2rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.printing-selector__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-size: 0.76rem;\n}\n\n.printing-rail[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1px;\n  margin-top: 18px;\n  background: var(--colour-border);\n  border-block: 1px solid var(--colour-border);\n}\n\n.printing-option[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-height: 108px;\n  grid-template-columns: 54px minmax(0, 1fr);\n  gap: 14px;\n  align-items: center;\n  padding: 14px 16px 16px;\n  color: var(--colour-text-muted);\n  background: #090d13;\n  border: 0;\n  cursor: pointer;\n  text-align: left;\n  transition:\n    background-color 160ms ease,\n    color 160ms ease;\n}\n\n.printing-option[_ngcontent-%COMP%]::after {\n  position: absolute;\n  right: 16px;\n  bottom: 0;\n  left: 16px;\n  height: 2px;\n  background: transparent;\n  content: '';\n}\n\n.printing-option[_ngcontent-%COMP%]:hover {\n  color: var(--colour-text);\n  background: #0d1219;\n}\n\n.printing-option--selected[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  background: #10151d;\n}\n\n.printing-option--selected[_ngcontent-%COMP%]::after {\n  background: var(--colour-yellow);\n}\n\n.printing-option__thumb[_ngcontent-%COMP%] {\n  display: grid;\n  width: 54px;\n  aspect-ratio: 0.71;\n  place-items: center;\n  overflow: hidden;\n  background: #070a0f;\n}\n\n.printing-option__thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.printing-option__copy[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  gap: 4px;\n}\n\n.printing-option__copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.2rem;\n  font-weight: 900;\n  letter-spacing: 0.04em;\n}\n\n.printing-option__copy[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  overflow: hidden;\n  font-size: 0.76rem;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.printing-option__copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f8997;\n  font-size: 0.63rem;\n  font-weight: 700;\n  letter-spacing: 0.045em;\n  text-transform: uppercase;\n}\n\n\n.printing-record[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(160px, 0.31fr) minmax(0, 1fr);\n  gap: clamp(22px, 3vw, 44px);\n  align-items: end;\n  margin-top: clamp(28px, 3.4vw, 46px);\n  padding-top: clamp(24px, 2.6vw, 34px);\n  border-top: 1px solid var(--colour-border);\n}\n\n.printing-record[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2.25rem, 3.15vw, 3.45rem);\n  font-weight: 900;\n  line-height: 0.95;\n  letter-spacing: 0.01em;\n  text-transform: uppercase;\n}\n\n.printing-record__identifier[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.printing-record__label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 9px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.64rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.printing-record__body[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding-bottom: 2px;\n}\n\n.printing-record__set[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text);\n  font-size: 1rem;\n  font-weight: 650;\n}\n\n.printing-record__line[_ngcontent-%COMP%], \n.printing-record__variants[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0;\n  margin: 10px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.printing-record__line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]    + span[_ngcontent-%COMP%]::before {\n  margin-inline: 10px;\n  color: #626b77;\n  content: '\u00B7';\n}\n\n.printing-record__variants[_ngcontent-%COMP%] {\n  color: #b0b7c1;\n}\n\n\n.collector-record[_ngcontent-%COMP%] {\n  margin-top: clamp(28px, 3.2vw, 44px);\n}\n\n.collector-record__heading[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.2rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.collector-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 24px;\n  align-items: center;\n  min-height: 78px;\n  padding-block: 16px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collector-row__summary[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  min-width: 0;\n}\n\n.collector-row__label[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.collector-row__summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.34rem;\n  font-weight: 800;\n  line-height: 1;\n  text-transform: uppercase;\n}\n\n.collector-row__summary[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:not(.collector-row__label) {\n  color: #a7afbb;\n  font-size: 0.82rem;\n}\n\n.collector-row__actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 126px 172px;\n  align-items: center;\n  justify-content: end;\n  gap: 12px;\n  width: 310px;\n  max-width: 100%;\n}\n\n.collector-row__actions[_ngcontent-%COMP%]    > .collector-inline-action[_ngcontent-%COMP%]:only-child {\n  grid-column: 1 / -1;\n  justify-self: end;\n}\n\n.collector-inline-action[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 0 4px;\n  color: var(--colour-text);\n  background: transparent;\n  border: 0;\n  border-bottom: 2px solid var(--colour-yellow);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collector-inline-action--muted[_ngcontent-%COMP%] {\n  width: 100%;\n  color: var(--colour-text-muted);\n  border-bottom-color: var(--colour-border-strong);\n  text-align: center;\n}\n\n.collector-inline-action[_ngcontent-%COMP%]:hover {\n  color: var(--colour-yellow-light);\n}\n\n.collector-inline-action--muted[_ngcontent-%COMP%]:hover {\n  color: var(--colour-text);\n}\n\n.collector-inline-action[_ngcontent-%COMP%]:disabled, \n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.quantity-control[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 44px 1fr 44px;\n  align-items: center;\n  width: 126px;\n  box-sizing: border-box;\n  border: 1px solid var(--colour-border-strong);\n  background: rgba(255, 255, 255, 0.02);\n}\n\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  width: 44px;\n  height: 44px;\n  place-items: center;\n  padding: 0;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--colour-text);\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.quantity-control[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  min-width: 34px;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 0.9rem;\n  font-weight: 800;\n  text-align: center;\n}\n\n.collector-feedback-slot[_ngcontent-%COMP%] {\n  min-height: 36px;\n}\n\n.collector-feedback[_ngcontent-%COMP%], \n.collector-auth-note[_ngcontent-%COMP%] {\n  margin: 16px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.78rem;\n  line-height: 1.6;\n}\n\n.collector-feedback--error[_ngcontent-%COMP%] {\n  color: #ff9eaa;\n}\n\n.card-detail-state[_ngcontent-%COMP%] {\n  max-width: 760px;\n  padding-block: clamp(70px, 10vw, 130px);\n}\n\n.card-detail-state[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 20px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(3.3rem, 7vw, 6.4rem);\n  font-weight: 900;\n  line-height: 0.9;\n  letter-spacing: -0.02em;\n  text-transform: uppercase;\n}\n\n.card-detail-state[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow) {\n  max-width: 580px;\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.75;\n}\n\n.card-detail-state[_ngcontent-%COMP%]    > .btn[_ngcontent-%COMP%], \n.card-detail-state__actions[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n.card-detail-state__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n\n.inspection-layout--loading[_ngcontent-%COMP%] {\n  min-height: 620px;\n}\n\n.card-detail-matte--placeholder[_ngcontent-%COMP%] {\n  width: min(100%, 49vh, 640px);\n  aspect-ratio: 0.71;\n  background: #0c1118;\n}\n\n.card-detail-matte--placeholder[_ngcontent-%COMP%]::before {\n  background: rgba(255, 255, 255, 0.08);\n}\n\n.record-placeholder[_ngcontent-%COMP%] {\n  display: block;\n  height: 15px;\n  margin-top: 20px;\n  background: rgba(255, 255, 255, 0.055);\n}\n\n.record-placeholder--eyebrow[_ngcontent-%COMP%] {\n  width: 110px;\n  height: 9px;\n  margin-top: 0;\n}\n\n.record-placeholder--title[_ngcontent-%COMP%] {\n  width: min(86%, 680px);\n  height: 92px;\n}\n\n.record-placeholder--short[_ngcontent-%COMP%] {\n  width: 44%;\n}\n\n.record-placeholder--rail[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 58px;\n  margin-top: 38px;\n}\n\n.record-placeholder--copy[_ngcontent-%COMP%] {\n  width: 94%;\n  height: 18px;\n  margin-top: 48px;\n}\n\n.record-placeholder--copy-short[_ngcontent-%COMP%] {\n  width: 68%;\n  margin-top: 12px;\n}\n\n@media (max-width: 1180px) {\n  .inspection-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(350px, 0.82fr) minmax(0, 1.18fr);\n    gap: 46px;\n  }\n}\n\n@media (max-width: 900px) {\n  .card-detail-page[_ngcontent-%COMP%] {\n    background: var(--colour-background);\n  }\n\n  .inspection-layout[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n  }\n\n  .inspection-object[_ngcontent-%COMP%] {\n    order: 2;\n    width: 100%;\n    margin-top: 28px;\n  }\n\n  .inspection-object__sticky[_ngcontent-%COMP%] {\n    position: static;\n  }\n\n  .card-detail-matte[_ngcontent-%COMP%] {\n    width: min(100%, 560px);\n    margin-inline: auto;\n  }\n\n  .card-detail-artwork[_ngcontent-%COMP%] {\n    width: 100%;\n    max-height: none;\n  }\n\n  .inspection-record[_ngcontent-%COMP%] {\n    display: contents;\n  }\n\n  .card-record-header[_ngcontent-%COMP%] {\n    order: 1;\n    width: 100%;\n  }\n\n  .gameplay-rail[_ngcontent-%COMP%] {\n    order: 5;\n    width: 100%;\n    margin-top: 36px;\n  }\n\n  .printing-record[_ngcontent-%COMP%] {\n    order: 4;\n    width: 100%;\n  }\n\n  .printing-selector[_ngcontent-%COMP%] {\n    order: 3;\n    width: 100%;\n  }\n\n  .collector-record[_ngcontent-%COMP%] {\n    order: 6;\n    width: 100%;\n  }\n\n  .card-record-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(3.5rem, 12vw, 6rem);\n  }\n\n  .printing-rail[_ngcontent-%COMP%] {\n    display: flex;\n    overflow-x: auto;\n    gap: 1px;\n    padding-bottom: 8px;\n    scroll-snap-type: x proximity;\n    overscroll-behavior-inline: contain;\n  }\n\n  .printing-option[_ngcontent-%COMP%] {\n    min-width: min(78vw, 330px);\n    scroll-snap-align: start;\n  }\n}\n\n@media (max-width: 620px) {\n  .card-detail-page[_ngcontent-%COMP%] {\n    padding-top: 30px;\n  }\n\n  .card-detail-back[_ngcontent-%COMP%] {\n    margin-bottom: 28px;\n  }\n\n  .card-detail-matte[_ngcontent-%COMP%] {\n    padding: 9px;\n  }\n\n  .printing-record[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n\n  .collector-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 14px;\n  }\n\n  .collector-row__actions[_ngcontent-%COMP%] {\n    width: 310px;\n    justify-content: flex-start;\n  }\n\n  .gameplay-rail[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    min-width: auto;\n    flex: 1 1 30%;\n    padding-right: 14px;\n    margin-right: 14px;\n  }\n}\n\n@media (max-width: 390px) {\n  .card-detail-shell[_ngcontent-%COMP%] {\n    width: min(100% - 36px, 100%);\n  }\n\n  .collector-row__actions[_ngcontent-%COMP%] {\n    grid-template-columns: 126px minmax(0, 1fr);\n    width: 100%;\n    gap: 10px;\n  }\n\n  .collector-inline-action--muted[_ngcontent-%COMP%] {\n    white-space: normal;\n  }\n\n  .card-record-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(3.1rem, 15vw, 4.5rem);\n  }\n\n  .card-detail-matte[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .printing-selector__heading[_ngcontent-%COMP%] {\n    display: block;\n  }\n\n  .printing-selector__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin-top: 7px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .card-detail-artwork[_ngcontent-%COMP%], \n   .card-detail-back[_ngcontent-%COMP%], \n   .printing-option[_ngcontent-%COMP%] {\n    transition: none;\n  }\n\n  .card-detail-matte[_ngcontent-%COMP%]:hover   .card-detail-artwork[_ngcontent-%COMP%] {\n    transform: none;\n    filter: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardDetail, [{
        type: Component,
        args: [{ selector: 'app-card-detail', standalone: true, imports: [
                    RouterLink,
                    CardArtworkDirective
                ], template: "<main class=\"card-detail-page\">\n  <div class=\"card-detail-shell\">\n    <a class=\"card-detail-back\" routerLink=\"/cards\">\n      <span aria-hidden=\"true\">\u2190</span>\n      Vault Archive\n    </a>\n\n    @if (isLoading()) {\n      <section class=\"inspection-layout inspection-layout--loading\" aria-label=\"Loading card\">\n        <div class=\"inspection-object\">\n          <div class=\"card-detail-matte card-detail-matte--placeholder\" aria-hidden=\"true\"></div>\n        </div>\n\n        <div class=\"inspection-record\" aria-hidden=\"true\">\n          <span class=\"record-placeholder record-placeholder--eyebrow\"></span>\n          <span class=\"record-placeholder record-placeholder--title\"></span>\n          <span class=\"record-placeholder record-placeholder--short\"></span>\n          <span class=\"record-placeholder record-placeholder--rail\"></span>\n          <span class=\"record-placeholder record-placeholder--copy\"></span>\n          <span\n            class=\"record-placeholder record-placeholder--copy record-placeholder--copy-short\"\n          ></span>\n        </div>\n      </section>\n    } @else if (isNotFound()) {\n      <section class=\"card-detail-state\" aria-labelledby=\"card-not-found-title\">\n        <p class=\"eyebrow\">Vault Archive</p>\n        <h1 id=\"card-not-found-title\">Card record not found.</h1>\n        <p>This card isn't currently stored in the Vault Archive.</p>\n        <a class=\"btn btn--primary\" routerLink=\"/cards\">Return to Vault Archive</a>\n      </section>\n    } @else if (loadError()) {\n      <section class=\"card-detail-state\" aria-labelledby=\"card-error-title\">\n        <p class=\"eyebrow\">Vault Archive</p>\n        <h1 id=\"card-error-title\">We couldn't load this card.</h1>\n        <p>Try the card again, or return to the Vault Archive.</p>\n        <div class=\"card-detail-state__actions\">\n          <button class=\"btn btn--primary\" type=\"button\" (click)=\"retry()\">Try again</button>\n          <a class=\"btn btn--secondary\" routerLink=\"/cards\">Back to Vault Archive</a>\n        </div>\n      </section>\n    } @else if (card(); as currentCard) {\n      <section class=\"inspection-layout\" [attr.aria-labelledby]=\"'card-title-' + currentCard.id\">\n        <div class=\"inspection-object\">\n          <div class=\"inspection-object__sticky\">\n            <div class=\"card-detail-matte\">\n              <img\n                class=\"card-detail-artwork\"\n                [appCardArtwork]=\"selectedPrinting()?.imageUrl ?? currentCard.imageUrl\"\n                [alt]=\"\n                  currentCard.name +\n                  (selectedPrinting()?.cardNumber\n                    ? ' \u2014 printing ' + selectedPrinting()?.cardNumber\n                    : '')\n                \"\n                decoding=\"async\"\n                fetchpriority=\"high\"\n              />\n            </div>\n          </div>\n        </div>\n\n        <div class=\"inspection-record\">\n          <header class=\"card-record-header\">\n            <h1 [id]=\"'card-title-' + currentCard.id\">\n              {{ currentCard.name }}\n            </h1>\n\n            @if (\n              hasMeaningfulValue(selectedPrinting()?.rarity) ||\n              hasMeaningfulValue(currentCard.cardType) ||\n              hasMeaningfulValue(currentCard.classification) ||\n              hasMeaningfulValue(currentCard.colour) ||\n              hasMeaningfulValue(currentCard.keywords)\n            ) {\n              <p class=\"card-identity-line\">\n                @if (hasMeaningfulValue(selectedPrinting()?.rarity)) {\n                  <span>{{ selectedPrinting()?.rarity }}</span>\n                }\n                @if (hasMeaningfulValue(currentCard.cardType)) {\n                  <span>{{ currentCard.cardType }}</span>\n                }\n                @if (hasMeaningfulValue(currentCard.classification)) {\n                  <span>{{ currentCard.classification }}</span>\n                }\n                @if (hasMeaningfulValue(currentCard.colour)) {\n                  <span>{{ currentCard.colour }}</span>\n                }\n                @if (hasMeaningfulValue(currentCard.keywords)) {\n                  <span>{{ currentCard.keywords }}</span>\n                }\n              </p>\n            }\n          </header>\n\n          @if (\n            currentCard.cost !== null ||\n            currentCard.power !== null ||\n            currentCard.ramCost !== null ||\n            currentCard.eddies !== null\n          ) {\n            <dl class=\"gameplay-rail\" aria-label=\"Gameplay values\">\n              @if (currentCard.cost !== null) {\n                <div>\n                  <dt>Cost</dt>\n                  <dd>{{ currentCard.cost }}</dd>\n                </div>\n              }\n              @if (currentCard.power !== null) {\n                <div>\n                  <dt>Power</dt>\n                  <dd>{{ currentCard.power }}</dd>\n                </div>\n              }\n              @if (currentCard.ramCost !== null) {\n                <div>\n                  <dt>RAM</dt>\n                  <dd>{{ currentCard.ramCost }}</dd>\n                </div>\n              }\n              @if (currentCard.eddies !== null) {\n                <div>\n                  <dt>Eddies</dt>\n                  <dd>{{ currentCard.eddies }}</dd>\n                </div>\n              }\n            </dl>\n          }\n\n          <!--\n            Rules Text is intentionally not fabricated from Notes or artwork.\n            When the backend exposes a source-backed Rules field, it belongs\n            here before the physical printing record.\n          -->\n\n          @if (selectedPrinting(); as printing) {\n            <section class=\"printing-record\" [attr.aria-labelledby]=\"'printing-id-' + printing.id\">\n              <div class=\"printing-record__identifier\">\n                <span class=\"printing-record__label\">Printing</span>\n                <h2 [id]=\"'printing-id-' + printing.id\">{{ printing.cardNumber }}</h2>\n              </div>\n\n              <div class=\"printing-record__body\">\n                @if (hasMeaningfulValue(printing.setName)) {\n                  <p class=\"printing-record__set\">{{ printing.setName }}</p>\n                }\n\n                <p class=\"printing-record__line\">\n                  @if (hasMeaningfulValue(printing.rarity)) {\n                    <span>{{ printing.rarity }}</span>\n                  }\n                  @if (hasMeaningfulValue(printing.languageCode)) {\n                    <span>{{ printing.languageCode }}</span>\n                  }\n                  @if (hasMeaningfulValue(printing.setCode)) {\n                    <span>Set Code {{ printing.setCode }}</span>\n                  }\n                </p>\n\n                @if (printingVariants(printing).length > 0) {\n                  <p class=\"printing-record__variants\">\n                    {{ printingVariants(printing).join(' \u00B7 ') }}\n                  </p>\n                }\n              </div>\n            </section>\n\n            @if (currentCard.printings.length > 1) {\n              <section class=\"printing-selector\" aria-labelledby=\"printing-selector-title\">\n                <div class=\"printing-selector__heading\">\n                  <h2 id=\"printing-selector-title\">Available printings</h2>\n                  <p>Select another physical printing.</p>\n                </div>\n\n                <div class=\"printing-rail\" aria-label=\"Available card printings\">\n                  @for (candidate of currentCard.printings; track candidate.id) {\n                    <button\n                      class=\"printing-option\"\n                      type=\"button\"\n                      [class.printing-option--selected]=\"selectedPrinting()?.id === candidate.id\"\n                      [attr.aria-pressed]=\"selectedPrinting()?.id === candidate.id\"\n                      [attr.aria-label]=\"printingAccessibleLabel(candidate)\"\n                      (click)=\"selectPrinting(candidate)\"\n                    >\n                      <span class=\"printing-option__thumb\" aria-hidden=\"true\">\n                        <img\n                          [appCardArtwork]=\"candidate.imageUrl\"\n                          alt=\"\"\n                          loading=\"lazy\"\n                          decoding=\"async\"\n                        />\n                      </span>\n                      <span class=\"printing-option__copy\">\n                        <strong>{{ candidate.cardNumber }}</strong>\n                        <span>{{ candidate.setName }}</span>\n                        @if (printingVariants(candidate).length > 0) {\n                          <small>{{ printingVariants(candidate).join(' \u00B7 ') }}</small>\n                        }\n                      </span>\n                      @if (selectedPrinting()?.id === candidate.id) {\n                        <span class=\"sr-only\">Selected</span>\n                      }\n                    </button>\n                  }\n                </div>\n              </section>\n            }\n\n            <section\n              class=\"collector-record\"\n              [attr.aria-labelledby]=\"'collector-record-title-' + printing.id\"\n            >\n              <h2 class=\"collector-record__heading\" [id]=\"'collector-record-title-' + printing.id\">\n                Your record\n              </h2>\n\n              <div class=\"collector-feedback-slot\">\n                @if (collectorError()) {\n                  <p class=\"collector-feedback collector-feedback--error\" role=\"alert\">\n                    {{ collectorError() }}\n                  </p>\n                }\n\n                @if (collectorMessage()) {\n                  <p class=\"collector-feedback\" role=\"status\">\n                    {{ collectorMessage() }}\n                  </p>\n                }\n              </div>\n\n              @if (!authService.isInitialized() || isCollectorStateLoading()) {\n                <p class=\"collector-auth-note\" role=\"status\">Checking your collector record\u2026</p>\n              } @else {\n                <div class=\"collector-row\">\n                  <div class=\"collector-row__summary\">\n                    <span class=\"collector-row__label\">Collection</span>\n                    @if (ownedRecord(); as owned) {\n                      <strong>\n                        {{ owned.quantityOwned }}\n                        {{ owned.quantityOwned === 1 ? 'copy' : 'copies' }}\n                      </strong>\n                    } @else if (authService.isAuthenticated()) {\n                      <span>Not in your collection</span>\n                    } @else {\n                      <span>Sign in to record ownership</span>\n                    }\n                  </div>\n\n                  <div class=\"collector-row__actions\">\n                    @if (ownedRecord(); as owned) {\n                      <div class=\"quantity-control\" aria-label=\"Collection quantity\">\n                        <button\n                          type=\"button\"\n                          [disabled]=\"owned.quantityOwned <= 1 || isCollectionBusy()\"\n                          [attr.aria-label]=\"\n                            'Decrease collection quantity from ' + owned.quantityOwned\n                          \"\n                          (click)=\"decreaseCollectionQuantity()\"\n                        >\n                          \u2212\n                        </button>\n                        <span aria-live=\"polite\">{{ owned.quantityOwned }}</span>\n                        <button\n                          type=\"button\"\n                          [disabled]=\"owned.quantityOwned >= 999 || isCollectionBusy()\"\n                          [attr.aria-label]=\"\n                            'Increase collection quantity from ' + owned.quantityOwned\n                          \"\n                          (click)=\"increaseCollectionQuantity()\"\n                        >\n                          +\n                        </button>\n                      </div>\n                      <button\n                        class=\"collector-inline-action collector-inline-action--muted\"\n                        type=\"button\"\n                        [disabled]=\"isCollectionBusy()\"\n                        (click)=\"removeFromCollection()\"\n                      >\n                        Remove from Collection\n                      </button>\n                    } @else {\n                      <button\n                        class=\"collector-inline-action\"\n                        type=\"button\"\n                        [disabled]=\"isCollectionBusy()\"\n                        (click)=\"addToCollection()\"\n                      >\n                        {{ isCollectionBusy() ? 'Adding\u2026' : 'Add' }}\n                      </button>\n                    }\n                  </div>\n                </div>\n\n                <div class=\"collector-row\">\n                  <div class=\"collector-row__summary\">\n                    <span class=\"collector-row__label\">Wishlist</span>\n                    @if (wishlistRecord(); as wanted) {\n                      <strong> Wanted {{ wanted.wantedQuantity }} </strong>\n                    } @else if (authService.isAuthenticated()) {\n                      <span>Not on your wishlist</span>\n                    } @else {\n                      <span>Sign in to record wanted state</span>\n                    }\n                  </div>\n\n                  <div class=\"collector-row__actions\">\n                    @if (wishlistRecord(); as wanted) {\n                      <div class=\"quantity-control\" aria-label=\"Wishlist wanted quantity\">\n                        <button\n                          type=\"button\"\n                          [disabled]=\"wanted.wantedQuantity <= 1 || isWishlistBusy()\"\n                          [attr.aria-label]=\"\n                            'Decrease wanted quantity from ' + wanted.wantedQuantity\n                          \"\n                          (click)=\"decreaseWishlistQuantity()\"\n                        >\n                          \u2212\n                        </button>\n                        <span aria-live=\"polite\">{{ wanted.wantedQuantity }}</span>\n                        <button\n                          type=\"button\"\n                          [disabled]=\"wanted.wantedQuantity >= 999 || isWishlistBusy()\"\n                          [attr.aria-label]=\"\n                            'Increase wanted quantity from ' + wanted.wantedQuantity\n                          \"\n                          (click)=\"increaseWishlistQuantity()\"\n                        >\n                          +\n                        </button>\n                      </div>\n                      <button\n                        class=\"collector-inline-action collector-inline-action--muted\"\n                        type=\"button\"\n                        [disabled]=\"isWishlistBusy()\"\n                        (click)=\"removeFromWishlist()\"\n                      >\n                        Remove from Wishlist\n                      </button>\n                    } @else {\n                      <button\n                        class=\"collector-inline-action\"\n                        type=\"button\"\n                        [disabled]=\"isWishlistBusy()\"\n                        (click)=\"addToWishlist()\"\n                      >\n                        {{ isWishlistBusy() ? 'Adding\u2026' : 'Add' }}\n                      </button>\n                    }\n                  </div>\n                </div>\n\n                @if (!authService.isAuthenticated()) {\n                  <p class=\"collector-auth-note\">\n                    Sign in only when you want to record Collection or Wishlist state.\n                  </p>\n                }\n              }\n            </section>\n          }\n        </div>\n      </section>\n    }\n  </div>\n</main>\n", styles: [":host {\n  display: block;\n}\n\n.card-detail-page {\n  min-height: 100%;\n  padding-block: clamp(34px, 4vw, 58px) clamp(76px, 8vw, 124px);\n  background: var(--colour-background);\n}\n\n/* Signature surfaces are allowed to use more canvas than utility pages. */\n.card-detail-shell {\n  width: min(100% - (var(--page-padding) * 2), 1760px);\n  margin-inline: auto;\n}\n\n.card-detail-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: clamp(36px, 4vw, 58px);\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.card-detail-back:hover {\n  color: var(--colour-text);\n}\n\n.inspection-layout {\n  display: grid;\n  grid-template-columns: minmax(420px, 0.84fr) minmax(0, 1.16fr);\n  gap: clamp(58px, 5.2vw, 96px);\n  align-items: start;\n}\n\n.inspection-object {\n  min-width: 0;\n}\n\n.inspection-object__sticky {\n  position: sticky;\n  top: 116px;\n}\n\n/*\n * The matte reads as an inspection surface rather than a bordered image box.\n * The physical object itself carries the visual weight.\n */\n.card-detail-matte {\n  position: relative;\n  display: grid;\n  width: min(100%, 49vh, 640px);\n  max-width: 100%;\n  place-items: center;\n  padding: clamp(10px, 1.1vw, 16px);\n  background: #0a0f16;\n  box-shadow:\n    0 34px 90px rgba(0, 0, 0, 0.42),\n    inset 0 0 0 1px rgba(255, 255, 255, 0.06);\n}\n\n.card-detail-matte::before {\n  position: absolute;\n  top: -1px;\n  left: clamp(18px, 2vw, 30px);\n  width: 70px;\n  height: 2px;\n  background: var(--colour-yellow);\n  content: '';\n}\n\n.card-detail-artwork {\n  width: 100%;\n  max-width: 100%;\n  height: auto;\n  object-fit: contain;\n  transition:\n    transform 160ms ease,\n    filter 160ms ease;\n}\n\n@media (hover: hover) and (pointer: fine) {\n  .card-detail-matte:hover .card-detail-artwork {\n    transform: translateY(-2px) scale(1.003);\n    filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.28));\n  }\n}\n\n.inspection-record {\n  min-width: 0;\n  padding-top: 0;\n}\n\n.card-record-header h1 {\n  max-width: 960px;\n  margin: 0;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: clamp(4.15rem, 5.35vw, 6.65rem);\n  font-weight: 900;\n  line-height: 0.88;\n  letter-spacing: -0.028em;\n  text-transform: uppercase;\n}\n\n.card-identity-line {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0;\n  margin: 24px 0 0;\n  color: #b2bac5;\n  font-size: 0.82rem;\n  font-weight: 700;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n}\n\n.card-identity-line span + span::before {\n  margin-inline: 11px;\n  color: #626b77;\n  content: '\u00B7';\n}\n\n.gameplay-rail {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0;\n  margin: clamp(26px, 3vw, 38px) 0 0;\n  padding: 18px 0 2px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.gameplay-rail > div {\n  display: flex;\n  align-items: baseline;\n  gap: 9px;\n  min-width: 126px;\n  padding-right: 30px;\n  margin-right: 30px;\n  border-right: 1px solid var(--colour-border);\n}\n\n.gameplay-rail > div:last-child {\n  margin-right: 0;\n  border-right: 0;\n}\n\n.gameplay-rail dt {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n\n.gameplay-rail dd {\n  margin: 0;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.65rem;\n  font-weight: 800;\n  line-height: 1;\n}\n\n/* Printing selection feels like choosing another physical specimen. */\n.printing-selector {\n  margin-top: clamp(26px, 3vw, 40px);\n}\n\n.printing-selector__heading {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 10px 24px;\n}\n\n.printing-selector__heading h2 {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: 1.2rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.printing-selector__heading p {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-size: 0.76rem;\n}\n\n.printing-rail {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1px;\n  margin-top: 18px;\n  background: var(--colour-border);\n  border-block: 1px solid var(--colour-border);\n}\n\n.printing-option {\n  position: relative;\n  display: grid;\n  min-height: 108px;\n  grid-template-columns: 54px minmax(0, 1fr);\n  gap: 14px;\n  align-items: center;\n  padding: 14px 16px 16px;\n  color: var(--colour-text-muted);\n  background: #090d13;\n  border: 0;\n  cursor: pointer;\n  text-align: left;\n  transition:\n    background-color 160ms ease,\n    color 160ms ease;\n}\n\n.printing-option::after {\n  position: absolute;\n  right: 16px;\n  bottom: 0;\n  left: 16px;\n  height: 2px;\n  background: transparent;\n  content: '';\n}\n\n.printing-option:hover {\n  color: var(--colour-text);\n  background: #0d1219;\n}\n\n.printing-option--selected {\n  color: var(--colour-text);\n  background: #10151d;\n}\n\n.printing-option--selected::after {\n  background: var(--colour-yellow);\n}\n\n.printing-option__thumb {\n  display: grid;\n  width: 54px;\n  aspect-ratio: 0.71;\n  place-items: center;\n  overflow: hidden;\n  background: #070a0f;\n}\n\n.printing-option__thumb img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.printing-option__copy {\n  display: grid;\n  min-width: 0;\n  gap: 4px;\n}\n\n.printing-option__copy strong {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.2rem;\n  font-weight: 900;\n  letter-spacing: 0.04em;\n}\n\n.printing-option__copy > span {\n  overflow: hidden;\n  font-size: 0.76rem;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.printing-option__copy small {\n  color: #7f8997;\n  font-size: 0.63rem;\n  font-weight: 700;\n  letter-spacing: 0.045em;\n  text-transform: uppercase;\n}\n\n/* Editorial physical-printing record: identifier first, then evidence. */\n.printing-record {\n  display: grid;\n  grid-template-columns: minmax(160px, 0.31fr) minmax(0, 1fr);\n  gap: clamp(22px, 3vw, 44px);\n  align-items: end;\n  margin-top: clamp(28px, 3.4vw, 46px);\n  padding-top: clamp(24px, 2.6vw, 34px);\n  border-top: 1px solid var(--colour-border);\n}\n\n.printing-record h2 {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2.25rem, 3.15vw, 3.45rem);\n  font-weight: 900;\n  line-height: 0.95;\n  letter-spacing: 0.01em;\n  text-transform: uppercase;\n}\n\n.printing-record__identifier {\n  min-width: 0;\n}\n\n.printing-record__label {\n  display: block;\n  margin-bottom: 9px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.64rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.printing-record__body {\n  min-width: 0;\n  padding-bottom: 2px;\n}\n\n.printing-record__set {\n  margin: 0;\n  color: var(--colour-text);\n  font-size: 1rem;\n  font-weight: 650;\n}\n\n.printing-record__line,\n.printing-record__variants {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0;\n  margin: 10px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.printing-record__line span + span::before {\n  margin-inline: 10px;\n  color: #626b77;\n  content: '\u00B7';\n}\n\n.printing-record__variants {\n  color: #b0b7c1;\n}\n\n/* Personal state is annotation, not ecommerce. */\n.collector-record {\n  margin-top: clamp(28px, 3.2vw, 44px);\n}\n\n.collector-record__heading {\n  margin: 0 0 8px;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.2rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.collector-row {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 24px;\n  align-items: center;\n  min-height: 78px;\n  padding-block: 16px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collector-row__summary {\n  display: grid;\n  gap: 6px;\n  min-width: 0;\n}\n\n.collector-row__label {\n  color: var(--colour-text-muted);\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.collector-row__summary strong {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1.34rem;\n  font-weight: 800;\n  line-height: 1;\n  text-transform: uppercase;\n}\n\n.collector-row__summary > span:not(.collector-row__label) {\n  color: #a7afbb;\n  font-size: 0.82rem;\n}\n\n.collector-row__actions {\n  display: grid;\n  grid-template-columns: 126px 172px;\n  align-items: center;\n  justify-content: end;\n  gap: 12px;\n  width: 310px;\n  max-width: 100%;\n}\n\n.collector-row__actions > .collector-inline-action:only-child {\n  grid-column: 1 / -1;\n  justify-self: end;\n}\n\n.collector-inline-action {\n  min-height: 44px;\n  padding: 0 4px;\n  color: var(--colour-text);\n  background: transparent;\n  border: 0;\n  border-bottom: 2px solid var(--colour-yellow);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collector-inline-action--muted {\n  width: 100%;\n  color: var(--colour-text-muted);\n  border-bottom-color: var(--colour-border-strong);\n  text-align: center;\n}\n\n.collector-inline-action:hover {\n  color: var(--colour-yellow-light);\n}\n\n.collector-inline-action--muted:hover {\n  color: var(--colour-text);\n}\n\n.collector-inline-action:disabled,\n.quantity-control button:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.quantity-control {\n  display: grid;\n  grid-template-columns: 44px 1fr 44px;\n  align-items: center;\n  width: 126px;\n  box-sizing: border-box;\n  border: 1px solid var(--colour-border-strong);\n  background: rgba(255, 255, 255, 0.02);\n}\n\n.quantity-control button {\n  display: grid;\n  width: 44px;\n  height: 44px;\n  place-items: center;\n  padding: 0;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\n.quantity-control button:hover:not(:disabled) {\n  color: var(--colour-text);\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.quantity-control span {\n  min-width: 34px;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 0.9rem;\n  font-weight: 800;\n  text-align: center;\n}\n\n.collector-feedback-slot {\n  min-height: 36px;\n}\n\n.collector-feedback,\n.collector-auth-note {\n  margin: 16px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.78rem;\n  line-height: 1.6;\n}\n\n.collector-feedback--error {\n  color: #ff9eaa;\n}\n\n.card-detail-state {\n  max-width: 760px;\n  padding-block: clamp(70px, 10vw, 130px);\n}\n\n.card-detail-state h1 {\n  margin: 20px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(3.3rem, 7vw, 6.4rem);\n  font-weight: 900;\n  line-height: 0.9;\n  letter-spacing: -0.02em;\n  text-transform: uppercase;\n}\n\n.card-detail-state > p:not(.eyebrow) {\n  max-width: 580px;\n  margin: 24px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.75;\n}\n\n.card-detail-state > .btn,\n.card-detail-state__actions {\n  margin-top: 30px;\n}\n\n.card-detail-state__actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n\n.inspection-layout--loading {\n  min-height: 620px;\n}\n\n.card-detail-matte--placeholder {\n  width: min(100%, 49vh, 640px);\n  aspect-ratio: 0.71;\n  background: #0c1118;\n}\n\n.card-detail-matte--placeholder::before {\n  background: rgba(255, 255, 255, 0.08);\n}\n\n.record-placeholder {\n  display: block;\n  height: 15px;\n  margin-top: 20px;\n  background: rgba(255, 255, 255, 0.055);\n}\n\n.record-placeholder--eyebrow {\n  width: 110px;\n  height: 9px;\n  margin-top: 0;\n}\n\n.record-placeholder--title {\n  width: min(86%, 680px);\n  height: 92px;\n}\n\n.record-placeholder--short {\n  width: 44%;\n}\n\n.record-placeholder--rail {\n  width: 100%;\n  height: 58px;\n  margin-top: 38px;\n}\n\n.record-placeholder--copy {\n  width: 94%;\n  height: 18px;\n  margin-top: 48px;\n}\n\n.record-placeholder--copy-short {\n  width: 68%;\n  margin-top: 12px;\n}\n\n@media (max-width: 1180px) {\n  .inspection-layout {\n    grid-template-columns: minmax(350px, 0.82fr) minmax(0, 1.18fr);\n    gap: 46px;\n  }\n}\n\n@media (max-width: 900px) {\n  .card-detail-page {\n    background: var(--colour-background);\n  }\n\n  .inspection-layout {\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n  }\n\n  .inspection-object {\n    order: 2;\n    width: 100%;\n    margin-top: 28px;\n  }\n\n  .inspection-object__sticky {\n    position: static;\n  }\n\n  .card-detail-matte {\n    width: min(100%, 560px);\n    margin-inline: auto;\n  }\n\n  .card-detail-artwork {\n    width: 100%;\n    max-height: none;\n  }\n\n  .inspection-record {\n    display: contents;\n  }\n\n  .card-record-header {\n    order: 1;\n    width: 100%;\n  }\n\n  .gameplay-rail {\n    order: 5;\n    width: 100%;\n    margin-top: 36px;\n  }\n\n  .printing-record {\n    order: 4;\n    width: 100%;\n  }\n\n  .printing-selector {\n    order: 3;\n    width: 100%;\n  }\n\n  .collector-record {\n    order: 6;\n    width: 100%;\n  }\n\n  .card-record-header h1 {\n    font-size: clamp(3.5rem, 12vw, 6rem);\n  }\n\n  .printing-rail {\n    display: flex;\n    overflow-x: auto;\n    gap: 1px;\n    padding-bottom: 8px;\n    scroll-snap-type: x proximity;\n    overscroll-behavior-inline: contain;\n  }\n\n  .printing-option {\n    min-width: min(78vw, 330px);\n    scroll-snap-align: start;\n  }\n}\n\n@media (max-width: 620px) {\n  .card-detail-page {\n    padding-top: 30px;\n  }\n\n  .card-detail-back {\n    margin-bottom: 28px;\n  }\n\n  .card-detail-matte {\n    padding: 9px;\n  }\n\n  .printing-record {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n\n  .collector-row {\n    grid-template-columns: 1fr;\n    gap: 14px;\n  }\n\n  .collector-row__actions {\n    width: 310px;\n    justify-content: flex-start;\n  }\n\n  .gameplay-rail > div {\n    min-width: auto;\n    flex: 1 1 30%;\n    padding-right: 14px;\n    margin-right: 14px;\n  }\n}\n\n@media (max-width: 390px) {\n  .card-detail-shell {\n    width: min(100% - 36px, 100%);\n  }\n\n  .collector-row__actions {\n    grid-template-columns: 126px minmax(0, 1fr);\n    width: 100%;\n    gap: 10px;\n  }\n\n  .collector-inline-action--muted {\n    white-space: normal;\n  }\n\n  .card-record-header h1 {\n    font-size: clamp(3.1rem, 15vw, 4.5rem);\n  }\n\n  .card-detail-matte {\n    width: 100%;\n  }\n\n  .printing-selector__heading {\n    display: block;\n  }\n\n  .printing-selector__heading p {\n    margin-top: 7px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .card-detail-artwork,\n  .card-detail-back,\n  .printing-option {\n    transition: none;\n  }\n\n  .card-detail-matte:hover .card-detail-artwork {\n    transform: none;\n    filter: none;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.CardsService }, { type: i4.OwnedCardsService }, { type: i5.WishlistService }, { type: i6.DynamicSeoService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CardDetail, { className: "CardDetail", filePath: "src/app/features/cards/pages/card-detail/card-detail.ts", lineNumber: 48 }); })();

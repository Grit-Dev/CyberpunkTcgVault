import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { CardArtworkDirective } from '../../../cards/directives/card-artwork.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../services/owned-cards.service";
import * as i3 from "../../../../core/feedback/feedback.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
const _c0 = () => [1, 2, 3, 4];
const _c1 = a0 => ["/cards", a0];
const _c2 = a0 => ({ printing: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function Collection_Conditional_11_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "span", 13);
    i0.ɵɵelementStart(2, "div", 14);
    i0.ɵɵelement(3, "span")(4, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "span", 15);
    i0.ɵɵelementEnd();
} }
function Collection_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 7)(1, "div", 11);
    i0.ɵɵelement(2, "span")(3, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, Collection_Conditional_11_For_5_Template, 6, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function Collection_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 8)(1, "p", 16);
    i0.ɵɵtext(2, "Collection unavailable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2", 17);
    i0.ɵɵtext(4, "We couldn't load your collection.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Your existing records have not been changed.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 18);
    i0.ɵɵlistener("click", function Collection_Conditional_12_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.retry()); });
    i0.ɵɵtext(8, " Try again ");
    i0.ɵɵelementEnd()();
} }
function Collection_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 9)(1, "p", 16);
    i0.ɵɵtext(2, "Private collection");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2", 19);
    i0.ɵɵtext(4, "Your collection starts with a card.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Add an exact physical printing from Card Detail to begin your collection.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 20);
    i0.ɵɵtext(8, "Browse cards");
    i0.ɵɵelementEnd()();
} }
function Collection_Conditional_14_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const set_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", set_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(set_r4);
} }
function Collection_Conditional_14_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.clearFilters()); });
    i0.ɵɵtext(1, " Clear filters ");
    i0.ɵɵelementEnd();
} }
function Collection_Conditional_14_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32)(1, "h2");
    i0.ɵɵtext(2, "No cards in your collection match these filters.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 18);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_20_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.clearFilters()); });
    i0.ɵɵtext(4, " Clear filters ");
    i0.ɵɵelementEnd()();
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r8.cardNumber);
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1, "Physical printing");
    i0.ɵɵelementEnd();
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r8.setName);
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r8.rarity);
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 51);
    i0.ɵɵtext(1, "Details added");
    i0.ɵɵelementEnd();
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1, "Condition must be 50 characters or fewer.");
    i0.ɵɵelementEnd();
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("id", "condition-server-error-" + item_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.conditionServerError(), " ");
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1, "Notes must be 2,000 characters or fewer.");
    i0.ɵɵelementEnd();
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("id", "notes-server-error-" + item_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.notesServerError(), " ");
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saveError(), " ");
} }
function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 54);
    i0.ɵɵlistener("ngSubmit", function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r9); const item_r8 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.saveEdit(item_r8)); });
    i0.ɵɵelementStart(1, "div", 55)(2, "p");
    i0.ɵɵtext(3, "Collector record");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 56)(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 57)(10, "div", 58)(11, "label", 59);
    i0.ɵɵtext(12, "Condition");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 60);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(14, Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_14_Template, 2, 0, "p", 61)(15, Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_15_Template, 2, 2, "p", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 63)(17, "label", 59);
    i0.ɵɵtext(18, "Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "textarea", 64);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(20, Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_20_Template, 2, 0, "p", 61)(21, Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_21_Template, 2, 2, "p", 62);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "fieldset", 65)(23, "legend");
    i0.ɵɵtext(24, "Collection state");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "label", 66);
    i0.ɵɵelement(26, "input", 67);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28, "Master collection");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "label", 66);
    i0.ɵɵelement(30, "input", 68);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵtext(32, "Duplicate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "label", 66);
    i0.ɵɵelement(34, "input", 69);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(35, "span");
    i0.ɵɵtext(36, "Grading candidate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "label", 66);
    i0.ɵɵelement(38, "input", 70);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Open for trade");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "label", 66);
    i0.ɵɵelement(42, "input", 71);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(43, "span");
    i0.ɵɵtext(44, "Open to messages");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "label", 66);
    i0.ɵɵelement(46, "input", 72);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(47, "span");
    i0.ɵɵtext(48, "May sell later");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(49, Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Conditional_49_Template, 2, 1, "p", 73);
    i0.ɵɵelementStart(50, "div", 74)(51, "button", 75);
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "button", 76);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.cancelEdit()); });
    i0.ɵɵtext(54, " Cancel ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("formGroup", ctx_r1.recordForm);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(item_r8.cardName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r8.cardNumber || "Physical printing");
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("for", "condition-" + item_r8.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "condition-" + item_r8.id);
    i0.ɵɵattribute("aria-invalid", ctx_r1.recordForm.controls.condition.invalid && ctx_r1.recordForm.controls.condition.touched || !!ctx_r1.conditionServerError())("aria-describedby", ctx_r1.conditionServerError() ? "condition-server-error-" + item_r8.id : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.recordForm.controls.condition.touched && ctx_r1.recordForm.controls.condition.invalid ? 14 : ctx_r1.conditionServerError() ? 15 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("for", "notes-" + item_r8.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "notes-" + item_r8.id);
    i0.ɵɵattribute("aria-invalid", ctx_r1.recordForm.controls.notes.invalid && ctx_r1.recordForm.controls.notes.touched || !!ctx_r1.notesServerError())("aria-describedby", ctx_r1.notesServerError() ? "notes-server-error-" + item_r8.id : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.recordForm.controls.notes.touched && ctx_r1.recordForm.controls.notes.invalid ? 20 : ctx_r1.notesServerError() ? 21 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.saveError() ? 49 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.recordForm.invalid || ctx_r1.isSavingRecord() || ctx_r1.isRecordBusy(item_r8.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSavingRecord() ? "Saving\u2026" : "Save record", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isSavingRecord());
} }
function Collection_Conditional_14_Conditional_21_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 37)(1, "a", 38);
    i0.ɵɵelement(2, "img", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 40)(4, "a", 41);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 42);
    i0.ɵɵconditionalCreate(7, Collection_Conditional_14_Conditional_21_For_2_Conditional_7_Template, 2, 1, "strong")(8, Collection_Conditional_14_Conditional_21_For_2_Conditional_8_Template, 2, 0, "strong");
    i0.ɵɵconditionalCreate(9, Collection_Conditional_14_Conditional_21_For_2_Conditional_9_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(10, Collection_Conditional_14_Conditional_21_For_2_Conditional_10_Template, 2, 1, "span");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 43)(12, "div", 44)(13, "span", 45);
    i0.ɵɵtext(14, "Owned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 46)(16, "button", 47);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_For_2_Template_button_click_16_listener() { const item_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.decreaseQuantity(item_r8)); });
    i0.ɵɵtext(17, "\u2212");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 48);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 47);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_For_2_Template_button_click_20_listener() { const item_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.increaseQuantity(item_r8)); });
    i0.ɵɵtext(21, "+");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 49)(23, "button", 50);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_For_2_Template_button_click_23_listener() { const item_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.editingRecordId() === item_r8.id ? ctx_r1.cancelEdit() : ctx_r1.beginEdit(item_r8)); });
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(25, Collection_Conditional_14_Conditional_21_For_2_Conditional_25_Template, 2, 0, "span", 51);
    i0.ɵɵelementStart(26, "button", 52);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_For_2_Template_button_click_26_listener() { const item_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.removeFromCollection(item_r8)); });
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(28, Collection_Conditional_14_Conditional_21_For_2_Conditional_28_Template, 55, 17, "form", 53);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("collection-record--editing", ctx_r1.editingRecordId() === item_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(25, _c1, item_r8.cardId))("queryParams", i0.ɵɵpureFunction1(27, _c2, item_r8.cardPrintingId));
    i0.ɵɵattribute("aria-label", "Inspect " + item_r8.cardName + ", printing " + (item_r8.cardNumber || "selected printing"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("appCardArtwork", item_r8.imageUrl)("alt", item_r8.cardName + " card artwork");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(29, _c1, item_r8.cardId))("queryParams", i0.ɵɵpureFunction1(31, _c2, item_r8.cardPrintingId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r8.cardName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(item_r8.cardNumber) ? 7 : 8);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(item_r8.setName) ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(item_r8.rarity) ? 10 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", item_r8.quantityOwned <= 1 || ctx_r1.isRecordBusy(item_r8.id));
    i0.ɵɵattribute("aria-label", "Decrease owned quantity from " + item_r8.quantityOwned);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r8.quantityOwned);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", item_r8.quantityOwned >= 999 || ctx_r1.isRecordBusy(item_r8.id));
    i0.ɵɵattribute("aria-label", "Increase owned quantity from " + item_r8.quantityOwned);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.isRecordBusy(item_r8.id));
    i0.ɵɵattribute("aria-expanded", ctx_r1.editingRecordId() === item_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.editingRecordId() === item_r8.id ? "Close edit" : "Edit record", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasRecordDetails(item_r8) && ctx_r1.editingRecordId() !== item_r8.id ? 25 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isRecordBusy(item_r8.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isRecordBusy(item_r8.id) ? "Updating\u2026" : "Remove from Collection", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.editingRecordId() === item_r8.id ? 28 : -1);
} }
function Collection_Conditional_14_Conditional_21_Conditional_3_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 84);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_Conditional_3_For_8_Template_button_click_0_listener() { const page_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.goToPage(page_r12)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("collection-pagination__page--current", page_r12 === ctx_r1.activePage());
    i0.ɵɵattribute("aria-current", page_r12 === ctx_r1.activePage() ? "page" : null)("aria-label", "Collection page " + page_r12);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", page_r12, " ");
} }
function Collection_Conditional_14_Conditional_21_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 36)(1, "p", 77);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 78)(4, "button", 79);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_Conditional_3_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previousPage()); });
    i0.ɵɵtext(5, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 80);
    i0.ɵɵrepeaterCreate(7, Collection_Conditional_14_Conditional_21_Conditional_3_For_8_Template, 2, 5, "button", 81, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 82);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 83);
    i0.ɵɵlistener("click", function Collection_Conditional_14_Conditional_21_Conditional_3_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.nextPage()); });
    i0.ɵɵtext(12, " Next ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r1.activePage(), " of ", ctx_r1.totalPages(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.activePage() === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.visiblePageNumbers());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r1.activePage(), " of ", ctx_r1.totalPages(), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.activePage() === ctx_r1.totalPages());
} }
function Collection_Conditional_14_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵrepeaterCreate(1, Collection_Conditional_14_Conditional_21_For_2_Template, 29, 33, "article", 35, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, Collection_Conditional_14_Conditional_21_Conditional_3_Template, 13, 6, "nav", 36);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", "Showing Collection printings " + ctx_r1.firstVisibleRecord() + " to " + ctx_r1.lastVisibleRecord() + " of " + ctx_r1.filteredItems().length);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.pagedItems());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.totalPages() > 1 ? 3 : -1);
} }
function Collection_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "div", 21)(2, "div", 22)(3, "label", 23);
    i0.ɵɵtext(4, "Search collection");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 24);
    i0.ɵɵlistener("input", function Collection_Conditional_14_Template_input_input_5_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateSearch($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 25)(7, "label", 26);
    i0.ɵɵtext(8, "Set");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 27);
    i0.ɵɵlistener("change", function Collection_Conditional_14_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateSetFilter($event)); });
    i0.ɵɵelementStart(10, "option", 28);
    i0.ɵɵtext(11, "All sets");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(12, Collection_Conditional_14_For_13_Template, 2, 2, "option", 29, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 30)(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(19, Collection_Conditional_14_Conditional_19_Template, 2, 0, "button", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(20, Collection_Conditional_14_Conditional_20_Template, 5, 0, "div", 32)(21, Collection_Conditional_14_Conditional_21_Template, 4, 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r1.searchQuery());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.setFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.setOptions());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.filteredItems().length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.filteredItems().length === 1 ? "printing" : "printings");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasFilters() ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.filteredItems().length === 0 ? 20 : 21);
} }
/**
 * Private Collection / Working Archive.
 *
 * One row represents one exact CardPrinting owned by the authenticated
 * collector. Quantity and collector metadata belong to that OwnedCard record;
 * the shared Card/CardPrinting catalogue is never mutated here.
 */
export class Collection {
    formBuilder;
    ownedCardsService;
    feedback;
    route;
    router;
    viewportScroller;
    isLoading = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    loadError = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loadError" }] : /* istanbul ignore next */ []));
    searchQuery = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "searchQuery" }] : /* istanbul ignore next */ []));
    setFilter = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "setFilter" }] : /* istanbul ignore next */ []));
    currentPage = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentPage" }] : /* istanbul ignore next */ []));
    pageSize = 10;
    editingRecordId = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "editingRecordId" }] : /* istanbul ignore next */ []));
    isSavingRecord = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isSavingRecord" }] : /* istanbul ignore next */ []));
    busyRecordIds = signal(new Set(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busyRecordIds" }] : /* istanbul ignore next */ []));
    saveError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "saveError" }] : /* istanbul ignore next */ []));
    conditionServerError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "conditionServerError" }] : /* istanbul ignore next */ []));
    notesServerError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "notesServerError" }] : /* istanbul ignore next */ []));
    recordForm;
    setOptions = computed(() => {
        const options = this.ownedCardsService
            .items()
            .map(item => item.setName?.trim() ?? '')
            .filter(value => this.hasMeaningfulValue(value));
        return [...new Set(options)].sort((a, b) => a.localeCompare(b));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "setOptions" }] : /* istanbul ignore next */ []));
    filteredItems = computed(() => {
        const query = this.searchQuery().trim().toLowerCase();
        const set = this.setFilter();
        return this.ownedCardsService.items().filter(item => {
            const matchesSearch = !query || [
                item.cardName,
                item.cardNumber,
                item.setName,
                item.rarity
            ]
                .filter((value) => Boolean(value))
                .some(value => value.toLowerCase().includes(query));
            const matchesSet = !set || (item.setName?.trim() ?? '') === set;
            return matchesSearch && matchesSet;
        });
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filteredItems" }] : /* istanbul ignore next */ []));
    totalPages = computed(() => Math.ceil(this.filteredItems().length / this.pageSize), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "totalPages" }] : /* istanbul ignore next */ []));
    activePage = computed(() => {
        const totalPages = this.totalPages();
        if (totalPages <= 0) {
            return 1;
        }
        return Math.min(Math.max(this.currentPage(), 1), totalPages);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activePage" }] : /* istanbul ignore next */ []));
    pagedItems = computed(() => {
        const startIndex = (this.activePage() - 1) * this.pageSize;
        return this.filteredItems().slice(startIndex, startIndex + this.pageSize);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pagedItems" }] : /* istanbul ignore next */ []));
    visiblePageNumbers = computed(() => {
        const totalPages = this.totalPages();
        const currentPage = this.activePage();
        const maximumVisiblePages = 5;
        if (totalPages <= maximumVisiblePages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }
        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maximumVisiblePages - 1);
        if (endPage - startPage + 1 < maximumVisiblePages) {
            startPage = Math.max(1, endPage - maximumVisiblePages + 1);
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "visiblePageNumbers" }] : /* istanbul ignore next */ []));
    firstVisibleRecord = computed(() => this.filteredItems().length === 0
        ? 0
        : (this.activePage() - 1) * this.pageSize + 1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "firstVisibleRecord" }] : /* istanbul ignore next */ []));
    lastVisibleRecord = computed(() => Math.min(this.activePage() * this.pageSize, this.filteredItems().length), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "lastVisibleRecord" }] : /* istanbul ignore next */ []));
    hasFilters = computed(() => Boolean(this.searchQuery().trim() || this.setFilter()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasFilters" }] : /* istanbul ignore next */ []));
    constructor(formBuilder, ownedCardsService, feedback, route, router, viewportScroller) {
        this.formBuilder = formBuilder;
        this.ownedCardsService = ownedCardsService;
        this.feedback = feedback;
        this.route = route;
        this.router = router;
        this.viewportScroller = viewportScroller;
        this.recordForm = this.formBuilder.nonNullable.group({
            condition: [
                '',
                [Validators.maxLength(50)]
            ],
            isInMasterCollection: [false],
            isDuplicate: [false],
            isGradingCandidate: [false],
            isOpenForTrade: [false],
            isOpenToMessages: [false],
            maySellLater: [false],
            notes: [
                '',
                [Validators.maxLength(2000)]
            ]
        });
    }
    ngOnInit() {
        const queryParams = this.route.snapshot.queryParamMap;
        const requestedPage = Number(queryParams.get('page'));
        this.searchQuery.set(queryParams.get('q') ?? '');
        this.setFilter.set(queryParams.get('set') ?? '');
        this.currentPage.set(Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1);
        this.loadCollection();
    }
    retry() {
        this.loadCollection(true);
    }
    updateSearch(event) {
        this.searchQuery.set(event.target.value);
        this.resetToFirstPage();
        this.syncUrlState();
    }
    updateSetFilter(event) {
        this.setFilter.set(event.target.value);
        this.resetToFirstPage();
        this.syncUrlState();
    }
    clearFilters() {
        this.searchQuery.set('');
        this.setFilter.set('');
        this.resetToFirstPage();
        this.syncUrlState();
    }
    previousPage() {
        this.goToPage(this.activePage() - 1);
    }
    nextPage() {
        this.goToPage(this.activePage() + 1);
    }
    goToPage(page) {
        if (!Number.isInteger(page) ||
            page < 1 ||
            page > this.totalPages() ||
            page === this.activePage()) {
            return;
        }
        this.currentPage.set(page);
        this.cancelEdit();
        this.syncUrlState();
        queueMicrotask(() => {
            this.viewportScroller.scrollToAnchor('collection-records');
        });
    }
    increaseQuantity(item) {
        if (item.quantityOwned >= 999 || this.isRecordBusy(item.id)) {
            return;
        }
        this.updateQuantity(item, item.quantityOwned + 1);
    }
    decreaseQuantity(item) {
        // Quantity one is never converted into deletion implicitly. The explicit
        // removal action keeps destructive intent clear.
        if (item.quantityOwned <= 1 || this.isRecordBusy(item.id)) {
            return;
        }
        this.updateQuantity(item, item.quantityOwned - 1);
    }
    removeFromCollection(item) {
        if (this.isRecordBusy(item.id)) {
            return;
        }
        this.setRecordBusy(item.id, true);
        this.ownedCardsService
            .remove(item)
            .pipe(finalize(() => this.setRecordBusy(item.id, false)))
            .subscribe({
            next: () => {
                if (this.editingRecordId() === item.id) {
                    this.cancelEdit();
                }
                this.ensureCurrentPageInRange();
                this.feedback.showStatus('Removed from Collection.');
            },
            error: error => this.handleMutationError(error)
        });
    }
    beginEdit(item) {
        if (this.isSavingRecord() || this.isRecordBusy(item.id)) {
            return;
        }
        this.clearSaveErrors();
        this.editingRecordId.set(item.id);
        this.recordForm.reset({
            condition: item.condition ?? '',
            isInMasterCollection: item.isInMasterCollection,
            isDuplicate: item.isDuplicate,
            isGradingCandidate: item.isGradingCandidate,
            isOpenForTrade: item.isOpenForTrade,
            isOpenToMessages: item.isOpenToMessages,
            maySellLater: item.maySellLater,
            notes: item.notes ?? ''
        });
    }
    cancelEdit() {
        this.editingRecordId.set(null);
        this.clearSaveErrors();
        this.recordForm.reset();
    }
    saveEdit(item) {
        if (this.editingRecordId() !== item.id ||
            this.recordForm.invalid ||
            this.isSavingRecord() ||
            this.isRecordBusy(item.id)) {
            this.recordForm.markAllAsTouched();
            return;
        }
        this.clearSaveErrors();
        const values = this.recordForm.getRawValue();
        this.isSavingRecord.set(true);
        this.setRecordBusy(item.id, true);
        /*
         * The backend UpdateOwnedCardRequest requires QuantityOwned to remain
         * between 1 and 999. Editing metadata must preserve the current quantity;
         * sending 0 causes ASP.NET Core model validation to return 400.
         */
        this.ownedCardsService
            .updateRecord(item, {
            quantityOwned: item.quantityOwned,
            condition: this.normaliseOptionalText(values.condition),
            isInMasterCollection: values.isInMasterCollection,
            isDuplicate: values.isDuplicate,
            isGradingCandidate: values.isGradingCandidate,
            isOpenForTrade: values.isOpenForTrade,
            isOpenToMessages: values.isOpenToMessages,
            maySellLater: values.maySellLater,
            notes: this.normaliseOptionalText(values.notes)
        })
            .pipe(finalize(() => {
            this.isSavingRecord.set(false);
            this.setRecordBusy(item.id, false);
        }))
            .subscribe({
            next: () => {
                this.editingRecordId.set(null);
                this.feedback.showStatus('RECORD SAVED');
            },
            error: error => this.handleSaveError(error)
        });
    }
    isRecordBusy(id) {
        return this.busyRecordIds().has(id);
    }
    hasRecordDetails(item) {
        return Boolean(this.hasMeaningfulValue(item.condition) ||
            this.hasMeaningfulValue(item.notes) ||
            item.isInMasterCollection ||
            item.isDuplicate ||
            item.isGradingCandidate ||
            item.isOpenForTrade ||
            item.isOpenToMessages ||
            item.maySellLater);
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
    loadCollection(forceRefresh = false) {
        this.isLoading.set(true);
        this.loadError.set(false);
        this.ownedCardsService.load(forceRefresh).subscribe({
            next: () => {
                this.isLoading.set(false);
                this.ensureCurrentPageInRange();
            },
            error: error => {
                this.isLoading.set(false);
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.sendToLoginAfterSessionEnded();
                    return;
                }
                this.loadError.set(true);
            }
        });
    }
    updateQuantity(item, quantityOwned) {
        this.setRecordBusy(item.id, true);
        this.ownedCardsService
            .updateQuantity(item, quantityOwned)
            .pipe(finalize(() => this.setRecordBusy(item.id, false)))
            .subscribe({
            next: () => this.feedback.showStatus('Collection updated.'),
            error: error => this.handleMutationError(error)
        });
    }
    setRecordBusy(id, isBusy) {
        this.busyRecordIds.update(current => {
            const next = new Set(current);
            if (isBusy) {
                next.add(id);
            }
            else {
                next.delete(id);
            }
            return next;
        });
    }
    handleSaveError(error) {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                this.sendToLoginAfterSessionEnded();
                return;
            }
            if (error.status === 403) {
                this.saveError.set('This record cannot be changed with the current account.');
                return;
            }
            if (error.status === 404) {
                this.saveError.set('This Collection record is no longer available.');
                return;
            }
            if (error.status === 429) {
                this.saveError.set('Too many requests. Try saving again shortly.');
                return;
            }
            if (error.status === 400) {
                this.applySafeValidationErrors(error.error);
                this.saveError.set('We couldn\'t save this record. Check the details and try again.');
                return;
            }
        }
        this.saveError.set('We couldn\'t save this record. Check the details and try again.');
    }
    applySafeValidationErrors(errorBody) {
        const details = errorBody;
        const errors = details?.errors;
        if (!errors || typeof errors !== 'object') {
            return;
        }
        for (const key of Object.keys(errors)) {
            const normalisedKey = key.toLowerCase();
            if (normalisedKey === 'condition') {
                this.conditionServerError.set('Condition must be 50 characters or fewer.');
            }
            if (normalisedKey === 'notes') {
                this.notesServerError.set('Notes must be 2,000 characters or fewer.');
            }
        }
    }
    handleMutationError(error) {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                this.sendToLoginAfterSessionEnded();
                return;
            }
            if (error.status === 403) {
                this.feedback.showError('This action is not available for your account.');
                return;
            }
            if (error.status === 404) {
                this.feedback.showError('That collection record is no longer available. Refreshing your Collection.');
                this.loadCollection(true);
                return;
            }
            if (error.status === 429) {
                this.feedback.showError('Too many requests. Try again shortly.');
                return;
            }
            if (error.status === 400) {
                this.feedback.showError('We could not save that Collection change. Check the record and try again.');
                return;
            }
        }
        this.feedback.showError('We could not update your Collection. Try again.');
    }
    sendToLoginAfterSessionEnded() {
        this.feedback.showError('Your session ended. Sign in to continue.');
        void this.router.navigate(['/login'], {
            queryParams: {
                returnUrl: '/collection'
            }
        });
    }
    resetToFirstPage() {
        this.currentPage.set(1);
        this.cancelEdit();
    }
    ensureCurrentPageInRange() {
        const totalPages = this.totalPages();
        const maximumPage = Math.max(totalPages, 1);
        if (this.currentPage() > maximumPage) {
            this.currentPage.set(maximumPage);
            this.syncUrlState();
        }
    }
    syncUrlState() {
        void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                q: this.searchQuery().trim() || null,
                set: this.setFilter() || null,
                page: this.currentPage() > 1
                    ? this.currentPage()
                    : null
            },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }
    clearSaveErrors() {
        this.saveError.set(null);
        this.conditionServerError.set(null);
        this.notesServerError.set(null);
    }
    normaliseOptionalText(value) {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
    }
    static ɵfac = function Collection_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Collection)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.OwnedCardsService), i0.ɵɵdirectiveInject(i3.FeedbackService), i0.ɵɵdirectiveInject(i4.ActivatedRoute), i0.ɵɵdirectiveInject(i4.Router), i0.ɵɵdirectiveInject(i5.ViewportScroller)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Collection, selectors: [["app-collection"]], decls: 15, vars: 1, consts: [[1, "collection-page"], [1, "collection-shell"], ["aria-labelledby", "collection-title", 1, "collection-intro"], ["aria-hidden", "true", 1, "collection-intro__mark"], [1, "collection-intro__copy"], [1, "collection-intro__label"], ["id", "collection-title"], ["aria-label", "Loading Collection", "aria-busy", "true", 1, "collection-loading"], ["aria-labelledby", "collection-error-title", 1, "collection-state"], ["aria-labelledby", "collection-empty-title", 1, "collection-state", "collection-state--empty"], ["aria-label", "Owned card printings", 1, "collection-workspace"], [1, "collection-loading__heading"], ["aria-hidden", "true", 1, "collection-record", "collection-record--loading"], [1, "collection-record__art-skeleton"], [1, "collection-record__identity-skeleton"], [1, "collection-record__quantity-skeleton"], [1, "collection-state__label"], ["id", "collection-error-title"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["id", "collection-empty-title"], ["routerLink", "/cards", 1, "btn", "btn--primary"], [1, "collection-tools"], [1, "collection-search"], ["for", "collection-search"], ["id", "collection-search", "type", "search", "placeholder", "Card name, printing or set", "autocomplete", "off", 1, "collection-control", 3, "input", "value"], [1, "collection-set-filter"], ["for", "collection-set"], ["id", "collection-set", 1, "collection-control", 3, "change", "value"], ["value", ""], [3, "value"], ["aria-live", "polite", 1, "collection-tools__summary"], ["type", "button", 1, "collection-clear"], [1, "collection-no-results"], ["type", "button", 1, "collection-clear", 3, "click"], ["id", "collection-records", 1, "collection-records"], [1, "collection-record", 3, "collection-record--editing"], ["aria-label", "Collection pages", 1, "collection-pagination"], [1, "collection-record"], [1, "collection-record__artwork", 3, "routerLink", "queryParams"], ["loading", "lazy", "decoding", "async", 3, "appCardArtwork", "alt"], [1, "collection-record__identity"], [1, "collection-record__name", 3, "routerLink", "queryParams"], ["aria-label", "Printing information", 1, "collection-record__printing"], [1, "collection-record__ownership"], [1, "collection-record__quantity-unit"], [1, "collection-record__ownership-label"], ["aria-label", "Owned quantity", 1, "quantity-control"], ["type", "button", 3, "click", "disabled"], ["aria-live", "polite"], [1, "collection-record__actions"], ["type", "button", 1, "collection-record__edit", 3, "click", "disabled"], [1, "collection-record__details-state"], ["type", "button", 1, "collection-record__remove", 3, "click", "disabled"], ["novalidate", "", 1, "record-editor", 3, "formGroup"], ["novalidate", "", 1, "record-editor", 3, "ngSubmit", "formGroup"], [1, "record-editor__heading"], [1, "record-editor__identity"], [1, "record-editor__fields"], [1, "form-field"], [1, "form-label"], ["type", "text", "formControlName", "condition", "maxlength", "50", "autocomplete", "off", 1, "form-control", "record-editor__control", 3, "id"], [1, "form-error"], [1, "form-error", 3, "id"], [1, "form-field", "record-editor__notes-field"], ["formControlName", "notes", "maxlength", "2000", "rows", "3", 1, "form-control", "record-editor__notes", 3, "id"], [1, "record-editor__states"], [1, "record-check"], ["type", "checkbox", "formControlName", "isInMasterCollection"], ["type", "checkbox", "formControlName", "isDuplicate"], ["type", "checkbox", "formControlName", "isGradingCandidate"], ["type", "checkbox", "formControlName", "isOpenForTrade"], ["type", "checkbox", "formControlName", "isOpenToMessages"], ["type", "checkbox", "formControlName", "maySellLater"], ["role", "alert", 1, "record-editor__save-error"], [1, "record-editor__actions"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], ["type", "button", 1, "btn", "btn--text", 3, "click", "disabled"], [1, "collection-pagination__status"], [1, "collection-pagination__controls"], ["type", "button", "aria-label", "Previous Collection page", 1, "collection-pagination__direction", 3, "click", "disabled"], ["aria-label", "Collection page numbers", 1, "collection-pagination__pages"], ["type", "button", 1, "collection-pagination__page", 3, "collection-pagination__page--current"], [1, "collection-pagination__mobile-status"], ["type", "button", "aria-label", "Next Collection page", 1, "collection-pagination__direction", 3, "click", "disabled"], ["type", "button", 1, "collection-pagination__page", 3, "click"]], template: function Collection_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1)(2, "header", 2);
            i0.ɵɵelement(3, "div", 3);
            i0.ɵɵelementStart(4, "div", 4)(5, "p", 5);
            i0.ɵɵtext(6, "Collection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h1", 6);
            i0.ɵɵtext(8, "Your cards. Your printings.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10, " Manage the exact physical printings archived to your private collection. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(11, Collection_Conditional_11_Template, 6, 1, "section", 7)(12, Collection_Conditional_12_Template, 9, 0, "section", 8)(13, Collection_Conditional_13_Template, 9, 0, "section", 9)(14, Collection_Conditional_14_Template, 22, 6, "section", 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(ctx.isLoading() ? 11 : ctx.loadError() ? 12 : ctx.ownedCardsService.items().length === 0 ? 13 : 14);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            CardArtworkDirective], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.collection-page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-block: clamp(40px, 4.6vw, 66px) clamp(78px, 8vw, 118px);\n  background: var(--colour-background);\n}\n\n.collection-shell[_ngcontent-%COMP%] {\n  width: min(100% - (var(--page-padding) * 2), 1420px);\n  margin-inline: auto;\n}\n\n.collection-intro[_ngcontent-%COMP%] {\n  display: grid;\n  max-width: 820px;\n  grid-template-columns: 3px minmax(0, 1fr);\n  align-items: start;\n  gap: 19px;\n}\n\n.collection-intro__mark[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 42px;\n  margin-top: 4px;\n  background: var(--colour-yellow);\n}\n\n.collection-intro__label[_ngcontent-%COMP%] {\n  margin: 0 0 9px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.collection-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 820px;\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(3.05rem, 5.1vw, 5rem);\n  font-weight: 900;\n  line-height: 0.91;\n  letter-spacing: -0.025em;\n  text-transform: uppercase;\n}\n\n.collection-intro__copy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child {\n  max-width: 610px;\n  margin: 14px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.94rem;\n  line-height: 1.62;\n}\n\n.collection-workspace[_ngcontent-%COMP%], \n.collection-loading[_ngcontent-%COMP%] {\n  margin-top: clamp(34px, 3.8vw, 48px);\n  border-top: 1px solid var(--colour-border-strong);\n}\n\n.collection-tools[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(300px, 1fr) minmax(210px, 0.44fr) auto auto;\n  gap: 18px;\n  align-items: end;\n  padding: 19px 0;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-search[_ngcontent-%COMP%], \n.collection-set-filter[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.collection-search[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.collection-set-filter[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.collection-control[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 48px;\n  padding: 0 14px;\n  color: var(--colour-text);\n  background: #090d13;\n  border: 1px solid var(--colour-border-strong);\n  border-radius: 0;\n  outline: 0;\n  transition:\n    border-color 160ms ease,\n    background-color 160ms ease;\n}\n\n.collection-control[_ngcontent-%COMP%]:hover {\n  border-color: rgba(255, 255, 255, 0.3);\n}\n\n.collection-control[_ngcontent-%COMP%]:focus-visible {\n  border-color: var(--colour-cyan);\n  outline: 3px solid var(--colour-cyan);\n  outline-offset: 3px;\n}\n\n.collection-control[_ngcontent-%COMP%]::placeholder {\n  color: #626c79;\n}\n\n.collection-tools__summary[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 48px;\n  align-items: baseline;\n  justify-content: flex-end;\n  gap: 7px;\n  padding-bottom: 12px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collection-tools__summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  font-size: 1.08rem;\n  font-weight: 800;\n}\n\n.collection-tools__summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.09em;\n}\n\n.collection-clear[_ngcontent-%COMP%] {\n  min-height: 48px;\n  padding: 0 0 11px;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.collection-clear[_ngcontent-%COMP%]:hover {\n  color: var(--colour-text);\n}\n\n.collection-records[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-record[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 156px minmax(0, 1fr) minmax(300px, 350px);\n  align-items: center;\n  gap: clamp(26px, 3.2vw, 46px);\n  padding: 24px 0;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-record[_ngcontent-%COMP%]:last-child {\n  border-bottom: 0;\n}\n\n.collection-record__artwork[_ngcontent-%COMP%] {\n  display: block;\n  width: 144px;\n  aspect-ratio: 0.71;\n  padding: 5px;\n  background: #090d13;\n  box-shadow:\n    0 18px 38px rgba(0, 0, 0, 0.3),\n    inset 0 0 0 1px rgba(255, 255, 255, 0.065);\n  transition:\n    transform 160ms ease,\n    box-shadow 160ms ease;\n}\n\n.collection-record__artwork[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n@media (hover: hover) and (pointer: fine) {\n  .collection-record__artwork[_ngcontent-%COMP%]:hover {\n    transform: translateY(-2px);\n    box-shadow:\n      0 22px 46px rgba(0, 0, 0, 0.34),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.085);\n  }\n}\n\n.collection-record__identity[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.collection-record__name[_ngcontent-%COMP%] {\n  display: inline-block;\n  max-width: 100%;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: clamp(1.8rem, 2.3vw, 2.55rem);\n  font-weight: 900;\n  line-height: 0.98;\n  letter-spacing: -0.018em;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.collection-record__name[_ngcontent-%COMP%]:hover {\n  color: var(--colour-yellow-light);\n}\n\n.collection-record__printing[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  margin-top: 12px;\n  color: var(--colour-text-muted);\n  font-size: 0.76rem;\n}\n\n.collection-record__printing[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%]::before {\n  margin-inline: 10px;\n  color: #59616d;\n  content: \"\u00B7\";\n}\n\n.collection-record__printing[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 0.94rem;\n  font-weight: 800;\n  letter-spacing: 0.055em;\n  text-transform: uppercase;\n}\n\n.collection-record__ownership[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  justify-items: end;\n  gap: 13px;\n}\n\n.collection-record__quantity-unit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 14px;\n}\n\n.collection-record__ownership-label[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n\n.quantity-control[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 120px;\n  grid-template-columns: 38px 44px 38px;\n  align-items: stretch;\n  border: 1px solid var(--colour-border-strong);\n  background: #090d13;\n}\n\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.quantity-control[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 42px;\n  place-items: center;\n}\n\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  transition:\n    color 160ms ease,\n    background-color 160ms ease;\n}\n\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--colour-text);\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n\n.quantity-control[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  border-inline: 1px solid var(--colour-border);\n  font-family: var(--font-display);\n  font-size: 0.96rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n\n.collection-record__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px 16px;\n}\n\n.collection-record__edit[_ngcontent-%COMP%], \n.collection-record__remove[_ngcontent-%COMP%] {\n  min-height: 36px;\n  padding: 0;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.collection-record__edit[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n}\n\n.collection-record__details-state[_ngcontent-%COMP%] {\n  color: rgba(244, 245, 247, 0.86);\n  cursor: default;\n  font-family: var(--font-display);\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-decoration: none;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collection-record__remove[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  border-bottom: 1px solid var(--colour-border-strong);\n}\n\n.collection-record__edit[_ngcontent-%COMP%]:hover, \n.collection-record__remove[_ngcontent-%COMP%]:hover {\n  color: var(--colour-yellow-light);\n}\n\n.collection-record__edit[_ngcontent-%COMP%]:disabled, \n.collection-record__remove[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.record-editor[_ngcontent-%COMP%] {\n  grid-column: 2 / -1;\n  display: grid;\n  gap: 22px;\n  margin-top: 0;\n  padding: 22px 0 4px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.record-editor__heading[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n}\n\n.record-editor__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.record-editor__heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.record-editor__heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.record-editor__identity[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.record-editor__identity[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  gap: 9px 14px;\n}\n\n.record-editor__heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.32rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n\n.record-editor__fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(190px, 0.28fr) minmax(0, 0.72fr);\n  align-items: start;\n  gap: 24px;\n}\n\n.record-editor__fields[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  align-content: start;\n}\n\n.record-editor__control[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n\n.record-editor__notes[_ngcontent-%COMP%] {\n  min-height: 96px;\n  padding-block: 12px;\n  resize: vertical;\n  line-height: 1.55;\n}\n\n.record-editor__states[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  column-gap: 26px;\n  row-gap: 0;\n  padding: 8px 0;\n  margin: 0;\n  border: 0;\n  border-block: 1px solid var(--colour-border);\n}\n\n.record-editor__states[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n}\n\n.record-check[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 44px;\n  align-items: center;\n  gap: 11px;\n  padding: 8px 0;\n  color: var(--colour-text-muted);\n  cursor: pointer;\n  font-size: 0.75rem;\n  transition: color 160ms ease;\n}\n\n.record-check[_ngcontent-%COMP%]:hover, \n.record-check[_ngcontent-%COMP%]:has(input:checked) {\n  color: var(--colour-text);\n}\n\n.record-check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  margin: 0;\n  accent-color: var(--colour-yellow);\n}\n\n.record-editor__save-error[_ngcontent-%COMP%] {\n  max-width: 660px;\n  margin: -4px 0 0;\n  color: #d6a2aa;\n  font-size: 0.78rem;\n  line-height: 1.55;\n}\n\n.record-editor__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.collection-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  max-width: 1280px;\n  align-items: center;\n  justify-content: flex-start;\n  gap: clamp(24px, 3vw, 42px);\n  padding: 22px 0 2px;\n  border-top: 1px solid var(--colour-border-strong);\n}\n\n.collection-pagination__status[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n}\n\n.collection-pagination__controls[_ngcontent-%COMP%], \n.collection-pagination__pages[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.collection-pagination__mobile-status[_ngcontent-%COMP%] {\n  display: none;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collection-pagination__controls[_ngcontent-%COMP%] {\n  gap: 10px;\n}\n\n.collection-pagination__pages[_ngcontent-%COMP%] {\n  gap: 6px;\n}\n\n.collection-pagination__page[_ngcontent-%COMP%], \n.collection-pagination__direction[_ngcontent-%COMP%] {\n  min-height: 42px;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 1px solid var(--colour-border-strong);\n  border-radius: 0;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  transition:\n    color 160ms ease,\n    border-color 160ms ease,\n    background-color 160ms ease;\n}\n\n.collection-pagination__page[_ngcontent-%COMP%] {\n  min-width: 40px;\n  padding-inline: 10px;\n}\n\n.collection-pagination__direction[_ngcontent-%COMP%] {\n  padding-inline: 15px;\n}\n\n.collection-pagination__page[_ngcontent-%COMP%]:hover:not(:disabled), \n.collection-pagination__direction[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--colour-text);\n  border-color: rgba(255, 255, 255, 0.32);\n  background: rgba(255, 255, 255, 0.035);\n}\n\n.collection-pagination__page--current[_ngcontent-%COMP%] {\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border-color: var(--colour-yellow);\n}\n\n.collection-pagination__direction[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n\n.collection-state[_ngcontent-%COMP%], \n.collection-no-results[_ngcontent-%COMP%] {\n  max-width: 720px;\n  padding-block: clamp(68px, 7vw, 104px);\n}\n\n.collection-state[_ngcontent-%COMP%] {\n  margin-top: clamp(34px, 3.8vw, 48px);\n  border-top: 1px solid var(--colour-border-strong);\n}\n\n.collection-state__label[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n\n.collection-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.collection-no-results[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2.4rem, 3.8vw, 3.8rem);\n  font-weight: 900;\n  line-height: 0.94;\n  text-transform: uppercase;\n}\n\n.collection-state[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.collection-state__label) {\n  max-width: 560px;\n  margin: 16px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.collection-state[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], \n.collection-no-results[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-top: 26px;\n}\n\n.collection-loading__heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 19px 0;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-loading__heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  height: 13px;\n  background: rgba(255, 255, 255, 0.06);\n}\n\n.collection-loading__heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  width: min(360px, 45%);\n}\n\n.collection-loading__heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  width: 90px;\n}\n\n.collection-record--loading[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n\n.collection-record__art-skeleton[_ngcontent-%COMP%] {\n  display: block;\n  width: 144px;\n  aspect-ratio: 0.71;\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.collection-record__identity-skeleton[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.collection-record__identity-skeleton[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.collection-record__quantity-skeleton[_ngcontent-%COMP%] {\n  display: block;\n  height: 12px;\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.collection-record__identity-skeleton[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  width: min(380px, 76%);\n  height: 26px;\n}\n\n.collection-record__identity-skeleton[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  width: min(300px, 58%);\n}\n\n.collection-record__quantity-skeleton[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 42px;\n  justify-self: end;\n}\n\n@media (max-width: 1040px) {\n  .collection-tools[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) minmax(190px, 0.5fr) auto;\n  }\n\n  .collection-clear[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    width: fit-content;\n    min-height: 30px;\n    padding: 0;\n  }\n\n  .collection-record[_ngcontent-%COMP%] {\n    grid-template-columns: 130px minmax(0, 1fr);\n    max-width: 100%;\n  }\n\n  .collection-record__artwork[_ngcontent-%COMP%], \n   .collection-record__art-skeleton[_ngcontent-%COMP%] {\n    width: 122px;\n  }\n\n  .collection-record__ownership[_ngcontent-%COMP%] {\n    grid-column: 2;\n    width: 100%;\n    justify-items: start;\n    padding-top: 15px;\n    border-top: 1px solid var(--colour-border);\n  }\n\n  .collection-record__quantity-unit[_ngcontent-%COMP%], \n   .collection-record__actions[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n\n  .record-editor[_ngcontent-%COMP%] {\n    grid-column: 2;\n  }\n}\n\n@media (max-width: 720px) {\n  .collection-page[_ngcontent-%COMP%] {\n    padding-block: 38px 78px;\n  }\n\n  .collection-intro[_ngcontent-%COMP%] {\n    grid-template-columns: 3px minmax(0, 1fr);\n    gap: 15px;\n  }\n\n  .collection-intro__mark[_ngcontent-%COMP%] {\n    height: 38px;\n  }\n\n  .collection-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(2.9rem, 12.5vw, 4.4rem);\n  }\n\n  .collection-workspace[_ngcontent-%COMP%], \n   .collection-loading[_ngcontent-%COMP%] {\n    margin-top: 30px;\n  }\n\n  .collection-tools[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 14px;\n    padding: 18px 0;\n  }\n\n  .collection-tools__summary[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    min-height: auto;\n    padding: 2px 0 0;\n  }\n\n  .collection-clear[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n\n  .collection-record[_ngcontent-%COMP%] {\n    grid-template-columns: 108px minmax(0, 1fr);\n    align-items: start;\n    gap: 18px;\n    padding: 22px 0 26px;\n  }\n\n  .collection-record__artwork[_ngcontent-%COMP%], \n   .collection-record__art-skeleton[_ngcontent-%COMP%] {\n    width: 102px;\n  }\n\n  .collection-record__name[_ngcontent-%COMP%] {\n    font-size: clamp(1.65rem, 8vw, 2.15rem);\n  }\n\n  .collection-record__printing[_ngcontent-%COMP%] {\n    display: grid;\n    gap: 5px;\n    margin-top: 10px;\n  }\n\n  .collection-record__printing[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n\n  .collection-record__ownership[_ngcontent-%COMP%], \n   .record-editor[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n  }\n\n  .collection-record__ownership[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-items: stretch;\n    margin-top: 2px;\n  }\n\n  .collection-record__quantity-unit[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n\n  .collection-record__actions[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n\n  .record-editor__heading[_ngcontent-%COMP%] {\n    gap: 7px;\n  }\n\n  .record-editor__fields[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .record-editor__states[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    column-gap: 20px;\n  }\n\n  .collection-pagination[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  .collection-pagination__controls[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n}\n\n@media (max-width: 420px) {\n  .collection-record[_ngcontent-%COMP%] {\n    grid-template-columns: 96px minmax(0, 1fr);\n    gap: 14px;\n  }\n\n  .collection-record__artwork[_ngcontent-%COMP%], \n   .collection-record__art-skeleton[_ngcontent-%COMP%] {\n    width: 92px;\n  }\n\n  .collection-record__quantity-unit[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 8px;\n  }\n\n  .quantity-control[_ngcontent-%COMP%] {\n    width: 100%;\n    grid-template-columns: 44px minmax(48px, 1fr) 44px;\n  }\n\n  .collection-record__actions[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr;\n    justify-items: start;\n  }\n\n  .record-editor__states[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .record-editor__actions[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .record-editor__actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .collection-pagination__status[_ngcontent-%COMP%], \n   .collection-pagination__pages[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .collection-pagination[_ngcontent-%COMP%] {\n    display: block;\n  }\n\n  .collection-pagination__controls[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);\n    gap: 8px;\n  }\n\n  .collection-pagination__mobile-status[_ngcontent-%COMP%] {\n    display: block;\n    align-self: center;\n    text-align: center;\n  }\n\n  .collection-pagination__direction[_ngcontent-%COMP%] {\n    width: 100%;\n    padding-inline: 10px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .collection-record__artwork[_ngcontent-%COMP%], \n   .collection-control[_ngcontent-%COMP%], \n   .quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n   .collection-record__edit[_ngcontent-%COMP%], \n   .collection-record__remove[_ngcontent-%COMP%], \n   .record-check[_ngcontent-%COMP%], \n   .collection-pagination__page[_ngcontent-%COMP%], \n   .collection-pagination__direction[_ngcontent-%COMP%] {\n    transition: none;\n  }\n\n  .collection-record__artwork[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Collection, [{
        type: Component,
        args: [{ selector: 'app-collection', standalone: true, imports: [
                    ReactiveFormsModule,
                    RouterLink,
                    CardArtworkDirective
                ], template: "<main class=\"collection-page\">\n  <div class=\"collection-shell\">\n    <header class=\"collection-intro\" aria-labelledby=\"collection-title\">\n      <div class=\"collection-intro__mark\" aria-hidden=\"true\"></div>\n      <div class=\"collection-intro__copy\">\n        <p class=\"collection-intro__label\">Collection</p>\n        <h1 id=\"collection-title\">Your cards. Your printings.</h1>\n        <p>\n          Manage the exact physical printings archived to your private collection.\n        </p>\n      </div>\n    </header>\n\n    @if (isLoading()) {\n      <section class=\"collection-loading\" aria-label=\"Loading Collection\" aria-busy=\"true\">\n        <div class=\"collection-loading__heading\">\n          <span></span>\n          <span></span>\n        </div>\n\n        @for (placeholder of [1, 2, 3, 4]; track placeholder) {\n          <div class=\"collection-record collection-record--loading\" aria-hidden=\"true\">\n            <span class=\"collection-record__art-skeleton\"></span>\n            <div class=\"collection-record__identity-skeleton\">\n              <span></span>\n              <span></span>\n            </div>\n            <span class=\"collection-record__quantity-skeleton\"></span>\n          </div>\n        }\n      </section>\n    } @else if (loadError()) {\n      <section class=\"collection-state\" aria-labelledby=\"collection-error-title\">\n        <p class=\"collection-state__label\">Collection unavailable</p>\n        <h2 id=\"collection-error-title\">We couldn't load your collection.</h2>\n        <p>Your existing records have not been changed.</p>\n        <button class=\"btn btn--secondary\" type=\"button\" (click)=\"retry()\">\n          Try again\n        </button>\n      </section>\n    } @else if (ownedCardsService.items().length === 0) {\n      <section class=\"collection-state collection-state--empty\" aria-labelledby=\"collection-empty-title\">\n        <p class=\"collection-state__label\">Private collection</p>\n        <h2 id=\"collection-empty-title\">Your collection starts with a card.</h2>\n        <p>Add an exact physical printing from Card Detail to begin your collection.</p>\n        <a class=\"btn btn--primary\" routerLink=\"/cards\">Browse cards</a>\n      </section>\n    } @else {\n      <section class=\"collection-workspace\" aria-label=\"Owned card printings\">\n        <div class=\"collection-tools\">\n          <div class=\"collection-search\">\n            <label for=\"collection-search\">Search collection</label>\n            <input\n              id=\"collection-search\"\n              class=\"collection-control\"\n              type=\"search\"\n              [value]=\"searchQuery()\"\n              placeholder=\"Card name, printing or set\"\n              autocomplete=\"off\"\n              (input)=\"updateSearch($event)\"\n            />\n          </div>\n\n          <div class=\"collection-set-filter\">\n            <label for=\"collection-set\">Set</label>\n            <select\n              id=\"collection-set\"\n              class=\"collection-control\"\n              [value]=\"setFilter()\"\n              (change)=\"updateSetFilter($event)\"\n            >\n              <option value=\"\">All sets</option>\n              @for (set of setOptions(); track set) {\n                <option [value]=\"set\">{{ set }}</option>\n              }\n            </select>\n          </div>\n\n          <div class=\"collection-tools__summary\" aria-live=\"polite\">\n            <strong>{{ filteredItems().length }}</strong>\n            <span>{{ filteredItems().length === 1 ? 'printing' : 'printings' }}</span>\n          </div>\n\n          @if (hasFilters()) {\n            <button class=\"collection-clear\" type=\"button\" (click)=\"clearFilters()\">\n              Clear filters\n            </button>\n          }\n        </div>\n\n        @if (filteredItems().length === 0) {\n          <div class=\"collection-no-results\">\n            <h2>No cards in your collection match these filters.</h2>\n            <button class=\"btn btn--secondary\" type=\"button\" (click)=\"clearFilters()\">\n              Clear filters\n            </button>\n          </div>\n        } @else {\n          <div\n            id=\"collection-records\"\n            class=\"collection-records\"\n            [attr.aria-label]=\"\n              'Showing Collection printings ' +\n              firstVisibleRecord() +\n              ' to ' +\n              lastVisibleRecord() +\n              ' of ' +\n              filteredItems().length\n            \"\n          >\n            @for (item of pagedItems(); track item.id) {\n              <article\n                class=\"collection-record\"\n                [class.collection-record--editing]=\"editingRecordId() === item.id\"\n              >\n                <a\n                  class=\"collection-record__artwork\"\n                  [routerLink]=\"['/cards', item.cardId]\"\n                  [queryParams]=\"{ printing: item.cardPrintingId }\"\n                  [attr.aria-label]=\"\n                    'Inspect ' +\n                    item.cardName +\n                    ', printing ' +\n                    (item.cardNumber || 'selected printing')\n                  \"\n                >\n                  <img\n                    [appCardArtwork]=\"item.imageUrl\"\n                    [alt]=\"item.cardName + ' card artwork'\"\n                    loading=\"lazy\"\n                    decoding=\"async\"\n                  />\n                </a>\n\n                <div class=\"collection-record__identity\">\n                  <a\n                    class=\"collection-record__name\"\n                    [routerLink]=\"['/cards', item.cardId]\"\n                    [queryParams]=\"{ printing: item.cardPrintingId }\"\n                  >\n                    {{ item.cardName }}\n                  </a>\n\n                  <div class=\"collection-record__printing\" aria-label=\"Printing information\">\n                    @if (hasMeaningfulValue(item.cardNumber)) {\n                      <strong>{{ item.cardNumber }}</strong>\n                    } @else {\n                      <strong>Physical printing</strong>\n                    }\n\n                    @if (hasMeaningfulValue(item.setName)) {\n                      <span>{{ item.setName }}</span>\n                    }\n\n                    @if (hasMeaningfulValue(item.rarity)) {\n                      <span>{{ item.rarity }}</span>\n                    }\n                  </div>\n                </div>\n\n                <div class=\"collection-record__ownership\">\n                  <div class=\"collection-record__quantity-unit\">\n                    <span class=\"collection-record__ownership-label\">Owned</span>\n\n                    <div class=\"quantity-control\" aria-label=\"Owned quantity\">\n                      <button\n                        type=\"button\"\n                        [disabled]=\"item.quantityOwned <= 1 || isRecordBusy(item.id)\"\n                        [attr.aria-label]=\"'Decrease owned quantity from ' + item.quantityOwned\"\n                        (click)=\"decreaseQuantity(item)\"\n                      >\u2212</button>\n                      <span aria-live=\"polite\">{{ item.quantityOwned }}</span>\n                      <button\n                        type=\"button\"\n                        [disabled]=\"item.quantityOwned >= 999 || isRecordBusy(item.id)\"\n                        [attr.aria-label]=\"'Increase owned quantity from ' + item.quantityOwned\"\n                        (click)=\"increaseQuantity(item)\"\n                      >+</button>\n                    </div>\n                  </div>\n\n                  <div class=\"collection-record__actions\">\n                    <button\n                      class=\"collection-record__edit\"\n                      type=\"button\"\n                      [disabled]=\"isRecordBusy(item.id)\"\n                      [attr.aria-expanded]=\"editingRecordId() === item.id\"\n                      (click)=\"editingRecordId() === item.id ? cancelEdit() : beginEdit(item)\"\n                    >\n                      {{ editingRecordId() === item.id ? 'Close edit' : 'Edit record' }}\n                    </button>\n\n                    @if (hasRecordDetails(item) && editingRecordId() !== item.id) {\n                      <span class=\"collection-record__details-state\">Details added</span>\n                    }\n\n                    <button\n                      class=\"collection-record__remove\"\n                      type=\"button\"\n                      [disabled]=\"isRecordBusy(item.id)\"\n                      (click)=\"removeFromCollection(item)\"\n                    >\n                      {{ isRecordBusy(item.id) ? 'Updating\u2026' : 'Remove from Collection' }}\n                    </button>\n                  </div>\n                </div>\n\n                @if (editingRecordId() === item.id) {\n                  <form\n                    class=\"record-editor\"\n                    [formGroup]=\"recordForm\"\n                    (ngSubmit)=\"saveEdit(item)\"\n                    novalidate\n                  >\n                    <div class=\"record-editor__heading\">\n                      <p>Collector record</p>\n                      <div class=\"record-editor__identity\">\n                        <h3>{{ item.cardName }}</h3>\n                        <span>{{ item.cardNumber || 'Physical printing' }}</span>\n                      </div>\n                    </div>\n\n                    <div class=\"record-editor__fields\">\n                      <div class=\"form-field\">\n                        <label class=\"form-label\" [attr.for]=\"'condition-' + item.id\">Condition</label>\n                        <input\n                          class=\"form-control record-editor__control\"\n                          [id]=\"'condition-' + item.id\"\n                          type=\"text\"\n                          formControlName=\"condition\"\n                          maxlength=\"50\"\n                          autocomplete=\"off\"\n                          [attr.aria-invalid]=\"\n                            (recordForm.controls.condition.invalid &&\n                              recordForm.controls.condition.touched) ||\n                            !!conditionServerError()\n                          \"\n                          [attr.aria-describedby]=\"\n                            conditionServerError()\n                              ? 'condition-server-error-' + item.id\n                              : null\n                          \"\n                        />\n                        @if (recordForm.controls.condition.touched && recordForm.controls.condition.invalid) {\n                          <p class=\"form-error\">Condition must be 50 characters or fewer.</p>\n                        } @else if (conditionServerError()) {\n                          <p\n                            class=\"form-error\"\n                            [id]=\"'condition-server-error-' + item.id\"\n                          >\n                            {{ conditionServerError() }}\n                          </p>\n                        }\n                      </div>\n\n                      <div class=\"form-field record-editor__notes-field\">\n                        <label class=\"form-label\" [attr.for]=\"'notes-' + item.id\">Notes</label>\n                        <textarea\n                          class=\"form-control record-editor__notes\"\n                          [id]=\"'notes-' + item.id\"\n                          formControlName=\"notes\"\n                          maxlength=\"2000\"\n                          rows=\"3\"\n                          [attr.aria-invalid]=\"\n                            (recordForm.controls.notes.invalid &&\n                              recordForm.controls.notes.touched) ||\n                            !!notesServerError()\n                          \"\n                          [attr.aria-describedby]=\"\n                            notesServerError()\n                              ? 'notes-server-error-' + item.id\n                              : null\n                          \"\n                        ></textarea>\n                        @if (recordForm.controls.notes.touched && recordForm.controls.notes.invalid) {\n                          <p class=\"form-error\">Notes must be 2,000 characters or fewer.</p>\n                        } @else if (notesServerError()) {\n                          <p\n                            class=\"form-error\"\n                            [id]=\"'notes-server-error-' + item.id\"\n                          >\n                            {{ notesServerError() }}\n                          </p>\n                        }\n                      </div>\n                    </div>\n\n                    <fieldset class=\"record-editor__states\">\n                      <legend>Collection state</legend>\n\n                      <label class=\"record-check\">\n                        <input type=\"checkbox\" formControlName=\"isInMasterCollection\" />\n                        <span>Master collection</span>\n                      </label>\n\n                      <label class=\"record-check\">\n                        <input type=\"checkbox\" formControlName=\"isDuplicate\" />\n                        <span>Duplicate</span>\n                      </label>\n\n                      <label class=\"record-check\">\n                        <input type=\"checkbox\" formControlName=\"isGradingCandidate\" />\n                        <span>Grading candidate</span>\n                      </label>\n\n                      <label class=\"record-check\">\n                        <input type=\"checkbox\" formControlName=\"isOpenForTrade\" />\n                        <span>Open for trade</span>\n                      </label>\n\n                      <label class=\"record-check\">\n                        <input type=\"checkbox\" formControlName=\"isOpenToMessages\" />\n                        <span>Open to messages</span>\n                      </label>\n\n                      <label class=\"record-check\">\n                        <input type=\"checkbox\" formControlName=\"maySellLater\" />\n                        <span>May sell later</span>\n                      </label>\n                    </fieldset>\n\n                    @if (saveError()) {\n                      <p class=\"record-editor__save-error\" role=\"alert\">\n                        {{ saveError() }}\n                      </p>\n                    }\n\n                    <div class=\"record-editor__actions\">\n                      <button\n                        class=\"btn btn--primary\"\n                        type=\"submit\"\n                        [disabled]=\"\n                          recordForm.invalid ||\n                          isSavingRecord() ||\n                          isRecordBusy(item.id)\n                        \"\n                      >\n                        {{ isSavingRecord() ? 'Saving\u2026' : 'Save record' }}\n                      </button>\n\n                      <button\n                        class=\"btn btn--text\"\n                        type=\"button\"\n                        [disabled]=\"isSavingRecord()\"\n                        (click)=\"cancelEdit()\"\n                      >\n                        Cancel\n                      </button>\n                    </div>\n                  </form>\n                }\n              </article>\n            }\n          </div>\n\n          @if (totalPages() > 1) {\n            <nav class=\"collection-pagination\" aria-label=\"Collection pages\">\n              <p class=\"collection-pagination__status\">\n                Page {{ activePage() }} of {{ totalPages() }}\n              </p>\n\n              <div class=\"collection-pagination__controls\">\n                <button\n                  class=\"collection-pagination__direction\"\n                  type=\"button\"\n                  [disabled]=\"activePage() === 1\"\n                  aria-label=\"Previous Collection page\"\n                  (click)=\"previousPage()\"\n                >\n                  Previous\n                </button>\n\n                <div class=\"collection-pagination__pages\" aria-label=\"Collection page numbers\">\n                  @for (page of visiblePageNumbers(); track page) {\n                    <button\n                      class=\"collection-pagination__page\"\n                      [class.collection-pagination__page--current]=\"page === activePage()\"\n                      type=\"button\"\n                      [attr.aria-current]=\"page === activePage() ? 'page' : null\"\n                      [attr.aria-label]=\"'Collection page ' + page\"\n                      (click)=\"goToPage(page)\"\n                    >\n                      {{ page }}\n                    </button>\n                  }\n                </div>\n\n                <span class=\"collection-pagination__mobile-status\">\n                  Page {{ activePage() }} of {{ totalPages() }}\n                </span>\n\n                <button\n                  class=\"collection-pagination__direction\"\n                  type=\"button\"\n                  [disabled]=\"activePage() === totalPages()\"\n                  aria-label=\"Next Collection page\"\n                  (click)=\"nextPage()\"\n                >\n                  Next\n                </button>\n              </div>\n            </nav>\n          }\n        }\n      </section>\n    }\n  </div>\n</main>\n", styles: [":host {\n  display: block;\n}\n\n.collection-page {\n  min-height: 100%;\n  padding-block: clamp(40px, 4.6vw, 66px) clamp(78px, 8vw, 118px);\n  background: var(--colour-background);\n}\n\n.collection-shell {\n  width: min(100% - (var(--page-padding) * 2), 1420px);\n  margin-inline: auto;\n}\n\n.collection-intro {\n  display: grid;\n  max-width: 820px;\n  grid-template-columns: 3px minmax(0, 1fr);\n  align-items: start;\n  gap: 19px;\n}\n\n.collection-intro__mark {\n  width: 3px;\n  height: 42px;\n  margin-top: 4px;\n  background: var(--colour-yellow);\n}\n\n.collection-intro__label {\n  margin: 0 0 9px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.collection-intro h1 {\n  max-width: 820px;\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(3.05rem, 5.1vw, 5rem);\n  font-weight: 900;\n  line-height: 0.91;\n  letter-spacing: -0.025em;\n  text-transform: uppercase;\n}\n\n.collection-intro__copy > p:last-child {\n  max-width: 610px;\n  margin: 14px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.94rem;\n  line-height: 1.62;\n}\n\n.collection-workspace,\n.collection-loading {\n  margin-top: clamp(34px, 3.8vw, 48px);\n  border-top: 1px solid var(--colour-border-strong);\n}\n\n.collection-tools {\n  display: grid;\n  grid-template-columns: minmax(300px, 1fr) minmax(210px, 0.44fr) auto auto;\n  gap: 18px;\n  align-items: end;\n  padding: 19px 0;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-search,\n.collection-set-filter {\n  display: grid;\n  gap: 8px;\n}\n\n.collection-search label,\n.collection-set-filter label {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.collection-control {\n  width: 100%;\n  min-height: 48px;\n  padding: 0 14px;\n  color: var(--colour-text);\n  background: #090d13;\n  border: 1px solid var(--colour-border-strong);\n  border-radius: 0;\n  outline: 0;\n  transition:\n    border-color 160ms ease,\n    background-color 160ms ease;\n}\n\n.collection-control:hover {\n  border-color: rgba(255, 255, 255, 0.3);\n}\n\n.collection-control:focus-visible {\n  border-color: var(--colour-cyan);\n  outline: 3px solid var(--colour-cyan);\n  outline-offset: 3px;\n}\n\n.collection-control::placeholder {\n  color: #626c79;\n}\n\n.collection-tools__summary {\n  display: flex;\n  min-height: 48px;\n  align-items: baseline;\n  justify-content: flex-end;\n  gap: 7px;\n  padding-bottom: 12px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collection-tools__summary strong {\n  color: var(--colour-text);\n  font-size: 1.08rem;\n  font-weight: 800;\n}\n\n.collection-tools__summary span {\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.09em;\n}\n\n.collection-clear {\n  min-height: 48px;\n  padding: 0 0 11px;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.collection-clear:hover {\n  color: var(--colour-text);\n}\n\n.collection-records {\n  max-width: 1280px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-record {\n  display: grid;\n  grid-template-columns: 156px minmax(0, 1fr) minmax(300px, 350px);\n  align-items: center;\n  gap: clamp(26px, 3.2vw, 46px);\n  padding: 24px 0;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-record:last-child {\n  border-bottom: 0;\n}\n\n.collection-record__artwork {\n  display: block;\n  width: 144px;\n  aspect-ratio: 0.71;\n  padding: 5px;\n  background: #090d13;\n  box-shadow:\n    0 18px 38px rgba(0, 0, 0, 0.3),\n    inset 0 0 0 1px rgba(255, 255, 255, 0.065);\n  transition:\n    transform 160ms ease,\n    box-shadow 160ms ease;\n}\n\n.collection-record__artwork img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n@media (hover: hover) and (pointer: fine) {\n  .collection-record__artwork:hover {\n    transform: translateY(-2px);\n    box-shadow:\n      0 22px 46px rgba(0, 0, 0, 0.34),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.085);\n  }\n}\n\n.collection-record__identity {\n  min-width: 0;\n}\n\n.collection-record__name {\n  display: inline-block;\n  max-width: 100%;\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: clamp(1.8rem, 2.3vw, 2.55rem);\n  font-weight: 900;\n  line-height: 0.98;\n  letter-spacing: -0.018em;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.collection-record__name:hover {\n  color: var(--colour-yellow-light);\n}\n\n.collection-record__printing {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  margin-top: 12px;\n  color: var(--colour-text-muted);\n  font-size: 0.76rem;\n}\n\n.collection-record__printing > * + *::before {\n  margin-inline: 10px;\n  color: #59616d;\n  content: \"\u00B7\";\n}\n\n.collection-record__printing strong {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 0.94rem;\n  font-weight: 800;\n  letter-spacing: 0.055em;\n  text-transform: uppercase;\n}\n\n.collection-record__ownership {\n  display: grid;\n  min-width: 0;\n  justify-items: end;\n  gap: 13px;\n}\n\n.collection-record__quantity-unit {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 14px;\n}\n\n.collection-record__ownership-label {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n\n.quantity-control {\n  display: grid;\n  min-width: 120px;\n  grid-template-columns: 38px 44px 38px;\n  align-items: stretch;\n  border: 1px solid var(--colour-border-strong);\n  background: #090d13;\n}\n\n.quantity-control button,\n.quantity-control span {\n  display: grid;\n  min-height: 42px;\n  place-items: center;\n}\n\n.quantity-control button {\n  padding: 0;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  transition:\n    color 160ms ease,\n    background-color 160ms ease;\n}\n\n.quantity-control button:hover:not(:disabled) {\n  color: var(--colour-text);\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.quantity-control button:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n\n.quantity-control span {\n  color: var(--colour-text);\n  border-inline: 1px solid var(--colour-border);\n  font-family: var(--font-display);\n  font-size: 0.96rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n\n.collection-record__actions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px 16px;\n}\n\n.collection-record__edit,\n.collection-record__remove {\n  min-height: 36px;\n  padding: 0;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n  transition: color 160ms ease;\n}\n\n.collection-record__edit {\n  color: var(--colour-text);\n}\n\n.collection-record__details-state {\n  color: rgba(244, 245, 247, 0.86);\n  cursor: default;\n  font-family: var(--font-display);\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-decoration: none;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collection-record__remove {\n  color: var(--colour-text-muted);\n  border-bottom: 1px solid var(--colour-border-strong);\n}\n\n.collection-record__edit:hover,\n.collection-record__remove:hover {\n  color: var(--colour-yellow-light);\n}\n\n.collection-record__edit:disabled,\n.collection-record__remove:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.record-editor {\n  grid-column: 2 / -1;\n  display: grid;\n  gap: 22px;\n  margin-top: 0;\n  padding: 22px 0 4px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.record-editor__heading {\n  display: grid;\n  gap: 6px;\n}\n\n.record-editor__heading p,\n.record-editor__heading h3 {\n  margin: 0;\n}\n\n.record-editor__heading > p,\n.record-editor__identity > span {\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.record-editor__identity {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  gap: 9px 14px;\n}\n\n.record-editor__heading h3 {\n  font-family: var(--font-display);\n  font-size: 1.32rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n\n.record-editor__fields {\n  display: grid;\n  grid-template-columns: minmax(190px, 0.28fr) minmax(0, 0.72fr);\n  align-items: start;\n  gap: 24px;\n}\n\n.record-editor__fields .form-field {\n  align-content: start;\n}\n\n.record-editor__control {\n  min-height: 48px;\n}\n\n.record-editor__notes {\n  min-height: 96px;\n  padding-block: 12px;\n  resize: vertical;\n  line-height: 1.55;\n}\n\n.record-editor__states {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  column-gap: 26px;\n  row-gap: 0;\n  padding: 8px 0;\n  margin: 0;\n  border: 0;\n  border-block: 1px solid var(--colour-border);\n}\n\n.record-editor__states legend {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n}\n\n.record-check {\n  display: flex;\n  min-height: 44px;\n  align-items: center;\n  gap: 11px;\n  padding: 8px 0;\n  color: var(--colour-text-muted);\n  cursor: pointer;\n  font-size: 0.75rem;\n  transition: color 160ms ease;\n}\n\n.record-check:hover,\n.record-check:has(input:checked) {\n  color: var(--colour-text);\n}\n\n.record-check input {\n  width: 17px;\n  height: 17px;\n  margin: 0;\n  accent-color: var(--colour-yellow);\n}\n\n.record-editor__save-error {\n  max-width: 660px;\n  margin: -4px 0 0;\n  color: #d6a2aa;\n  font-size: 0.78rem;\n  line-height: 1.55;\n}\n\n.record-editor__actions {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.collection-pagination {\n  display: flex;\n  width: 100%;\n  max-width: 1280px;\n  align-items: center;\n  justify-content: flex-start;\n  gap: clamp(24px, 3vw, 42px);\n  padding: 22px 0 2px;\n  border-top: 1px solid var(--colour-border-strong);\n}\n\n.collection-pagination__status {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n}\n\n.collection-pagination__controls,\n.collection-pagination__pages {\n  display: flex;\n  align-items: center;\n}\n\n.collection-pagination__mobile-status {\n  display: none;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.collection-pagination__controls {\n  gap: 10px;\n}\n\n.collection-pagination__pages {\n  gap: 6px;\n}\n\n.collection-pagination__page,\n.collection-pagination__direction {\n  min-height: 42px;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 1px solid var(--colour-border-strong);\n  border-radius: 0;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  transition:\n    color 160ms ease,\n    border-color 160ms ease,\n    background-color 160ms ease;\n}\n\n.collection-pagination__page {\n  min-width: 40px;\n  padding-inline: 10px;\n}\n\n.collection-pagination__direction {\n  padding-inline: 15px;\n}\n\n.collection-pagination__page:hover:not(:disabled),\n.collection-pagination__direction:hover:not(:disabled) {\n  color: var(--colour-text);\n  border-color: rgba(255, 255, 255, 0.32);\n  background: rgba(255, 255, 255, 0.035);\n}\n\n.collection-pagination__page--current {\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border-color: var(--colour-yellow);\n}\n\n.collection-pagination__direction:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n\n.collection-state,\n.collection-no-results {\n  max-width: 720px;\n  padding-block: clamp(68px, 7vw, 104px);\n}\n\n.collection-state {\n  margin-top: clamp(34px, 3.8vw, 48px);\n  border-top: 1px solid var(--colour-border-strong);\n}\n\n.collection-state__label {\n  margin: 0 0 12px;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n\n.collection-state h2,\n.collection-no-results h2 {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(2.4rem, 3.8vw, 3.8rem);\n  font-weight: 900;\n  line-height: 0.94;\n  text-transform: uppercase;\n}\n\n.collection-state > p:not(.collection-state__label) {\n  max-width: 560px;\n  margin: 16px 0 0;\n  color: var(--colour-text-muted);\n  line-height: 1.65;\n}\n\n.collection-state .btn,\n.collection-no-results .btn {\n  margin-top: 26px;\n}\n\n.collection-loading__heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 19px 0;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.collection-loading__heading span {\n  display: block;\n  height: 13px;\n  background: rgba(255, 255, 255, 0.06);\n}\n\n.collection-loading__heading span:first-child {\n  width: min(360px, 45%);\n}\n\n.collection-loading__heading span:last-child {\n  width: 90px;\n}\n\n.collection-record--loading {\n  pointer-events: none;\n}\n\n.collection-record__art-skeleton {\n  display: block;\n  width: 144px;\n  aspect-ratio: 0.71;\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.collection-record__identity-skeleton {\n  display: grid;\n  gap: 12px;\n}\n\n.collection-record__identity-skeleton span,\n.collection-record__quantity-skeleton {\n  display: block;\n  height: 12px;\n  background: rgba(255, 255, 255, 0.045);\n}\n\n.collection-record__identity-skeleton span:nth-child(1) {\n  width: min(380px, 76%);\n  height: 26px;\n}\n\n.collection-record__identity-skeleton span:nth-child(2) {\n  width: min(300px, 58%);\n}\n\n.collection-record__quantity-skeleton {\n  width: 120px;\n  height: 42px;\n  justify-self: end;\n}\n\n@media (max-width: 1040px) {\n  .collection-tools {\n    grid-template-columns: minmax(0, 1fr) minmax(190px, 0.5fr) auto;\n  }\n\n  .collection-clear {\n    grid-column: 1 / -1;\n    width: fit-content;\n    min-height: 30px;\n    padding: 0;\n  }\n\n  .collection-record {\n    grid-template-columns: 130px minmax(0, 1fr);\n    max-width: 100%;\n  }\n\n  .collection-record__artwork,\n  .collection-record__art-skeleton {\n    width: 122px;\n  }\n\n  .collection-record__ownership {\n    grid-column: 2;\n    width: 100%;\n    justify-items: start;\n    padding-top: 15px;\n    border-top: 1px solid var(--colour-border);\n  }\n\n  .collection-record__quantity-unit,\n  .collection-record__actions {\n    justify-content: flex-start;\n  }\n\n  .record-editor {\n    grid-column: 2;\n  }\n}\n\n@media (max-width: 720px) {\n  .collection-page {\n    padding-block: 38px 78px;\n  }\n\n  .collection-intro {\n    grid-template-columns: 3px minmax(0, 1fr);\n    gap: 15px;\n  }\n\n  .collection-intro__mark {\n    height: 38px;\n  }\n\n  .collection-intro h1 {\n    font-size: clamp(2.9rem, 12.5vw, 4.4rem);\n  }\n\n  .collection-workspace,\n  .collection-loading {\n    margin-top: 30px;\n  }\n\n  .collection-tools {\n    grid-template-columns: 1fr;\n    gap: 14px;\n    padding: 18px 0;\n  }\n\n  .collection-tools__summary {\n    justify-content: flex-start;\n    min-height: auto;\n    padding: 2px 0 0;\n  }\n\n  .collection-clear {\n    grid-column: auto;\n  }\n\n  .collection-record {\n    grid-template-columns: 108px minmax(0, 1fr);\n    align-items: start;\n    gap: 18px;\n    padding: 22px 0 26px;\n  }\n\n  .collection-record__artwork,\n  .collection-record__art-skeleton {\n    width: 102px;\n  }\n\n  .collection-record__name {\n    font-size: clamp(1.65rem, 8vw, 2.15rem);\n  }\n\n  .collection-record__printing {\n    display: grid;\n    gap: 5px;\n    margin-top: 10px;\n  }\n\n  .collection-record__printing > * + *::before {\n    display: none;\n  }\n\n  .collection-record__ownership,\n  .record-editor {\n    grid-column: 1 / -1;\n  }\n\n  .collection-record__ownership {\n    width: 100%;\n    justify-items: stretch;\n    margin-top: 2px;\n  }\n\n  .collection-record__quantity-unit {\n    justify-content: space-between;\n  }\n\n  .collection-record__actions {\n    justify-content: flex-start;\n  }\n\n  .record-editor__heading {\n    gap: 7px;\n  }\n\n  .record-editor__fields {\n    grid-template-columns: 1fr;\n  }\n\n  .record-editor__states {\n    grid-template-columns: 1fr 1fr;\n    column-gap: 20px;\n  }\n\n  .collection-pagination {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  .collection-pagination__controls {\n    width: 100%;\n    justify-content: space-between;\n  }\n}\n\n@media (max-width: 420px) {\n  .collection-record {\n    grid-template-columns: 96px minmax(0, 1fr);\n    gap: 14px;\n  }\n\n  .collection-record__artwork,\n  .collection-record__art-skeleton {\n    width: 92px;\n  }\n\n  .collection-record__quantity-unit {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 8px;\n  }\n\n  .quantity-control {\n    width: 100%;\n    grid-template-columns: 44px minmax(48px, 1fr) 44px;\n  }\n\n  .collection-record__actions {\n    display: grid;\n    grid-template-columns: 1fr;\n    justify-items: start;\n  }\n\n  .record-editor__states {\n    grid-template-columns: 1fr;\n  }\n\n  .record-editor__actions {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .record-editor__actions .btn {\n    width: 100%;\n  }\n\n  .collection-pagination__status,\n  .collection-pagination__pages {\n    display: none;\n  }\n\n  .collection-pagination {\n    display: block;\n  }\n\n  .collection-pagination__controls {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);\n    gap: 8px;\n  }\n\n  .collection-pagination__mobile-status {\n    display: block;\n    align-self: center;\n    text-align: center;\n  }\n\n  .collection-pagination__direction {\n    width: 100%;\n    padding-inline: 10px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .collection-record__artwork,\n  .collection-control,\n  .quantity-control button,\n  .collection-record__edit,\n  .collection-record__remove,\n  .record-check,\n  .collection-pagination__page,\n  .collection-pagination__direction {\n    transition: none;\n  }\n\n  .collection-record__artwork:hover {\n    transform: none;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.OwnedCardsService }, { type: i3.FeedbackService }, { type: i4.ActivatedRoute }, { type: i4.Router }, { type: i5.ViewportScroller }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Collection, { className: "Collection", filePath: "src/app/features/collection/pages/collection/collection.ts", lineNumber: 48 }); })();

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardArtworkDirective } from '../../directives/card-artwork.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../services/cards.service";
import * as i2 from "../../services/card-catalogue-state.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/forms";
const _c0 = a0 => ["/cards", a0];
const _forTrack0 = ($index, $item) => $item.code;
const _forTrack1 = ($index, $item) => $item.key;
const _forTrack2 = ($index, $item) => $item.id;
function CardCatalogue_For_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const set_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", set_r1.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formatSetOption(set_r1));
} }
function CardCatalogue_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cardType_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", cardType_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cardType_r3);
} }
function CardCatalogue_For_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rarity_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", rarity_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(rarity_r4);
} }
function CardCatalogue_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.activeMoreFilterCount);
} }
function CardCatalogue_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.activeFilterCount);
} }
function CardCatalogue_Conditional_56_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const colour_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", colour_r6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(colour_r6);
} }
function CardCatalogue_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 25)(1, "span");
    i0.ɵɵtext(2, "Colour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 33);
    i0.ɵɵlistener("ngModelChange", function CardCatalogue_Conditional_56_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("colour", $event)); });
    i0.ɵɵelementStart(4, "option", 18);
    i0.ɵɵtext(5, "All colours");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, CardCatalogue_Conditional_56_For_7_Template, 2, 2, "option", 19, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.filters.colour);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.filterOptions.colours);
} }
function CardCatalogue_Conditional_61_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", tag_r8);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tag_r8);
} }
function CardCatalogue_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 25)(1, "span");
    i0.ɵɵtext(2, "Tags");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 34);
    i0.ɵɵlistener("ngModelChange", function CardCatalogue_Conditional_61_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("tags", $event)); });
    i0.ɵɵelementStart(4, "option", 18);
    i0.ɵɵtext(5, "All tags");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, CardCatalogue_Conditional_61_For_7_Template, 2, 2, "option", 19, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.filters.tags);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.filterOptions.tags);
} }
function CardCatalogue_Conditional_62_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cost_r10 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", cost_r10);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cost_r10);
} }
function CardCatalogue_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 25)(1, "span");
    i0.ɵɵtext(2, "Cost");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 35);
    i0.ɵɵlistener("ngModelChange", function CardCatalogue_Conditional_62_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("cost", $event)); });
    i0.ɵɵelementStart(4, "option", 36);
    i0.ɵɵtext(5, "Any cost");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, CardCatalogue_Conditional_62_For_7_Template, 2, 2, "option", 36, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.filters.cost);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.filterOptions.costs);
} }
function CardCatalogue_Conditional_63_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const power_r12 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", power_r12);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(power_r12);
} }
function CardCatalogue_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 25)(1, "span");
    i0.ɵɵtext(2, "Power");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 37);
    i0.ɵɵlistener("ngModelChange", function CardCatalogue_Conditional_63_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("power", $event)); });
    i0.ɵɵelementStart(4, "option", 36);
    i0.ɵɵtext(5, "Any power");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, CardCatalogue_Conditional_63_For_7_Template, 2, 2, "option", 36, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.filters.power);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.filterOptions.powers);
} }
function CardCatalogue_Conditional_64_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ram_r14 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", ram_r14);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ram_r14);
} }
function CardCatalogue_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 25)(1, "span");
    i0.ɵɵtext(2, "RAM");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 38);
    i0.ɵɵlistener("ngModelChange", function CardCatalogue_Conditional_64_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("ram", $event)); });
    i0.ɵɵelementStart(4, "option", 36);
    i0.ɵɵtext(5, "Any RAM");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, CardCatalogue_Conditional_64_For_7_Template, 2, 2, "option", 36, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.filters.ram);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.filterOptions.ramValues);
} }
function CardCatalogue_Conditional_65_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const eddies_r16 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", eddies_r16);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(eddies_r16);
} }
function CardCatalogue_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 25)(1, "span");
    i0.ɵɵtext(2, "Eddies");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 39);
    i0.ɵɵlistener("ngModelChange", function CardCatalogue_Conditional_65_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFilterChange("eddies", $event)); });
    i0.ɵɵelementStart(4, "option", 36);
    i0.ɵɵtext(5, "Any Eddies");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, CardCatalogue_Conditional_65_For_7_Template, 2, 2, "option", 36, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.filters.eddies);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.filterOptions.eddiesValues);
} }
function CardCatalogue_Conditional_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1, " Filter choices are temporarily unavailable. Search and Classification remain available. ");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_67_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_67_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.clearSearch()); });
    i0.ɵɵelementStart(1, "span")(2, "strong");
    i0.ɵɵtext(3, "Search:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 32);
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", "Clear card search " + ctx_r1.filters.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.filters.name);
} }
function CardCatalogue_Conditional_67_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_67_For_4_Template_button_click_0_listener() { const filter_r20 = i0.ɵɵrestoreView(_r19).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeFilter(filter_r20.key)); });
    i0.ɵɵelementStart(1, "span")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 32);
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const filter_r20 = ctx.$implicit;
    i0.ɵɵattribute("aria-label", "Remove " + filter_r20.label + " filter " + filter_r20.value);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", filter_r20.label, ":");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", filter_r20.value);
} }
function CardCatalogue_Conditional_67_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 40);
    i0.ɵɵconditionalCreate(2, CardCatalogue_Conditional_67_Conditional_2_Template, 7, 2, "button", 41);
    i0.ɵɵrepeaterCreate(3, CardCatalogue_Conditional_67_For_4_Template, 7, 3, "button", 41, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 42);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_67_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearFilters()); });
    i0.ɵɵtext(6, " Clear filters ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasSearchQuery ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.activeFilters);
} }
function CardCatalogue_Conditional_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "span", 44);
    i0.ɵɵtext(2, " Loading ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, " Loading cards ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " Preparing the Vault Archive. ");
    i0.ɵɵelementEnd()();
} }
function CardCatalogue_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 30)(1, "span", 44);
    i0.ɵɵtext(2, " Vault Archive unavailable ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, " Couldn't load the cards ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " Try again in a moment. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 45);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_69_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.retryLoad()); });
    i0.ɵɵtext(8, " Try again ");
    i0.ɵɵelementEnd()();
} }
function CardCatalogue_Conditional_70_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "span", 44);
    i0.ɵɵtext(2, " No matches ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, "No cards match these filters.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 45);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_70_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearFilters()); });
    i0.ɵɵtext(6, " Clear filters ");
    i0.ɵɵelementEnd()();
} }
function CardCatalogue_Conditional_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "span", 44);
    i0.ɵɵtext(2, " Vault Archive ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, " No cards are currently available. ");
    i0.ɵɵelementEnd()();
} }
function CardCatalogue_Conditional_72_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Page ", ctx_r1.currentPage, " of ", ctx_r1.totalPages);
} }
function CardCatalogue_Conditional_72_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 48);
    i0.ɵɵtext(1, "Updating\u2026");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r25 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r25.cardType, " ");
} }
function CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r25 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r25.classification, " ");
} }
function CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r25 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r25.rarity, " ");
} }
function CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r25 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r25.cardNumber, " ");
} }
function CardCatalogue_Conditional_72_For_19_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵconditionalCreate(1, CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_1_Template, 2, 1, "span")(2, CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_2_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(3, CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_3_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(4, CardCatalogue_Conditional_72_For_19_Conditional_7_Conditional_4_Template, 2, 1, "span", 65);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r25 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(card_r25.cardType) ? 1 : ctx_r1.hasMeaningfulValue(card_r25.classification) ? 2 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(card_r25.rarity) ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(card_r25.cardNumber) ? 4 : -1);
} }
function CardCatalogue_Conditional_72_For_19_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r25 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r25.setName, " ");
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Foil");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Alt Art");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Kickstarter");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Promo");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Box Topper");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " Starter Deck Exclusive ");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Beta");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Retail");
    i0.ɵɵelementEnd();
} }
function CardCatalogue_Conditional_72_For_19_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵconditionalCreate(1, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_1_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(2, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_2_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(3, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_3_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(4, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_4_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(5, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_5_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(6, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_6_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(7, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_7_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(8, CardCatalogue_Conditional_72_For_19_Conditional_10_Conditional_8_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r25 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.isFoil ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.isAltArt ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.isKickstarterVersion ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.isPromo ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.isBoxTopper ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.isStarterDeckExclusive ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.hasBetaSymbol ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.isRetailVersion ? 8 : -1);
} }
function CardCatalogue_Conditional_72_For_19_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 55)(1, "a", 57);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_72_For_19_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.rememberArchiveState()); });
    i0.ɵɵelementStart(2, "div", 58);
    i0.ɵɵelement(3, "img", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 60)(5, "h2");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, CardCatalogue_Conditional_72_For_19_Conditional_7_Template, 5, 3, "div", 61);
    i0.ɵɵelementStart(8, "div", 62);
    i0.ɵɵconditionalCreate(9, CardCatalogue_Conditional_72_For_19_Conditional_9_Template, 2, 1, "p", 63);
    i0.ɵɵconditionalCreate(10, CardCatalogue_Conditional_72_For_19_Conditional_10_Template, 9, 8, "div", 64);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const card_r25 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c0, card_r25.id));
    i0.ɵɵattribute("aria-label", "Inspect " + card_r25.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("appCardArtwork", card_r25.imageUrl)("alt", card_r25.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", card_r25.name, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(card_r25.cardType) || ctx_r1.hasMeaningfulValue(card_r25.classification) || ctx_r1.hasMeaningfulValue(card_r25.rarity) || ctx_r1.hasMeaningfulValue(card_r25.cardNumber) ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasMeaningfulValue(card_r25.setName) ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r25.hasBetaSymbol || card_r25.isKickstarterVersion || card_r25.isRetailVersion || card_r25.isFoil || card_r25.isAltArt || card_r25.isBoxTopper || card_r25.isPromo || card_r25.isStarterDeckExclusive ? 10 : -1);
} }
function CardCatalogue_Conditional_72_Conditional_20_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 72);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_72_Conditional_20_For_8_Template_button_click_0_listener() { const page_r28 = i0.ɵɵrestoreView(_r27).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.goToPage(page_r28)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r28 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("catalogue-pagination__page--current", page_r28 === ctx_r1.currentPage);
    i0.ɵɵattribute("aria-current", page_r28 === ctx_r1.currentPage ? "page" : null)("aria-label", "Go to Archive page " + page_r28);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", page_r28, " ");
} }
function CardCatalogue_Conditional_72_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 56)(1, "div", 66)(2, "button", 67);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_72_Conditional_20_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r26); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.previousPage()); });
    i0.ɵɵtext(3, " Previous ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 68);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 69);
    i0.ɵɵrepeaterCreate(7, CardCatalogue_Conditional_72_Conditional_20_For_8_Template, 2, 5, "button", 70, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 71);
    i0.ɵɵlistener("click", function CardCatalogue_Conditional_72_Conditional_20_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r26); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.nextPage()); });
    i0.ɵɵtext(10, " Next ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r1.currentPage, " of ", ctx_r1.totalPages, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.visiblePageNumbers);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
} }
function CardCatalogue_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31)(1, "div", 46)(2, "div", 47)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, CardCatalogue_Conditional_72_Conditional_5_Template, 2, 2, "span");
    i0.ɵɵconditionalCreate(6, CardCatalogue_Conditional_72_Conditional_6_Template, 2, 0, "span", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label", 49)(8, "span");
    i0.ɵɵtext(9, "Sort");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 50);
    i0.ɵɵlistener("ngModelChange", function CardCatalogue_Conditional_72_Template_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSortChange($event)); });
    i0.ɵɵelementStart(11, "option", 51);
    i0.ɵɵtext(12, "Set order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "option", 52);
    i0.ɵɵtext(14, "Card name A\u2013Z");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "option", 53);
    i0.ɵɵtext(16, "Card name Z\u2013A");
    i0.ɵɵelementEnd()();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 54);
    i0.ɵɵrepeaterCreate(18, CardCatalogue_Conditional_72_For_19_Template, 11, 10, "article", 55, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(20, CardCatalogue_Conditional_72_Conditional_20_Template, 11, 4, "nav", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-busy", ctx_r1.isRefreshing);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.totalCount, " ", ctx_r1.totalCount === 1 ? "card" : "cards", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.totalPages > 1 ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isRefreshing ? 6 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.sortValue);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.cards);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.totalPages > 1 ? 20 : -1);
} }
/**
 * Public Vault Archive for fast, artwork-first card discovery.
 *
 * Angular owns presentation and URL state. The Cards API remains authoritative
 * for supported filter values, combined filtering, sorting and pagination.
 */
export class CardCatalogue {
    cardsService;
    catalogueStateService;
    route;
    router;
    changeDetectorRef;
    cards = [];
    filters = this.createEmptyFilters();
    filterOptions = this.createEmptyFilterOptions();
    currentPage = 1;
    pageSize = 24;
    totalCount = 0;
    totalPages = 0;
    isLoading = true;
    isRefreshing = false;
    hasLoadedOnce = false;
    isFilterOptionsLoading = true;
    filterOptionsUnavailable = false;
    errorMessage = '';
    filtersExpanded = false;
    searchDebounceTimer = null;
    cardRequest;
    filterOptionsRequest;
    constructor(cardsService, catalogueStateService, route, router, changeDetectorRef) {
        this.cardsService = cardsService;
        this.catalogueStateService = catalogueStateService;
        this.route = route;
        this.router = router;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnInit() {
        const queryParams = this.route.snapshot.queryParamMap;
        const restoredState = this.catalogueStateService.consume();
        if (this.hasArchiveQueryState(queryParams)) {
            this.filters =
                this.readFiltersFromQuery(queryParams);
            this.currentPage =
                this.readPositiveInteger(queryParams.get('page')) ?? 1;
        }
        else if (restoredState) {
            this.filters = restoredState.filters;
            this.currentPage = restoredState.currentPage;
            this.syncUrlState();
        }
        this.loadFilterOptions();
        this.loadCards();
    }
    ngOnDestroy() {
        this.clearSearchDebounce();
        this.cardRequest?.unsubscribe();
        this.filterOptionsRequest?.unsubscribe();
    }
    get visiblePageNumbers() {
        const maximumVisiblePages = 5;
        if (this.totalPages <= maximumVisiblePages) {
            return Array.from({ length: this.totalPages }, (_, index) => index + 1);
        }
        let startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, startPage + maximumVisiblePages - 1);
        if (endPage - startPage + 1 <
            maximumVisiblePages) {
            startPage = Math.max(1, endPage - maximumVisiblePages + 1);
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    }
    get hasSearchQuery() {
        return Boolean(this.filters.name?.trim());
    }
    get activeFilters() {
        const activeFilters = [];
        this.addStringFilter(activeFilters, 'setCode', 'Set', this.filters.setCode, this.getSetLabel(this.filters.setCode));
        this.addStringFilter(activeFilters, 'cardType', 'Type', this.filters.cardType);
        this.addStringFilter(activeFilters, 'rarity', 'Rarity', this.filters.rarity);
        this.addStringFilter(activeFilters, 'colour', 'Colour', this.filters.colour);
        this.addStringFilter(activeFilters, 'classification', 'Classification', this.filters.classification);
        this.addStringFilter(activeFilters, 'tags', 'Tag', this.filters.tags);
        this.addNumericFilter(activeFilters, 'cost', 'Cost', this.filters.cost);
        this.addNumericFilter(activeFilters, 'power', 'Power', this.filters.power);
        this.addNumericFilter(activeFilters, 'ram', 'RAM', this.filters.ram);
        this.addNumericFilter(activeFilters, 'eddies', 'Eddies', this.filters.eddies);
        return activeFilters;
    }
    get activeFilterCount() {
        return this.activeFilters.length;
    }
    get hasSelectedFilters() {
        return this.activeFilterCount > 0;
    }
    get hasActiveFilters() {
        return this.hasSearchQuery ||
            this.hasSelectedFilters;
    }
    get hasMoreFiltersActive() {
        return Boolean(this.filters.colour?.trim() ||
            this.filters.classification?.trim() ||
            this.filters.tags?.trim() ||
            this.filters.cost !== null ||
            this.filters.power !== null ||
            this.filters.ram !== null ||
            this.filters.eddies !== null);
    }
    get activeMoreFilterCount() {
        return this.activeFilters.filter(filter => ![
            'setCode',
            'cardType',
            'rarity'
        ].includes(filter.key)).length;
    }
    get sortValue() {
        if (this.filters.sortBy === 'name') {
            return this.filters.sortDirection === 'desc'
                ? 'name-desc'
                : 'name-asc';
        }
        return 'setOrder-asc';
    }
    hasMeaningfulValue(value) {
        if (!value?.trim()) {
            return false;
        }
        const normalisedValue = value.trim().toLowerCase();
        return ![
            'unknown',
            'n/a',
            'null',
            'none',
            '-',
            '—'
        ].includes(normalisedValue);
    }
    onSearchChange(value) {
        this.filters = {
            ...this.filters,
            name: value
        };
        this.currentPage = 1;
        this.clearSearchDebounce();
        this.searchDebounceTimer = setTimeout(() => {
            this.searchDebounceTimer = null;
            this.syncUrlState();
            this.loadCards();
        }, 300);
    }
    onFilterChange(filter, value) {
        this.filters = {
            ...this.filters,
            [filter]: value
        };
        this.currentPage = 1;
        this.clearSearchDebounce();
        this.syncUrlState();
        this.loadCards();
    }
    onClassificationChange(value) {
        this.onFilterChange('classification', value.trim());
    }
    onSortChange(value) {
        const [sortBy, sortDirection] = value.split('-');
        this.filters = {
            ...this.filters,
            sortBy,
            sortDirection
        };
        this.currentPage = 1;
        this.syncUrlState();
        this.loadCards();
    }
    applyFilters() {
        this.clearSearchDebounce();
        this.currentPage = 1;
        this.syncUrlState();
        this.loadCards();
    }
    clearSearch() {
        if (!this.hasSearchQuery) {
            return;
        }
        this.clearSearchDebounce();
        this.filters = {
            ...this.filters,
            name: ''
        };
        this.currentPage = 1;
        this.syncUrlState();
        this.loadCards();
    }
    removeFilter(filter) {
        const emptyValue = [
            'cost',
            'power',
            'ram',
            'eddies'
        ].includes(filter)
            ? null
            : '';
        this.onFilterChange(filter, emptyValue);
    }
    clearFilters() {
        this.clearSearchDebounce();
        const sortBy = this.filters.sortBy;
        const sortDirection = this.filters.sortDirection;
        this.filters =
            {
                ...this.createEmptyFilters(),
                sortBy,
                sortDirection
            };
        this.currentPage = 1;
        this.syncUrlState();
        this.loadCards();
    }
    toggleFilters() {
        this.filtersExpanded =
            !this.filtersExpanded;
    }
    retryLoad() {
        this.loadCards();
        if (this.filterOptionsUnavailable) {
            this.loadFilterOptions();
        }
    }
    rememberArchiveState() {
        this.catalogueStateService.save({
            filters: { ...this.filters },
            currentPage: this.currentPage
        });
    }
    goToPage(page) {
        if (page < 1 ||
            page > this.totalPages ||
            page === this.currentPage) {
            return;
        }
        this.currentPage = page;
        this.syncUrlState();
        this.loadCards();
    }
    previousPage() {
        this.goToPage(this.currentPage - 1);
    }
    nextPage() {
        this.goToPage(this.currentPage + 1);
    }
    formatSetOption(set) {
        return set.name && set.name !== set.code
            ? `${set.code} — ${set.name}`
            : set.code;
    }
    loadFilterOptions() {
        this.filterOptionsRequest?.unsubscribe();
        this.isFilterOptionsLoading = true;
        this.filterOptionsUnavailable = false;
        this.filterOptionsRequest =
            this.cardsService
                .getFilterOptions()
                .subscribe({
                next: options => {
                    this.filterOptions =
                        this.normaliseFilterOptions(options);
                    this.mergeVisibleRarities(this.cards);
                    this.isFilterOptionsLoading = false;
                    this.changeDetectorRef.markForCheck();
                },
                error: () => {
                    this.filterOptions =
                        this.createEmptyFilterOptions();
                    this.filterOptionsUnavailable = true;
                    this.isFilterOptionsLoading = false;
                    this.changeDetectorRef.markForCheck();
                }
            });
    }
    loadCards() {
        this.cardRequest?.unsubscribe();
        this.errorMessage = '';
        if (this.hasLoadedOnce) {
            this.isRefreshing = true;
        }
        else {
            this.isLoading = true;
        }
        this.cardRequest =
            this.cardsService
                .getCardsPage(this.filters, this.currentPage, this.pageSize)
                .subscribe({
                next: response => {
                    if (response.totalPages > 0 &&
                        this.currentPage > response.totalPages) {
                        this.currentPage = response.totalPages;
                        this.syncUrlState();
                        this.loadCards();
                        return;
                    }
                    const requestedPage = this.currentPage;
                    this.cards = response.items;
                    this.mergeVisibleRarities(response.items);
                    this.totalCount = response.totalCount;
                    this.totalPages = response.totalPages;
                    this.currentPage = response.totalCount === 0
                        ? 1
                        : response.page;
                    if (requestedPage !== this.currentPage) {
                        this.syncUrlState();
                    }
                    this.isLoading = false;
                    this.isRefreshing = false;
                    this.hasLoadedOnce = true;
                    this.changeDetectorRef.markForCheck();
                },
                error: () => {
                    this.cards = [];
                    this.totalCount = 0;
                    this.totalPages = 0;
                    this.currentPage = 1;
                    this.errorMessage =
                        'The Vault Archive could not be loaded.';
                    this.isLoading = false;
                    this.isRefreshing = false;
                    this.hasLoadedOnce = true;
                    this.changeDetectorRef.markForCheck();
                }
            });
    }
    syncUrlState() {
        const queryParams = {};
        this.setStringQuery(queryParams, 'q', this.filters.name);
        this.setStringQuery(queryParams, 'set', this.filters.setCode);
        this.setStringQuery(queryParams, 'type', this.filters.cardType);
        this.setStringQuery(queryParams, 'rarity', this.filters.rarity);
        this.setStringQuery(queryParams, 'colour', this.filters.colour);
        this.setStringQuery(queryParams, 'classification', this.filters.classification);
        this.setStringQuery(queryParams, 'tag', this.filters.tags);
        this.setNumberQuery(queryParams, 'cost', this.filters.cost);
        this.setNumberQuery(queryParams, 'power', this.filters.power);
        this.setNumberQuery(queryParams, 'ram', this.filters.ram);
        this.setNumberQuery(queryParams, 'eddies', this.filters.eddies);
        if (this.sortValue !== 'setOrder-asc') {
            queryParams['sort'] = this.sortValue;
        }
        if (this.currentPage > 1) {
            queryParams['page'] = this.currentPage;
        }
        void this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            replaceUrl: true
        });
    }
    readFiltersFromQuery(queryParams) {
        const sort = queryParams.get('sort');
        let sortBy = 'setOrder';
        let sortDirection = 'asc';
        if (sort === 'name-asc') {
            sortBy = 'name';
        }
        else if (sort === 'name-desc') {
            sortBy = 'name';
            sortDirection = 'desc';
        }
        return {
            name: queryParams.get('q') ?? '',
            setCode: queryParams.get('set') ?? '',
            cardType: queryParams.get('type') ?? '',
            rarity: queryParams.get('rarity') ?? '',
            colour: queryParams.get('colour') ?? '',
            classification: queryParams.get('classification') ?? '',
            tags: queryParams.get('tag') ?? '',
            cost: this.readInteger(queryParams.get('cost')),
            power: this.readInteger(queryParams.get('power')),
            ram: this.readInteger(queryParams.get('ram')),
            eddies: this.readInteger(queryParams.get('eddies')),
            sortBy,
            sortDirection
        };
    }
    hasArchiveQueryState(queryParams) {
        const archiveQueryKeys = [
            'q',
            'set',
            'type',
            'rarity',
            'colour',
            'classification',
            'tag',
            'cost',
            'power',
            'ram',
            'eddies',
            'sort',
            'page'
        ];
        return archiveQueryKeys.some(key => queryParams.has(key));
    }
    getSetLabel(setCode) {
        if (!setCode) {
            return undefined;
        }
        const set = this.filterOptions.sets.find(option => option.code === setCode);
        return set
            ? this.formatSetOption(set)
            : setCode;
    }
    addStringFilter(activeFilters, key, label, value, displayValue = value) {
        if (value?.trim() && displayValue) {
            activeFilters.push({
                key,
                label,
                value: displayValue
            });
        }
    }
    addNumericFilter(activeFilters, key, label, value) {
        if (value !== null && value !== undefined) {
            activeFilters.push({
                key,
                label,
                value: String(value)
            });
        }
    }
    setStringQuery(queryParams, key, value) {
        if (value?.trim()) {
            queryParams[key] = value.trim();
        }
    }
    setNumberQuery(queryParams, key, value) {
        if (value !== null && value !== undefined) {
            queryParams[key] = value;
        }
    }
    readInteger(value) {
        if (value === null || value.trim() === '') {
            return null;
        }
        const numberValue = Number(value);
        return Number.isInteger(numberValue)
            ? numberValue
            : null;
    }
    readPositiveInteger(value) {
        const numberValue = this.readInteger(value);
        return numberValue !== null && numberValue > 0
            ? numberValue
            : null;
    }
    clearSearchDebounce() {
        if (this.searchDebounceTimer === null) {
            return;
        }
        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = null;
    }
    createEmptyFilters() {
        return {
            name: '',
            setCode: '',
            cardType: '',
            rarity: '',
            colour: '',
            classification: '',
            tags: '',
            cost: null,
            power: null,
            ram: null,
            eddies: null,
            sortBy: 'setOrder',
            sortDirection: 'asc'
        };
    }
    createEmptyFilterOptions() {
        return {
            colours: [],
            cardTypes: [],
            tags: [],
            costs: [],
            powers: [],
            ramValues: [],
            eddiesValues: [],
            sets: [],
            rarities: []
        };
    }
    /**
     * Keeps the Archive usable when an older API response omits one of the
     * newer option arrays. No choices are invented.
     */
    normaliseFilterOptions(options) {
        return {
            colours: options.colours ?? [],
            cardTypes: options.cardTypes ?? [],
            tags: options.tags ?? [],
            costs: options.costs ?? [],
            powers: options.powers ?? [],
            ramValues: options.ramValues ?? [],
            eddiesValues: options.eddiesValues ?? [],
            sets: options.sets ?? [],
            rarities: options.rarities ?? []
        };
    }
    /**
     * Rarity belongs to a genuine CardPrinting. If the options response does
     * not yet include rarities, retain meaningful values already returned by
     * the Cards API instead of hard-coding game data or disabling the field.
     */
    mergeVisibleRarities(cards) {
        const rarities = cards
            .map(card => card.rarity?.trim() ?? '')
            .filter(rarity => this.hasMeaningfulValue(rarity));
        if (rarities.length === 0) {
            return;
        }
        this.filterOptions = {
            ...this.filterOptions,
            rarities: [
                ...new Set([
                    ...this.filterOptions.rarities,
                    ...rarities
                ])
            ].sort((left, right) => left.localeCompare(right))
        };
    }
    static ɵfac = function CardCatalogue_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CardCatalogue)(i0.ɵɵdirectiveInject(i1.CardsService), i0.ɵɵdirectiveInject(i2.CardCatalogueStateService), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CardCatalogue, selectors: [["app-card-catalogue"]], decls: 73, vars: 27, consts: [[1, "catalogue-page-shell"], [1, "catalogue-main"], [1, "catalogue-page"], ["aria-hidden", "true", 1, "catalogue-grid"], [1, "container", "catalogue-shell"], [1, "catalogue-header"], [1, "catalogue-header__copy"], [1, "eyebrow"], [1, "catalogue-description"], ["aria-label", "Vault Archive search and filters", 1, "catalogue-tools", 3, "ngSubmit"], [1, "catalogue-tools__primary"], [1, "catalogue-search"], ["for", "archive-search-input", 1, "catalogue-field", "catalogue-field--search"], [1, "catalogue-search__control"], ["id", "archive-search-input", "type", "search", "name", "cardName", "placeholder", "Search cards\u2026", "autocomplete", "off", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "catalogue-search__submit", 3, "disabled"], [1, "catalogue-field", "catalogue-field--primary-filter"], ["name", "setCode", 3, "ngModelChange", "ngModel", "disabled"], ["value", ""], [3, "value"], ["name", "cardType", 3, "ngModelChange", "ngModel", "disabled"], ["name", "rarity", 3, "ngModelChange", "ngModel", "disabled"], ["type", "button", "aria-controls", "archive-more-filters", 1, "catalogue-filter-toggle", "catalogue-filter-toggle--desktop", 3, "click"], ["type", "button", "aria-controls", "archive-more-filters", 1, "catalogue-filter-toggle", "catalogue-filter-toggle--mobile", 3, "click"], ["id", "archive-more-filters", 1, "catalogue-more-filters", 3, "hidden"], [1, "catalogue-field"], ["type", "text", "name", "classification", "placeholder", "Any classification", "autocomplete", "off", 3, "ngModelChange", "change", "ngModel"], ["role", "status", 1, "catalogue-tools__notice"], ["aria-label", "Active Archive filters", 1, "catalogue-active-filters"], ["aria-live", "polite", 1, "catalogue-message"], ["role", "alert", 1, "catalogue-message", "catalogue-message--error"], [1, "catalogue-results"], ["aria-hidden", "true"], ["name", "colour", 3, "ngModelChange", "ngModel"], ["name", "tags", 3, "ngModelChange", "ngModel"], ["name", "cost", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["name", "power", 3, "ngModelChange", "ngModel"], ["name", "ram", 3, "ngModelChange", "ngModel"], ["name", "eddies", 3, "ngModelChange", "ngModel"], [1, "catalogue-active-filters__items"], ["type", "button", 1, "catalogue-active-filter"], ["type", "button", 1, "catalogue-active-filters__clear", 3, "click"], ["type", "button", 1, "catalogue-active-filter", 3, "click"], [1, "catalogue-message__code"], ["type", "button", 1, "catalogue-action", "catalogue-action--secondary", "catalogue-message__action", 3, "click"], ["aria-live", "polite", "aria-atomic", "true", 1, "catalogue-results__rail"], [1, "catalogue-results__summary"], [1, "catalogue-results__updating"], [1, "catalogue-sort"], [3, "ngModelChange", "ngModel"], ["value", "setOrder-asc"], ["value", "name-asc"], ["value", "name-desc"], [1, "card-grid"], [1, "catalogue-card"], ["aria-label", "Vault Archive pages", 1, "catalogue-pagination"], [1, "catalogue-card__link", 3, "click", "routerLink"], [1, "catalogue-card__visual"], ["loading", "lazy", "decoding", "async", 3, "appCardArtwork", "alt"], [1, "catalogue-card__archive-label"], [1, "catalogue-card__metadata"], [1, "catalogue-card__printing"], [1, "catalogue-card__set"], [1, "catalogue-card__variants"], [1, "catalogue-card__number"], [1, "catalogue-pagination__controls"], ["type", "button", "aria-label", "Previous Archive page", 1, "catalogue-pagination__direction", 3, "click", "disabled"], [1, "catalogue-pagination__mobile-status"], [1, "catalogue-pagination__pages"], ["type", "button", 1, "catalogue-pagination__page", 3, "catalogue-pagination__page--current"], ["type", "button", "aria-label", "Next Archive page", 1, "catalogue-pagination__direction", 3, "click", "disabled"], ["type", "button", 1, "catalogue-pagination__page", 3, "click"]], template: function CardCatalogue_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "main", 1)(2, "section", 2);
            i0.ɵɵelement(3, "div", 3);
            i0.ɵɵelementStart(4, "div", 4)(5, "header", 5)(6, "div", 6)(7, "p", 7);
            i0.ɵɵtext(8, " Cards // Choom Vault ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "h1");
            i0.ɵɵtext(10, " Vault ");
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Archive");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p", 8);
            i0.ɵɵtext(14, " Browse every card currently archived in Choom Vault. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "form", 9);
            i0.ɵɵlistener("ngSubmit", function CardCatalogue_Template_form_ngSubmit_15_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementStart(16, "div", 10)(17, "div", 11)(18, "label", 12)(19, "span");
            i0.ɵɵtext(20, "Search cards");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 13)(22, "input", 14);
            i0.ɵɵlistener("ngModelChange", function CardCatalogue_Template_input_ngModelChange_22_listener($event) { return ctx.onSearchChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(23, "button", 15);
            i0.ɵɵtext(24, " Search ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "label", 16)(26, "span");
            i0.ɵɵtext(27, "Set");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "select", 17);
            i0.ɵɵlistener("ngModelChange", function CardCatalogue_Template_select_ngModelChange_28_listener($event) { return ctx.onFilterChange("setCode", $event); });
            i0.ɵɵelementStart(29, "option", 18);
            i0.ɵɵtext(30, "All sets");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(31, CardCatalogue_For_32_Template, 2, 2, "option", 19, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "label", 16)(34, "span");
            i0.ɵɵtext(35, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "select", 20);
            i0.ɵɵlistener("ngModelChange", function CardCatalogue_Template_select_ngModelChange_36_listener($event) { return ctx.onFilterChange("cardType", $event); });
            i0.ɵɵelementStart(37, "option", 18);
            i0.ɵɵtext(38, "All types");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(39, CardCatalogue_For_40_Template, 2, 2, "option", 19, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "label", 16)(42, "span");
            i0.ɵɵtext(43, "Rarity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "select", 21);
            i0.ɵɵlistener("ngModelChange", function CardCatalogue_Template_select_ngModelChange_44_listener($event) { return ctx.onFilterChange("rarity", $event); });
            i0.ɵɵelementStart(45, "option", 18);
            i0.ɵɵtext(46, "All rarities");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(47, CardCatalogue_For_48_Template, 2, 2, "option", 19, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "button", 22);
            i0.ɵɵlistener("click", function CardCatalogue_Template_button_click_49_listener() { return ctx.toggleFilters(); });
            i0.ɵɵtext(50, " More filters ");
            i0.ɵɵconditionalCreate(51, CardCatalogue_Conditional_51_Template, 4, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "button", 23);
            i0.ɵɵlistener("click", function CardCatalogue_Template_button_click_52_listener() { return ctx.toggleFilters(); });
            i0.ɵɵtext(53, " Filters ");
            i0.ɵɵconditionalCreate(54, CardCatalogue_Conditional_54_Template, 4, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "div", 24);
            i0.ɵɵconditionalCreate(56, CardCatalogue_Conditional_56_Template, 8, 1, "label", 25);
            i0.ɵɵelementStart(57, "label", 25)(58, "span");
            i0.ɵɵtext(59, "Classification");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "input", 26);
            i0.ɵɵtwoWayListener("ngModelChange", function CardCatalogue_Template_input_ngModelChange_60_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filters.classification, $event) || (ctx.filters.classification = $event); return $event; });
            i0.ɵɵlistener("change", function CardCatalogue_Template_input_change_60_listener() { return ctx.onClassificationChange(ctx.filters.classification ?? ""); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(61, CardCatalogue_Conditional_61_Template, 8, 1, "label", 25);
            i0.ɵɵconditionalCreate(62, CardCatalogue_Conditional_62_Template, 8, 2, "label", 25);
            i0.ɵɵconditionalCreate(63, CardCatalogue_Conditional_63_Template, 8, 2, "label", 25);
            i0.ɵɵconditionalCreate(64, CardCatalogue_Conditional_64_Template, 8, 2, "label", 25);
            i0.ɵɵconditionalCreate(65, CardCatalogue_Conditional_65_Template, 8, 2, "label", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(66, CardCatalogue_Conditional_66_Template, 2, 0, "p", 27);
            i0.ɵɵconditionalCreate(67, CardCatalogue_Conditional_67_Template, 7, 1, "div", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(68, CardCatalogue_Conditional_68_Template, 7, 0, "div", 29)(69, CardCatalogue_Conditional_69_Template, 9, 0, "div", 30)(70, CardCatalogue_Conditional_70_Template, 7, 0, "div", 29)(71, CardCatalogue_Conditional_71_Template, 5, 0, "div", 29)(72, CardCatalogue_Conditional_72_Template, 21, 7, "div", 31);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵclassProp("catalogue-tools--expanded", ctx.filtersExpanded);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngModel", ctx.filters.name);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isLoading);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.filters.setCode)("disabled", ctx.isFilterOptionsLoading || ctx.filterOptions.sets.length === 0);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.filterOptions.sets);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.filters.cardType)("disabled", ctx.isFilterOptionsLoading || ctx.filterOptions.cardTypes.length === 0);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.filterOptions.cardTypes);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.filters.rarity)("disabled", ctx.isFilterOptionsLoading || ctx.filterOptionsUnavailable);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.filterOptions.rarities);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("catalogue-filter-toggle--active", ctx.hasMoreFiltersActive);
            i0.ɵɵattribute("aria-expanded", ctx.filtersExpanded);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.hasMoreFiltersActive ? 51 : -1);
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-expanded", ctx.filtersExpanded);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.activeFilterCount > 0 ? 54 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("hidden", !ctx.filtersExpanded);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isFilterOptionsLoading && ctx.filterOptions.colours.length > 0 ? 56 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filters.classification);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isFilterOptionsLoading && ctx.filterOptions.tags.length > 0 ? 61 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isFilterOptionsLoading && ctx.filterOptions.costs.length > 0 ? 62 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isFilterOptionsLoading && ctx.filterOptions.powers.length > 0 ? 63 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isFilterOptionsLoading && ctx.filterOptions.ramValues.length > 0 ? 64 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isFilterOptionsLoading && ctx.filterOptions.eddiesValues.length > 0 ? 65 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.filterOptionsUnavailable ? 66 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasActiveFilters ? 67 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading && !ctx.hasLoadedOnce ? 68 : ctx.errorMessage ? 69 : ctx.cards.length === 0 && ctx.hasActiveFilters ? 70 : ctx.cards.length === 0 ? 71 : 72);
        } }, dependencies: [FormsModule, i4.ɵNgNoValidate, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.NgModel, i4.NgForm, RouterLink,
            CardArtworkDirective], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n\n\n\n\n\n\n\n.catalogue-page-shell[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  flex-direction: column;\n  color: var(--colour-text);\n  background: var(--colour-background);\n}\n\n.catalogue-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n}\n\n\n\n\n\n\n\n.catalogue-page[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  overflow: hidden;\n  padding-block: 58px 110px;\n  color: var(--colour-text);\n  background: var(--colour-background);\n}\n\n\n\n\n\n.catalogue-grid[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(rgba(255, 255, 255, 0.016) 1px,\n      transparent 1px),\n    linear-gradient(90deg,\n      rgba(255, 255, 255, 0.016) 1px,\n      transparent 1px);\n  background-size: 58px 58px;\n  mask-image: linear-gradient(to bottom,\n      black,\n      transparent 88%);\n  -webkit-mask-image: linear-gradient(to bottom,\n      black,\n      transparent 88%);\n  pointer-events: none;\n}\n\n.catalogue-shell[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n\n\n\n.catalogue-header[_ngcontent-%COMP%] {\n  padding-bottom: 26px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.catalogue-header__copy[_ngcontent-%COMP%] {\n  max-width: 680px;\n}\n\n.catalogue-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 16px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(3rem, 5vw, 5rem);\n  font-weight: 900;\n  line-height: 0.9;\n  letter-spacing: -0.025em;\n  text-transform: uppercase;\n}\n\n.catalogue-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  color: var(--colour-yellow);\n}\n\n.catalogue-description[_ngcontent-%COMP%] {\n  max-width: 620px;\n  margin: 18px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.96rem;\n  line-height: 1.6;\n}\n\n\n\n\n\n.catalogue-tools[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 16px 18px;\n  background: rgba(255, 255, 255, 0.014);\n  border: 1px solid var(--colour-border);\n}\n\n.catalogue-tools__primary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns:\n    minmax(310px, 2fr)\n    minmax(150px, 1fr)\n    minmax(145px, 0.9fr)\n    minmax(145px, 0.9fr)\n    auto;\n  align-items: end;\n  gap: 12px;\n}\n\n.catalogue-search[_ngcontent-%COMP%], \n.catalogue-field[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.catalogue-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n\n.catalogue-field--search[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.catalogue-field[_ngcontent-%COMP%] > span[_ngcontent-%COMP%], \n.catalogue-sort[_ngcontent-%COMP%] > span[_ngcontent-%COMP%] {\n  color: #aeb6c2;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.055em;\n  text-transform: uppercase;\n}\n\n.catalogue-search__control[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n\n.catalogue-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.catalogue-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.catalogue-sort[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 46px;\n  padding-inline: 13px;\n  color: var(--colour-text);\n  background: #090d13;\n  border: 1px solid var(--colour-border-strong);\n  border-radius: 0;\n  outline: 0;\n  font: inherit;\n}\n\n.catalogue-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.52;\n}\n\n.catalogue-field--search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font-size: 0.98rem;\n}\n\n.catalogue-search__control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border-right: 0;\n}\n\n.catalogue-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #687281;\n}\n\n.catalogue-search__submit[_ngcontent-%COMP%] {\n  min-height: 46px;\n  padding-inline: 22px;\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border: 1px solid var(--colour-yellow);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  transition:\n    background 150ms ease,\n    color 150ms ease,\n    border-color 150ms ease;\n}\n\n.catalogue-search__submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--colour-text);\n  border-color: var(--colour-text);\n}\n\n.catalogue-search__submit[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.52;\n}\n\n.catalogue-filter-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-height: 46px;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  padding-inline: 17px;\n  color: var(--colour-text);\n  background: transparent;\n  border: 1px solid var(--colour-border-strong);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.67rem;\n  font-weight: 800;\n  letter-spacing: 0.065em;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition:\n    color 150ms ease,\n    border-color 150ms ease,\n    background 150ms ease;\n}\n\n.catalogue-filter-toggle[_ngcontent-%COMP%]:hover, \n.catalogue-filter-toggle--active[_ngcontent-%COMP%] {\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-filter-toggle--mobile[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.catalogue-more-filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 12px;\n  margin-top: 15px;\n  padding-top: 15px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.catalogue-more-filters[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n\n.catalogue-tools__notice[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.76rem;\n  line-height: 1.5;\n}\n\n\n\n\n.catalogue-active-filters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-top: 15px;\n  padding-top: 13px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.catalogue-active-filters__items[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n\n.catalogue-active-filter[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-height: 34px;\n  align-items: center;\n  gap: 9px;\n  padding: 6px 9px;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 1px solid var(--colour-border-strong);\n  cursor: pointer;\n  font-size: 0.69rem;\n  letter-spacing: 0.025em;\n  line-height: 1.35;\n  text-transform: uppercase;\n}\n\n.catalogue-active-filter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  font-weight: 800;\n}\n\n.catalogue-active-filter[_ngcontent-%COMP%]:hover {\n  color: var(--colour-text);\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-active-filters__clear[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  min-height: 34px;\n  padding: 0;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-decoration: underline;\n  text-transform: uppercase;\n  text-underline-offset: 4px;\n}\n\n.catalogue-active-filters__clear[_ngcontent-%COMP%]:hover {\n  color: var(--colour-text);\n}\n\n.catalogue-action[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 0 18px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  transition:\n    color 150ms ease,\n    border-color 150ms ease,\n    background 150ms ease;\n}\n\n.catalogue-action--secondary[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  background: transparent;\n  border-color: var(--colour-border-strong);\n}\n\n.catalogue-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.52;\n}\n\n\n\n\n.catalogue-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible, \n.catalogue-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible, \n.catalogue-sort[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible, \n.catalogue-action[_ngcontent-%COMP%]:focus-visible, \n.catalogue-search__submit[_ngcontent-%COMP%]:focus-visible, \n.catalogue-filter-toggle[_ngcontent-%COMP%]:focus-visible, \n.catalogue-active-filter[_ngcontent-%COMP%]:focus-visible, \n.catalogue-active-filters__clear[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--colour-cyan);\n  outline-offset: 2px;\n}\n\n.catalogue-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible, \n.catalogue-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible, \n.catalogue-sort[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible, \n.catalogue-action[_ngcontent-%COMP%]:focus-visible, \n.catalogue-search__submit[_ngcontent-%COMP%]:focus-visible, \n.catalogue-filter-toggle[_ngcontent-%COMP%]:focus-visible, \n.catalogue-active-filter[_ngcontent-%COMP%]:focus-visible {\n  border-color: var(--colour-cyan);\n}\n\n\n\n\n.catalogue-message[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  min-height: 148px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 9px;\n  margin-top: 30px;\n  padding: 30px;\n  background: var(--colour-background-soft);\n  border: 1px solid var(--colour-border-strong);\n}\n\n.catalogue-message[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 0;\n  left: 30px;\n  width: 80px;\n  height: 2px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n.catalogue-message--error[_ngcontent-%COMP%] {\n  border-color: rgba(255, 62, 85, 0.24);\n}\n\n.catalogue-message--error[_ngcontent-%COMP%]::before {\n  background: var(--colour-red);\n}\n\n.catalogue-message__code[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n\n.catalogue-message--error[_ngcontent-%COMP%]   .catalogue-message__code[_ngcontent-%COMP%] {\n  color: var(--colour-red);\n}\n\n.catalogue-message[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  max-width: 720px;\n  font-family: var(--font-display);\n  font-size: clamp(1.4rem, 2.1vw, 1.9rem);\n  line-height: 1.1;\n  text-transform: uppercase;\n}\n\n.catalogue-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n\n.catalogue-message__action[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n\n\n\n.catalogue-results[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n.catalogue-results__rail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 18px;\n  padding-bottom: 11px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.catalogue-results__summary[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 16px;\n}\n\n.catalogue-results__rail[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 800;\n  letter-spacing: 0.055em;\n  text-transform: uppercase;\n}\n\n.catalogue-results__rail[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--colour-text-muted);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n}\n\n.catalogue-results__updating[_ngcontent-%COMP%] {\n  color: var(--colour-cyan) !important;\n}\n\n.catalogue-sort[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 190px;\n  align-items: center;\n  gap: 9px;\n}\n\n.catalogue-sort[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 38px;\n  padding-inline: 10px 30px;\n  font-size: 0.76rem;\n}\n\n\n\n\n.card-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  column-gap: 18px;\n  row-gap: 40px;\n}\n\n.catalogue-card[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.catalogue-card__link[_ngcontent-%COMP%] {\n  display: block;\n  color: inherit;\n  text-decoration: none;\n}\n\n\n\n\n.catalogue-card__visual[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  aspect-ratio: 63 / 90;\n  overflow: hidden;\n  place-items: center;\n  background: #080b10;\n  border: 1px solid var(--colour-border);\n  transition:\n    border-color 160ms ease,\n    transform 160ms ease;\n}\n\n.catalogue-card__visual[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n\n\n\n\n\n@media (hover: hover) and (pointer: fine) {\n  .catalogue-card__link[_ngcontent-%COMP%]:hover   .catalogue-card__visual[_ngcontent-%COMP%] {\n    border-color: var(--colour-yellow);\n    transform: translateY(-3px) scale(1.01);\n  }\n}\n\n\n\n\n\n\n\n.catalogue-card__archive-label[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n  min-height: 94px;\n  padding: 12px 12px 10px;\n  background: rgba(255, 255, 255, 0.022);\n  border-top: 1px solid var(--colour-border);\n}\n\n\n\n\n.catalogue-card__archive-label[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 0;\n  left: 12px;\n  width: 30px;\n  height: 2px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n\n\n\n\n\n\n.catalogue-card__archive-label[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  min-height: 2.35em;\n  overflow: hidden;\n  margin: 0;\n  color: var(--colour-text);\n  font-size: 0.94rem;\n  font-weight: 800;\n  line-height: 1.2;\n  letter-spacing: 0.012em;\n  text-transform: uppercase;\n  -webkit-box-orient: vertical;\n  line-clamp: 2;\n  -webkit-line-clamp: 2;\n}\n\n\n\n\n.catalogue-card__metadata[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-top: 5px;\n  color: var(--colour-text-muted);\n  font-size: 0.72rem;\n  line-height: 1.35;\n}\n\n.catalogue-card__metadata[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n}\n\n.catalogue-card__metadata[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]::before {\n  margin-inline: 7px;\n  color: #737c89;\n  content: \"\u00B7\";\n}\n\n.catalogue-card__number[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 0.67rem;\n  letter-spacing: 0.05em;\n}\n\n\n\n\n.catalogue-card__printing[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n\n.catalogue-card__set[_ngcontent-%COMP%] {\n  overflow: hidden;\n  margin: 0;\n  color: #969eaa;\n  font-size: 0.67rem;\n  line-height: 1.4;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n\n\n\n\n.catalogue-card__variants[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-top: 3px;\n  color: #969eaa;\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.045em;\n  line-height: 1.4;\n  text-transform: uppercase;\n}\n\n.catalogue-card__variants[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n}\n\n.catalogue-card__variants[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]::before {\n  margin-inline: 6px;\n  color: #666f7b;\n  content: \"\u00B7\";\n}\n\n\n\n\n\n\n\n.catalogue-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 48px;\n  padding-top: 22px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.catalogue-pagination__controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.catalogue-pagination__pages[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n\n.catalogue-pagination__mobile-status[_ngcontent-%COMP%] {\n  display: none;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.catalogue-pagination__page[_ngcontent-%COMP%], \n.catalogue-pagination__direction[_ngcontent-%COMP%] {\n  min-height: 44px;\n  color: var(--colour-text-muted);\n  background: rgba(255, 255, 255, 0.025);\n  border: 1px solid var(--colour-border);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  transition:\n    color 160ms ease,\n    background 160ms ease,\n    border-color 160ms ease;\n}\n\n.catalogue-pagination__page[_ngcontent-%COMP%] {\n  min-width: 44px;\n  padding-inline: 12px;\n}\n\n.catalogue-pagination__direction[_ngcontent-%COMP%] {\n  padding-inline: 16px;\n}\n\n.catalogue-pagination__page[_ngcontent-%COMP%]:hover:not(:disabled), \n.catalogue-pagination__direction[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-pagination__page--current[_ngcontent-%COMP%] {\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-pagination__page[_ngcontent-%COMP%]:focus-visible, \n.catalogue-pagination__direction[_ngcontent-%COMP%]:focus-visible {\n  border-color: var(--colour-cyan);\n  outline: 2px solid var(--colour-cyan);\n  outline-offset: 3px;\n}\n\n.catalogue-pagination__direction[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.4;\n}\n\n\n\n\n@media (max-width: 1220px) {\n  .catalogue-tools__primary[_ngcontent-%COMP%] {\n    grid-template-columns:\n      repeat(3, minmax(145px, 1fr)) auto;\n  }\n\n  .catalogue-search[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n  }\n\n  .catalogue-more-filters[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .card-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n\n\n\n@media (max-width: 820px) {\n  .catalogue-page[_ngcontent-%COMP%] {\n    padding-block: 52px 86px;\n  }\n\n  .catalogue-header[_ngcontent-%COMP%] {\n    padding-bottom: 24px;\n  }\n\n  .catalogue-tools__primary[_ngcontent-%COMP%], \n   .catalogue-more-filters[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .catalogue-search[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n  }\n\n  .catalogue-filter-toggle--desktop[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .catalogue-results__rail[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  .catalogue-sort[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 300px;\n  }\n\n  .card-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    row-gap: 36px;\n  }\n\n  .catalogue-pagination[_ngcontent-%COMP%] {\n    justify-content: center;\n    margin-top: 42px;\n  }\n}\n\n\n\n\n@media (max-width: 620px) {\n  .catalogue-page[_ngcontent-%COMP%] {\n    padding-block: 42px 70px;\n  }\n\n  .catalogue-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(3rem, 15vw, 4.35rem);\n  }\n\n  .catalogue-description[_ngcontent-%COMP%] {\n    margin-top: 15px;\n    font-size: 0.92rem;\n  }\n\n  .catalogue-tools[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n\n  .catalogue-tools__primary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .catalogue-search[_ngcontent-%COMP%] {\n    grid-column: auto;\n    order: 1;\n  }\n\n  .catalogue-search__control[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .catalogue-search__control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    border-right: 1px solid var(--colour-border-strong);\n  }\n\n  .catalogue-search__submit[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-top: 8px;\n  }\n\n  .catalogue-field--primary-filter[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .catalogue-tools--expanded[_ngcontent-%COMP%]   .catalogue-field--primary-filter[_ngcontent-%COMP%] {\n    display: flex;\n    order: 3;\n  }\n\n  .catalogue-filter-toggle--desktop[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .catalogue-filter-toggle--mobile[_ngcontent-%COMP%] {\n    display: inline-flex;\n    width: 100%;\n    order: 2;\n  }\n\n  .catalogue-more-filters[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    margin-top: 12px;\n  }\n\n  .catalogue-active-filters[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n    gap: 10px;\n  }\n\n  .catalogue-active-filters__items[_ngcontent-%COMP%], \n   .catalogue-active-filter[_ngcontent-%COMP%], \n   .catalogue-active-filters__clear[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .catalogue-active-filters__items[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .catalogue-active-filter[_ngcontent-%COMP%] {\n    justify-content: space-between;\n    text-align: left;\n  }\n\n  .catalogue-active-filters__clear[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    text-align: left;\n  }\n\n  .catalogue-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .card-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    row-gap: 34px;\n  }\n\n  .catalogue-card__archive-label[_ngcontent-%COMP%] {\n    min-height: 0;\n  }\n\n  .catalogue-card__archive-label[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n\n  .catalogue-card__metadata[_ngcontent-%COMP%] {\n    font-size: 0.74rem;\n  }\n\n  .catalogue-message[_ngcontent-%COMP%] {\n    min-height: 142px;\n    padding: 26px 22px;\n  }\n\n  .catalogue-pagination[_ngcontent-%COMP%] {\n    justify-content: stretch;\n  }\n\n  .catalogue-pagination__controls[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n\n  .catalogue-pagination__direction[_ngcontent-%COMP%] {\n    flex: 1;\n    padding-inline: 12px;\n  }\n\n  .catalogue-pagination__pages[_ngcontent-%COMP%] {\n    order: 3;\n    width: 100%;\n    justify-content: center;\n    margin-top: 4px;\n  }\n}\n\n\n\n\n@media (max-width: 560px) {\n  .catalogue-pagination__controls[_ngcontent-%COMP%] {\n    flex-wrap: nowrap;\n  }\n\n  .catalogue-pagination__pages[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .catalogue-pagination__mobile-status[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    padding-inline: 8px;\n  }\n\n  .catalogue-pagination__direction[_ngcontent-%COMP%] {\n    min-width: 0;\n    font-size: 0.62rem;\n  }\n}\n\n@media (max-width: 420px) {\n  .catalogue-pagination__mobile-status[_ngcontent-%COMP%] {\n    padding-inline: 4px;\n    font-size: 0.6rem;\n  }\n}\n\n\n\n\n@media (prefers-reduced-motion: reduce) {\n\n  .catalogue-card__visual[_ngcontent-%COMP%], \n   .catalogue-search__submit[_ngcontent-%COMP%], \n   .catalogue-filter-toggle[_ngcontent-%COMP%], \n   .catalogue-active-filter[_ngcontent-%COMP%], \n   .catalogue-action[_ngcontent-%COMP%], \n   .catalogue-pagination__page[_ngcontent-%COMP%], \n   .catalogue-pagination__direction[_ngcontent-%COMP%] {\n    transition: none;\n  }\n\n  .catalogue-card__link[_ngcontent-%COMP%]:hover   .catalogue-card__visual[_ngcontent-%COMP%] {\n    transform: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CardCatalogue, [{
        type: Component,
        args: [{ selector: 'app-card-catalogue', standalone: true, imports: [
                    FormsModule,
                    RouterLink,
                    CardArtworkDirective
                ], template: "<div class=\"catalogue-page-shell\">\n\n  <main class=\"catalogue-main\">\n    <section class=\"catalogue-page\">\n      <div class=\"catalogue-grid\" aria-hidden=\"true\"></div>\n\n      <div class=\"container catalogue-shell\">\n\n        <!-- Vault Archive introduction -->\n        <header class=\"catalogue-header\">\n          <div class=\"catalogue-header__copy\">\n            <p class=\"eyebrow\">\n              Cards // Choom Vault\n            </p>\n\n            <h1>\n              Vault\n              <span>Archive</span>\n            </h1>\n\n            <p class=\"catalogue-description\">\n              Browse every card currently archived in Choom Vault.\n            </p>\n          </div>\n        </header>\n\n        <!-- Search and filters -->\n        <form\n          class=\"catalogue-tools\"\n          [class.catalogue-tools--expanded]=\"filtersExpanded\"\n          (ngSubmit)=\"applyFilters()\"\n          aria-label=\"Vault Archive search and filters\"\n        >\n          <div class=\"catalogue-tools__primary\">\n            <!-- Search remains the dominant Archive control. -->\n            <div class=\"catalogue-search\">\n              <label class=\"catalogue-field catalogue-field--search\" for=\"archive-search-input\">\n                <span>Search cards</span>\n\n                <div class=\"catalogue-search__control\">\n                  <input\n                    id=\"archive-search-input\"\n                    type=\"search\"\n                    name=\"cardName\"\n                    [ngModel]=\"filters.name\"\n                    (ngModelChange)=\"onSearchChange($event)\"\n                    placeholder=\"Search cards\u2026\"\n                    autocomplete=\"off\"\n                  />\n\n                  <button class=\"catalogue-search__submit\" type=\"submit\" [disabled]=\"isLoading\">\n                    Search\n                  </button>\n                </div>\n              </label>\n            </div>\n\n            <label class=\"catalogue-field catalogue-field--primary-filter\">\n              <span>Set</span>\n              <select\n                name=\"setCode\"\n                [ngModel]=\"filters.setCode\"\n                (ngModelChange)=\"onFilterChange('setCode', $event)\"\n                [disabled]=\"isFilterOptionsLoading || filterOptions.sets.length === 0\"\n              >\n                <option value=\"\">All sets</option>\n                @for (set of filterOptions.sets; track set.code) {\n                <option [value]=\"set.code\">{{ formatSetOption(set) }}</option>\n                }\n              </select>\n            </label>\n\n            <label class=\"catalogue-field catalogue-field--primary-filter\">\n              <span>Type</span>\n              <select\n                name=\"cardType\"\n                [ngModel]=\"filters.cardType\"\n                (ngModelChange)=\"onFilterChange('cardType', $event)\"\n                [disabled]=\"isFilterOptionsLoading || filterOptions.cardTypes.length === 0\"\n              >\n                <option value=\"\">All types</option>\n                @for (cardType of filterOptions.cardTypes; track cardType) {\n                <option [value]=\"cardType\">{{ cardType }}</option>\n                }\n              </select>\n            </label>\n\n            <label class=\"catalogue-field catalogue-field--primary-filter\">\n              <span>Rarity</span>\n              <select\n                name=\"rarity\"\n                [ngModel]=\"filters.rarity\"\n                (ngModelChange)=\"onFilterChange('rarity', $event)\"\n                [disabled]=\"isFilterOptionsLoading || filterOptionsUnavailable\"\n              >\n                <option value=\"\">All rarities</option>\n                @for (rarity of filterOptions.rarities; track rarity) {\n                <option [value]=\"rarity\">{{ rarity }}</option>\n                }\n              </select>\n            </label>\n\n            <button\n              class=\"catalogue-filter-toggle catalogue-filter-toggle--desktop\"\n              [class.catalogue-filter-toggle--active]=\"hasMoreFiltersActive\"\n              type=\"button\"\n              (click)=\"toggleFilters()\"\n              [attr.aria-expanded]=\"filtersExpanded\"\n              aria-controls=\"archive-more-filters\"\n            >\n              More filters\n              @if (hasMoreFiltersActive) {\n              <span aria-hidden=\"true\">\u00B7</span>\n              <span>{{ activeMoreFilterCount }}</span>\n              }\n            </button>\n\n            <button\n              class=\"catalogue-filter-toggle catalogue-filter-toggle--mobile\"\n              type=\"button\"\n              (click)=\"toggleFilters()\"\n              [attr.aria-expanded]=\"filtersExpanded\"\n              aria-controls=\"archive-more-filters\"\n            >\n              Filters\n              @if (activeFilterCount > 0) {\n              <span aria-hidden=\"true\">\u00B7</span>\n              <span>{{ activeFilterCount }}</span>\n              }\n            </button>\n          </div>\n\n          <div\n            id=\"archive-more-filters\"\n            class=\"catalogue-more-filters\"\n            [hidden]=\"!filtersExpanded\"\n          >\n            @if (!isFilterOptionsLoading && filterOptions.colours.length > 0) {\n            <label class=\"catalogue-field\">\n              <span>Colour</span>\n              <select\n                name=\"colour\"\n                [ngModel]=\"filters.colour\"\n                (ngModelChange)=\"onFilterChange('colour', $event)\"\n              >\n                <option value=\"\">All colours</option>\n                @for (colour of filterOptions.colours; track colour) {\n                <option [value]=\"colour\">{{ colour }}</option>\n                }\n              </select>\n            </label>\n            }\n\n            <label class=\"catalogue-field\">\n              <span>Classification</span>\n              <input\n                type=\"text\"\n                name=\"classification\"\n                [(ngModel)]=\"filters.classification\"\n                (change)=\"onClassificationChange(filters.classification ?? '')\"\n                placeholder=\"Any classification\"\n                autocomplete=\"off\"\n              />\n            </label>\n\n            @if (!isFilterOptionsLoading && filterOptions.tags.length > 0) {\n            <label class=\"catalogue-field\">\n              <span>Tags</span>\n              <select\n                name=\"tags\"\n                [ngModel]=\"filters.tags\"\n                (ngModelChange)=\"onFilterChange('tags', $event)\"\n              >\n                <option value=\"\">All tags</option>\n                @for (tag of filterOptions.tags; track tag) {\n                <option [value]=\"tag\">{{ tag }}</option>\n                }\n              </select>\n            </label>\n            }\n\n            @if (!isFilterOptionsLoading && filterOptions.costs.length > 0) {\n            <label class=\"catalogue-field\">\n              <span>Cost</span>\n              <select\n                name=\"cost\"\n                [ngModel]=\"filters.cost\"\n                (ngModelChange)=\"onFilterChange('cost', $event)\"\n              >\n                <option [ngValue]=\"null\">Any cost</option>\n                @for (cost of filterOptions.costs; track cost) {\n                <option [ngValue]=\"cost\">{{ cost }}</option>\n                }\n              </select>\n            </label>\n            }\n\n            @if (!isFilterOptionsLoading && filterOptions.powers.length > 0) {\n            <label class=\"catalogue-field\">\n              <span>Power</span>\n              <select\n                name=\"power\"\n                [ngModel]=\"filters.power\"\n                (ngModelChange)=\"onFilterChange('power', $event)\"\n              >\n                <option [ngValue]=\"null\">Any power</option>\n                @for (power of filterOptions.powers; track power) {\n                <option [ngValue]=\"power\">{{ power }}</option>\n                }\n              </select>\n            </label>\n            }\n\n            @if (!isFilterOptionsLoading && filterOptions.ramValues.length > 0) {\n            <label class=\"catalogue-field\">\n              <span>RAM</span>\n              <select\n                name=\"ram\"\n                [ngModel]=\"filters.ram\"\n                (ngModelChange)=\"onFilterChange('ram', $event)\"\n              >\n                <option [ngValue]=\"null\">Any RAM</option>\n                @for (ram of filterOptions.ramValues; track ram) {\n                <option [ngValue]=\"ram\">{{ ram }}</option>\n                }\n              </select>\n            </label>\n            }\n\n            @if (!isFilterOptionsLoading && filterOptions.eddiesValues.length > 0) {\n            <label class=\"catalogue-field\">\n              <span>Eddies</span>\n              <select\n                name=\"eddies\"\n                [ngModel]=\"filters.eddies\"\n                (ngModelChange)=\"onFilterChange('eddies', $event)\"\n              >\n                <option [ngValue]=\"null\">Any Eddies</option>\n                @for (eddies of filterOptions.eddiesValues; track eddies) {\n                <option [ngValue]=\"eddies\">{{ eddies }}</option>\n                }\n              </select>\n            </label>\n            }\n          </div>\n\n          @if (filterOptionsUnavailable) {\n          <p class=\"catalogue-tools__notice\" role=\"status\">\n            Filter choices are temporarily unavailable. Search and Classification remain available.\n          </p>\n          }\n\n          @if (hasActiveFilters) {\n          <div class=\"catalogue-active-filters\" aria-label=\"Active Archive filters\">\n            <div class=\"catalogue-active-filters__items\">\n              @if (hasSearchQuery) {\n              <button\n                class=\"catalogue-active-filter\"\n                type=\"button\"\n                (click)=\"clearSearch()\"\n                [attr.aria-label]=\"'Clear card search ' + filters.name\"\n              >\n                <span><strong>Search:</strong> {{ filters.name }}</span>\n                <span aria-hidden=\"true\">\u00D7</span>\n              </button>\n              }\n\n              @for (filter of activeFilters; track filter.key) {\n              <button\n                class=\"catalogue-active-filter\"\n                type=\"button\"\n                (click)=\"removeFilter(filter.key)\"\n                [attr.aria-label]=\"'Remove ' + filter.label + ' filter ' + filter.value\"\n              >\n                <span><strong>{{ filter.label }}:</strong> {{ filter.value }}</span>\n                <span aria-hidden=\"true\">\u00D7</span>\n              </button>\n              }\n            </div>\n\n            <button\n              class=\"catalogue-active-filters__clear\"\n              type=\"button\"\n              (click)=\"clearFilters()\"\n            >\n              Clear filters\n            </button>\n          </div>\n          }\n        </form>\n\n        <!-- Loading -->\n        @if (isLoading && !hasLoadedOnce) {\n        <div class=\"catalogue-message\" aria-live=\"polite\">\n          <span class=\"catalogue-message__code\">\n            Loading\n          </span>\n\n          <strong>\n            Loading cards\n          </strong>\n\n          <p>\n            Preparing the Vault Archive.\n          </p>\n        </div>\n        }\n\n        <!-- Error -->\n        @else if (errorMessage) {\n        <div class=\"catalogue-message catalogue-message--error\" role=\"alert\">\n          <span class=\"catalogue-message__code\">\n            Vault Archive unavailable\n          </span>\n\n          <strong>\n            Couldn't load the cards\n          </strong>\n\n          <p>\n            Try again in a moment.\n          </p>\n\n          <button class=\"\n                catalogue-action\n                catalogue-action--secondary\n                catalogue-message__action\n              \" type=\"button\" (click)=\"retryLoad()\">\n            Try again\n          </button>\n        </div>\n        }\n\n        <!-- No matches -->\n        @else if (\n        cards.length === 0 &&\n        hasActiveFilters\n        ) {\n        <div class=\"catalogue-message\" aria-live=\"polite\">\n          <span class=\"catalogue-message__code\">\n            No matches\n          </span>\n\n          <strong>No cards match these filters.</strong>\n\n          <button class=\"\n                catalogue-action\n                catalogue-action--secondary\n                catalogue-message__action\n              \" type=\"button\" (click)=\"clearFilters()\">\n            Clear filters\n          </button>\n        </div>\n        }\n\n        <!-- Genuine empty Archive -->\n        @else if (cards.length === 0) {\n        <div class=\"catalogue-message\" aria-live=\"polite\">\n          <span class=\"catalogue-message__code\">\n            Vault Archive\n          </span>\n\n          <strong>\n            No cards are currently available.\n          </strong>\n        </div>\n        }\n\n        <!-- Results -->\n        @else {\n        <div class=\"catalogue-results\">\n\n          <!-- Authoritative results rail -->\n          <div\n            class=\"catalogue-results__rail\"\n            aria-live=\"polite\"\n            aria-atomic=\"true\"\n            [attr.aria-busy]=\"isRefreshing\"\n          >\n            <div class=\"catalogue-results__summary\">\n              <strong>\n                {{ totalCount }}\n                {{ totalCount === 1 ? 'card' : 'cards' }}\n              </strong>\n\n              @if (totalPages > 1) {\n              <span>Page {{ currentPage }} of {{ totalPages }}</span>\n              }\n\n              @if (isRefreshing) {\n              <span class=\"catalogue-results__updating\">Updating\u2026</span>\n              }\n            </div>\n\n            <label class=\"catalogue-sort\">\n              <span>Sort</span>\n              <select [ngModel]=\"sortValue\" (ngModelChange)=\"onSortChange($event)\">\n                <option value=\"setOrder-asc\">Set order</option>\n                <option value=\"name-asc\">Card name A\u2013Z</option>\n                <option value=\"name-desc\">Card name Z\u2013A</option>\n              </select>\n            </label>\n          </div>\n\n          <!-- Artwork-first Archive grid -->\n          <div class=\"card-grid\">\n\n            @for (card of cards; track card.id) {\n\n            <article class=\"catalogue-card\">\n              <a\n                class=\"catalogue-card__link\"\n                [routerLink]=\"['/cards', card.id]\"\n                [attr.aria-label]=\"'Inspect ' + card.name\"\n                (click)=\"rememberArchiveState()\"\n              >\n                <!-- Physical card artwork + GHOST SIGNAL fallback -->\n                <div class=\"catalogue-card__visual\">\n                  <img [appCardArtwork]=\"card.imageUrl\" [alt]=\"card.name\" loading=\"lazy\" decoding=\"async\" />\n                </div>\n\n                <!-- Archive Label -->\n                <div class=\"catalogue-card__archive-label\">\n\n                <!-- Level 1: Card Name -->\n                <h2>\n                  {{ card.name }}\n                </h2>\n\n                <!-- Level 2: Collector identity -->\n                @if (\n                hasMeaningfulValue(card.cardType) ||\n                hasMeaningfulValue(card.classification) ||\n                hasMeaningfulValue(card.rarity) ||\n                hasMeaningfulValue(card.cardNumber)\n                ) {\n                <div class=\"catalogue-card__metadata\">\n\n                  @if (\n                  hasMeaningfulValue(card.cardType)\n                  ) {\n                  <span>\n                    {{ card.cardType }}\n                  </span>\n                  } @else if (\n                  hasMeaningfulValue(card.classification)\n                  ) {\n                  <span>\n                    {{ card.classification }}\n                  </span>\n                  }\n\n                  @if (\n                  hasMeaningfulValue(card.rarity)\n                  ) {\n                  <span>\n                    {{ card.rarity }}\n                  </span>\n                  }\n\n                  @if (\n                  hasMeaningfulValue(card.cardNumber)\n                  ) {\n                  <span class=\"catalogue-card__number\">\n                    {{ card.cardNumber }}\n                  </span>\n                  }\n\n                </div>\n                }\n\n                <!-- Level 3: Set / printing information -->\n                <div class=\"catalogue-card__printing\">\n\n                  @if (\n                  hasMeaningfulValue(card.setName)\n                  ) {\n                  <p class=\"catalogue-card__set\">\n                    {{ card.setName }}\n                  </p>\n                  }\n\n                  @if (\n                  card.hasBetaSymbol ||\n                  card.isKickstarterVersion ||\n                  card.isRetailVersion ||\n                  card.isFoil ||\n                  card.isAltArt ||\n                  card.isBoxTopper ||\n                  card.isPromo ||\n                  card.isStarterDeckExclusive\n                  ) {\n                  <div class=\"catalogue-card__variants\">\n\n                    @if (card.isFoil) {\n                    <span>Foil</span>\n                    }\n\n                    @if (card.isAltArt) {\n                    <span>Alt Art</span>\n                    }\n\n                    @if (card.isKickstarterVersion) {\n                    <span>Kickstarter</span>\n                    }\n\n                    @if (card.isPromo) {\n                    <span>Promo</span>\n                    }\n\n                    @if (card.isBoxTopper) {\n                    <span>Box Topper</span>\n                    }\n\n                    @if (card.isStarterDeckExclusive) {\n                    <span>\n                      Starter Deck Exclusive\n                    </span>\n                    }\n\n                    @if (card.hasBetaSymbol) {\n                    <span>Beta</span>\n                    }\n\n                    @if (card.isRetailVersion) {\n                    <span>Retail</span>\n                    }\n\n                  </div>\n                  }\n\n                </div>\n\n                </div>\n              </a>\n            </article>\n            }\n\n          </div>\n\n          <!-- Functional pagination -->\n          @if (totalPages > 1) {\n          <nav class=\"catalogue-pagination\" aria-label=\"Vault Archive pages\">\n            <div class=\"catalogue-pagination__controls\">\n\n              <button class=\"catalogue-pagination__direction\" type=\"button\" (click)=\"previousPage()\"\n                [disabled]=\"currentPage === 1\" aria-label=\"Previous Archive page\">\n                Previous\n              </button>\n\n              <span class=\"catalogue-pagination__mobile-status\">\n                Page {{ currentPage }} of {{ totalPages }}\n              </span>\n\n              <div class=\"catalogue-pagination__pages\">\n                @for (\n                page of visiblePageNumbers;\n                track page\n                ) {\n                <button class=\"catalogue-pagination__page\" [class.catalogue-pagination__page--current]=\"\n                          page === currentPage\n                        \" type=\"button\" (click)=\"goToPage(page)\" [attr.aria-current]=\"\n                          page === currentPage\n                            ? 'page'\n                            : null\n                        \" [attr.aria-label]=\"\n                          'Go to Archive page ' + page\n                        \">\n                  {{ page }}\n                </button>\n                }\n              </div>\n\n              <button class=\"catalogue-pagination__direction\" type=\"button\" (click)=\"nextPage()\"\n                [disabled]=\"currentPage === totalPages\" aria-label=\"Next Archive page\">\n                Next\n              </button>\n\n            </div>\n          </nav>\n          }\n\n        </div>\n        }\n\n      </div>\n    </section>\n  </main>\n</div>\n", styles: [":host {\n  display: block;\n}\n\n/*\n * Global Catalogue page shell.\n *\n * Header, Archive and footer remain in normal document flow.\n * The main area grows when there are few or zero results so the footer\n * remains naturally positioned at the bottom of the viewport.\n */\n.catalogue-page-shell {\n  display: flex;\n  min-height: 100vh;\n  flex-direction: column;\n  color: var(--colour-text);\n  background: var(--colour-background);\n}\n\n.catalogue-main {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n}\n\n/*\n * Vault Archive surface.\n *\n * The shared page shell now owns viewport height, so this section no longer\n * needs its own min-height: 100vh.\n */\n.catalogue-page {\n  position: relative;\n  flex: 1;\n  overflow: hidden;\n  padding-block: 58px 110px;\n  color: var(--colour-text);\n  background: var(--colour-background);\n}\n\n/*\n * Quiet archive structure.\n * Physical card artwork remains the primary source of colour.\n */\n.catalogue-grid {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(rgba(255, 255, 255, 0.016) 1px,\n      transparent 1px),\n    linear-gradient(90deg,\n      rgba(255, 255, 255, 0.016) 1px,\n      transparent 1px);\n  background-size: 58px 58px;\n  mask-image: linear-gradient(to bottom,\n      black,\n      transparent 88%);\n  -webkit-mask-image: linear-gradient(to bottom,\n      black,\n      transparent 88%);\n  pointer-events: none;\n}\n\n.catalogue-shell {\n  position: relative;\n  z-index: 1;\n}\n\n/*\n * Utility-page introduction.\n */\n.catalogue-header {\n  padding-bottom: 26px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.catalogue-header__copy {\n  max-width: 680px;\n}\n\n.catalogue-header h1 {\n  margin: 16px 0 0;\n  font-family: var(--font-display);\n  font-size: clamp(3rem, 5vw, 5rem);\n  font-weight: 900;\n  line-height: 0.9;\n  letter-spacing: -0.025em;\n  text-transform: uppercase;\n}\n\n.catalogue-header h1 span {\n  display: block;\n  margin-top: 8px;\n  color: var(--colour-yellow);\n}\n\n.catalogue-description {\n  max-width: 620px;\n  margin: 18px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.96rem;\n  line-height: 1.6;\n}\n\n/*\n * Restrained Archive tools. Search keeps the most room while the three\n * primary collector filters and More Filters remain in one quiet row.\n */\n.catalogue-tools {\n  margin-top: 20px;\n  padding: 16px 18px;\n  background: rgba(255, 255, 255, 0.014);\n  border: 1px solid var(--colour-border);\n}\n\n.catalogue-tools__primary {\n  display: grid;\n  grid-template-columns:\n    minmax(310px, 2fr)\n    minmax(150px, 1fr)\n    minmax(145px, 0.9fr)\n    minmax(145px, 0.9fr)\n    auto;\n  align-items: end;\n  gap: 12px;\n}\n\n.catalogue-search,\n.catalogue-field {\n  min-width: 0;\n}\n\n.catalogue-field {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n\n.catalogue-field--search {\n  width: 100%;\n}\n\n.catalogue-field>span,\n.catalogue-sort>span {\n  color: #aeb6c2;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.055em;\n  text-transform: uppercase;\n}\n\n.catalogue-search__control {\n  display: flex;\n  width: 100%;\n}\n\n.catalogue-field input,\n.catalogue-field select,\n.catalogue-sort select {\n  width: 100%;\n  min-height: 46px;\n  padding-inline: 13px;\n  color: var(--colour-text);\n  background: #090d13;\n  border: 1px solid var(--colour-border-strong);\n  border-radius: 0;\n  outline: 0;\n  font: inherit;\n}\n\n.catalogue-field select:disabled {\n  cursor: not-allowed;\n  opacity: 0.52;\n}\n\n.catalogue-field--search input {\n  font-size: 0.98rem;\n}\n\n.catalogue-search__control input {\n  flex: 1;\n  min-width: 0;\n  border-right: 0;\n}\n\n.catalogue-field input::placeholder {\n  color: #687281;\n}\n\n.catalogue-search__submit {\n  min-height: 46px;\n  padding-inline: 22px;\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border: 1px solid var(--colour-yellow);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  transition:\n    background 150ms ease,\n    color 150ms ease,\n    border-color 150ms ease;\n}\n\n.catalogue-search__submit:hover:not(:disabled) {\n  background: var(--colour-text);\n  border-color: var(--colour-text);\n}\n\n.catalogue-search__submit:disabled {\n  cursor: not-allowed;\n  opacity: 0.52;\n}\n\n.catalogue-filter-toggle {\n  display: inline-flex;\n  min-height: 46px;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  padding-inline: 17px;\n  color: var(--colour-text);\n  background: transparent;\n  border: 1px solid var(--colour-border-strong);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.67rem;\n  font-weight: 800;\n  letter-spacing: 0.065em;\n  text-transform: uppercase;\n  white-space: nowrap;\n  transition:\n    color 150ms ease,\n    border-color 150ms ease,\n    background 150ms ease;\n}\n\n.catalogue-filter-toggle:hover,\n.catalogue-filter-toggle--active {\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-filter-toggle--mobile {\n  display: none;\n}\n\n.catalogue-more-filters {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 12px;\n  margin-top: 15px;\n  padding-top: 15px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.catalogue-more-filters[hidden] {\n  display: none;\n}\n\n.catalogue-tools__notice {\n  margin: 12px 0 0;\n  color: var(--colour-text-muted);\n  font-size: 0.76rem;\n  line-height: 1.5;\n}\n\n/*\n * Active filters are compact removable records, not coloured pills.\n */\n.catalogue-active-filters {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-top: 15px;\n  padding-top: 13px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.catalogue-active-filters__items {\n  display: flex;\n  min-width: 0;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n\n.catalogue-active-filter {\n  display: inline-flex;\n  min-height: 34px;\n  align-items: center;\n  gap: 9px;\n  padding: 6px 9px;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 1px solid var(--colour-border-strong);\n  cursor: pointer;\n  font-size: 0.69rem;\n  letter-spacing: 0.025em;\n  line-height: 1.35;\n  text-transform: uppercase;\n}\n\n.catalogue-active-filter strong {\n  color: var(--colour-text);\n  font-weight: 800;\n}\n\n.catalogue-active-filter:hover {\n  color: var(--colour-text);\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-active-filters__clear {\n  flex: 0 0 auto;\n  min-height: 34px;\n  padding: 0;\n  color: var(--colour-text-muted);\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-decoration: underline;\n  text-transform: uppercase;\n  text-underline-offset: 4px;\n}\n\n.catalogue-active-filters__clear:hover {\n  color: var(--colour-text);\n}\n\n.catalogue-action {\n  min-height: 44px;\n  padding: 0 18px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  transition:\n    color 150ms ease,\n    border-color 150ms ease,\n    background 150ms ease;\n}\n\n.catalogue-action--secondary {\n  color: var(--colour-text);\n  background: transparent;\n  border-color: var(--colour-border-strong);\n}\n\n.catalogue-action:hover:not(:disabled) {\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-action:disabled {\n  cursor: not-allowed;\n  opacity: 0.52;\n}\n\n/*\n * Established cyan keyboard focus.\n */\n.catalogue-field input:focus-visible,\n.catalogue-field select:focus-visible,\n.catalogue-sort select:focus-visible,\n.catalogue-action:focus-visible,\n.catalogue-search__submit:focus-visible,\n.catalogue-filter-toggle:focus-visible,\n.catalogue-active-filter:focus-visible,\n.catalogue-active-filters__clear:focus-visible {\n  outline: 2px solid var(--colour-cyan);\n  outline-offset: 2px;\n}\n\n.catalogue-field input:focus-visible,\n.catalogue-field select:focus-visible,\n.catalogue-sort select:focus-visible,\n.catalogue-action:focus-visible,\n.catalogue-search__submit:focus-visible,\n.catalogue-filter-toggle:focus-visible,\n.catalogue-active-filter:focus-visible {\n  border-color: var(--colour-cyan);\n}\n\n/*\n * Loading, error and empty states.\n */\n.catalogue-message {\n  position: relative;\n  display: flex;\n  min-height: 148px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 9px;\n  margin-top: 30px;\n  padding: 30px;\n  background: var(--colour-background-soft);\n  border: 1px solid var(--colour-border-strong);\n}\n\n.catalogue-message::before {\n  position: absolute;\n  top: 0;\n  left: 30px;\n  width: 80px;\n  height: 2px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n.catalogue-message--error {\n  border-color: rgba(255, 62, 85, 0.24);\n}\n\n.catalogue-message--error::before {\n  background: var(--colour-red);\n}\n\n.catalogue-message__code {\n  color: var(--colour-text-muted);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n\n.catalogue-message--error .catalogue-message__code {\n  color: var(--colour-red);\n}\n\n.catalogue-message strong {\n  max-width: 720px;\n  font-family: var(--font-display);\n  font-size: clamp(1.4rem, 2.1vw, 1.9rem);\n  line-height: 1.1;\n  text-transform: uppercase;\n}\n\n.catalogue-message p {\n  margin: 0;\n  color: var(--colour-text-muted);\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n\n.catalogue-message__action {\n  margin-top: 8px;\n}\n\n/*\n * One authoritative results rail.\n */\n.catalogue-results {\n  margin-top: 30px;\n}\n\n.catalogue-results__rail {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 18px;\n  padding-bottom: 11px;\n  border-bottom: 1px solid var(--colour-border);\n}\n\n.catalogue-results__summary {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 16px;\n}\n\n.catalogue-results__rail strong {\n  color: var(--colour-text);\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 800;\n  letter-spacing: 0.055em;\n  text-transform: uppercase;\n}\n\n.catalogue-results__rail span {\n  color: var(--colour-text-muted);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.075em;\n  text-transform: uppercase;\n}\n\n.catalogue-results__updating {\n  color: var(--colour-cyan) !important;\n}\n\n.catalogue-sort {\n  display: flex;\n  min-width: 190px;\n  align-items: center;\n  gap: 9px;\n}\n\n.catalogue-sort select {\n  min-height: 38px;\n  padding-inline: 10px 30px;\n  font-size: 0.76rem;\n}\n\n/*\n * Artwork-first Archive grid.\n */\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  column-gap: 18px;\n  row-gap: 40px;\n}\n\n.catalogue-card {\n  min-width: 0;\n}\n\n.catalogue-card__link {\n  display: block;\n  color: inherit;\n  text-decoration: none;\n}\n\n/*\n * Physical trading card.\n */\n.catalogue-card__visual {\n  display: grid;\n  width: 100%;\n  aspect-ratio: 63 / 90;\n  overflow: hidden;\n  place-items: center;\n  background: #080b10;\n  border: 1px solid var(--colour-border);\n  transition:\n    border-color 160ms ease,\n    transform 160ms ease;\n}\n\n.catalogue-card__visual img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n/*\n * Restrained physical-card inspection response.\n *\n * The full Archive item now links to the public Inspection Table.\n */\n@media (hover: hover) and (pointer: fine) {\n  .catalogue-card__link:hover .catalogue-card__visual {\n    border-color: var(--colour-yellow);\n    transform: translateY(-3px) scale(1.01);\n  }\n}\n\n/*\n * Archive Label.\n *\n * The graphite mounting plate stays deliberately compact and visually\n * subordinate to the physical card.\n */\n.catalogue-card__archive-label {\n  position: relative;\n  min-width: 0;\n  min-height: 94px;\n  padding: 12px 12px 10px;\n  background: rgba(255, 255, 255, 0.022);\n  border-top: 1px solid var(--colour-border);\n}\n\n/*\n * Approved Archive datum mark.\n */\n.catalogue-card__archive-label::before {\n  position: absolute;\n  top: 0;\n  left: 12px;\n  width: 30px;\n  height: 2px;\n  background: var(--colour-yellow);\n  content: \"\";\n}\n\n/*\n * Level 1 \u2014 Card Name.\n *\n * Up to two lines are reserved so long names remain controlled\n * without changing the shared Archive rhythm.\n */\n.catalogue-card__archive-label h2 {\n  display: -webkit-box;\n  min-height: 2.35em;\n  overflow: hidden;\n  margin: 0;\n  color: var(--colour-text);\n  font-size: 0.94rem;\n  font-weight: 800;\n  line-height: 1.2;\n  letter-spacing: 0.012em;\n  text-transform: uppercase;\n  -webkit-box-orient: vertical;\n  line-clamp: 2;\n  -webkit-line-clamp: 2;\n}\n\n/*\n * Level 2 \u2014 compact collector identity.\n */\n.catalogue-card__metadata {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-top: 5px;\n  color: var(--colour-text-muted);\n  font-size: 0.72rem;\n  line-height: 1.35;\n}\n\n.catalogue-card__metadata span {\n  display: inline-flex;\n  align-items: center;\n}\n\n.catalogue-card__metadata span+span::before {\n  margin-inline: 7px;\n  color: #737c89;\n  content: \"\u00B7\";\n}\n\n.catalogue-card__number {\n  font-family: var(--font-display);\n  font-size: 0.67rem;\n  letter-spacing: 0.05em;\n}\n\n/*\n * Level 3 \u2014 set and genuine printing information.\n */\n.catalogue-card__printing {\n  margin-top: 4px;\n}\n\n.catalogue-card__set {\n  overflow: hidden;\n  margin: 0;\n  color: #969eaa;\n  font-size: 0.67rem;\n  line-height: 1.4;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n/*\n * Special printing information remains tertiary and neutral.\n * The approved datum mark remains the only yellow Archive decoration.\n */\n.catalogue-card__variants {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-top: 3px;\n  color: #969eaa;\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.045em;\n  line-height: 1.4;\n  text-transform: uppercase;\n}\n\n.catalogue-card__variants span {\n  display: inline-flex;\n  align-items: center;\n}\n\n.catalogue-card__variants span+span::before {\n  margin-inline: 6px;\n  color: #666f7b;\n  content: \"\u00B7\";\n}\n\n/*\n * Pagination remains subordinate to the result rail and physical cards.\n *\n * Because the shared footer sits outside catalogue-page, pagination stays\n * naturally separated from the global footer by the Archive's bottom padding.\n */\n.catalogue-pagination {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 48px;\n  padding-top: 22px;\n  border-top: 1px solid var(--colour-border);\n}\n\n.catalogue-pagination__controls {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.catalogue-pagination__pages {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n\n.catalogue-pagination__mobile-status {\n  display: none;\n  color: var(--colour-text-muted);\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.catalogue-pagination__page,\n.catalogue-pagination__direction {\n  min-height: 44px;\n  color: var(--colour-text-muted);\n  background: rgba(255, 255, 255, 0.025);\n  border: 1px solid var(--colour-border);\n  cursor: pointer;\n  font-family: var(--font-display);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  transition:\n    color 160ms ease,\n    background 160ms ease,\n    border-color 160ms ease;\n}\n\n.catalogue-pagination__page {\n  min-width: 44px;\n  padding-inline: 12px;\n}\n\n.catalogue-pagination__direction {\n  padding-inline: 16px;\n}\n\n.catalogue-pagination__page:hover:not(:disabled),\n.catalogue-pagination__direction:hover:not(:disabled) {\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-pagination__page--current {\n  color: var(--colour-background);\n  background: var(--colour-yellow);\n  border-color: var(--colour-yellow);\n}\n\n.catalogue-pagination__page:focus-visible,\n.catalogue-pagination__direction:focus-visible {\n  border-color: var(--colour-cyan);\n  outline: 2px solid var(--colour-cyan);\n  outline-offset: 3px;\n}\n\n.catalogue-pagination__direction:disabled {\n  cursor: not-allowed;\n  opacity: 0.4;\n}\n\n/*\n * Medium desktop.\n */\n@media (max-width: 1220px) {\n  .catalogue-tools__primary {\n    grid-template-columns:\n      repeat(3, minmax(145px, 1fr)) auto;\n  }\n\n  .catalogue-search {\n    grid-column: 1 / -1;\n  }\n\n  .catalogue-more-filters {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .card-grid {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n/*\n * Tablet.\n */\n@media (max-width: 820px) {\n  .catalogue-page {\n    padding-block: 52px 86px;\n  }\n\n  .catalogue-header {\n    padding-bottom: 24px;\n  }\n\n  .catalogue-tools__primary,\n  .catalogue-more-filters {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .catalogue-search {\n    grid-column: 1 / -1;\n  }\n\n  .catalogue-filter-toggle--desktop {\n    width: 100%;\n  }\n\n  .catalogue-results__rail {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  .catalogue-sort {\n    width: 100%;\n    max-width: 300px;\n  }\n\n  .card-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    row-gap: 36px;\n  }\n\n  .catalogue-pagination {\n    justify-content: center;\n    margin-top: 42px;\n  }\n}\n\n/*\n * Mobile.\n */\n@media (max-width: 620px) {\n  .catalogue-page {\n    padding-block: 42px 70px;\n  }\n\n  .catalogue-header h1 {\n    font-size: clamp(3rem, 15vw, 4.35rem);\n  }\n\n  .catalogue-description {\n    margin-top: 15px;\n    font-size: 0.92rem;\n  }\n\n  .catalogue-tools {\n    padding: 15px;\n  }\n\n  .catalogue-tools__primary {\n    grid-template-columns: 1fr;\n  }\n\n  .catalogue-search {\n    grid-column: auto;\n    order: 1;\n  }\n\n  .catalogue-search__control {\n    flex-direction: column;\n  }\n\n  .catalogue-search__control input {\n    border-right: 1px solid var(--colour-border-strong);\n  }\n\n  .catalogue-search__submit {\n    width: 100%;\n    margin-top: 8px;\n  }\n\n  .catalogue-field--primary-filter {\n    display: none;\n  }\n\n  .catalogue-tools--expanded .catalogue-field--primary-filter {\n    display: flex;\n    order: 3;\n  }\n\n  .catalogue-filter-toggle--desktop {\n    display: none;\n  }\n\n  .catalogue-filter-toggle--mobile {\n    display: inline-flex;\n    width: 100%;\n    order: 2;\n  }\n\n  .catalogue-more-filters {\n    grid-template-columns: 1fr;\n    margin-top: 12px;\n  }\n\n  .catalogue-active-filters {\n    width: 100%;\n    flex-direction: column;\n    gap: 10px;\n  }\n\n  .catalogue-active-filters__items,\n  .catalogue-active-filter,\n  .catalogue-active-filters__clear {\n    width: 100%;\n  }\n\n  .catalogue-active-filters__items {\n    flex-direction: column;\n  }\n\n  .catalogue-active-filter {\n    justify-content: space-between;\n    text-align: left;\n  }\n\n  .catalogue-active-filters__clear {\n    justify-content: flex-start;\n    text-align: left;\n  }\n\n  .catalogue-action {\n    width: 100%;\n  }\n\n  .card-grid {\n    grid-template-columns: 1fr;\n    row-gap: 34px;\n  }\n\n  .catalogue-card__archive-label {\n    min-height: 0;\n  }\n\n  .catalogue-card__archive-label h2 {\n    font-size: 1rem;\n  }\n\n  .catalogue-card__metadata {\n    font-size: 0.74rem;\n  }\n\n  .catalogue-message {\n    min-height: 142px;\n    padding: 26px 22px;\n  }\n\n  .catalogue-pagination {\n    justify-content: stretch;\n  }\n\n  .catalogue-pagination__controls {\n    width: 100%;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n\n  .catalogue-pagination__direction {\n    flex: 1;\n    padding-inline: 12px;\n  }\n\n  .catalogue-pagination__pages {\n    order: 3;\n    width: 100%;\n    justify-content: center;\n    margin-top: 4px;\n  }\n}\n\n/*\n * Very narrow mobile.\n */\n@media (max-width: 560px) {\n  .catalogue-pagination__controls {\n    flex-wrap: nowrap;\n  }\n\n  .catalogue-pagination__pages {\n    display: none;\n  }\n\n  .catalogue-pagination__mobile-status {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    padding-inline: 8px;\n  }\n\n  .catalogue-pagination__direction {\n    min-width: 0;\n    font-size: 0.62rem;\n  }\n}\n\n@media (max-width: 420px) {\n  .catalogue-pagination__mobile-status {\n    padding-inline: 4px;\n    font-size: 0.6rem;\n  }\n}\n\n/*\n * Reduced-motion users retain the visual state without card movement.\n */\n@media (prefers-reduced-motion: reduce) {\n\n  .catalogue-card__visual,\n  .catalogue-search__submit,\n  .catalogue-filter-toggle,\n  .catalogue-active-filter,\n  .catalogue-action,\n  .catalogue-pagination__page,\n  .catalogue-pagination__direction {\n    transition: none;\n  }\n\n  .catalogue-card__link:hover .catalogue-card__visual {\n    transform: none;\n  }\n}\n"] }]
    }], () => [{ type: i1.CardsService }, { type: i2.CardCatalogueStateService }, { type: i3.ActivatedRoute }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CardCatalogue, { className: "CardCatalogue", filePath: "src/app/features/cards/pages/card-catalogue/card-catalogue.ts", lineNumber: 59 }); })();

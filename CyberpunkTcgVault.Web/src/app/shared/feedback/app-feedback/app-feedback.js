import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/feedback/feedback.service";
function AppFeedback_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1);
    i0.ɵɵdomElement(1, "span", 2);
    i0.ɵɵdomElementStart(2, "p");
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const message_r1 = ctx;
    i0.ɵɵclassProp("app-feedback--error", message_r1.tone === "error");
    i0.ɵɵattribute("role", message_r1.tone === "error" ? "alert" : "status")("aria-live", message_r1.tone === "error" ? "assertive" : "polite");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(message_r1.text);
} }
export class AppFeedback {
    feedbackService;
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    static ɵfac = function AppFeedback_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || AppFeedback)(i0.ɵɵdirectiveInject(i1.FeedbackService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppFeedback, selectors: [["app-feedback"]], decls: 1, vars: 1, consts: [[1, "app-feedback", 3, "app-feedback--error"], [1, "app-feedback"], ["aria-hidden", "true", 1, "app-feedback__mark"]], template: function AppFeedback_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, AppFeedback_Conditional_0_Template, 4, 5, "div", 0);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.feedbackService.message()) ? 0 : -1, tmp_0_0);
        } }, styles: ["[_nghost-%COMP%] {\n  position: fixed;\n  z-index: 80;\n  top: 106px;\n  right: max(var(--page-padding), calc((100vw - 1760px) / 2));\n  pointer-events: none;\n}\n\n.app-feedback[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(360px, calc(100vw - (var(--page-padding) * 2)));\n  grid-template-columns: 3px minmax(0, 1fr);\n  align-items: stretch;\n  color: var(--colour-text);\n  background: rgba(10, 14, 20, 0.97);\n  border: 1px solid var(--colour-border-strong);\n  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.34);\n}\n\n.app-feedback__mark[_ngcontent-%COMP%] {\n  background: var(--colour-yellow);\n}\n\n.app-feedback--error[_ngcontent-%COMP%]   .app-feedback__mark[_ngcontent-%COMP%] {\n  background: var(--colour-red);\n}\n\n.app-feedback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 13px 15px;\n  font-size: 0.82rem;\n  line-height: 1.45;\n}\n\n@media (max-width: 560px) {\n  [_nghost-%COMP%] {\n    top: 128px;\n    right: var(--page-padding);\n    left: var(--page-padding);\n  }\n\n  .app-feedback[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppFeedback, [{
        type: Component,
        args: [{ selector: 'app-feedback', standalone: true, template: "@if (feedbackService.message(); as message) {\n  <div\n    class=\"app-feedback\"\n    [class.app-feedback--error]=\"message.tone === 'error'\"\n    [attr.role]=\"message.tone === 'error' ? 'alert' : 'status'\"\n    [attr.aria-live]=\"message.tone === 'error' ? 'assertive' : 'polite'\"\n  >\n    <span class=\"app-feedback__mark\" aria-hidden=\"true\"></span>\n    <p>{{ message.text }}</p>\n  </div>\n}\n", styles: [":host {\n  position: fixed;\n  z-index: 80;\n  top: 106px;\n  right: max(var(--page-padding), calc((100vw - 1760px) / 2));\n  pointer-events: none;\n}\n\n.app-feedback {\n  display: grid;\n  width: min(360px, calc(100vw - (var(--page-padding) * 2)));\n  grid-template-columns: 3px minmax(0, 1fr);\n  align-items: stretch;\n  color: var(--colour-text);\n  background: rgba(10, 14, 20, 0.97);\n  border: 1px solid var(--colour-border-strong);\n  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.34);\n}\n\n.app-feedback__mark {\n  background: var(--colour-yellow);\n}\n\n.app-feedback--error .app-feedback__mark {\n  background: var(--colour-red);\n}\n\n.app-feedback p {\n  margin: 0;\n  padding: 13px 15px;\n  font-size: 0.82rem;\n  line-height: 1.45;\n}\n\n@media (max-width: 560px) {\n  :host {\n    top: 128px;\n    right: var(--page-padding);\n    left: var(--page-padding);\n  }\n\n  .app-feedback {\n    width: 100%;\n  }\n}\n"] }]
    }], () => [{ type: i1.FeedbackService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppFeedback, { className: "AppFeedback", filePath: "src/app/shared/feedback/app-feedback/app-feedback.ts", lineNumber: 11 }); })();

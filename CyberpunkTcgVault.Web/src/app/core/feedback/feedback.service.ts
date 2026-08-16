import { Injectable, signal } from '@angular/core';

export type FeedbackTone = 'status' | 'error';

export interface FeedbackMessage {
  text: string;
  tone: FeedbackTone;
}

/**
 * One restrained transient feedback language for collector mutations.
 *
 * Persistent truth stays in the page itself (quantity, owned/wanted state,
 * etc.). This service only acknowledges completed work or explains a failure.
 */
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly messageState = signal<FeedbackMessage | null>(null);
  private dismissTimer?: ReturnType<typeof setTimeout>;

  readonly message = this.messageState.asReadonly();

  showStatus(text: string, durationMs = 2800): void {
    this.show({ text, tone: 'status' }, durationMs);
  }

  showError(text: string, durationMs = 4200): void {
    this.show({ text, tone: 'error' }, durationMs);
  }

  clear(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }

    this.messageState.set(null);
  }

  private show(message: FeedbackMessage, durationMs: number): void {
    this.clear();
    this.messageState.set(message);

    this.dismissTimer = setTimeout(() => {
      this.messageState.set(null);
      this.dismissTimer = undefined;
    }, durationMs);
  }
}

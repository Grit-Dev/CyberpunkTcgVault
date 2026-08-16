import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { CardAnatomyField } from '../../models/card-anatomy';
import { VESPER_CRIMSON_ECHO_ANATOMY } from '../../../../pages/home/data/vesper-crimson-echo-anatomy';

/*
 * Card Anatomy currently supports two viewing modes.
 *
 * Guided explains one field at a time.
 * Show All exposes every available marker at once.
 */
type CardAnatomyMode = 'guided' | 'showAll';

@Component({
  selector: 'app-card-anatomy-showcase',
  standalone: true,
  imports: [],
  templateUrl: './card-anatomy-showcase.html',
  styleUrl: './card-anatomy-showcase.scss',
})
export class CardAnatomyShowcase {
  // Reference used to restore focus after Card Anatomy closes.
  @ViewChild('explainCardButton')
  private explainCardButton?: ElementRef<HTMLButtonElement>;

  // First control focused when the learning experience opens.
  @ViewChild('guidedModeButton')
  private guidedModeButton?: ElementRef<HTMLButtonElement>;

  // Reference used to control the subtle homepage card motion.
  @ViewChild('studyCard')
  private studyCard?: ElementRef<HTMLElement>;

  // Stores whether the Card Anatomy experience is currently open.
  isOpen = false;

  // Stores which Card Anatomy mode the user is currently viewing.
  mode: CardAnatomyMode = 'guided';

  // Stores the position of the field currently being explained.
  currentFieldIndex = 0;

  // Fields available for the Vesper // Crimson Echo study card.
  readonly anatomyFields: CardAnatomyField[] = VESPER_CRIMSON_ECHO_ANATOMY;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  /**
   * Returns the field currently being explained.
   */
  get currentField(): CardAnatomyField {
    return this.anatomyFields[this.currentFieldIndex];
  }

  /**
   * Returns true when the user is viewing
   * the first field in Guided mode.
   */
  get isFirstField(): boolean {
    return this.currentFieldIndex === 0;
  }

  /**
   * Returns true when the user is viewing
   * the final field in Guided mode.
   */
  get isLastField(): boolean {
    return this.currentFieldIndex === this.anatomyFields.length - 1;
  }

  /**
   * Opens Card Anatomy and starts Guided mode
   * from the first available card field.
   */
  /**
   * Opens Card Anatomy and starts Guided mode
   * from the first available card field.
   */
  openCardAnatomy(): void {
    // Return the card to its resting position
    // before the study experience opens.
    this.resetCardMotion();

    this.currentFieldIndex = 0;
    this.mode = 'guided';
    this.isOpen = true;

    // Wait for Angular to render the active controls
    // before moving keyboard focus into the experience.
    setTimeout(() => {
      this.guidedModeButton?.nativeElement.focus();
    });
  }

  /**
   * Closes Card Anatomy and returns the showcase
   * to its normal homepage state.
   */
  closeCardAnatomy(): void {
    this.isOpen = false;

    // Explain Card is recreated when the closed state renders,
    // so focus is restored after Angular updates the template.
    setTimeout(() => {
      this.explainCardButton?.nativeElement.focus();
    });
  }

  /**
   * Applies a restrained physical tilt while the user
   * moves the mouse across the homepage study card.
   */
  onCardPointerMove(event: PointerEvent): void {
    // Card motion is only used before Vault Lens opens
    // and only when a mouse is being used.
    if (this.isOpen || event.pointerType !== 'mouse') {
      return;
    }

    const card = event.currentTarget as HTMLElement;

    const bounds = card.getBoundingClientRect();

    // Convert the cursor position into values
    // between 0 and 1 across the card.
    const x = (event.clientX - bounds.left) / bounds.width;

    const y = (event.clientY - bounds.top) / bounds.height;

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
  resetCardMotion(): void {
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
  setMode(mode: CardAnatomyMode): void {
    this.mode = mode;
  }

  /**
   * Selects one of the numbered card fields
   * displayed during Show All mode.
   */
  selectField(index: number): void {
    this.currentFieldIndex = index;
  }

  /**
   * Moves Guided mode to the next card field.
   *
   * When the user reaches the final field,
   * the same action finishes and closes the guide.
   */
  nextField(): void {
    if (this.isLastField) {
      this.closeCardAnatomy();
      return;
    }

    this.currentFieldIndex++;
  }

  /**
   * Moves Guided mode back to the previous field.
   */
  previousField(): void {
    if (this.isFirstField) {
      return;
    }

    this.currentFieldIndex--;
  }

  /**
   * Handles keyboard navigation while Card Anatomy
   * is active.
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent): void {
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

        this.currentFieldIndex = this.anatomyFields.length - 1;

        break;
    }
  }

  /**
   * Keeps Tab navigation inside Card Anatomy
   * while the learning experience is open.
   */
  private trapFocus(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];

    const lastElement = focusableElements[focusableElements.length - 1];

    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();

      lastElement.focus();

      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();

      firstElement.focus();
    }
  }

  /**
   * Returns the controls that can currently receive
   * keyboard focus inside Card Anatomy.
   */
  private getFocusableElements(): HTMLElement[] {
    const selector = ['button:not([disabled])', 'a[href]', '[tabindex]:not([tabindex="-1"])'].join(
      ',',
    );

    return Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>(selector)).filter(
      (element) => element.offsetParent !== null,
    );
  }
}

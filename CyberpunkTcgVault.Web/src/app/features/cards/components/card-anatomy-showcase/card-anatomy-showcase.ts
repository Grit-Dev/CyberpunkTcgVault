import { Component } from '@angular/core';

import { CardAnatomyField } from '../../models/card-anatomy';
import { V_STREETKID_ANATOMY } from '../../../../pages/home/data/v-streetkid-anatomy';

@Component({
  selector: 'app-card-anatomy-showcase',
  standalone: true,
  imports: [],
  templateUrl: './card-anatomy-showcase.html',
  styleUrl: './card-anatomy-showcase.scss',
})
export class CardAnatomyShowcase {

  // Stores whether the Card Anatomy experience is currently open.
  isOpen = false;

  // Stores the position of the field currently being explained.
  currentFieldIndex = 0;

  // Fields available for the V StreetKid homepage showcase.
  readonly anatomyFields: CardAnatomyField[] =
    V_STREETKID_ANATOMY;

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
    return this.currentFieldIndex ===
      this.anatomyFields.length - 1;
  }

  /**
   * Opens Card Anatomy and starts Guided mode
   * from the first available card field.
   */
  openCardAnatomy(): void {

    this.currentFieldIndex = 0;
    this.isOpen = true;

  }

  /**
   * Closes Card Anatomy and returns the showcase
   * to its normal homepage state.
   */
  closeCardAnatomy(): void {

    this.isOpen = false;

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
}
/*
 * Stable identifiers for the card fields that Card Anatomy
 * can explain to the user.
 */
export type CardAnatomyFieldId =
  | 'cost'
  | 'sellTag'
  | 'type'
  | 'ram'
  | 'tags'
  | 'power'
  | 'rulesText'
  | 'setCode'
  | 'cardNumber'
  | 'rarity'
  | 'artistCredit';

/*
 * Stores the position and size of a field on the card.
 *
 * Percentage values are used instead of pixels so the
 * highlight stays aligned when the card changes size.
 */
export interface CardAnatomyRegion {
  top: number;

  left: number;

  width: number;

  height: number;
}

/*
 * Stores the position of a numbered marker around
 * the card during Show All mode.
 *
 * This is separate from the highlighted region because
 * the marker and selected field have different positions.
 */
export interface CardAnatomyMarkerPosition {
  top: number;

  left: number;
}

/*
 * Describes one field that can be explained
 * by the Card Anatomy experience.
 */
export interface CardAnatomyField {
  // Stable identifier used by the component.
  id: CardAnatomyFieldId;

  // Name displayed to the user.
  title: string;

  // Short explanation displayed in the learning docket.
  description: string;

  // Position and size of the selected area on the card.
  region: CardAnatomyRegion;

  // Position of the numbered button used by Show All mode.
  marker: CardAnatomyMarkerPosition;
}

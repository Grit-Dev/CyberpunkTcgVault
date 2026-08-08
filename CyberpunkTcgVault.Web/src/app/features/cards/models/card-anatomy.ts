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
 * Stores the position and size of a field on a card.
 *
 * Percentages are used instead of pixels so the highlight
 * stays aligned when the card changes size.
 */
export interface CardAnatomyRegion {
    top: number;
    left: number;
    width: number;
    height: number;
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

    // Short explanation displayed in the learning panel.
    description: string;

    // Position of the field on the showcase card.
    region: CardAnatomyRegion;
}
/*
 * Stable identifiers for the card fields that Card Anatomy
 * can explain to the user.
 *
 * These identifiers stay separate from the text displayed
 * on screen so the wording can change without affecting logic.
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
 * Describes one field that can be explained
 * by the Card Anatomy experience.
 */
export interface CardAnatomyField {

    // Stable identifier used by the component.
    id: CardAnatomyFieldId;

    // Name displayed to the user.
    title: string;

    // Short player-facing explanation of the field.
    description: string;
}
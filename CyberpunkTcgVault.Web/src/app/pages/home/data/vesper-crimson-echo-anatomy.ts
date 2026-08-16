import { CardAnatomyField } from '../../../features/cards/models/card-anatomy';

/*
 * Fields used by the Vesper Ryne // Crimson Echo homepage study card.
 *
 * The order of this array controls Guided mode and
 * also controls the Show All marker numbering.
 */

/**
 * VAULT LENS ALIGNMENT NOTES
 *
 * Each anatomy field has two separate coordinate sets:
 *
 * region
 *   Controls the yellow highlight rectangle shown in Guided mode.
 *   - top / left = where the highlight begins
 *   - width / height = size of the highlight
 *
 * marker
 *   Controls the numbered callout position used by Show All mode.
 *   Moving a marker does NOT move the Guided highlight region.
 *
 * All values are percentages relative to the rendered card image so the
 * alignment scales with the card at different viewport sizes.
 *
 * When manually tuning a field:
 *   1. Adjust region first until the yellow box hugs the intended card field.
 *   2. Only adjust marker if the numbered Show All marker is also misplaced.
 *   3. Change one field at a time and check desktop + mobile before moving on.
 *
 * The Vesper coordinates are specific to the Vesper Ryne study-card artwork.
 * Yes, manually aligning eleven rectangles is exactly as exciting as it
 * sounds. Future me: sorry.
 */

export const VESPER_CRIMSON_ECHO_ANATOMY: CardAnatomyField[] = [
  {
    id: 'cost',
    title: 'Cost',
    description:
      'Spend Eddies equal to this value to play the card. Legends can also be spent as 1 Eddie each.',
    region: {
      top: 4,
      left: 7.5,
      width: 14,
      height: 10.5,
    },
    marker: {
      top: 5,
      left: -2,
    },
  },
  {
    id: 'sellTag',
    title: 'Sell Tag',
    description:
      'Once per turn, a card with this symbol can be sold from your hand to create 1 Eddie.',
    region: {
      top: 16.8,
      left: 9.5,
      width: 10.8,
      height: 5,
    },
    marker: {
      top: 17,
      left: -2,
    },
  },
  {
    id: 'type',
    title: 'Type',
    description: 'Identifies the card as a Legend, Unit, Program or Gear.',
    region: {
      top: 2.6,
      left: 80,
      width: 15.5,
      height: 4,
    },
    marker: {
      top: 4,
      left: 102,
    },
  },
  {
    id: 'ram',
    title: 'RAM',
    description:
      'Your Legends set the RAM limits for your deck. A card can only be included when its colour and RAM value fit within that limit.',
    region: {
      top: 6.4,
      left: 80,
      width: 13,
      height: 9.2,
    },
    marker: {
      top: 11,
      left: 102,
    },
  },
  {
    id: 'tags',
    title: 'Tags',
    description: 'Affiliations and traits that other card effects may reference.',
    region: {
      top: 66.4,
      left: 12,
      width: 10.8,
      height: 3.2,
    },
    marker: {
      top: 64,
      left: -2,
    },
  },
  {
    id: 'power',
    title: 'Power',
    description:
      'Used when attacking. Higher power wins fights, and Units steal an additional Gig for every 10 power.',
    region: {
      top: 89.5,
      left: 81.6,
      width: 11.7,
      height: 7.0,
    },
    marker: {
      top: 89,
      left: 102,
    },
  },
  {
    id: 'rulesText',
    title: 'Rules Text',
    description:
      'Explains the card’s abilities and instructions. Card text takes priority if it conflicts with the general rules.',
    region: {
      top: 69.6,
      left: 9.0,
      width: 82.5,
      height: 21.2,
    },
    marker: {
      top: 69,
      left: 102,
    },
  },
  {
    id: 'setCode',
    title: 'Set Code',
    description: 'Identifies the set or printing this card belongs to.',
    region: {
      top: 89.8,
      left: 7.5,
      width: 9.5,
      height: 6.7,
    },
    marker: {
      top: 98,
      left: 15,
    },
  },
  {
    id: 'cardNumber',
    title: 'Card Number',
    description: 'The card’s unique number within that set or printing.',
    region: {
      top: 80,
      left: 3.8,
      width: 3.8,
      height: 9.8,
    },
    marker: {
      top: 86,
      left: -2,
    },
  },
  {
    id: 'rarity',
    title: 'Rarity',
    description: 'Shows the rarity assigned to this card printing.',
    region: {
      top: 92.3,
      left: 46.8,
      width: 6.0,
      height: 3.4,
    },
    marker: {
      top: 98,
      left: 49,
    },
  },
  {
    id: 'artistCredit',
    title: 'Artist Credit',
    description: 'Credits the artist who created the card illustration.',
    region: {
      top: 49.0,
      left: 93.7,
      width: 3.2,
      height: 19.0,
    },
    marker: {
      top: 53,
      left: 102,
    },
  },
];

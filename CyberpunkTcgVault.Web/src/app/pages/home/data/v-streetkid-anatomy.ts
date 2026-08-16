import { CardAnatomyField } from '../../../features/cards/models/card-anatomy';

/*
 * Fields used by the V StreetKid homepage showcase.
 *
 * The order of this array controls Guided mode and
 * also controls the Show All marker numbering.
 *
 * Region values are percentages of the complete card image.
 * Marker values control where the numbered Show All
 * buttons sit around the perimeter of the card.
 */
export const V_STREETKID_ANATOMY: CardAnatomyField[] = [
  {
    id: 'cost',
    title: 'Cost',
    description:
      'Spend Eddies equal to this value to play the card. Legends can also be spent as 1 Eddie each.',
    region: {
      top: 3.8,
      left: 4.8,
      width: 14.2,
      height: 10,
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
      left: 8,
      width: 10.2,
      height: 4.6,
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
      top: 3.8,
      left: 76,
      width: 17.5,
      height: 3.6,
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
      top: 8.7,
      left: 82,
      width: 10.2,
      height: 5.9,
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
      top: 64.5,
      left: 10.7,
      width: 9.8,
      height: 2.9,
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
      top: 88.8,
      left: 82,
      width: 13,
      height: 6.5,
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
      top: 67.4,
      left: 9.5,
      width: 70,
      height: 24.8,
    },
    marker: {
      top: 75,
      left: -2,
    },
  },
  {
    id: 'setCode',
    title: 'Set Code',
    description: 'Identifies the set or printing this card belongs to.',
    region: {
      top: 84.1,
      left: 3,
      width: 4.2,
      height: 12.1,
    },
    marker: {
      top: 86,
      left: -2,
    },
  },
  {
    id: 'cardNumber',
    title: 'Card Number',
    description: 'The card’s unique number within that set or printing.',
    region: {
      top: 92.1,
      left: 6,
      width: 7.4,
      height: 4.5,
    },
    marker: {
      top: 98,
      left: 15,
    },
  },
  {
    id: 'rarity',
    title: 'Rarity',
    description: 'Shows the rarity assigned to this card printing.',
    region: {
      top: 92.9,
      left: 47.4,
      width: 5.9,
      height: 4.4,
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
      top: 43.8,
      left: 94.8,
      width: 2.9,
      height: 19.6,
    },
    marker: {
      top: 53,
      left: 102,
    },
  },
];

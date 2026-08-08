import { CardAnatomyField } from '../../../features/cards/models/card-anatomy';

/*
 * Fields used by the White Wanderer homepage showcase.
 *
 * The order of this array controls the order used by
 * Guided mode and will later also control marker numbering.
 */
export const WHITE_WANDERER_ANATOMY: CardAnatomyField[] = [

    {
        id: 'cost',
        title: 'Cost',
        description: 'Spend this many Eddies to play the card.'
    },
    {
        id: 'sellTag',
        title: 'Sell Tag',
        description:
            'This symbol means the card can be sold from your hand to create 1 Eddie.'
    },
    {
        id: 'type',
        title: 'Type',
        description:
            'Identifies the type of card and how it fits into the game.'
    },
    {
        id: 'ram',
        title: 'RAM',
        description:
            'The card’s colour and RAM value determine whether it fits within your Legends’ RAM limit.'
    },
    {
        id: 'tags',
        title: 'Tags',
        description:
            'Affiliations and traits that other card effects may reference.'
    },
    {
        id: 'power',
        title: 'Power',
        description:
            'Used in fights. Higher power wins, and Units can steal more Gigs at higher power.'
    },
    {
        id: 'rulesText',
        title: 'Rules Text',
        description:
            'Explains the card’s abilities and instructions. Card text takes priority if it conflicts with the general rules.'
    },
    {
        id: 'setCode',
        title: 'Set Code',
        description:
            'Identifies the set or printing this card belongs to.'
    },
    {
        id: 'cardNumber',
        title: 'Card Number',
        description:
            'The card’s unique number within that set or printing.'
    },
    {
        id: 'rarity',
        title: 'Rarity',
        description:
            'Shows the rarity assigned to this card printing.'
    },
    {
        id: 'artistCredit',
        title: 'Artist Credit',
        description:
            'Credits the artist who created the card illustration.'
    }
];
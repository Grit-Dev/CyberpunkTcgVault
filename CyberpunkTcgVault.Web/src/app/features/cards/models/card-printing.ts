/**
 * One physical collectible printing/version of a logical Card.
 *
 * Collector ownership and Wishlist records reference this ID rather than only
 * the logical Card ID.
 */
export interface CardPrinting {
  id: number;
  cardSetId: number;
  setName: string;
  setCode: string | null;
  cardNumber: string;
  rarity: string | null;
  imageUrl: string | null;
  languageCode: string | null;
  hasBetaSymbol: boolean;
  isKickstarterVersion: boolean;
  isRetailVersion: boolean;
  isFoil: boolean;
  isAltArt: boolean;
  isBoxTopper: boolean;
  isPromo: boolean;
  isStarterDeckExclusive: boolean;
}

import { CardPrinting } from './card-printing';

/**
 * Logical Cyberpunk TCG card record returned by the Choom Vault catalogue API.
 *
 * The flattened printing fields remain for the existing public Archive while
 * `printings` is the authoritative multi-printing collection for Card Detail
 * and collector ownership actions.
 */
export interface Card {
  id: number;
  name: string;
  colour: string | null;
  cardType: string | null;
  classification: string | null;
  keywords: string | null;
  cost: number | null;
  power: number | null;
  ramCost: number | null;
  isLegend: boolean;
  notes: string | null;

  // Flattened primary-printing compatibility fields.
  cardPrintingId: number | null;
  setName: string | null;
  rarity: string | null;
  hasBetaSymbol: boolean;
  isKickstarterVersion: boolean;
  isRetailVersion: boolean;
  isFoil: boolean;
  isAltArt: boolean;
  isBoxTopper: boolean;
  isPromo: boolean;
  isStarterDeckExclusive: boolean;
  cardNumber: string | null;
  imageUrl: string | null;

  // Source of truth when one logical card has multiple physical printings.
  printings: CardPrinting[];
}

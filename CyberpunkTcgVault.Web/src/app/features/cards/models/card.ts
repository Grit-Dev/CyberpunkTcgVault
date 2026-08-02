export interface Card {
  id: number;
  name: string;
  setName: string | null;
  rarity: string | null;
  colour: string | null;
  cardType: string | null;
  classification: string | null;
  keywords: string | null;
  cost: number | null;
  power: number | null;
  ramCost: number | null;
  isLegend: boolean;
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
  notes: string | null;
}
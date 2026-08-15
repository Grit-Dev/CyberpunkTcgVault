/**
 * Collector-owned record for one exact physical CardPrinting.
 *
 * This is private collector data. The backend scopes every record to the
 * authenticated user; Angular only presents the returned state.
 */
export interface OwnedCard {
  id: number;
  cardPrintingId: number;
  cardId: number;
  cardName: string;
  setName: string | null;
  cardNumber: string | null;
  rarity: string | null;
  colour: string | null;
  imageUrl: string | null;
  quantityOwned: number;
  condition: string | null;
  isInMasterCollection: boolean;
  isDuplicate: boolean;
  isGradingCandidate: boolean;
  isOpenForTrade: boolean;
  isOpenToMessages: boolean;
  maySellLater: boolean;
  notes: string | null;
}

export interface CreateOwnedCardRequest {
  cardPrintingId: number;
  quantityOwned: number;
}

/** Private wishlist record for one exact physical CardPrinting. */
export interface WishlistItem {
  id: number;
  cardPrintingId: number;
  cardId: number;
  cardName: string;
  setName: string | null;
  cardNumber: string | null;
  rarity: string | null;
  colour: string | null;
  imageUrl: string | null;
  wantedQuantity: number;
  priority: string | null;
  reasonWanted: string | null;
  wantRaw: boolean;
  wantGraded: boolean;
  preferredGradingCompany: string | null;
  isOpenToTrade: boolean;
  notes: string | null;
}

export interface CreateWishlistItemRequest {
  cardPrintingId: number;
  wantedQuantity: number;
}

/**
 * Private collector record for one physical collection product.
 *
 * The Sealed page presents only records that the backend marks as sealed.
 * The wider CollectionProduct contract is retained here so quantity/basic
 * metadata edits do not accidentally erase private values the API already
 * stores for that record.
 */
export interface CollectionProduct {
  id: number;
  productName: string;
  productType: string | null;
  edition: string | null;
  quantity: number;
  isSealed: boolean;
  isBetaProduct: boolean;
  isKickstarterProduct: boolean;
  isRetailProduct: boolean;
  isPledgeItem: boolean;
  purchaseCost: number | null;
  shippingCost: number | null;
  vatCost: number | null;
  estimatedValue: number | null;
  minimumSellPrice: number | null;
  storageLocation: string | null;
  isLongTermHold: boolean;
  isOpenToTrade: boolean;
  maySellLater: boolean;
  imageUrl: string | null;
  notes: string | null;
}

export interface CreateCollectionProductRequest {
  productName: string;
  productType: string | null;
  edition: string | null;
  quantity: number;
  isSealed: boolean;
  isBetaProduct: boolean;
  isKickstarterProduct: boolean;
  isRetailProduct: boolean;
  isPledgeItem: boolean;
  purchaseCost: number | null;
  shippingCost: number | null;
  vatCost: number | null;
  estimatedValue: number | null;
  minimumSellPrice: number | null;
  storageLocation: string | null;
  isLongTermHold: boolean;
  isOpenToTrade: boolean;
  maySellLater: boolean;
  imageUrl: string | null;
  notes: string | null;
}

export type UpdateCollectionProductRequest = CreateCollectionProductRequest;

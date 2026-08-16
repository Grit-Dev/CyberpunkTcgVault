export type CardSortBy = 'setOrder' | 'name';
export type CardSortDirection = 'asc' | 'desc';

/**
 * Public filter contract supported by the Choom Vault Cards API.
 *
 * Classification and tags intentionally remain separate. Classification is a
 * first-class Card field, while tags map to the API's compatibility Keywords
 * data and must not be presented as the same collector concept.
 */
export interface CardFilters {
  name?: string;
  setCode?: string;
  cardType?: string;
  rarity?: string;
  colour?: string;
  classification?: string;
  tags?: string;
  cost?: number | null;
  power?: number | null;
  ram?: number | null;
  eddies?: number | null;
  sortBy?: CardSortBy;
  sortDirection?: CardSortDirection;
}

export type CardFilterKey = Exclude<keyof CardFilters, 'name' | 'sortBy' | 'sortDirection'>;

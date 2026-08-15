export interface CardSetFilterOption {
  code: string;
  name: string;
}

/**
 * Server-owned filter choices returned by /api/Cards/filter-options.
 */
export interface CardFilterOptions {
  colours: string[];
  cardTypes: string[];
  tags: string[];
  costs: number[];
  powers: number[];
  ramValues: number[];
  eddiesValues: number[];
  sets: CardSetFilterOption[];
  rarities: string[];
}

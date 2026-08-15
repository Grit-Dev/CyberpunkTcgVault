import { Injectable } from '@angular/core';
import { CardFilters } from '../models/card-filters';

/**
 * Short-lived browser state used when a collector leaves the Vault Archive
 * to inspect a card and then returns.
 *
 * This is deliberately UI-only state. It contains no authentication or
 * private collector data and is removed as soon as the Archive restores it.
 */
export interface CardCatalogueState {
  filters: CardFilters;
  currentPage: number;
  rarityOptions: string[];
  classificationOptions: string[];
  cardTypeOptions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CardCatalogueStateService {
  private readonly storageKey =
    'choom-vault:card-catalogue-return-state';

  /**
   * Remembers the current Archive view immediately before card inspection.
   */
  save(state: CardCatalogueState): void {
    try {
      sessionStorage.setItem(
        this.storageKey,
        JSON.stringify(state)
      );
    } catch {
      // Browsing the Archive must still work if storage is unavailable.
    }
  }

  /**
   * Restores the previous Archive view once, then removes it so normal
   * navigation to /cards still starts from a clean Archive.
   */
  consume(): CardCatalogueState | null {
    try {
      const storedState = sessionStorage.getItem(
        this.storageKey
      );

      if (!storedState) {
        return null;
      }

      sessionStorage.removeItem(
        this.storageKey
      );

      const parsedState = JSON.parse(
        storedState
      ) as Partial<CardCatalogueState>;

      const currentPage = Number(
        parsedState.currentPage
      );

      if (
        !Number.isInteger(currentPage) ||
        currentPage < 1 ||
        !parsedState.filters
      ) {
        return null;
      }

      return {
        filters: {
          name: parsedState.filters.name ?? '',
          rarity: parsedState.filters.rarity ?? '',
          classification:
            parsedState.filters.classification ?? '',
          cardType: parsedState.filters.cardType ?? ''
        },
        currentPage,
        rarityOptions:
          this.normaliseOptions(parsedState.rarityOptions),
        classificationOptions:
          this.normaliseOptions(parsedState.classificationOptions),
        cardTypeOptions:
          this.normaliseOptions(parsedState.cardTypeOptions)
      };
    } catch {
      return null;
    }
  }

  private normaliseOptions(
    values: string[] | undefined
  ): string[] {
    if (!Array.isArray(values)) {
      return [];
    }

    return values.filter(
      value => typeof value === 'string'
    );
  }
}

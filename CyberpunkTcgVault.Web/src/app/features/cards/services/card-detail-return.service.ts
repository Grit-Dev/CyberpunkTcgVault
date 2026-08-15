import { Injectable } from '@angular/core';

export type CardDetailReturnOrigin =
  'archive' |
  'collection' |
  'wishlist';

export interface CardDetailReturnContext {
  label: 'Vault Archive' | 'Collection' | 'Wishlist';
  path: '/cards' | '/collection' | '/wishlist';
  queryParams: Record<string, string>;
}

/**
 * Short-lived in-memory context for the single Card Detail return action.
 *
 * The context is intentionally not persisted. A direct Card Detail visit or
 * browser refresh therefore falls back to the public Vault Archive, while a
 * normal in-app inspection can return to the exact originating list state.
 */
@Injectable({
  providedIn: 'root'
})
export class CardDetailReturnService {
  private context: CardDetailReturnContext | null = null;

  save(
    origin: CardDetailReturnOrigin,
    url: string
  ): void {
    const path = this.pathFor(origin);

    if (!this.isValidInternalListUrl(url, path)) {
      this.context = null;
      return;
    }

    this.context = {
      label: this.labelFor(origin),
      path,
      queryParams: origin === 'archive'
        ? {}
        : this.readQueryParams(url)
    };
  }

  consume(): CardDetailReturnContext | null {
    const context = this.context;
    this.context = null;
    return context;
  }

  private labelFor(
    origin: CardDetailReturnOrigin
  ): CardDetailReturnContext['label'] {
    switch (origin) {
      case 'collection':
        return 'Collection';
      case 'wishlist':
        return 'Wishlist';
      default:
        return 'Vault Archive';
    }
  }

  private pathFor(
    origin: CardDetailReturnOrigin
  ): CardDetailReturnContext['path'] {
    switch (origin) {
      case 'collection':
        return '/collection';
      case 'wishlist':
        return '/wishlist';
      default:
        return '/cards';
    }
  }

  private isValidInternalListUrl(
    url: string,
    expectedPath: CardDetailReturnContext['path']
  ): boolean {
    if (!url.startsWith('/')) {
      return false;
    }

    const path = url.split(/[?#]/, 1)[0];
    return path === expectedPath;
  }

  private readQueryParams(
    url: string
  ): Record<string, string> {
    const queryStart = url.indexOf('?');

    if (queryStart < 0) {
      return {};
    }

    const fragmentStart = url.indexOf('#', queryStart);
    const query = url.slice(
      queryStart + 1,
      fragmentStart >= 0 ? fragmentStart : undefined
    );
    const params = new URLSearchParams(query);
    const queryParams: Record<string, string> = {};

    params.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }
}

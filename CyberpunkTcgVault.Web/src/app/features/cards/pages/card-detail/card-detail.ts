import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { DynamicSeoService } from '../../../../core/seo/dynamic-seo.service';
import { OwnedCard } from '../../../collection/models/owned-card';
import { OwnedCardsService } from '../../../collection/services/owned-cards.service';
import { WishlistItem } from '../../../wishlist/models/wishlist-item';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { CardArtworkDirective } from '../../directives/card-artwork.directive';
import { CardPrinting } from '../../models/card-printing';
import { Card } from '../../models/card';
import {
  CardDetailReturnContext,
  CardDetailReturnService,
} from '../../services/card-detail-return.service';
import { CardsService } from '../../services/cards.service';

/**
 * Public Card Detail / Inspection Table.
 *
 * Shared Card/CardPrinting data is public. Collector state is private and is
 * loaded/mutated only for the authenticated browser session. Angular presents
 * that state; backend authentication, CSRF, role and ownership checks remain
 * authoritative for every private mutation.
 */
@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [RouterLink, CardArtworkDirective],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.scss',
})
export class CardDetail implements OnInit, OnDestroy {
  readonly card = signal<Card | null>(null);
  readonly selectedPrinting = signal<CardPrinting | null>(null);
  readonly isLoading = signal(true);
  readonly isNotFound = signal(false);
  readonly loadError = signal(false);
  readonly returnContext = signal<CardDetailReturnContext>({
    label: 'Vault Archive',
    path: '/cards',
    queryParams: {},
  });

  readonly collectorError = signal('');
  readonly collectorMessage = signal('');
  readonly isCollectorStateLoading = signal(false);
  readonly isCollectionBusy = signal(false);
  readonly isWishlistBusy = signal(false);

  readonly ownedRecord = computed(() => {
    const printingId = this.selectedPrinting()?.id;

    if (!printingId) {
      return null;
    }

    return (
      this.ownedCardsService.items().find((item) => item.cardPrintingId === printingId) ?? null
    );
  });

  readonly wishlistRecord = computed(() => {
    const printingId = this.selectedPrinting()?.id;

    if (!printingId) {
      return null;
    }

    return this.wishlistService.items().find((item) => item.cardPrintingId === printingId) ?? null;
  });

  private readonly subscriptions = new Subscription();
  private collectorMessageTimer?: ReturnType<typeof setTimeout>;

  constructor(
    readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cardDetailReturnService: CardDetailReturnService,
    private readonly cardsService: CardsService,
    private readonly ownedCardsService: OwnedCardsService,
    private readonly wishlistService: WishlistService,
    private readonly seo: DynamicSeoService,
  ) {}

  ngOnInit(): void {
    this.returnContext.set(
      this.cardDetailReturnService.consume() ?? {
        label: 'Vault Archive',
        path: '/cards',
        queryParams: {},
      },
    );

    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));

        if (!Number.isInteger(id) || id <= 0) {
          this.showNotFound();
          return;
        }

        this.loadCard(id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.clearCollectorMessageTimer();
    this.seo.removeCanonical();
  }

  retry(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isInteger(id) && id > 0) {
      this.loadCard(id);
    }
  }

  selectPrinting(printing: CardPrinting): void {
    if (this.selectedPrinting()?.id === printing.id) {
      return;
    }

    this.selectedPrinting.set(printing);
    this.clearCollectorFeedback();

    const card = this.card();
    if (card) {
      this.applyCardSeo(card);
    }

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        printing: printing.id,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  addToCollection(): void {
    const printing = this.selectedPrinting();

    if (!printing || this.isCollectionBusy()) {
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.sendToLogin('collection');
      return;
    }

    if (this.ownedRecord()) {
      return;
    }

    this.clearCollectorFeedback();
    this.isCollectionBusy.set(true);

    this.subscriptions.add(
      this.ownedCardsService.addPrinting(printing.id).subscribe({
        next: () => {
          this.isCollectionBusy.set(false);
          this.showCollectorMessage('Added to Collection.');
        },
        error: (error) => {
          this.isCollectionBusy.set(false);
          this.handleCollectorError(error, 'collection');
        },
      }),
    );
  }

  increaseCollectionQuantity(): void {
    const owned = this.ownedRecord();

    if (!owned || owned.quantityOwned >= 999 || this.isCollectionBusy()) {
      return;
    }

    this.updateCollectionQuantity(owned, owned.quantityOwned + 1);
  }

  decreaseCollectionQuantity(): void {
    const owned = this.ownedRecord();

    // Quantity 1 is never silently converted into deletion. Removal has its
    // own explicit action so destructive intent stays unambiguous.
    if (!owned || owned.quantityOwned <= 1 || this.isCollectionBusy()) {
      return;
    }

    this.updateCollectionQuantity(owned, owned.quantityOwned - 1);
  }

  removeFromCollection(): void {
    const owned = this.ownedRecord();

    if (!owned || this.isCollectionBusy()) {
      return;
    }

    this.clearCollectorFeedback();
    this.isCollectionBusy.set(true);

    this.subscriptions.add(
      this.ownedCardsService.remove(owned).subscribe({
        next: () => {
          this.isCollectionBusy.set(false);
          this.showCollectorMessage('Removed from Collection.');
        },
        error: (error) => {
          this.isCollectionBusy.set(false);
          this.handleCollectorError(error, 'collection');
        },
      }),
    );
  }

  addToWishlist(): void {
    const printing = this.selectedPrinting();

    if (!printing || this.isWishlistBusy()) {
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.sendToLogin('wishlist');
      return;
    }

    if (this.wishlistRecord()) {
      return;
    }

    this.clearCollectorFeedback();
    this.isWishlistBusy.set(true);

    this.subscriptions.add(
      this.wishlistService.addPrinting(printing.id).subscribe({
        next: () => {
          this.isWishlistBusy.set(false);
          this.showCollectorMessage('Wishlist updated.');
        },
        error: (error) => {
          this.isWishlistBusy.set(false);
          this.handleCollectorError(error, 'wishlist');
        },
      }),
    );
  }

  increaseWishlistQuantity(): void {
    const wanted = this.wishlistRecord();

    if (!wanted || wanted.wantedQuantity >= 999 || this.isWishlistBusy()) {
      return;
    }

    this.updateWishlistQuantity(wanted, wanted.wantedQuantity + 1);
  }

  decreaseWishlistQuantity(): void {
    const wanted = this.wishlistRecord();

    if (!wanted || wanted.wantedQuantity <= 1 || this.isWishlistBusy()) {
      return;
    }

    this.updateWishlistQuantity(wanted, wanted.wantedQuantity - 1);
  }

  removeFromWishlist(): void {
    const wanted = this.wishlistRecord();

    if (!wanted || this.isWishlistBusy()) {
      return;
    }

    this.clearCollectorFeedback();
    this.isWishlistBusy.set(true);

    this.subscriptions.add(
      this.wishlistService.remove(wanted).subscribe({
        next: () => {
          this.isWishlistBusy.set(false);
          this.showCollectorMessage('Removed from Wishlist.');
        },
        error: (error) => {
          this.isWishlistBusy.set(false);
          this.handleCollectorError(error, 'wishlist');
        },
      }),
    );
  }

  hasMeaningfulValue(value: string | null | undefined): boolean {
    if (!value?.trim()) {
      return false;
    }

    return !['unknown', 'no-id', 'n/a', 'null', 'none', '-', '—'].includes(
      value.trim().toLowerCase(),
    );
  }

  printingVariants(printing: CardPrinting): string[] {
    const variants: string[] = [];

    if (printing.isFoil) variants.push('Foil');
    if (printing.isAltArt) variants.push('Alt Art');
    if (printing.isKickstarterVersion) variants.push('Kickstarter');
    if (printing.isRetailVersion) variants.push('Retail');
    if (printing.hasBetaSymbol) variants.push('Beta');
    if (printing.isPromo) variants.push('Promo');
    if (printing.isBoxTopper) variants.push('Box Topper');
    if (printing.isStarterDeckExclusive) variants.push('Starter Deck Exclusive');

    return variants;
  }

  printingAccessibleLabel(printing: CardPrinting): string {
    const variants = this.printingVariants(printing);
    const variantText = variants.length > 0 ? `, ${variants.join(', ')}` : '';

    const setText = this.hasMeaningfulValue(printing.setName) ? ` from ${printing.setName}` : '';

    return `Inspect printing ${printing.cardNumber}${setText}${variantText}`;
  }

  private updateCollectionQuantity(owned: OwnedCard, quantityOwned: number): void {
    this.clearCollectorFeedback();
    this.isCollectionBusy.set(true);

    this.subscriptions.add(
      this.ownedCardsService.updateQuantity(owned, quantityOwned).subscribe({
        next: () => {
          this.isCollectionBusy.set(false);
          this.showCollectorMessage('Collection updated.');
        },
        error: (error) => {
          this.isCollectionBusy.set(false);
          this.handleCollectorError(error, 'collection');
        },
      }),
    );
  }

  private updateWishlistQuantity(wanted: WishlistItem, wantedQuantity: number): void {
    this.clearCollectorFeedback();
    this.isWishlistBusy.set(true);

    this.subscriptions.add(
      this.wishlistService.updateQuantity(wanted, wantedQuantity).subscribe({
        next: () => {
          this.isWishlistBusy.set(false);
          this.showCollectorMessage('Wishlist updated.');
        },
        error: (error) => {
          this.isWishlistBusy.set(false);
          this.handleCollectorError(error, 'wishlist');
        },
      }),
    );
  }

  private loadCard(id: number): void {
    this.isLoading.set(true);
    this.isNotFound.set(false);
    this.loadError.set(false);
    this.card.set(null);
    this.selectedPrinting.set(null);
    this.clearCollectorFeedback();

    this.subscriptions.add(
      this.cardsService.getCardById(id).subscribe({
        next: (card) => {
          this.card.set(card);
          this.selectedPrinting.set(this.resolveInitialPrinting(card));
          this.isLoading.set(false);
          this.applyCardSeo(card);
          this.loadCollectorState();
        },
        error: (error) => {
          this.isLoading.set(false);

          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.showNotFound();
            return;
          }

          this.loadError.set(true);
          this.seo.apply({
            title: 'Unable to Load Card | Choom Vault',
            description: 'The requested Choom Vault card record could not be loaded.',
            robots: 'noindex, nofollow',
          });
        },
      }),
    );
  }

  private loadCollectorState(): void {
    this.subscriptions.add(
      this.authService.restoreSession().subscribe(() => {
        if (!this.authService.isAuthenticated()) {
          this.isCollectorStateLoading.set(false);
          return;
        }

        this.isCollectorStateLoading.set(true);

        this.subscriptions.add(
          forkJoin([this.ownedCardsService.load(), this.wishlistService.load()]).subscribe({
            next: () => {
              this.isCollectorStateLoading.set(false);
            },
            error: () => {
              this.isCollectorStateLoading.set(false);
              // Public inspection still works if optional private enrichment
              // fails. Any explicit mutation still receives the API's real
              // authentication/authorization response.
            },
          }),
        );
      }),
    );
  }

  private resolveInitialPrinting(card: Card): CardPrinting | null {
    if (card.printings.length === 0) {
      return null;
    }

    const queryPrintingId = Number(this.route.snapshot.queryParamMap.get('printing'));

    if (Number.isInteger(queryPrintingId) && queryPrintingId > 0) {
      const requestedPrinting = card.printings.find((printing) => printing.id === queryPrintingId);

      if (requestedPrinting) {
        return requestedPrinting;
      }
    }

    if (card.cardPrintingId) {
      const primaryPrinting = card.printings.find(
        (printing) => printing.id === card.cardPrintingId,
      );

      if (primaryPrinting) {
        return primaryPrinting;
      }
    }

    return card.printings[0];
  }

  private sendToLogin(intent: 'collection' | 'wishlist'): void {
    const card = this.card();
    const printing = this.selectedPrinting();

    if (!card || !printing) {
      return;
    }

    const returnUrl = `/cards/${card.id}?printing=${printing.id}`;

    void this.router.navigate(['/login'], {
      queryParams: {
        returnUrl,
        intent,
      },
    });
  }

  private handleCollectorError(error: unknown, target: 'collection' | 'wishlist'): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.sendToLogin(target);
        return;
      }

      if (error.status === 409) {
        if (target === 'collection') {
          this.ownedCardsService.load(true).subscribe();
        } else {
          this.wishlistService.load(true).subscribe();
        }

        this.showCollectorMessage(
          target === 'collection' ? 'Collection state refreshed.' : 'Wishlist state refreshed.',
        );
        return;
      }

      if (error.status === 429) {
        this.collectorError.set('Too many requests. Try again shortly.');
        return;
      }

      if (error.status === 403) {
        this.collectorError.set('This action is not available for your account.');
        return;
      }

      if (error.status === 404) {
        this.collectorError.set(
          'That collector record is no longer available. Refresh the card and try again.',
        );
        return;
      }
    }

    this.collectorError.set(
      target === 'collection'
        ? 'We could not update your Collection. Try again.'
        : 'We could not update your Wishlist. Try again.',
    );
  }

  private showCollectorMessage(message: string): void {
    this.clearCollectorMessageTimer();
    this.collectorMessage.set(message);

    this.collectorMessageTimer = setTimeout(() => {
      this.collectorMessage.set('');
      this.collectorMessageTimer = undefined;
    }, 2600);
  }

  private clearCollectorFeedback(): void {
    this.clearCollectorMessageTimer();
    this.collectorError.set('');
    this.collectorMessage.set('');
  }

  private clearCollectorMessageTimer(): void {
    if (this.collectorMessageTimer) {
      clearTimeout(this.collectorMessageTimer);
      this.collectorMessageTimer = undefined;
    }
  }

  private showNotFound(): void {
    this.isLoading.set(false);
    this.card.set(null);
    this.selectedPrinting.set(null);
    this.isNotFound.set(true);
    this.loadError.set(false);
    this.seo.apply({
      title: 'Card Record Not Found | Choom Vault',
      description: 'The requested card is not currently stored in the Choom Vault Archive.',
      robots: 'noindex, nofollow',
    });
  }

  private applyCardSeo(card: Card): void {
    const printing = this.selectedPrinting();
    const details = [
      this.hasMeaningfulValue(card.cardType) ? card.cardType : null,
      printing && this.hasMeaningfulValue(printing.setName) ? printing.setName : null,
      printing && this.hasMeaningfulValue(printing.rarity) ? printing.rarity : null,
    ].filter((value): value is string => Boolean(value));

    const qualifier = details.length > 0 ? ` ${details.join(' · ')}.` : '';

    this.seo.apply({
      title: `${card.name} | Cyberpunk TCG Card | Choom Vault`,
      description: `Inspect ${card.name} in the public Choom Vault card archive.${qualifier}`,
      robots: 'index, follow',
      canonicalPath: `/cards/${card.id}`,
    });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import {
  forkJoin,
  Subscription
} from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import { DynamicSeoService } from '../../../../core/seo/dynamic-seo.service';
import { OwnedCardsService } from '../../../collection/services/owned-cards.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { CardArtworkDirective } from '../../directives/card-artwork.directive';
import { CardPrinting } from '../../models/card-printing';
import { Card } from '../../models/card';
import { CardsService } from '../../services/cards.service';

/**
 * Public Card Detail / Inspection Table.
 *
 * Shared catalogue data is public. Collector state is loaded separately only
 * for an authenticated user and every mutation still relies on backend cookie,
 * CSRF, role and ownership enforcement.
 */
@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [
    RouterLink,
    CardArtworkDirective
  ],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.scss'
})
export class CardDetail implements OnInit, OnDestroy {
  readonly card = signal<Card | null>(null);
  readonly selectedPrinting = signal<CardPrinting | null>(null);
  readonly isLoading = signal(true);
  readonly isNotFound = signal(false);
  readonly loadError = signal(false);
  readonly collectorError = signal('');
  readonly isCollectorStateLoading = signal(false);
  readonly collectorMessage = signal('');
  readonly isAddingToCollection = signal(false);
  readonly isAddingToWishlist = signal(false);

  readonly ownedRecord = computed(() => {
    const printingId = this.selectedPrinting()?.id;

    if (!printingId) {
      return null;
    }

    return this.ownedCardsService
      .items()
      .find(item => item.cardPrintingId === printingId) ?? null;
  });

  readonly wishlistRecord = computed(() => {
    const printingId = this.selectedPrinting()?.id;

    if (!printingId) {
      return null;
    }

    return this.wishlistService
      .items()
      .find(item => item.cardPrintingId === printingId) ?? null;
  });

  private readonly subscriptions = new Subscription();

  constructor(
    readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cardsService: CardsService,
    private readonly ownedCardsService: OwnedCardsService,
    private readonly wishlistService: WishlistService,
    private readonly seo: DynamicSeoService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));

        if (!Number.isInteger(id) || id <= 0) {
          this.showNotFound();
          return;
        }

        this.loadCard(id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    this.collectorError.set('');
    this.collectorMessage.set('');

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        printing: printing.id
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  addToCollection(): void {
    const printing = this.selectedPrinting();

    if (!printing || this.isAddingToCollection()) {
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.sendToLogin('collection');
      return;
    }

    if (this.ownedRecord()) {
      return;
    }

    this.collectorError.set('');
    this.collectorMessage.set('');
    this.isAddingToCollection.set(true);

    this.subscriptions.add(
      this.ownedCardsService
        .addPrinting(printing.id)
        .subscribe({
          next: () => {
            this.isAddingToCollection.set(false);
            this.collectorMessage.set('Added to your Collection.');
          },
          error: error => {
            this.isAddingToCollection.set(false);
            this.handleCollectorError(error, 'collection');
          }
        })
    );
  }

  addToWishlist(): void {
    const printing = this.selectedPrinting();

    if (!printing || this.isAddingToWishlist()) {
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.sendToLogin('wishlist');
      return;
    }

    if (this.wishlistRecord()) {
      return;
    }

    this.collectorError.set('');
    this.collectorMessage.set('');
    this.isAddingToWishlist.set(true);

    this.subscriptions.add(
      this.wishlistService
        .addPrinting(printing.id)
        .subscribe({
          next: () => {
            this.isAddingToWishlist.set(false);
            this.collectorMessage.set('Added to your Wishlist.');
          },
          error: error => {
            this.isAddingToWishlist.set(false);
            this.handleCollectorError(error, 'wishlist');
          }
        })
    );
  }

  hasMeaningfulValue(value: string | null | undefined): boolean {
    if (!value?.trim()) {
      return false;
    }

    return ![
      'unknown',
      'n/a',
      'null',
      'none',
      '-',
      '—'
    ].includes(value.trim().toLowerCase());
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

  private loadCard(id: number): void {
    this.isLoading.set(true);
    this.isNotFound.set(false);
    this.loadError.set(false);
    this.card.set(null);
    this.selectedPrinting.set(null);
    this.collectorError.set('');
    this.collectorMessage.set('');

    this.subscriptions.add(
      this.cardsService.getCardById(id).subscribe({
        next: card => {
          this.card.set(card);
          this.selectedPrinting.set(this.resolveInitialPrinting(card));
          this.isLoading.set(false);
          this.applyCardSeo(card);
          this.loadCollectorState();
        },
        error: error => {
          this.isLoading.set(false);

          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.showNotFound();
            return;
          }

          this.loadError.set(true);
          this.seo.apply({
            title: 'Unable to Load Card | Choom Vault',
            description: 'The requested Choom Vault card record could not be loaded.',
            robots: 'noindex, nofollow'
          });
        }
      })
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
          forkJoin([
            this.ownedCardsService.load(),
            this.wishlistService.load()
          ]).subscribe({
            next: () => {
              this.isCollectorStateLoading.set(false);
            },
            error: () => {
              this.isCollectorStateLoading.set(false);
              // Public Card Detail remains usable if private collector-state
              // enrichment fails. Mutations still receive authoritative API
              // responses when the collector explicitly performs an action.
            }
          })
        );
      })
    );
  }

  private resolveInitialPrinting(card: Card): CardPrinting | null {
    if (card.printings.length === 0) {
      return null;
    }

    const queryPrintingId = Number(
      this.route.snapshot.queryParamMap.get('printing')
    );

    if (Number.isInteger(queryPrintingId) && queryPrintingId > 0) {
      const requestedPrinting = card.printings.find(
        printing => printing.id === queryPrintingId
      );

      if (requestedPrinting) {
        return requestedPrinting;
      }
    }

    if (card.cardPrintingId) {
      const primaryPrinting = card.printings.find(
        printing => printing.id === card.cardPrintingId
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
        intent
      }
    });
  }

  private handleCollectorError(
    error: unknown,
    target: 'collection' | 'wishlist'
  ): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.sendToLogin(target);
        return;
      }

      if (error.status === 409) {
        // Refresh private state so a duplicate conflict becomes the genuine
        // Owned/Wanted annotation instead of a generic error.
        if (target === 'collection') {
          this.ownedCardsService.load(true).subscribe();
        } else {
          this.wishlistService.load(true).subscribe();
        }
        this.collectorMessage.set(
          target === 'collection'
            ? 'This printing is already in your Collection.'
            : 'This printing is already on your Wishlist.'
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
    }

    this.collectorError.set(
      target === 'collection'
        ? 'We could not add this printing to your Collection. Try again.'
        : 'We could not add this printing to your Wishlist. Try again.'
    );
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
      robots: 'noindex, nofollow'
    });
  }

  private applyCardSeo(card: Card): void {
    const printing = this.selectedPrinting();
    const details = [
      this.hasMeaningfulValue(card.cardType) ? card.cardType : null,
      printing && this.hasMeaningfulValue(printing.setName) ? printing.setName : null,
      printing && this.hasMeaningfulValue(printing.rarity) ? printing.rarity : null
    ].filter((value): value is string => Boolean(value));

    const qualifier = details.length > 0
      ? ` ${details.join(' · ')}.`
      : '';

    this.seo.apply({
      title: `${card.name} | Cyberpunk TCG Card | Choom Vault`,
      description: `Inspect ${card.name} in the public Choom Vault card archive.${qualifier}`,
      robots: 'index, follow',
      canonicalPath: `/cards/${card.id}`
    });
  }
}

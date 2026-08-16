import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardAnatomyShowcase } from '../../features/cards/components/card-anatomy-showcase/card-anatomy-showcase';
import { CardArtworkDirective } from '../../features/cards/directives/card-artwork.directive';
import { Card } from '../../features/cards/models/card';
import { CardsService } from '../../features/cards/services/cards.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardAnatomyShowcase, CardArtworkDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  // Stores the six cards displayed in the curated homepage catalogue preview.
  featuredCards: Card[] = [];

  // Real card examples used by the miniature Vault record previews.
  collectionExampleCard: Card | null = null;
  wishlistExampleCard: Card | null = null;

  constructor(
    private readonly cardsService: CardsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadFeaturedCards();
  }

  /**
   * Public catalogue previews omit placeholder metadata instead of presenting
   * unsupported values as real card information.
   */
  hasMeaningfulValue(value: string | null | undefined): boolean {
    if (!value?.trim()) {
      return false;
    }

    return !['unknown', 'no-id', 'n/a', 'null', 'none', '-', '—'].includes(
      value.trim().toLowerCase(),
    );
  }

  /**
   * Loads cards from the API and selects the records used by the homepage.
   * The full searchable/filterable experience remains on the catalogue page.
   */
  private loadFeaturedCards(): void {
    this.cardsService.getCards().subscribe({
      next: (cards) => {
        const featuredNames = [
          'Black Clinic Miracle',
          'Kai Blackwire Sato',
          'Malcolm Vereen',
          'Orbital Drop',
          'The Last Broadcast',
          'Void Geisha',
        ];

        const cardsByName = new Map<string, Card>();

        for (const card of cards) {
          if (!card.name) {
            continue;
          }

          cardsByName.set(card.name.trim().toLowerCase(), card);
        }

        // Preserve the curated display order instead of relying on API ordering.
        this.featuredCards = featuredNames
          .map((name) => cardsByName.get(name.toLowerCase()))
          .filter((card): card is Card => card !== undefined);

        this.collectionExampleCard = cardsByName.get('black clinic miracle') ?? null;

        this.wishlistExampleCard = cardsByName.get('void geisha') ?? null;

        // The API response arrives asynchronously, so refresh the template state.
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.error('Unable to load featured cards', error);

        this.featuredCards = [];
        this.collectionExampleCard = null;
        this.wishlistExampleCard = null;

        this.changeDetectorRef.markForCheck();
      },
    });
  }
}

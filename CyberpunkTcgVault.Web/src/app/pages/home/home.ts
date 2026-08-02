import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CardsService } from '../../features/cards/services/cards.service';
import { Card } from '../../features/cards/models/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  // Stores the six cards displayed in the homepage preview.
  featuredCards: Card[] = [];

  constructor(
    private readonly cardsService: CardsService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // Load the featured cards when the homepage component starts.
    this.loadFeaturedCards();

  }

  /**
   * Loads all cards from the API and selects the six cards
   * that should appear in the homepage preview.
   */
  private loadFeaturedCards(): void {

    this.cardsService.getCards()
      .subscribe({

        next: cards => {

          const featuredNames = [
            'Black Clinic Miracle',
            'Kai Blackwire Sato',
            'Malcolm Vereen',
            'Orbital Drop',
            'The Last Broadcast',
            'Void Geisha'
          ];

          // Normalise the selected names once so matching is
          // case-insensitive and ignores accidental whitespace.
          const normalisedFeaturedNames = new Set(
            featuredNames.map(name =>
              name.trim().toLowerCase()
            )
          );

          // Keep only the six cards selected for the homepage.
          this.featuredCards = cards.filter(card => {

            if (!card.name) {
              return false;
            }

            const normalisedCardName =
              card.name.trim().toLowerCase();

            return normalisedFeaturedNames.has(
              normalisedCardName
            );

          });

          console.log(
            'API cards:',
            cards
          );

          console.log(
            'Featured cards:',
            this.featuredCards
          );

          /*
           * The API request completes asynchronously.
           *
           * Marking the component for checking ensures the template
           * updates immediately after a full browser refresh.
           */

          // The data is already here, Angular. Please update the screen without making me save the file again.
          this.changeDetectorRef.markForCheck();

        },

        error: error => {

          console.error(
            'Unable to load featured cards',
            error
          );


          // Ensure the view reflects the failed request.
          this.featuredCards = [];

          this.changeDetectorRef.markForCheck();

        }
      });
  }

  /**
   * Converts an image path returned by the API into the full URL
   * required by the browser.
   *
   * When a card has no image path, the API placeholder is used.
   */
  getImageUrl(imagePath: string | null): string {

    const resolvedImagePath =
      imagePath ?? '/images/cards/placeholder.png';

    return this.cardsService.getImageUrl(
      resolvedImagePath
    );

  }

  /**
   * Replaces an image with the API placeholder when the original
   * card image cannot be loaded.
   */
  onImageError(event: Event): void {

    const image = event.target as HTMLImageElement;

    /*
     * Disable the error handler before assigning the fallback.
     * This prevents an infinite loop if the placeholder also fails.
     */
    image.onerror = null;

    // The placeholder belongs to the API, so build its full API URL.
    image.src = this.cardsService.getImageUrl(
      '/images/cards/placeholder.png'
    );

  }
}
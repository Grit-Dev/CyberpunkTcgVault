import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Card } from '../../models/card';
import { CardsService } from '../../services/cards.service';

/*
 * Real API-connected card catalogue.
 *
 * This is kept separate from the homepage so the landing page can stay
 * focused on introducing the project, while this page handles live card data.
 */
@Component({
  selector: 'app-card-catalogue',
  imports: [],
  templateUrl: './card-catalogue.html',
  styleUrl: './card-catalogue.scss',
})
export class CardCatalogue implements OnInit {
  /*
   * Stores the cards returned by GET /api/Cards.
   */
  cards: Card[] = [];

  /*
   * Controls whether the loading state is visible.
   */
  isLoading = true;

  /*
   * Remains empty unless the API request fails.
   */
  errorMessage = '';

  constructor(
    private readonly cardsService: CardsService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  /*
   * Loads the catalogue when Angular creates this page.
   */
  ngOnInit(): void {
    this.loadCards();
  }

  /*
  * Builds the full image URL for card artwork.
  *
  * The API returns a relative path:
  * /images/cards/kai-blackwire-sato.png
  *
  * CardsService combines this with the environment API URL
  * so this component does not need to know where images are hosted.
  */
  getImageUrl(imagePath: string | null): string {

    if (!imagePath) {
      return this.cardsService.getImageUrl(
        '/images/cards/placeholder.png'
      );
    }

    return this.cardsService.getImageUrl(imagePath);
  }
  /*
   * Requests the public card catalogue and updates the appropriate
   * loading, success or error state.
   */
  private loadCards(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.cardsService.getCards().subscribe({
      next: (cards) => {

        /*
        * TEMP DEBUG:
        * Confirm the API response reaching Angular contains imageUrl.
        * Remove after verifying frontend image mapping.
        */
        console.log('Cards received from API:', cards);

        this.cards = cards;
        this.isLoading = false;

        // Notify Angular that the template state has changed.
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.error('Unable to load the card catalogue.', error);

        this.errorMessage =
          'Signal lost, choom. The card catalogue node is not responding. Try again in a moment.';

        this.isLoading = false;

        // Refresh the page so the error message becomes visible.
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
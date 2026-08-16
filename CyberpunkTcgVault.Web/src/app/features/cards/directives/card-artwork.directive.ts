import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

import { CardsService } from '../services/cards.service';

/*
 * Keeps card artwork loading behaviour consistent across the app.
 *
 * The directive resolves API image paths and automatically falls back to the
 * shared Vault placeholder when a card has no image or the image returns 404.
 */
@Directive({
  selector: 'img[appCardArtwork]',
  standalone: true,
})
export class CardArtworkDirective implements OnChanges {
  @Input('appCardArtwork') imagePath: string | null = null;

  private readonly placeholderPath = '/images/cards/placeholder.png';
  private hasUsedFallback = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLImageElement>,
    private readonly cardsService: CardsService,
  ) {}

  /**
   * Resolves the latest image path whenever Angular updates the input.
   */
  ngOnChanges(): void {
    this.hasUsedFallback = false;

    this.elementRef.nativeElement.src = this.cardsService.getImageUrl(this.imagePath);
  }

  /**
   * Replaces missing artwork with the shared placeholder.
   */
  @HostListener('error')
  onImageError(): void {
    if (this.hasUsedFallback) {
      return;
    }

    this.hasUsedFallback = true;

    this.elementRef.nativeElement.src = this.cardsService.getImageUrl(this.placeholderPath);
  }
}

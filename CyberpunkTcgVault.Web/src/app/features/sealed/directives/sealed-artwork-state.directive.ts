import { Directive, HostBinding, HostListener, Input, OnChanges } from '@angular/core';

/**
 * Keeps a Sealed artwork element hidden until the current source loads.
 * Native broken-image UI therefore never leaks into the product record.
 */
@Directive({
  selector: 'img[appSealedArtworkState]',
  standalone: true,
})
export class SealedArtworkStateDirective implements OnChanges {
  @Input({ required: true }) appSealedArtworkState: string | null = null;

  @HostBinding('class.sealed-record__art-image--loaded')
  isLoaded = false;

  ngOnChanges(): void {
    this.isLoaded = false;
  }

  @HostListener('load')
  onLoad(): void {
    this.isLoaded = true;
  }

  @HostListener('error')
  onError(): void {
    this.isLoaded = false;
  }
}

import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface DynamicSeoMetadata {
  title: string;
  description: string;
  robots: string;
  canonicalPath?: string;
}

/**
 * Applies metadata that can only be known after route data has loaded.
 *
 * Text is passed through Angular's Title/Meta APIs; it is never interpreted as
 * HTML. Canonical paths are application-owned paths rather than user-provided
 * external URLs.
 */
@Injectable({
  providedIn: 'root'
})
export class DynamicSeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply(metadata: DynamicSeoMetadata): void {
    this.title.setTitle(metadata.title);
    this.meta.updateTag({
      name: 'description',
      content: metadata.description
    });
    this.meta.updateTag({
      name: 'robots',
      content: metadata.robots
    });

    if (metadata.canonicalPath) {
      this.setCanonical(metadata.canonicalPath);
    } else {
      this.removeCanonical();
    }
  }

  removeCanonical(): void {
    this.document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.remove();
  }

  private setCanonical(path: string): void {
    this.removeCanonical();

    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = new URL(path, this.document.location.origin).href;
    this.document.head.appendChild(link);
  }
}

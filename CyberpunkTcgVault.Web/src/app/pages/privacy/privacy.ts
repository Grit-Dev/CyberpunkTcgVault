import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SiteFooter } from '../../shared/layout/site-footer/site-footer';
import { SiteHeader } from '../../shared/layout/site-header/site-header';


@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    SiteHeader,
    SiteFooter
  ],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss'
})
export class Privacy {
  private readonly document = inject(DOCUMENT);

  /**
   * Scrolls to a section of the current document without triggering Angular
   * route navigation.
   */
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();

    const section = this.document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      block: 'start'
    });
  }
}
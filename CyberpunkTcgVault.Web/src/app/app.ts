import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooter } from './shared/layout/site-footer/site-footer';
import { SiteHeader } from './shared/layout/site-header/site-header';

/**
 * Root application shell.
 *
 * Global public navigation is owned here so individual pages only need to
 * concern themselves with their own content.
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SiteHeader,
    SiteFooter
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
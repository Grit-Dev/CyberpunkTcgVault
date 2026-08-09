import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteFooter } from '../../shared/layout/site-footer/site-footer';
import { SiteHeader } from '../../shared/layout/site-header/site-header';

/**
 * Public fallback for routes that do not exist.
 *
 * Keeps the visitor inside Choom Vault and gives them clear routes back to
 * the homepage or card catalogue.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    SiteHeader,
    SiteFooter
  ],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound { }
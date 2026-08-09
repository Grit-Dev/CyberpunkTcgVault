import { Component } from '@angular/core';

import { SiteFooter } from '../../shared/layout/site-footer/site-footer';
import { SiteHeader } from '../../shared/layout/site-header/site-header';

/**
 * Public Contact / Rights page for Choom Vault.
 *
 * Provides a clear route for general project enquiries and legitimate
 * rights, attribution and removal requests.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    SiteHeader,
    SiteFooter
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {}
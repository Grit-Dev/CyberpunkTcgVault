import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Shared public Choom Vault header.
 *
 * The header owns application-level branding and navigation so individual
 * pages do not need to duplicate the same layout and interaction styles.
 */
@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss'
})
export class SiteHeader { }
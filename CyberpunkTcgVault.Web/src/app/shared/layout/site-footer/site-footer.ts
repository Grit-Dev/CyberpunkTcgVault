import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Shared public Choom Vault footer.
 *
 * Supporting navigation will live here as the About, Privacy and Contact
 * pages are introduced during this public-site completeness pass.
 */
@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss'
})
export class SiteFooter { }
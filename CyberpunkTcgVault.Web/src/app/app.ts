import {
  Component,
  OnInit
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './core/auth/auth.service';
import { CapabilitiesService } from './core/capabilities/capabilities.service';
import { SiteFooter } from './shared/layout/site-footer/site-footer';
import { SiteHeader } from './shared/layout/site-header/site-header';

/**
 * Root application shell.
 *
 * Global navigation is owned here so individual pages only need to concern
 * themselves with their own content. Startup also begins the two shared reads
 * needed across the application: product capabilities and session restoration.
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
export class App implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly capabilitiesService: CapabilitiesService
  ) { }

  ngOnInit(): void {
    // Both calls are one-shot HTTP requests and complete automatically.
    // Their services share/cache in-flight work so future guards/components do
    // not duplicate startup requests.
    this.authService.restoreSession().subscribe();
    this.capabilitiesService.load().subscribe();
  }
}

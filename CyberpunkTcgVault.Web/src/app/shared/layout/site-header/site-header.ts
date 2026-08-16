import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { CapabilitiesService } from '../../../core/capabilities/capabilities.service';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  readonly isLoggingOut = signal(false);

  constructor(
    readonly authService: AuthService,
    readonly capabilitiesService: CapabilitiesService,
    private readonly router: Router,
  ) {}

  logout(): void {
    if (this.isLoggingOut()) {
      return;
    }

    this.isLoggingOut.set(true);

    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.isLoggingOut.set(false);
        }),
      )
      .subscribe({
        next: () => {
          void this.router.navigate(['/']);
        },
        error: () => {
          // The backend remains authoritative. A failed logout request leaves
          // the current session state unchanged and simply re-enables the UI.
        },
      });
  }
}

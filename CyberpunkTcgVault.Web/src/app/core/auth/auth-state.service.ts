import {
  computed,
  Injectable,
  signal
} from '@angular/core';

import { AuthUser } from './auth.models';

/**
 * Small in-memory authentication store.
 *
 * It intentionally stores only the backend's public user contract. The real
 * authentication credential remains in the browser-managed HttpOnly cookie.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly currentUserState = signal<AuthUser | null>(null);
  private readonly initializedState = signal(false);

  readonly currentUser = this.currentUserState.asReadonly();
  readonly isInitialized = this.initializedState.asReadonly();
  readonly isAuthenticated = computed(
    () => this.currentUserState() !== null
  );
  readonly isDemo = computed(
    () => this.currentUserState()?.roles.includes('Demo') ?? false
  );
  readonly isAdmin = computed(
    () => this.currentUserState()?.roles.includes('Admin') ?? false
  );

  setUser(user: AuthUser): void {
    this.currentUserState.set(user);
    this.initializedState.set(true);
  }

  clearUser(): void {
    this.currentUserState.set(null);
    this.initializedState.set(true);
  }
}

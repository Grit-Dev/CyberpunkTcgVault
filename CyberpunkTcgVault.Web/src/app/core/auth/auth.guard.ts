import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from './auth.service';

/**
 * Protects private Angular routes for UX/navigation purposes.
 * The backend still independently authorizes every private API operation.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.restoreSession().pipe(
    map((user) =>
      user
        ? true
        : router.createUrlTree(['/login'], {
            queryParams: {
              returnUrl: state.url,
            },
          }),
    ),
  );
};

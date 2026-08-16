import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';
import { ForgotPassword } from './features/auth/pages/forgot-password/forgot-password';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { ResetPassword } from './features/auth/pages/reset-password/reset-password';
import { Account } from './features/account/pages/account/account';
import { CardCatalogue } from './features/cards/pages/card-catalogue/card-catalogue';
import { CardDetail } from './features/cards/pages/card-detail/card-detail';
import { Collection } from './features/collection/pages/collection/collection';
import { Wishlist } from './features/wishlist/pages/wishlist/wishlist';
import { Sealed } from './features/sealed/pages/sealed/sealed';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Privacy } from './pages/privacy/privacy';
import { Terms } from './pages/terms/terms';

/**
 * Choom Vault routes.
 *
 * Each route owns its browser title, search description and indexing policy.
 * SeoTitleStrategy applies those values whenever navigation completes.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Choom Vault | Cyberpunk TCG Collector Companion',
    component: Home,
    data: {
      description:
        'Choom Vault is an independent, fan-made Cyberpunk TCG collector companion for discovering cards and exploring a physical card collection.',
      robots: 'index, follow',
    },
  },
  {
    path: 'cards',
    title: 'Cyberpunk TCG Card Catalogue | Choom Vault',
    component: CardCatalogue,
    data: {
      description:
        'Browse the Cyberpunk TCG cards currently archived in Choom Vault using the public card catalogue, search and filters.',
      robots: 'index, follow',
    },
  },
  {
    path: 'cards/:id',
    title: 'Card Detail | Choom Vault',
    component: CardDetail,
    data: {
      description:
        'Inspect a Cyberpunk TCG card and its available physical printings in the public Choom Vault Archive.',
      robots: 'index, follow',
    },
  },
  {
    path: 'collection',
    title: 'My Collection | Choom Vault',
    component: Collection,
    canActivate: [authGuard],
    data: {
      description:
        'Manage the exact Cyberpunk TCG card printings in your private Choom Vault collection.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'wishlist',
    title: 'My Wishlist | Choom Vault',
    component: Wishlist,
    canActivate: [authGuard],
    data: {
      description:
        'Track the exact Cyberpunk TCG card printings you still want in your private Choom Vault Wishlist.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'sealed',
    title: 'Sealed Products | Choom Vault',
    component: Sealed,
    canActivate: [authGuard],
    data: {
      description:
        'Manage the unopened physical products recorded in your private Choom Vault collection.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'account',
    title: 'Account | Choom Vault',
    component: Account,
    canActivate: [authGuard],
    data: {
      description:
        'Review the account details connected to your private Choom Vault collector account.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'login',
    title: 'Log In | Choom Vault',
    component: Login,
    data: {
      description: 'Sign in to access your private Choom Vault collection records.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'register',
    title: 'Register | Choom Vault',
    component: Register,
    data: {
      description: 'Create a Choom Vault collector account when public registration is available.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password | Choom Vault',
    component: ForgotPassword,
    data: {
      description: 'Request a password reset link for a Choom Vault collector account.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'reset-password',
    title: 'Reset Password | Choom Vault',
    component: ResetPassword,
    data: {
      description: 'Set a new password using a Choom Vault password reset link.',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: 'about',
    title: 'About Choom Vault | Cyberpunk TCG Collector Companion',
    component: About,
    data: {
      description:
        'Learn about Choom Vault, an independent, fan-made Cyberpunk TCG collector companion built around physical card collecting.',
      robots: 'index, follow',
    },
  },
  {
    path: 'privacy',
    title: 'Privacy | Choom Vault',
    component: Privacy,
    data: {
      description:
        'Read how Choom Vault handles account, collection and privacy information as the collector companion develops.',
      robots: 'index, follow',
    },
  },
  {
    path: 'terms',
    title: 'Terms of Use | Choom Vault',
    component: Terms,
    data: {
      description: 'Terms governing use of Choom Vault and the Demo Vault collector experience.',
      robots: 'index, follow',
    },
  },
  {
    path: 'contact',
    title: 'Contact & Rights | Choom Vault',
    component: Contact,
    data: {
      description:
        'Contact Choom Vault for project enquiries, feedback, rights, attribution or removal requests.',
      robots: 'index, follow',
    },
  },
  {
    path: '**',
    title: 'Page Not Found | Choom Vault',
    component: NotFound,
    data: {
      description: 'The requested page could not be found in Choom Vault.',
      robots: 'noindex, nofollow',
    },
  },
];

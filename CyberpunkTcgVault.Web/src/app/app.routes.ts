import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CardCatalogue } from './features/cards/pages/card-catalogue/card-catalogue';
import { NotFound } from './pages/not-found/not-found';
import { About } from './pages/about/about';

export const routes: Routes = [
    {
        path: '',
        title: 'Choom Vault',
        component: Home
    },
    // Public API-connected catalogue, kept separate from the homepage prototype.
    {
        path: 'cards',
        title: 'Vault Archive | Choom Vault',
        component: CardCatalogue
    },
    {
        path: 'about',
        title: 'About | Choom Vault',
        component: About
    },
    {
        path: '**',
        title: '404 Not Found | Choom Vault',
        component: NotFound,
    }
];

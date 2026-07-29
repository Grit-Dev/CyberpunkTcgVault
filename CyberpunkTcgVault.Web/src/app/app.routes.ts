import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

import { CardCatalogue } from './features/cards/pages/card-catalogue/card-catalogue';

export const routes: Routes = [
    {
        path: '',
        title: 'Cyberpunk TCG Vault',
        component: Home
    },
    // Public API-connected catalogue, kept separate from the homepage prototype.
    {
        path: 'cards',
        title: 'CardCatalogue | Cyberpunk TCG Vault',
        component: CardCatalogue
    },
    {
        path: '**',
        redirectTo: '',
    }
];

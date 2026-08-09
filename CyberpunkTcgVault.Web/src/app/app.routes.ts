import { Routes } from '@angular/router';
import { CardCatalogue } from './features/cards/pages/card-catalogue/card-catalogue';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Privacy } from './pages/privacy/privacy';

// system where every Choom Vault URL has its own browser title, truthful description 
// and search-engine indexing rules, while one shared Angular service keeps all of that updated automatically as the user navigates.

export const routes: Routes = [
    {
        path: '',
        title:
            'Choom Vault | Cyberpunk TCG Collector Companion',
        component: Home,
        data: {
            description:
                'Choom Vault is an independent, fan-made Cyberpunk TCG collector companion for discovering cards and exploring a physical card collection.',
            robots:
                'index, follow'
        }
    },
    {
        path: 'cards',
        title:
            'Cyberpunk TCG Card Catalogue | Choom Vault',
        component: CardCatalogue,
        data: {
            description:
                'Browse the Cyberpunk TCG cards currently archived in Choom Vault using the public card catalogue, search and filters.',
            robots:
                'index, follow'
        }
    },
    {
        path: 'about',
        title:
            'About Choom Vault | Cyberpunk TCG Collector Companion',
        component: About,
        data: {
            description:
                'Learn about Choom Vault, an independent, fan-made Cyberpunk TCG collector companion built around physical card collecting.',
            robots:
                'index, follow'
        }
    },
    {
        path: 'privacy',
        title:
            'Privacy | Choom Vault',
        component: Privacy,
        data: {
            description:
                'Read how Choom Vault handles account, collection and privacy information as the collector companion develops.',
            robots:
                'index, follow'
        }
    },
    {
        path: 'contact',
        title:
            'Contact & Rights | Choom Vault',
        component: Contact,
        data: {
            description:
                'Contact Choom Vault for project enquiries, feedback, rights, attribution or removal requests.',
            robots:
                'index, follow'
        }
    },
    {
        path: '**',
        title:
            'Page Not Found | Choom Vault',
        component: NotFound,
        data: {
            description:
                'The requested page could not be found in Choom Vault.',
            robots:
                'noindex, nofollow'
        }
    }
];
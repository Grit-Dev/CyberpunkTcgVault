import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { apiSecurityInterceptor } from './core/http/api-security.interceptor';
import { SeoTitleStrategy } from './core/seo/seo-title-strategy';
export const appConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptors([apiSecurityInterceptor])),
        provideRouter(routes, withInMemoryScrolling({
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        })),
        /*
         * Uses Choom Vault's custom route title strategy so each page can
         * update its browser title, meta description and robots instructions.
         */
        {
            provide: TitleStrategy,
            useClass: SeoTitleStrategy
        }
    ]
};

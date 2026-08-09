import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  TitleStrategy
} from '@angular/router';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/seo/seo-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),

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
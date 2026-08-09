import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
    ActivatedRouteSnapshot,
    PRIMARY_OUTLET,
    RouterStateSnapshot,
    TitleStrategy
} from '@angular/router';

/**
 * Keeps public page titles and metadata in sync with Angular routing.
 */
@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);

    /**
     * Updates the browser title, description and robots metadata after a
     * successful Angular route navigation.
     */
    override updateTitle(routerState: RouterStateSnapshot): void {
        const pageTitle = this.buildTitle(routerState);

        if (pageTitle) {
            this.title.setTitle(pageTitle);
        }

        const activeRoute = this.getDeepestPrimaryRoute(routerState.root);
        const description = activeRoute.data['description'] as string | undefined;
        const robots = activeRoute.data['robots'] as string | undefined;

        if (description) {
            this.meta.updateTag({
                name: 'description',
                content: description
            });
        } else {
            this.meta.removeTag("name='description'");
        }

        this.meta.updateTag({
            name: 'robots',
            content: robots ?? 'index, follow'
        });
    }

    /**
     * Finds the active leaf route so nested routes can own their own metadata
     * without changing this strategy later.
     */
    private getDeepestPrimaryRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
        let currentRoute = route;

        while (true) {
            const primaryChild = currentRoute.children.find(
                child => child.outlet === PRIMARY_OUTLET
            );

            if (!primaryChild) {
                return currentRoute;
            }

            currentRoute = primaryChild;
        }
    }
}

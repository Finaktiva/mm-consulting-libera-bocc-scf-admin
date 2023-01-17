import { Inject, Pipe, PipeTransform } from '@angular/core';
import { APP_ROUTES_PROVIDER, AppRoutes, PRODUCTION_PROVIDER } from '@libera/environment';

@Pipe({
    name: 'baseUrl',
})
export class BaseUrlPipe implements PipeTransform {
    constructor(
        @Inject(APP_ROUTES_PROVIDER) private routes: AppRoutes,
        @Inject(PRODUCTION_PROVIDER) private production: boolean
    ) {}

    transform(url: string, app: 'admin' | 'enterprise' | 'landing'): string {
        const baseUrl = this.production ? this.routes[app] : '';
        return `${baseUrl}/${url}`;
    }
}

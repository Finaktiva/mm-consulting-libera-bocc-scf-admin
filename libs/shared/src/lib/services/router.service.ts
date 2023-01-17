import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map, take, tap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RouterService {
    private navigationId: number = 0;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.subscription = this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                map<NavigationEnd, number>(e => e.id)
            )
            .subscribe(id => (this.navigationId = id));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getQueryParam(key: string) {
        return this.route.queryParamMap.pipe(
            map(params => params.get(key)),
            take(1)
        );
    }

    get hasRouterHistory() {
        return this.navigationId > 1;
    }
}

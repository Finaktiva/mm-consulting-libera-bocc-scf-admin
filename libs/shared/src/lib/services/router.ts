import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class RouterHelper {
    constructor(private router: Router) {}

    getCurrentRoute(): ActivatedRoute {
        let route = this.router.routerState.root;

        while (route.firstChild) route = route.firstChild;

        return route;
    }
}

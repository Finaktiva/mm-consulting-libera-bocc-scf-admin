import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class TokenGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(snapshot: ActivatedRouteSnapshot) {
        const token = snapshot.queryParamMap.get('token');

        return token ? true : this.router.parseUrl('/core');
    }
}

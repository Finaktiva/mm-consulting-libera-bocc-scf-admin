import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CanCompleteNewPasswordGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return next.queryParamMap.get('email')
            ? true
            : this.router.parseUrl('/sign-in');
    }
}

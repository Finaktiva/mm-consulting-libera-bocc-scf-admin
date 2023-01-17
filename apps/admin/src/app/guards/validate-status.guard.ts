import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EnterpriseListStatus } from '@libera/models/enterprise';

@Injectable({
    providedIn: 'root',
})
export class ValidateStatusGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        { data }: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return (
            !!EnterpriseListStatus[data.status.toUpperCase()] ||
            this.router.parseUrl('/programs')
        );
    }
}

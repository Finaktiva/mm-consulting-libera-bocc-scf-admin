import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ENTERPRISE_REQUEST_TYPE } from '@libera/models/enterprise-request';

@Injectable({
    providedIn: 'root',
})
export class RequestGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const status = route.queryParamMap.get('type');

        return status == ENTERPRISE_REQUEST_TYPE.ENTERPRISE_LINKING ||
            status == ENTERPRISE_REQUEST_TYPE.ENTERPRISE_MODULE_ACTIVATION
            ? true
            : this.router.parseUrl(
                  `requests?type=${
                      ENTERPRISE_REQUEST_TYPE.ENTERPRISE_MODULE_ACTIVATION
                  }`
              );
    }
}

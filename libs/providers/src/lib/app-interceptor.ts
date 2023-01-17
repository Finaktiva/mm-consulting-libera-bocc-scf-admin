import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticationFacade } from '@libera/authentication';
import { API_ENDPOINT_PROVIDER } from '@libera/environment';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(
        private authenticationFacade: AuthenticationFacade,
        @Inject(API_ENDPOINT_PROVIDER) private endpoint: string
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authenticationFacade.idToken$.pipe(
            take(1),
            switchMap(token => {
                if (req.url.includes(this.endpoint) && token) {
                    const clone = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    return next.handle(clone);
                }
                return next.handle(req);
            })
        );
    }
}

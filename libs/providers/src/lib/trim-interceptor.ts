import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { trimJSON } from '../../../shared/src/lib/utils/trim-json';

@Injectable()
export class TrimInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const newRequest = this.hasBody(request.method)
            ? request.clone({
                  body: trimJSON(request.body),
              })
            : request;

        return next.handle(newRequest);
    }

    private hasBody(method: string): boolean {
        switch (method) {
            case 'DELETE':
            case 'GET':
            case 'HEAD':
            case 'OPTIONS':
            case 'JSONP':
                return false;
            default:
                return true;
        }
    }
}

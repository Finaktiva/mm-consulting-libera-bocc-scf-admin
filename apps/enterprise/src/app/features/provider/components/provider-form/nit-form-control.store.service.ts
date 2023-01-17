import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnterpriseService } from '@libera/api';
import { Enterprise } from '@libera/models/enterprise';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { NitFormControlStore } from './nit-form-control.store';

@Injectable()
export class NitFormControlStoreService {
    constructor(
        private store: NitFormControlStore,
        private enterpriseService: EnterpriseService
    ) {}

    findByNit(nit: string): Observable<Enterprise> {
        this.store.fetch();

        return this.enterpriseService.findByNit(nit).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 409) return of(null);
                return throwError(error);
            }),
            tap(
                () => this.store.fetchSuccess(),
                error => this.store.fetchError(error)
            )
        );
    }
}

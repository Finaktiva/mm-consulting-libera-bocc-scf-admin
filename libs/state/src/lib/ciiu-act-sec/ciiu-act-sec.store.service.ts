import { Injectable } from '@angular/core';
import { CiiuActSecService } from '@libera/api';
import { tap } from 'rxjs/operators';
import { CiiuActSecStore } from './ciiu-act-sec.store';
import { CiiuActSecQuery } from './ciiu-act-sec.query';

@Injectable({
    providedIn: 'root',
})
export class CiiuActSecStoreService {
    constructor(
        private query: CiiuActSecQuery,
        private store: CiiuActSecStore,
        private ciiuActSecService: CiiuActSecService
    ) {}
    fetch(id: string) {
        this.store.fetch(id);
        return this.ciiuActSecService
            .get(id)
            .pipe(
                tap(
                    ciiuActSec => this.store.fetchSuccess(id,ciiuActSec),
                    error => this.store.fetchError(id, error)
                )
            );
    }
}
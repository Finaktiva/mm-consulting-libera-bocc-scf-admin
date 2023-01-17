import { Injectable } from '@angular/core';
import { ApisService } from '@libera/api';
import { tap } from 'rxjs/operators';

import { DutyQuery } from './duty.query';
import { DutyStore } from './duty.store';

@Injectable({
    providedIn: 'root',
})
export class DutyStoreService {
    constructor(
        private query: DutyQuery,
        private store: DutyStore,
        private apisService: ApisService
    ) {}

    getByDutyNumber(dutyNumber: string) {
        this.store.fetch(dutyNumber);
        return this.apisService
            .getBalanceByDutyNumber(dutyNumber)
            .pipe(
                tap(
                    payload => this.store.fetchSuccess(dutyNumber, payload),
                    error => this.store.fetchError(dutyNumber, error)
                )
            );
    }
}
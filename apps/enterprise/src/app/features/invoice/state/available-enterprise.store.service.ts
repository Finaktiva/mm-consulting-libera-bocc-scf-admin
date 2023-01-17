import { Injectable } from '@angular/core';
import { EnterpriseService } from '@libera/api';
import { AuthenticationQuery } from '@libera/state';
import { tap } from 'rxjs/operators';
import { AvailableEnterpriseStore } from './available-enterprise.store';
import { AvailableEnterpriseType } from '@libera/models/enterprise';


@Injectable()
export class AvailableEnterpriseStoreService {
    constructor(
        private authenticationQuery: AuthenticationQuery,
        private enterpriseService: EnterpriseService,
        private store: AvailableEnterpriseStore
    ) {}

    find(query: string, type: AvailableEnterpriseType) {
        const id = this.authenticationQuery.getEnterpriseId();

        this.store.fetchAll();

        return this.enterpriseService
            .findAvailableEnterprises(id, query, type)
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            );
    }
}

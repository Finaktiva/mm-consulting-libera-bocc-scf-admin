import { Injectable } from '@angular/core';
import { CatalogService } from '@libera/api';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CitiesAndDepartmentsQuery } from './cities-and-departments.query';
import { CitiesAndDepartmentsStore } from './cities-and-departments.store';

@Injectable({
    providedIn: 'root',
})
export class CitiesAndDepartmentsStoreService {
    constructor(
        private query: CitiesAndDepartmentsQuery,
        private store: CitiesAndDepartmentsStore,
        private catalogService: CatalogService
    ) {}

    fetchAll() {
        this.store.fetchAll();

        return this.catalogService
            .getAllCitiesAndDepartments()
            .pipe(
                tap(
                    payload => {return this.store.fetchAllSuccess(payload)},
                    error =>{console.log(error); return this.store.fetchAllError(error)}
                )
            );
    }
}
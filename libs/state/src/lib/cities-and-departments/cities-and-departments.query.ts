import { Injectable } from '@angular/core';
import { CitiesAndDepartments } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';

import { CitiesAndDepartmentsStore } from './cities-and-departments.store';

@Injectable({
    providedIn: 'root',
})
export class CitiesAndDepartmentsQuery extends EntityQuery<CitiesAndDepartments> {
    constructor(store: CitiesAndDepartmentsStore) {
        super(store);
    }
}

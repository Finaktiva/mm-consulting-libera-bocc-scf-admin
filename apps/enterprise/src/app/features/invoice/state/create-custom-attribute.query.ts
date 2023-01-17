import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';

import { CreateCustomAttributeStore } from './create-custom-attribute.store';

@Injectable({
    providedIn: 'root',
})
export class CreateCustomAttributeQuery extends SubmitQuery {
    constructor(private store: CreateCustomAttributeStore) {
        super(store);
    }
}

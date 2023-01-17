import { Injectable } from '@angular/core';
import { SubmitQuery } from '@mediomelon/ng-core';
import { CreateCustomAttributesStore } from './create-custom-attributes.store';

@Injectable({
    providedIn: 'root',
})
export class CreateCustomAttributesQuery extends SubmitQuery {
    constructor(private store: CreateCustomAttributesStore) {
        super(store);
    }
}

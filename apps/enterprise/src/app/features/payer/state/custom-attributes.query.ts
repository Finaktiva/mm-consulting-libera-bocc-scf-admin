import { Injectable } from '@angular/core';
import { EntityQuery, ID } from '@mediomelon/ng-core';
import { LenderCustomAttribute } from '@libera/models/lender';
import {
    CustomAttributeUIState,
    CustomAttributesStore,
} from './custom-attributes.store';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CustomAttributesQuery extends EntityQuery<
    LenderCustomAttribute,
    CustomAttributeUIState
> {
    constructor(store: CustomAttributesStore) {
        super(store);
    }

    selectUIEntityDeleting(id: ID) {
        return this.selectUIEntity(id).pipe(
            map(entity => (entity ? entity.delete.submitting : false))
        );
    }

    shouldFetch() {
        return !this.getLoaded() || !!this.getError();
    }
}

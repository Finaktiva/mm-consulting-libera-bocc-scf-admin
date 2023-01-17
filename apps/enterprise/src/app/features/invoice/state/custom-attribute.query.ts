import { Injectable } from '@angular/core';
import { EnterpriseCustomAttribute } from '@libera/models/enterprise';
import { EntityQuery, StateWithUI } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import {
    CustomAttributeStore,
    CustomAttributeUI,
} from './custom-attribute.store';

export interface CustomAttributeWithUI
    extends StateWithUI<EnterpriseCustomAttribute, CustomAttributeUI> {}

@Injectable({
    providedIn: 'root',
})
export class CustomAttributeQuery extends EntityQuery<
    EnterpriseCustomAttribute,
    CustomAttributeUI
> {
    constructor(private store: CustomAttributeStore) {
        super(store);
    }

    selectUIEntityDeleting(id: number): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            select(entity => (entity ? entity.delete.submitting : false))
        );
    }

    selectEntitiesMap() {
        return super.selectEntitiesMap();
    }
}

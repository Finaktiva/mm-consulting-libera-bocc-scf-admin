import { Injectable } from '@angular/core';
import { EntityListQuery, UIState, ID } from '@mediomelon/ng-core';
import {
    LinkedLender,
    LenderOrderedListPaginationFilterPayload,
} from '@libera/models/lender';
import { LinkedLenderStore, LinkedLenderUI } from './linked-lender.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LinkedLenderQuery extends EntityListQuery<
    LinkedLender,
    LinkedLenderUI,
    LenderOrderedListPaginationFilterPayload
> {
    constructor(private store: LinkedLenderStore) {
        super(store);
    }

    selectRequestingState(id: ID): Observable<boolean> {
        return this.selectUIEntity(id).pipe(
            map(entity => (entity ? entity.requesting.submitting : false))
        );
    }
}

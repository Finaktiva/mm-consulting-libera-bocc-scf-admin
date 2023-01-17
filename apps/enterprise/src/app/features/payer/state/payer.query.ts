import { Injectable } from '@angular/core';
import { Payer, PayerListPaginationFilterPayload } from '@libera/models/payer';
import { EntityListQuery, StateWithUI, UIState, ID } from '@mediomelon/ng-core';
import { PayerAttributeUI, PayerStore } from './payer.store';
import { map } from 'rxjs/operators';

export interface PayerWithUI extends StateWithUI<Payer, UIState> {}

@Injectable({
    providedIn: 'root',
})
export class PayerQuery extends EntityListQuery<
    Payer,
    PayerAttributeUI,
    PayerListPaginationFilterPayload
> {
    constructor(private store: PayerStore) {
        super(store);
    }

    selectUIEntityDeleting(id: ID) {
        return this.selectUIEntity(id).pipe(
            map(entity => (entity ? entity.delete.submitting : false))
        );
    }

    selectUIEntityUpdating(id: ID) {
        return this.selectUIEntity(id).pipe(
            map(entity => (entity ? entity.updating.submitting : false))
        );
    }
}

import { Injectable } from '@angular/core';
import { Lender } from '@libera/models/lender';
import { EntityListQuery, StateWithUI, UIState } from '@mediomelon/ng-core';

import { LenderStore } from './lender.store';

export interface LenderWithUI extends StateWithUI<Lender, UIState> {}

@Injectable({
    providedIn: 'root',
})
export class LenderQuery extends EntityListQuery {
    constructor(private store: LenderStore) {
        super(store);
    }
}

import { Injectable } from '@angular/core';
import { Duty } from '@libera/models/duty';
import { EntityQuery } from '@mediomelon/ng-core';
import { DutyStore } from './duty.store';

@Injectable({
    providedIn: 'root',
})
export class DutyQuery extends EntityQuery<Duty> {
    constructor(store: DutyStore) {
        super(store);
    }
}
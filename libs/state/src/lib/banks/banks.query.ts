import { Injectable } from '@angular/core';
import { Bank } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';
import { BankStore } from './banks.store';

@Injectable({
    providedIn: 'root',
})
export class BankQuery extends EntityQuery<Bank> {
    constructor(store: BankStore) {
        super(store);
    }
}
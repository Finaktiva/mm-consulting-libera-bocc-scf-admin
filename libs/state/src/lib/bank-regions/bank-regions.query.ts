import { Injectable } from '@angular/core';
import { BankRegions } from '@libera/models/catalog';
import { EntityQuery } from '@mediomelon/ng-core';
import { BankRegionsStore } from './bank-regions.store';


@Injectable({
    providedIn: 'root',
})
export class BankRegionsQuery extends EntityQuery<BankRegions>{
    constructor(store: BankRegionsStore){
        super(store)
    }
}
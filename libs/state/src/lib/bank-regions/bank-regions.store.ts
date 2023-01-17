import { Injectable } from "@angular/core";
import { BankRegions } from "@libera/models/catalog";
import { EntityStore, EntityStoreState } from "@mediomelon/ng-core";


const initialState: EntityStoreState<BankRegions> = {
    entities: {},
    uiEntities: {},
    error: null,
    ids: [],
    loaded: false,
    loading: false,
}

@Injectable({
    providedIn: 'root',
})
export class BankRegionsStore extends EntityStore<BankRegions>{
    constructor(){
        super(initialState)
    }
}
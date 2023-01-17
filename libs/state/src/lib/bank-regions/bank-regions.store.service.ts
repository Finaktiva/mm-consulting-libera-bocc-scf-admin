import { Injectable } from "@angular/core";
import { CatalogService } from "@libera/api";
import { tap } from "rxjs/operators";
import { BankRegionsStore } from "./bank-regions.store";


@Injectable({
    providedIn: 'root',
})
export class BankRegionsStoreServices {
    constructor(
        private store: BankRegionsStore,
        private catalogServices: CatalogService
    ) { }

    fetchAll(){
        this.store.fetchAll()
        return this.catalogServices
            .getBankRegions()
            .pipe(
                tap(
                    payload => this.store.fetchAllSuccess(payload),
                    error => this.store.fetchAllError(error)
                )
            )
    }
}
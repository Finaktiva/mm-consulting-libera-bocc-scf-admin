import { Injectable } from '@angular/core';
import { PayerCustomAttribute } from '@libera/models/payer';
import { EntityQuery } from '@mediomelon/ng-core';
import {
    PayerCustomAttributesStore,
    PayerCustomAttributeUIState,
} from './payer-custom-attributes.store';

@Injectable({
    providedIn: 'root',
})
export class PayerCustomAttributesQuery extends EntityQuery<
    PayerCustomAttribute,
    PayerCustomAttributeUIState
> {
    constructor(store: PayerCustomAttributesStore) {
        super(store);
    }
}

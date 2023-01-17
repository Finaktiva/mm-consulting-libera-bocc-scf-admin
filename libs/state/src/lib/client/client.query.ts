import { Injectable } from '@angular/core';
import { Client } from '@libera/models/client';
import { EntityQuery } from '@mediomelon/ng-core';

import { ClientStore } from './client.store';

@Injectable({
    providedIn: 'root',
})
export class ClientQuery extends EntityQuery<Client> {
    constructor(store: ClientStore) {
        super(store);
    }
}
import { Injectable } from '@angular/core';
import { economicActivity } from '@libera/models/ciuu-act-sec';
import { EntityListQuery } from '@mediomelon/ng-core';

import { CiiuActSecStore } from './ciiu-act-sec.store';

@Injectable({
    providedIn: 'root',
})
export class CiiuActSecQuery extends EntityListQuery<economicActivity> {
    constructor(store: CiiuActSecStore) {
        super(store);
    }
}
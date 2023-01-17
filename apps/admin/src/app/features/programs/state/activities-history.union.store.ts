import { Injectable } from '@angular/core';
import { UnionStore } from '@mediomelon/ng-core';

@Injectable({
    providedIn: 'root'
})

export class ActivitiesHistoryUnionStore extends UnionStore {
    constructor() {
        super();
    }
}

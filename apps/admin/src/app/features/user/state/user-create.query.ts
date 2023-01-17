import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { UserCreateStore } from './user-create.store';

@Injectable({
    providedIn: 'root',
})
export class UserCreateQuery {
    constructor(private store: UserCreateStore) {}

    selectSubmitting(): Observable<boolean> {
        return this.store.state.pipe(
            map(state => state.submitting),
            distinctUntilChanged()
        );
    }

    selectError(): Observable<any> {
        return this.store.state.pipe(
            map(state => state.error),
            distinctUntilChanged()
        );
    }
}

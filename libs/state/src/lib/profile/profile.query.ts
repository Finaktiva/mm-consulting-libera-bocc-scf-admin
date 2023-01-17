import { Injectable } from '@angular/core';
import { Profile } from '@libera/models/profile';
import { Query } from '@mediomelon/ng-core';
import { select } from 'rxjs-augmented/operators';

import { ProfileStore, ProfileUI } from './profile.store';

@Injectable({
    providedIn: 'root',
})
export class ProfileQuery extends Query<Profile, ProfileUI> {
    constructor(private store: ProfileStore) {
        super(store);
    }

    selectUpdating() {
        return this.selectUIState().pipe(
            select(state => state.update.submitting)
        );
    }
}

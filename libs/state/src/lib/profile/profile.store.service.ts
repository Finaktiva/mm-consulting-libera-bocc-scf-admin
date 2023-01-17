import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '@libera/api';
import { Profile } from '@libera/models/profile';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProfileQuery } from './profile.query';
import { ProfileStore } from './profile.store';
import { TranslateService } from '@ngx-translate/core';
import { ProfileRolePermissionsStore } from './profile-role-permissions.store';

@Injectable({
    providedIn: 'root',
})
export class ProfileStoreService {
    constructor(
        private store: ProfileStore,
        private query: ProfileQuery,
        private profileService: ProfileService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private permissionsStore: ProfileRolePermissionsStore,
    ) {}

    fetch() {
        // const shouldFetch = !this.query.getLoaded() || !!this.query.getError();

        // if (!shouldFetch) return EMPTY;

        this.store.fetch();

        return this.profileService
            .get()
            .pipe(
                tap(
                    payload => this.store.fetchSuccess(payload),
                    error => this.store.fetchError(error)
                )
            );
    }

    update(payload: Profile) {
        this.store.update();

        return this.profileService.update(payload).pipe(
            tap(
                () => {
                    this.store.updateSuccess(payload);
                    this.snackbar.open(
                        this.translateService.instant(
                            'PROFILE.PROFILE_UPDATED_SUCCESSFULLY'
                        ),
                        'OK'
                    );
                },
                error => {
                    this.store.updateError(error);
                    this.snackbar.open(
                        this.translateService.instant(
                            'PROFILE.PROFILE_UPDATED_ERROR'
                        ),
                        'OK'
                    );
                }
            )
        );
    }

    fetchRolePermissions() {
        this.permissionsStore.fetchAll();

        return this.profileService.getRolePermissions().pipe(
            tap(
                (payload) => this.permissionsStore.fetchAllSuccess(payload),
                error => this.permissionsStore.fetchAllError(error)
            )
        );
    }
}

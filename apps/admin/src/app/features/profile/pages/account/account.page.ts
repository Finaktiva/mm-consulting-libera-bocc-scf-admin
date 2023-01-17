import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ENTERPRISE_MODULES } from '@libera/models/enterprise';
import { Profile } from '@libera/models/profile';
import { ProfileQuery, ProfileStoreService } from '@libera/state';

@Component({
    selector: 'account',
    templateUrl: './account.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPage implements OnInit {
    isSubmitting$ = this.query.selectUpdating();

    hasLoaded$ = this.query.selectLoaded();

    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    profile$ = this.query.selectState();

    ENTERPRISE_MODULES = ENTERPRISE_MODULES;

    constructor(
        private storeService: ProfileStoreService,
        private query: ProfileQuery
    ) {}

    ngOnInit() {
        this.fetchProfile();
    }

    onSubmit(profile: Profile) {
        this.storeService.update(profile).subscribe();
    }

    fetchProfile() {
        this.storeService.fetch().subscribe();
    }
}

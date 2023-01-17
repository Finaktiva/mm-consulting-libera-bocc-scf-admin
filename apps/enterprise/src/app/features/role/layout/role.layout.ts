import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { SECONDS_TO_EXPIRE_SESSION_PROVIDER } from '@libera/environment';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
    selector: 'role-layout',
    templateUrl: './role.layout.html',
    styleUrls: ['./role.layout.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleLayout implements OnInit{
    isSubmitting$ = this.query.selectSigningOut();

    constructor(
        private storeService: AuthenticationStoreService,
        private query: AuthenticationQuery,
        private bnIdle: BnNgIdleService,
        private translateService: TranslateService,
        @Inject(SECONDS_TO_EXPIRE_SESSION_PROVIDER) private secondsToExpireSessionProvider: number,
    ) {}

    ngOnInit(): void {
        this.bnIdle.startWatching(this.secondsToExpireSessionProvider).subscribe((isTimedOut: boolean) => {
            if (isTimedOut) {
                this.bnIdle.stopTimer();
                this.onSignOut(true);
            }
        });
    }

    onSignOut(sessionExpired?: boolean) {
        this.storeService.signOut(sessionExpired).subscribe();
    }
}

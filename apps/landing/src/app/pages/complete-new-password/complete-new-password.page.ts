import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRoutes, APP_ROUTES_PROVIDER, SECONDS_TO_EXPIRE_SESSION_PROVIDER } from '@libera/environment';
import { CompleteNewPasswordPayload } from '@libera/models/authentication';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';
import { BnNgIdleService } from 'bn-ng-idle';
import { map } from 'rxjs/operators';

@Component({
    selector: 'complete-new-password',
    templateUrl: './complete-new-password.page.html',
})
export class CompleteNewPasswordPage implements OnInit{
    isCompletingNewPassword$ = this.query.selectCompletingNewPassword();

    email$ = this.route.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('email'))
    );

    constructor(
        private route: ActivatedRoute,
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService,
        private bnIdle: BnNgIdleService,
        @Inject(SECONDS_TO_EXPIRE_SESSION_PROVIDER) private secondsToExpireSessionProvider: number,
        @Inject(APP_ROUTES_PROVIDER) private routes: AppRoutes,
        @Inject(DOCUMENT) private document: Document,
    ) {}

    ngOnInit(): void {
        this.bnIdle.startWatching(this.secondsToExpireSessionProvider).subscribe((isTimedOut: boolean) => {
            if (isTimedOut) {
                this.bnIdle.stopTimer();
                this.document.location.assign(this.routes.landing + '?disconnection=session_expired');
            }
        });
    }

    onSubmit(payload: CompleteNewPasswordPayload) {
        this.storeService.completeNewPassword(payload).subscribe();
    }
}

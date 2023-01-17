import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnterpriseProviderLinkConfirmation } from '@libera/models/enterprise';

import { LinkQuery } from '../../state/link.query';
import { LinkStoreService } from '../../state/link.store.service';

@Component({
    selector: 'confirm-link',
    templateUrl: './confirm-link.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmLinkPage implements OnInit {
    hasLoaded$ = this.query.selectLoaded();

    isLoading$ = this.query.selectLoading();

    error$ = this.query.selectError();

    enterpriseName$ = this.query.selectEnterpriseName();

    isValid$ = this.query.selectIsTokenValid();

    isExpired$ = this.query.selectIsTokenExpired();

    isApplied$ = this.query.selectIsTokenApplied();

    isSubmitting$ = this.query.selectConfirming();

    constructor(
        private storeService: LinkStoreService,
        private query: LinkQuery,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.fetch();
    }

    onAccept() {
        this.confirm('ACCEPTED');
    }

    onReject() {
        this.confirm('REJECTED');
    }

    fetch() {
        this.storeService.fetch(this.getToken()).subscribe();
    }

    private confirm(confirm: EnterpriseProviderLinkConfirmation) {
        this.storeService.confirm(this.getToken(), confirm).subscribe();
    }

    private getToken() {
        return this.route.snapshot.queryParamMap.get('token');
    }
}

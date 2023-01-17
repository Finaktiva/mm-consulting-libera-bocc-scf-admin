import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';

@Component({
    selector: 'link-layout',
    templateUrl: './link.layout.html',
    styleUrls: ['./link.layout.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkLayout {
    isSubmitting$ = this.query.selectSigningOut();

    constructor(
        private storeService: AuthenticationStoreService,
        private query: AuthenticationQuery
    ) {}

    onSignOut() {
        this.storeService.signOut().subscribe();
    }
}

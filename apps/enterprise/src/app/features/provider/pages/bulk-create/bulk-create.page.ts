import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EnterpriseProviderBulkCreatePayload } from '@libera/models/enterprise';

import { ProviderBulkCreateQuery } from '../../state/provider-bulk-create.query';
import { ProviderStoreService } from '../../state/provider.store.service';

@Component({
    selector: 'bulk-create',
    templateUrl: './bulk-create.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderBulkCreatePage {
    isSubmitting$ = this.query.selectSubmitting();

    constructor(
        private query: ProviderBulkCreateQuery,
        private storeService: ProviderStoreService
    ) {}

    onSubmit(payload: EnterpriseProviderBulkCreatePayload) {
        this.storeService.bulkCreate(payload).subscribe();
    }
}

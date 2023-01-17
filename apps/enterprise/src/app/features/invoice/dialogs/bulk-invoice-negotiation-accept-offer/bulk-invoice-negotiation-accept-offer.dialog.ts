import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { PayerBulkInvoiceNegotiationDetailQuery } from '../../state/payer-bulk-invoice-negotiation-detail.query';
import { PayerBulkInvoiceNegotiationStoreService } from '../../state/payer-bulk-invoice-negotiation.store.service';
import { ProviderBulkInvoiceNegotiationDetailQuery } from '../../state/provider-bulk-invoice-negotiation-detail.query';
import { ProviderBulkInvoiceNegotiationStoreService } from '../../state/provider-bulk-invoice-negotiation.store.service';
import {
    SHARED_BULK_INVOICE_NEGOTIATION_QUERY,
    SharedBulkInvoiceNegotiationQuery,
} from '../../state/shared-bulk-invoice-negotiation-detail.query';
import {
    SHARED_BULK_INVOICE_NEGOTIATION_STORE_SERVICE,
    SharedBulkInvoiceNegotiationStoreService,
} from '../../state/shared-bulk-invoice-negotiation.store.service';

interface DialogData {
    id: number;
    type: 'PROVIDER' | 'PAYER';
}

@Component({
    selector: 'bulk-invoice-negotiation-accept-offer',
    templateUrl: './bulk-invoice-negotiation-accept-offer.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: SHARED_BULK_INVOICE_NEGOTIATION_STORE_SERVICE,
            useFactory: (
                data: DialogData,
                payerStoreService: PayerBulkInvoiceNegotiationStoreService,
                providerStoreService: ProviderBulkInvoiceNegotiationStoreService
            ) => {
                if (data.type == 'PAYER') return payerStoreService;
                if (data.type == 'PROVIDER') return providerStoreService;
                throw Error('Did not receive correct type: ' + data.type);
            },
            deps: [
                MAT_DIALOG_DATA,
                PayerBulkInvoiceNegotiationStoreService,
                ProviderBulkInvoiceNegotiationStoreService,
            ],
        },
        {
            provide: SHARED_BULK_INVOICE_NEGOTIATION_QUERY,
            useFactory: (
                data: DialogData,
                payerQuery: PayerBulkInvoiceNegotiationDetailQuery,
                providerQuery: ProviderBulkInvoiceNegotiationDetailQuery
            ) => {
                if (data.type == 'PAYER') return payerQuery;
                if (data.type == 'PROVIDER') return providerQuery;
                throw Error('Did not receive correct type: ' + data.type);
            },
            deps: [
                MAT_DIALOG_DATA,
                PayerBulkInvoiceNegotiationDetailQuery,
                ProviderBulkInvoiceNegotiationDetailQuery,
            ],
        },
    ],
})
export class BulkInvoiceNegotiationAcceptOfferDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectUIEntityAcceptingOffer(this.data.id);

    constructor(
        private dialogRef: MatDialogRef<
            BulkInvoiceNegotiationAcceptOfferDialog
        >,
        @Inject(MAT_DIALOG_DATA)
        private data: DialogData,
        @Inject(SHARED_BULK_INVOICE_NEGOTIATION_QUERY)
        private query: SharedBulkInvoiceNegotiationQuery,
        @Inject(SHARED_BULK_INVOICE_NEGOTIATION_STORE_SERVICE)
        private storeService: SharedBulkInvoiceNegotiationStoreService
    ) {}

    onSubmit() {
        this.storeService
            .acceptOffer(this.data.id)
            .subscribe(() => this.dialogRef.close());
    }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
    LenderInvoiceFundingRequest,
    LenderInvoiceFundingRequestFormPayload,
} from '@libera/models/lender';
import { Observable } from 'rxjs';
import { AvailableEnterpriseQuery } from '../../state/available-enterprise.query';
import { AvailableEnterpriseStore } from '../../state/available-enterprise.store';
import { AvailableEnterpriseStoreService } from '../../state/available-enterprise.store.service';
import { CreateFundingRequestQuery } from '../../state/create-funding-request.query';
import { FundingRequestQuery } from '../../state/funding-request.query';
import { InvoiceFundingRequestStoreService } from '../../state/invoice-funding-request.store.service';

@Component({
    selector: 'funding-request',
    templateUrl: './funding-request.dialog.html',
    providers: [
        AvailableEnterpriseStoreService,
        AvailableEnterpriseQuery,
        AvailableEnterpriseStore,
    ],
})
export class FundingRequestDialog {
    isSubmittingForm$ = this.querySubmit.selectSubmitting();

    isSubmitting$: Observable<boolean> = this.query.selectEntityFundingRequest(
        this.data.id
    );

    constructor(
        private dialogRef: MatDialogRef<FundingRequestDialog>,
        private querySubmit: CreateFundingRequestQuery,
        private query: FundingRequestQuery,
        private storeService: InvoiceFundingRequestStoreService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {}

    onSubmit(payload: LenderInvoiceFundingRequestFormPayload) {
        this.storeService
            .createRequestPayload(this.data.id, payload)
            .subscribe(() => {
                this.dialogRef.close();
                this.router.navigateByUrl(
                    `/core/payer-invoices/${this.data.id}/funding-requests`
                );
            });
    }
}

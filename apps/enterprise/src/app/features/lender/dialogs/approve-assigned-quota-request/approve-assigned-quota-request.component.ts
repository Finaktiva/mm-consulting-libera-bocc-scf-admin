import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LenderQuotaUpdateStatusFormPayload } from '@libera/models/lender-quota-request';
import { Observable } from 'rxjs';
import { LenderRequestsQuery } from '../../state/lender-requests.query';
import { LenderRequestsStoreService } from '../../state/lender-requests.store.service';

@Component({
    selector: 'approve-assigned-quota-request',
    templateUrl: './approve-assigned-quota-request.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproveAssignedQuotaRequestComponent implements OnInit {
    isSubmitting$: Observable<boolean> = this.query.selectUIEntityUpdating(
        this.data.id
    );

    constructor(
        private storeService: LenderRequestsStoreService,
        private query: LenderRequestsQuery,
        @Inject(MAT_DIALOG_DATA)
        private data: LenderQuotaUpdateStatusFormPayload,
        private dialog: MatDialogRef<ApproveAssignedQuotaRequestComponent>
    ) {}

    ngOnInit() {}

    onSubmit() {
        this.storeService
            .updateQuotaRequestStatus(this.data.id, {
                status: this.data.status,
            })
            .subscribe(() => this.dialog.close());
    }
}

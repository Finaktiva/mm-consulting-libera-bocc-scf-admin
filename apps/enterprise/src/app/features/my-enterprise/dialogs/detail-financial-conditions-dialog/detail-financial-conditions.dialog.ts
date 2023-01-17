import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { initialStateYNOptions, yesNoOptions } from '@libera/models/catalog';
import { Enterprise, FinancialPlanDetail } from '@libera/models/enterprise';
import { AuthenticationQuery, EnterpriseFinancialPlanQuery, EnterpriseFinancialPlanStoreService, EnterpriseQuery, EnterpriseStoreService, ProfileRolePermissionsQuery } from '@libera/state';
import { ApproveFinancialDialog } from '../approve-financial-conditions-dialog/approve-financial-conditions-dialog';

@Component({
    selector: 'detail-financial-conditions-dialog',
    templateUrl: './detail-financial-conditions.dialog.html',
    styleUrls: ['./detail-financial-conditions.dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFinancialConditionsDialog implements OnInit{
    totalSize: number;
    canShowDetail: boolean = false;
    canShowDetailCommission: boolean = false;
    plan: FinancialPlanDetail
    isLoad = false


    economicGroup: yesNoOptions[] = initialStateYNOptions;

    linkedToProvider: yesNoOptions[] = initialStateYNOptions;

    agreement: yesNoOptions[] = initialStateYNOptions;

    requiredAuthorization: yesNoOptions[] = initialStateYNOptions;

    specialRate: yesNoOptions[] = initialStateYNOptions;
    valueNull = null;

    entity$ = this.enterpriseQuery.selectEntity(
        this.authenticationQuery.getEnterpriseId()
    );

    constructor(
        private storeService: EnterpriseFinancialPlanStoreService,
        private changeDetectorRef: ChangeDetectorRef,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<DetailFinancialConditionsDialog>,
        private enterpriseStoreService: EnterpriseStoreService,
        private enterpriseQuery: EnterpriseQuery,
        private authenticationQuery: AuthenticationQuery,
        @Inject(MAT_DIALOG_DATA) public data: { planId: number, status: string },
    ) {}

    ngOnInit(): void {
        this.fetchEnterprise();
        this.storeService.getDetailFinancialPlan(this.data.planId).subscribe(plan => {
            this.plan = plan
            this.isLoad = true
            this.changeDetectorRef.detectChanges();
        })
    }

    fetchEnterprise() {
        this.enterpriseStoreService
            .fetch(this.authenticationQuery.getEnterpriseId())
            .subscribe();
    }

    showApproveDialog(action: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { action, idPlan: this.data.planId }
        const dialogRef = this.dialog.open(ApproveFinancialDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.dialogRef.close()
        });
    }

}

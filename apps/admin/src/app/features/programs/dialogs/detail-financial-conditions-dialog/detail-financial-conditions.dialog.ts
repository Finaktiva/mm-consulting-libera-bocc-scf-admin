import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { initialStateYNOptions, yesNoOptions } from '@libera/models/catalog';
import { Enterprise, FinancialPlanDetail } from '@libera/models/enterprise';
import { CodePermission } from '@libera/models/user';
import { EnterpriseFinancialPlanQuery, EnterpriseFinancialPlanStoreService, ProfileRolePermissionsQuery } from '@libera/state';
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
    canApproveFinancingPlan$ = this.profileQuery.hasPermission(CodePermission.AUTHORIZE_FINANCING_PLAN);


    economicGroup: yesNoOptions[] = initialStateYNOptions;

    linkedToProvider: yesNoOptions[] = initialStateYNOptions;

    agreement: yesNoOptions[] = initialStateYNOptions;

    requiredAuthorization: yesNoOptions[] = initialStateYNOptions;

    specialRate: yesNoOptions[] = initialStateYNOptions;
    valueNull = null;

    constructor(
        private storeService: EnterpriseFinancialPlanStoreService,
        private changeDetectorRef: ChangeDetectorRef,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<DetailFinancialConditionsDialog>,
        private profileQuery: ProfileRolePermissionsQuery,
        @Inject(MAT_DIALOG_DATA) public data: { payer: Enterprise, planId: number, status: string },
    ) {}

    ngOnInit(): void {
        this.storeService.getDetailFinancialPlan(this.data.planId).subscribe(plan => {
            this.plan = plan
            this.isLoad = true
            this.changeDetectorRef.detectChanges();
        })
    }

    showApproveDialog(action: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { action, idPlan: this.data.planId, comments: this.plan.comments }
        const dialogRef = this.dialog.open(ApproveFinancialDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.dialogRef.close()
        });
    }

}

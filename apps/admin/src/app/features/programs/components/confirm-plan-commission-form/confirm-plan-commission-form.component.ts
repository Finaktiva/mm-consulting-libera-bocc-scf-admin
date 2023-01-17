import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
    Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import { Enterprise } from '@libera/models/enterprise';
import { CreateFinancingPlanPayload } from '@libera/models/financing-plan'
import { EnterpriseFinancialPlanStoreService, EnterpriseQuery } from '@libera/state';
import { initialStateYNOptions, yesNoOptions } from '@libera/models/catalog';
import { UploadProofPricingDialog } from '../../dialogs/upload-proof-pricing/upload-proof-pricing-dialog';
import { CreateFinancialConditionsDialog } from '../../dialogs/create-financial-conditions-dialog/create-financial-conditions.dialog';
import { SalesTableComponent } from '../sales-table/sales-table.component';

@Component({
    selector: 'confirm-plan-commission-form',
    templateUrl: './confirm-plan-commission-form.component.html',
    styleUrls: ['./confirm-plan-commission-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPlanCommissionFormComponent extends FormBase implements OnInit {
    @Output() cancel = new EventEmitter();
    @Output() next = new EventEmitter();

    @Input() plan: CreateFinancingPlanPayload;
    @Input() payer: Enterprise;

    isLoading$ = this.enterpriseQuery.selectLoading();

    economicGroup: yesNoOptions[] = initialStateYNOptions;

    linkedToProvider: yesNoOptions[] = initialStateYNOptions;

    agreement: yesNoOptions[] = initialStateYNOptions;

    requiredAuthorization: yesNoOptions[] = initialStateYNOptions;

    specialRate: yesNoOptions[] = initialStateYNOptions;
    valueNull = null;

    clientPermissions: string[] = [];

    daysPluralMap = {
         '=0': 'DAYS',
         '=1': 'DAY',
         'other': 'DAYS'
    };

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private enterpriseQuery: EnterpriseQuery,
        private storeService: EnterpriseFinancialPlanStoreService,
        private dialogRef: MatDialogRef<CreateFinancialConditionsDialog>,
        ) {
        super();
        this.form = formBuilder.group({
            comments: [null, [Validators.maxLength(200)]],
            isPunctualPlan: [null],
            days:[null],
            rate:[null],
            evidenceFilename: [null]
        });
    }

    ngOnInit() {
        this.isLoading$.subscribe();
    }

    submitData () {
        if(this.form.invalid) return;
        const { days, rate, ...rest } = this.getFormValue();
        const { salesCut, salesCutComplete, ...planRest } = this.plan;
        let clientPermissions: string[] = [];
        days ? clientPermissions.push('DAYS') : null;
        rate ? clientPermissions.push('RATE') : null;
        if(clientPermissions.length === 0) clientPermissions = null;
        const payload = { ...planRest, salesCut: salesCutComplete, clientPermissions, ...rest};
        this.storeService
            .createFinancialPlan(payload, this.payer.id)
            .subscribe(() => this.dialogRef.close());
    }

    back() {
        this.form.reset({comments: null, isPunctualPlan: null, evidenceFilename: null, days: null, rate: null}, {emitEvent: false})
        this.cancel.emit();
    }

    loadDocument(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {id: this.payer.id, file: this.form.value.evidenceFilename ? {name: this.form.value.evidenceFilename} : null }
        const dialogRef = this.dialog.open(UploadProofPricingDialog, dialogConfig);
        dialogRef.afterClosed().subscribe((file)=> {
            if (file === 'cancel') return;
            file ? this.form.get('evidenceFilename').patchValue(file.name) : this.form.get('evidenceFilename').patchValue(null);
        });
    }

    showSalesTable() {
        const values = this.plan.economicGroup.enterprises
        const { sales } = this.payer;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = { entities: [{sales: sales, ...this.payer}, ...values] }
        const dialogRef = this.dialog.open(SalesTableComponent,dialogConfig);
        dialogRef.afterClosed().subscribe();
    }
}

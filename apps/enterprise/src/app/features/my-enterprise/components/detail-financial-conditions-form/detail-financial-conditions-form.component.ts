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
import { MatDialog, MatDialogConfig} from '@angular/material';
import { Enterprise, FinancialPlanDetail } from '@libera/models/enterprise';
import { EnterpriseFinancialPlanStoreService, EnterpriseQuery } from '@libera/state';
import { initialStateYNOptions, yesNoOptions } from '@libera/models/catalog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ONLY_ALPHANUMERIC_REGEX, SALES_REGEX } from '@libera/constants';
import { SalesTableComponent } from '../../dialogs/sales-table/sales-table.component';

@Component({
    selector: 'detail-financial-conditions-form',
    templateUrl: './detail-financial-conditions-form.component.html',
    styleUrls: ['./detail-financial-conditions-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFinancialConditionsForm extends FormBase implements OnInit {
    @Input() plan: FinancialPlanDetail
    @Input() payer: Enterprise;


    url: SafeResourceUrl;

    isLoad = false

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
        public sanitizer: DomSanitizer
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
        if(this.plan.evidenceFile)
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.plan.evidenceFile.url);
    }

    formatSale(value: string): string {
        if(value === '0'){
            return '0.00 MM'
        }
        value = value.replace(ONLY_ALPHANUMERIC_REGEX,'');
        const reformat = value.toString().replace(SALES_REGEX, ".") + ' MM';
        return reformat
    }

    showSalesTable() {
        const values = this.plan.economicGroup
        const { sales } = this.payer;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = { entities: [{sales: sales, ...this.payer}, ...values] }
        const dialogRef = this.dialog.open(SalesTableComponent,dialogConfig);
        dialogRef.afterClosed().subscribe();
    }

    formatSalesCut(salesCut: string){
        return salesCut ? (salesCut.split('-')[0] + salesCut.split('-')[1]) : null
    }

}

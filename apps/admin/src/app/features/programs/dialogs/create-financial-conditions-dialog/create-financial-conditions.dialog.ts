import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Enterprise, EnterpriseBasicInfo, ProgramStatus } from '@libera/models/enterprise';
import { CreateFinancingPlanPayload } from '@libera/models/financing-plan';
import { EnterpriseQuery, EnterpriseStoreService } from '@libera/state';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuid} from 'uuid';

@Component({
    selector: 'create-financial-conditions-dialog',
    templateUrl: './create-financial-conditions.dialog.html',
    styleUrls: ['./create-financial-conditions.dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFinancialConditionsDialog implements OnInit{
    totalSize: number;
    planId = uuid();
    canShowDetail: boolean = false;
    canShowDetailCommission: boolean = false;
    plan: CreateFinancingPlanPayload;
    enterprises: EnterpriseBasicInfo[] = [];
    isLoading$: Observable<boolean>;
    constructor(
        private dialogRef: MatDialogRef<CreateFinancialConditionsDialog>,
        private storeService: EnterpriseStoreService,
        private activatedRoute: ActivatedRoute,
        private query: EnterpriseQuery,

        @Inject(MAT_DIALOG_DATA) public data: { payer$: Observable<Enterprise> },
    ) {}

    ngOnInit(): void {
        const status$ = this.activatedRoute.queryParamMap.pipe(
            map(queryParamMap => queryParamMap.get('status') as ProgramStatus)
        );

        this.isLoading$ = status$.pipe(
            switchMap(status => this.query.selectLoading())
        );

        this.data.payer$.subscribe(enterprise => {
            this.storeService
                .getEnterprisesBasicInfo(enterprise.id)
                .subscribe( enterprises =>
                    {
                        this.enterprises = enterprises;
                    });
        });
    }

    next(payload) {
        this.canShowDetail = true;
        this.plan = { folio: this.planId, ...payload};
        if (this.plan.type === 'COMMISSION')
            this.canShowDetailCommission = true;
    }

    back(){
        this.plan = undefined;
        this.canShowDetail = false;
        this.canShowDetailCommission = false;
    }

    close(){
        this.dialogRef.close()
    }

}

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enterprise, EnterpriseProviderPayload } from '@libera/models/enterprise';
import { CountryCallingCodeQuery, CountryCallingCodeStoreService, BankQuery, BankStoreService } from '@libera/state';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProviderCreateQuery } from '../../state/provider-create.query';
import { ProviderStoreService } from '../../state/provider.store.service';

@Component({
    selector: 'add-provider-dialog',
    templateUrl: './add-provider.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProviderDialog implements OnInit {
    isSubmitting$ = this.providerQuery.selectSubmitting();

    hasLoaded$ = this.countryCallingCodeQuery.selectLoaded();

    error$ = this.countryCallingCodeQuery.selectError();

    countryCallingCodes$ = this.countryCallingCodeQuery.selectEntities();

    banksInformation$ = this.banksInformationQuery.selectEntities()

    banks = [];

    shouldRenderProgressBar$ = combineLatest(
        this.isSubmitting$,
        this.countryCallingCodeQuery.selectLoading()
    ).pipe(map(values => values.includes(true)));

    constructor(
        private dialogRef: MatDialogRef<AddProviderDialog>,
        private providerQuery: ProviderCreateQuery,
        private providerStoreService: ProviderStoreService,

        private countryCallingCodeQuery: CountryCallingCodeQuery,
        private countryCallingCodeStoreService: CountryCallingCodeStoreService,

        private banksInformationQuery: BankQuery,
        private banksInformationStoreService: BankStoreService,
        @Inject(MAT_DIALOG_DATA) public data: { entity$: Observable<Enterprise> },
    ) {}

    ngOnInit() {
        this.fetchCountryCallingCodes();
        this.fetchBanksInformation()
    }

    onSubmit(payload: EnterpriseProviderPayload) {
        // @ts-ignore
        const { disbursementContract, economicActivity, economicSector, ciiu, city, department, ...information } = payload;
        var newPayload:any = information;
        newPayload.phone.number = payload.phone.number.toString()
        newPayload.phone.extension = payload.phone.extension ? payload.phone.extension.toString() : null
        const bankCode = this.banks.filter(bank => bank.businessName == payload.disbursementContract.account.bank);
        const bankFileName: any = payload.disbursementContract.bankCertificationFilename
        newPayload.disbursementContract = 
            disbursementContract.type !== 'ACCOUNT_DEPOSIT' 
            ? 
                {
                    type: payload.disbursementContract.type,
                }
            :
                {      
                    type: payload.disbursementContract.type,
                    account: {
                        type: payload.disbursementContract.account.type,
                        number: payload.disbursementContract.account.number,
                        bank: {
                            code: bankCode[0].code
                        }
                    },
                    bankCertificationFilename: bankFileName === null ? null : bankFileName.name
                }
        newPayload.city = city ? city : null
        newPayload.department = department ? department : null
        newPayload.economicActivity = ciiu ? { ciiuCode: ciiu } : null
        this.providerStoreService
            .create(newPayload)
            .subscribe(() => this.dialogRef.close());
    }

    fetchCountryCallingCodes() {
        this.countryCallingCodeStoreService.fetchAll().subscribe();
    }

    fetchBanksInformation () {
        this.banksInformationStoreService.fetchAll().subscribe( data => {
            this.banks = data
        })
    }
}

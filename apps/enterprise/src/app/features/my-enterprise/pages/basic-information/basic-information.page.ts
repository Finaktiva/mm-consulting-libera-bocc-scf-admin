import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BankRegions } from '@libera/models/catalog';
import { Enterprise } from '@libera/models/enterprise';
import {
    AuthenticationQuery,
    BankRegionsQuery,
    BankRegionsStoreServices,
    CountryCallingCodeQuery,
    CountryCallingCodeStoreService,
    EnterpriseQuery,
    EnterpriseSectorQuery,
    EnterpriseSectorStoreService,
    EnterpriseStoreService,
} from '@libera/state';
import { combineLatest, Observable } from 'rxjs';
import { auditTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'basic-information',
    templateUrl: './basic-information.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInformationPage {
    isSubmitting$ = this.enterpriseQuery.selectUIEntityUpdating(
        this.authenticationQuery.getEnterpriseId()
    );

    shouldRenderProgressSpinner$: Observable<boolean> = combineLatest(
        this.enterpriseQuery.selectUIEntityLoading(
            this.authenticationQuery.getEnterpriseId()
        ),
        this.enterpriseSectorQuery.selectLoading(),
        this.enterpriseSectorQuery.selectLoading()
    ).pipe(
        map(values => values.includes(true)),
        distinctUntilChanged()
    );

    shouldRenderForm$: Observable<boolean> = combineLatest(
        this.enterpriseQuery.selectUIEntityLoaded(
            this.authenticationQuery.getEnterpriseId()
        ),
        this.enterpriseSectorQuery.selectLoaded(),
        this.enterpriseSectorQuery.selectLoaded()
    ).pipe(
        map(values => values.every(value => value)),
        distinctUntilChanged()
    );

    enterpriseSectorsError$ = this.enterpriseSectorQuery.selectError();

    enterpriseSectors$ = this.enterpriseSectorQuery.selectEntities();

    countryCallingCodesError$ = this.countryCallingCodeQuery.selectError();

    countryCallingCodes$ = this.countryCallingCodeQuery.selectEntities();

    hasLoadedAndEditing$: Observable<boolean>;

    shouldRenderEnterpriseForm$: Observable<boolean>;

    bankRegions$: Observable<BankRegions[]> = this.bankRegionsQuery.selectEntities();

    entity$ = this.enterpriseQuery.selectEntity(
        this.authenticationQuery.getEnterpriseId()
    );

    error$ = this.enterpriseQuery.selectUIEntityError(
        this.authenticationQuery.getEnterpriseId()
    );

    constructor(
        private enterpriseStoreService: EnterpriseStoreService,
        private enterpriseQuery: EnterpriseQuery,
        private authenticationQuery: AuthenticationQuery,
        private countryCallingCodeQuery: CountryCallingCodeQuery,
        private countryCallingCodeStoreService: CountryCallingCodeStoreService,
        private enterpriseSectorQuery: EnterpriseSectorQuery,
        private enterpriseSectorStoreService: EnterpriseSectorStoreService,
        private bankRegionsQuery: BankRegionsQuery,
        private bankRegionsStoreServices: BankRegionsStoreServices
    ) {}

    ngOnInit() {
        this.fetchEnterprise();
        this.fetchCountryCallingCodes();
        this.fetchEnterpriseSectors();
        this.setup()
    }

    private setup(){
        const isEditing$  = this.enterpriseQuery.selectUIEntityEditing(this.authenticationQuery.getEnterpriseId())

        this.hasLoadedAndEditing$ = combineLatest(
            isEditing$
        ).pipe(
            auditTime(0),
            map(([isEditing]) => !isEditing)
        );

        this.shouldRenderEnterpriseForm$ = combineLatest(
            isEditing$,
            this.enterpriseSectorQuery.selectLoaded(),
            this.countryCallingCodeQuery.selectLoaded()
        ).pipe(
            auditTime(0),
            map(values => values.every(value => value))
        );
    }

    onEdit() {
        this.fetchEnterprise();
        this.fetchCountryCallingCodes();
        this.fetchEnterpriseSectors();
        this.fetchBankRegions();
        this.enterpriseStoreService.toggleEditing(this.authenticationQuery.getEnterpriseId())
    }

    onCancel() {
        this.enterpriseStoreService.toggleEditing(this.authenticationQuery.getEnterpriseId())
    }

    onSubmit(payload: Enterprise) {
        this.enterpriseStoreService
            .update(this.authenticationQuery.getEnterpriseId(), payload)
            .subscribe();
    }

    fetchEnterprise() {
        this.enterpriseStoreService
            .fetch(this.authenticationQuery.getEnterpriseId())
            .subscribe();
    }

    fetchCountryCallingCodes() {
        this.countryCallingCodeStoreService.fetchAll().subscribe();
    }

    fetchEnterpriseSectors() {
        this.enterpriseSectorStoreService.fetchAll().subscribe();
    }

    fetchBankRegions(){
        this.bankRegionsStoreServices.fetchAll().subscribe()
    }
}

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
import {  MatCheckboxChange, MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar } from '@angular/material';
import { CreateFinancialConditionsDialog } from '../../dialogs/create-financial-conditions-dialog/create-financial-conditions.dialog';
import { AvailableEnterprise, Enterprise, EnterpriseProvider } from '@libera/models/enterprise';
import { ALPHANUMERIC_REGEX, DATE_REGEX, LETTERS_REGEX, NUMBER_REGEX, ONLY_ALPHANUMERIC_REGEX, ONLY_NUMBER_REGEX, SALES_REGEX } from '@libera/constants';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DailyRatesQuery, DailyRatesStoreService, EnterpriseQuery, EnterpriseStoreService } from '@libera/state';
import { SalesTableComponent } from '../sales-table/sales-table.component';
import { numberDecimalsValidate, numberGreaterThanZero } from '@libera/shared';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { DailyRate, initialStateYNOptions, yesNoOptions } from '@libera/models/catalog';

@Component({
    selector: 'create-financial-conditions-form',
    templateUrl: './create-financial-conditions-form.component.html',
    styleUrls: ['./create-financial-conditions-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFinancialConditionsFormComponent extends FormBase implements OnInit {
    @Output() cancel = new EventEmitter();
    @Output() next = new EventEmitter();

    @Input() payer: Enterprise;
    @Input() enterprises: Enterprise[];

    isLoading$ = this.enterpriseQuery.selectLoading();

    isLoadingRates$ = this.dailyRatesQuery.selectLoading();

    documentSelect = {value: 'NIT', minLength: '10', maxLength: '10'};

    planTypes: { value: string, show: boolean }[] = [
        {
            value: "EXPONENTIAL",
            show: false
        },
        {
            value: "COMMISSION",
            show: false
        },
        {
            value: "FINANCED",
            show: false
        }
    ];

    economicGroup: yesNoOptions[] = JSON.parse(JSON.stringify(initialStateYNOptions));

    linkedToProvider: yesNoOptions[] = JSON.parse(JSON.stringify(initialStateYNOptions));

    agreement: yesNoOptions[] = JSON.parse(JSON.stringify(initialStateYNOptions));

    requiredAuthorization: yesNoOptions[] = JSON.parse(JSON.stringify(initialStateYNOptions));

    specialRate: yesNoOptions[] = JSON.parse(JSON.stringify(initialStateYNOptions));

    documentTypes: { fullname: string, abbreviation: string, minLength: string, maxLength: string }[] = [
        {
            fullname: 'NIT',
            abbreviation: 'NIT',
            minLength: '10',
            maxLength: '10'
        },
        {
            fullname: 'AUTONOMOUS_HERITAGE',
            abbreviation: 'PA',
            minLength: '12',
            maxLength: '12'
        },
        {
            fullname: 'IDENTIFICATION_CARD',
            abbreviation: 'CC',
            minLength: '5',
            maxLength: '10'
        },
        {
            fullname: 'FOREIGNER_ID',
            abbreviation: 'CE',
            minLength: '5',
            maxLength: '9'
        },
        {
            fullname: 'PASSPORT',
            abbreviation: 'PS',
            minLength: '9',
            maxLength: '9'
        },
    ];
    indicatorMRDefault: string = 'IBR';
    indicatorNRDefault: string = 'IBR';
    indicatorMinimumRate: {value: string}[] = [
        { value: 'IBR'},
        { value: 'DTF'}
    ];
    indicatorNegotiatedRate: {value: string}[] = [
        { value: 'IBR'},
        { value: 'DTF'}
    ];
    periodicityMinimumRate: {value: string}[] = [
        { value: 'TV'},
        { value: 'MV'},
        { value: 'SV'},
        { value: 'TA'}
    ];
    periodicityNegotiatedRate: {value: string}[] = [
        { value: 'TV'},
        { value: 'MV'},
        { value: 'SV'},
        { value: 'TA'}
    ];
    methodsOfPayment: {value: string}[] = [
        { value: 'INTEREST_PER_MONTH_AND_CAPITAL_AT_MATURITY'},
        { value: 'INTEREST_AND_CAPITAL_AT_MATURITY'},
        { value: 'INTEREST_AND_CAPITAL_PER_MONTH'}
    ];
    enterprisesFiltered: Observable<any>;
    currentNumber: string;
    providers: AvailableEnterprise[] = [];
    timeout: any;
    minDate = moment(new Date()).format('YYYY-MM-DD')
    dailyRates: DailyRate[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CreateFinancialConditionsDialog>,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private enterpriseStoreService: EnterpriseStoreService,
        private enterpriseQuery: EnterpriseQuery,
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private dailyRatesQuery: DailyRatesQuery,
        private dailyRatesStoreService: DailyRatesStoreService,
        ) {
        super();
        this.form = formBuilder.group({
            documentType: [{ value: null, disabled: true}, [Validators.required]],
            documentNumber: [{ value: null, disabled: true}, [Validators.required]],
            enterpriseName: [{ value: null, disabled: true}, [Validators.required]],
            relationshipManager: [{ value: null, disabled: true}],
            economicGroup: formBuilder.group ({
                economicGroup: [null, [Validators.required]],
                enterprises: [{ value: null, disabled: true}],
            }),
            totalSales: [{ value: null, disabled: true}],
            salesCut: [{ value: null, disabled: true}],
            salesCutComplete: [{ value: null, disabled: true}],
            type: [null, [Validators.required]],
            providerOptions: formBuilder.group ({
                linkedToProvider: [null],
                providerId: [null],
                providerDocumentType: [{ value: null, disabled: true}],
                providerDocumentNumber: [{ value: null, disabled: true}, [Validators.pattern(NUMBER_REGEX)]],
                providerEnterpriseName: [{ value: null, disabled: true}],
                hasAgreement: [null],
                requireAuthToPerformOperation: [null],
                authDay: [{ value: null, disabled: true}],
            }),
            minimumRate: formBuilder.group ({
                baseValue: [null, [Validators.required]],
                baseType: [null],
                specialRate: [ null, [Validators.required, numberDecimalsValidate]],
                periodicityType: [null],
                ea: [{value: 'EA', disabled: true}],
                mv: [{value: 'MV', disabled: true}]
            }),
            negotiatedRate: formBuilder.group ({
                baseValue: [null, [Validators.required]],
                baseType: [null],
                specialRate: [ null, [Validators.required, numberDecimalsValidate]],
                periodicityType: [null],
                ea: [{value: 'EA', disabled: true}],
                mv: [{value: 'MV', disabled: true}]
            }),
            isSpecialRate: [null],
            validityDays: [null,[Validators.required, Validators.pattern(NUMBER_REGEX)]],
            validityDate: [null],
            paydayInitialRange: [null, [Validators.required, Validators.pattern(NUMBER_REGEX)]],
            paydayFinalRange: [null],
            termDays: [null, [Validators.required, Validators.pattern(NUMBER_REGEX), numberGreaterThanZero]],
            paymentMethod: [null, [Validators.required]],
        });
    }

    ngOnInit() {
        const { nit, sales, salesCut, documentType } = this.payer;
        const documentTypeTxt = this.translateService.instant(
            'CREATE_FINANCIAL_CONDITIONS_FORM.DOCUMENT_TYPES.'+ documentType
        )
        const valuesPatch = {
            ...this.payer,
            documentType: documentTypeTxt,
            documentNumber: nit,
            salesCut: salesCut ? salesCut.split('-')[0] + salesCut.split('-')[1] : ''
        }
        this.isLoading$.subscribe( isLoading => {
            if(isLoading) this.form.get('economicGroup.economicGroup').disable();
            else this.form.get('economicGroup.economicGroup').enable();
        })
        this.form.patchValue(valuesPatch);
        this.formatSale(sales ? sales+'' : '0');
        this.fetchDailyRates();
    }

    fetchDailyRates () {
        this.dailyRatesStoreService.fetchAll().subscribe( rates => {
            this.dailyRates = rates;
        });
    }

    submitData () {
        this.form.markAllAsTouched();
        if(+(this.form.value.paydayFinalRange ? this.form.value.paydayFinalRange:+this.form.value.paydayInitialRange+1) <= +(this.form.value.paydayInitialRange ? this.form.value.paydayInitialRange:0)) return;
        if(this.form.invalid) return;
        this.next.emit(this.form.getRawValue())
    }

    onSelectEconomicGroup({ checked, source }) {
        let economicGroup = null;
        const enterprisesField = this.form.get('economicGroup.enterprises');
        enterprisesField.clearValidators();
        enterprisesField.updateValueAndValidity();
        enterprisesField.patchValue(null)
        this.sumAll();
        this.economicGroup.forEach( e => {
            e.checked = false;
            if (e.value === !!source.value){
                e.checked = checked;
                checked ? economicGroup = e.value : null;
                if (economicGroup) {
                    enterprisesField.enable();
                    enterprisesField.setValidators([Validators.required]);
                    enterprisesField.updateValueAndValidity();
                }else{
                    enterprisesField.disable();
                }
            }
        });
        this.form.get('economicGroup.economicGroup').patchValue(economicGroup);
    }

    onSelectLinkedToProvider({ checked, source }) {
        let linkedToProvider = null;
        const providerDocumentTypeField = this.form.get('providerOptions.providerDocumentType');
        const providerDocumentNumberField = this.form.get('providerOptions.providerDocumentNumber');
        const providerEnterpriseNameField = this.form.get('providerOptions.providerEnterpriseName');
        this.form.get('providerOptions.providerId').patchValue(null);
        const agreementField = this.form.get('providerOptions.hasAgreement');
        this.agreement.forEach( a => {
            a.checked = false;
        });
        this.onSelectAgreement({ checked: false, source: {value: 'true'}})
        providerEnterpriseNameField.patchValue(null);
        agreementField.patchValue(null);
        providerDocumentNumberField.patchValue(null);
        providerDocumentTypeField.patchValue(null);
        agreementField.clearValidators();
        agreementField.updateValueAndValidity();
        providerDocumentTypeField.clearValidators();
        providerDocumentNumberField.clearValidators();
        providerDocumentTypeField.updateValueAndValidity();
        providerDocumentNumberField.updateValueAndValidity();
        const requiredAuthorizationField = this.form.get('providerOptions.requireAuthToPerformOperation');
        this.requiredAuthorization.forEach( r => {
            r.checked = false;
        });
        requiredAuthorizationField.patchValue(null);
        requiredAuthorizationField.clearValidators();
        requiredAuthorizationField.updateValueAndValidity();
        this.onSelectRequiredAuthorization({checked: false, source: 'true'});
        this.linkedToProvider.forEach( e => {
            e.checked = false;
            if (e.value === !!source.value){
                e.checked = checked;
                checked ? linkedToProvider = e.value : null;
                if (linkedToProvider){
                    requiredAuthorizationField.setValidators([Validators.required]);
                    requiredAuthorizationField.updateValueAndValidity();
                    providerDocumentTypeField.enable();
                    providerDocumentNumberField.enable();
                    providerDocumentTypeField.patchValue('NIT');
                    providerEnterpriseNameField.setValidators([Validators.required]);
                    providerDocumentTypeField.setValidators([Validators.required]);
                    agreementField.setValidators([Validators.required]);
                    providerEnterpriseNameField.updateValueAndValidity();
                    agreementField.updateValueAndValidity();
                    providerDocumentTypeField.updateValueAndValidity();
                    this.changeDocumentType({value: 'NIT'})
                }else {
                    providerDocumentTypeField.disable();
                    providerDocumentNumberField.disable();
                }
            }
        });
        this.form.get('providerOptions.linkedToProvider').patchValue(linkedToProvider);
    }

    onSelectAgreement({ checked, source }) {
        let agreement = null;
        this.agreement.forEach( a => {
            a.checked = false;
            if (a.value === !!source.value){
                a.checked = checked;
                checked ? agreement = a.value : null;
            }
        });
        this.form.get('providerOptions.hasAgreement').patchValue(agreement);
    }

    onSelectRequiredAuthorization({ checked, source }) {
        let requiredAuthorization = null;
        const authDayField = this.form.get('providerOptions.authDay');
        authDayField.patchValue(null);
        authDayField.clearValidators();
        authDayField.updateValueAndValidity();
        this.requiredAuthorization.forEach( r => {
            r.checked = false;
            if (r.value === !!source.value){
                r.checked = checked;
                checked ? requiredAuthorization = r.value : null;
                if (requiredAuthorization){
                    authDayField.enable();
                    authDayField.setValidators([Validators.required, Validators.pattern(NUMBER_REGEX)]);
                    authDayField.updateValueAndValidity();
                }else {
                    authDayField.disable();
                }
            }
        });
        this.form.get('providerOptions.requireAuthToPerformOperation').patchValue(requiredAuthorization);
    }

    changePlanType(event) {
        this.linkedToProvider.forEach( r => {
            r.checked = false;
        });
        this.specialRate.forEach( s => {
            s.checked = false;
        });
        const linkedToProviderField = this.form.get('providerOptions.linkedToProvider');
        linkedToProviderField.patchValue(null);
        linkedToProviderField.clearValidators();
        linkedToProviderField.updateValueAndValidity();
        this.onSelectLinkedToProvider({checked: false, source: 'true'});
        this.form.get('isSpecialRate').patchValue(null);
        const termField = this.form.get('termDays');
        termField.patchValue(null);
        termField.clearValidators();
        termField.updateValueAndValidity();
        const validityDateField = this.form.get('validityDate');
        validityDateField.patchValue(null);
        const validityDaysField = this.form.get('validityDays');
        validityDaysField.patchValue(null);
        validityDaysField.clearValidators();
        validityDaysField.updateValueAndValidity();
        const paymentMethodField = this.form.get('paymentMethod');
        paymentMethodField.patchValue(null);
        paymentMethodField.clearValidators();
        paymentMethodField.updateValueAndValidity();
        this.form.get('negotiatedRate.ea').patchValue(null);
        this.form.get('minimumRate.ea').patchValue(null);
        this.form.get('negotiatedRate.mv').patchValue(null);
        this.form.get('minimumRate.mv').patchValue(null);
        this.form.get('minimumRate.periodicityType').patchValue(null);
        this.form.get('minimumRate.baseType').patchValue(null);
        this.form.get('minimumRate.baseValue').patchValue(null);
        const minimumRateField = this.form.get('minimumRate.specialRate');
        minimumRateField.patchValue(null);
        minimumRateField.clearValidators();
        minimumRateField.updateValueAndValidity();
        this.form.get('negotiatedRate.periodicityType').patchValue(null);
        this.form.get('negotiatedRate.baseType').patchValue(null);
        this.form.get('negotiatedRate.baseValue').patchValue(null);
        const negotiatedRateField = this.form.get('negotiatedRate.specialRate');
        negotiatedRateField.patchValue(null);
        negotiatedRateField.clearValidators();
        negotiatedRateField.updateValueAndValidity();
        const turningDayField =this.form.get('paydayInitialRange');
        turningDayField.patchValue(null);
        turningDayField.clearValidators();
        turningDayField.updateValueAndValidity();
        this.onSelectDaysRange({ checked: false })
        this.form.markAsUntouched()
        switch (event.value) {
            case 'COMMISSION':
                this.form.get('negotiatedRate.ea').patchValue('EA');
                this.form.get('minimumRate.ea').patchValue('EA');
                this.form.get('negotiatedRate.mv').patchValue('MV');
                this.form.get('minimumRate.mv').patchValue('MV');
                this.form.get('minimumRate.periodicityType').patchValue('TV');
                this.form.get('minimumRate.baseType').patchValue('IBR');
                this.form.get('negotiatedRate.periodicityType').patchValue('TV');
                this.form.get('negotiatedRate.baseType').patchValue('IBR');
                linkedToProviderField.setValidators([Validators.required]);
                linkedToProviderField.updateValueAndValidity();
                termField.setValidators([Validators.required, Validators.pattern(NUMBER_REGEX), numberGreaterThanZero]);
                termField.updateValueAndValidity();
                validityDaysField.setValidators([Validators.required, Validators.pattern(NUMBER_REGEX)]);
                validityDaysField.updateValueAndValidity();
                paymentMethodField.setValidators([Validators.required]);
                paymentMethodField.updateValueAndValidity();
                minimumRateField.setValidators([Validators.required, numberDecimalsValidate]);
                minimumRateField.updateValueAndValidity();
                negotiatedRateField.setValidators([Validators.required, numberDecimalsValidate]);
                negotiatedRateField.updateValueAndValidity();
                turningDayField.setValidators([Validators.required, Validators.pattern(NUMBER_REGEX)]);
                turningDayField.updateValueAndValidity();
                this.dailyRates.forEach( (rate) => {
                    if (rate.type === this.form.get('negotiatedRate.baseType').value) this.form.get('negotiatedRate.baseValue').patchValue(rate.percent);
                    if (rate.type === this.form.get('minimumRate.baseType').value) this.form.get('minimumRate.baseValue').patchValue(rate.percent);
                });
                break;
        }
        this.planTypes.forEach( p => {
            p.show = false;
            if (p.value === event.value)
                p.show = true
        });
    }

    onSelectRequestAuthorization({ checked, source }: MatCheckboxChange){
        const authDayField = this.form.get('providerOptions.authDay');
        authDayField.clearValidators();
        authDayField.updateValueAndValidity();
        if (!checked) {
            authDayField.setValidators([Validators.required, Validators.pattern(NUMBER_REGEX)]);
            authDayField.updateValueAndValidity();
            authDayField.enable();
        }else {
            authDayField.patchValue(null);
            authDayField.disable();
        }
    }

    onSelectSpecialRate({ checked, source }: MatCheckboxChange){
        let specialRate = null;
        this.specialRate.forEach( a => {
            a.checked = false;
            if (a.value === !!source.value){
                a.checked = checked;
                checked ? specialRate = a.value : null;
            }
        });
        this.form.get('isSpecialRate').patchValue(specialRate);
    }

    canShow(value){
        return this.planTypes.some(p => p.show && p.value === value)
    }

    changeDocumentType(event){
        this.form.get('providerOptions.providerDocumentNumber').patchValue('');
        this.form.get('providerOptions.providerDocumentNumber').markAsUntouched();
        this.documentTypes.forEach(document => {
            if (document.fullname === event.value){
                this.documentSelect.maxLength = document.maxLength;
                this.documentSelect.minLength = document.minLength;
                this.documentSelect.value = document.fullname;
            }
        });
        this.form.get('providerOptions.providerDocumentNumber').clearValidators;
        this.form.get('providerOptions.providerDocumentNumber').updateValueAndValidity();
        if (event.value === 'PASSPORT'){
            this.form.get('providerOptions.providerDocumentNumber').setValidators( [Validators.required, Validators.pattern(ALPHANUMERIC_REGEX), Validators.minLength(+this.documentSelect.minLength), Validators.maxLength(+this.documentSelect.maxLength)]);
         }else{
            this.form.get('providerOptions.providerDocumentNumber').setValidators( [Validators.required, Validators.pattern(NUMBER_REGEX), Validators.minLength(+this.documentSelect.minLength), Validators.maxLength(+this.documentSelect.maxLength)]);
        }
        this.form.get('providerOptions.providerDocumentNumber').updateValueAndValidity();
    }

    onSearchDocument(searchValue: string, changeProvider?: boolean): void {
        if (
            (searchValue.charAt(searchValue.length-1) !== "1" &&
            searchValue.charAt(searchValue.length-1) !== "2" &&
            searchValue.charAt(searchValue.length-1) !== "3" &&
            searchValue.charAt(searchValue.length-1) !== "4" &&
            searchValue.charAt(searchValue.length-1) !== "5" &&
            searchValue.charAt(searchValue.length-1) !== "6" &&
            searchValue.charAt(searchValue.length-1) !== "7" &&
            searchValue.charAt(searchValue.length-1) !== "8" &&
            searchValue.charAt(searchValue.length-1) !== "9" &&
            searchValue.charAt(searchValue.length-1) !== "0") &&
            this.form.get("enterpriseDocumentType").value !== 'PASSPORT'
        ) {
            const newSearchValue = searchValue.slice(0, searchValue.length-1)
            this.form.get('providerOptions.providerDocumentNumber').patchValue(newSearchValue)
            return;
        }

        const providerEnterpriseNameField = this.form.get('providerOptions.providerEnterpriseName');
        const providerDocumentNumberField = this.form.get('providerOptions.providerDocumentNumber');
        this.currentNumber = searchValue;

        if(!changeProvider) providerEnterpriseNameField.patchValue(null);
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
            if (this.currentNumber !== searchValue) return;
            this.enterpriseStoreService.fetchProvidersFilter(this.payer.id, this.form.get('providerOptions.providerDocumentNumber').value,'PROVIDER', this.form.get('providerOptions.providerDocumentType').value).subscribe(
                enterprises => {
                    enterprises.length > 0 ? this.providers = enterprises : this.providers = []
                    providerDocumentNumberField.setErrors({ciiuNotFound: null});
                    if (this.providers.length === 1){
                        this.form.get('providerOptions.providerId').patchValue(this.providers[0].id);
                        providerDocumentNumberField.patchValue(this.providers[0].nit);
                        providerEnterpriseNameField.patchValue(this.providers[0].enterpriseName);
                        providerEnterpriseNameField.disable();
                    }else if(this.providers.length > 1){
                        providerEnterpriseNameField.setValidators([Validators.required]);
                        providerEnterpriseNameField.updateValueAndValidity();
                        providerEnterpriseNameField.enable();
                    }else{
                        providerDocumentNumberField.setErrors({ciiuNotFound: true});
                        this.snackbar.open(
                            this.translateService.instant(
                                'CREATE_FINANCIAL_CONDITIONS_FORM.ERRORS.SCF.LIBERA.404'
                            ),
                            'OK'
                        );
                    }
                }, (error) => {
                    providerDocumentNumberField.setErrors({ciiuNotFound: true});
                    if(error.error.code == "SCF.LIBERA.COMMON.404"){
                        this.snackbar.open(
                            this.translateService.instant(
                                'CREATE_FINANCIAL_CONDITIONS_FORM.ERRORS.SCF.LIBERA.404'
                            ),
                            'OK'
                        );
                    }else{
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE.ERRORS.DB.SCF.LIBERA.500'
                            ),
                            'OK'
                        );
                    }
                }
            );
        }, 1000);
    }

    showSalesTable() {
        const values = this.form.get('economicGroup.enterprises').value
        const { sales } = this.payer;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = { entities: [{sales: sales, ...this.payer}, ...values] }
        const dialogRef = this.dialog.open(SalesTableComponent,dialogConfig);
        dialogRef.afterClosed().subscribe();
    }

    changeProvider(event) {
        if( event.selected){
            this.form.get('providerOptions.providerDocumentNumber').patchValue(event.value.nit);
            this.onSearchDocument(event.value.nit);
        }
    }

    sumAll(){
        const enterprises = this.form.get('economicGroup.enterprises').value;
        if (enterprises){
            var sumall = enterprises.map(item => item.sales ? +item.sales : 0).reduce((prev, curr) => +prev + +curr, 0);
            sumall += this.payer.sales ? +this.payer.sales : 0;
            this.formatSale(sumall+'');
            const saleCut = enterprises.map(item => item.salesCut ? +item.salesCut.match(ONLY_NUMBER_REGEX).join('').substring(0,6) : 1000000)
            
            if (this.payer.salesCut) saleCut.push(+(this.payer.salesCut.split('-')[0] + this.payer.salesCut.split('-')[1]));
            saleCut.sort((a,b)=>a-b);
            
            const saleCutComplete = enterprises.map(item => item.salesCut?item.salesCut:null)
            if (this.payer.salesCut) saleCutComplete.push(this.payer.salesCut);
            const saleCutCompleteNotNull = saleCutComplete.filter(x => x != null)
            const saleCutCompleteOrder = saleCutCompleteNotNull.sort(function(a,b){return new Date(a).getTime() - new Date(b).getTime()});

            this.form.get('salesCut').patchValue(saleCut[0]+'');
            this.form.get('salesCutComplete').patchValue(saleCutCompleteOrder[0]+'');
        } else {
            this.formatSale(this.payer.sales+'' || '0');
            this.form.get('salesCut').patchValue(this.payer.salesCut ? (this.payer.salesCut.split('-')[0] + this.payer.salesCut.split('-')[1]) : null);
            this.form.get('salesCutComplete').patchValue(this.payer.salesCut);
        }
    }

    formatSale(value: string): void {
        if(value === '0'){
            this.form.get('totalSales').patchValue( '0.00 MM');
            return;
        }
        value = value.replace(ONLY_ALPHANUMERIC_REGEX,'');
        const reformat = value.toString().replace(SALES_REGEX, ".");
        this.form.get('totalSales').patchValue( reformat + ' MM');
    }

    calculateDate() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            const days = this.form.get('validityDays').value;
            if(+days >= 0 && days !== null && days !== ''){
                const date = moment( moment(moment.now(), 'x')).add( days, 'd' ).toDate();
                const dateFormat = this.datePipe.transform(date,"yyyy-MM-dd")
                this.form.get('validityDate').patchValue(dateFormat);
            }else{
                this.form.get('validityDate').patchValue(null);
            }
        }, 300);
    }

    calculateValidity() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            const dateField = this.form.get('validityDate');
            if (dateField.value.match(DATE_REGEX)){
                const days = moment(moment.now(), 'x').toISOString().slice(0,10) !== moment(dateField.value, 'YYYY-MM-DD').toISOString().slice(0,10) ? moment(dateField.value).diff(moment(moment.now(), 'x'), 'd') + 1 : 0;
                this.form.get('validityDays').patchValue(days);
            }else {
                this.form.get('validityDays').patchValue(null);
            }
        }, 300);
    }

    onSelectDaysRange({ checked }) {
        const turningDayLastField = this.form.get('paydayFinalRange');
        this.form.get('paydayInitialRange').patchValue(null);
        this.form.get('paydayInitialRange').markAsUntouched();
        turningDayLastField.patchValue(null);
        turningDayLastField.clearValidators();
        turningDayLastField.updateValueAndValidity();
        turningDayLastField.markAsUntouched();
        if (checked) {
            turningDayLastField.setValidators([Validators.required, Validators.pattern(NUMBER_REGEX), numberGreaterThanZero]);
            turningDayLastField.updateValueAndValidity();
        }
    }

    rateFormat(event, value: string, field: string){
        const input = event.data;
        if(!value) return;
        if(input === ',' && value.includes(',')){
            const parts = value.split(',');
            value = parts[0] + ',' + parts[1];
        }
        if(input){
            if (input.match(LETTERS_REGEX) && input !== ',') {
                value = value.replace(LETTERS_REGEX, '');
            }
        }
        if(value.length >= 3 && !value.includes(',')){
            value = value.slice(0,2);
        }
        if(value.includes(',') && value.length >= 3) {
            const parts = value.split(',');
            value = parts[0].slice(0,2) + ',' + parts[1].slice(0,4);
        }
        this.form.get(field+'.specialRate').patchValue(value);
    }

    changeIndicator(event, field: string){
        let value = 'TV';
        if(event.value === 'DTF') value = 'TA';
        this.form.get(field).patchValue(value);
        this.dailyRates.forEach( (rate) => {
            if (rate.type === this.form.get('negotiatedRate.baseType').value) this.form.get('negotiatedRate.baseValue').patchValue(rate.percent);
            if (rate.type === this.form.get('minimumRate.baseType').value) this.form.get('minimumRate.baseValue').patchValue(rate.percent);
        });
    }
}

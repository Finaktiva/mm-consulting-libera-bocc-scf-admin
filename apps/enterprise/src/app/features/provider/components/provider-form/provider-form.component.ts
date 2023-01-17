import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CIIU_REGEX, ALPHANUMERIC_REGEX, NUMBER_REGEX, NAME_REGEX, EMAIL_REGEX } from '@libera/constants';
import { CountryCallingCode, CitiesAndDepartments, Bank } from '@libera/models/catalog';
import { FormBase } from '@mediomelon/ng-core';
import { Observable, of, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NitFormControlQuery } from './nit-form-control.query';
import { NitFormControlStore } from './nit-form-control.store';
import { NitFormControlStoreService } from './nit-form-control.store.service';
import { bankValid, cityValid, departamentValid, whitespaceValidator } from '@libera/shared';
import { BankQuery, BankStoreService, CiiuActSecStoreService, 
    CitiesAndDepartmentsQuery, 
    CitiesAndDepartmentsStoreService, 
    ClientStoreService, 
    EnterpriseDocumentationQuery, 
    EnterpriseDocumentationStoreService, 
    EnterpriseStoreService 
} from '@libera/state';
import { ThemePalette } from '@angular/material';
import { NgEzValidators } from '@ngez/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Enterprise } from '@libera/models/enterprise';

@Component({
    selector: 'provider-form',
    templateUrl: './provider-form.component.html',
    providers: [
        NitFormControlStore,
        NitFormControlQuery,
        NitFormControlStoreService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderFormComponent extends FormBase implements OnInit, OnDestroy {
    @Input() countryCallingCodes: CountryCallingCode[];
    @Input() banksInformation: Bank[];
    @Input() entity: Enterprise;

    hasLoaded$ = this.query.selectLoaded();
    isLoading$ = this.query.selectLoading();
    error$ = this.query.selectError();
    isLoadedDocument$ = of(false);

    private subscription = new Subscription();

    // New code
    codeDep = ['[0-9]{2}'];
    documentSelect = {value: 'NIT', minLength: '10', maxLength: '10'};

    filteredOptions: Observable<any>;
    filteredOptions2: Observable<any>;
    filteredBanks: Observable<any>;
    mappedBanks: Observable<any>
    isUploading$ = this.enterpriseDocumentationQuery.selectUploading(0);

    citiesAndDepartments$: Observable<CitiesAndDepartments[]> = this.citiesAndDepartmentsQuery.selectEntities();
    isLoadingcitiesAndDepartments$ = this.citiesAndDepartmentsQuery.selectLoading();

    banks$:Observable<Bank[]> = this.bankQuery.selectEntities();
    isLoadingBanks$ = this.bankQuery.selectLoading();

    cities: any =[];
    departments: any = [];
    banks: any = [];

    ciiuInfo: any ={ ciiu: " ", actividadEconomica: "", sectorEconomico: ""};
    formDisburse = "";
    accountType = "";
    bankInformation = "";

    currentNumber = "";
    
    documentTypes: { value: string, maxLength?: string, minLength?: string }[] = [
        {
            value: 'NIT',
            minLength: '10',
            maxLength: '10'
        },
        {
            value: 'IDENTIFICATION_CARD',
            minLength: '5',
            maxLength: '10'
        },
        {
            value: 'FOREIGNER_ID',
            minLength: '5',
            maxLength: '9'
        },
        {
            value: 'AUTONOMOUS_HERITAGE',
            minLength: '12',
            maxLength: '12'
        },
        {
            value: 'PASSPORT',
            minLength: '9',
            maxLength: '9'
        },
    ];
    types: { value: string;  disabled?:boolean }[] = [
        {
            value: 'UNIDIRECT',
            disabled: false
        },
        {
            value: 'FACTORING',
        },
        {
            value: 'CONFIRMING',
        },
        {
            value: 'DOCUMENT_DISCOUNT',
        },
    ];
    modules: { value: string; checked?: boolean; disabled?:boolean; color?:ThemePalette }[] = [
        {
            value: 'PAYER',
            checked: true,
            disabled: false,
            color: "accent"
        },
        {
            value: 'PROVIDER',
        },
        {
            value: 'FUNDING',
        },
    ];
    
    showNoRegisterSaved: boolean = false;
    clearFilters: boolean = true;

    canSelectDocument:boolean = true;
    selectDocument: boolean;
    timeout: number;

    constructor(
        formBuilder: FormBuilder,
        private query: NitFormControlQuery,
        private storeService: NitFormControlStoreService,
        private citiesAndDepartmentsQuery:CitiesAndDepartmentsQuery,
        private citiesAndDepartmentService:CitiesAndDepartmentsStoreService,
        private ciiuActSecStoreService: CiiuActSecStoreService,
        private enterpriseStoreService: EnterpriseStoreService,
        private clientStoreService: ClientStoreService,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private bankQuery: BankQuery,
        private bankService: BankStoreService,
        private enterpriseDocumentationQuery: EnterpriseDocumentationQuery,
    ) {
        super();
        this.form = formBuilder.group({
            nit: [null, Validators.required],
            enterpriseName: ['', [Validators.required, whitespaceValidator]],
            owner: formBuilder.group({
                name: [null, [Validators.required , Validators.pattern(NAME_REGEX)]],
                firstSurname: [
                    null, [Validators.required , Validators.pattern(NAME_REGEX)]
                ],
                secondSurname: [
                    null, Validators.pattern(NAME_REGEX)
                ],
                email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            }),
            phone: formBuilder.group ({
                number: [
                    null,
                    [
                        Validators.maxLength(10),
                        Validators.pattern(NUMBER_REGEX),
                        Validators.required
                    ],
                ],
                extension: [null, Validators.pattern(NUMBER_REGEX)]
            }),
            comesFromAPI: false,
            providerDocumentType: ['NIT', Validators.required],
            productType: [null],
            department: [null, departamentValid([])],
            city: [null, [Validators.maxLength(60),cityValid([])]],
            ciiu: [null, [Validators.pattern(CIIU_REGEX)]],
            economicActivity: [{value:null, disabled:true}],
            economicSector: [{value:null, disabled:true}],
            disbursementContract: formBuilder.group ({
                type: [null, Validators.required],
                account: formBuilder.group ({
                    type: [null],
                    number: [null],
                    bank: [null, [Validators.required,bankValid([])]]
                }),  
                bankCertificationFilename: [ null, [NgEzValidators.fileType('.pdf, image/jpg, image/jpeg')] ],
            }),
        });
    }

    ngOnInit() {
        this.form.get('productType').patchValue(this.entity.productType);
        this.form.get('productType').disable();
        this.form.get('disbursementContract.bankCertificationFilename').valueChanges.subscribe(
            valueBank =>{
                this.isLoadedDocument$ = valueBank ? of(true) : of(false)
                this.isLoadedDocument$.subscribe(
                    loaded => {
                        if (loaded && this.selectDocument) {
                            const invalidDocument = this.form.get('disbursementContract.bankCertificationFilename').invalid;
                            this.disableAllInputs();
                            if (!invalidDocument){
                                this.documentationStoreService
                                    .uploadProviderFile(valueBank)
                                    .subscribe();
                            }else{
                                this.snackbar.open(
                                    this.translateService.instant(
                                        'COMMON.VALIDATIONS.INVALID_DOCUMENT_TYPE'
                                    ),
                                    'OK'
                                );
                            }
                            this.enableAllInputs();
                        }else if(!loaded && this.selectDocument) {
                            this.disableAllInputs();
                            setTimeout(() => {
                                this.enableAllInputs();
                            }, 100);
                        }
                })
            })

        const myControl = this.form.get("department");
        const myControl2 = this.form.get("city");
        const bankControl = this.form.get("disbursementContract.account.bank");

        this.citiesAndDepartmentService.fetchAll().subscribe(data=>{
            this.cities = data[0];
            this.departments = data[1];
            this.form.get("department").setValidators(departamentValid(this.departments))
        });
        this.bankService.fetchAll().subscribe(data=>{
            this.banks = data;
        })

        this.isLoadingcitiesAndDepartments$.subscribe(isLoading => {
            if (!isLoading) {
                this.filteredOptions = myControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filter(value))
                );
                this.filteredOptions2 = myControl2.valueChanges
                .pipe(
                    startWith(''),
                    map(value2 => this._filter2(value2))
                );
            }
        });
        this.isLoadingBanks$.subscribe(isLoading => {
            if (!isLoading) {
                this.filteredBanks = bankControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filterBank(value))
                );
            }
        });
    }

    private _filter(value: string): any {
        const filterValue = value ? value.toLowerCase() : value;
        const cityInput = this.form.get("city");
        var newDepartments = [];
        var firstDepartments = [];
        if (!cityInput.value) {
            if(value == ''){
                this.codeDep = ['[0-9]{2}'];
                if(this.clearFilters){
                    this.clearFilters = false;
                    cityInput.patchValue('');
                }else this.clearFilters = true;
                firstDepartments = this.departments.sort((a, b) => a.departmentName.localeCompare(b.departmentName))
                return firstDepartments;
            } else if (!value) {
                this.codeDep = ['[0-9]{2}'];
                cityInput.patchValue('Load');
                cityInput.patchValue('');
                firstDepartments = this.departments.sort((a, b) => a.departmentName.localeCompare(b.departmentName))
                return firstDepartments;
            } else {
                newDepartments = this.departments.filter((department: any) => {
                    const departmentMatch = department.departmentCode.match(this.codeDep[0]) && department.departmentName.toLowerCase().startsWith(filterValue);
                    return departmentMatch;
                });
                if(newDepartments.length == 1){
                    this.codeDep = [];
                    newDepartments.forEach( department => this.codeDep.push(department.departmentCode));
                    cityInput.patchValue('Load');
                    cityInput.patchValue('');
                }
                newDepartments = newDepartments.sort((a, b) => a.departmentName.localeCompare(b.departmentName));
                return newDepartments;
            }
        }else{
            if(this.codeDep.length > 1){
                this.codeDep = [...(new Set(this.codeDep))]
                this.codeDep.forEach( code =>{
                    if(code != '[0-9]{2}') {
                        var newDepartment = this.departments.filter((department: any) => {
                            const departmentMatch = department.departmentCode.match(code) && department.departmentName.toLowerCase().startsWith(filterValue);
                            return departmentMatch;
                        });
                        if(newDepartment.length == 1)
                            newDepartments.push(newDepartment[0]);
                    }
                })
            }else{
                if(value == ''){
                    if(this.clearFilters){
                        this.clearFilters = false;
                        cityInput.patchValue('');
                    }else this.clearFilters = true;
                    firstDepartments = this.departments.sort((a, b) => a.departmentName.localeCompare(b.departmentName))
                    return firstDepartments;
                }else{
                    newDepartments = this.departments.filter((department: any) => {
                        const departmentMatch = department.departmentCode.match(this.codeDep[0]) && department.departmentName.toLowerCase().startsWith(filterValue);
                        return departmentMatch;
                    });
                }
            }
            if(newDepartments.length == 1){
                this.codeDep = [];
                newDepartments.forEach( department => this.codeDep.push(department.departmentCode));
                const value = cityInput.value;
                cityInput.patchValue('Load');
                cityInput.patchValue(value);
            }
            newDepartments = newDepartments.sort((a, b) => a.departmentName.localeCompare(b.departmentName));
            return newDepartments;
        }
    }

    private _filter2(value: string): any {
        const filterValue = value ? value.toLowerCase() : value;
        const departmentInput = this.form.get("department");
        var firstCity = [];

        if (!departmentInput.value){  
            if(value == ''){
                this.codeDep = ['[0-9]{2}'];
                if(this.clearFilters){
                    this.clearFilters = false;
                    departmentInput.patchValue('');
                }else this.clearFilters = true;
                firstCity = this.cities.sort((a, b) => a.cityName.localeCompare(b.cityName))
                return firstCity;
            } else if (!value) {
                this.codeDep = ['[0-9]{2}'];
                departmentInput.patchValue('Load');
                departmentInput.patchValue('');
                firstCity = this.cities.sort((a, b) => a.cityName.localeCompare(b.cityName))
                return firstCity;
            }else {
                var newCities = this.cities.filter((city: any) => {
                    const cityMatch = city.cityCode.match(this.codeDep[0] + '[0-9]{3}$') && city.cityName.toLowerCase().startsWith(filterValue);
                    return cityMatch;
                });
                if (newCities){
                    if (this.codeDep[0] == '[0-9]{2}'){
                        this.codeDep = ['[0-9]{2}'];
                        newCities.forEach( city => this.codeDep.push(city.cityCode.substring(0, 2)))
                        departmentInput.patchValue('Load');
                        departmentInput.patchValue('');
                    }
                }
                newCities = newCities.sort((a, b) => a.cityName.localeCompare(b.cityName));
                this.form.get("city").setValidators([Validators.maxLength(60),cityValid(newCities)])
                return newCities;
            }
        }else {
            var newCities = this.cities.filter((city: any) => {
                const cityMatch = city.cityCode.match(this.codeDep[0]+'[0-9]{3}$') && city.cityName.toLowerCase().startsWith(filterValue);
                return cityMatch;
            });
            newCities = newCities.sort((a, b) => a.cityName.localeCompare(b.cityName));
            this.form.get("city").setValidators([Validators.maxLength(60),cityValid(newCities)])
            return newCities;
        }
    }

    private _filterBank(value: string): any {
        this.form.get("disbursementContract.account.bank").setValidators([Validators.required,bankValid(this.banks)])
        const filterValue = value ? value.toLowerCase() : value;
        const filterBanks = this.banks.filter((bank: any) => {
            const result = bank.businessName.toLowerCase().includes(filterValue);
            return result;
        });
        if(filterBanks.length == 1) {
            this.bankInformation = filterBanks[0].code;
            this.selectDocument = false;
            this.form.get('disbursementContract.bankCertificationFilename').clearValidators();
            this.form.get('disbursementContract.bankCertificationFilename').updateValueAndValidity();
            if (this.bankInformation !== '23'){
                this.form.get('disbursementContract.bankCertificationFilename').setValidators( [Validators.required, NgEzValidators.fileType('.pdf, image/jpg, image/jpeg')]);
                this.form.get('disbursementContract.bankCertificationFilename').updateValueAndValidity();
            }else this.form.get('disbursementContract.bankCertificationFilename').patchValue('');
        }else if(!value) this.bankInformation = value
        return filterBanks
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getFormValue() {
        return this.form.getRawValue();
    }

    isFormInvalid() {
        return (
            this.form.invalid ||
            !this.query.getLoaded() ||
            this.query.getError()
        );
    }

    isFormPending() {
        return this.form.pending || this.query.getLoading();
    }

    compareWith(o1: { id: number }, o2: { id: number }) {
        return o1 && o2 ? o1.id == o2.id : o1 == o2;
    }

    changeDocumentType(event){
        this.selectDocument = false;
        this.form.get("nit").patchValue('');
        this.form.get("nit").markAsUntouched();
        this.cleanAllInput();
        this.enableAllInputs();
        this.documentTypes.forEach(document => {
            if (document.value == event.value){
                this.documentSelect.maxLength = document.maxLength;
                this.documentSelect.minLength = document.minLength;
                this.documentSelect.value = document.value;
            }
        });
        this.form.get('nit').clearValidators();
        this.form.get('nit').updateValueAndValidity();
        if ( event.value == 'PASSPORT'){
            this.form.get('nit').setValidators( [Validators.required, Validators.pattern(ALPHANUMERIC_REGEX), Validators.minLength(+this.documentSelect.minLength), Validators.maxLength(+this.documentSelect.maxLength)]);
         } else{ 
            this.form.get('nit').setValidators( [Validators.required, Validators.pattern(NUMBER_REGEX), Validators.minLength(+this.documentSelect.minLength), Validators.maxLength(+this.documentSelect.maxLength)]);
        }        
        this.form.get('nit').updateValueAndValidity();
    }

    onSearchChange(searchValue: string): void { 
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log("Loading ....") 
            this.form.get('economicActivity').patchValue('');
            this.form.get('economicSector').patchValue('');
            this.ciiuActSecStoreService.fetch(searchValue).subscribe(economicActivity=>{
                if (economicActivity.ciiuCode != undefined){
                    this.form.get("ciiu").setErrors({ciiuNotFound: null})
                    this.form.get("ciiu").updateValueAndValidity();
                    this.form.get('economicActivity').patchValue(economicActivity.description);
                    this.form.get('economicSector').patchValue(economicActivity.economicSector.description);
                    this.form.get('economicActivity').disable();
                    this.form.get('economicSector').disable();             
                }
            },
            err => {
                if(!this.form.get("ciiu").getError("required") && !this.form.get("ciiu").getError("pattern") && this.form.get("ciiu").value != '')
                    this.form.get("ciiu").setErrors({ciiuNotFound: true})
            });
        }, 1000);
    }

    changeDisburseForm (event) { 
        if (event !== undefined) this.formDisburse = event.value; 
        this.form.get('disbursementContract.account.type').clearValidators();
        this.form.get('disbursementContract.account.type').updateValueAndValidity();
        this.form.get('disbursementContract.account.number').clearValidators();
        this.form.get('disbursementContract.account.number').updateValueAndValidity();
        this.form.get('disbursementContract.account.bank').clearValidators();
        this.form.get('disbursementContract.account.bank').updateValueAndValidity();
        if (this.formDisburse == 'ACCOUNT_DEPOSIT'){
            this.form.get('disbursementContract.account.type').setValidators( [Validators.required]);
            this.form.get('disbursementContract.account.number').setValidators( [Validators.required, Validators.pattern(NUMBER_REGEX)]);
            this.form.get('disbursementContract.account.bank').setValidators( [Validators.required]);
            this.form.get('disbursementContract.account.type').updateValueAndValidity();
            this.form.get('disbursementContract.account.number').updateValueAndValidity();
            this.form.get('disbursementContract.account.bank').updateValueAndValidity();
        }
    }


    changeAccountType (event) { this.accountType = event.value } 

    onSearchDocument(searchValue: string): void { 
        this.showNoRegisterSaved = false;
        this.selectDocument = false;
        if ((searchValue.charAt(searchValue.length-1) !== "1" &&
            searchValue.charAt(searchValue.length-1) !== "2" &&
            searchValue.charAt(searchValue.length-1) !== "3" &&
            searchValue.charAt(searchValue.length-1) !== "4" &&
            searchValue.charAt(searchValue.length-1) !== "5" &&
            searchValue.charAt(searchValue.length-1) !== "6" &&
            searchValue.charAt(searchValue.length-1) !== "7" &&
            searchValue.charAt(searchValue.length-1) !== "8" &&
            searchValue.charAt(searchValue.length-1) !== "9" &&
            searchValue.charAt(searchValue.length-1) !== "0") &&
            this.form.get("providerDocumentType").value !== 'PASSPORT'
        ) {
            const newSearchValue = searchValue.slice(0, searchValue.length-1)
            this.form.get("nit").patchValue(newSearchValue)
            return;
        }
        if (searchValue.length >= 11 && this.documentSelect.value === 'NIT') {
            this.form.get("nit").patchValue(searchValue.slice(0, searchValue.length - 1))
            return;
        }
        this.cleanAllInput();
        this.enableAllInputs();
        this.form.markAsUntouched();
        if (searchValue.length < Number(this.documentSelect.minLength)) return;

        this.currentNumber = searchValue;
        setTimeout(() => {
            if (this.currentNumber !== searchValue) return;
            this.enterpriseStoreService.fetchByCriterion(this.documentSelect.value, searchValue, 'PROVIDER').subscribe(
                enterprise => {
                    this.snackbar.open(
                        this.translateService.instant(
                            'ENTERPRISE.ENTERPRISE_EXIST'
                        ),
                        'OK'
                    );

                    if (enterprise.enterpriseName) {
                        this.form.get('enterpriseName').patchValue(enterprise.enterpriseName);
                        this.form.get('enterpriseName').disable();
                    }

                    if (enterprise.department) {
                        this.form.get('department').patchValue(enterprise.department);
                        this.form.get('department').disable();
                    }
                    
                    if (enterprise.city) {
                        this.form.get('city').patchValue(enterprise.city);
                        this.form.get('city').disable();
                    }

                    if(enterprise.economicActivity){
                        if (enterprise.economicActivity.ciiuCode) {
                            this.form.get('ciiu').patchValue(enterprise.economicActivity.ciiuCode);
                            this.form.get('ciiu').disable();
                        }

                        if (enterprise.economicActivity.description) {
                            this.form.get('economicActivity').patchValue(enterprise.economicActivity.description);
                            this.form.get('economicActivity').disable();
                        }

                        if (enterprise.economicActivity.economicSector.description) {
                            this.form.get('economicSector').patchValue(enterprise.economicActivity.economicSector.description);
                            this.form.get('economicSector').disable();
                        }
                    }

                    if(enterprise.owner){
                        if (enterprise.owner.name) {
                            this.form.get('owner.name').patchValue(enterprise.owner.name);
                        }

                        if (enterprise.owner.firstSurname) {
                            this.form.get('owner.firstSurname').patchValue(enterprise.owner.firstSurname);
                        } 

                        if (enterprise.owner.secondSurname) {
                            this.form.get('owner.secondSurname').patchValue(enterprise.owner.secondSurname);
                        }

                        if (enterprise.owner.email) {
                            this.form.get('owner.email').patchValue(enterprise.owner.email);
                            this.form.get('owner.email').disable();
                        }
                    }

                    if(enterprise.phone){
                        if (enterprise.phone.extension) {
                            this.form.get('phone.extension').patchValue(enterprise.phone.extension);
                            this.form.get('phone.extension').disable();
                        }

                        if (enterprise.phone.number) {
                            this.form.get('phone.number').patchValue(enterprise.phone.number);
                            this.form.get('phone.number').disable();
                        }
                    }

                    if(enterprise.disbursementContract){
                        if(enterprise.disbursementContract.type){
                            this.form.get('disbursementContract.type').patchValue(enterprise.disbursementContract.type);
                            this.changeDisburseForm ({value: enterprise.disbursementContract.type})
                            this.form.get('disbursementContract.type').disable();
                        }

                        if(enterprise.disbursementContract.account){
                            if(enterprise.disbursementContract.account.type){
                                this.form.get('disbursementContract.account.type').patchValue(enterprise.disbursementContract.account.type);
                                this.form.get('disbursementContract.account.type').disable();
                            }

                            if(enterprise.disbursementContract.account.number){
                                this.form.get('disbursementContract.account.number').patchValue(enterprise.disbursementContract.account.number);
                                this.form.get('disbursementContract.account.number').disable();
                            }

                            if(enterprise.disbursementContract.account.bank ? enterprise.disbursementContract.account.bank.code : false){
                                const bankCode = enterprise.disbursementContract.account.bank.code;
                                const bank = this.banks.find(bank => bank.code == bankCode)
                                
                                this.form.get('disbursementContract.account.bank').patchValue(bank.businessName);
                                this.form.get('disbursementContract.account.bank').disable();
                            }
                        }
                        
                        if(enterprise.disbursementContract.bankCertificationFilename){
                            this.form.get('disbursementContract.bankCertificationFilename').patchValue({name: enterprise.disbursementContract.bankCertificationFilename});
                            this.form.get('disbursementContract.bankCertificationFilename').disable();
                            this.canSelectDocument = false;
                        }
                    }

                    this.types.forEach(type =>{
                        if( type.value == enterprise.productType)
                            type.disabled = true;
                        });
                }, error => {
                    if(error.error.code == "SCF.LIBERA.COMMON.404"){
                        const documentType = this.form.get('providerDocumentType').value;
                        var valueForSearch = searchValue
                        if (documentType === 'NIT') valueForSearch = (documentType === 'NIT') ? searchValue.substring(0, 9) : searchValue;
                        else if (documentType === 'AUTONOMOUS_HERITAGE')  valueForSearch = (documentType === 'AUTONOMOUS_HERITAGE') ? searchValue.substring(0, 11) : searchValue;

                        this.clientStoreService.fetchByCriterion(this.documentSelect.value,valueForSearch).subscribe(
                            client => {
                                    this.form.get("comesFromAPI").patchValue(true);
                                    if (client.enterpriseName) {
                                        this.form.get('enterpriseName').patchValue(client.enterpriseName);
                                        this.form.get('enterpriseName').disable();
                                    }
                                    if (client.ciiu) {
                                        this.form.get('ciiu').patchValue(client.ciiu);
                                        this.form.get('ciiu').disable();
                                    }
                                    if (client.ciiu != null && client.ciiu != ''){
                                        this.onSearchChange(client.ciiu);
                                    }
                            }, error => {
                                this.enableAllInputs();
                                if(error.error.code == 'SCF.LIBERA.275'){
                                    this.showNoRegisterSaved = true;
                                }
                                else
                                    this.snackbar.open(
                                        this.translateService.instant(
                                            'ENTERPRISE.ERRORS.API.SCF.LIBERA.502'
                                        ),
                                        'OK'
                                    );
                            }
                                
                        );
                    }else {
                        this.snackbar.open(
                            this.translateService.instant(
                                'ENTERPRISE.ERRORS.DB.SCF.LIBERA.500'
                            ),
                            'OK'
                        );
                    }
                }
            );
        }, 1000)
    }

    disableAllInputs () { this.inputNames.map(input => this.form.get(input).disable({ emitEvent: false })); this.canSelectDocument = false;}

    enableAllInputs () { this.inputNames.map(input => {
        if(input != 'economicActivity' && input != 'economicSector')
            this.form.get(input).enable({ emitEvent: false })
    }); this.canSelectDocument = true;}

    cleanAllInput () {
        this.form.get("comesFromAPI").patchValue(false);
        this.inputNames.map(input => {
            this.form.get(input).patchValue(null)
            this.form.get(input).markAsUntouched()
        }
    );}

    onSubmitDocument() {
        this.selectDocument = true;
    }
      
    inputNames = [
        'enterpriseName',
        'department',
        'city',
        'ciiu',
        'economicActivity',
        'economicSector',
        'owner.name',
        'owner.firstSurname',
        'owner.secondSurname',
        'owner.email',
        'phone.number',
        'phone.extension',
        'disbursementContract.type',
        'disbursementContract.account.type',
        'disbursementContract.account.number',
        'disbursementContract.account.bank',
        'disbursementContract.bankCertificationFilename'
    ]

}
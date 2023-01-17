import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NAME_REGEX, NUMBER_REGEX } from '@libera/constants';
import { BankRegions, CitiesAndDepartments, CountryCallingCode, EnterpriseSector } from '@libera/models/catalog';
import { DOCUMENT_TYPE, Enterprise, ENTERPRISE_TYPE, FORM_OF_DISBURSEMENT_TYPE, PRODUCT_TYPE } from '@libera/models/enterprise';
import { cityValid, departamentValid } from '../../validators/index';
import { CitiesAndDepartmentsQuery, CitiesAndDepartmentsStoreService } from '@libera/state';
import { alphaWithSpaceValidator, FormBase } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { map, startWith, finalize } from 'rxjs/operators';

@Component({
    selector: 'enterprise-form',
    templateUrl: './enterprise-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseFormComponent extends FormBase implements OnInit {
    @Input() entity: Enterprise;

    @Input() enterpriseSectors: EnterpriseSector[];

    @Input() countryCallingCodes: CountryCallingCode[];

    @Input() showCancelButton: boolean = false;

    @Input() bankRegions: BankRegions[] = [];

    @Input() productAdmin: boolean = false;

    @Output() cancel = new EventEmitter();

    enterpriseTypes = Object.keys(ENTERPRISE_TYPE);
    documentTypes = Object.keys(DOCUMENT_TYPE);
    productTypes = Object.keys(PRODUCT_TYPE);

    TYPES =  FORM_OF_DISBURSEMENT_TYPE;

    banksList = [{bankId:1,name:"Banco Test"}, {bankId:2,name:"Banco Test 2"}]
    citiesAndDepartments$: Observable<CitiesAndDepartments[]> = this.citiesAndDepartmentsQuery.selectEntities();
    isLoadingcitiesAndDepartments$ = this.citiesAndDepartmentsQuery.selectLoading();
    citiesAndDepartmentsError$ = this.citiesAndDepartmentsQuery.selectError();
    cities: any =[];
    departments: any = [];
    filteredOptions: Observable<any>;
    filteredOptions2: Observable<any>;
    codeDep = ['[0-9]{2}'];
    clearFilters: boolean = true;

    constructor(
        formBuilder: FormBuilder,
        private citiesAndDepartmentService: CitiesAndDepartmentsStoreService,
        private citiesAndDepartmentsQuery:CitiesAndDepartmentsQuery,
        ) {
        super();

        this.form = formBuilder.group({
            nit: [{ value: '', disabled: true }],
            enterpriseName: [{ value: '', disabled: true }, [Validators.required]],
            sector: [{ value: '', disabled: true}, Validators.required],
            enterpriseType: [{ value: '', disabled: true}, Validators.required],
            phone: formBuilder.group({
                extension: [null, 
                    [
                        Validators.maxLength(6),
                        Validators.pattern(NUMBER_REGEX)
                    ]
                ],
                number: [
                    '',
                    [
                        Validators.required,
                        Validators.maxLength(10),
                        Validators.pattern(NUMBER_REGEX)
                    ]
                ],
            }),
            owner: formBuilder.group({
                name: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(NAME_REGEX),
                        Validators.maxLength(50),
                    ],
                ],
                firstSurname: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(NAME_REGEX),
                        Validators.maxLength(50),
                    ],
                ],
                secondSurname: [
                    null,
                    [
                        Validators.pattern(NAME_REGEX),
                        Validators.maxLength(50),
                    ],
                ],
                email: [
                    {
                        value: '',
                        disabled: true
                    }, 
                    Validators.required
                ],
                documentType: [
                    {
                        value: '',
                        disabled: true
                    }, 
                    Validators.required
                ],
                documentNumber: [
                    {
                        value: '',
                        disabled: true
                    }, 
                    Validators.required
                ]
            }),
            vinculationDate: [{ value: '', disabled: true }],
            documentType:[{value: '',disabled: true}, Validators.required],
            city:[null, [Validators.required]],
            department:[null,[Validators.required]],
            ciiu:[{value:null, disabled:true},Validators.required],
            economicActivity:[{value:null, disabled:true},Validators.required],
            relationshipManager:[{value:null,disabled:true}, Validators.required],
            bankRegion:[null, [Validators.required]],
            formOfDisbursement:[null],
            creditOptions:[null],
            economicSector:[{value:null,disabled:true}],
            selectedBank:[null],
            sales:[{value: '',disabled: true}, Validators.required],
            salesCut:[{value: '',disabled: true}, Validators.required]
        });
    }

    ngOnInit() {

        this.citiesAndDepartmentService.fetchAll().subscribe(data=>{
            this.cities = data[0];
            this.departments = data[1];
            this.form.get("department").setValidators([Validators.required, departamentValid(this.departments)])
        });
        this.isLoadingcitiesAndDepartments$
            .subscribe( isLoading => {
                if (!isLoading) {
                    this.loadFilters();
                    this.loadEnterprise();
                }
            });
    }

    loadEnterprise(){
        if (this.entity){
            const { economicActivity, phone, sales, documentType, ...rest } = this.entity
            const enterprise = {
                economicActivity: economicActivity ? economicActivity.description : '',
                economicSector: economicActivity ? economicActivity.economicSector.description : '',
                ciiu: economicActivity ? economicActivity.ciiuCode : '',
                phone: { 
                    extension: phone ? phone.extension : '',
                    number: phone ? phone.number : ''
                 },
                sales: sales ? this.formatAmount(sales.toString()): '',
                ...rest
            }
            this.form.patchValue(enterprise);
        }
    }

    loadFilters(){
        const departmentInput = this.form.get("department");
        const cityInput = this.form.get("city");
        this.filteredOptions = departmentInput.valueChanges
        .pipe(
            startWith(this.entity.department),
            map(value => this._filter(value))
        );

        this.filteredOptions2 = cityInput.valueChanges
            .pipe(
                startWith(this.entity.city),
                map(value2 => this._filter2(value2))
            );
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
                this.form.get("city").setValidators([Validators.required,cityValid(newCities)])
                return newCities;
            }
        }else {
            var newCities = this.cities.filter((city: any) => {
                const cityMatch = city.cityCode.match(this.codeDep[0]+'[0-9]{3}$') && city.cityName.toLowerCase().startsWith(filterValue);
                return cityMatch;
            });
            newCities = newCities.sort((a, b) => a.cityName.localeCompare(b.cityName));
            this.form.get("city").setValidators([Validators.required,cityValid(newCities)])
            return newCities;
        }
    }

    onCancel() {
        this.cancel.emit();
    }

    onSelected(event: MatSelectChange) {
        const control = this.form.get('formOfDisbursement');

        const creditOptions = this.form.get('creditOptions');
        const selectedBank = this.form.get('selectedBank');

        if(control.value=='credit'){
            creditOptions.setValidators([Validators.required])
            creditOptions.updateValueAndValidity();
    
            selectedBank.setValidators([Validators.required])
            selectedBank.updateValueAndValidity();
        }else{
            creditOptions.clearValidators();
            creditOptions.updateValueAndValidity();
    
            selectedBank.clearValidators();
            selectedBank.updateValueAndValidity(); 
        }

    }

    compareWith(o1: { id: number }, o2: { id: number }) {
        return o1 && o2 ? o1.id == o2.id : o1 == o2;
    }

    formatAmount(searchValue: string) {
        searchValue = searchValue.replace(/\D/g,'')
        return searchValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
}

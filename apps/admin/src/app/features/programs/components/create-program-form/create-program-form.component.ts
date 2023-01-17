import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,    
    OnInit,
    Output,   
    Input 
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ALPHANUMERIC_REGEX, CIIU_REGEX, EMAIL_REGEX, LETTERS_REGEX, NAME_REGEX, NIT_REGEX, NUMBER_REGEX, REMOVE_POINTS, SALES_REGEX } from '@libera/constants';
import { BankRegions, CitiesAndDepartments, City } from '@libera/models/catalog';
import { CitiesAndDepartmentsQuery, CitiesAndDepartmentsStoreService, ClientQuery, ClientStoreService, DocumentNumberQuery, DocumentNumberStoreService, EnterpriseQuery, EnterpriseStoreService, ProfileRolePermissionsQuery } from '@libera/state';
import { nitValidator } from '@libera/validators';
import { FormBase } from '@mediomelon/ng-core';
import { economicActivity } from '@libera/models/ciuu-act-sec';
import { CiiuActSecQuery, CiiuActSecStoreService } from '@libera/state';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { CreateProgramPayload, DocumentNumber, Enterprise } from '@libera/models/enterprise';
import Swal from 'sweetalert2';
import { CreateProgramDialog } from '../../dialogs/create-program-dialog/create-program.dialog';
import { MatDialogRef } from '@angular/material';
import {ThemePalette} from '@angular/material/core';
import { ConsoleLogger } from '@aws-amplify/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { cityValid, departamentValid } from '@libera/shared';
import { CodePermission } from '@libera/models/user';
@Component({
    selector: 'create-program-form',
    templateUrl: './create-program-form.component.html',
    styleUrls: ['./create-program-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,    
})
export class CreateProgramFormComponent extends FormBase implements OnInit {
    @Output() setActionName = new EventEmitter()
    @Output() cancel = new EventEmitter();

    @Input() bankRegions: BankRegions[];
    citiesAndDepartments$: Observable<CitiesAndDepartments[]> = this.citiesAndDepartmentsQuery.selectEntities();
    isLoadingcitiesAndDepartments$ = this.citiesAndDepartmentsQuery.selectLoading();
    citiesAndDepartmentsError$ = this.citiesAndDepartmentsQuery.selectError();
    canCreateProvider$ = this.profileQuery.hasPermission(CodePermission.CREATE_PROVIDER);
    cities: any =[];
    departments: any = [];
    id="0";
    codeDep = ['[0-9]{2}'];
    documentSelect = {value: 'NIT', minLength: '10', maxLength: '10'};
    documentUserSelect = {value: 'NIT', minLength: '10', maxLength: '10'};
    ciiuActSec$: Observable<economicActivity> = this.ciiuActSecQuery.selectEntity(this.id);
    ciiuInfo: any ={ ciiu: " ", actividadEconomica: "", sectorEconomico: ""};
    nit = "0";
    editOrCreate: 'edit' | 'create' = 'create' 
    currentNumber = ""
    documentNumber$: Observable<DocumentNumber> = this.documentNumberQuery.selectEntity(this.nit)
    showNoRegisterSaved: boolean = false;
    maxDate = moment(new Date()).format('YYYY-MM-DD')
    modules: { value: string; checked?: boolean; disabled?:boolean; color?:ThemePalette }[] = [
        {
            value: 'PAYER',
            checked: true,
            disabled: false,
            color: "accent"
        },
        {
            value: 'PROVIDER',
            disabled: true,
        },
    ];

    types: { value: string;  disabled?:boolean }[] = [
        {
            value: 'UNIDIRECT',
            disabled: false
        },
    ];

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
    clearFilters: boolean = true;
    timeout: number;
    preSalesValue: string;

    constructor(
        private formBuilder: FormBuilder,
        private citiesAndDepartmentService: CitiesAndDepartmentsStoreService,
        private citiesAndDepartmentsQuery:CitiesAndDepartmentsQuery,
        private ciiuActSecQuery:CiiuActSecQuery,
        private ciiuActSecStoreService: CiiuActSecStoreService,
        private enterpriseStoreService: EnterpriseStoreService,
        private documentNumberQuery: DocumentNumberQuery,
        private clientStoreService: ClientStoreService,
        private storeService: EnterpriseStoreService,
        private dialogRef: MatDialogRef<CreateProgramDialog>,
        private snackbar: MatSnackBar,
        private profileQuery: ProfileRolePermissionsQuery,
        private translateService: TranslateService) {
        super();
        this.form = formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            enterpriseName: ['', [Validators.required]],    
            nit: [
                '',
                [
                    Validators.required,
                    Validators.pattern(NUMBER_REGEX)
                ],
            ],
            modules: [['PAYER'], Validators.required],
            name:   [null, 
                        [   Validators.required, 
                            Validators.pattern(NAME_REGEX),                            
                            Validators.maxLength(50),
                        ]
                    ],
            firstSurname:   [null, 
                                [   Validators.required,
                                    Validators.pattern(NAME_REGEX),
                                    Validators.maxLength(50),
                                ]
                            ],
            secondSurname: [null, [Validators.pattern(NAME_REGEX),Validators.maxLength(50)]],
            documentType: ['NIT', Validators.required],
            enterpriseDocumentType: ['NIT', Validators.required],
            productType: ['UNIDIRECT', Validators.required],
            department: [null, Validators.required],
            city:[null, [Validators.required,Validators.maxLength(60)]],
            economicActivity: [{value:null, disabled:true}, Validators.required],
            economicSector: [{value:null, disabled:true}, Validators.required],
            relationshipManager: [null],
            bankRegion: [null, Validators.required],
            documentNumber: [null, Validators.required],
            ciiu:[null, [Validators.required, Validators.pattern(CIIU_REGEX)]],
            phoneExt: [null, Validators.pattern(NUMBER_REGEX)],
            phoneNumber: [null, [Validators.required,Validators.maxLength(30),Validators.pattern(NUMBER_REGEX)]],
            sales: [null],
            salesPerYear: [null],
            idOwner: [null],
            idRegister: [null],
            modulesHelper: [null],
            comesFromAPI: false,
        });
    }

    filteredOptions: Observable<any>;
    filteredOptions2: Observable<any>;
    ngOnInit() {
        const myControl = this.form.get("department");
        const myControl2 = this.form.get("city");
        this.citiesAndDepartmentService.fetchAll().subscribe(data=>{
            this.cities = data[0];
            this.departments = data[1];
            this.form.get("department").setValidators([Validators.required, departamentValid(this.departments)])
        });
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
                this.form.get("city").setValidators([Validators.required,Validators.maxLength(60), cityValid(newCities)])
                return newCities;
            }
        }else {
            var newCities = this.cities.filter((city: any) => {
                const cityMatch = city.cityCode.match(this.codeDep[0]+'[0-9]{3}$') && city.cityName.toLowerCase().startsWith(filterValue);
                return cityMatch;
            });
            newCities = newCities.sort((a, b) => a.cityName.localeCompare(b.cityName));
            this.form.get("city").setValidators([Validators.required,Validators.maxLength(60), cityValid(newCities)])
            return newCities;
        }
    }

    changeDocumentType(event){  
        this.form.get("nit").patchValue('');
        this.form.get("nit").markAsUntouched();
        this.resetValues();      
        this.form.get('economicActivity').disable();
        this.form.get('economicSector').disable();
        this.documentTypes.forEach(document => {
            if (document.value == event.value){
                this.documentSelect.maxLength = document.maxLength;
                this.documentSelect.minLength = document.minLength;
                this.documentSelect.value = document.value;
            }
        });
        this.form.get('nit').clearValidators;
        this.form.get('nit').updateValueAndValidity();
        if (event.value == 'PASSPORT'){
            this.form.get('nit').setValidators( [Validators.required, Validators.pattern(ALPHANUMERIC_REGEX), Validators.minLength(+this.documentSelect.minLength), Validators.maxLength(+this.documentSelect.maxLength)]);
         }else{ 
            this.form.get('nit').setValidators( [Validators.required, Validators.pattern(NUMBER_REGEX), Validators.minLength(+this.documentSelect.minLength), Validators.maxLength(+this.documentSelect.maxLength)]);
        }        
        this.form.get('nit').updateValueAndValidity();
    }
    changeUserDocumentType(event){  
        this.documentTypes.forEach(document => {
            if (document.value == event.value){
                this.documentUserSelect.maxLength = document.maxLength;
                this.documentUserSelect.minLength = document.minLength;
                this.documentUserSelect.value = document.value;
            }
        });
        this.form.get('documentNumber').clearValidators;
        this.form.get('documentNumber').updateValueAndValidity();
        if ( event.value == 'PASSPORT'){
            this.form.get('documentNumber').setValidators( [Validators.required, Validators.pattern(ALPHANUMERIC_REGEX), Validators.minLength(+this.documentUserSelect.minLength), Validators.maxLength(+this.documentUserSelect.maxLength)]);
         }else{ 
            this.form.get('documentNumber').setValidators( [Validators.required, Validators.pattern(NUMBER_REGEX), Validators.minLength(+this.documentUserSelect.minLength), Validators.maxLength(+this.documentUserSelect.maxLength)]);
        }        
        this.form.get('documentNumber').updateValueAndValidity();
    }

    onSelectModule({ checked, source }: MatCheckboxChange) {
        const modules: string[] = this.form.get('modules').value;
        
        if (checked) {
            modules.push(source.value);
        } else {
            const index = modules.findIndex(m => m === source.value);
            modules.splice(index, 1);
        }
        
        this.form.get('modules').patchValue(modules);
    }   

    onSearchChange(searchValue: string): void { 
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            console.log("Loading ....") 
            this.form.get('economicActivity').patchValue(null);
            this.form.get('economicSector').patchValue(null);
            this.ciiuActSecStoreService.fetch(searchValue).subscribe(data=>{
                if(data.ciiuCode != undefined){
                    this.form.get("ciiu").setErrors({ciiuNotFound: null})
                    this.form.get("ciiu").updateValueAndValidity();
                    this.form.get('economicActivity').patchValue(data.description);
                    this.form.get('economicActivity').disable();
                    this.form.get('economicSector').patchValue(data.economicSector.description); 
                    this.form.get('economicSector').disable();
                }
            },
            err => {
                if(!this.form.get("ciiu").getError("required") && !this.form.get("ciiu").getError("pattern"))
                    this.form.get("ciiu").setErrors({ciiuNotFound: true})
            });
        }, 1000);
    }

    onSearchDocument(searchValue: string): void { 
        this.showNoRegisterSaved = false;
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
            this.form.get("nit").patchValue(newSearchValue)
            return;
        }
        if (searchValue.length >= 11 && this.documentSelect.value === 'NIT') {
            this.form.get("nit").patchValue(searchValue.slice(0, searchValue.length - 1))
            return;
        }
        this.resetValues();

        if (searchValue.length < Number(this.documentSelect.minLength)) return;
        this.currentNumber = searchValue;
    
        setTimeout(() => {
            if (this.currentNumber !== searchValue) return;
            this.enterpriseStoreService.fetchByCriterion(this.documentSelect.value, searchValue, null).subscribe(
                enterprise => {
                    Swal.fire({
                        title: 'Cliente ya creado en la plataforma',
                        text: '¿Desea ingresar un nuevo producto o módulo?, por favor modificar producto o módulo para asignar nuevos permisos',
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        confirmButtonColor: '#0081ff',
                        confirmButtonText: 'Si, aceptar',
                        icon: 'question'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            
                            this.setActionName.emit("Editar registro")
                            this.editOrCreate = 'edit'

                            if (enterprise.id) this.form.get("idRegister").patchValue(enterprise.id)
                            
                            if (enterprise.owner.id) this.form.get("idOwner").patchValue(enterprise.owner.id)
                            
                            if (enterprise.productType) {
                                this.form.get('productType').patchValue(enterprise.productType);
                            }

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

                            if (enterprise.relationshipManager) {
                                this.form.get('relationshipManager').patchValue(enterprise.relationshipManager);
                                this.form.get('relationshipManager').disable();
                            }

                            if (enterprise.bankRegion) {
                                this.form.get("bankRegion").patchValue(enterprise.bankRegion)
                            }

                            if (enterprise.sales) {
                                this.formatAmount(enterprise.sales.toString());
                                this.form.get('sales').disable();
                            }

                            if (enterprise.salesCut) {
                                this.form.get('salesPerYear').patchValue(enterprise.salesCut);
                                this.form.get('salesPerYear').disable();
                            }

                            if (enterprise.owner.name) {
                                this.form.get('name').patchValue(enterprise.owner.name);
                                this.form.get('name').disable();
                            }

                            if (enterprise.owner.firstSurname) {
                                this.form.get('firstSurname').patchValue(enterprise.owner.firstSurname);
                                this.form.get('firstSurname').disable();
                            } else this.form.get('firstSurname').enable()

                            if (enterprise.owner.secondSurname) {
                                this.form.get('secondSurname').patchValue(enterprise.owner.secondSurname);
                                this.form.get('secondSurname').disable();
                            }

                            if (enterprise.owner.email) {
                                this.form.get('email').patchValue(enterprise.owner.email);
                                this.form.get('email').disable();
                            }

                            if (enterprise.owner.documentType) {
                                this.form.get('documentType').patchValue(enterprise.owner.documentType);
                                this.form.get('documentType').disable();
                            }

                            if (enterprise.owner.documentNumber) {
                                this.form.get('documentNumber').patchValue(enterprise.owner.documentNumber);
                                this.form.get('documentNumber').disable();
                            }

                            // @ts-ignore
                            if (enterprise.phone.extension) {
                                // @ts-ignore
                                this.form.get('phoneExt').patchValue(enterprise.phone.extension);
                                this.form.get('phoneExt').disable();
                            }

                            if (enterprise.phone.number) {
                                this.form.get('phoneNumber').patchValue(enterprise.phone.number);
                                this.form.get('phoneNumber').disable();
                            }

                            this.form.get('modules').patchValue([]);
                            this.form.markAllAsTouched();
                            const modules: string[] = []
                            this.modules.forEach(mod =>{
                                mod.checked = false;
                                mod.disabled = (mod.value === 'PROVIDER');
                                mod.color = "warn";
                            });
                            enterprise.owner.modules.forEach(module =>{
                                this.modules.forEach(mod =>{
                                    if(module.trim() == mod.value){
                                        mod.disabled = (mod.value === 'PROVIDER');
                                        mod.checked = true;
                                        modules.push(mod.value);
                                    }
                                });
                            });
                            this.form.get('modules').patchValue(modules);
                        } else {
                            this.dialogRef.close()
                        }
                    });
                }, (error) => {
                    if(error.error.code == "SCF.LIBERA.COMMON.404"){
                        const documentType = this.form.get('enterpriseDocumentType').value;
                        var valueForSearch = searchValue
                        if (documentType === 'NIT') valueForSearch = (documentType === 'NIT') ? searchValue.substring(0, 9) : searchValue;
                        else if (documentType === 'AUTONOMOUS_HERITAGE')  valueForSearch = (documentType === 'AUTONOMOUS_HERITAGE') ? searchValue.substring(0, 11) : searchValue;

                        this.clientStoreService.fetchByCriterion(this.documentSelect.value,valueForSearch).subscribe(
                            client => {
                                if (client.enterpriseName) {
                                    this.form.get('enterpriseName').patchValue(client.enterpriseName);
                                    this.form.get('enterpriseName').disable();
                                } else this.form.get('enterpriseName').enable();
                                if (client.ciiu) {
                                    this.form.get('ciiu').patchValue(client.ciiu);
                                    this.form.get('ciiu').disable();
                                } else this.form.get('ciiu').enable();
                                if (client.relationshipManager) {
                                    this.form.get('relationshipManager').patchValue(client.relationshipManager);
                                    this.form.get('relationshipManager').disable();
                                } else this.form.get('relationshipManager').enable();
                                if (client.ciiu != null && client.ciiu != ''){
                                    this.onSearchChange(client.ciiu);
                                }
                                this.form.get('comesFromAPI').patchValue(true);
                                this.setActionName.emit("Crear registro") 
                                this.editOrCreate = 'create';
                            }, error => {
                                this.enableForm()
                                this.form.get('economicActivity').disable();
                                this.form.get('economicSector').disable();
                                this.setActionName.emit("Crear registro")
                                this.editOrCreate = 'create';
                                if(error.error.code == 'SCF.LIBERA.275')
                                    this.showNoRegisterSaved = true;
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
        }, 1000);
    }

    submitData () {
        if(this.form.invalid) return;
        const formValues = this.form.getRawValue();
        let { sales } = formValues;
        if(sales && sales.includes(',')){
            const parts = sales.split(',');
            sales = parts[0].replace(REMOVE_POINTS, '') + '.' + parts[1];
        }else{
            sales = sales ? sales.replace(REMOVE_POINTS, '') : null;
        }
        const formValuesParse = {
            ...formValues,
            sales: sales ? parseFloat(sales) : null
        }
        if (this.editOrCreate === 'create') this.onCreate(formValuesParse);
        else this.onUpdate(formValuesParse.idRegister, formValuesParse);
    }

    onCreate (payload: CreateProgramPayload) {
        this.storeService
            .create(payload)
            .subscribe((enterprise) => {
                this.dialogRef.close(enterprise)
            });
    }

    onUpdate (id:number, enterprise:Enterprise) {
        this.storeService
            .updateModulesProducts(id, enterprise)
            .subscribe(() => this.dialogRef.close());
    }

    enableForm () {
        this.inputNames.map(input => this.form.get(input).enable());
    }

    resetValues(){
        this.form.get('modules').patchValue([]);
        this.inputNames.map(input => {
            this.form.get(input).patchValue(null);
            this.form.get(input).markAsUntouched();
        });
        const modules: string[] = [];
        this.modules.forEach(mod =>{
            mod.checked = false;
            mod.disabled = (mod.value === 'PROVIDER');
            mod.color = "accent";
        });
        this.form.get('modules').patchValue(modules);
        this.form.get('comesFromAPI').patchValue(false);
        this.enableForm();
        this.types.forEach(type => type.disabled = false );
    }
    
    formatAmount(searchValue: string): void {
        if(!searchValue) return;
        if(searchValue.includes(',')){
            const parts = searchValue.split(',');
            searchValue = parts[0].replace(/\D/g, '').slice(0,15).replace(SALES_REGEX, '.') + ',' + parts[1].replace(/\D/g, '').slice(0,4);
        }
        else if(searchValue.length >= 15 && !searchValue.includes(',')){
            searchValue = searchValue.replace(/\D/g, '').slice(0,15).replace(SALES_REGEX, '.');
        }
        this.preSalesValue = searchValue;
        this.form.get('sales').patchValue(searchValue.toString());
    }

    validateSale(event, value: string) {
        const input = event.data;
        if(!value) return;
        if(value.includes(',')){
            const parts = value.split(',');
            (parts.length > 2)
                ? value = this.preSalesValue
                : value = parts[0].slice(0,20) + ',' + parts[1].replace(/\D/g, '').slice(0,4);
        }
        if(input){
            if (input.match(LETTERS_REGEX) && input !== ',' && input !== '.') {
                value = value.replace(LETTERS_REGEX, '');
            }
        }
        this.preSalesValue = value;
        this.form.get('sales').patchValue(value.toString());
    }

    compareWith(o1: { id: number }, o2: { id: number }) {
        return o1 && o2 ? o1.id == o2.id : o1 == o2;
    }
    
    inputNames = [
        'enterpriseName',
        'productType',
        'department',
        'city',
        'ciiu',
        'economicActivity',
        'economicSector',
        'relationshipManager',
        'sales',
        'salesPerYear',
        'name',
        'firstSurname',
        'secondSurname',
        'email',
        'documentType',
        'documentNumber',
        'phoneExt',
        'phoneNumber',
    ]

}

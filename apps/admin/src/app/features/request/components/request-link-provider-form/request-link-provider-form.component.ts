import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CIIU_REGEX, nitValidators, NUMBER_REGEX } from '@libera/constants';
import { CitiesAndDepartments } from '@libera/models/catalog';
import { EnterpriseDetail } from '@libera/models/enterprise-request';
import { CitiesAndDepartmentsStoreService, CitiesAndDepartmentsQuery } from '@libera/state';
import { alphaWithSpaceValidator, FormBase } from '@mediomelon/ng-core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'request-link-provider-form',
    templateUrl: './request-link-provider-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestLinkProviderFormComponent extends FormBase
    implements OnInit {
    @Input() enterprise: EnterpriseDetail;
    @Input() shouldPreventSubmit: boolean;
    archiveUrl: any;
    citiesAndDepartments$: Observable<CitiesAndDepartments[]> = this.citiesAndDepartmentsQuery.selectEntities();
    isLoadingcitiesAndDepartments$ = this.citiesAndDepartmentsQuery.selectLoading();
    citiesAndDepartmentsError$ = this.citiesAndDepartmentsQuery.selectError();
    cities: any =[];
    departments: any = [];
    codeDep='[0-9]{2}';
    filteredOptions: Observable<any>;
    filteredOptions2: Observable<any>;
    constructor(formBuilder: FormBuilder, private citiesAndDepartmentService: CitiesAndDepartmentsStoreService,
        private citiesAndDepartmentsQuery:CitiesAndDepartmentsQuery) {
        super();
        this.form = formBuilder.group({
            email: { value: '', disabled: true },
            enterpriseName: { value: '', disabled: true },
            nit: { value: '', disabled: true },
            name: '',
            firstSurname: '',
            secondSurname: '',
            documentType: { value: '', disabled: true },
            productType: { value: '', disabled: true },
            department: { value: '', disabled: true },
            city:{ value: '', disabled: true },
            ciiu:{ value: '', disabled: true },
            economicActivity: { value: '', disabled: true },
            economicSector: { value: '', disabled: true },
            phoneExt:'',
            phoneNumber: '',
            formOfDisbursement: { value: '', disabled: true },
            accountType: { value: '', disabled: true },
            accountNumber: { value: '', disabled: true },
            bank: { value: '', disabled: true },
            bankCertification: { value: '', disabled: true },
            enterpriseDocumentType: ''
        });
    }

    shouldDisable() {
        return this.shouldPreventSubmit || super.shouldDisable();
    }

    onNavigate(){
        if (this.archiveUrl != '' )
            window.open(this.archiveUrl, "_blank");
    }

    ngOnInit() {
        const enterprise = this.enterprise;
        if (!enterprise) return;

        const { email, 
            enterpriseName, 
            nit, 
            owner, 
            providerDocumentType, 
            productType, 
            department, 
            city, 
            economicActivity,
            phoneExt,
            phoneNumber,
            disbursementContract,
            comesFromAPI
        } = enterprise;

        const name = owner && owner.name;
        const firstSurname = owner && owner.firstSurname;
        const secondSurname = owner && owner.secondSurname;
        const enterpriseDocumentType = providerDocumentType

        let formOfDisbursement = 'DEFAULT'
        let accountType = 'DEFAULT';
        let accountNumber = 'DEFAULT';
        let bank = 'DEFAULT';
        let bankCertification = 'DEFAULT';
        if(disbursementContract){
            formOfDisbursement = disbursementContract.type ? disbursementContract.type : ''
            if (disbursementContract.bankCertificationFile != null){
                bankCertification = disbursementContract.bankCertificationFile.name;
                this.archiveUrl = disbursementContract.bankCertificationFile.url;
            }
            else{
                this.archiveUrl = '';
            }
            if (disbursementContract.account != null){
                accountType = disbursementContract.account.type;
                accountNumber = disbursementContract.account.number;
                bank = disbursementContract.account.bank.name;
            }
        }
        const ciiu = economicActivity.ciiuCode
        const economicSector = economicActivity.economicSector.description
        const economicActivityDescription = economicActivity.description 

        this.form.patchValue({
            email,
            enterpriseName,
            nit,
            name,
            firstSurname,
            secondSurname,
            enterpriseDocumentType,
            productType,
            department,
            city,
            ciiu,
            economicActivity: economicActivityDescription,
            economicSector,
            phoneExt,
            phoneNumber,
            formOfDisbursement,
            accountType,
            accountNumber,
            bank,
            bankCertification,
        });
        
        if(!comesFromAPI){
            this.form.get('enterpriseName').enable();
            this.form.get('department').enable();
            this.form.get('city').enable();
            this.form.get('ciiu').enable();
            this.form.get('economicActivity').enable();
            this.form.get('economicSector').enable();
        }
        const myControl = this.form.get("department");
        const myControl2 = this.form.get("city");

        this.citiesAndDepartmentService.fetchAll().subscribe(data=>{
            this.cities = data[0];
            this.departments = data[1];
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
        const filterValue = value.toLowerCase();
        return this.departments.filter((option: any) => {
            const option1 = option.departmentName.toLowerCase().startsWith(filterValue);
            // if (option1 == true){
            //     this.codeDep = option.departmentCode;
            //     this.form.get("city").patchValue('Load');
            //     this.form.get("city").patchValue('');
            // }
            return option1;});
    }

    private _filter2(Value2: string): any {
        const filterValue2 = Value2.toLowerCase();
        return this.cities.filter((option: any) => {
            const option2 = option.cityCode.match(this.codeDep+'[0-9]{3}$') && option.cityName.toLowerCase().startsWith(filterValue2)
            return option2});
    }

    getFormValue() {
        return this.form.getRawValue();
    }
}

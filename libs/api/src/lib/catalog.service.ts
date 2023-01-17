import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import {
    COUNTRY_CALLING_CODE_MOCKS,
    CURRENCY_MOCKS,
    ENTERPRISE_SECTOR_MOCKS,
    LANGUAGE_MOCK,
    ROLE_PERMISSION_MOCK,
    USER_ROLE_MOCK,
} from '@libera/mocks/catalog';
import {
    CitiesAndDepartments,
    CountryCallingCode,
    Currency,
    EnterpriseSector,
    Language,
    Bank,
    DocumentType,
    BankRegions,
    RolePermission
} from '@libera/models/catalog';
import { EnterpriseDocumentation } from '@libera/models/enterprise';
import { UserRole, UserRoleCreatePayload, UserRoleUpdatePayload } from '@libera/models/user';
import { from, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserType } from '@libera/models/authentication';
import { RoleFilterPayload, RoleStatus } from '@libera/models/role';
import { Page, PaginationPayload } from '@mediomelon/ng-core';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        this.url = `${endpoint}/catalogs`;
    }

    getCountryCallingCodes() {
        if (this.shouldMock)
            return of(COUNTRY_CALLING_CODE_MOCKS).pipe(delay(1000));

        return this.http.get<CountryCallingCode[]>(
            `${this.url}/country-calling-codes`
        );
    }

    getAllCitiesAndDepartments(){
        return this.http.get<CitiesAndDepartments[]>(`${this.url}/cities-departments`);
    }

    getEnterpriseSectors() {
        if (this.shouldMock)
            return of(ENTERPRISE_SECTOR_MOCKS).pipe(delay(1000));

        return this.http.get<EnterpriseSector[]>(
            `${this.url}/enterprise-sectors`
        );
    }

    getCurrencies(): Observable<Currency[]> {
        if (this.shouldMock) return of(CURRENCY_MOCKS).pipe(delay(1000));

        return this.http.get<Currency[]>(`${this.url}/currency-codes`);
    }

    getLanguages(): Observable<Language[]> {
        if (this.shouldMock) return of(LANGUAGE_MOCK).pipe(delay(1500));

        return this.http.get<Language[]>(`${this.url}/languages`);
    }

    getBanks () {
        return this.http.get<Bank[]>(`${this.url}/banks`);
    }

    getDocumentTypes(isDefault) {
        return this.http.get<DocumentType[]>(`${this.url}/documents?isDefault=${isDefault}`);
    }

    getBankRegions(){
        return this.http.get<BankRegions[]>(`${this.url}/bank-regions`);
    }

    getRoles(user: UserType, filter?: RoleFilterPayload){
        if (this.shouldMock) return of(USER_ROLE_MOCK).pipe(delay(1500));

        let params = new HttpParams().set('user_type', `${ user }`);

        if(filter){
            if (filter.filter_by) params = params.set('filter_by', filter.filter_by);
            if (filter.q ) params = params.set('q', filter.q);
        }

        return this.http.get<UserRole[]>(`${this.url}/roles`, { params });
    }

    getPage(
        page: Page,
        filters: RoleFilterPayload
    ): Observable<PaginationPayload<UserRole[]>> {
        if (this.shouldMock)
            return of({ total: 90, items: USER_ROLE_MOCK }).pipe(delay(1000));

        let params = new HttpParams()
            .set('page', (page.index + 1).toString())
            .set('per_page', page.size.toString());

        if (filters && filters.filter_by)
            params = params.set('filter_by', filters.filter_by);

        if (filters && filters.q) params = params.set('q', filters.q);

        return this.http
            .get<UserRole[]>(`${this.url}/roles`, {
                observe: 'response',
                params,
            })
            .pipe(
                map(response => ({
                    items: response.body.map((rol,index) => ({
                        ...rol,
                        id: index
                    })),
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    getRoleByCode(code: string): Observable<UserRole>{
        if (this.shouldMock) return from([]).pipe(delay(1500));

        return this.http.get<UserRole>(`${this.url}/roles/${ code }`);
    }

    getRolePermissions(userType: UserType){
        if (this.shouldMock) return of(ROLE_PERMISSION_MOCK).pipe(delay(1000));

        return this.http.get<RolePermission[]>(`${this.url}/role-permissions?user_type=${userType}`);
    }

    createRole(payload: UserRoleCreatePayload): Observable<any>{
        if (this.shouldMock) return of(USER_ROLE_MOCK).pipe(delay(1000));

        return this.http.post<UserRole>(`${this.url}/roles`, payload);
    }

    updateUserRole(role: UserRole, payload: UserRoleUpdatePayload){
        return this.http.put<UserRole>(`${this.url}/roles/${ role.code }`, payload);
    }

    updateRoleStatus(role: UserRole, status: RoleStatus){
        return this.http.patch(`${this.url}/roles/${role.code}`,{
            status
        });
    }
}

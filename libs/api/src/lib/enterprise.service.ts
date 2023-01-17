import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import { BRANDING_MOCK } from '@libera/mocks/branding';
import { enterprises } from '@libera/mocks/programs.mocks';
import {
    Branding,
    UpdateLogoOrFaviconPayload,
    UpdateThemePayload,
} from '@libera/models/branding';
import { PlanFiltersPayload } from '@libera/models/catalog';
import {
    ActivityHistory,
    AvailableEnterprise,
    AvailableEnterpriseType,
    BasicFinancialPlan,
    ChangeDocumentationStatusPayload,
    ChangeProgramStatusPayload,
    CreateProgramPayload,
    DocumentNumber,
    Enterprise,
    EnterpriseBasicInfo,
    EnterpriseCustomAttribute,
    EnterpriseDocumentation,
    EnterpriseDocumentationFile,
    EnterpriseModule,
    EnterpriseProvider,
    EnterpriseProviderBulk,
    EnterpriseProviderBulkCreateRequestPayload,
    EnterpriseProviderFilterPayload,
    EnterpriseProviderLinkConfirmation,
    EnterpriseProviderPayload,
    EnterpriseProviderTokenVerification,
    EnterpriseStatus,
    EnterpriseUser,
    EnterpriseUserFilterBy,
    EnterpriseUserPayload,
    FinancialPlan,
    FinancialPlanDetail,
    ProgramFiltersPayload,
    ProgramStatus,
    RequestEnterpriseModuleActivationPayload,
    SaveNewDocument,
    UpdateEnterprisePayload,
    UpdateModulesProductsPayload,
} from '@libera/models/enterprise';
import { Page, PaginationPayload } from '@mediomelon/ng-core';
import {
    AVAILABLE_ENTERPRISE_MOCKS,
    ENTERPRISE_ACTIVITIES_HISTORY_MOCK,
    ENTERPRISE_CUSTOM_ATTRIBUTE_MOCKS,
    ENTERPRISE_DOCUMENTATION_FILE_MOCK,
    ENTERPRISE_DOCUMENTATION_MOCK,
    ENTERPRISE_MOCK,
    ENTERPRISE_MODULES_MOCK,
    ENTERPRISE_PROVIDER_MOCK,
    ENTERPRISE_PROVIDER_MOCKS,
    ENTERPRISE_PROVIDER_TOKEN_VERIFICATION,
    ENTERPRISE_USER_MOCK,
    ENTERPRISE_USER_MOCKS,
    FINANCIAL_PLANS_DEATIL_MOCK,
    PROVIDER_BULK_MOCK,
    PROVIDER_BULK_MOCKS,
} from 'libs/mocks/enterprise';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, retry, switchMapTo } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        
        this.url = `${endpoint}/enterprises`;
    }

    saveNewDocument (enterpriseId:number, payload:SaveNewDocument) {
        const { timeType, ...newPayload } = payload;
        return this.http.post(`${this.url}/${enterpriseId}/documentation`, {
            ...newPayload,
            effectiveness: 
                (newPayload.effectiveness !== null && newPayload.effectiveness !== "")
                ? Number(newPayload.effectiveness)
                : null
        });
    }

    createProgram({
        name,
        firstSurname,
        secondSurname,
        ciiu,
        economicSector,
        economicActivity,
        ...rest
    }: any): Observable<any> {
        if (this.shouldMock)
            return of({
                id: 1990,
                vinculationDate: null,
                phone: {
                    countryCode: {
                        id: 1,
                        code: '+52',
                        country: 'México',
                    },
                    number: '900-00-343',
                },
                sector: null,
                owner: {
                    id: 1,
                    name: 'Pedrito',
                    firstSurname: 'Ferrari',
                    secondSurname: null,
                    email: 'program1@mock.com',
                    documentType: null,
                    documentNumber: null,
                    modules: rest.modules
                },
                enterpriseType: 'PUBLIC',
                email: null,
                enterpriseName: rest.enterpriseName,
                nit: rest.nit,
                modules: rest.modules,
                creationDate: new Date().toISOString(),
                status: 'PENDING_ACCOUNT_CONFIRMATION',
                ciiu: '0111',
                city: 'cansas',
                department: 'null',
                documentType: "NIT",
                economicActivity: "Desconocida",
                economicSector: "Desconocido",
                productType: "Desconocido",
                relationshipManager: "Desconocido",
                sale: "Desconocido",
                salesCut: "Desconocido"
            } as any).pipe(delay(1500));

        const payload: CreateProgramPayload = {
            ...rest,
            name: name.trim() || null,
            firstSurname: firstSurname.trim() || null,
            secondSurname: secondSurname ? secondSurname.trim() : null,
            economicActivity: {
                ciiuCode: ciiu
            }
        };
        return this.http.post<Enterprise>(this.url, payload);
    }
    createFinancialPlan({
        providerOptions,
        economicGroup,
        totalSales,
        salesCut,
        minimumRate,
        negotiatedRate,
        ...rest
    }: any, id: number): Observable<any> {
        const { linkedToProvider, providerDocumentType, providerDocumentNumber, providerEnterpriseName, authDay, ...providerOptionsRest } = providerOptions;
        const { enterprises } = economicGroup;
        const enterpriseGroup = enterprises ? enterprises.map( ({ id, sales, salesCut }) =>{
            const basic = { enterpriseId: id, sales, salesCut };
            return basic
        }) : null;
        const salesFormat = totalSales ? +totalSales.match(/(\d+)/g).join('') : 0;
        const authDayFormat = authDay ? (authDay === 'true' ? 0 : +authDay) : null;
        const payload: any = {
            ...rest,
            providerOptions: providerOptionsRest.providerId ? { authDay: authDayFormat, ...providerOptionsRest } : null,
            economicGroup: enterpriseGroup ? [ ...enterpriseGroup ] : null,
            totalSales: salesFormat !== 0 ? salesFormat : null,
            salesCut: salesCut,
            negotiatedRate: {
                baseValue: negotiatedRate.baseValue,
                baseType: negotiatedRate.baseType,
                periodicityType: negotiatedRate.periodicityType,
                ea: 1,
                mv: 1,
                specialRate: +negotiatedRate.specialRate.replace(",",".")
            },
            minimumRate: {
                baseValue: minimumRate.baseValue,
                baseType: minimumRate.baseType,
                periodicityType: minimumRate.periodicityType,
                ea: 1,
                mv: 1,
                specialRate: +minimumRate.specialRate.replace(",",".")
            }
        };
        return this.http.post<BasicFinancialPlan>(`${this.url}/${id}/financing-plans`, payload);
    }

    getFinancialPlans(id: number){
        if (this.shouldMock) return of(null).pipe(delay(1000));
        return this.http.get<BasicFinancialPlan[]>(
            `${this.url}/${id}/financing-plans`
        );
    }

    getDetailFinancialPlans(id: number){
        if (this.shouldMock) return of(FINANCIAL_PLANS_DEATIL_MOCK).pipe(delay(1500));
        return this.http.get<FinancialPlanDetail>(
            `${this.url}/financing-plans/${id}`
        );
    }

    approveFinancialPlan(idPlan: number, status:string, comments?:string){
        if (this.shouldMock) return of({status}).pipe(delay(1000));

        const payload: any = (comments)?{ status, comments}:{ status }
        return this.http.patch(`${this.url}/financing-plans/${idPlan}/status`, payload);
    }

    update(id: number, payload: UpdateEnterprisePayload) {
        if (this.shouldMock) return of(null).pipe(delay(1000));
        return this.http.put(`${this.url}/${id}`, payload);
    }

    getPage(
        filters: ProgramFiltersPayload,
        page: Page,
        status: ProgramStatus
    ): Observable<PaginationPayload<Enterprise[]>> {
        if (this.shouldMock)
            return of({ items: enterprises, total: 100 }).pipe(delay(1500));

        let params = new HttpParams()
            .set('page', `${page.index + 1}`)
            .set('per_page', `${page.size}`);

        if (status) params = params.set('status', status);

        if (filters.filter_by){
            params = params.set('filter_by', filters.filter_by !== 'MODULE' ? filters.filter_by : filters.module);
        }

        if (filters.q) params = params.set('q', filters.q);

        if (filters.documentType)
            params = params.set('documentType', filters.documentType);

        return this.http
            .get<Enterprise[]>(`${this.url}`, { observe: 'response', params })
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    getFinancialPlanPage(
        id: number,
        filters: PlanFiltersPayload,
        page: Page
    ): Observable<PaginationPayload<BasicFinancialPlan[]>> {

        let params = new HttpParams()
            .set('page', `${page.index + 1}`)
            .set('per_page', `${page.size}`);

        if (filters.filter_by)
            params = filters.filter_by !== 'DESCRIPTION' ? params.set('filter_by', filters.filter_by) : params.set('filter_by', 'TYPE');

        if (filters.q) params = params.set('q', filters.q);

        return this.http
            .get<BasicFinancialPlan[]>(`${this.url}/${id}/financing-plans`, { observe: 'response', params })
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    getUserPage(
        id: number,
        index: number,
        size: number,
        filterBy: EnterpriseUserFilterBy,
        query: string
    ): Observable<PaginationPayload<EnterpriseUser[]>> {
        if (this.shouldMock)
            return of({ items: ENTERPRISE_USER_MOCKS, total: 100 }).pipe(
                delay(1000)
            );

        let params = new HttpParams()
            .set('page', (index + 1).toString())
            .set('per_page', size.toString());

        if (filterBy) params = params.set('filter_by', filterBy);

        if (query) params = params.set('q', query);

        return this.http
            .get<EnterpriseUser[]>(`${this.url}/${id}/users`, {
                observe: 'response',
                params,
            })
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    createUser(id: number, payload: EnterpriseUserPayload) {
        if (this.shouldMock) return of(ENTERPRISE_USER_MOCK).pipe(delay(1000));

        return this.http.post<EnterpriseUser>(
            `${this.url}/${id}/users`,
            payload
        );
    }

    updateUser(
        enterpriseId: number,
        userId: number,
        payload: EnterpriseUserPayload
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.put(
            `${this.url}/${enterpriseId}/users/${userId}`,
            payload
        );
    }

    deleteUser(enterpriseId: number, userId: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete(`${this.url}/${enterpriseId}/users/${userId}`);
    }

    get(id: number) {
        if (this.shouldMock) return of(ENTERPRISE_MOCK).pipe(delay(1500));

        return this.http.get<Enterprise>(`${this.url}/${id}`);
    }

    getModules(id: number) {
        if (this.shouldMock)
            return of(ENTERPRISE_MODULES_MOCK).pipe(delay(1000));

        return this.http.get<EnterpriseModule[]>(`${this.url}/${id}/modules`);
    }

    request(id: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.patch(`${this.url}/${id}/request`, null);
    }

    getDocumentation(id: number) {
        if (this.shouldMock)
            return of(ENTERPRISE_DOCUMENTATION_MOCK).pipe(delay(1000));

        return this.http.get<EnterpriseDocumentation[]>(
            `${this.url}/${id}/documentation`
        );
    }

    linkFileToDocumentation(
        enterpriseId: number,
        documentationId: number,
        fileName: string,
        explanation:string,
        expeditionDate:string
    ) {
        if (this.shouldMock)
            return of(ENTERPRISE_DOCUMENTATION_FILE_MOCK).pipe(delay(1000));

        return this.http.put<EnterpriseDocumentationFile>(
            `${this.url}/${enterpriseId}/documentation/${documentationId}`,
            { filename: fileName, explanation, expeditionDate }
        );
    }

    deleteFileFromDocumentation(enterpriseId: number, documentationId: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete(
            `${this.url}/${enterpriseId}/documentation/${documentationId}`
        );
    }

    toggleStatus(
        enterpriseId: number,
        userId: number,
        status: EnterpriseStatus
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http
            .patch(`${this.url}/${enterpriseId}/users/${userId}`, {
                status,
            })
            .pipe(delay(1));
    }

    changeDocumentationStatus(
        enterpriseId: number,
        documentId: number,
        payload: ChangeDocumentationStatusPayload
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.patch(
            `${this.url}/${enterpriseId}/documentation/${documentId}/status`,
            payload
        );
    }

    changeProgramStatus(id: number, payload: ChangeProgramStatusPayload) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.patch(`${this.url}/${id}/status`, payload);
    }

    getBranding(id: number) {
        if (this.shouldMock) return of(BRANDING_MOCK).pipe(delay(1000));

        return this.http.get<Branding>(`${this.url}/${id}/branding`);
    }

    updateTheme(id: number, payload: UpdateThemePayload) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.put(`${this.url}/${id}/branding`, payload);
    }

    updateLogo(
        id: number,
        fileName: string
    ): Observable<UpdateLogoOrFaviconPayload> {
        if (this.shouldMock)
            return of({
                brandingLogoURL:
                    'https://citybuzzlocal.com/logos/profile/timestylesde-logo-dresden-sachsen-444.jpg',
            }).pipe(delay(1000));

        return this.http.put(`${this.url}/${id}/logo`, {
            brandingLogoName: fileName,
        });
    }

    updateFavicon(
        id: number,
        fileName: string
    ): Observable<UpdateLogoOrFaviconPayload> {
        if (this.shouldMock)
            return of({
                brandingFaviconURL:
                    'https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico',
            }).pipe(delay(1000));

        return this.http.put(`${this.url}/${id}/logo`, {
            brandingFaviconName: fileName,
        });
    }

    deleteBranding(id: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete(`${this.url}/${id}/branding`);
    }

    resendInvitation(id: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.post(`${this.url}/${id}/resend-invitation`, null); 
    }

    resendInvitationToUser(enterpriseId: number, userId: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.post(
            `${this.url}/${enterpriseId}/users/${userId}/resend-invitation`,
            null
        );
    }

    requestModuleActivation(
        id: number,
        payload: RequestEnterpriseModuleActivationPayload,
        token: string
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        let params = new HttpParams();

        if (token) params = params.set('token', token);

        return this.http.post(`${this.url}/${id}/modules`, payload, { params });
    }

    getProviderPage(
        id: number,
        page: Page,
        filters: EnterpriseProviderFilterPayload
    ): Observable<PaginationPayload<EnterpriseProvider[]>> {
        if (this.shouldMock)
            return of({ items: ENTERPRISE_PROVIDER_MOCKS, total: 100 }).pipe(
                delay(1000)
            );

        let params = new HttpParams()
            .set('page', `${page.index + 1}`)
            .set('per_page', `${page.size}`);

        if (filters.filter_by && filters.filter_by != 'STATUS')
            params = params.set('filter_by', filters.filter_by);

        if (filters.documentType) params = params.set('documentType', filters.documentType  )

        if (filters.status) params = params.set('status', filters.status);

        if (filters.q) params = params.set('q', filters.q);

        return this.http
            .get<EnterpriseProvider[]>(`${this.url}/${id}/providers`, {
                observe: 'response',
                params,
            })
            .pipe(
                map(response => ({
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                    items: response.body,
                }))
            );
    }

    createProvider(id: number, payload: EnterpriseProviderPayload) {
        if (this.shouldMock)
            return of(ENTERPRISE_PROVIDER_MOCK).pipe(delay(1000));

        return this.http.post<EnterpriseProvider>(
            `${this.url}/${id}/providers`,
            payload
        );
    }

    getProviderBulkPage(
        id: number,
        page: Page
    ): Observable<PaginationPayload<EnterpriseProviderBulk[]>> {
        if (this.shouldMock)
            return of({ items: PROVIDER_BULK_MOCKS, total: 100 }).pipe(
                delay(1000)
            );

        const params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        return this.http
            .get<EnterpriseProviderBulk[]>(`${this.url}/${id}/providers/bulk`, {
                params,
                observe: 'response',
            })
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    bulkCreateProviders(
        id: number,
        payload: EnterpriseProviderBulkCreateRequestPayload
    ): Observable<EnterpriseProviderBulk> {
        if (this.shouldMock) return of(PROVIDER_BULK_MOCK).pipe(delay(1000));

        return this.http
            .post<EnterpriseProviderBulk>(
                `${this.url}/${id}/providers/bulk`,
                payload
            )
            .pipe(retry(1));
    }

    linkFileToProvider(
        id: number,
        filename: string,
        contentType: string
    ): Observable<{ enterpriseRequestBulkId: number }> {
        if (this.shouldMock)
            return of({ enterpriseRequestBulkId: 999 }).pipe(delay(1000));

        return this.http.put<{ enterpriseRequestBulkId: number }>(
            `${this.url}/${id}/providers/file`,
            { filename, contentType }
        );
    }

    findByNit(nit: string) {
        if (this.shouldMock) {
            const random = Math.floor(Math.random() * 100) + 1;

            if (random > 50) return of(ENTERPRISE_MOCK).pipe(delay(1000));
            return of(ENTERPRISE_MOCK).pipe(
                delay(1000),
                switchMapTo(
                    throwError(
                        new HttpErrorResponse({
                            status: 409,
                        })
                    )
                )
            );
        }

        const params = new HttpParams({ fromObject: { q: nit } });

        return this.http.get<Enterprise>(`${this.url}/nit`, { params });
    }

    verifyProviderLinkToken(id: number, token: string) {
        if (this.shouldMock)
            return of(ENTERPRISE_PROVIDER_TOKEN_VERIFICATION).pipe(delay(1000));

        const params = new HttpParams({ fromObject: { token } });

        return this.http.get<EnterpriseProviderTokenVerification>(
            `${this.url}/${id}/providers/token-verification`,
            { params }
        );
    }

    confirmProviderLink(
        id: number,
        token: string,
        confirm: EnterpriseProviderLinkConfirmation
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        const params = new HttpParams({ fromObject: { token } });

        return this.http.patch(
            `${this.url}/${id}/providers/linking-confirm`,
            { reply: confirm },
            { params }
        );
    }

    getCustomAttributes(id: number): Observable<EnterpriseCustomAttribute[]> {
        if (this.shouldMock)
            return of(ENTERPRISE_CUSTOM_ATTRIBUTE_MOCKS).pipe(delay(1000));

        return this.http.get<EnterpriseCustomAttribute[]>(
            `${this.url}/${id}/custom-attributes`
        );
    }

    createCustomAttribute(
        id: number,
        payload: EnterpriseCustomAttribute
    ): Observable<EnterpriseCustomAttribute> {
        if (this.shouldMock)
            return of({
                id: 99,
                ...payload,
                creationDate: new Date().toISOString(),
            }).pipe(delay(1000));

        return this.http.post<EnterpriseCustomAttribute>(
            `${this.url}/${id}/custom-attributes`,
            payload
        );
    }

    deleteCustomAttribute(
        enterpriseId: number,
        attributeId: number
    ): Observable<void> {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete<void>(
            `${this.url}/${enterpriseId}/custom-attributes/${attributeId}`
        );
    }

    findAvailableEnterprises(
        id: number,
        query: string,
        type: AvailableEnterpriseType,
        documentType?: string
    ): Observable<AvailableEnterprise[]> {
        if (this.shouldMock)
            return of(AVAILABLE_ENTERPRISE_MOCKS).pipe(
                delay(1000)
                // switchMapTo(
                //     throwError(
                //         new HttpErrorResponse({
                //             status: 500,
                //         })
                //     )
                // )
            );

        const params = (documentType) ? new HttpParams({
            fromObject: { hint: query, link_type: type, documentType: documentType },
        }): new HttpParams({
            fromObject: { hint: query, link_type: type },
        })

        return this.http.get<AvailableEnterprise[]>(`${this.url}/${id}/links`, {
            params,
        });
    }

    findActivityHistory(id: number): Observable<ActivityHistory[]> {
        if (this.shouldMock)
            return of(ENTERPRISE_ACTIVITIES_HISTORY_MOCK).pipe(delay(1000));

        return this.http.get<ActivityHistory[]>(`${this.url}/${id}/record`);
    }

    getDocumentNumber(nit: string){
        return this.http.get<DocumentNumber>(`${this.url}/document-number/${nit}`);
    }

    findByCriterion(type: string, number: string, module: string){
        if(module) return this.http.get<Enterprise>(`${this.url}/document?type=${type}&number=${number}&module=${module}`);
        return this.http.get<Enterprise>(`${this.url}/document?type=${type}&number=${number}`);
    }
    
    updateModulesProducts(id: number, payload: UpdateModulesProductsPayload){
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.put(`${this.url}/${id}/modules-products`, payload);
    }

    documentationResolution(id: number){
        return this.http.post(`${this.url}/${id}/send-documentation-resolution`, null)
    }

    getEnterprisesBasicInfo(id: number){
        let params = new HttpParams()
            .set('enterprise_id', `${id}`);

        return this.http.get<EnterpriseBasicInfo[]>(`${this.url}/economic-group-basic-info`, {params});
    }
}

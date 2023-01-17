import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_ENDPOINT_PROVIDER, SHOULD_MOCK_PROVIDER } from '@libera/environment';
import {
    ENTERPRISE_REQUEST_LINK_MOCKS,
    ENTERPRISE_REQUEST_MODULE_DETAIL_MOCK,
    ENTERPRISE_REQUEST_MODULE_MOCKS,
} from '@libera/mocks/enterprise-request';
import {
    ChangeEnterpriseRequestStatusPayload,
    EnterpriseLinkRequest,
    EnterpriseModuleRequest,
    EnterpriseModuleRequestDetail,
    EnterpriseRequestPaginationFilters,
    EnterpriseRequestType,
} from '@libera/models/enterprise-request';
import { Page, PaginationPayload } from '@mediomelon/ng-core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, switchMapTo } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseRequestService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        this.url = `${endpoint}/enterprises-requests`;
    }

    getPage(
        page: Page,
        filters: EnterpriseRequestPaginationFilters,
        type: 'ENTERPRISE_LINKING'
    ): Observable<PaginationPayload<EnterpriseLinkRequest[]>>;
    getPage(
        page: Page,
        filters: EnterpriseRequestPaginationFilters,
        type: 'ENTERPRISE_MODULE_ACTIVATION'
    ): Observable<PaginationPayload<EnterpriseModuleRequest[]>>;
    getPage(
        page: Page,
        filters: EnterpriseRequestPaginationFilters,
        type: EnterpriseRequestType
    ): Observable<
        PaginationPayload<EnterpriseModuleRequest[] | EnterpriseLinkRequest[]>
    >;
    getPage(
        page: Page,
        filters: EnterpriseRequestPaginationFilters,
        type: EnterpriseRequestType
    ): Observable<
        PaginationPayload<EnterpriseModuleRequest[] | EnterpriseLinkRequest[]>
    > {
        if (this.shouldMock)
            return of({
                items:
                    type == 'ENTERPRISE_LINKING'
                        ? ENTERPRISE_REQUEST_LINK_MOCKS
                        : ENTERPRISE_REQUEST_MODULE_MOCKS,
                total: 100,
            }).pipe(delay(1000));

        let params = new HttpParams()
            .set('page', `${page.index + 1}`)
            .set('per_page', `${page.size}`);

        if (type) params = params.set('request', type);

        if (filters && filters.filter_by && filters.filter_by != 'status')
            params = params.set('filter_by', filters.filter_by);

        if (filters && filters.q) params = params.set('q', filters.q);

        if (filters && filters.status)
            params = params.set('status', filters.status);

        return this.http
            .get<EnterpriseModuleRequest[] | EnterpriseLinkRequest[]>(
                this.url,
                { observe: 'response', params }
            )
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    get(
        id: number
    ): Observable<EnterpriseModuleRequestDetail | EnterpriseLinkRequest> {
        if (this.shouldMock)
            return of({ ...ENTERPRISE_REQUEST_MODULE_DETAIL_MOCK, id }).pipe(
                delay(1000)
            );

        return this.http.get<
            EnterpriseModuleRequestDetail | EnterpriseLinkRequest
        >(`${this.url}/${id}`);
    }

    updateStatus(id: number, payload: ChangeEnterpriseRequestStatusPayload) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.patch(`${this.url}/${id}`, payload);
    }
}

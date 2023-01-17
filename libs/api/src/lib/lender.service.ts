import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_ENDPOINT_PROVIDER, SHOULD_MOCK_PROVIDER } from '@libera/environment';
import {
    CUSTOM_ATTRIBUTES_MOCK,
    LENDER_INVOICE_DETAIL_MOCK,
    LENDER_INVOICE_MOCKS,
    LENDER_MOCKS,
} from '@libera/mocks/lender';
import { LENDER_QUOTA_REQUEST_MOCK, LENDER_QUOTA_REQUEST_MOCKS } from '@libera/mocks/lender-quota-request';
import { PAYER_MOCK, PAYER_MOCKS } from '@libera/mocks/payer';
import {
    Lender,
    LenderConfirmPaymentPayload,
    LenderCustomAttribute,
    LenderInvoice,
    LenderInvoiceDetail,
    LenderInvoiceRequestPaginationFiltersPayload,
    LenderListPaginationFilterPayload,
    LenderRejectPaymentPayload,
    PatchLenderInvoicePayloadStatus,
} from '@libera/models/lender';
import {
    LenderQuotaRequest,
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaRequestPayload,
    LenderQuotaRequestStatus,
} from '@libera/models/lender-quota-request';
import { Payer, PayerCustomAttributePayload, PayerListPaginationFilterPayload } from '@libera/models/payer';
import { Page, PaginationPayload } from '@mediomelon/ng-core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LenderService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        this.url = `${endpoint}/lenders`;
    }

    getInvoice(
        enterpriseId: number,
        invoiceId: number
    ): Observable<LenderInvoiceDetail> {
        if (this.shouldMock)
            return of(LENDER_INVOICE_DETAIL_MOCK).pipe(delay(1000));

        return this.http.get<LenderInvoiceDetail>(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}`
        );
    }

    getInvoicePage(
        id: number,
        page: Page,
        payload: LenderInvoiceRequestPaginationFiltersPayload
    ): Observable<PaginationPayload<LenderInvoice[]>> {
        if (this.shouldMock)
            return of({ items: LENDER_INVOICE_MOCKS, total: 53 }).pipe(
                delay(1000)
            );

        let params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        if (payload && payload.filter_by && payload.q)
            params = params
                .set('filter_by', payload.filter_by)
                .set('q', payload.q);

        return this.http
            .get<LenderInvoice[]>(`${this.url}/${id}/invoices`, {
                params,
                observe: 'response',
            })
            .pipe(
                map(response => ({
                    items: response.body,
                    total: +response.headers.get('x-total-count'),
                }))
            );
    }

    changeInvoiceStatus(
        enterpriseId: number,
        requestId: number,
        status: 'ACCEPTED',
        payload: LenderConfirmPaymentPayload
    ): Observable<void>;
    changeInvoiceStatus(
        enterpriseId: number,
        requestId: number,
        status: 'REJECTED',
        payload: LenderRejectPaymentPayload
    ): Observable<void>;
    changeInvoiceStatus(
        enterpriseId: number,
        requestId: number,
        status: PatchLenderInvoicePayloadStatus,
        payload: LenderConfirmPaymentPayload | LenderRejectPaymentPayload
    ): Observable<void> {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.patch<void>(
            `${this.url}/${enterpriseId}/funding-requests/${requestId}/status`,
            {
                status,
                ...payload,
            }
        );
    }

    getPage(
        page: Page,
        payload: LenderListPaginationFilterPayload
    ): Observable<PaginationPayload<Lender[]>> {
        if (this.shouldMock)
            return of({ items: LENDER_MOCKS, total: 50 }).pipe(delay(1000));

        let params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        if (payload && payload.filter_by && payload.q)
            params = params
                .set('filter_by', payload.filter_by)
                .set('q', payload.q);

        return this.http
            .get<{ lenders: Lender[] }>(this.url, {
                params,
                observe: 'response',
            })
            .pipe(
                map(response => ({
                    items: response.body.lenders,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    getQuotaRequestPage(
        id: number,
        page: Page,
        payload: LenderQuotaRequestListPaginationFilterPayload
    ): Observable<PaginationPayload<LenderQuotaRequest[]>> {
        if (this.shouldMock)
            return of({ items: LENDER_QUOTA_REQUEST_MOCKS, total: 99 }).pipe(
                delay(1000)
            );

        let params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        if (payload && payload.filter_by && payload.q)
            params = params
                .set('filter_by', payload.filter_by)
                .set('q', payload.q);

        return this.http
            .get<LenderQuotaRequest[]>(`${this.url}/${id}/quota-requests`, {
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

    changeQuotaRequestStatus(
        enterpriseId: number,
        requestId: number,
        status: LenderQuotaRequestStatus
    ): Observable<void> {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.patch<void>(
            `${this.url}/${enterpriseId}/quota-requests/${requestId}/status`,
            { status }
        );
    }

    updateQuotaRequest(
        enterpriseId: number,
        requestId: number,
        payload: LenderQuotaRequestPayload
    ): Observable<LenderQuotaRequest> {
        if (this.shouldMock)
            return of({
                ...LENDER_QUOTA_REQUEST_MOCK,
                ...payload,
                status: 'PENDING_PAYER_APPROVAL' as any,
                id: requestId,
            }).pipe(delay(1000));

        return this.http.put<LenderQuotaRequest>(
            `${this.url}/${enterpriseId}/quota-requests/${requestId}`,
            payload
        );
    }

    getPayers(
        enterpriseId: number,
        page: Page,
        payload: PayerListPaginationFilterPayload
    ): Observable<PaginationPayload<Payer[]>> {
        if (this.shouldMock)
            return of({ items: PAYER_MOCKS, total: 53 }).pipe(delay(1000));

        let params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });
        if (payload && payload.filter_by && payload.q)
            params = params
                .set('filter_by', payload.filter_by)
                .set('q', payload.q);

        return this.http
            .get<Payer[]>(`${this.url}/${enterpriseId}/payers`, {
                params,
                observe: 'response',
            })
            .pipe(
                map(response => ({
                    items: response.body,
                    total: +response.headers.get('x-total-count'),
                }))
            );
    }

    getCustomAttributes(
        enterpriseId: number
    ): Observable<LenderCustomAttribute[]> {
        if (this.shouldMock)
            return of(CUSTOM_ATTRIBUTES_MOCK).pipe(delay(1500));

        return this.http.get<LenderCustomAttribute[]>(
            `${this.url}/${enterpriseId}/custom-attributes`
        );
    }

    createCustomAttributes(
        enterpriseId: number,
        payload: LenderCustomAttribute
    ): Observable<LenderCustomAttribute> {
        if (this.shouldMock)
            return of({
                ...payload,
                id: CUSTOM_ATTRIBUTES_MOCK.length + 1,
                creationDate: new Date(),
            }).pipe(delay(1500));

        return this.http.post<LenderCustomAttribute>(
            `${this.url}/${enterpriseId}/custom-attributes`,
            payload
        );
    }

    getPayersDetail(enterpriseId: number, payerId: number): Observable<Payer> {
        if (this.shouldMock)
            return of({ ...PAYER_MOCK, id: payerId }).pipe(delay(1000));

        return this.http.get<Payer>(
            `${this.url}/${enterpriseId}/payers/${payerId}`
        );
    }

    updatePayerCustomAttributes(
        enterpriseId: number,
        payerId: number,
        payload: PayerCustomAttributePayload[]
    ) {
        if (this.shouldMock) return of(null).pipe(delay(2500));

        return this.http.post(
            `${this.url}/${enterpriseId}/payers/${payerId}/custom-attributes`,
            payload
        );
    }

    deleteCustomAttribute(enterpriseId: number, attributeId: number) {
        if (this.shouldMock) return of(null).pipe(delay(1500));

        return this.http.delete(
            `${this.url}/${enterpriseId}/custom-attributes/${attributeId}`
        );
    }

    deletePayerCustomAttribute(
        enterpriseId: number,
        payerId: number,
        attributeId: number
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete(
            `${
                this.url
            }/${enterpriseId}/payers/${payerId}/custom-attributes/${attributeId}`
        );
    }
}

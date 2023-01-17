import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import {
    BULK_INVOICE_MOCK,
    BULK_INVOICE_MOCKS,
} from '@libera/mocks/bulk-invoice';
import {
    BULK_INVOICE_NEGOTIATION_DETAIL_MOCK,
    PAYER_BULK_INVOICE_NEGOTIATION_MOCKS,
} from '@libera/mocks/bulk-invoice-negotiation';
import {
    FUNDING_REQUEST_LOG_MOCKS,
    FUNDING_REQUEST_MOCK,
    LIST_FUNDING_REQUEST_MOCK,
} from '@libera/mocks/funding-request';
import { LINKED_LENDER_MOCKS } from '@libera/mocks/lender';
import {
    LENDER_QUOTA_REQUEST_MOCKS,
    QUOTA_REQUEST_MOCKS,
} from '@libera/mocks/lender-quota-request';
import { PAYER_INVOICE_MOCK, PAYER_INVOICE_MOCKS } from '@libera/mocks/payer';
import {
    INVOICE_NEGOTIATION_MOCK,
    INVOICE_NEGOTIATION_MOCKS,
    NEGOTIATION_LOG_MOCKS,
} from '@libera/mocks/shared';
import { BulkInvoice, BulkInvoicePayload } from '@libera/models/bulk-invoice';
import {
    BulkInvoiceNegotiationCounterOfferAction,
    BulkInvoiceNegotiationCounterOfferPayload,
    BulkInvoiceNegotiationDetail,
    BulkInvoiceNegotiationListPaginationFilterPayload,
    BulkInvoiceNegotiationPayload,
    PayerBulkInvoiceNegotiation,
} from '@libera/models/bulk-invoice-negotiation';
import {
    AdjustmentRequestPayload,
    FundingRequestLog,
    LenderFundingRequest,
    LenderInvoiceFundingRequest,
    LenderOrderedListPaginationFilterPayload,
    LinkedLender,
} from '@libera/models/lender';
import {
    LenderQuotaRequest,
    LenderQuotaRequestListPaginationFilterPayload,
    LenderQuotaUpdateStatusPayload,
    QuotaRequest,
} from '@libera/models/lender-quota-request';
import {
    PayerInvoice,
    PayerInvoicePaginationFiltersPayload,
    PayerInvoicePayload,
} from '@libera/models/payer';
import {
    Enterprise,
    InvoiceNegotiation,
    NegotiationLog,
    NegotiationOfferPayload,
    NegotiationPayload,
} from '@libera/models/shared';
import { Page, PaginationPayload } from '@mediomelon/ng-core';
import { Observable, of } from 'rxjs';
import { delay, map, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PayerService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        this.url = `${endpoint}/payers`;
    }

    getInvoicePage(
        id: number,
        page: Page,
        payload: PayerInvoicePaginationFiltersPayload
    ): Observable<PaginationPayload<PayerInvoice[]>> {
        if (this.shouldMock)
            return of({ items: PAYER_INVOICE_MOCKS, total: 80 }).pipe(
                delay(1000)
            );

        let params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        if (payload.filter_by && payload.filter_by != 'status')
            params = params.set('filter_by', payload.filter_by);

        if (payload.q) params = params.set('q', payload.q);

        if (payload.status) params = params.set('status', payload.status);

        return this.http
            .get<PayerInvoice[]>(`${this.url}/${id}/invoices`, {
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

    getInvoice(
        enterpriseId: number,
        invoiceId: number
    ): Observable<PayerInvoice> {
        if (this.shouldMock)
            return of({ ...PAYER_INVOICE_MOCK, id: invoiceId }).pipe(
                delay(1000)
            );

        return this.http.get<PayerInvoice>(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}`
        );
    }

    deleteInvoice(enterpriseId: number, invoiceId: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}`
        );
    }

    createInvoice(
        id: number,
        payload: PayerInvoicePayload
    ): Observable<PayerInvoice> {
        if (this.shouldMock) return of(PAYER_INVOICE_MOCK).pipe(delay(1000));

        return this.http.post<PayerInvoice>(
            `${this.url}/${id}/invoices`,
            payload
        );
    }

    updateInvoiceProvider(
        enterpriseId: number,
        invoiceId: number,
        providerId: number
    ): Observable<Enterprise> {
        if (this.shouldMock)
            return of({
                id: 999,
                enterpriseName: 'algo',
                nit: '900.999.877-3',
                owner: {
                    id: 1,
                    name: 'test',
                    firstSurname: 'test',
                    secondSurname: 'test',
                    email: 'test@gmail.com',
                },
            }).pipe(delay(1000));

        return this.http.put<Enterprise>(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}/provider`,
            { providerId }
        );
    }

    updateInvoiceLender(
        enterpriseId: number,
        invoiceId: number,
        lenderId: number
    ): Observable<Enterprise> {
        if (this.shouldMock)
            return of({
                id: 999,
                enterpriseName: 'algo',
                nit: '900.999.877-3',
                owner: {
                    id: 1,
                    name: 'test',
                    firstSurname: 'test',
                    secondSurname: 'test',
                    email: 'test@gmail.com',
                },
            }).pipe(delay(1000));

        return this.http.put<Enterprise>(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}/lender`,
            { lenderId }
        );
    }

    negotiateInvoiceDiscount(
        enterpriseId: number,
        invoiceId: number,
        payload: NegotiationPayload
    ): Observable<InvoiceNegotiation> {
        if (this.shouldMock)
            return of(INVOICE_NEGOTIATION_MOCK).pipe(delay(1000));

        return this.http.post<InvoiceNegotiation>(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/discount-negotiations`,
            payload
        );
    }

    getPayerInvoiceDiscountNegotiations(
        enterpriseId: number,
        invoiceId: number
    ): Observable<InvoiceNegotiation[]> {
        if (this.shouldMock)
            return of(INVOICE_NEGOTIATION_MOCKS).pipe(delay(1000));

        const params = new HttpParams({
            fromObject: { order_by: 'desc', size: '100' },
        });

        return this.http.get<InvoiceNegotiation[]>(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/discount-negotiations`,
            { params }
        );
    }

    updateNegotiationOffer(
        enterpriseId: number,
        invoiceId: number,
        negotiationId: number,
        payload: NegotiationOfferPayload
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.put(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/discount-negotiations/${negotiationId}`,
            payload
        );
    }

    cancelNegotiation(
        enterpriseId: number,
        invoiceId: number,
        negotiationId: number
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/discount-negotiations/${negotiationId}`
        );
    }

    fetchNegotiationLogs(
        enterpriseId: number,
        invoiceId: number,
        negotiationId: number
    ): Observable<NegotiationLog[]> {
        if (this.shouldMock) return of(NEGOTIATION_LOG_MOCKS).pipe(delay(1000));

        return this.http.get<NegotiationLog[]>(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/discount-negotiations/${negotiationId}/record`
        );
    }

    fetchBulkInvoicePage(
        id: number,
        page: Page
    ): Observable<PaginationPayload<BulkInvoice[]>> {
        if (this.shouldMock)
            return of({ items: BULK_INVOICE_MOCKS, total: 90 }).pipe(
                delay(1000)
            );

        const params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        return this.http
            .get<BulkInvoice[]>(`${this.url}/${id}/invoices/bulk-loads`, {
                params,
                observe: 'response',
            })
            .pipe(
                map(response => ({
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                    items: response.body,
                }))
            );
    }

    fetchBulkInvoice(
        enterpriseId: number,
        bulkId: number
    ): Observable<BulkInvoice> {
        if (this.shouldMock) return of(BULK_INVOICE_MOCK).pipe(delay(1000));

        return this.http.get<BulkInvoice>(
            `${this.url}/${enterpriseId}/invoices/bulk-loads/${bulkId}`
        );
    }

    bulkLoadInvoices(
        id: number,
        payload: BulkInvoicePayload
    ): Observable<BulkInvoice> {
        if (this.shouldMock) return of(BULK_INVOICE_MOCK).pipe(delay(1000));

        return this.http
            .post<BulkInvoice>(`${this.url}/${id}/invoices/bulk-loads`, payload)
            .pipe(retry(1));
    }

    fetchLinkedLenders(
        enterpriseId: number,
        filters: LenderOrderedListPaginationFilterPayload,
        page: Page
    ): Observable<PaginationPayload<LinkedLender[]>> {
        if (this.shouldMock)
            return of({ items: LINKED_LENDER_MOCKS, total: 10 }).pipe(
                delay(1000)
            );

        const params: HttpParams = new HttpParams({
            fromObject: {
                ...filters,
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        return this.http
            .get<LinkedLender[]>(`${this.url}/${enterpriseId}/lenders`, {
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

    requestQuotaAdjustment(
        enterpriseId: number,
        lenderId: number,
        payload: AdjustmentRequestPayload
    ) {
        if (this.shouldMock) return of({}).pipe(delay(1000));

        return this.http.post(
            `${
                this.url
            }/${enterpriseId}/lenders/${lenderId}/quota/adjustment-request`,
            payload
        );
    }

    createFundingRequest(
        enterpriseId: number,
        invoiceId: number,
        payload: LenderInvoiceFundingRequest
    ): Observable<LenderFundingRequest> {
        if (this.shouldMock) return of(FUNDING_REQUEST_MOCK).pipe(delay(1000));

        return this.http.post<LenderFundingRequest>(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/funding-requests`,
            payload
        );
    }

    getPayerInvoiceFundingRequest(
        enterpriseId: number,
        invoiceId: number
    ): Observable<LenderFundingRequest[]> {
        if (this.shouldMock)
            return of(LIST_FUNDING_REQUEST_MOCK).pipe(delay(1000));

        return this.http.get<LenderFundingRequest[]>(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}/funding-requests`
        );
    }

    fetchFundingRequestLogs(
        enterpriseId: number,
        invoiceId: number,
        requestId: number
    ): Observable<FundingRequestLog[]> {
        if (this.shouldMock)
            return of(FUNDING_REQUEST_LOG_MOCKS).pipe(delay(1000));

        return this.http.get<FundingRequestLog[]>(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/funding-requests/${requestId}/record`
        );
    }

    createQuotaRequest(
        enterpriseId: number,
        lenderId: number,
        payload: QuotaRequest
    ): Observable<LenderQuotaRequest> {
        if (this.shouldMock) return of(QUOTA_REQUEST_MOCKS).pipe(delay(1000));

        return this.http.post<LenderQuotaRequest>(
            `${this.url}/${enterpriseId}/lenders/${lenderId}/quota-requests`,
            payload
        );
    }
    getQuotaRequest(
        enterpriseId: number,
        filters: LenderQuotaRequestListPaginationFilterPayload,
        page: Page
    ): Observable<PaginationPayload<LenderQuotaRequest[]>> {
        if (this.shouldMock)
            return of({
                total: LENDER_QUOTA_REQUEST_MOCKS.length,
                items: LENDER_QUOTA_REQUEST_MOCKS,
            }).pipe(delay(1000));

        const params: HttpParams = new HttpParams({
            fromObject: {
                ...filters,
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        return this.http
            .get<LenderQuotaRequest[]>(
                `${this.url}/${enterpriseId}/quota-requests`,
                {
                    observe: 'response',
                    params,
                }
            )
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    updateQuotaRequestStatus(
        enterpriseId: number,
        requestId: number,
        payload: LenderQuotaUpdateStatusPayload
    ) {
        if (this.shouldMock) return of(null).pipe(delay(2500));

        return this.http.patch(
            `${this.url}/${enterpriseId}/quota-requests/${requestId}/status`,
            payload
        );
    }

    fetchBulkNegotiationPage(
        id: number,
        page: Page,
        payload: BulkInvoiceNegotiationListPaginationFilterPayload
    ): Observable<PaginationPayload<PayerBulkInvoiceNegotiation[]>> {
        if (this.shouldMock)
            return of({
                items: PAYER_BULK_INVOICE_NEGOTIATION_MOCKS,
                total: 45,
            }).pipe(delay(1000));

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
            .get<PayerBulkInvoiceNegotiation[]>(
                `${this.url}/${id}/invoices/bulk-discount-negotiations`,
                {
                    observe: 'response',
                    params,
                }
            )
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    fetchBulkNegotiation(
        enterpriseId: number,
        bulkId: number
    ): Observable<BulkInvoiceNegotiationDetail> {
        if (this.shouldMock)
            return of(BULK_INVOICE_NEGOTIATION_DETAIL_MOCK).pipe(delay(1000));

        return this.http.get<BulkInvoiceNegotiationDetail>(
            `${
                this.url
            }/${enterpriseId}/invoices/bulk-discount-negotiations/${bulkId}`
        );
    }

    createBulkNegotiation(
        id: number,
        payload: BulkInvoiceNegotiationPayload
    ): Observable<BulkInvoiceNegotiationDetail> {
        if (this.shouldMock)
            return of(BULK_INVOICE_NEGOTIATION_DETAIL_MOCK).pipe(delay(1000));

        return this.http.post<BulkInvoiceNegotiationDetail>(
            `${this.url}/${id}/invoices/bulk-discount-negotiations`,
            payload
        );
    }

    makeBulkNegotiationCounterOffer(
        enterpriseId: number,
        bulkId: number,
        action: 'APPROVED' | 'REJECTED'
    ): Observable<void>;
    makeBulkNegotiationCounterOffer(
        enterpriseId: number,
        bulkId: number,
        action: 'COUNTEROFFERED',
        payload: BulkInvoiceNegotiationCounterOfferPayload
    ): Observable<void>;
    makeBulkNegotiationCounterOffer(
        enterpriseId: number,
        bulkId: number,
        action: BulkInvoiceNegotiationCounterOfferAction,
        payload: BulkInvoiceNegotiationCounterOfferPayload = null
    ): Observable<void> {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        const newOffer =
            action == 'COUNTEROFFERED'
                ? { status: action, newOffer: payload }
                : { status: action };

        return this.http.put<void>(
            `${
                this.url
            }/${enterpriseId}/invoices/bulk-discount-negotiations/${bulkId}`,
            { status: action, newOffer: payload }
        );
    }

    deleteBulkNegotiation(
        enterpriseId: number,
        bulkId: number
    ): Observable<void> {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete<void>(
            `${
                this.url
            }/${enterpriseId}/invoices/bulk-discount-negotiations/${bulkId}`
        );
    }
}

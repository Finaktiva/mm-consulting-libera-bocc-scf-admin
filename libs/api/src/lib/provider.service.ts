import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_ENDPOINT_PROVIDER, SHOULD_MOCK_PROVIDER } from '@libera/environment';
import {
    BULK_INVOICE_NEGOTIATION_DETAIL_MOCK,
    PROVIDER_BULK_INVOICE_NEGOTIATION_MOCKS,
} from '@libera/mocks/bulk-invoice-negotiation';
import { PAYMENT_REQUEST_MOCK } from '@libera/mocks/payment-request';
import { PROVIDER_INVOICE_MOCK, PROVIDER_INVOICE_MOCKS } from '@libera/mocks/provider';
import { INVOICE_NEGOTIATION_MOCKS } from '@libera/mocks/shared';
import {
    BulkInvoiceNegotiationCounterOfferAction,
    BulkInvoiceNegotiationCounterOfferPayload,
    BulkInvoiceNegotiationDetail,
    BulkInvoiceNegotiationListPaginationFilterPayload,
    ProviderBulkInvoiceNegotiation,
} from '@libera/models/bulk-invoice-negotiation';
import { ProviderInvoice, ProviderInvoicePaginationFiltersPayload, ProviderPayment } from '@libera/models/provider';
import { InvoiceNegotiation, NegotiationOfferPayload } from '@libera/models/shared';
import { Page, PaginationPayload } from '@mediomelon/ng-core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, switchMapTo } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProviderService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        this.url = `${endpoint}/providers`;
    }

    getInvoicePage(
        id: number,
        page: Page,
        payload: ProviderInvoicePaginationFiltersPayload
    ): Observable<PaginationPayload<ProviderInvoice[]>> {
        if (this.shouldMock)
            return of({ items: PROVIDER_INVOICE_MOCKS, total: 80 }).pipe(
                delay(1000)
            );

        let params = new HttpParams({
            fromObject: {
                page: (page.index + 1).toString(),
                per_page: page.size.toString(),
            },
        });

        if (payload.filter_by)
            params = params.set('filter_by', payload.filter_by);

        if (payload.q) params = params.set('q', payload.q);

        return this.http
            .get<ProviderInvoice[]>(`${this.url}/${id}/invoices`, {
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
    ): Observable<ProviderInvoice> {
        if (this.shouldMock)
            return of({ ...PROVIDER_INVOICE_MOCK, id: invoiceId }).pipe(
                delay(1000)
            );

        return this.http.get<ProviderInvoice>(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}`
        );
    }

    getInvoiceDiscountNegotiations(
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

    getProviderPayment(
        enterpriseId: number,
        invoiceId: number
    ): Observable<ProviderPayment> {
        if (this.shouldMock) return of(PAYMENT_REQUEST_MOCK).pipe(delay(1000));

        return this.http.get<ProviderPayment>(
            `${this.url}/${enterpriseId}/invoices/${invoiceId}/payment`
        );
    }

    createPaymentConfirmation(
        enterpriseId: number,
        invoiceId: number,
        fundingRequestId: number
    ) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.patch(
            `${
                this.url
            }/${enterpriseId}/invoices/${invoiceId}/payment-confirmation`,
            { fundingRequestId }
        );
    }

    fetchBulkNegotiationPage(
        id: number,
        page: Page,
        payload: BulkInvoiceNegotiationListPaginationFilterPayload
    ): Observable<PaginationPayload<ProviderBulkInvoiceNegotiation[]>> {
        if (this.shouldMock)
            return of({
                items: PROVIDER_BULK_INVOICE_NEGOTIATION_MOCKS,
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
            .get<ProviderBulkInvoiceNegotiation[]>(
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
            return of({
                id: bulkId,
                ...BULK_INVOICE_NEGOTIATION_DETAIL_MOCK,
            }).pipe(delay(1000));

        return this.http.get<BulkInvoiceNegotiationDetail>(
            `${
                this.url
            }/${enterpriseId}/invoices/bulk-discount-negotiations/${bulkId}`
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
            newOffer
        );
    }
}

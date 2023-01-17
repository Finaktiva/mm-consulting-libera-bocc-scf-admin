import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INVOICE_STATUS, InvoiceStatus } from '@libera/models/shared';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { delay, map, switchMap, tap } from 'rxjs/operators';

import { ProviderInvoiceQuery } from '../../state/provider-invoice.query';
import { ProviderInvoiceStoreService } from '../../state/provider-invoice.store.service';

@Component({
    selector: 'provider-invoice-layout',
    templateUrl: './provider-invoice.layout.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderInvoiceLayout implements OnInit, OnDestroy {
    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    status$: Observable<InvoiceStatus>;

    invoiceNumber$: Observable<string>;

    INVOICE_STATUS = INVOICE_STATUS;

    shouldRenderRequestPayment$: Observable<boolean>;

    private subscription = new Subscription();

    constructor(
        private storeService: ProviderInvoiceStoreService,
        private query: ProviderInvoiceQuery,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        const id$ = this.route.paramMap.pipe(
            map(paramMap => parseInt(paramMap.get('id')))
        );

        this.hasLoaded$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityLoaded(id))
        );

        this.isLoading$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityLoading(id))
        );

        this.error$ = id$.pipe(
            switchMap(id => this.query.selectUIEntityError(id))
        );

        const entity$ = id$.pipe(switchMap(id => this.query.selectEntity(id)));

        this.status$ = entity$.pipe(
            select(entity => (entity ? entity.status : null))
        );

        this.invoiceNumber$ = entity$.pipe(
            select(entity => (entity ? entity.invoiceNumber : null))
        );

        this.shouldRenderRequestPayment$ = combineLatest(
            this.hasLoaded$,
            this.status$
        ).pipe(
            select(
                ([hasLoaded, status]) =>
                    hasLoaded &&
                    (status == INVOICE_STATUS.PAID ||
                        status == INVOICE_STATUS.PAYMENT_CONFIRMED ||
                        status == INVOICE_STATUS.FUNDING_IN_PROGRESS)
            )
        );

        const sub1 = id$
            .pipe(switchMap(id => this.storeService.fetch(id)))
            .subscribe();

        //dumb hack
        const sub2 = this.hasLoaded$
            .pipe(delay(0))
            .subscribe(() => this.cdr.detectChanges());

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fetchInvoice() {
        this.storeService.fetch(this.id).subscribe();
    }

    get id(): number {
        return parseInt(this.route.snapshot.paramMap.get('id'));
    }
}

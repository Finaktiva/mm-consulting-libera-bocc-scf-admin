import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderInvoice } from '@libera/models/provider';
import { Enterprise } from '@libera/models/shared';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProviderInvoiceQuery } from '../../state/provider-invoice.query';

@Component({
    selector: 'provider-invoice-detail-page',
    templateUrl: './provider-invoice-detail.page.html',
    styleUrls: ['./provider-invoice-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderInvoiceDetailPage implements OnInit, OnDestroy {
    hasLoaded$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    error$: Observable<any>;

    entity$: Observable<ProviderInvoice>;

    shouldRenderPayerInfo$: Observable<boolean>;

    shouldRenderPayerAlert$: Observable<boolean>;

    payer$: Observable<Enterprise>;

    private subscription = new Subscription();

    constructor(
        private query: ProviderInvoiceQuery,
        private route: ActivatedRoute
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

        this.entity$ = id$.pipe(switchMap(id => this.query.selectEntity(id)));

        const hasProvider$ = id$.pipe(
            switchMap(id => this.query.selectEntityHasPayer(id))
        );

        this.shouldRenderPayerInfo$ = hasProvider$;

        this.shouldRenderPayerAlert$ = hasProvider$.pipe(
            map(hasProvider => !hasProvider)
        );

        this.payer$ = id$.pipe(
            switchMap(id => this.query.selectEntityPayer(id))
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

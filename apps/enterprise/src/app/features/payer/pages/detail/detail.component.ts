import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LenderCustomAttribute } from '@libera/models/lender';
import { Payer, PayerCustomAttribute } from '@libera/models/payer';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PayerComplementaryInformationComponent } from '../../components/payer-complementary-information/payer-complementary-information.component';
import { NoCustomAttributesDialogComponent } from '../../dialogs/no-custom-attributes-dialog/no-custom-attributes-dialog.component';
import { CustomAttributesQuery } from '../../state/custom-attributes.query';
import { CustomAttributesStoreService } from '../../state/custom-attributes.store.service';
import { PayerQuery } from '../../state/payer.query';
import { PayerStoreService } from '../../state/payer.store.service';
import { hasAttributes, mergeAttributes } from '../../utils';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
    isLoading$: Observable<boolean>;
    isSubmitting$: Observable<boolean>;
    isDeletingAttribute$: Observable<boolean>;
    hasLoaded$: Observable<boolean>;
    error$: Observable<any>;
    entity$: Observable<Payer>;
    enterpriseName$: Observable<string>;
    payerCustomAttributes$: Observable<
        (PayerCustomAttribute | LenderCustomAttribute)[]
    >;
    hasLenderAttributes$: Observable<boolean>;

    shouldRenderProgressBar$: Observable<boolean>;

    @ViewChild(PayerComplementaryInformationComponent, { static: false })
    complementaryInformation: PayerComplementaryInformationComponent;

    private lenderAttributes$: Observable<LenderCustomAttribute[]>;

    constructor(
        private payerQuery: PayerQuery,
        private payerStoreService: PayerStoreService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private customAttributesQuery: CustomAttributesQuery,
        private customAttributesStoreService: CustomAttributesStoreService
    ) {}

    ngOnInit() {
        const id$ = this.activatedRoute.params.pipe(map(({ id }) => id));

        this.entity$ = id$.pipe(
            switchMap(id => this.payerQuery.selectEntity(id))
        );

        this.isLoading$ = combineLatest(
            id$.pipe(
                switchMap(id => this.payerQuery.selectUIEntityLoading(id))
            ),
            this.customAttributesQuery.selectLoading()
        ).pipe(map(x => x.some(Boolean)));

        this.hasLoaded$ = combineLatest(
            id$.pipe(switchMap(id => this.payerQuery.selectUIEntityLoaded(id))),
            this.customAttributesQuery.selectLoaded()
        ).pipe(map(x => x.every(Boolean)));

        this.error$ = id$.pipe(
            switchMap(id => this.payerQuery.selectUIEntityError(id))
        );

        this.enterpriseName$ = this.entity$.pipe(
            map(entity => entity.enterpriseName)
        );

        this.lenderAttributes$ = this.customAttributesQuery.selectEntities();

        this.hasLenderAttributes$ = this.lenderAttributes$.pipe(
            map(hasAttributes)
        );

        this.payerCustomAttributes$ = combineLatest(
            this.entity$.pipe(map(x => x.customAttributes)),
            this.lenderAttributes$
        ).pipe(map(mergeAttributes));

        this.isSubmitting$ = id$.pipe(
            switchMap(id => this.payerQuery.selectUIEntityUpdating(id))
        );

        this.isDeletingAttribute$ = id$.pipe(
            switchMap(id => this.payerQuery.selectUIEntityDeleting(id))
        );

        this.shouldRenderProgressBar$ = combineLatest(
            this.isDeletingAttribute$,
            this.isSubmitting$
        ).pipe(map(x => x.some(Boolean)));

        this.fetchEntity();
        this.customAttributesStoreService.fetchAll().subscribe();
    }

    fetchEntity() {
        this.payerStoreService.fetch(this.id).subscribe();
    }

    onSubmit(payload: PayerCustomAttribute[]) {
        this.payerStoreService
            .updatePayerCustomAttributes(this.id, payload)
            .subscribe(() => this.complementaryInformation.onCloseForm());
    }

    onDelete(attributeId: number) {
        this.payerStoreService
            .deleteCustomAttribute(this.id, attributeId)
            .subscribe();
    }

    onNoCustomFields() {
        this.dialog.open(NoCustomAttributesDialogComponent);
    }

    get id(): number {
        return parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    }
}

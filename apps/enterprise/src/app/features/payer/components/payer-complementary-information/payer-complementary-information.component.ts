import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { LENDER_CUSTOM_ATTRIBUTE_TYPES } from '@libera/models/lender';
import { PayerCustomAttribute } from '@libera/models/payer';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'payer-complementary-information',
    templateUrl: './payer-complementary-information.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerComplementaryInformationComponent implements OnInit {
    @Input('entities') set entities(entities: PayerCustomAttribute[]) {
        this.incommingEntities$.next(entities);
    }

    @Input() isSubmitting: boolean;
    @Input() isDeletingAttribute: boolean;
    @Input() hasAttributes: boolean;

    @Output() noCustomFields;
    @Output('onSubmit') submit: EventEmitter<PayerCustomAttribute[]>;
    @Output() delete: EventEmitter<number>;

    incommingEntities$: BehaviorSubject<PayerCustomAttribute[]>;
    shouldRenderForm$: BehaviorSubject<boolean>;
    answeredEntities$: Observable<PayerCustomAttribute[]>;
    hasAnswers$: Observable<boolean>;
    hasUnansweredAttributes$: Observable<boolean>;
    shouldRenderMessage$: Observable<boolean>;
    shouldRenderEditButton$: Observable<boolean>;
    shouldRenderList$: Observable<boolean>;

    constructor() {
        this.incommingEntities$ = new BehaviorSubject([]);
        this.shouldRenderForm$ = new BehaviorSubject(false);
        this.delete = new EventEmitter();
        this.submit = new EventEmitter();
        this.noCustomFields = new EventEmitter();
    }

    ngOnInit() {
        this.answeredEntities$ = this.incommingEntities$.pipe(
            map(entities =>
                entities.filter(e =>
                    e.type == LENDER_CUSTOM_ATTRIBUTE_TYPES.CHECKBOX
                        ? e.options.some(o => o.isChecked)
                        : !!e.value
                )
            )
        );

        this.hasAnswers$ = this.answeredEntities$.pipe(map(x => !!x.length));

        const conditions$ = combineLatest(
            this.hasAnswers$,
            this.shouldRenderForm$
        );

        this.shouldRenderMessage$ = conditions$.pipe(map(x => x.some(Boolean)));

        this.shouldRenderEditButton$ = conditions$.pipe(
            map(([x, y]) => x && !y)
        );

        this.shouldRenderList$ = this.shouldRenderEditButton$;

        this.hasUnansweredAttributes$ = combineLatest(
            this.incommingEntities$.pipe(map(x => x.length)),
            this.answeredEntities$.pipe(map(x => x.length))
        ).pipe(map(([x, y]) => y < x));
    }

    onCapture() {
        if (this.hasAttributes) {
            this.shouldRenderForm$.next(true);
        } else {
            this.noCustomFields.emit();
        }
    }

    onSubmit(payload: PayerCustomAttribute[]) {
        this.submit.emit(payload);
    }

    onDelete(id: number) {
        this.delete.emit(id);
    }

    onEdit() {
        this.shouldRenderForm$.next(true);
    }

    onCloseForm() {
        this.shouldRenderForm$.next(false);
    }
}

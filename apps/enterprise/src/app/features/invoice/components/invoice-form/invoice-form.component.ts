import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Currency } from '@libera/models/catalog';
import {
    AvailableEnterprise,
    EnterpriseCustomAttribute,
    ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE,
} from '@libera/models/enterprise';
import {
    PayerInvoiceFormPayload,
    PayerInvoicePayload,
} from '@libera/models/payer';
import {
    INVOICE_DOCUMENT_TYPE,
    INVOICE_PAYMENT_TYPE,
} from '@libera/models/shared';
import {
    currencyToNumber,
    isPlainObject,
    parseInputCurrency,
    whitespaceValidator,
} from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { Moment } from 'moment';
import { merge, Observable, of, Subscription } from 'rxjs';
import {
    catchError,
    debounceTime,
    filter,
    map,
    mapTo,
    switchMap,
} from 'rxjs/operators';
import { INVOICE_NUMBER_LENGTH, INVOICE_VALUE_LENGTH } from '../../constants';
import { CustomAttributePickerDialog } from '../../dialogs/custom-attribute-picker/custom-attribute-picker.dialog';
import { AvailableEnterpriseQuery } from '../../state/available-enterprise.query';
import { AvailableEnterpriseStore } from '../../state/available-enterprise.store';
import { AvailableEnterpriseStoreService } from '../../state/available-enterprise.store.service';

@Component({
    selector: 'invoice-form',
    templateUrl: './invoice-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        AvailableEnterpriseStoreService,
        AvailableEnterpriseQuery,
        AvailableEnterpriseStore,
    ],
})
export class InvoiceFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() currencies: Currency[];

    INVOICE_DOCUMENT_TYPE = INVOICE_DOCUMENT_TYPE;

    INVOICE_PAYMENT_TYPE = INVOICE_PAYMENT_TYPE;

    ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE = ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE;

    INVOICE_NUMBER_LENGTH = INVOICE_NUMBER_LENGTH;

    INVOICE_VALUE_LENGTH = INVOICE_VALUE_LENGTH;

    maxDate = new Date();

    flex$: Observable<string> = this.mediaObserver.asObservable().pipe(
        filter(changes => changes.length > 0),
        map(changes => changes[0]),
        map(change => {
            switch (change.mqAlias) {
                case 'xl':
                    return 5;
                case 'lg':
                    return 4;
                case 'md':
                    return 3;
                case 'sm':
                    return 2;
                default:
                    return 1;
            }
        }),
        map(size => `0 0 calc((100% / ${size}) - 12px)`)
    );

    isLoading$: Observable<boolean> = this.query.selectLoading();

    error$: Observable<any> = this.query.selectError();

    providers$: Observable<AvailableEnterprise[]>;

    private subscription: Subscription;

    constructor(
        private cdr: ChangeDetectorRef,
        private mediaObserver: MediaObserver,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private query: AvailableEnterpriseQuery,
        private storeService: AvailableEnterpriseStoreService
    ) {
        super();

        this.form = formBuilder.group({
            invoiceNumber: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(this.INVOICE_NUMBER_LENGTH),
                    whitespaceValidator,
                ],
            ],
            alternativeInvoiceId: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(this.INVOICE_NUMBER_LENGTH),
                    whitespaceValidator,
                ],
            ],
            emissionDate: [null, Validators.required],
            expirationDate: [null, Validators.required],
            documentType: [null, Validators.required],
            provider: null,
            paymentType: [null, Validators.required],
            payment: formBuilder.group({
                amount: [
                    '',
                    [
                        Validators.required,
                        Validators.min(1),
                        Validators.maxLength(this.INVOICE_VALUE_LENGTH),
                    ],
                ],

                vat: [
                    '',
                    [
                        Validators.required,
                        Validators.min(0),
                        Validators.maxLength(this.INVOICE_VALUE_LENGTH),
                    ],
                ],
                retentions: [
                    '',
                    [
                        Validators.required,
                        Validators.min(0),
                        Validators.maxLength(this.INVOICE_VALUE_LENGTH),
                    ],
                ],
                creditNotesValue: [
                    '',
                    [
                        Validators.required,
                        Validators.min(0),
                        Validators.maxLength(this.INVOICE_VALUE_LENGTH),
                    ],
                ],
                inAdvance: [
                    '',
                    [
                        Validators.required,
                        Validators.min(0),
                        Validators.maxLength(this.INVOICE_VALUE_LENGTH),
                    ],
                ],
            }),
            currencyCode: [null, Validators.required],
            customAttributes: formBuilder.array([]),
        });
    }

    ngOnInit() {
        const providerValueChanges$ = this.form.get('provider').valueChanges;

        this.providers$ = merge(
            providerValueChanges$.pipe(mapTo([])),
            this.query.selectEntities()
        );

        this.subscription = providerValueChanges$
            .pipe(
                debounceTime(500),
                filter(
                    value =>
                        value && typeof value == 'string' && value.length >= 5
                ),
                switchMap(value =>
                    this.storeService
                        .find(value, 'PROVIDER')
                        .pipe(catchError(() => of([])))
                )
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onBlur(payload) {
        const value = 'payment.' + payload;
        const control = this.form.get(value);
        parseInputCurrency(control);
    }

    onManageCustomAttributes() {
        const dialog = this.dialog.open(CustomAttributePickerDialog, {
            data: {
                selectedIds: (this.customAttributeFormArray
                    .value as EnterpriseCustomAttribute[]).map(
                    value => value.id
                ),
            },
        });

        const subscription = dialog
            .afterClosed()
            .subscribe((result: EnterpriseCustomAttribute[]) => {
                subscription.unsubscribe();
                if (result) this.mapCustomAttributesToFormArray(result);
            });
    }

    displayWith(value: AvailableEnterprise): string {
        return value ? value.enterpriseName : '';
    }

    getFormValue(): PayerInvoicePayload {
        const {
            emissionDate,
            expirationDate,
            customAttributes,
            provider,
            payment,
            ...rest
        } = this.form.value as PayerInvoiceFormPayload;
        return {
            provider: isPlainObject(provider) ? provider : null,
            emissionDate: emissionDate.toISOString(),
            expirationDate: expirationDate.toISOString(),
            customAttributes: customAttributes.map(({ id, value, type }) => {
                const newValue = (type == 'DATE'
                    ? (value as Moment).toISOString()
                    : value) as string | number;
                return {
                    id,
                    value: newValue,
                };
            }),
            payment: {
                amount: currencyToNumber(payment.amount),
                creditNotesValue: currencyToNumber(payment.creditNotesValue),
                inAdvance: currencyToNumber(payment.inAdvance),
                retentions: currencyToNumber(payment.retentions),
                vat: currencyToNumber(payment.vat),
            },
            ...rest,
        };
    }

    get customAttributeFormArray(): FormArray {
        return this.form.get('customAttributes') as FormArray;
    }

    private mapCustomAttributesToFormArray(
        customAttributes: EnterpriseCustomAttribute[]
    ): void {
        const customAttributeFormArray = this.customAttributeFormArray;

        const formGroups: FormGroup[] = customAttributes.map(
            ({ id, name, type }) => {
                let actualValue = null;

                for (let control of customAttributeFormArray.controls) {
                    const controlValue = control.value as EnterpriseCustomAttribute;
                    if (controlValue.id != id) continue;
                    actualValue = controlValue.value;
                    break;
                }

                return this.formBuilder.group({
                    id,
                    type,
                    name,
                    value: [actualValue, Validators.required],
                });
            }
        );

        customAttributeFormArray.clear();

        formGroups.forEach(formGroup =>
            customAttributeFormArray.push(formGroup)
        );

        this.cdr.detectChanges();
    }
}

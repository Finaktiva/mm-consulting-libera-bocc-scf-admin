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
import {
    BulkInvoiceFormPayload,
    InvoicePayload,
} from '@libera/models/bulk-invoice';
import { Currency } from '@libera/models/catalog';
import {
    EnterpriseCustomAttribute,
    EnterpriseCustomAttributeFormPayload,
    ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE,
} from '@libera/models/enterprise';
import {
    InvoiceDocumentType,
    InvoicePaymentType,
    INVOICE_DOCUMENT_TYPE,
    INVOICE_PAYMENT_TYPE,
} from '@libera/models/shared';
import { currencyToNumber, zip } from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { Moment } from 'moment';
import { Observable, of, Subscription } from 'rxjs';
import { fromBlob } from 'rxjs-augmented';
import {
    filter,
    map,
    shareReplay,
    switchMap,
    withLatestFrom,
} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { CustomAttributePickerDialog } from '../../dialogs/custom-attribute-picker/custom-attribute-picker.dialog';
import {
    BulkInvoiceField,
    BulkInvoiceFormColumn,
    BULK_INVOICE_FIELD,
} from '../../models';
import { columnsValidator } from './columns.validator';

@Component({
    selector: 'bulk-invoice-form',
    templateUrl: './bulk-invoice-form.component.html',
    styleUrls: ['./bulk-invoice-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkInvoiceFormComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() currencies: Currency[];

    sheetNames$: Observable<string[]>;

    sheetAsColumns$: Observable<string[][]>;

    INVOICE_DOCUMENT_TYPE = INVOICE_DOCUMENT_TYPE;

    INVOICE_PAYMENT_TYPE = INVOICE_PAYMENT_TYPE;

    ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE = ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE;

    BULK_INVOICE_FIELD = BULK_INVOICE_FIELD;

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

    private subscription = new Subscription();

    constructor(
        private cdr: ChangeDetectorRef,
        private mediaObserver: MediaObserver,
        private formBuilder: FormBuilder,
        private dialog: MatDialog
    ) {
        super();

        this.form = formBuilder.group({
            currencyCode: [null, Validators.required],
            documentType: [null, Validators.required],
            paymentType: [null, Validators.required],
            customAttributes: formBuilder.array([]),
            file: [null, Validators.required],
            sheetName: [null, Validators.required],
            columns: formBuilder.array([], { validators: columnsValidator }),
        });
    }

    ngOnInit() {
        const selectedFile$: Observable<File> = this.form.get('file')
            .valueChanges;

        const selectedSheetName$: Observable<string> = this.form.get(
            'sheetName'
        ).valueChanges;

        const workBook$: Observable<XLSX.WorkBook> = selectedFile$.pipe(
            switchMap(file => (file ? fromBlob(file) : of<ArrayBuffer>(null))),
            map(result => {
                if (!result) return null;

                return XLSX.read(result, {
                    type: 'buffer',
                    cellDates: true,
                });
            }),
            shareReplay({ bufferSize: 1, refCount: true })
        );

        this.sheetNames$ = workBook$.pipe(
            map(workBook => {
                if (!workBook) return [];

                return workBook.SheetNames;
            }),
            shareReplay({ bufferSize: 1, refCount: true })
        );

        const sheetAsJSON$: Observable<string[][]> = selectedSheetName$.pipe(
            withLatestFrom(workBook$),
            map(([sheetName, workBook]) => {
                const workSheet: XLSX.WorkSheet = workBook.Sheets[sheetName];

                return XLSX.utils.sheet_to_json(workSheet, {
                    header: 1,
                    raw: true,
                    defval: null,
                });
            }),
            shareReplay<string[][]>({ bufferSize: 1, refCount: true })
        );

        this.sheetAsColumns$ = sheetAsJSON$.pipe(
            map(sheetAsJSON =>
                sheetAsJSON && sheetAsJSON.length ? zip(...sheetAsJSON) : []
            ),
            shareReplay<string[][]>({ bufferSize: 1, refCount: true })
        );

        const sub1 = this.sheetAsColumns$.subscribe(asColumns => {
            const columns: FormArray = this.form.get('columns') as FormArray;

            columns.clear();

            asColumns.forEach((column, index) => {
                const control = this.formBuilder.control(null);

                columns.insert(index, control);
            });
        });

        const sub2 = selectedFile$.subscribe(() =>
            this.form.get('sheetName').reset(null, { emitEvent: false })
        );

        this.subscription.add(sub1).add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getFormValue(): BulkInvoiceFormPayload {
        const { columns, customAttributes, sheetName, ...payload } = this.form
            .value as {
            sheetName: string;
            file: File;
            columns: BulkInvoiceFormColumn[];
            currencyCode: string;
            documentType: InvoiceDocumentType;
            paymentType: InvoicePaymentType;
            customAttributes: EnterpriseCustomAttributeFormPayload[];
        };

        const selectedColumns = columns.filter(column => column);
        const { [0]: first, ...rest } = selectedColumns;

        const asObject: {
            [field in BulkInvoiceField]: any[]
        } = selectedColumns.reduce(
            (asObject, column) => {
                const cells = column.cells.map(cell =>
                    cell instanceof Date ? cell.toISOString() : cell
                );
                asObject[column.field] = cells;
                return asObject;
            },
            {} as { [field in BulkInvoiceField]: any[] }
        );

        const invoices: InvoicePayload[] = [];

        for (let i = 0; i < asObject.ALTERNATIVE_INVOICE_ID.length; i++) {
            const invoiceNumberValue = asObject.INVOICE_NUMBER[i];
            if (invoiceNumberValue != null) {
                const invoiceNumber =
                    typeof invoiceNumberValue == 'number'
                        ? invoiceNumberValue.toString()
                        : invoiceNumberValue;

                invoices.push({
                    alternativeInvoiceId: asObject.ALTERNATIVE_INVOICE_ID[i],
                    emissionDate: asObject.EMISSION_DATE[i],
                    expirationDate: asObject.EXPIRATION_DATE[i],
                    invoiceNumber: invoiceNumber,
                    payment: {
                        amount: currencyToNumber(asObject.AMOUNT[i].toString()),
                        creditNotesValue: currencyToNumber(
                            asObject.CREDIT_NOTES_VALUE[i].toString()
                        ),
                        inAdvance: currencyToNumber(
                            asObject.PAYMENT_ADVANCE[i].toString()
                        ),
                        retentions: currencyToNumber(
                            asObject.RETENTIONS[i].toString()
                        ),
                        vat: currencyToNumber(asObject.VAT[i].toString()),
                    },
                    providerNIT: asObject.NIT[i],
                });
            }
        }

        if (
            !payload.file.type ||
            payload.file.type ==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            Object.defineProperty(payload.file, 'contentType', {
                value:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
        }

        return {
            ...payload,
            invoices,
            customAttributes: customAttributes.map(({ id, value, type }) => {
                const newValue = (type == 'DATE'
                    ? (value as Moment).toISOString()
                    : value) as string | number;
                return {
                    id,
                    value: newValue,
                };
            }),
        };
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

    shouldDisableSelectOption(option: BulkInvoiceField) {
        return this.hasMappedField(option);
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

    get customAttributeFormArray(): FormArray {
        return this.form.get('customAttributes') as FormArray;
    }

    get hasMappedAlternativeInvoiceId(): boolean {
        return this.hasMappedField('ALTERNATIVE_INVOICE_ID');
    }

    get hasMappedAmount(): boolean {
        return this.hasMappedField('AMOUNT');
    }

    get hasMappedCreditNotesValue(): boolean {
        return this.hasMappedField('CREDIT_NOTES_VALUE');
    }

    get hasMappedEmissionDate(): boolean {
        return this.hasMappedField('EMISSION_DATE');
    }

    get hasMappedExpirationDate(): boolean {
        return this.hasMappedField('EXPIRATION_DATE');
    }

    get hasMappedInvoiceNumber(): boolean {
        return this.hasMappedField('INVOICE_NUMBER');
    }

    get hasMappedNIT(): boolean {
        return this.hasMappedField('NIT');
    }

    get hasMappedPaymentAdvance(): boolean {
        return this.hasMappedField('PAYMENT_ADVANCE');
    }

    get hasMappedRetentions(): boolean {
        return this.hasMappedField('RETENTIONS');
    }
    get hasMappedVAT(): boolean {
        return this.hasMappedField('VAT');
    }

    private hasMappedField(field: BulkInvoiceField): boolean {
        const columns: FormArray = this.form.get('columns') as FormArray;
        const values: BulkInvoiceFormColumn[] = columns.value;

        return values.some(value => value && value.field === field);
    }

    private isDate(column: any) {
        return column instanceof Date;
    }
}

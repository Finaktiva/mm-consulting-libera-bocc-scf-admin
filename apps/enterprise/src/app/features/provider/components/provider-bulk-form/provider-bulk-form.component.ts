import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
    EnterpriseProviderBulkCreatePayload,
    EnterpriseProviderPayload,
} from '@libera/models/enterprise';
import { fromFile, zip } from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { NgEzValidators } from '@ngez/core';
import { Observable, of, Subscription } from 'rxjs';
import {
    filter,
    map,
    shareReplay,
    switchMap,
    withLatestFrom,
} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {
    ProviderBulkCreateField,
    ProviderBulkFormColumn,
    PROVIDER_BULK_CREATE_FIELD,
} from '../../models';
import { columnsValidator } from './columns.validator';

@Component({
    selector: 'provider-bulk-form',
    templateUrl: './provider-bulk-form.component.html',
    styleUrls: ['./provider-bulk-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderBulkFormComponent extends FormBase
    implements OnInit, OnDestroy {
    sheetAsColumns$: Observable<string[][]>;

    sheetNames$: Observable<string[]>;

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

    PROVIDER_BULK_CREATE_FIELD = PROVIDER_BULK_CREATE_FIELD;

    private subscription = new Subscription();

    constructor(
        private formBuilder: FormBuilder,
        private mediaObserver: MediaObserver
    ) {
        super();

        this.form = formBuilder.group({
            file: [
                null,
                [Validators.required, NgEzValidators.fileType('.xlsx, .csv')],
            ],
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
            switchMap(file => (file ? fromFile(file) : of<string>(null))),
            map(result => {
                if (!result) return null;

                return XLSX.read(result, { type: 'buffer' });
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

    shouldDisableSelectOption(option: ProviderBulkCreateField) {
        return this.hasMappedField(option);
    }

    getFormValue(): EnterpriseProviderBulkCreatePayload {
        const { columns, file } = this.form.value as {
            sheetName: string;
            file: File;
            columns: ProviderBulkFormColumn[];
        };

        const selectedColumns = columns.filter(column => column);
        const { [0]: first, ...rest } = selectedColumns;

        const asObject: {
            [field in ProviderBulkCreateField]: string[]
        } = selectedColumns.reduce(
            (asObject, column) => {
                asObject[column.field] = column.cells;
                return asObject;
            },
            {} as { [field in ProviderBulkCreateField]: string[] }
        );

        const requests = [];

        for (let i = 0; i < asObject.NAME.length; i++)
            requests.push({
                enterpriseName: asObject.ENTERPRISE_NAME[i],
                nit: asObject.NIT[i],
                owner: {
                    name: asObject.NAME[i],
                    firstSurname: asObject.FIRST_SURNAME[i],
                    secondSurname: asObject.SECOND_SURNAME[i],
                    email: asObject.EMAIL[i],
                },
                phone: {
                    number: asObject.PHONE_NUMBER[i],
                },
            });

        return {
            file,
            requests,
        };
    }

    get hasMappedEnterpriseName(): boolean {
        return this.hasMappedField('ENTERPRISE_NAME');
    }

    get hasMappedEmail(): boolean {
        return this.hasMappedField('EMAIL');
    }

    get hasMappedFirstSurname(): boolean {
        return this.hasMappedField('FIRST_SURNAME');
    }

    get hasMappedSecondSurname(): boolean {
        return this.hasMappedField('SECOND_SURNAME');
    }

    get hasMappedName(): boolean {
        return this.hasMappedField('NAME');
    }

    get hasMappedNIT(): boolean {
        return this.hasMappedField('NIT');
    }

    get hasMappedPhoneNumber(): boolean {
        return this.hasMappedField('PHONE_NUMBER');
    }

    private hasMappedField(field: ProviderBulkCreateField): boolean {
        const columns: FormArray = this.form.get('columns') as FormArray;
        const values: ProviderBulkFormColumn[] = columns.value;

        return values.some(value => value && value.field === field);
    }

    parseCell(cell: any) {
        if (!cell) return '';

        const value = `${cell}`;

        if (value.length > 20) {
            return value.slice(0, 20);
        }

        return value;
    }
}

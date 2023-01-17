import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { INVOICE_STATUS, InvoiceStatus } from '@libera/models/shared';
import { BehaviorSubject } from 'rxjs';

import { SELECTABLE_STATUSES } from '../../constants';
import { PayerInvoiceWithUI } from '../../state/payer-invoice.query';

@Component({
    selector: 'invoice-table',
    templateUrl: './invoice-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTableComponent {
    @Input() entities: PayerInvoiceWithUI[];

    @Input() hasSelection: boolean;

    @Input() allSelected: boolean;

    @Input() set showCheckbox(show: boolean) {
        if (show) {
            this.displayedColumns.unshift('selection');
        } else if (this.displayedColumns.includes('selection')) {
            this.displayedColumns.shift();
        }
        this.displayedColumns$.next(this.displayedColumns);
    }

    @Output() delete = new EventEmitter<number>();

    @Output() select = new EventEmitter<number>();

    @Output() selectAll = new EventEmitter<boolean>();

    @ViewChild('mainCheckbox', { static: false }) mainCheckbox: MatCheckbox;

    private displayedColumns: string[] = [
        'invoiceNumber',
        'provider',
        'creationDate',
        'expirationDate',
        'paymentDate',
        'paymentAmount',
        'status',
        'negotiationDiscount',
        'negotiationDiscountDays',
        'paymentDue',
        'menu',
    ];

    displayedColumns$: BehaviorSubject<string[]> = new BehaviorSubject(
        this.displayedColumns
    );

    INVOICE_STATUS = INVOICE_STATUS;

    onDelete(id: number) {
        this.delete.emit(id);
    }

    onSelect(id: number) {
        this.select.emit(id);
    }

    onSelectAll() {
        if (this.hasSelection) this.mainCheckbox.checked = false;
        this.selectAll.emit(!this.hasSelection);
    }

    shouldRenderCheckbox(status: InvoiceStatus) {
        return SELECTABLE_STATUSES.includes(status);
    }
}

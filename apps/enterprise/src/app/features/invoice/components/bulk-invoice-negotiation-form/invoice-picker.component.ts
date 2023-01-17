import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PayerInvoice } from '@libera/models/payer';

@Component({
    selector: 'invoice-picker',
    templateUrl: './invoice-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InvoicePickerComponent),
            multi: true,
        },
    ],
})
export class InvoicePickerComponent implements ControlValueAccessor {
    @Input() total: number;

    @Input() invoices: PayerInvoice[];

    value: PayerInvoice[] = [];

    selection: SelectionModel<PayerInvoice> = new SelectionModel(true, []);

    onChange: (value: PayerInvoice[]) => void;

    onTouch: () => void;

    displayedColumns: string[] = [
        'select',
        'invoiceNumber',
        'provider',
        'nit',
        'expirationDate',
        'amount',
    ];

    shouldRenderMasterCheckbox() {
        const total = this.total;
        const invoicesLength = this.invoices.length;
        return total == invoicesLength;
    }

    isMasterCheckboxChecked() {
        const hasSelected = this.hasSelected();
        const areAllSelected = this.areAllSelected();
        return hasSelected && areAllSelected;
    }

    isMasterCheckboxIndeterminate() {
        const hasSelected = this.hasSelected();
        const areAllSelected = this.areAllSelected();
        return hasSelected && !areAllSelected;
    }

    onBlur() {
        this.onTouch();
    }

    onClickRow(value: PayerInvoice) {
        this.onBlur();
        this.toggle(value);
    }

    isSelected(invoice: PayerInvoice) {
        // return this.value.some(
        //     selectedValue =>
        //         selectedValue == invoice || selectedValue.id == invoice.id
        // );
        return this.selection.isSelected(invoice);
    }

    hasSelected() {
        // const selectedLength = this.value.length;
        // return selectedLength > 0;
        const selectedLength = this.selection.selected.length;
        return selectedLength > 0;
    }

    areAllSelected() {
        // const selectedLength = this.value.length;
        // const invoicesLength = this.invoices.length;
        // return selectedLength == invoicesLength;
        const selectedLength = this.selection.selected.length;
        const total = this.total;
        return selectedLength == total;
    }

    masterToggle() {
        // const value = this.areAllSelected() ? [] : [...this.invoices];
        // this.value = value;
        // this.onChange(value);
        this.areAllSelected()
            ? this.selection.clear()
            : this.invoices.forEach(invoice => this.selection.select(invoice));
        this.onChange(this.selection.selected);
    }

    toggle(invoice: PayerInvoice) {
        // const isSelected: boolean = this.isSelected(invoice);

        // const value: PayerInvoice[] = isSelected
        //     ? this.value.filter(
        //           value => value != invoice && value.id != invoice.id
        //       )
        //     : [...this.value, invoice];

        // this.value = value;
        // this.onChange(value);
        this.selection.toggle(invoice);
        this.onChange(this.selection.selected);
    }

    writeValue(value: PayerInvoice[]) {
        // this.value = value;
        this.selection.clear();
        value.forEach(value => this.selection.select(value));
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    trackBy(index: number, item: PayerInvoice) {
        return item ? item.id : undefined;
    }
}

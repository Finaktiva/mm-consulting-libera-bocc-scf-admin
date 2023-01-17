import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { LENDER_CUSTOM_ATTRIBUTE_TYPES } from '@libera/models/lender';
import { PayerCustomAttribute } from '@libera/models/payer';
import { FormBase } from '@mediomelon/ng-core';
import produce from 'immer';

@Component({
    selector: 'payer-custom-attributes-form',
    templateUrl: './payer-custom-attributes-form.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerCustomAttributesFormComponent
    extends FormBase<PayerCustomAttribute[]>
    implements OnInit {
    @Input() entities: any[];

    TYPES = LENDER_CUSTOM_ATTRIBUTE_TYPES;

    constructor(private formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            attributes: formBuilder.array([]),
        });
    }

    ngOnInit(): void {
        this.entities.forEach(() =>
            this.attributes.push(this.formBuilder.control(null))
        );

        this.attributes.patchValue(this.entities);
    }

    getFormValue(): PayerCustomAttribute[] {
        const attributes: PayerCustomAttribute[] = this.attributes.value;
        return attributes.filter(({ value, type }) => {
            return (
                value != null || type == LENDER_CUSTOM_ATTRIBUTE_TYPES.CHECKBOX
            );
        });
    }

    onChecked(index: number, id: number) {
        const control = this.attributes.at(index);
        control.patchValue(
            produce(control.value, draft => {
                const { options } = draft;
                const index = options.findIndex(x => x.id == id);
                options[index].isChecked = !options[index].isChecked;
            })
        );
    }

    onSelected(index: number, event: MatSelectChange) {
        const control = this.attributes.at(index);
        control.patchValue(
            produce(control.value, draft => {
                draft.value = event.value;
            })
        );
    }

    onWrite(index: number, value: any) {
        const control = this.attributes.at(index);
        control.patchValue(
            produce(control.value, draft => {
                draft.value = value;
            })
        );
    }

    onDateChange(index: number, event: MatDatepickerInputEvent<Date>) {
        const control = this.attributes.at(index);
        control.patchValue(
            produce(control.value, draft => {
                draft.value = new Date(event.value).toISOString();
            })
        );
    }

    get attributes(): FormArray {
        return <FormArray>this.form.get('attributes');
    }
}

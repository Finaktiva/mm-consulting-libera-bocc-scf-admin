import { Component, forwardRef, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormArray,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { LENDER_CUSTOM_ATTRIBUTE_TYPES } from '@libera/models/lender';
import { PayerCustomAttribute } from '@libera/models/payer';
import { isOneOf, mapToControl, pushOn } from '../../utils';

@Component({
    selector: 'custom-attribute-input',
    templateUrl: './custom-attribute-input.component.html',
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomAttributeInputComponent),
            multi: true,
        },
    ],
})
export class CustomAttributeInputComponent
    implements OnInit, ControlValueAccessor {
    form: FormGroup;

    onChange: Function;

    onTouched: Function;

    LENDER_CUSTOM_ATTRIBUTE_TYPES = LENDER_CUSTOM_ATTRIBUTE_TYPES;

    NUMERIC_CONTROLS = [
        LENDER_CUSTOM_ATTRIBUTE_TYPES.CURRENCY,
        LENDER_CUSTOM_ATTRIBUTE_TYPES.DECIMAL,
        LENDER_CUSTOM_ATTRIBUTE_TYPES.INTEGER,
    ];

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            id: null,
            name: null,
            value: null,
            type: null,
        });
    }

    ngOnInit() {}

    writeValue(obj: PayerCustomAttribute): void {
        if (!!obj) {
            if (isOneOf(this.NUMERIC_CONTROLS)(obj.type)) {
                this.form.patchValue({
                    ...obj,
                    value: obj.value,
                });
            } else {
                this.form.patchValue(obj);
            }
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    get type() {
        return this.form.get('type').value;
    }

    get name() {
        return this.form.get('name').value;
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE } from '@libera/models/enterprise';
import { whitespaceValidator } from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'custom-attribute-form',
    templateUrl: './custom-attribute-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeFormComponent extends FormBase {
    @Output() cancel = new EventEmitter();

    ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE = ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE;

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            name: ['', [Validators.required, whitespaceValidator]],
            type: [null, Validators.required],
        });
    }

    onCancel() {
        this.cancel.emit();
    }
}

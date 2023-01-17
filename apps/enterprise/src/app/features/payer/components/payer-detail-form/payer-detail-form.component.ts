import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { LenderCustomAttribute } from '@libera/models/lender';
import { PayerCustomAttribute } from '@libera/models/payer';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'payer-detail-form',
    templateUrl: './payer-detail-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayerDetailFormComponent extends FormBase implements OnInit {
    @Input() entities: LenderCustomAttribute[];

    @Input() attributes: PayerCustomAttribute[];

    @Output() cancel = new EventEmitter();

    constructor(private formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            values: formBuilder.array([]),
        });
    }
    ngOnInit() {
        const values = <FormArray>this.form.get('values');
        if (this.attributes.length < 0) {
            this.attributes.forEach(a => {
                const control = this.createControl(a);
                values.push(control);
            });
        } else {
            this.entities.forEach(a => {
                const control = this.createControl(a);
                values.push(control);
            });
        }
    }
    get controls() {
        const values = <FormArray>this.form.get('values');
        return values.controls;
    }

    private createControl(value: any) {
        return this.formBuilder.control(value);
    }
}

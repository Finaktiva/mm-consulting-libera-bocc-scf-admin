import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
    LenderCustomAttribute,
    LENDER_CUSTOM_ATTRIBUTE_TYPES,
} from '@libera/models/lender';
import { whitespaceValidator } from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'custom-attributes-form',
    templateUrl: './custom-attributes-form.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributesFormComponent
    extends FormBase<LenderCustomAttribute>
    implements OnInit, OnDestroy {
    @Output() cancel = new EventEmitter();

    LENDER_CUSTOM_ATTRIBUTE_TYPE = LENDER_CUSTOM_ATTRIBUTE_TYPES;

    shouldRenderOptionsInput$: Observable<boolean>;

    private subscriptions: Subscription;

    constructor(private formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            name: [null, [Validators.required, whitespaceValidator]],
            type: [null, Validators.required],
            options: formBuilder.array([]),
        });
    }

    ngOnInit() {
        const options = <FormArray>this.form.get('options');
        const typeControlValue$ = this.form.get('type').valueChanges;
        this.subscriptions = typeControlValue$.subscribe(type => {
            if (this.isSelectionType(type)) {
                options.clear();
                options.clearValidators();
                options.setValidators(Validators.required);
                options.push(this.createControl());
            } else {
                options.clear();
                options.clearValidators();
            }
        });
        this.shouldRenderOptionsInput$ = typeControlValue$.pipe(
            map(type => this.isSelectionType(type))
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    getFormValue(): any {
        const value = super.getFormValue();
        return {
            ...value,
            options: value.options.map(value => ({ value })),
        };
    }

    onAddOption() {
        const options = <FormArray>this.form.get('options');
        options.push(this.createControl());
    }

    createControl() {
        return this.formBuilder.control('', [
            Validators.required,
            whitespaceValidator,
        ]);
    }

    get optionsControls() {
        const options: FormArray = <FormArray>this.form.get('options');
        return options.controls;
    }

    isSelectionType(type: string) {
        return (
            type == this.LENDER_CUSTOM_ATTRIBUTE_TYPE.CHECKBOX ||
            type == this.LENDER_CUSTOM_ATTRIBUTE_TYPE.RADIO
        );
    }

    onRemoveOption(index: number) {
        const options = <FormArray>this.form.get('options');
        options.removeAt(index);
    }
}

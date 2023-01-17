import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { colorValidator } from '@libera/validators';
import { FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'theme-form',
    templateUrl: './theme-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeFormComponent extends FormBase implements OnInit {
    @Input() theme;

    constructor(formBuilder: FormBuilder) {
        super();

        this.form = formBuilder.group({
            primaryColor: ['#000000', [Validators.required, colorValidator]],
            accentColor: ['#000000', [Validators.required]],
        });
    }

    ngOnInit() {
        if (this.theme) this.form.patchValue(this.theme);
    }

    reset() {
        super.reset({
            primaryColor: '#000000',
            accentColor: '#000000',
        });
    }
}

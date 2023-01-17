import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EnterpriseModule, EnterpriseUser } from '@libera/models/enterprise';
import { FormBase, alphaWithSpaceValidator } from '@mediomelon/ng-core';
import { EMAIL_REGEX, NAME_REGEX } from '@libera/constants';
import { whitespaceValidator } from '@libera/shared';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent extends FormBase implements OnInit {
    @Input() user: EnterpriseUser;

    @Input() enterpriseModules: EnterpriseModule[];

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    alphaWithSpaceValidator,
                    whitespaceValidator,
                ],
            ],
            firstSurname: [
                '',
                [
                    Validators.required,
                    alphaWithSpaceValidator,
                    whitespaceValidator,
                ],
            ],
            secondSurname: [
                null,
                [alphaWithSpaceValidator, whitespaceValidator],
            ],
            email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            modules: [[], Validators.required],
        });
    }

    ngOnInit() {
        if (this.user) this.form.patchValue(this.user);
        const email = this.form.get('email');
        if (email.valid) email.disable({ emitEvent: false });
    }
}

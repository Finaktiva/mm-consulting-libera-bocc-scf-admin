import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '@libera/models/profile';
import { alphaWithSpaceValidator, FormBase } from '@mediomelon/ng-core';
import { whitespaceValidator } from '../../validators';

@Component({
    selector: 'profile-form',
    templateUrl: './profile-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent extends FormBase implements OnInit {
    @Input() profile: Profile;

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            email: [{ value: '', disabled: true }],
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
        });
    }

    ngOnInit() {
        if (this.profile) this.form.patchValue(this.profile);
    }
}

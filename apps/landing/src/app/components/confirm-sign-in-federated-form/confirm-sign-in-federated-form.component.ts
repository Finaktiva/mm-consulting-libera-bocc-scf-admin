import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { alphaWithSpaceValidator, FormBase } from '@mediomelon/ng-core';

@Component({
    selector: 'confirm-sign-in-federated-form',
    templateUrl: './confirm-sign-in-federated-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmSignInFederatedFormComponent extends FormBase {
    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    alphaWithSpaceValidator,
                ],
            ],
            firstSurname: [
                '',
                [
                    Validators.required,
                    alphaWithSpaceValidator,
                ],
            ],
            secondSurname: [
                null,
                [alphaWithSpaceValidator],
            ],
        });
    }

    ngOnInit() {}
}

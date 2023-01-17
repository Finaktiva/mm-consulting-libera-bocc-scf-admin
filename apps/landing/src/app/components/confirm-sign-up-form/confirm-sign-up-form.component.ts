import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CODE_LENGTH } from '@libera/constants';
import { ConfirmSignUpPayload } from '@libera/models/authentication';
import { FormBase } from '@mediomelon/ng-core';

import { ContactInfoDialog } from '../../dialogs/contact-info/contact-info.dialog';

@Component({
    selector: 'confirm-sign-up-form',
    templateUrl: './confirm-sign-up-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmSignUpFormComponent extends FormBase<ConfirmSignUpPayload>
    implements OnInit {
    @Input() email: string;

    @Input() isSendingConfirmationCode: boolean;

    @Output() send = new EventEmitter<string>();

    codeLength = CODE_LENGTH;

    constructor(formBuilder: FormBuilder, private dialogService: MatDialog) {
        super();
        this.form = formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            code: [
                '',
                [
                    Validators.required,
                    Validators.minLength(CODE_LENGTH),
                    Validators.maxLength(CODE_LENGTH),
                ],
            ],
        });
    }

    ngOnInit() {
        if (this.email) {
            const control = this.form.get('email');
            control.setValue(this.email);
            control.markAsTouched();
            if (control.valid) control.disable();
        }
    }

    onSendConfirmationCode() {
        const control = this.form.get('email');

        if (control.invalid) {
            control.markAsTouched();
            return;
        }

        this.send.emit(control.value);
    }

    getFormValue() {
        return this.form.getRawValue();
    }

    onOpenContactInfo() {
        this.dialogService.open(ContactInfoDialog);
    }
}

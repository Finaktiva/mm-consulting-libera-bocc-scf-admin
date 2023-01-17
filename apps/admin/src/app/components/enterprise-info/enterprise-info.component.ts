import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Enterprise } from '@libera/models/enterprise';

@Component({
    selector: 'enterprise-info',
    templateUrl: './enterprise-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseInfoComponent implements OnInit {
    @Input() info: Enterprise;

    form: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            enterpriseName: '',
            nit: '',
            owner: formBuilder.group({
                email: '',
                name: '',
            }),
            vinculationDate: '',
            modules: [[]],
        });
    }

    ngOnInit() {
        if (this.info) this.form.patchValue(this.info);
    }
}

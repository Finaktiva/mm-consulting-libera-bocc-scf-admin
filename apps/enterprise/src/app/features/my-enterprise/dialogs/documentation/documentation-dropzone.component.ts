import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { NgEzFileDropzoneDirective, NgEzValidators } from '@ngez/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'documentation-dropzone',
    templateUrl: './documentation-dropzone.component.html',
    styleUrls: ['./documentation-dropzone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationDropzoneComponent extends FormBase
    implements OnInit, OnDestroy {
    @Input() error: any;

    @ViewChild(NgEzFileDropzoneDirective, { static: true }) dropzone: NgEzFileDropzoneDirective;

    private subscription = new Subscription();

    constructor(formBuilder: FormBuilder) {
        super();
        this.form = formBuilder.group({
            file: [
                null,
                [Validators.required, NgEzValidators.fileType('.pdf')],
            ],
        });
    }

    ngOnInit() {
        this.subscription.add(
            this.form.valueChanges.subscribe(() => this.submit())
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onBrowse() {
        this.dropzone.browse();
    }

    getFormValue() {
        return this.form.value.file;
    }
}

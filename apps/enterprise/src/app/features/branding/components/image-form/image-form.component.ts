import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBase } from '@mediomelon/ng-core';
import { NgEzFileDropzoneDirective, NgEzValidators } from '@ngez/core';

@Component({
    selector: 'image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFormComponent extends FormBase implements OnInit {
    @Input() accept: string;

    @ViewChild(NgEzFileDropzoneDirective, { static: true }) dropzone: NgEzFileDropzoneDirective;

    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            file: [
                null,
                [Validators.required, NgEzValidators.fileType(this.accept)],
            ],
        });

        this.form.valueChanges.subscribe(() => this.cdr.markForCheck());
    }

    reset() {
        super.reset();
    }

    onBrowse() {
        this.dropzone.browse();
    }

    getFormValue() {
        return this.form.value.file;
    }
}

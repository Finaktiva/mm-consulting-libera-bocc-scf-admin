import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseModuleName } from '@libera/models/enterprise';
import { EnterpriseModuleQuery } from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.query';
import {
    EnterpriseModuleStoreService,
} from 'apps/enterprise/src/app/state/enterprise-modules/enterprise-module.store.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'documentation-dialog',
    templateUrl: './documentation.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationDialog {
    isSubmitting$: Observable<
        boolean
    > = this.query.selectUIEntityRequestingModuleActivation(this.data.module);

    file$: Observable<{
        id: number;
        name: string;
        url: string;
    }> = this.query.selectUIEntityFile(this.data.module);

    isUploading$: Observable<boolean> = this.query.selectUIEntityUploadingFile(
        this.data.module
    );

    isDeleting$: Observable<boolean> = this.query.selectUIEntityDeletingFile(
        this.data.module
    );

    error$ = this.query.selectUIEntityUploadFileError(this.data.module);

    shouldRenderProgressBar$: Observable<boolean> = combineLatest(
        this.isSubmitting$,
        this.isUploading$,
        this.isDeleting$
    ).pipe(map(values => values.includes(true)));

    shouldDisableSubmitButton$: Observable<boolean> = combineLatest(
        this.isSubmitting$,
        this.file$
    ).pipe(map(([isSubmitting, file]) => isSubmitting || !file));

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: { module: EnterpriseModuleName; documentationId: number },
        private dialogRef: MatDialogRef<DocumentationDialog>,
        private storeService: EnterpriseModuleStoreService,
        private query: EnterpriseModuleQuery
    ) {}

    onSubmit() {
        this.storeService
            .requestModuleActivation({
                documentationId: this.data.documentationId,
                module: this.data.module,
            })
            .subscribe(() => this.dialogRef.close());
    }

    onUploadFile(file: File) {
        this.storeService
            .uploadFile(this.data.module, this.data.documentationId, file, '', '')
            .subscribe();
    }

    onDeleteFile() {
        this.storeService
            .deleteFile(this.data.module, this.data.documentationId)
            .subscribe();
    }
}

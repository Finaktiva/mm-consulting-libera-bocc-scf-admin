import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DocumentationFilePayload } from '@libera/models/enterprise';
import { DocumentTypeQuery, DocumentTypeStoreService } from '@libera/state';
import {
    EnterpriseDocumentationQuery,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.query';
import {
    EnterpriseDocumentationStoreService,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.store.service';
import { AddDocumentDialog } from '../../../my-enterprise/dialogs/add-document/add-document-dialog'; 
import { DocumentType } from '@libera/models/catalog';

@Component({
    selector: 'documentation-table',
    templateUrl: './documentation-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationTableComponent {
    isLoading$ = this.query.selectEntityLoading();

    error$ = this.query.selectEntityError();

    entities$ = this.query.selectEntitiesWithUI();

    documentTypes$ = this.documentTypeQuery.selectEntities()
    
    documentTypes: DocumentType[];

    constructor(
        private query: EnterpriseDocumentationQuery,
        private storeService: EnterpriseDocumentationStoreService,
        private dialog: MatDialog,
        private documentTypeQuery: DocumentTypeQuery,
        private documentTypeStoreService: DocumentTypeStoreService,
    ) {}

    ngOnInit() {
        this.fetchDocumentation();
        this.fetchDocumentType();
    }

    fetchDocumentation() {
        this.storeService.fetch().subscribe();
    }

    fetchDocumentType(){
        this.documentTypeStoreService.fetchAll(false).subscribe( data => {
            this.documentTypes = data
        })
    }

    onUpload({ id, file }: DocumentationFilePayload, explanation: string, expeditionDate: string) {
        this.storeService.uploadFile(id, file, explanation, expeditionDate).subscribe();
    }

    onDelete(id: number) {
        this.storeService.deleteFile(id).subscribe();
    }

    loadNewDocument () {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { entities: this.documentTypes }
        const dialogRef = this.dialog.open(AddDocumentDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
          });
    }
}

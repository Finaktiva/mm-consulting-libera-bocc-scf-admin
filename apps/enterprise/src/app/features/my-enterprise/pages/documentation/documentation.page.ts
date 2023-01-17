import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DocumentationFilePayload } from '@libera/models/enterprise';
import { DocumentTypeQuery, DocumentTypeStoreService } from '@libera/state';
import { EnterpriseQuery } from 'apps/enterprise/src/app/state/enterprise/enterprise.query';
import {
    EnterpriseDocumentationQuery,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.query';
import {
    EnterpriseDocumentationStoreService,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.store.service';
import { AddDocumentDialog } from '../../dialogs/add-document/add-document-dialog';
import { DocumentType } from '@libera/models/catalog';

@Component({
    selector: 'documentation-page',
    templateUrl: './documentation.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationPage {
    isLoading$ = this.query.selectEntityLoading();

    enterpriseStatus$ = this.enterpriseQuery.selectEnterpriseStatus();

    error$ = this.query.selectEntityError();

    entities$ = this.query.selectEntitiesWithUI();

    documentTypes$ = this.documentTypeQuery.selectEntities()
    documentTypes: DocumentType[];

    constructor(
        private query: EnterpriseDocumentationQuery,
        private storeService: EnterpriseDocumentationStoreService,
        private enterpriseQuery: EnterpriseQuery,
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
        dialogRef.afterClosed().subscribe();
    }
}

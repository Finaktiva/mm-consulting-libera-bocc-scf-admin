import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DocumentationFilePayload } from '@libera/models/enterprise';
import { DocumentTypeQuery, DocumentTypeStoreService } from '@libera/state';
import {
    EnterpriseDocumentationQuery,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.query';
import {
    EnterpriseDocumentationStoreService,
} from 'apps/enterprise/src/app/state/enterprise-documentation/enterprise-documentation.store.service';
import { EnterpriseQuery } from 'apps/enterprise/src/app/state/enterprise/enterprise.query';
import { EnterpriseStoreService } from 'apps/enterprise/src/app/state/enterprise/enterprise.store.service';
import { AddDocumentDialog } from '../../../my-enterprise/dialogs/add-document/add-document-dialog'; 
import { DocumentType } from '@libera/models/catalog';
import { SendDocumentationDialog } from '../../dialogs/send-documentation-dialog/send-documentation.dialog';

@Component({
    selector: 'upload-documentation',
    templateUrl: './upload-documentation.page.html',
    styleUrls: ['./upload-documentation.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentationPage implements OnInit {
    isSubmitting$ = this.enterpriseQuery.selectRequesting();

    enterpriseStatus$ = this.enterpriseQuery.selectEnterpriseStatus();

    isLoading$ = this.documentationQuery.selectEntityLoading();

    error$ = this.documentationQuery.selectEntityError();

    entities$ = this.documentationQuery.selectEntitiesWithUI();

    hasInvalidDocumentation$ = this.documentationQuery.selectEnterpriseHasInvalidDocumentation(true);

    hasEmptyDocumentation$ = this.documentationQuery.selectEnterpriseHasEmptyDocumentation();

    hasAccepted = false;

    documentTypes: DocumentType[];
    documentationEmpty = false;
    documentationInvalid = false;

    constructor(
        private documentationQuery: EnterpriseDocumentationQuery,
        private documentationStoreService: EnterpriseDocumentationStoreService,
        private enterpriseQuery: EnterpriseQuery,
        private dialog: MatDialog,
        private enterpriseStoreService: EnterpriseStoreService,
        private documentTypeQuery: DocumentTypeQuery,
        private documentTypeStoreService: DocumentTypeStoreService,
    ) {}

    ngOnInit() {
        this.fetchDocumentation();
        this.fetchDocumentType();
    }

    onRetry() {
        this.fetchDocumentation();
    }

    onUpload({ id, file }: DocumentationFilePayload, explanation: string, expeditionDate: string) {
        this.documentationStoreService.uploadFile(id, file, explanation, expeditionDate).subscribe();
    }

    onDelete(id: number) {
        this.documentationStoreService.deleteFile(id).subscribe();
    }

    onRequest() {
        this.hasInvalidDocumentation$.subscribe(res => this.documentationInvalid = res);
        this.hasEmptyDocumentation$.subscribe(res => this.documentationEmpty = res);
        if (this.documentationInvalid) return;
        if (this.documentationEmpty){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            const dialogRef = this.dialog.open(SendDocumentationDialog, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                if (result)
                    this.enterpriseStoreService.request().subscribe();
            });
        }else 
            this.enterpriseStoreService.request().subscribe();
    }

    private fetchDocumentation() {
        this.documentationStoreService.fetch().subscribe();
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

    fetchDocumentType(){
        this.documentTypeStoreService.fetchAll(false).subscribe( data => {
            this.documentTypes = data
        })
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EnterpriseDocumentationStatus, EnterpriseStatus } from '@libera/models/enterprise';
import { FormBase } from '@mediomelon/ng-core';
import { NgEzValidators } from '@ngez/core';
import { Subscription } from 'rxjs';

import { DeleteDocumentDialog } from '../../dialogs/delete-document/delete-document-dialog';
import { ApproveDocumentDialog } from '../../dialogs/approve-document/approve-document-dialog';
import { UploadFileDialog } from '../../dialogs/upload-file/upload-file-dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationQuery, ProfileRolePermissionsQuery } from '@libera/state';
import { CodePermission } from '@libera/models/user';

@Component({
    selector: 'enterprise-documentation-table-actions',
    templateUrl: './enterprise-documentation-table-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EnterpriseDocumentationTableActionsComponent extends FormBase implements OnInit, OnDestroy {
    
    @Input() file:string;

    @Input() enterpriseStatus: EnterpriseStatus;
    @Input() date: string;

    @Input() canDelete: boolean;

    @Input() canAdmin: boolean;

    @Input() status: EnterpriseDocumentationStatus;

    @Input() isDeleting: boolean;

    @Input() isChangingStatus: boolean;

    @Output() delete = new EventEmitter();

    @Output() reload = new EventEmitter();

    @Output() approve = new EventEmitter();

    @Input() idDoc: number; 

    @Input() description: string;

    @Input() comment: string;

    canUploadDocuments$ = this.profileQuery.hasPermission(CodePermission.UPLOAD_DOCUMENTS);
    canUpdateDocuments$ = this.profileQuery.hasPermission(CodePermission.UPDATE_DOCUMENTS);
    canApproveDocuments$ = this.profileQuery.hasPermission(CodePermission.APPROVE_DOCUMENTS);
    canDeleteDocuments$ = this.profileQuery.hasPermission(CodePermission.DELETE_DOCUMENTS);
    userType$ = this.userQuery.selectUserType()

    private subscription: Subscription;

    constructor(
        formBuilder: FormBuilder,
        private dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private profileQuery: ProfileRolePermissionsQuery,
        private userQuery: AuthenticationQuery
    ) {
        super();
        this.form = formBuilder.group({
            file: [null,[Validators.required, NgEzValidators.fileType('.pdf')]],
            currentAction: [null],
            option: [null]
        });
    }

    ngOnInit() {
        this.subscription = this.form.valueChanges.subscribe(() =>
            this.submit()
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getFormValue() {
        return this.form.value.file;
    }

    onDelete() {
        this.delete.emit();
    }

    changeAction ({ value }) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        switch (value) {
            case 1: 
                dialogConfig.data = {
                    idFile: this.idDoc,
                    enterpriseId: this.getParamId(),
                    description: this.description,
                    admin: this.canAdmin,
                    enterpriseStatus: this.enterpriseStatus,
                    isUpdate: false,
                    comment: this.comment
                }
                this.dialog.open(UploadFileDialog,dialogConfig)
                break;
            case 2: 
                dialogConfig.data = {
                    idFile: this.idDoc,
                    enterpriseId: this.getParamId(),
                    description: this.description
                }
                this.dialog.open(DeleteDocumentDialog, dialogConfig);
                break;
            case 3: 
                dialogConfig.data = {
                    idFile: this.idDoc,
                    action: 'accept',
                    file: this.file,
                    enterpriseId: this.getParamId(),
                    description: this.description,
                    date: new Date(this.date),
                    comment: this.comment
                }
                this.dialog.open(ApproveDocumentDialog, dialogConfig)
                break;
            case 4: 
                dialogConfig.data = {
                    idFile: this.idDoc,
                    action: 'decline',
                    file: this.file,
                    enterpriseId: this.getParamId(),
                    description: this.description,
                    date: new Date(this.date),
                    comment: this.comment
                }
                this.dialog.open(ApproveDocumentDialog, dialogConfig)
                break;
            case 5: 
                dialogConfig.data = {
                    idFile: this.idDoc,
                    enterpriseId: this.getParamId(),
                    description: this.description,
                    admin: this.canAdmin,
                    enterpriseStatus: this.enterpriseStatus,
                    isUpdate: true,
                    comment: this.comment
                }
                this.dialog.open(UploadFileDialog, dialogConfig)
                break;
        }
        this.form.get('option').patchValue("");
    }

    getParamId(): number {
        return parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    }

    get shouldRenderDeleteButton() {
        return (
            this.canDelete &&
            ((!this.canAdmin && (this.status == 'LOADED' || this.status == 'REJECTED'))
                || (this.canAdmin && this.status == 'CURRENT'))
        );
    }

    get shouldRenderUploadButton() {
        return this.status == 'PENDING';
    }

    get shouldRenderAdminButtons() {
        return (
            this.canAdmin &&
            (this.status == 'EVALUATION_PENDING')
        );
    }

    get shouldRenderRejectButton() {
        return (
            this.canAdmin && 
            (this.status == 'CURRENT' || this.status == 'EVALUATION_PENDING')
        );
    }

    get shouldRenderUpdateButton() {
       return this.status == 'ABOUT_TO_EXPIRE' || 'EXPIRED'
    }
    
}

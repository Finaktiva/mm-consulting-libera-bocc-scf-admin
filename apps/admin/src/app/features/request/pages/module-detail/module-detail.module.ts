import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import {
    AlertModule,
    EnterpriseDocumentationTableModule,
} from '@libera/shared';
import { EnterpriseInfoModule } from 'apps/admin/src/app/components/enterprise-info/enterprise-info.module';
import { ReuploadFileDialogModule } from 'apps/admin/src/app/dialogs/reupload-file/reupload-file.dialog.module';

import { ApproveModuleDialogModule } from '../../dialogs/approve-module/approve-module.dialog.module';
import { RejectRequestDialogModule } from '../../dialogs/reject-request/reject-request.dialog.module';
import { RequestModuleDetailPage } from './module-detail.page';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    EnterpriseInfoModule,
    EnterpriseDocumentationTableModule,
    MatDialogModule,
    ReuploadFileDialogModule,
    ApproveModuleDialogModule,
    RejectRequestDialogModule,
    AlertModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [RequestModuleDetailPage];

@NgModule({
    imports: [COMMON_IMPORTS, RouterModule],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class RequestModuleDetailModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { FilterFormModule } from '../../components/filter-form/filter-form.module';
import { ProgramTableModule } from '../../components/program-table/program-table.module';
import { CreateProgramDialogModule } from '../../dialogs/create-program-dialog/create-program.dialog.module';
import { ResendInvitationDialogModule } from '../../dialogs/resend-invitation-dialog/resend-invitation.dialog.module';
import { ListPage } from './list.page';
import { TranslateModule } from '@ngx-translate/core';
import { AlertModule } from '@libera/shared';

export const COMMON_IMPORTS = [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    FilterFormModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatDialogModule,

    MatProgressBarModule,
    ProgramTableModule,
    CreateProgramDialogModule,
    ResendInvitationDialogModule,
    TranslateModule.forChild(),
    AlertModule,
];

export const COMMON_DECLARATIONS = [ListPage];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS, RouterModule],
    exports: COMMON_DECLARATIONS,
})
export class ListPageModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };

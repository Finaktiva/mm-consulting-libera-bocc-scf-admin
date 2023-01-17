import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ResendInvitationDialog } from './resend-invitation.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [ResendInvitationDialog];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    entryComponents: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ResendInvitationDialogModule {}

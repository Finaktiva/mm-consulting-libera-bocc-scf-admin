import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResendInvitationDialogModule } from './dialogs/resend-invitation-dialog/resend-invitation.dialog.module';
import { ProgramsRoutingModule } from './programs.routing';

@NgModule({
    imports: [
        CommonModule,
        ResendInvitationDialogModule,
        ProgramsRoutingModule,
    ],
})
export class ProgramsModule {}

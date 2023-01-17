import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { AssignQuotaRequestDialog } from './assign-quota-request.dialog';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        TranslateModule,
    ],
    declarations: [AssignQuotaRequestDialog],
    entryComponents: [AssignQuotaRequestDialog],
    exports: [AssignQuotaRequestDialog],
})
export class AssignQuotaRequestDialogModule {}

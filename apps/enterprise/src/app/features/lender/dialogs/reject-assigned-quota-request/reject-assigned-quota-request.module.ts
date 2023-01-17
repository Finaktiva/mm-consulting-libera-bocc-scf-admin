import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RejectAssignedQuotaRequestComponent } from './reject-assigned-quota-request.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        TranslateModule
    ],
    declarations: [RejectAssignedQuotaRequestComponent],
    entryComponents: [RejectAssignedQuotaRequestComponent],
    exports: [RejectAssignedQuotaRequestComponent],
})
export class RejectAssignedQuotaRequestModule {}

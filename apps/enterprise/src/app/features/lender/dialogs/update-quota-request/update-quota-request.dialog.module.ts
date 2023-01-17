import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { UpdateQuotaRequestDialog } from './update-quota-request.dialog';
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
    declarations: [UpdateQuotaRequestDialog],
    entryComponents: [UpdateQuotaRequestDialog],
    exports: [UpdateQuotaRequestDialog],
})
export class UpdateQuotaRequestDialogModule { }

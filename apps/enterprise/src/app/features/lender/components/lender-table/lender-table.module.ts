import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { LenderTableComponent } from './lender-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { QuotaRequestDialogModule } from '../../dialogs/quota-request/quota-request.module';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        QuotaRequestDialogModule,
        TranslateModule
    ],
    declarations: [LenderTableComponent],
    exports: [LenderTableComponent],
})
export class LenderTableModule { }

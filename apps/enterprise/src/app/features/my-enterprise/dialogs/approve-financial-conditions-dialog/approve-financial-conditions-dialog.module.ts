import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ApproveFinancialDialog } from './approve-financial-conditions-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
    TranslateModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
];

const COMMON_DECLARATIONS = [ApproveFinancialDialog];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    entryComponents: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ApproveFinancialDialogModule {}

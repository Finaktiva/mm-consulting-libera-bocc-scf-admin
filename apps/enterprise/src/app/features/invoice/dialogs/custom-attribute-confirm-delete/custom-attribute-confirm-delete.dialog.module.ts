import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CustomAttributeConfirmDeleteDialog } from './custom-attribute-confirm-delete.dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        MatProgressBarModule,
        MatDialogModule,
        FormsModule,
        MatCheckboxModule,
        MatButtonModule,
        TranslateModule
    ],
    declarations: [CustomAttributeConfirmDeleteDialog],
    entryComponents: [CustomAttributeConfirmDeleteDialog],
    exports: [CustomAttributeConfirmDeleteDialog],
})
export class CustomAttributeConfirmDeleteDialogModule { }

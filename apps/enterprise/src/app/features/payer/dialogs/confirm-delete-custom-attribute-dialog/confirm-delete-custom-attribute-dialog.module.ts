import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteCustomAttributeDialogComponent } from './confirm-delete-custom-attribute-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCheckboxModule,
        FormsModule,
        MatFormFieldModule,
        FlexLayoutModule,
        TranslateModule,
    ],
    declarations: [ConfirmDeleteCustomAttributeDialogComponent],
    entryComponents: [ConfirmDeleteCustomAttributeDialogComponent],
    exports: [ConfirmDeleteCustomAttributeDialogComponent],
})
export class ConfirmDeleteCustomAttributeDialogModule { }

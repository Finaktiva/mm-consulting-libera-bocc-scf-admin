import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { AlertModule } from '@libera/shared';

import { CustomAttributePickerDialog } from './custom-attribute-picker.dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        FormsModule,
        AlertModule,
        TranslateModule
    ],
    declarations: [CustomAttributePickerDialog],
    entryComponents: [CustomAttributePickerDialog],
    exports: [CustomAttributePickerDialog],
})
export class CustomAttributePickerDialogModule { }

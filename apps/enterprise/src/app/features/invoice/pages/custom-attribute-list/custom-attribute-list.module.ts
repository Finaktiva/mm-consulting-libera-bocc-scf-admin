import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@libera/shared';

import { CustomAttributeFormModule } from '../../components/custom-attribute-form/custom-attribute-form.module';
import { CustomAttributeTableModule } from '../../components/custom-attribute-table/custom-attribute-table.module';
import {
    CustomAttributeConfirmDeleteDialogModule,
} from '../../dialogs/custom-attribute-confirm-delete/custom-attribute-confirm-delete.dialog.module';
import { CustomAttributeListPage } from './custom-attribute-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDividerModule,
        AlertModule,
        CustomAttributeTableModule,
        CustomAttributeFormModule,
        CustomAttributeConfirmDeleteDialogModule,
        TranslateModule
    ],
    declarations: [CustomAttributeListPage],
    exports: [CustomAttributeListPage],
})
export class CustomAttributeListPageModule { }

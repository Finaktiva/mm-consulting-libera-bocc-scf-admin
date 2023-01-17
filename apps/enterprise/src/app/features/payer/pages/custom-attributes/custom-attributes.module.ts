import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAttributesPage } from './custom-attributes.page';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CustomAttributesTableModule } from '../../components/custom-attributes-table/custom-attributes-table.module';
import { MatDividerModule } from '@angular/material/divider';
import { CustomAttributesFormModule } from '../../components/custom-attributes-form/custom-attributes-form.module';
import { ConfirmDeleteCustomAttributeDialogModule } from '../../dialogs/confirm-delete-custom-attribute-dialog/confirm-delete-custom-attribute-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    CustomAttributesTableModule,
    MatDividerModule,
    CustomAttributesFormModule,
    ConfirmDeleteCustomAttributeDialogModule,
    MatDialogModule,
    MatProgressBarModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [CustomAttributesPage];

@NgModule({
    imports: COMMON_MODULES,
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class CustomAttributesPageModule { }

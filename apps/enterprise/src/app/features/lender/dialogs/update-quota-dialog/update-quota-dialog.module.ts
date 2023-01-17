import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateQuotaDialogComponent } from './update-quota-dialog.component';
import { UpdateQuotaFormModule } from '../../components/update-quota-form/update-quota-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    UpdateQuotaFormModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    FlexLayoutModule,
    UpdateQuotaFormModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [UpdateQuotaDialogComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class UpdateQuotaDialogModule {}

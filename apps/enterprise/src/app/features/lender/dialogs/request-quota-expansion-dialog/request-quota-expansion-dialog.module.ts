import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RequestQuotaExpansionFormModule } from '../../components/request-quota-expansion-form/request-quota-expansion-form.module';
import { RequestQuotaExpansionDialogComponent } from './request-quota-expansion-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    RequestQuotaExpansionFormModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    FlexLayoutModule,
    RequestQuotaExpansionFormModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [RequestQuotaExpansionDialogComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
})
export class RequestQuotaExpansionDialogModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotaRequestDialog } from './quota-request.dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { QuotaRequestFormModule } from '../../components/quota-request-form/quota-request-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [QuotaRequestDialog],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        QuotaRequestFormModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    entryComponents: [QuotaRequestDialog],
    exports: [QuotaRequestDialog],
})
export class QuotaRequestDialogModule {}

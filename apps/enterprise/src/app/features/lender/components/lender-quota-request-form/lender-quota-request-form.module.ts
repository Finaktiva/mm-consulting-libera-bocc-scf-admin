import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LenderQuotaRequestFormComponent } from './lender-quota-request-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        TranslateModule
    ],
    declarations: [LenderQuotaRequestFormComponent],
    exports: [LenderQuotaRequestFormComponent],
})
export class LenderQuotaRequestFormModule { }

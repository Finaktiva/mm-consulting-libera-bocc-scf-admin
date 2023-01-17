import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
    LenderQuotaRequestListPaginationFilterFormComponent,
} from './lender-quota-request-list-pagination-filter-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule
    ],
    declarations: [LenderQuotaRequestListPaginationFilterFormComponent],
    exports: [LenderQuotaRequestListPaginationFilterFormComponent],
})
export class LenderQuotaRequestListPaginationFilterFormModule { }

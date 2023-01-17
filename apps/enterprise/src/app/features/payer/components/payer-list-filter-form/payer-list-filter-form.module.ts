import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PayerListFilterFormComponent } from './payer-list-filter-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [PayerListFilterFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule,
    ],
    exports: [PayerListFilterFormComponent],
})
export class PayerListFilterFormModule { }

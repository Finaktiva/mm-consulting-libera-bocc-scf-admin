import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PayerDetailFormComponent } from './payer-detail-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { CustomAttributeInputModule } from '@libera/shared';

@NgModule({
    declarations: [PayerDetailFormComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        TranslateModule,
        MatDividerModule,
        CustomAttributeInputModule,
    ],
    exports: [PayerDetailFormComponent],
})
export class PayerDetailFormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { QuotaRequestFormComponent } from './quota-request-form.component';
import { CurrencySymbolPipeModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [QuotaRequestFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        CurrencySymbolPipeModule,
        TranslateModule
    ],
    exports: [QuotaRequestFormComponent],
})
export class QuotaRequestFormModule {}

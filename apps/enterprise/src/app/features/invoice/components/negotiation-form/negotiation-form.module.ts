import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { NegotiationFormComponent } from './negotiation-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSelectModule,
        TranslateModule,
    ],
    declarations: [NegotiationFormComponent],
    exports: [NegotiationFormComponent],
})
export class NegotiationFormModule {}

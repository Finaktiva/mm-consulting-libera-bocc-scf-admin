import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EnterpriseFormComponent } from './enterprise-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
    ],
    declarations: [EnterpriseFormComponent],
    exports: [EnterpriseFormComponent],
})
export class EnterpriseFormModule {}

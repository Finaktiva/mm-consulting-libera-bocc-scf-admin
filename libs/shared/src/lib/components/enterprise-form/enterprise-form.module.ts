import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { EnterpriseFormComponent } from './enterprise-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material';
import { CircleChipModule } from '../circle-chip/circle-chip.module';
import { MatTooltipModule } from '@angular/material/tooltip';


const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule,
    MatAutocompleteModule,
    MatRadioModule,
    CircleChipModule,
    MatTooltipModule
];

const COMMON_DECLARATIONS = [EnterpriseFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class EnterpriseFormModule {}

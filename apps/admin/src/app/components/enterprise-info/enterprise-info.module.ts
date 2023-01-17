import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { EnterpriseInfoComponent } from './enterprise-info.component';
import { CircleChipModule } from '@libera/shared';
import { MatTooltipModule } from '@angular/material/tooltip';


const COMMON_IMPORTS = [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    TranslateModule,
    CircleChipModule,
    MatTooltipModule,
];

const COMMON_DECLARATIONS = [EnterpriseInfoComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
})
export class EnterpriseInfoModule { }

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };

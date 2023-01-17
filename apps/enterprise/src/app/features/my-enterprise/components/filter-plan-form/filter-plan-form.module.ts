import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPlanFormComponent } from './filter-plan-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [FilterPlanFormComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
})
export class FilterPlanFormModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };

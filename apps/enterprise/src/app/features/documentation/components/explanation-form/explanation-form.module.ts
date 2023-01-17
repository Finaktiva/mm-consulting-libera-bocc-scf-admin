import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExplanationFormComponent } from './explanation-form.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_DECLARATIONS = [ExplanationFormComponent];

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    TranslateModule,
];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
})
export class ExplanationFormModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateQuotaFormComponent } from './update-quota-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencySymbolPipeModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    CurrencySymbolPipeModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [UpdateQuotaFormComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
})
export class UpdateQuotaFormModule {}

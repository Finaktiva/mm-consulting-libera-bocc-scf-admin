import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestQuotaExpansionFormComponent } from './request-quota-expansion-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencySymbolPipeModule } from '@libera/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencySymbolPipeModule,
    FlexLayoutModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [RequestQuotaExpansionFormComponent];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_MODULES,
    exports: COMMON_DECLARATIONS,
})
export class RequestQuotaExpansionFormModule {}

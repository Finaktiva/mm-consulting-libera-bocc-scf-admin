import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayerCustomAttributesFormComponent } from './payer-custom-attributes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    CustomAttributeInputModule,
    CurrencySymbolPipeModule,
} from '@libera/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CustomAttributeInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    CurrencySymbolPipeModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [PayerCustomAttributesFormComponent];

@NgModule({
    imports: COMMON_MODULES,
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class PayerCustomAttributesFormModule { }

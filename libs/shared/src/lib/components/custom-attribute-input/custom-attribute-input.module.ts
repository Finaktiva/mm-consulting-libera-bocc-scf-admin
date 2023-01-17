import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAttributeInputComponent } from './custom-attribute-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RadioSelectionComponent } from "./radio-selection.component";

const COMMON_MODULES = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FlexLayoutModule,
];

const COMMON_DECLARATIONS = [CustomAttributeInputComponent, RadioSelectionComponent];

@NgModule({
    imports: COMMON_MODULES,
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class CustomAttributeInputModule {}

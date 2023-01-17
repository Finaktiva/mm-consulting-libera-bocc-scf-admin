import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAttributesFormComponent } from './custom-attributes-form.component';

const COMMON_MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule,
    MatIconModule,
];

const COMMON_DECLARATIONS = [CustomAttributesFormComponent];

@NgModule({
    imports: COMMON_MODULES,
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class CustomAttributesFormModule {}

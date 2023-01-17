import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeFormComponent } from './theme-form.component';

const COMMON_IMPORTS = [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [ThemeFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ThemeFormModule {}

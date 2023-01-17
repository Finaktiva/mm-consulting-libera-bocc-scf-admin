import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProviderListFilterFormComponent } from './provider-list-filter-form.component';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
];

const COMMON_DECLARATIONS = [ProviderListFilterFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ProviderListFilterFormModule { }

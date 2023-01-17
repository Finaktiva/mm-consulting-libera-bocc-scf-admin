import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgEzBytesModule, NgEzFileModule } from '@ngez/core';

import { ImageFormComponent } from './image-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

const COMMON_IMPORTS = [
    CommonModule,
    FlexLayoutModule,
    NgEzFileModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgEzBytesModule,
    MatTooltipModule,
    TranslateModule,
];

const COMMON_DECLARATIONS = [ImageFormComponent];

@NgModule({
    imports: [COMMON_IMPORTS],
    declarations: [COMMON_DECLARATIONS],
    exports: [COMMON_DECLARATIONS],
})
export class ImageFormModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CustomAttributeFormComponent } from './custom-attribute-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        TranslateModule,
    ],
    declarations: [CustomAttributeFormComponent],
    exports: [CustomAttributeFormComponent],
})
export class CustomAttributeFormModule {}

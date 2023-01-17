import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ProfileFormComponent } from './profile-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        TranslateModule,
    ],
    declarations: [ProfileFormComponent],
    exports: [ProfileFormComponent],
})
export class ProfileFormModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ChangePasswordFormComponent } from './change-password-form.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule
    ],
    declarations: [ChangePasswordFormComponent],
    exports: [ChangePasswordFormComponent],
})
export class ChangePasswordFormModule {}

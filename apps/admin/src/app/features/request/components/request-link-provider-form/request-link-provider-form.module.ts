import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { RequestLinkProviderFormComponent } from './request-link-provider-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule
    ],
    declarations: [RequestLinkProviderFormComponent],
    exports: [RequestLinkProviderFormComponent],
})
export class RequestLinkProviderFormModule {}

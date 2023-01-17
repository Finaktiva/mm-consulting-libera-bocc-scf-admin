import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';

import { RequestLinkPetitionerInfoComponent } from './request-link-petitioner-info.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatInputModule, TranslateModule],
    declarations: [RequestLinkPetitionerInfoComponent],
    exports: [RequestLinkPetitionerInfoComponent],
})
export class RequestLinkPetitionerInfoModule {}

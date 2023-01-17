import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AlertModule, StatusChipModule } from '@libera/shared';

import { RequestLinkPetitionerInfoModule } from '../../components/request-link-petitioner-info/request-link-petitioner-info.module';
import { RequestLinkProviderFormModule } from '../../components/request-link-provider-form/request-link-provider-form.module';
import { RejectLinkDialogModule } from '../../dialogs/reject-link/reject-link.dialog.module';
import { RequestLinkDetailPage } from './link-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatDialogModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        AlertModule,
        StatusChipModule,
        RequestLinkPetitionerInfoModule,
        RequestLinkProviderFormModule,
        RejectLinkDialogModule,
        TranslateModule,
        AlertModule,
    ],
    declarations: [RequestLinkDetailPage],
    exports: [RequestLinkDetailPage],
})
export class RequestLinkDetailModule {}

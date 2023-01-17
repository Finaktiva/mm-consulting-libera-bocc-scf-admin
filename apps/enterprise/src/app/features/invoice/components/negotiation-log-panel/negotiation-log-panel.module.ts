import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { AlertModule } from '@libera/shared';

import { NegotiationTimelineModule } from '../negotiation-timeline/negotiation-timeline.module';
import { NegotiationLogPanelComponent } from './negotiation-log-panel.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        AlertModule,
        NegotiationTimelineModule,
        TranslateModule,
    ],
    declarations: [NegotiationLogPanelComponent],
    exports: [NegotiationLogPanelComponent],
})
export class NegotiationLogPanelModule {}

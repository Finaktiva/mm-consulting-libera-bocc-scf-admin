import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingRequestLogPanelComponent } from './funding-request-log-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { AlertModule } from '@libera/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FundingRequestTimelineModule } from '../funding-request-timeline/funding-request-timeline.module';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatButtonModule,
  AlertModule,
  FundingRequestTimelineModule,
  TranslateModule,
];

const COMMON_DECLARATIONS = [FundingRequestLogPanelComponent];

@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS
})
export class FundingRequestLogPanelModule { }

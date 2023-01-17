import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingRequestTimelineComponent } from './funding-request-timeline.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DividePipeModule } from '@libera/shared';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatIconModule,
  MatDividerModule,
  DividePipeModule,
  TranslateModule,
];

const COMMON_DECLARATIONS = [FundingRequestTimelineComponent];

@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS
})
export class FundingRequestTimelineModule { }

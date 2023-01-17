import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FundingRequestPage } from './funding-request.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@libera/shared';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FundingRequestLogPanelModule } from '../../components/funding-request-log-panel/funding-request-log-panel.module';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatProgressSpinnerModule,
  AlertModule,
  MatDividerModule,
  MatExpansionModule,
  MatButtonModule,
  FundingRequestLogPanelModule,
  TranslateModule,
];

const COMMON_DECLARATIONS = [FundingRequestPage]

@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class FundingRequestPageModule { }

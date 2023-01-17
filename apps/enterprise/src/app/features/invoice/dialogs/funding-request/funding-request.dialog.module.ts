import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { FundingRequestFormModule } from '../../components/funding-request-form/funding-request-form.module';
import { FundingRequestDialog } from './funding-request.dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatDialogModule,
  MatProgressBarModule,
  MatButtonModule,
  FundingRequestFormModule,
  RouterModule,
  TranslateModule
];
const COMMON_DECLARATIONS = [FundingRequestDialog]
@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: COMMON_DECLARATIONS,
  entryComponents: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class FundingRequestDialogModule { }

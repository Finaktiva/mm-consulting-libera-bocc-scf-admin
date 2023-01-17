import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivitiesHistoryComponent } from './activities-history.component';
import { StatusLabelColorModule } from "@libera/shared"
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  MatDividerModule,
  MatExpansionModule,
  StatusLabelColorModule,
  TranslateModule,
];

const COMMON_DECLARATIONS = [ActivitiesHistoryComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [COMMON_IMPORTS],
  exports: COMMON_DECLARATIONS
})
export class ActivitiesHistoryModule { }

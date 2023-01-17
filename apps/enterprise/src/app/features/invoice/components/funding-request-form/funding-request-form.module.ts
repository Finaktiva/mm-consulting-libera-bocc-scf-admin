import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgEzFileModule } from '@ngez/core';
import { NgxFileDropzoneModule } from 'ngx-file-dropzone';
import { FundingRequestFormComponent } from './funding-request-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_IMPORTS = [
  CommonModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  NgxFileDropzoneModule,
  NgEzFileModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  TranslateModule,
];

const COMMON_DECLARATIONS = [FundingRequestFormComponent];

@NgModule({
  imports: [COMMON_IMPORTS],
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS
})
export class FundingRequestFormModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DetailFinancialConditionsForm } from './detail-financial-conditions-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule, MatDatepickerModule, MatIconModule, MatProgressBarModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { SalesTableModule } from '../sales-table/sales-table.module';
import { UploadProofPricingDialogModule } from '../../dialogs/upload-proof-pricing/upload-proof-pricing-dialog.module';

const COMMON_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatTooltipModule,
    TranslateModule,
    MatAutocompleteModule,
    FormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    SalesTableModule,
    MatDatepickerModule,
    UploadProofPricingDialogModule,
    MatProgressBarModule,
];

const COMMON_DECLARATIONS = [DetailFinancialConditionsForm];

const COMMON_PROVIDERS = [
    DatePipe
]

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: [COMMON_IMPORTS],
    exports: COMMON_DECLARATIONS,
    entryComponents: COMMON_DECLARATIONS,
    providers: COMMON_PROVIDERS
})
export class DetailFinancialConditionsFormModule {}

export default { COMMON_DECLARATIONS, COMMON_IMPORTS };

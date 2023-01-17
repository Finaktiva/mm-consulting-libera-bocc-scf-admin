import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertModule } from '@libera/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PayerBasicInformationModule } from '../../components/payer-basic-information/payer-basic-information.module';
import { PayerComplementaryInformationModule } from '../../components/payer-complementary-information/payer-complementary-information.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoCustomAttributesDialogModule } from '../../dialogs/no-custom-attributes-dialog/no-custom-attributes-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

const COMMON_DECLARATIONS = [DetailComponent];

const COMMON_MODULES = [
    CommonModule,
    FlexLayoutModule,
    AlertModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    PayerBasicInformationModule,
    PayerComplementaryInformationModule,
    MatProgressBarModule,
    NoCustomAttributesDialogModule,
    MatDialogModule,
    TranslateModule,
];

@NgModule({
    imports: [COMMON_MODULES, RouterModule],
    declarations: COMMON_DECLARATIONS,
    exports: COMMON_DECLARATIONS,
})
export class DetailModule { }

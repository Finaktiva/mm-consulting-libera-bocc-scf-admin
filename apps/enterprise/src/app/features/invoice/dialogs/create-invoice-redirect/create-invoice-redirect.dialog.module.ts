import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { CreateInvoiceRedirectDialog } from './create-invoice-redirect.dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [MatDialogModule, FlexLayoutModule, MatButtonModule, TranslateModule, CommonModule],
    declarations: [CreateInvoiceRedirectDialog],
    entryComponents: [CreateInvoiceRedirectDialog],
    exports: [CreateInvoiceRedirectDialog],
})
export class CreateInvoiceRedirectDialogModule { }

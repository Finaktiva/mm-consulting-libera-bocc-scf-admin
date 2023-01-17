import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NegotiationFormModule } from '../../components/negotiation-form/negotiation-form.module';
import { NegotiationDialog } from './negotiation.dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatProgressBarModule,
        MatButtonModule,
        NegotiationFormModule,
        TranslateModule
    ],
    declarations: [NegotiationDialog],
    entryComponents: [NegotiationDialog],
    exports: [NegotiationDialog],
})
export class NegotiationDialogModule { }

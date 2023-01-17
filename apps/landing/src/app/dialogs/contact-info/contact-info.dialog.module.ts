import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactInfoDialog } from './contact-info.dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [FlexLayoutModule, MatButtonModule, MatDialogModule],
    declarations: [ContactInfoDialog],
    exports: [ContactInfoDialog],
    entryComponents: [ContactInfoDialog],
})
export class ContactInfoDialogModule {}

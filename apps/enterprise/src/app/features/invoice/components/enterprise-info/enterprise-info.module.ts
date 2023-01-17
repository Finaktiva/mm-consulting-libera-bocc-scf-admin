import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EnterpriseInfoComponent } from './enterprise-info.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [FlexLayoutModule, TranslateModule],
    declarations: [EnterpriseInfoComponent],
    exports: [EnterpriseInfoComponent],
})
export class EnterpriseInfoModule {}

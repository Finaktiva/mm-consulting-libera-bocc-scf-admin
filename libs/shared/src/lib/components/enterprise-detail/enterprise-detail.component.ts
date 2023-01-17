import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Enterprise, ENTERPRISE_TYPE } from '@libera/models/enterprise';

@Component({
    selector: 'enterprise-detail',
    templateUrl: './enterprise-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseDetailComponent {
    @Input() entity: Enterprise;

    ENTERPRISE_TYPE = ENTERPRISE_TYPE;
}

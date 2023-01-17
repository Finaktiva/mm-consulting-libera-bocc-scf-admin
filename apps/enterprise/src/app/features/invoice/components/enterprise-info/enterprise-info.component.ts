import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Enterprise } from '@libera/models/shared';

@Component({
    selector: 'enterprise-info',
    templateUrl: './enterprise-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseInfoComponent {
    @Input() entity: Enterprise;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Enterprise, ENTERPRISE_MODULES } from '@libera/models/enterprise';

@Component({
    selector: 'admin-detail',
    templateUrl: './admin-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDetailComponent {
    @Input() entity: Enterprise;

    ENTERPRISE_MODULES = ENTERPRISE_MODULES;
}

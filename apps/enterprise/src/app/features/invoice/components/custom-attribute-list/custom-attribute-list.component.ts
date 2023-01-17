import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE, EnterpriseCustomAttribute } from '@libera/models/enterprise';

@Component({
    selector: 'custom-attribute-list',
    templateUrl: './custom-attribute-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeListComponent {
    @Input() entities: EnterpriseCustomAttribute[];

    ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE = ENTERPRISE_CUSTOM_ATTRIBUTE_TYPE;
}

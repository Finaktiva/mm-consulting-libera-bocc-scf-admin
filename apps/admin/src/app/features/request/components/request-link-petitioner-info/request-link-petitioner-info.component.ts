import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EnterpriseLinkRequest } from '@libera/models/enterprise-request';

@Component({
    selector: 'request-link-petitioner-info',
    templateUrl: './request-link-petitioner-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestLinkPetitionerInfoComponent {
    @Input() entity: EnterpriseLinkRequest;

    getFullName() {
        const entity = this.entity;

        if (
            !entity ||
            !entity.enterpriseRequester ||
            !entity.enterpriseRequester.owner
        )
            return '';

        const {
            name,
            firstSurname,
            secondSurname,
        } = entity.enterpriseRequester.owner;

        return [name, firstSurname, secondSurname]
            .filter(word => word)
            .join(' ');
    }
}

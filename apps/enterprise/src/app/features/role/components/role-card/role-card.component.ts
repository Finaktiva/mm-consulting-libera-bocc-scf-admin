import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AUTHENTICATION_ROLE, AuthenticationRole } from '@libera/models/authentication';

@Component({
    selector: 'role-card',
    templateUrl: './role-card.component.html',
    styleUrls: ['./role-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleCardComponent {
    @Input() role: AuthenticationRole;

    @Input() roles: AuthenticationRole[];

    @Input() icon: string;

    @Output() pick = new EventEmitter<AuthenticationRole>();

    @Output() request = new EventEmitter<AuthenticationRole>();

    AUTHENTICATION_ROLE = AUTHENTICATION_ROLE;

    hasRole(): boolean {
        return this.roles.includes(this.role);
    }

    onSelect() {
        this.pick.emit(this.role);
    }

    onRequest() {
        this.request.emit(this.role);
    }
}

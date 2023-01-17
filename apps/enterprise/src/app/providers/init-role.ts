import { AuthenticationRole } from '@libera/models/authentication';

import { AuthenticationRoleStore } from '../state/authentication-role/authentication-role.store';

export function initRole(document: Document, store: AuthenticationRoleStore) {
    return () => {
        const regex = new RegExp('[\\?&]' + 'role' + '=([^&#]*)');
        const results = regex.exec(document.location.search);
        const role: AuthenticationRole = results
            ? (decodeURIComponent(
                  results[1].replace(/\+/g, ' ')
              ) as AuthenticationRole)
            : null;

        if (role) store.setSelectedRole(role);
    };
}

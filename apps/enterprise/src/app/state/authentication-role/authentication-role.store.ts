import { Injectable } from '@angular/core';
import { AuthenticationRole } from '@libera/models/authentication';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationRoleStore {
    private _state$ = new BehaviorSubject<AuthenticationRole>(null);

    state$ = this._state$.asObservable();

    setSelectedRole(payload: AuthenticationRole) {
        this._state$.next(payload);
    }
}

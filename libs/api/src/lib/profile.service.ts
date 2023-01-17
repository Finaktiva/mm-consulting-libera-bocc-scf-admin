import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import { PERMISSIONS_MOCKS, PROFILE_MOCK } from '@libera/mocks/profile';
import { Profile } from '@libera/models/profile';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LANGUAGE_MOCK } from '@libera/mocks/catalog';
import { Language } from '@libera/models/catalog';
import { UserRole } from '@libera/models/user';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        this.url = `${endpoint}/me`;
    }

    get() {
        if (this.shouldMock) return of(PROFILE_MOCK).pipe(delay(1000));

        return this.http.get<Profile>(`${this.url}/account`);
    }

    update(payload: Profile) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.put(`${this.url}/account`, payload);
    }

    getLanguage() {
        if (this.shouldMock) return of(LANGUAGE_MOCK[0]).pipe(delay(1000));

        return this.http.get<Language>(`${this.url}/language`);
    }

    setLanguage(code: string) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.put(`${this.url}/language`, { code });
    }

    getRolePermissions() {
        if (this.shouldMock) return of(PERMISSIONS_MOCKS).pipe(
            delay(1000),
            map(roles => 
                roles.map((rol,index) => (
                    { ...rol, id: index }
                ))
            ));

        return this.http.get<UserRole[]>(`${this.url}/roles`).pipe(
            map(roles => 
                roles.map((rol,index) => (
                    { ...rol, id: index }
                ))
            )
        )
    }
}

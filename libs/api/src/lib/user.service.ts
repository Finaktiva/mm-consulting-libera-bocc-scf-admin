import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_ENDPOINT_PROVIDER, SHOULD_MOCK_PROVIDER } from '@libera/environment';
import { USER_MOCKS } from '@libera/mocks/user';
import { User, UserPaginationFilterPayload, UserPayload, UserStatus } from '@libera/models/user';
import { Page, PaginationPayload } from '@mediomelon/ng-core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, switchMapTo } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) endpoint,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock
    ) {
        this.url = `${endpoint}/users`;
    }

    getPage(
        page: Page,
        filters: UserPaginationFilterPayload
    ): Observable<PaginationPayload<User[]>> {
        if (this.shouldMock)
            return of({ total: 90, items: USER_MOCKS }).pipe(delay(1000));

        let params = new HttpParams()
            .set('page', (page.index + 1).toString())
            .set('per_page', page.size.toString());

        if (filters && filters.filter_by)
            params = params.set('filter_by', filters.filter_by);

        if (filters && filters.q) params = params.set('q', filters.q);

        return this.http
            .get<User[]>(`${this.url}`, {
                observe: 'response',
                params,
            })
            .pipe(
                map(response => ({
                    items: response.body,
                    total: parseInt(response.headers.get('x-total-count')) || 0,
                }))
            );
    }

    create(user: UserPayload): Observable<User> {
        if (this.shouldMock)
            return of({
                ...user,
                id: 999,
                status: 'PENDING_ACCOUNT_CONFIRMATION',
                roles: [
                    {
                        code: "PLATFORM_ADMINISTRATOR",
                        description: "Administrador de plataforma",
                        acronym: "ADPL"
                    }
                ]
            } as User).pipe(delay(1000));

        return this.http.post<User>(this.url, user);
    }

    update(id: number, {roles, ...user}: User) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        const payload = {...user, roles: [roles[0].code]}
        return this.http.put(`${this.url}/${id}`, payload);
    }

    delete(id: number) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http.delete(`${this.url}/${id}`);
    }

    invite(id: number, firstTime?: boolean) {
        if (this.shouldMock) return of(null).pipe(delay(1000));
        let params = ``;
        if (firstTime) params = `?first_time=${firstTime}`
        return this.http.post(`${this.url}/${id}/resend-invitation` + params, null);
    }

    patchStatus(id: number, status: UserStatus) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        return this.http
            .patch(`${this.url}/${id}/status`, {
                status,
            })
            .pipe(delay(1));
    }
}

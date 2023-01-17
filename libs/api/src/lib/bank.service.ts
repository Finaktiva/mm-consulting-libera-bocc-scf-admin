import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';

@Injectable({
    providedIn: 'root',
})
export class BankService {
    private url: string;
    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) private endpoint: string,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean
    ){
        this.url = `${endpoint}/catalogs/banks`;
    }
    get(){
        return this.http.get<any[]>(this.url);
    }
}
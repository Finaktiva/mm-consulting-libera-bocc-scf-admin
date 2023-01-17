import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import { economicActivity } from '@libera/models/ciuu-act-sec';

@Injectable({
    providedIn: 'root',
})
export class CiiuActSecService {
    private url: string;
    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) private endpoint: string,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean
    ){
        this.url = `${endpoint}/catalogs/economic-activities`;
    }

    get(id: string){
        return this.http.get<economicActivity>(`${this.url}/${id}`);
    }
}
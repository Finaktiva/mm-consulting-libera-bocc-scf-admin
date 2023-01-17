import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import { Client } from '@libera/models/client';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private url: string;
    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) private endpoint: string,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean
    ){
        this.url = `${endpoint}/apis/clients`;
    }

    findByCriterion(document_type: string, document_number: string){
        return this.http.get<Client>(`${this.url}?document_type=${document_type}&document_number=${document_number}`);
    }
}
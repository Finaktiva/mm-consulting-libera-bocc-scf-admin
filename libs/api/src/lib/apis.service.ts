import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import { DailyRate } from '@libera/models/catalog'; 
import { Duty, DutyNumberTest } from '@libera/models/duty'; 
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DUTY_MOCK_UNIDIRECT, DUTY_MOCK_PRODUCTIVE, DUTY_MOCK_FACTORING } from '@libera/mocks/duty'

@Injectable({
    providedIn: 'root',
})
export class ApisService {
    private url: string;
    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) private endpoint: string,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean
    ){
        this.url = `${endpoint}/apis`;
    }

    getDailyRates(){
        return this.http.get<DailyRate[]>(`${this.url}/daily-rates`);
    }

    getBalanceByDutyNumber(dutyNumber: string){
        if (this.shouldMock){
            if (dutyNumber === DutyNumberTest.PRODUCTIVE_NUMBER) return of(DUTY_MOCK_PRODUCTIVE).pipe(delay(1000)) 
            return dutyNumber === DutyNumberTest.UNIDIRECT_NUMBER ? of(DUTY_MOCK_UNIDIRECT).pipe(delay(1000)) : of(DUTY_MOCK_FACTORING).pipe(delay(1000)) ;
        }

        let params = new HttpParams()
            .set('loanNumber', `${dutyNumber}`);

        return this.http.get<Duty>(`${this.url}/balances`, { params });
    }
}
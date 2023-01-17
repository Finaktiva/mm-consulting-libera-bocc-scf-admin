import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    API_ENDPOINT_PROVIDER,
    SHOULD_MOCK_PROVIDER,
} from '@libera/environment';
import { GenerateURLPayload } from '@libera/models/s3';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class S3Service {
    constructor(
        private http: HttpClient,
        @Inject(API_ENDPOINT_PROVIDER) private endpoint: string,
        @Inject(SHOULD_MOCK_PROVIDER) private shouldMock: boolean
    ) {}

    private xlsxType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    generateUrl(payload: GenerateURLPayload) {
        if (this.shouldMock) return of('some upload url').pipe(delay(1000));

        let finalPayload = payload;

        if (!payload.contentType) {
            if (payload.filename.endsWith('.xls')) {
                finalPayload.contentType = 'application/vnd.ms-excel';
            } else if (payload.filename.endsWith('.xlsx')) {
                finalPayload.contentType = this.xlsxType;
            } else if (payload.filename.endsWith('.pdf')){
                finalPayload.contentType = 'application/pdf';
            } else if (payload.filename.endsWith('.jpg') || payload.filename.endsWith('.jpeg')){
                finalPayload.contentType = 'image/jpeg';
            }
        }

        return this.http
            .post<{ url: string }>(
                `${this.endpoint}/s3-credentials-path`,
                payload
            )
            .pipe(map(payload => payload.url));
    }

    upload(url: string, file: File) {
        if (this.shouldMock) return of(null).pipe(delay(1000));

        let newFile: File = file;

        if (
            !file.type &&
            (file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))
        ) {
            let blob: any = file.slice(
                0,
                file.size,
                file.name.endsWith('.xls')
                    ? 'application/vnd.ms-excel'
                    : this.xlsxType
            );
            blob.lastModified = new Date();
            blob.name = file.name;

            newFile = <File>blob;
        }
        return this.http.put<null>(url, newFile);
    }
}

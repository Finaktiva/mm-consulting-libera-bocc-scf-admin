import { Injectable } from '@angular/core';
import { ChangeDocumentationStatusPayload } from '@libera/models/enterprise';
import { AuthenticationQuery, EnterpriseDocumentationStoreService as StoreService } from '@libera/state';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseDocumentationStoreService {
    constructor(
        private authenticationQuery: AuthenticationQuery,
        private storeService: StoreService
    ) {}

    fetch() {
        return this.storeService.fetch(
            this.authenticationQuery.getEnterpriseId()
        );
    }

    changeStatus(id: number, payload: ChangeDocumentationStatusPayload) {
        return this.storeService.changeStatus(
            this.authenticationQuery.getEnterpriseId(),
            id,
            payload
        );
    }

    uploadFile(id: number, file: File, explanation:string, expeditionDate:string, isUser?: boolean) {
        return this.storeService.uploadFile(
            this.authenticationQuery.getEnterpriseId(),
            id,
            file,
            explanation,
            expeditionDate,
            isUser
        );
    }

    deleteFile(id: number) {
        return this.storeService.deleteFile(
            this.authenticationQuery.getEnterpriseId(),
            id
        );
    }
}

import { Injectable } from '@angular/core';
import { EnterpriseService } from '@libera/api';
import { tap } from 'rxjs/operators';
import { DocumentNumberQuery } from './document-number.query';
import { DocumentNumberStore } from './document-number.store';

@Injectable({
  providedIn: 'root',
})
export class DocumentNumberStoreService {
  constructor(
    private query: DocumentNumberQuery,
    private store: DocumentNumberStore,
    private enterprisesService: EnterpriseService
  ) {}

  fetch(nit: string) {

    this.store.fetch(nit);

    return this.enterprisesService
      .getDocumentNumber(nit)
      .pipe(
        tap(
          documentNumber => this.store.fetchSuccess(nit,documentNumber),
          error => this.store.fetchError(nit, error)
        )
      );
  }
}
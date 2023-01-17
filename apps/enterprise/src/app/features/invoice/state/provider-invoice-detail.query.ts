// import { Injectable } from '@angular/core';
// import { ProviderInvoiceDetail } from '@libera/models/provider';
// import { Enterprise } from '@libera/models/shared';
// import { EntityQuery } from '@mediomelon/ng-core';
// import { Observable } from 'rxjs';
// import { select } from 'rxjs-augmented/operators';

// import { ProviderInvoiceDetailStore } from './provider-invoice-detail.store';

// @Injectable({
//     providedIn: 'root',
// })
// export class ProviderInvoiceDetailQuery extends EntityQuery<
//     ProviderInvoiceDetail
// > {
//     constructor(private store: ProviderInvoiceDetailStore) {
//         super(store);
//     }

//     selectEntityHasPayer(id: number): Observable<boolean> {
//         return this.selectEntityPayer(id).pipe(select(entity => !!entity));
//     }

//     selectEntityPayer(id: number): Observable<Enterprise> {
//         return this.selectEntity(id).pipe(
//             select(entity => (entity ? entity.payer : null))
//         );
//     }
// }

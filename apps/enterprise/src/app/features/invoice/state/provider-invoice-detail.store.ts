// import { Injectable } from '@angular/core';
// import { ProviderInvoiceDetail } from '@libera/models/provider';
// import { InvoiceStatus } from '@libera/models/shared';
// import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';
// import produce from 'immer';

// const initialState: EntityStoreState<ProviderInvoiceDetail> = {
//     entities: {},
//     error: null,
//     ids: [],
//     loaded: false,
//     loading: false,
//     uiEntities: {},
// };

// @Injectable({
//     providedIn: 'root',
// })
// export class ProviderInvoiceDetailStore extends EntityStore<
//     ProviderInvoiceDetail
// > {
//     constructor() {
//         super(initialState);
//     }

//     updateStatus(id: number, status: InvoiceStatus) {
//         const state = this.getState();

//         const newState = produce(state, draft => {
//             const { entities } = draft;
//             const entity = entities[id];
//             entity.status = status;
//         });

//         this.setState(newState);
//     }
// }

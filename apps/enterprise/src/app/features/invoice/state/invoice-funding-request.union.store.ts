import { Injectable } from "@angular/core";
import { UnionStore } from '@mediomelon/ng-core';
import produce from 'immer';

@Injectable({
  providedIn: 'root'
})

export class InvoiceFundingRequestUnionStore extends UnionStore {
  constructor() {
    super();
  }

  insert(id: number, idOrIds: number | number[]) {
    const state = this.getState();
    const newState: any = produce<any>(state, draft => {
      const { entities, uiEntities } = draft;
      const entity: any = (entities[id] as any) || {
        id,
        ids: [],
      };

      const payload: number[] = Array.isArray(idOrIds)
        ? idOrIds
        : [idOrIds];

      entity.ids = [...payload, ...entity.ids];

      entities[id] = entity;

      if (!uiEntities[id]) uiEntities[id] = this.createInitialUIState();
    });

    this.setState(newState);
  }
}
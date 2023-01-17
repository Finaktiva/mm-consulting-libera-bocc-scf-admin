import { Injectable } from '@angular/core';
import { ActivityHistory } from '@libera/models/enterprise';
import { EntityStore, EntityStoreState } from '@mediomelon/ng-core';

const initialState: EntityStoreState<
  ActivityHistory>
  = {
  entities: {},
  error: null,
  ids: [],
  loaded: false,
  loading: false,
  uiEntities: {},
};

@Injectable({
  providedIn: 'root'
})

export class ActivitiesHistoryStore extends EntityStore<
ActivityHistory
>{
  constructor() {
    super(initialState);
  }

}
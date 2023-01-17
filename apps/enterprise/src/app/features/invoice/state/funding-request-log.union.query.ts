import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { FundingRequestLog } from '@libera/models/lender';
import { FundingRequestLogUnionStore } from './funding-request-log.union.store';

@Injectable({
  providedIn: 'root'
})
export class FundingRequestLogUnionQuery {
  constructor(private store: FundingRequestLogUnionStore) {
  }

  private getState() {
    return this.store.getState();
  }

  private selectState() {
    return this.store.state$;
  }

  selectUIEntitiesMap() {
    return this.selectState().pipe(select(state => state.uiEntities));
  }

  selectEntitiesMap() {
    return this.selectState().pipe(select(state => state.entities));
  }

  selectEntity(id: number) {
    return this.selectEntitiesMap().pipe(
      select(entities => entities[id] || null)
    );
  }

  selectEntityLogs(id: number): Observable<FundingRequestLog[]> {
    return this.selectEntity(id).pipe(
      select(entity => (entity ? entity.logs : []))
    );
  }

  selectUIEntity(id: number) {
    return this.selectUIEntitiesMap().pipe(
      select(entities => entities[id] || null)
    );
  }

  selectUIEntityLoaded(id: number): Observable<boolean> {
    return this.selectUIEntity(id).pipe(
      select(entity => (entity ? entity.loaded : false))
    );
  }

  selectUIEntityLoading(id: number): Observable<boolean> {
    return this.selectUIEntity(id).pipe(
      select(entity => (entity ? entity.loading : false))
    );
  }

  selectUIEntityError(id: number): Observable<any> {
    return this.selectUIEntity(id).pipe(
      select(entity => (entity ? entity.error : null))
    );

  }

  getUIEntity(id: number) {
    const { uiEntities } = this.getState();
    return uiEntities[id] || null;
  }

  shouldFetchEntity(id: number) {
    const entity = this.getUIEntity(id);

    return entity ? !entity.loaded || !!entity.error : false;
  }

}
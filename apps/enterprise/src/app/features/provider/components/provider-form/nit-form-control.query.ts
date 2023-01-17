import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';

import { NitFormControlStore } from './nit-form-control.store';

@Injectable()
export class NitFormControlQuery {
    constructor(private store: NitFormControlStore) {}

    selectLoaded(): Observable<boolean> {
        return this.store.state$.pipe(select(state => state.loaded));
    }

    selectLoading(): Observable<boolean> {
        return this.store.state$.pipe(select(state => state.loading));
    }

    selectError(): Observable<any> {
        return this.store.state$.pipe(select(state => state.error));
    }

    getLoaded(): boolean {
        return this.store.getState().loaded;
    }

    getLoading(): boolean {
        return this.store.getState().loading;
    }

    getError(): any {
        return this.store.getState().error;
    }
}

import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import produce from 'immer';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService implements OnInit, OnDestroy {
    private _localStore$ = new BehaviorSubject({});

    private readonly storeKey: string = 'store';

    ngOnInit() {
        const store = JSON.parse(localStorage.getItem(this.storeKey));
        this._localStore$.next(store);
    }

    ngOnDestroy() {
        const store = this._localStore$.value;
        localStorage.setItem(this.storeKey, JSON.stringify(store));
    }

    setItem<T = any>(key: string, item: T): void {
        const store = this.getStore();

        const newStore = produce(store, draft => {
            draft[key] = item;
        });

        this.setStore(newStore);
    }

    selectItem<T = any>(key: string): Observable<T> {
        return this._localStore$.pipe(map(store => store[key]));
    }

    getItem<T = any>(key: string): T {
        return this._localStore$.value[key];
    }

    removeItem(key: string): void {
        const store = this.getStore();

        const newStore = produce(store, draft => {
            delete draft[key];
        });

        this.setStore(newStore);
    }

    clear(): void {
        this.setStore({});
    }

    private getStore() {
        return this._localStore$.value;
    }

    private setStore(store: any) {
        this._localStore$.next(store);
    }
}

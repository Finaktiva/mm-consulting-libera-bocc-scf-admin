import {
    EntityListStore,
    EntityListStoreState,
    ID,
    UIState,
} from '@mediomelon/ng-core';
import produce from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SelectionUIState extends UIState {
    selected: boolean;
}

export class EntityListSelectionStore<
    E = any,
    UI extends SelectionUIState = any,
    F = any
> extends EntityListStore<E, UI, F> {
    private selection$: BehaviorSubject<ID[]>;

    constructor(initialState: EntityListStoreState) {
        super(initialState);
        this.selection$ = new BehaviorSubject([]);
    }

    toggle(id: ID) {
        const state = this.getState();
        const selection = this.getSelection();

        const newState = produce({ state, selection }, draft => {
            const { uiEntities } = draft.state;
            const uiEntity = uiEntities[id];

            uiEntity.selected = !uiEntity.selected;
            const index = draft.selection.indexOf(id);
            if (index >= 0) {
                draft.selection.splice(index, 1);
            } else {
                draft.selection.push(id);
            }
        });

        this.setState(newState.state);
        this.setSelection(newState.selection);
    }

    toggleAll(selected: boolean, currentIds?: ID[]) {
        const state = this.getState();
        const selection = this.getSelection();

        const newState = produce({ state, selection }, draft => {
            const { ids: stateIds, uiEntities } = draft.state;
            const ids = currentIds || stateIds;
            ids.forEach(id => {
                uiEntities[id].selected = selected;
            });
            if (selected) {
                draft.selection = draft.selection.concat(ids);
            } else {
                draft.selection = draft.selection.filter(
                    id => !ids.includes(id)
                );
            }
        });

        this.setState(newState.state);
        this.setSelection(newState.selection);
    }

    clearSelection() {
        const state = this.getState();
        const selection = this.getSelection();

        const newState = produce({ state, selection }, draft => {
            const { uiEntities } = draft.state;
            draft.selection.forEach(id => (uiEntities[id].selected = false));
            draft.selection = [];
        });

        this.setState(newState.state);
        this.setSelection(newState.selection);
    }

    currentSelection(): Observable<ID[]> {
        return this.selection$;
    }

    private getSelection() {
        return this.selection$.value;
    }

    private setSelection(selection: ID[]) {
        this.selection$.next(selection);
    }
}

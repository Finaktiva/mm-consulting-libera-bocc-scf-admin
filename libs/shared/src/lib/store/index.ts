import { Action, ActionReducer } from '@ngrx/store';

export class BatchAction implements Action {
    public type = 'Batch Action';

    constructor(public payload: Action[]) {}
}

export function enableBatchReducer<S>(
    reduce: ActionReducer<S>
): ActionReducer<S> {
    return function batchReducer(state: S, action: Action): S {
        if (action instanceof BatchAction) {
            let batchActions = action.payload;
            return batchActions.reduce(batchReducer, state);
        } else {
            return reduce(state, action);
        }
    };
}

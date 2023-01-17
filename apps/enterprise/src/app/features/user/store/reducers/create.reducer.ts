import produce from 'immer';

import * as fromActions from '../actions/user.actions';

export interface State {
    submitting: boolean;
    error: any;
}

export const initialState: State = {
    submitting: false,
    error: null,
};

export function reducer(
    state = initialState,
    action: fromActions.UserActionsUnion
): State {
    return produce(state, draft => {
        switch (action.type) {
            case fromActions.UserActionTypes.CreateUser:
                draft.submitting = true;
                draft.error = null;
                return;
            case fromActions.UserActionTypes.CreateUserSuccess:
                draft.submitting = false;
                return;
            case fromActions.UserActionTypes.CreateUserError:
                draft.submitting = false;
                draft.error = action.payload;
                return;
        }
    });
}

import * as fromActions from '../actions/user.actions';

export const initialState: number = null;

export function reducer(
    state = initialState,
    action: fromActions.UserActionsUnion
) {
    switch (action.type) {
        case fromActions.UserActionTypes.OpenEditDialog:
        case fromActions.UserActionTypes.OpenDeleteDialog:
            return action.payload;
        case fromActions.UserActionTypes.CloseEditDialog:
        case fromActions.UserActionTypes.CloseDeleteDialog:
            return null;
        default:
            return state;
    }
}

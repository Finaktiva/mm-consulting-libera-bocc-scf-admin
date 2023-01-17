import { EnterpriseUser } from '@libera/models/enterprise';
import produce from 'immer';

import * as fromActions from '../actions/user.actions';

export interface EnterpriseUserEntity {
    update: {
        submitting: boolean;
        error: any;
    };
    delete: {
        submitting: boolean;
        error: any;
    };
    patchStatus: {
        submitting: boolean;
        error: any;
    };
    value: EnterpriseUser;
}

export interface State {
    [id: number]: EnterpriseUserEntity;
}

export const initialState: State = {};

export function reducer(
    state: State = initialState,
    action: fromActions.UserActionsUnion
) {
    return produce(state, draft => {
        switch (action.type) {
            case fromActions.UserActionTypes.PatchStatus: {
                const entity = draft[action.id];
                if (!entity) return;

                entity.patchStatus.submitting = true;
                entity.patchStatus.error = null;
                entity.value.status = action.payload;
                return;
            }
            case fromActions.UserActionTypes.PatchStatusSuccess: {
                const entity = draft[action.id];
                if (!entity) return;

                entity.patchStatus.submitting = false;
                return;
            }
            case fromActions.UserActionTypes.PatchStatusError: {
                const entity = draft[action.id];
                if (!entity) return;

                entity.patchStatus.submitting = false;
                entity.patchStatus.error = action.payload;
                entity.value.status = action.status;
                return;
            }
            case fromActions.UserActionTypes.GetPageSuccess:
                action.payload.items.forEach(e => {
                    if (draft[e.id]) {
                        draft[e.id].value = e;
                    } else {
                        draft[e.id] = getInitialEntityState(e);
                    }
                });
                return;
            case fromActions.UserActionTypes.CreateUserSuccess:
                draft[action.payload.id] = getInitialEntityState(
                    action.payload
                );
                return;
            case fromActions.UserActionTypes.UpdateUser: {
                const entity = draft[action.id];
                if (!entity) return;

                entity.update.submitting = true;
                entity.update.error = null;
                return;
            }
            case fromActions.UserActionTypes.UpdateUserSuccess: {
                const entity = draft[action.id];
                if (!entity) return;

                entity.update.submitting = false;
                entity.value = { ...entity.value, ...action.payload };
                return;
            }
            case fromActions.UserActionTypes.UpdateUserError: {
                const entity = draft[action.id];
                if (!entity) return;

                entity.update.submitting = false;
                entity.update.error = action.payload;
                return;
            }
            case fromActions.UserActionTypes.DeleteUser: {
                const entity = draft[action.payload];
                if (!entity) return;

                entity.delete.submitting = true;
                entity.delete.error = null;
                return;
            }
            case fromActions.UserActionTypes.DeleteUserSuccess: {
                delete draft[action.payload];
                return;
            }
            case fromActions.UserActionTypes.DeleteUserError: {
                const entity = draft[action.id];
                if (!entity) return;

                entity.delete.submitting = false;
                entity.delete.error = action.payload;
                return;
            }
        }
    });
}

function getInitialEntityState(user?: EnterpriseUser): EnterpriseUserEntity {
    return {
        update: {
            submitting: false,
            error: null,
        },
        delete: {
            submitting: false,
            error: null,
        },
        patchStatus: {
            submitting: false,
            error: null,
        },
        value: user,
    };
}

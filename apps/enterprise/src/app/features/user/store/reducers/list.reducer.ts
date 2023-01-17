import { DEFAULT_PAGE_SIZE } from '@libera/constants';
import { EnterpriseUserFilterPayload } from '@libera/models/enterprise';
import { Pagination } from '@mediomelon/ng-core';
import produce from 'immer';

import * as fromActions from '../actions/user.actions';

export interface State {
    loaded: boolean;
    loading: boolean;
    error: any | null;
    pagination: Pagination<EnterpriseUserFilterPayload>;
    ids: number[];
}

export const initialState: State = {
    loaded: false,
    loading: false,
    error: null,
    ids: [],
    pagination: {
        page: {
            index: 0,
            size: DEFAULT_PAGE_SIZE,
        },
        filters: {
            filter_by: null,
            q: null,
        },
        total: null,
    },
};

export function reducer(
    state = initialState,
    action: fromActions.UserActionsUnion
): State {
    return produce(state, draft => {
        switch (action.type) {
            case fromActions.UserActionTypes.ChangeFilters:
                draft.pagination.filters.filter_by = action.payload.filter_by;
                draft.pagination.filters.q = action.payload.q;
                return;
            case fromActions.UserActionTypes.ChangePage:
                draft.pagination.page.index = action.payload.index;

                if (action.payload.size)
                    draft.pagination.page.size = action.payload.size;
                return;
            case fromActions.UserActionTypes.GetPage:
                draft.loading = true;
                draft.loaded = false;
                draft.error = null;
                return;
            case fromActions.UserActionTypes.GetPageSuccess:
                draft.loading = false;
                draft.loaded = true;
                draft.pagination.total = action.payload.total;
                draft.ids = action.payload.items.map(i => i.id);
                return;
            case fromActions.UserActionTypes.GetPageError:
                draft.error = action.payload;
                draft.loading = false;
                draft.loaded = true;
                return;
            case fromActions.UserActionTypes.CreateUserSuccess:
                if (draft.ids.length < draft.pagination.page.size)
                    draft.ids.push(action.payload.id);
                draft.pagination.total++;
                return;
            case fromActions.UserActionTypes.DeleteUserSuccess:
                draft.ids = draft.ids.filter(id => id != action.payload);
                if (draft.pagination.total > 0) draft.pagination.total--;
                return;
        }
    });
}

import { ActionReducerMap } from '@ngrx/store';

import * as fromEntities from '../reducers/entities.reducer';
import * as fromActive from './active.reducer';
import * as fromCreate from './create.reducer';
import * as fromList from './list.reducer';

export interface UserState {
    list: fromList.State;
    entities: fromEntities.State;
    create: fromCreate.State;
    active: number;
}

export const userReducers: ActionReducerMap<UserState> = {
    list: fromList.reducer,
    entities: fromEntities.reducer,
    create: fromCreate.reducer,
    active: fromActive.reducer,
};

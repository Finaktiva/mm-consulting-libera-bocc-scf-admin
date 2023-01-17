import { AuthenticationState } from '@libera/authentication';
import { ActionReducerMap } from '@ngrx/store';

import * as fromBranding from './branding.reducer';

// import * as fromEnterprise from './enterprise.reducer';

// import * as fromDocumentation from './documentation.reducer';
export interface AppState {
    authentication?: AuthenticationState;
    // documentation: fromDocumentation.State;
    // enterprise: fromEnterprise.State;
    branding: fromBranding.State;
}

export const reducers: ActionReducerMap<AppState> = {
    // documentation: fromDocumentation.reducer,
    // enterprise: fromEnterprise.reducer,
    branding: fromBranding.reducer,
};

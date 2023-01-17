import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthenticationEffects } from './store/effects/authentication.effects';
import { authenticationReducer } from './store/reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('authentication', authenticationReducer),
        EffectsModule.forFeature([AuthenticationEffects]),
    ],
})
export class AuthenticationStoreModule {}

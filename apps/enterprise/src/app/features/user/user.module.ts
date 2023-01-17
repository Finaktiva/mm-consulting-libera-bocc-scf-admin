import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DeleteUserDialogModule } from './dialogs/delete-user/delete-user.dialog.module';
import { UpdateUserDialogModule } from './dialogs/update-user/update-user.dialog.module';
import { userEffects } from './store/effects';
import { userReducers } from './store/reducers';
import { UserRoutingModule } from './user.routing';

@NgModule({
    imports: [
        UserRoutingModule,
        UpdateUserDialogModule,
        DeleteUserDialogModule,
        StoreModule.forFeature('user', userReducers),
        EffectsModule.forFeature(userEffects),
    ],
})
export class UserModule {}

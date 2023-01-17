import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserPayload } from '@libera/models/user';
import { UserRoleQuery } from '@libera/state';
import { Observable } from 'rxjs';

import { UserCreateQuery } from '../../state/user-create.query';
import { UserStoreService } from '../../state/user.store.service';

@Component({
    selector: 'create-user-dialog',
    templateUrl: './create-user.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserDialog {
    isSubmitting$ = this.query.selectSubmitting();
    isLoading$: Observable<boolean> = this.userRoleQuery.selectLoading()

    constructor(
        private storeService: UserStoreService,
        private query: UserCreateQuery,
        private dialogRef: MatDialogRef<CreateUserDialog>,
        private userRoleQuery: UserRoleQuery,
    ) {}

    onSubmit(user : any) {
        const {roles} = user
        const payload: UserPayload = {
            ...user,
            roles: [`${roles.code}`],
            secondSurname: (user.secondSurname === '' ? null : user.secondSurname)
        }
        this.storeService.create(user, payload).subscribe(() => this.dialogRef.close());
    }
}

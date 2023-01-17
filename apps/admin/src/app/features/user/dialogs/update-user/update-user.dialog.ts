import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@libera/models/user';
import { UserRoleQuery } from '@libera/state';

import { UserQuery } from '../../state/user.query';
import { UserStoreService } from '../../state/user.store.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'update-user-dialog',
    templateUrl: './update-user.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserDialog {
    entity$ = this.query.selectEntity(this.data.id);

    isSubmitting$ = this.query.selectEntityUpdating(this.data.id);

    isLoading$: Observable<boolean> = this.userRoleQuery.selectLoading()

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: { id: number },
        private storeService: UserStoreService,
        private userRoleQuery: UserRoleQuery,
        private query: UserQuery,
        private dialogRef: MatDialogRef<UpdateUserDialog>
    ) {}

    onSubmit(user: any) {
        const payload: User = {
            ...user,
            roles: [user.roles],
            secondSurname: (user.secondSurname === '' ? null : user.secondSurname)
        }
        this.storeService
            .update(this.data.id, payload)
            .subscribe(() => this.dialogRef.close());
    }
}

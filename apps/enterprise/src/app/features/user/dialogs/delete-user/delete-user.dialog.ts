import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserFacade } from '../../store/facades/user.facade';

@Component({
    selector: 'delete-user-dialog',
    templateUrl: './delete-user.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteUserDialog implements OnInit, OnDestroy {
    isSubmitting$ = this.userFacade.isDeleting$;

    user$ = this.userFacade.user$.pipe(take(1));

    isChecked = false;

    private subscription = new Subscription();

    constructor(
        private userFacade: UserFacade,
        private dialogRef: MatDialogRef<DeleteUserDialog>
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.userFacade.deleteSuccess$.subscribe(() =>
                this.dialogRef.close()
            )
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        this.userFacade.delete();
    }
}

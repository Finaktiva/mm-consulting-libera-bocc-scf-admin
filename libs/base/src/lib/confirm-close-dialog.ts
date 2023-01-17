import { ESCAPE } from '@angular/cdk/keycodes';
import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export abstract class ConfirmCloseDialog implements OnInit {
    private close$ = new Subject();
    private subscription: Subscription;

    constructor(public dialogRef: MatDialogRef<any>) {}

    ngOnInit() {
        const escapeEvents$ = this.dialogRef
            .keydownEvents()
            .pipe(filter(e => e.keyCode === ESCAPE));

        const closeEvents$ = merge(
            escapeEvents$,
            this.close$,
            this.dialogRef.backdropClick()
        );

        const confirm$ = closeEvents$.pipe(
            map(() => this.onConfirmClose()),
            filter(confirmed => !!confirmed)
        );

        this.subscription = merge(confirm$, this.getSuccessEvent()).subscribe(
            () => this.dialogRef.close()
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    protected abstract onConfirmClose(): boolean;
    protected abstract getSuccessEvent(): Observable<any>;

    close() {
        this.close$.next();
    }
}

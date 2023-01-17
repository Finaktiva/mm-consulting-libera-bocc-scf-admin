import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ESCAPE } from '@angular/cdk/keycodes';

export const MockDialogRef: Partial<MatDialogRef<any>> = {
    close() {},
    backdropClick() {
        return of(null);
    },
    keydownEvents(): any {
        return of({
            keyCode: ESCAPE,
        });
    },
};

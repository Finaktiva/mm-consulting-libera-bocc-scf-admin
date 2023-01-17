import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnterpriseCustomAttribute } from '@libera/models/enterprise';
import { combineLatest, Observable } from 'rxjs';
import { select } from 'rxjs-augmented/operators';
import { map } from 'rxjs/operators';

import { CustomAttributeQuery } from '../../state/custom-attribute.query';

@Component({
    selector: 'custom-attribute-picker',
    templateUrl: './custom-attribute-picker.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributePickerDialog {
    entities$: Observable<
        EnterpriseCustomAttribute[]
    > = this.customAttributeQuery.selectEntities();

    shouldRenderAlert$: Observable<boolean> = combineLatest(
        this.customAttributeQuery.selectLoaded(),
        this.customAttributeQuery
            .selectEntities()
            .pipe(select(entities => entities.length > 0))
    ).pipe(map(([hasLoaded, hasAttributes]) => hasLoaded && !hasAttributes));

    selectedCustomAttributes: EnterpriseCustomAttribute[] = this.data.selectedIds.map(
        id => this.customAttributeQuery.getEntity(id)
    );

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: { selectedIds: number[] },
        private customAttributeQuery: CustomAttributeQuery
    ) {}
}

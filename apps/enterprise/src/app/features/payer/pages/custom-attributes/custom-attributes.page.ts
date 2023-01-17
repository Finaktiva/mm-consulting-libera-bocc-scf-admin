import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LenderCustomAttribute } from '@libera/models/lender';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDeleteCustomAttributeDialogComponent } from '../../dialogs/confirm-delete-custom-attribute-dialog/confirm-delete-custom-attribute-dialog.component';
import { CreateCustomAttributesStoreService } from '../../state/create-custom-attributes.store.service';
import { CustomAttributesQuery } from '../../state/custom-attributes.query';
import { CreateCustomAttributesQuery } from '../../state/create-custom-attributes.query';
import { CustomAttributesStoreService } from '../../state/custom-attributes.store.service';

@Component({
    selector: 'custom-attributes-page',
    templateUrl: './custom-attributes.page.html',
    styles: [],
})
export class CustomAttributesPage implements OnInit {
    isSubmitting$: Observable<boolean> = this.createQuery.selectSubmitting();

    isLoading$: Observable<boolean> = this.query.selectLoading();

    entities$: Observable<
        LenderCustomAttribute[]
    > = this.query.selectEntities();

    hasCustomAttributes$ = this.entities$.pipe(
        map(entities => !!entities.length)
    );

    isAddingCustomAttribute$ = new BehaviorSubject(false);

    shouldRenderMessage$: Observable<boolean>;

    shouldRenderTable$: Observable<boolean>;

    shouldRenderLoader$: Observable<boolean>;

    constructor(
        private query: CustomAttributesQuery,
        private createQuery: CreateCustomAttributesQuery,
        private createStoreService: CreateCustomAttributesStoreService,
        private dialog: MatDialog,
        private storeService: CustomAttributesStoreService
    ) {}

    ngOnInit() {
        const conditions$: Observable<
            [boolean, boolean, boolean]
        > = combineLatest(
            this.hasCustomAttributes$,
            this.isAddingCustomAttribute$,
            this.isLoading$
        );

        this.shouldRenderMessage$ = conditions$.pipe(
            map(
                ([hasAttributes, isAdding, isLoading]) =>
                    !hasAttributes && !isAdding && !isLoading
            )
        );

        this.shouldRenderTable$ = conditions$.pipe(
            map(([hasAttributes, isAdding]) => hasAttributes && !isAdding)
        );

        this.shouldRenderLoader$ = combineLatest(
            this.isLoading$,
            this.isSubmitting$
        ).pipe(map(conditions => conditions.some(Boolean)));

        this.storeService.fetchAll().subscribe();
    }

    onSubmit(payload: LenderCustomAttribute) {
        this.createStoreService.createCustomAttribute(payload).subscribe(() => {
            this.onCloseForm();
        });
    }

    onDelete(id: number) {
        this.dialog.open(ConfirmDeleteCustomAttributeDialogComponent, {
            data: { id },
        });
    }

    onAddCustomAttribute() {
        this.isAddingCustomAttribute$.next(true);
    }

    onCloseForm() {
        this.isAddingCustomAttribute$.next(false);
    }
}

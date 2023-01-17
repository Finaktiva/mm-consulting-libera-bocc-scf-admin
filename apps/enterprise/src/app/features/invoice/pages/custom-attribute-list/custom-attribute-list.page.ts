import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnterpriseCustomAttribute } from '@libera/models/enterprise';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    CustomAttributeConfirmDeleteDialog,
} from '../../dialogs/custom-attribute-confirm-delete/custom-attribute-confirm-delete.dialog';
import { CreateCustomAttributeQuery } from '../../state/create-custom-attribute.query';
import { CustomAttributeQuery, CustomAttributeWithUI } from '../../state/custom-attribute.query';
import { CustomAttributeStoreService } from '../../state/custom-attribute.store.service';

@Component({
    selector: 'custom-attribute-list-page',
    templateUrl: './custom-attribute-list.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeListPage implements OnInit {
    isSubmitting$: Observable<boolean> = this.createQuery.selectSubmitting();

    hasLoaded$: Observable<boolean> = this.query.selectLoaded();

    isLoading$: Observable<boolean> = this.query.selectLoading();

    error$: Observable<any> = this.query.selectError();

    entities$: Observable<
        CustomAttributeWithUI[]
    > = this.query.selectEntitiesWithUI();

    shouldRenderInfo$: Observable<boolean> = this.entities$.pipe(
        map(entities => entities.length === 0)
    );

    shouldRenderForm: boolean = false;

    constructor(
        private dialog: MatDialog,
        private createQuery: CreateCustomAttributeQuery,
        private query: CustomAttributeQuery,
        private storeService: CustomAttributeStoreService
    ) {}

    ngOnInit() {
        this.fetchAll();
    }

    fetchAll() {
        this.storeService.fetchAll().subscribe();
    }

    onSubmit(payload: EnterpriseCustomAttribute) {
        this.storeService.create(payload).subscribe(() => this.onCloseForm());
    }

    onDelete(id: number) {
        this.dialog.open(CustomAttributeConfirmDeleteDialog, { data: { id } });
    }

    onOpenForm() {
        this.shouldRenderForm = true;
    }

    onCloseForm() {
        this.shouldRenderForm = false;
    }
}

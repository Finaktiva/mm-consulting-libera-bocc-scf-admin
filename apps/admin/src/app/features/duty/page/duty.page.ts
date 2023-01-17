import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Duty } from '@libera/models/duty';
import { CodePermission } from '@libera/models/user';
import { ProfileRolePermissionsQuery } from '@libera/state';
import { Observable } from 'rxjs';


@Component({
    selector: 'duty-search-page',
    templateUrl: './duty.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DutyPage{

    shouldRenderPage$: Observable<boolean> = this.profileQuery.hasPermission(CodePermission.READ_INVOICES_LIST);

    isLoadingPermission$ = this.profileQuery.selectLoading();

    duty: Duty = null;

    constructor(
        private profileQuery: ProfileRolePermissionsQuery,
    ) {}

    insertDuty(event){
        this.duty = event;
    }

}

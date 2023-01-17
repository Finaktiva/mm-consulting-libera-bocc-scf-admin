import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Duty } from '@libera/models/duty';


@Component({
    selector: 'duty-detail',
    templateUrl: './duty-detail.component.html',
    styleUrls: ['./duty-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DutyDetailComponent {

    @Input() duty: Duty;

    constructor() {}

}

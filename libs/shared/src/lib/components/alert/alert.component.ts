import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent{

    @HostBinding('class') @Input() color;
}
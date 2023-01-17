import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { AuthenticationQuery } from '@libera/state';
import { filter, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isGreaterThanExtraSmall$ = this.observer.asObservable().pipe(
        filter(changes => changes.length > 0),
        map(changes => changes[0]),
        map(change => change.mqAlias == 'xs'),
        map(isExtraSmall => !isExtraSmall)
    );

    //don't remove authenticationQuery, it's a necessary hack
    constructor(
        private observer: MediaObserver,
        private authenticationQuery: AuthenticationQuery,
        private translateService: TranslateService
    ) {
        this.translateService.use('es');
    }
}

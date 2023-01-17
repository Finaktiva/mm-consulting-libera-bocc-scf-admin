import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { AuthenticationFacade } from '@libera/authentication';
import {
    AuthenticationQuery,
    LanguageQuery,
    LanguageStoreService,
    SelectLanguageQuery,
} from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { EnterpriseQuery } from './state/enterprise/enterprise.query';
import { EnterpriseStoreService } from './state/enterprise/enterprise.store.service';

// import { EnterpriseFacade } from './store/facades/enterprise.facade';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    isLoading$ = combineLatest(
        this.authenticationFacade.isLoading$,
        this.enterpriseQuery.selectLoading(),
        this.languageQuery.selectLoading(),
        this.languageSelectQuery.selectFetching()
    ).pipe(map(values => values.includes(true)));

    error$ = this.enterpriseQuery.selectError();

    private subscription: Subscription;

    //don't remove authenticationQuery, it's a necessary hack
    constructor(
        private authenticationQuery: AuthenticationQuery,
        private authenticationFacade: AuthenticationFacade,
        private enterpriseQuery: EnterpriseQuery,
        private enterpriseStoreService: EnterpriseStoreService,
        private languageQuery: LanguageQuery,
        private languageStoreService: LanguageStoreService,
        private languageSelectQuery: SelectLanguageQuery,
        private translateService: TranslateService
    ) {
        this.translateService.setDefaultLang('en');
    }

    ngOnInit() {
        const isLoaded$ = this.authenticationFacade.isLoading$.pipe(
            filter(loading => !loading)
        );

        const sub1 = isLoaded$
            .pipe(switchMap(() => this.languageStoreService.fetchAll()))
            .subscribe();

        const sub2 = isLoaded$
            .pipe(
                switchMap(() => this.languageStoreService.getLanguage()),
                tap(language => this.translateService.use(language.code))
            )
            .subscribe();

        this.subscription = sub1.add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onRetry() {
        this.enterpriseStoreService.fetch().subscribe();
    }
}

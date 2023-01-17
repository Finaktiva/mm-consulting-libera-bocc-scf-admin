import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { AuthenticationFacade } from '@libera/authentication';
import { ENTERPRISE_REQUEST_TYPE } from '@libera/models/enterprise-request';
import {
    AuthenticationQuery,
    AuthenticationStoreService,
    LanguageQuery,
    LanguageStoreService,
    ProfileStoreService,
    SelectLanguageQuery,
} from '@libera/state';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@libera/models/catalog';
import { BnNgIdleService } from 'bn-ng-idle';
import { APP_ROUTES_PROVIDER, SECONDS_TO_EXPIRE_SESSION_PROVIDER } from '@libera/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    isSubmitting$ = this.query.selectSigningOut();

    email$ = this.query.selectEmail();

    isLoading$ = combineLatest(
        this.authenticationFacade.isLoading$,
        this.languageQuery.selectLoading(),
        this.languageSelectQuery.selectFetching()
    ).pipe(map(x => x.some(Boolean)));

    languages$: Observable<Language[]> = this.languageQuery.selectEntities();
    currentLanguage$ = this.languageQuery.getSelectedLanguage();
    isChangingLanguage$ = this.selectLanguageQuery.selectCreating();

    private subscription: Subscription;

    ENTERPRISE_REQUEST_TYPE = ENTERPRISE_REQUEST_TYPE;

    //don't remove AuthenticationQuery, it's a necessary hack
    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService,
        private authenticationFacade: AuthenticationFacade,
        private observer: MediaObserver,
        private languageQuery: LanguageQuery,
        private languageStoreService: LanguageStoreService,
        private languageSelectQuery: SelectLanguageQuery,
        private translateService: TranslateService,
        private selectLanguageQuery: SelectLanguageQuery,
        private bnIdle: BnNgIdleService,
        private profileStoreService: ProfileStoreService,
        @Inject(SECONDS_TO_EXPIRE_SESSION_PROVIDER) private secondsToExpireSessionProvider: number,
    ) {
        this.translateService.setDefaultLang('en');
    }

    mode$: Observable<'over' | 'side'> = this.observer.asObservable().pipe(
        filter(changes => changes.length > 0),
        map(changes => changes[0]),
        map(change => change.mqAlias == 'xs' || change.mqAlias == 'sm'),
        map(isSmall => (isSmall ? 'over' : 'side'))
    );

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

        const sub3 = isLoaded$
            .pipe(switchMap(() => this.profileStoreService.fetchRolePermissions()))
            .subscribe();

        this.bnIdle.startWatching(this.secondsToExpireSessionProvider).subscribe((isTimedOut: boolean) => {
            if (isTimedOut) {
                this.bnIdle.stopTimer();
                this.onSignOut(true);
            }
        });

        this.subscription = sub1.add(sub2).add(sub3);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSignOut(sessionExpired?: boolean) {
        this.storeService.signOut(sessionExpired).subscribe();
    }

    onChangeLanguage(language: Language) {
        this.languageStoreService.setLanguage(language).subscribe(() => {
            this.translateService.use(language.code);
        });
    }
}

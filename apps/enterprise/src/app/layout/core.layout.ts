import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { AuthenticationFacade } from '@libera/authentication';
import {
    AuthenticationQuery,
    AuthenticationStoreService,
    LanguageQuery,
    LanguageStoreService,
    SelectLanguageQuery,
} from '@libera/state';
import { Observable, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthenticationRoleQuery } from '../state/authentication-role/authentication-role.query';
import { BrandingFacade } from '../store/facades/branding.facade';
import { Language } from '@libera/models/catalog';
import { TranslateService } from '@ngx-translate/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { SECONDS_TO_EXPIRE_SESSION_PROVIDER } from '@libera/environment';

@Component({
    selector: 'core-layout',
    templateUrl: './core.layout.html',
    styleUrls: ['./core.layout.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreLayout implements OnInit{
    email$ = this.authenticationFacade.email$;

    hasLoadedBranding$ = this.brandingFacade.hasLoaded$;

    logo$ = this.brandingFacade.logo$.pipe(map(value => `url(${value})`));

    loadedLogo$ = this.brandingFacade.loadedLogo$;

    mode$: Observable<'over' | 'side'> = this.observer.asObservable().pipe(
        filter(changes => changes.length > 0),
        map(changes => changes[0]),
        map(change => change.mqAlias == 'xs' || change.mqAlias == 'sm'),
        map(isSmall => (isSmall ? 'over' : 'side'))
    );

    isAdmin$ = this.query.selectIsAdmin();

    isFunding$ = this.query.selectIsFunding();

    isPayer$ = this.query.selectIsPayer();

    isProvider$ = this.query.selectIsProvider();

    isPayerAdmin$ = this.query.selectIsPayerAdmin();

    shouldRenderInvoiceMenu$: Observable<boolean> = zip(
        this.isProvider$,
        this.isPayer$
    ).pipe(map(values => values.includes(true)));

    languages$: Observable<Language[]> = this.languageQuery.selectEntities();
    currentLanguage$ = this.languageQuery.getSelectedLanguage();
    isChangingLanguage$ = this.selectLanguageQuery.selectCreating();

    constructor(
        private observer: MediaObserver,
        private query: AuthenticationRoleQuery,
        private authenticationQuery: AuthenticationQuery,
        private authenticationStoreService: AuthenticationStoreService,
        private authenticationFacade: AuthenticationFacade,
        private brandingFacade: BrandingFacade,
        private languageQuery: LanguageQuery,
        private languageStoreService: LanguageStoreService,
        private translateService: TranslateService,
        private selectLanguageQuery: SelectLanguageQuery,
        private bnIdle: BnNgIdleService,
        @Inject(SECONDS_TO_EXPIRE_SESSION_PROVIDER) private secondsToExpireSessionProvider: number,
    ) {}

    ngOnInit(): void {
        this.bnIdle.startWatching(this.secondsToExpireSessionProvider).subscribe((isTimedOut: boolean) => {
            if (isTimedOut) {
                this.bnIdle.stopTimer();
                this.onSignOut(true);
            }
        });
    }

    onSignOut(sessionExpired?: boolean) {
        this.authenticationStoreService.signOut(sessionExpired).subscribe();
    }

    onChangeLanguage(language: Language) {
        this.languageStoreService.setLanguage(language).subscribe(() => {
            this.translateService.use(language.code);
        });
    }
}

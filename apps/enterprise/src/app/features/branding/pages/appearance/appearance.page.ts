import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { UpdateThemePayload } from '@libera/models/branding';
import { BrandingFacade } from 'apps/enterprise/src/app/store/facades/branding.facade';
import { combineLatest, merge, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ImageFormComponent } from '../../components/image-form/image-form.component';
import { ThemeFormComponent } from '../../components/theme-form/theme-form.component';

@Component({
    selector: 'appearance-page',
    templateUrl: './appearance.page.html',
    styleUrls: ['./appearance.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearancePage implements OnInit, OnDestroy {
    @ViewChild(ThemeFormComponent, { static: false })
    themeForm: ThemeFormComponent;

    @ViewChild('logo', { static: false }) logoForm: ImageFormComponent;

    @ViewChild('favicon', { static: false }) faviconForm: ImageFormComponent;

    hasLoaded$ = this.brandingFacade.hasLoaded$;

    isLoading$ = this.brandingFacade.isLoading$;

    error$ = this.brandingFacade.error$;

    theme$ = combineLatest(
        this.brandingFacade.primaryColor$,
        this.brandingFacade.accentColor$
    ).pipe(
        map(([primary, accent]) =>
            primary && accent
                ? {
                      primaryColor: primary,
                      accentColor: accent,
                  }
                : null
        )
    );

    isUpdatingTheme$ = this.brandingFacade.isUpdatingTheme$;

    isUpdatingLogo$ = this.brandingFacade.isUpdatingLogo$;

    isUpdatingFavicon$ = this.brandingFacade.isUpdatingFavicon$;

    isDeletingBranding$ = this.brandingFacade.isDeletingBranding$;

    isLarge$: Observable<boolean> = this.observer.asObservable().pipe(
        filter(changes => changes.length > 0),
        map(changes => changes[0]),
        map(change => change.mqAlias == 'xs' || change.mqAlias == 'sm'),
        map(isSmall => !isSmall)
    );

    private subscription = new Subscription();

    constructor(
        private brandingFacade: BrandingFacade,
        private observer: MediaObserver
    ) {}

    ngOnInit() {
        this.fetchBranding();

        const {
            deleteBrandingSuccess$,
            updateLogoSuccess$,
            updateFaviconSuccess$,
        } = this.brandingFacade;

        const resetLogo$ = merge(deleteBrandingSuccess$, updateLogoSuccess$);

        const resetFavicon$ = merge(
            deleteBrandingSuccess$,
            updateFaviconSuccess$
        );

        const sub1 = deleteBrandingSuccess$.subscribe(() =>
            this.themeForm.reset()
        );

        const sub2 = resetLogo$.subscribe(() => {
            this.logoForm.reset();
        });

        const sub3 = resetFavicon$.subscribe(() => this.faviconForm.reset());

        this.subscription
            .add(sub1)
            .add(sub2)
            .add(sub3);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fetchBranding() {
        this.brandingFacade.fetch();
    }

    onSubmitTheme(payload: UpdateThemePayload) {
        this.brandingFacade.updateTheme(payload);
    }

    onSubmitLogo(file: File) {
        this.brandingFacade.updateLogo(file);
    }

    onSubmitFavicon(file: File) {
        this.brandingFacade.updateFavicon(file);
    }

    onDelete() {
        this.brandingFacade.delete();
    }
}

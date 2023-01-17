import { Injectable } from '@angular/core';
import {
    CatalogService,
    LocalStorageService,
    ProfileService,
} from '@libera/api';
import { LANGUAGE_KEY } from '@libera/constants';
import { Language } from '@libera/models/catalog';
import { EMPTY, of } from 'rxjs';
import { tap, map, mapTo } from 'rxjs/operators';
import { LanguageStore } from './language.store';
import { SelectLanguageStore } from './select-language.store';

@Injectable({
    providedIn: 'root',
})
export class LanguageStoreService {
    constructor(
        private store: LanguageStore,
        private catalogService: CatalogService,
        private submitStore: SelectLanguageStore,
        private profileService: ProfileService,
        private localStorageService: LocalStorageService
    ) {}

    fetchAll() {
        this.store.fetchAll();

        return this.catalogService
            .getLanguages()
            .pipe(
                tap(
                    response => this.store.fetchAllSuccess(response),
                    err => this.store.fetchAllError(err)
                )
            );
    }

    setLanguage(language: Language) {
        this.submitStore.create();

        return this.profileService.setLanguage(language.code).pipe(
            tap(
                () => {
                    this.localStorageService.setItem(LANGUAGE_KEY, language);
                    this.submitStore.createSuccess();
                    this.store.updateLanguage(language);
                },
                err => this.submitStore.createError(err)
            )
        );
    }

    getLanguage() {
        const language = this.localStorageService.getItem(LANGUAGE_KEY);

        if (!!language) return of(language);

        this.submitStore.fetch();

        return this.profileService.getLanguage().pipe(
            tap(
                response => {
                    this.submitStore.fetchSuccess();
                    this.localStorageService.setItem(LANGUAGE_KEY, response);
                },
                err => {
                    this.submitStore.fetchError(err);
                }
            )
        );
    }
}

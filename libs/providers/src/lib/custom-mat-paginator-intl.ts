import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl
    implements OnDestroy {
    private suscription: Subscription;

    public firstPageLabel = this.translateService.instant(
        'PAGINATOR.FIRST_PAGE'
    );
    public lastPageLabel = this.translateService.instant('PAGINATOR.LAST_PAGE');
    public itemsPerPageLabel = this.translateService.instant(
        'PAGINATOR.PER_PAGE'
    );
    public nextPageLabel = this.translateService.instant('PAGINATOR.NEXT');
    public previousPageLabel = this.translateService.instant(
        'PAGINATOR.PREVIOUS'
    );
    public ofPage = this.translateService.instant('PAGINATOR.OF_PAGE');

    constructor(private translateService: TranslateService) {
        super();

        this.suscription = this.translateService.onLangChange
            .pipe(
                switchMap(() =>
                    this.translateService.get([
                        'PAGINATOR.FIRST_PAGE',
                        'PAGINATOR.LAST_PAGE',
                        'PAGINATOR.PER_PAGE',
                        'PAGINATOR.NEXT',
                        'PAGINATOR.PREVIOUS',
                        'PAGINATOR.OF_PAGE',
                    ])
                )
            )
            .subscribe(translates => {
                this.firstPageLabel = translates['PAGINATOR.FIRST_PAGE'];
                this.lastPageLabel = translates['PAGINATOR.LAST_PAGE'];
                this.itemsPerPageLabel = translates['PAGINATOR.PER_PAGE'];
                this.nextPageLabel = translates['PAGINATOR.NEXT'];
                this.previousPageLabel = translates['PAGINATOR.PREVIOUS'];
                this.ofPage = translates['PAGINATOR.OF_PAGE'];
                this.changes.next();
            });
    }

    ngOnDestroy() {
        this.suscription.unsubscribe();
    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) {
            return `0 ${this.ofPage} ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex =
            startIndex < length
                ? Math.min(startIndex + pageSize, length)
                : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} ${this.ofPage} ${length}`;
    };
}

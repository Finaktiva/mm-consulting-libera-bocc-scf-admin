import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WINDOW_PROVIDERS } from '@libera/providers';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { CreateFinancialConditionsDialog } from './create-financial-conditions.dialog';
import fromModule from './create-financial-conditions.dialog.module';

describe('CreateFinancialConditionsDialog', () => {
    let component: CreateFinancialConditionsDialog;
    let fixture: ComponentFixture<CreateFinancialConditionsDialog>;
    let actions: Observable<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
            providers: [
                WINDOW_PROVIDERS,
                provideMockStore({ initialState: {} }),
                provideMockActions(() => actions),
                {
                    provide: MatDialogRef,
                    useValue: {
                        keydownEvents() {
                            return of({});
                        },
                        backdropClick() {
                            return of(null);
                        },
                        close() {},
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateFinancialConditionsDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

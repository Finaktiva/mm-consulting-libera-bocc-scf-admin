import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WINDOW_PROVIDERS } from '@libera/providers';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { CreateProgramDialog } from './create-program.dialog';
import fromModule from './create-program.dialog.module';

describe('CreateProgramDialog', () => {
    let component: CreateProgramDialog;
    let fixture: ComponentFixture<CreateProgramDialog>;
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
        fixture = TestBed.createComponent(CreateProgramDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

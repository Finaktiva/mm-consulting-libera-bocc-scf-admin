import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AcceptProgramDialogComponent } from './accept-program-dialog.component';
import fromModule from './accept-program-dialog.module';

describe('AcceptProgramDialogComponent', () => {
    let component: AcceptProgramDialogComponent;
    let fixture: ComponentFixture<AcceptProgramDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
            providers: [
                provideMockStore({ initialState: {} }),
                provideMockActions(of({})),
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcceptProgramDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

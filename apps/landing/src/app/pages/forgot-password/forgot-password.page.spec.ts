import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import fromModule from './forgot-password.module';
import { ForgotPasswordPage } from './forgot-password.page';

describe('ForgotPasswordPage', () => {
    let component: ForgotPasswordPage;
    let fixture: ComponentFixture<ForgotPasswordPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [
                fromModule.COMMON_IMPORTS,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [provideMockStore()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

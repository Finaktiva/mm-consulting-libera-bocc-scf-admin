import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ForgotPasswordFormComponent } from './forgot-password-form.component';
import fromModule from './forgot-password-form.module';

describe('ForgotPasswordFormComponent', () => {
    let component: ForgotPasswordFormComponent;
    let fixture: ComponentFixture<ForgotPasswordFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
            declarations: [fromModule.COMMON_DECLARATIONS],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import fromModule from './complete-new-password-form.module';
import { CompleteNewPasswordFormComponent } from './complete-new-password-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CompleteNewPasswordFormComponent', () => {
    let component: CompleteNewPasswordFormComponent;
    let fixture: ComponentFixture<CompleteNewPasswordFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompleteNewPasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

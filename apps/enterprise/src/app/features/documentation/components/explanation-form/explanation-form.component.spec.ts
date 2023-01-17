import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import fromModule from './explanation-form.module';
import { ExplanationFormComponent } from './explanation-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ExplanationFormComponent', () => {
    let component: ExplanationFormComponent;
    let fixture: ComponentFixture<ExplanationFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExplanationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

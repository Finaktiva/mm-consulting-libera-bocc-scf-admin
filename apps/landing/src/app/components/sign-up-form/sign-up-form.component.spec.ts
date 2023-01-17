import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SignUpFormComponent } from './sign-up-form.component';
import fromModule from './sign-up-form.module';

describe('SignUpFormComponent', () => {
    let fixture: ComponentFixture<SignUpFormComponent>;
    let component: SignUpFormComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
            declarations: [fromModule.COMMON_DECLARATIONS],
        }).compileComponents();

        fixture = TestBed.createComponent(SignUpFormComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });
});

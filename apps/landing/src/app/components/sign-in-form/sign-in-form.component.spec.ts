import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInFormComponent } from './sign-in-form.component';
import fromModule from './sign-in-form.module';

describe('SignInFormComponent', () => {
    let component: SignInFormComponent;
    let fixture: ComponentFixture<SignInFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                fromModule.COMMON_IMPORTS,
                NoopAnimationsModule,
                RouterTestingModule,
            ],
            declarations: [fromModule.COMMON_DECLARATIONS],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

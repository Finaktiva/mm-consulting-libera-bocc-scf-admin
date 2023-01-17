import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import fromModule from './sign-in.module';
import { SignInPage } from './sign-in.page';

describe('SignInPage', () => {
    let fixture: ComponentFixture<SignInPage>;
    let component: SignInPage;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [fromModule.COMMON_IMPORTS, RouterTestingModule],
            declarations: [fromModule.COMMON_DECLARATIONS],
            providers: [provideMockStore()],
        }).compileComponents();

        fixture = TestBed.createComponent(SignInPage);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });
});

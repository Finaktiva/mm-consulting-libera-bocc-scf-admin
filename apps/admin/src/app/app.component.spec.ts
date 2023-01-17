import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import fromModule from './app.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [fromModule.COMMON_IMPORTS, RouterTestingModule],
            providers: [provideMockStore({})],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});

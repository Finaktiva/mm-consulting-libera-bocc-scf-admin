import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import fromModule from './list.module';
import { ListPage } from './list.page';

describe('ListPage', () => {
    let component: ListPage;
    let fixture: ComponentFixture<ListPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [
                fromModule.COMMON_IMPORTS,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [provideMockStore({ initialState: {} })],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

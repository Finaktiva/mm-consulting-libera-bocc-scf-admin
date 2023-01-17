import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NestedPartial } from '@libera/shared';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppProvidersModule } from 'apps/admin/src/app/providers/app-providers.module';
import { of } from 'rxjs';
import { ProgramsState } from '../../store/reducers';
import fromModule from './detail.module';
import { DetailPage } from './detail.page';

xdescribe('DetailPageComponent', () => {
    let component: DetailPage;
    let fixture: ComponentFixture<DetailPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                fromModule.COMMON_IMPORTS,
                RouterTestingModule,
                NoopAnimationsModule,
                AppProvidersModule,
            ],
            declarations: fromModule.COMMON_DECLARATIONS,
            providers: [
                {
                    provide: Location,
                    useValue: {},
                },
                provideMockStore<NestedPartial<ProgramsState>>({
                    initialState: {
                        detail: {
                            activeId: 1,
                        },
                        entities: {
                            1: {
                                fetchDocumentation: {
                                    ids: [1],
                                },
                            },
                        },
                        documentationEntitites: {
                            1: {
                                documentation: {
                                    id: 1,
                                },
                                update: {},
                                upload: {},
                            },
                        },
                    },
                }),
                provideMockActions(of({})),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

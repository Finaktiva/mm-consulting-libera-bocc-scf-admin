import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import fromModule from './filter-plan-form.module';
import { FilterPlanFormComponent } from './filter-plan-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterPlanFormComponent', () => {
    let component: FilterPlanFormComponent;
    let fixture: ComponentFixture<FilterPlanFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterPlanFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

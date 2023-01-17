import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import fromModule from './filter-form.module';
import { FilterFormComponent } from './filter-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterFormComponent', () => {
    let component: FilterFormComponent;
    let fixture: ComponentFixture<FilterFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: fromModule.COMMON_DECLARATIONS,
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreateFinancialConditionsFormComponent } from './create-financial-conditions-form.component';
import fromModule from './create-financial-conditions-form.module';

describe('CreateFinancialConditionsFormComponent', () => {
    let component: CreateFinancialConditionsFormComponent;
    let fixture: ComponentFixture<CreateFinancialConditionsFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
            declarations: [CreateFinancialConditionsFormComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateFinancialConditionsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
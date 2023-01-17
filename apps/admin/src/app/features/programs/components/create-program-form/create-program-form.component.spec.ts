import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreateProgramFormComponent } from './create-program-form.component';
import fromModule from './create-program-form.module';

describe('CreateProgramFormComponent', () => {
    let component: CreateProgramFormComponent;
    let fixture: ComponentFixture<CreateProgramFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [fromModule.COMMON_IMPORTS, NoopAnimationsModule],
            declarations: [CreateProgramFormComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateProgramFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

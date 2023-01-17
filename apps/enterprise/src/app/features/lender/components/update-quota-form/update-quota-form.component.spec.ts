import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuotaFormComponent } from './update-quota-form.component';

describe('UpdateQuotaFormComponent', () => {
  let component: UpdateQuotaFormComponent;
  let fixture: ComponentFixture<UpdateQuotaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuotaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

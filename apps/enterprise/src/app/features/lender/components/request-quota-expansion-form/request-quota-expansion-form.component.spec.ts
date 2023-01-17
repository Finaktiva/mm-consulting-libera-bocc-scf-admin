import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuotaExpansionFormComponent } from './request-quota-expansion-form.component';

describe('RequestQuotaExpansionFormComponent', () => {
  let component: RequestQuotaExpansionFormComponent;
  let fixture: ComponentFixture<RequestQuotaExpansionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestQuotaExpansionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQuotaExpansionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

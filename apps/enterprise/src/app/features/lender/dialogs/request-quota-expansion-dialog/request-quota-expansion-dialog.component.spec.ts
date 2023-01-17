import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuotaExpansionDialogComponent } from './request-quota-expansion-dialog.component';

describe('RequestQuotaExpansionDialogComponent', () => {
  let component: RequestQuotaExpansionDialogComponent;
  let fixture: ComponentFixture<RequestQuotaExpansionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestQuotaExpansionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQuotaExpansionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

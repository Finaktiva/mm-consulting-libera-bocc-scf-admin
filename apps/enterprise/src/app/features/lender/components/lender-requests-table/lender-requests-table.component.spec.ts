import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderRequestsTableComponent } from './lender-requests-table.component';

describe('LenderRequestsTableComponent', () => {
  let component: LenderRequestsTableComponent;
  let fixture: ComponentFixture<LenderRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

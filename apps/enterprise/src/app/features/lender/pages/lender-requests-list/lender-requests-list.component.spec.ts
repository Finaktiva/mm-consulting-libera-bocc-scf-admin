import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderRequestsListComponent } from './lender-requests-list.component';

describe('LenderRequestsListComponent', () => {
  let component: LenderRequestsListComponent;
  let fixture: ComponentFixture<LenderRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

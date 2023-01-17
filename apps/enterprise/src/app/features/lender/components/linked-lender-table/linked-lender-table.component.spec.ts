import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedLenderTableComponent } from './linked-lender-table.component';

describe('LinkedLenderTableComponent', () => {
  let component: LinkedLenderTableComponent;
  let fixture: ComponentFixture<LinkedLenderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedLenderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedLenderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

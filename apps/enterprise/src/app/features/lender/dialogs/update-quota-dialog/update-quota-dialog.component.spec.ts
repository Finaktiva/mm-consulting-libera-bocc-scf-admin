import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuotaDialogComponent } from './update-quota-dialog.component';

describe('UpdateQuotaDialogComponent', () => {
  let component: UpdateQuotaDialogComponent;
  let fixture: ComponentFixture<UpdateQuotaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuotaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuotaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

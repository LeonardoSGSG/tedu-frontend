import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteProfileComponent } from './confirm-delete-profile.component';

describe('ConfirmDeleteProfileComponent', () => {
  let component: ConfirmDeleteProfileComponent;
  let fixture: ComponentFixture<ConfirmDeleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

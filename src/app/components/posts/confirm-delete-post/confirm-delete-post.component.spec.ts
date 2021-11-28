import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePostComponent } from './confirm-delete-post.component';

describe('ConfirmDeletePostComponent', () => {
  let component: ConfirmDeletePostComponent;
  let fixture: ComponentFixture<ConfirmDeletePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeletePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

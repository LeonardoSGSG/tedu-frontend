import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExitCourseComponent } from './dialog-exit-course.component';

describe('DialogExitCourseComponent', () => {
  let component: DialogExitCourseComponent;
  let fixture: ComponentFixture<DialogExitCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExitCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExitCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

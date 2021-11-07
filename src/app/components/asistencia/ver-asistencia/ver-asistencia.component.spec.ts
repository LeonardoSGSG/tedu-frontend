import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAsistenciaComponent } from './ver-asistencia.component';

describe('VerAsistenciaComponent', () => {
  let component: VerAsistenciaComponent;
  let fixture: ComponentFixture<VerAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

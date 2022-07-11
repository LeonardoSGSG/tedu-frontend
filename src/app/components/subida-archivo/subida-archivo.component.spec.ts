import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaArchivoComponent } from './subida-archivo.component';

describe('SubidaArchivoComponent', () => {
  let component: SubidaArchivoComponent;
  let fixture: ComponentFixture<SubidaArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubidaArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubidaArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

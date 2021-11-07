import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsistenciaGeneral } from 'src/app/entities/asistenciaGeneral';
import { AsistenciaComponent } from '../asistencia.component';
import { AsistenciaService } from '../asistencia.service';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.component.html',
  styleUrls: ['./ver-asistencia.component.css']
})
export class VerAsistenciaComponent implements OnInit {
  asistenciaId: number = 0;
  asistencia:AsistenciaGeneral|undefined;
  constructor(private api:AsistenciaService, public router:Router, private dialogRef:MatDialogRef<AsistenciaComponent>) { }

  ngOnInit(): void {
    this.conseguirAsistencia();
  }
  conseguirAsistencia(){
    
  }
}

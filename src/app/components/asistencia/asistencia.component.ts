import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsistenciaGeneral } from 'src/app/entities/asistenciaGeneral';
import { AsistenciaService } from './asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  public asistenciasGenerales: AsistenciaGeneral[] = [];

  constructor(private asistenciaService:AsistenciaService, private router:Router) { }

  ngOnInit(): void {
    this.getAttendances();
  }

  public getAttendances():void{
    this.asistenciaService.getAllAttendances().subscribe(
      (response: AsistenciaGeneral[]) => {
        this.asistenciasGenerales = response;
      }
    )
  }
  public verAsistencia(id:number){
    this.asistenciaService.getAttendanceById(id).subscribe(
      (Response:AsistenciaGeneral)=>{
        
      }
    )
  }
}

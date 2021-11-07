import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsistenciaGeneral } from 'src/app/entities/asistenciaGeneral';
import { AsistenciaService } from './asistencia.service';
import { VerAsistenciaComponent } from './ver-asistencia/ver-asistencia.component';
import { RegistrarAsistenciaComponent } from './registrar-asistencia/registrar-asistencia.component';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  public asistenciasGenerales: AsistenciaGeneral[] = [];
  public myId:string = sessionStorage.getItem('id')!;
  public pId:string = sessionStorage.getItem('pId')!;

  constructor(private asistenciaService:AsistenciaService, private dialog:MatDialog, private router:Router) { }

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
      (response:AsistenciaGeneral)=>{
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width="40%";
        let currentDialog = this.dialog.open(VerAsistenciaComponent, dialogConfig)
        currentDialog.componentInstance.asistencia=response;
      }
    )
  }
  public crearAsistencia(id:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    let currentDialog = this.dialog.open(RegistrarAsistenciaComponent, dialogConfig)
    currentDialog.componentInstance.asistenciaId=id;
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsistenciaGeneral } from 'src/app/entities/asistenciaGeneral';
import { AsistenciaService } from './asistencia.service';
import { VerAsistenciaComponent } from './ver-asistencia/ver-asistencia.component';
import { RegistrarAsistenciaComponent } from './registrar-asistencia/registrar-asistencia.component';
import { EditarAsistenciaComponent } from './editar-asistencia/editar-asistencia.component';

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
        var sorted_asists = response.sort(function(a, b) {
          return a.id - b.id;
        });
        sorted_asists.forEach(element => {
          var asistenciaArr:string[] = element.attendance_date.split('T');
          element.attendance_date = "Asistencia del día "+ asistenciaArr[0]+" - Horario: "+ asistenciaArr[1];
        });
        this.asistenciasGenerales = sorted_asists;
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
  public crearAsistencia(id:number, incompleto:boolean){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    let currentDialog = this.dialog.open(RegistrarAsistenciaComponent, dialogConfig)
    currentDialog.componentInstance.asistenciaId=id;
    currentDialog.componentInstance.incompleto=incompleto;
    currentDialog.afterClosed().subscribe(res=>{
      this.getAttendances();
    })
  }
  public editarAsistencia(id:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    let currentDialog = this.dialog.open(EditarAsistenciaComponent, dialogConfig)
    currentDialog.componentInstance.asistenciaId=id;
    currentDialog.afterClosed().subscribe(res=>{
      if(currentDialog.componentInstance.incompleto == true){
        this.crearAsistencia(id, true);
      }else{
        this.getAttendances();
      }
    })
  }
}

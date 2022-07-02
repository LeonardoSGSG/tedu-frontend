import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsistenciaGeneral } from 'src/app/entities/asistenciaGeneral';
import { CourseMembersService } from '../../course-members/course-members.service';
import { AsistenciaComponent } from '../asistencia.component';
import { AsistenciaService } from '../asistencia.service';
import { membersObject } from 'src/app/entities/membersObject';
import { Usuario } from 'src/app/entities/usuario';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormGroup } from '@angular/forms';
import { AsistenciaDetalle } from 'src/app/entities/asistenciaDetalle';
import { user } from 'rxfire/auth';
import { FormularioAsistencia } from '../DTOs/formularioAsistencias';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-asistencia',
  templateUrl: './editar-asistencia.component.html',
  styleUrls: ['./editar-asistencia.component.css']
})
export class EditarAsistenciaComponent implements OnInit {
  //courseId: string = sessionStorage.getItem('currentCourse')!;
  public courseId:string = window.location.href.split("/")[4];
  asistenciaId: number = 0;
  asistencias: AsistenciaDetalle[]=[];
  formulario: FormularioAsistencia[]=[];
  incompleto:boolean= false;
  valor:boolean = false;

  constructor( private dialog:MatDialog, private api:AsistenciaService, private apiMembers:CourseMembersService, public router:Router, private dialogRef:MatDialogRef<AsistenciaComponent>) { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }
  public cargarAlumnos(){
    this.api.getAttendanceById(this.asistenciaId, this.courseId).subscribe(
      (response)=>{
        this.asistencias=response.userAttendances;
        for(var i = 0; i < response.userAttendances.length; i++){
          var obj:FormularioAsistencia={
            attended: response.userAttendances[i].attended,
            student_id: response.userAttendances[i].user.id
          }
          this.formulario.push(obj)
        }
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public recrearAsist(){
    this.incompleto=true;
    this.dialogRef.close();
  }
  public actualizarCheckbox(checked:boolean|undefined, index:number){
    if(checked==undefined){
      this.formulario![index].attended=false;
    }else{
      this.formulario![index].attended=checked;
    }
  }
  public registrarAsistencia(){
    for(var i = 0; i < this.asistencias.length; i++){
      if(this.formulario![i].attended == undefined){
        this.formulario![i].attended =false;
      } 
      this.formulario![i].student_id = this.asistencias[i].user.id;
    }
    this.api.updateAttendance(this.formulario!,this.asistenciaId, this.courseId).subscribe(
      (response)=>{
        this.dialogRef.close()
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
}

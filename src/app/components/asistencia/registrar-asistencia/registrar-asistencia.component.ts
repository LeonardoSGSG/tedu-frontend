import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.component.html',
  styleUrls: ['./registrar-asistencia.component.css']
})
export class RegistrarAsistenciaComponent implements OnInit {
  //courseId: string = sessionStorage.getItem('currentCourse')!;
  public courseId:string = window.location.href.split("/")[4];
  asistenciaId: number = 0;
  students: Usuario[]=[];
  incompleto:boolean=false;

  formulario: FormularioAsistencia[]=[];

  constructor(private api:AsistenciaService, private apiMembers:CourseMembersService, public router:Router, private dialogRef:MatDialogRef<AsistenciaComponent>) { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  public cargarAlumnos(){
    this.apiMembers.getMembersByCourse(this.courseId).subscribe(
      (response: membersObject) => {
        this.students = response.students;
        //this.formulario = Array<{attended:boolean,student_id:number}>(this.students.length);
        for(var i = 0; i < response.students.length; i++){
          var obj:FormularioAsistencia = {
            attended: false,
            student_id: this.students[i].id,
          }
        this.formulario.push(obj);
        }
      }
    )
  }
  public actualizarCheckbox(checked:boolean|undefined, index:number){
    if(checked==undefined){
      this.formulario![index].attended=false;
    }else{
      this.formulario![index].attended=checked;
    }
  }
  public registrarAsistencia(){
    for(var i = 0; i < this.students.length; i++){
      if(this.formulario![i].attended == undefined){
        this.formulario![i].attended =false;
      } 
      this.formulario![i].student_id = this.students[i].id;
    }
    this.api.registerAttendance(this.formulario!,this.asistenciaId, this.courseId).subscribe(
      (response)=>{
        this.dialogRef.close()
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public reRegistrarAsistencia(){
    for(var i = 0; i < this.students.length; i++){
      if(this.formulario![i].attended == undefined){
        this.formulario![i].attended =false;
      } 
      this.formulario![i].student_id = this.students[i].id;
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

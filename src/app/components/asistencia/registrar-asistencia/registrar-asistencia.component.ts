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

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.component.html',
  styleUrls: ['./registrar-asistencia.component.css']
})
export class RegistrarAsistenciaComponent implements OnInit {
  courseId: string = sessionStorage.getItem('currentCourse')!;
  asistenciaId: number = 0;
  students: Usuario[]=[];
  formulario: FormularioAsistencia[]|undefined;

  constructor(private api:AsistenciaService, private apiMembers:CourseMembersService, public router:Router, private dialogRef:MatDialogRef<AsistenciaComponent>) { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  public cargarAlumnos(){
    this.apiMembers.getMembersByCourse(this.courseId).subscribe(
      (response: membersObject) => {
        this.students = response.students;
        this.formulario = Array<FormularioAsistencia>(this.students.length);
        for(var i = 0; i < response.students.length; i++){
          var obj:FormularioAsistencia={
            attended : false,
            student_id: this.students[i].id,
          };
          this.formulario[i] = obj;
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
    var searchEles = document.getElementById("lista")!.children;
    this.api.registerAttendance(this.formulario!,this.asistenciaId);
  }

}

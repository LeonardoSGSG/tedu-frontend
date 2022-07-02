import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/entities/curso';
import { membersObject } from 'src/app/entities/membersObject';
import { Usuario } from 'src/app/entities/usuario';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogRemoveStudentComponent } from './dialog-remove-student/dialog-remove-student.component';
import { CursoLeave } from '../course-content/DTOS/cursoLeave';
import { RespuestaCursoLeave } from '../course-content/DTOS/respuestaCursoLeave';

@Injectable({
  providedIn: 'root'
})
export class CourseMembersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  public getMembersByCourse(id: string): Observable<membersObject>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.get<membersObject>(`${this.apiServerUrl}/courses/${id}/members`,opts);
  }
  public leaveCourse(cl:CursoLeave):Observable<RespuestaCursoLeave>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    }),
    body:cl
   };
   return this.http.delete<RespuestaCursoLeave>(this.apiServerUrl+'/enrollment/leave', opts);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/entities/curso';
import { membersObject } from 'src/app/entities/membersObject';
import { Usuario } from 'src/app/entities/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseMembersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMembersByCourse(id: string): Observable<membersObject>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.get<membersObject>(`${this.apiServerUrl}/courses/${id}/members`,opts);
  }
  public deleteStudent(student_id:number,course_id:string): Observable<Usuario[]>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
        'Authorization': 'Token ' + sessionStorage.getItem('token')
      }),
      body: {
        student_id: student_id,
        course_id: course_id
      }
   };
    return this.http.delete<Usuario[]>(`${this.apiServerUrl}/enrollment`,opts);
  }
}

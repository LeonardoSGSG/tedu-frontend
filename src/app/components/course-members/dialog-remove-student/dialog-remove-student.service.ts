import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entities/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DialogRemoveStudentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

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

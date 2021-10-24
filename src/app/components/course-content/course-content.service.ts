import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/entities/post';
import { environment } from 'src/environments/environment';
import { CursoLeave } from './DTOS/cursoLeave';
import { RespuestaCursoLeave } from './DTOS/respuestaCursoLeave';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/entities/curso';
import { environment } from 'src/environments/environment';
import { ownedCourses } from 'src/app/entities/ownedCourses';

@Injectable({providedIn: 'root'})

export class CoursesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  //public getAllCourses(): Observable<{enrolledCourses: Curso[], ownedCourses: Curso[]}>{
  public getAllCourses(): Observable<Curso[]>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.get<Curso[]>(`${this.apiServerUrl}/courses`,opts);
  }
  public addCourse(course: Curso): Observable<Curso>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.post<Curso>(`${this.apiServerUrl}/courses`, course, opts);
  }
  public getCourseById(id: string): Observable<Curso>{
    return this.http.get<Curso>(`${this.apiServerUrl}/course/${id}`)
  }
  public deleteCourse(idCourse: number): Observable<Curso>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.delete<Curso>(`${this.apiServerUrl}/courses/${idCourse}`,opts)
  }
  public updateCourse(idCourse: number, course: Curso): Observable<Curso>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.put<Curso>(`${this.apiServerUrl}/courses/${idCourse}`, course,opts);
  }
  public joinCourse(course: Curso): Observable<Curso>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.post<Curso>(`${this.apiServerUrl}/enrollment`, course, opts);
  }
}

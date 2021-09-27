import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/entities/curso';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class CoursesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllCourses(): Observable<Curso[]>{
    return this.http.get<Curso[]>(`${this.apiServerUrl}/courses`);
  }
  public addCourse(course: Curso): Observable<Curso>{
    return this.http.post<Curso>(`${this.apiServerUrl}/course/add`, course);
  }
  public getCourseById(id: string): Observable<Curso>{
    return this.http.get<Curso>(`${this.apiServerUrl}/course/${id}`)
  }
  public deleteCourse(id: string): Observable<Curso>{
    return this.http.delete<Curso>(`${this.apiServerUrl}/course/${id}`)
  }
  public updateCourse(id: string, course: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.apiServerUrl}/course/${id}`, course)
  }
}

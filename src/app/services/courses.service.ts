import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseI } from '../models/course.interface';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class CoursesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllCourses(): Observable<CourseI[]>{
    return this.http.get<CourseI[]>(`${this.apiServerUrl}/courses`);
  }
  public addCourse(course: CourseI): Observable<CourseI>{
    return this.http.post<CourseI>(`${this.apiServerUrl}/course/add`, course);
  }
}

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
}

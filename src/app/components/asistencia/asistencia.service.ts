import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsistenciaGeneral } from 'src/app/entities/asistenciaGeneral';
import { environment } from 'src/environments/environment';
import { FormularioAsistencia } from "./DTOs/formularioAsistencias"

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }
  
  public getAllAttendances(_idCurso: string):Observable<AsistenciaGeneral[]>{
    //const idCurso=sessionStorage.getItem('currentCourse');
    const idCurso = _idCurso;
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.get<AsistenciaGeneral[]>(this.apiServerUrl + "/courses/"+idCurso+"/attendances", opts)
  }
  public getAttendanceById(idAs:number, _idCurso: string):Observable<AsistenciaGeneral>{
    //const idCurso=sessionStorage.getItem('currentCourse');
    const idCurso = _idCurso;
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<AsistenciaGeneral>(this.apiServerUrl + "/courses/"+idCurso+"/attendances/"+idAs, opts);
  }
  public registerAttendance(formulario:FormularioAsistencia[], idAsist:number, _idCurso: string):Observable<{registered:boolean}>{
    //const idCurso=sessionStorage.getItem('currentCourse');
    const idCurso = _idCurso;
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
   const data = JSON.stringify(formulario);
   const jsonData = JSON.parse(data);
   return this.http.post<{registered:boolean}>(this.apiServerUrl + "/courses/"+idCurso+"/attendances/"+idAsist+"/register",jsonData, opts);
  }
  public updateAttendance(formulario:FormularioAsistencia[], idAsist:number, _idCurso: string):Observable<{updated:boolean}>{
    //const idCurso=sessionStorage.getItem('currentCourse');
    const idCurso = _idCurso;
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
   const data = JSON.stringify(formulario);
   const jsonData = JSON.parse(data);
   return this.http.put<{updated:boolean}>(this.apiServerUrl + "/courses/"+idCurso+"/attendances/"+idAsist+"/edit",jsonData, opts)
  }
}

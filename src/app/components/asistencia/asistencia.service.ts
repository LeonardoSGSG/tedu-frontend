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
  
  public getAllAttendances():Observable<AsistenciaGeneral[]>{
    const idCurso=sessionStorage.getItem('currentCourse');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.get<AsistenciaGeneral[]>(this.apiServerUrl + "/courses/"+idCurso+"/attendances", opts)
  }
  public getAttendanceById(idAs:number):Observable<AsistenciaGeneral>{
    const idCurso=sessionStorage.getItem('currentCourse');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<AsistenciaGeneral>(this.apiServerUrl + "/courses/"+idCurso+"/attendances/"+idAs, opts);
  }
  public registerAttendance(formulario:FormularioAsistencia[], idAsist:number):void{
    const idCurso=sessionStorage.getItem('currentCourse');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
   this.http.post(this.apiServerUrl + "/courses/"+idCurso+"/attendances/"+idAsist,formulario, opts);
  }
}

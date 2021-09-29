import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/entities/response';
import { environment } from 'src/environments/environment';
import { respuestaRegister } from './DTOS/respuestaRegister';
import { FormularioRegister } from './DTOS/FormularioRegister';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public postUser(form:FormularioRegister):Observable<respuestaRegister>{
    let direccion = this.apiServerUrl + "/register";
    return this.http.post<respuestaRegister>(direccion,form);
  }
}

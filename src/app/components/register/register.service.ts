import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entities/usuario';
import { ResponseI } from 'src/app/entities/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public postUser(form:Usuario):Observable<ResponseI>{
    let direccion = this.apiServerUrl + "/register";
    return this.http.post<ResponseI>(direccion,form);
  }
}

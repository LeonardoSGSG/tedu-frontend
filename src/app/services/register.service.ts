import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public postUser(form:UserI):Observable<ResponseI>{
    let direccion = this.apiServerUrl + "/register";
    return this.http.post<ResponseI>(direccion,form);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

   url: string = "http://localhost:3000/";

  constructor(private http:HttpClient) { }

  postUser(form:UserI):Observable<ResponseI>{
    let direccion = this.url + "user";
    return this.http.post<ResponseI>(direccion,form);
  }
}

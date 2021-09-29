import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';
import { FormularioLogin } from './DTOS/FormularioLogin';
import { respuestaLogin } from './DTOS/respuestaLogin';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
   
   public Login(formulario: FormularioLogin): Observable<respuestaLogin> {
    return this.http.post<respuestaLogin>(`${this.apiServerUrl}/login`, formulario);
    
}
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormularioLogin } from '../login/DTOS/FormularioLogin';
import { FormularioProfile } from './DTOS/FormularioProfile';
import { respuestaProfile } from './DTOS/respuestaProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
   
   public Profile(formulario: FormularioProfile): Observable<respuestaProfile> {
      const opts={
        headers: new HttpHeaders({
       'Authorization': 'Token ' + sessionStorage.getItem('token')
 
      })
     };
    return this.http.put<respuestaProfile>(`${this.apiServerUrl}/user/`  ,  formulario, opts );
    
}
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormularioLogin } from '../login/DTOS/FormularioLogin';
import { usuarioDTO } from '../login/DTOS/UsuarioDTO';
import { FormularioProfile } from './DTOS/FormularioProfile';
import { resDeleteProfile } from './DTOS/resDeleteProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
   
   public getUserById(): Observable<usuarioDTO> {
    return this.http.get<usuarioDTO>(`${this.apiServerUrl}/user/` + sessionStorage.getItem('id') );
}
  /*public DeleteProfile():Observable<resDeleteProfile>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
      })
    };
    return this.http.delete<resDeleteProfile>(`${this.apiServerUrl}/user/` , opts )
  }*/
  

  
}

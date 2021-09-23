import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from './entities/usuario';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
   }
   public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiServerUrl+'/usuario/all');
}
}

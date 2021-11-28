import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { notificationDTO } from 'src/app/entities/notificationDTO';
import { updateNotiMsg } from 'src/app/entities/updateNotiMsg';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public updateNotifications(): Observable<updateNotiMsg>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
   return this.http.put<updateNotiMsg>(this.apiServerUrl+'/notification', null, opts)
  }

  public getUnseen():Observable<notificationDTO[]>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
   return this.http.get<notificationDTO[]>(this.apiServerUrl+'/notification', opts)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {notificationDTO } from 'src/app/entities/notificationDTO';
import { updateNotiMsg } from 'src/app/entities/updateNotiMsg';
import { environment } from 'src/environments/environment';
import { deleteMsg } from './DTOs/deleteMsg';
import { messageDTO } from './DTOs/messageDTO';
import { msg } from './DTOs/msg';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  public sendMessage(msg: msg):Observable<msg>
  {

    const idUser= sessionStorage.getItem('idChatDestino')!
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.post<msg>(this.apiServerUrl+'/messages/' + idUser, msg, opts)
  }
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


  public allMessages():Observable<messageDTO[]>
  {
    
    const idUser= sessionStorage.getItem('idChatDestino')!
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<messageDTO[]>(this.apiServerUrl+'/messages/' + idUser,  opts)

  }
  public outgoingMessages():Observable<messageDTO[]>
  {
    const idUser= sessionStorage.getItem('idChatDestino')!
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<messageDTO[]>(this.apiServerUrl+'/messages/' + idUser + '/outgoing',  opts)

  }
  public incomingMessages():Observable<messageDTO[]>
  {
    const idUser= sessionStorage.getItem('idChatDestino')!
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<messageDTO[]>(this.apiServerUrl+'/messages/' + idUser + '/incoming',  opts)

  }
  public deleteMessage(idN: number):Observable<deleteMsg>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.delete<deleteMsg>(this.apiServerUrl+'/messages/' + idN,  opts)

  }

}



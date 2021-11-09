import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { deleteMsg } from './DTOs/deleteMsg';
import { message } from './DTOs/message';
import { msg } from './DTOs/msg';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public sendMessage(msg: message):Observable<msg>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.post<msg>(this.apiServerUrl+'/messages/', msg, opts)
  }

  public allMessages(idUser: string):Observable<message[]>
  {
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<message[]>(this.apiServerUrl+'/messages/' + idUser,  opts)

  }
  public outgoingMessages():Observable<message[]>
  {
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<message[]>(this.apiServerUrl+'/messages/' + id + '/outgoing',  opts)

  }
  public incomingMessages():Observable<message[]>
  {
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<message[]>(this.apiServerUrl+'/messages/' + id + '/incoming',  opts)

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



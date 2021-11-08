import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { message } from './DTOs/message';
import { resMessage } from './DTOs/resMessage';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public sendMessage(msg: message):Observable<resMessage>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.post<resMessage>(this.apiServerUrl+'/messages/', msg, opts)
  }

  public allMessages():Observable<resMessage>
  {
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<resMessage>(this.apiServerUrl+'/messages/' + id,  opts)

  }
  public outgoingMessages():Observable<resMessage>
  {
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<resMessage>(this.apiServerUrl+'/messages/' + id + '/outgoing',  opts)

  }
  public incomingMessages():Observable<resMessage>
  {
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.get<resMessage>(this.apiServerUrl+'/messages/' + id + '/incoming',  opts)

  }
  public deleteMessage(idN: number):Observable<resMessage>
  {
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.delete<resMessage>(this.apiServerUrl+'/messages/' + idN,  opts)

  }

}



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventI } from 'src/app/entities/event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public findAllUserEvents(): Observable<EventI[]>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.get<EventI[]>(`${this.apiServerUrl}/event`,opts);
  }
  public findUserEventById(idEvent:string): Observable<EventI[]>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.get<EventI[]>(`${this.apiServerUrl}/event/${idEvent}`,opts);
  }
  public createEvent(event:EventI):Observable<EventI>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
   return this.http.post<EventI>(`${this.apiServerUrl}/event`, event, opts);
  }
}
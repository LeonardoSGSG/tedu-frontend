import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { deleteMessageDTO } from '../DTOS/deleteMessageDTO';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeletePostService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public deletePost(idCurso:string, idPost:string):Observable<deleteMessageDTO>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.delete<deleteMessageDTO>(this.apiServerUrl+'/courses/'+idCurso+'/posts/'+idPost, opts);
  }
}

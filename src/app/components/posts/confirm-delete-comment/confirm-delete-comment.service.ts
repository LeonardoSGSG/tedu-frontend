import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteCommentService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public deleteComment(idCourse:string,idPost:string,idComment:number): Observable<Comment>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.delete<Comment>(`${this.apiServerUrl}/courses/${idCourse}/posts/${idPost}/comments/${idComment}`,opts)
  }
}

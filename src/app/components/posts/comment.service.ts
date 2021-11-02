import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/entities/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http:HttpClient) { }

  public createComment(comment:Comment,idCourse:string,idPost:string):Observable<Comment[]>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
   return this.http.post<Comment[]>(`${this.apiServerUrl}/courses/${idCourse}/posts/${idPost}/comments`, comment, opts);
  }
  public getComment(idCourse:string,idPost:string): Observable<Comment>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.get<Comment>(`${this.apiServerUrl}/courses/${idCourse}/posts/${idPost}/comments`,opts);
  }
  public updateComment(comment:Comment,idCourse:string,idPost:string,idComment:number): Observable<Comment>{
    const id=sessionStorage.getItem('id');
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')
    })
   };
    return this.http.put<Comment>(`${this.apiServerUrl}/courses/${idCourse}/posts/${idPost}/comments/${idComment}`,comment,opts);
  }
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/entities/post';
import { postDTO } from './DTOS/postDTO';
import { deleteMessageDTO } from './DTOS/deleteMessageDTO';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getPostsByCourseID(id: string):Observable<postDTO[]>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.get<postDTO[]>(this.apiServerUrl+'/courses/'+id+'/posts', opts)
  }
  public createPost(formul:Post, id: string):Observable<Post>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.post<Post>(this.apiServerUrl+'/courses/'+id+'/posts', formul, opts);
  }
  public deletePost(idCurso:string, idPost:string):Observable<deleteMessageDTO>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.delete<deleteMessageDTO>(this.apiServerUrl+'/courses/'+idCurso+'/posts/'+idPost, opts);
  }
  public updatePost(formul:Post, idCurso:string, idPost:string):Observable<Post>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.put<Post>(this.apiServerUrl+'/courses/'+idCurso+'/posts/'+idPost, formul, opts);
  }
  
}

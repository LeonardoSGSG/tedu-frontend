import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/entities/post';
import { postDTO } from './DTOS/postDTO';
import { formularioPost } from './DTOS/formularioPost';

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
  public createPost(formul:formularioPost, id: string):Observable<Post>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   return this.http.post<Post>(this.apiServerUrl+'/courses/'+id+'/posts', formul, opts)
  }
}

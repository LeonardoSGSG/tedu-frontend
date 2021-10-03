import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getPostsByCourseID(id: string):Observable<Post[]>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
    return this.http.get<Post[]>(this.apiServerUrl+'/courses/'+id+'/posts', opts)
  }
}

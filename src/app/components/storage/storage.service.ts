import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Observable } from 'rxjs';
import { Post } from 'src/app/entities/post';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref();
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http:HttpClient) { }

  async subirImagen(nombre:string, imgBase64:any){

    try{
      let response = await this.storageRef.child("files/"+nombre).putString(imgBase64,'data_url');
      return await response.ref.getDownloadURL();
      
    }catch(err){
      console.log(err);
      return null;
    }
  }
  public createPostFile(url: string, postId:number):Observable<{post:Post, key:string, id:number}>{
    const opts={
      headers: new HttpHeaders({
     'Authorization': 'Token ' + sessionStorage.getItem('token')

    })
   };
   let envio={key:url};
   return this.http.post<{post:Post, key:string, id:number}>(this.apiServerUrl+"/courses/"+sessionStorage.getItem('currentCourse')+"/posts/"+postId+"/files",envio,opts);
  }
}

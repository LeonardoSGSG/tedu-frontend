import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { StorageService } from '../../storage/storage.service';
import { PostsComponent } from '../posts.component';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  addPostForm = new FormGroup({
    text: new FormControl('',[Validators.required])
  })
  public myId:string = sessionStorage.getItem('id')!;
  public courseId:string = window.location.href.split("/")[4];
  archivosPost: any[]=[];
  nombresArchivosPost: string[]=[];
  numeroArchivosPost: number=0;

  constructor(private api:PostsService,
              public router:Router,
              private dialogRef:MatDialogRef<PostsComponent>,
              private apiFiles:StorageService) { }

  ngOnInit(): void {
  }
  postForm(form:Post){
    //this.api.createPost(form, sessionStorage.getItem('currentCourse')!).subscribe(
      this.api.createPost(form, this.courseId).subscribe(
      res=>{
        if(this.numeroArchivosPost>0){
          var e = document.getElementById("ContenedroCreacion");
          var child = e!.lastElementChild; 
          while (child) {
            e!.removeChild(child);
            child = e!.lastElementChild;
          }
          var h1 =document.createElement("h1");
          h1.classList.add(".mat-h1");
          h1.textContent="No cierre ni recargue el navegador hasta que se cierre este mensaje";
          document.getElementById("ContenedroCreacion")?.appendChild(h1);
          for(let i=0; i<this.numeroArchivosPost;i++){
            let tempI=i;
            let nomCortado:string[] = this.nombresArchivosPost[i].split('.');
            this.apiFiles.subirImagen((nomCortado[0].length>35? nomCortado[0].substring(0,34):nomCortado[0]) + Date.now()+ this.myId +"."+nomCortado[nomCortado.length-1],this.archivosPost[i]).then(urlImagen=>{
              //console.log(urlImagen);
              this.apiFiles.createPostFile(urlImagen!,res.id, this.nombresArchivosPost[tempI]).subscribe(res=>{
                //console.log(res.id+" "+res.key);
                //console.log("Se guardo la url de firebase en la BD")
                if(tempI==this.numeroArchivosPost-1){
                  window.setTimeout(() => {
                    location.reload
                    //notification.close();
                    this.dialogRef.close();
                  },2500);
                }
              }),
              (error: HttpErrorResponse)=>{
                alert(error.message);
              }
            })
          }
        }else{
          this.agregar();
        }
      },
      err=>{
        console.log(err);
      }
    )
    
    
  }
  public agregar(){
    location.reload
    this.dialogRef.close();
  }
  cargarImagenPost(event:any){
    this.limpiarArchivos();
    let archivo = event.target.files;
    this.numeroArchivosPost=event.target.files.length;
    if(event.target.files.length>0){
      let tNombres = document.createElement("div");
      tNombres.textContent="Nombres de archivos:";
      document.getElementById("tNombres")?.appendChild(tNombres);
    }
    for(let i=0; i<event.target.files.length;i++){
      let reader=new FileReader();
      var nomCort:string;        
      if(archivo[i].name.length<=50){
        this.nombresArchivosPost.push(archivo[i].name);
      }else{
        alert("El archivo de nombre: '"+archivo[i].name+"' tiene un nombre muy largo, favor de recortar e intentar de nuevo");
        this.limpiarArchivos();
      }
      reader.readAsDataURL(archivo[i]);
      reader.onloadend=()=>{
        //console.log(reader.result);
        if(archivo[i].name.length<=50){
          this.archivosPost.push(reader.result);
        }
      }
    }
    
    //reader.
  }
  limpiarArchivos(){
    var e = document.getElementById("nombresArchivos");
    var f = document.getElementById("tNombres");
    this.archivosPost=[];
    this.nombresArchivosPost=[];
    this.numeroArchivosPost=0;
    //e.firstElementChild can be used.
    var child = e!.lastElementChild; 
    while (child) {
        e!.removeChild(child);
        child = e!.lastElementChild;
    }
    var child2 = f!.lastChild;
    while(child2){
      f!.removeChild(child2);
      child2=f!.lastElementChild;
    }
  }
}

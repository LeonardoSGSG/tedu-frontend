import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/entities/post';
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
  nombresArchivos: string[]=[];

  constructor(private api:PostsService,
              public router:Router,
              private dialogRef:MatDialogRef<PostsComponent>) { }

  ngOnInit(): void {
  }
  postForm(form:Post){
    this.api.createPost(form, sessionStorage.getItem('currentCourse')!).subscribe(
      res=>{
        console.log("se envió el formulario satisfactoriamente");
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
  cargarImagen(event:any){
    this.limpiarArchivos();
    let archivo = event.target.files;
    console.log(event.target.files);
    let reader=new FileReader();
    for(let i=0; i<event.target.files.length;i++){
      this.nombresArchivos.push(archivo[i].name);
    }
    
    //reader.
  }
  limpiarArchivos(){
    var e = document.getElementById("nombresArchivos");
        
        //e.firstElementChild can be used.
        var child = e!.lastElementChild; 
        while (child) {
            e!.removeChild(child);
            child = e!.lastElementChild;
        }
  }
}

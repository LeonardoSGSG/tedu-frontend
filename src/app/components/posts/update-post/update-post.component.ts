import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { PostsComponent } from '../posts.component';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  public course:string = window.location.href.split("/")[4];

  addPostForm = new FormGroup({
    text: new FormControl('',[Validators.required])
  })
  constructor(private api:PostsService,
              public router:Router,
              private dialogRef:MatDialogRef<PostsComponent>) { }

  ngOnInit(): void {
  }
  
  postForm(form:Post){
    //this.api.updatePost(form, sessionStorage.getItem('currentCourse')!, sessionStorage.getItem('currentPost')!).subscribe(
      this.api.updatePost(form, this.course, sessionStorage.getItem('currentPost')!).subscribe(
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

}

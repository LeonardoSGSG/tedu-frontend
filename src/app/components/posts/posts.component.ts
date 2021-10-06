import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { postDTO } from './DTOS/postDTO';
import { PostsService } from './posts.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddPostComponent } from './add-post/add-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: postDTO[] = [];
  public course:string = sessionStorage.getItem('currentCourse')!;
  public myId:string = sessionStorage.getItem('id')!;
  constructor(private postsService: PostsService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPosts(this.course);
  }
  public getPosts(id:string): void{
    this.postsService.getPostsByCourseID(id).subscribe(
      (response: postDTO[]) => {
        this.posts = response;
        console.log("se cargaron los posts de este curso")
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  
  public popupCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    let currentDialog = this.dialog.open(AddPostComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(res=>{
      this.getPosts(this.course);
    })
    console.log("se muestra el pop up")
  }
  public eliminarPost(postId:number){
    console.log("curso: "+this.course+" idPost: "+postId)
    this.postsService.deletePost(this.course, postId+"").subscribe(
      res=>{
        console.log("se elimino");
        this.getPosts(this.course);
      },
      err=>{
        console.log(err);
      }
    )
  }
}



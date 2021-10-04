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
  constructor(private postsService: PostsService, private dialog:MatDialog) { }

  ngOnInit(): void {
    var idCurso = sessionStorage.getItem('currentCourse');
    this.getPosts(idCurso!);
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
      this.getPosts(sessionStorage.getItem('currentCourse')!);
    })
    console.log("se muestra el pop up")
  }
}



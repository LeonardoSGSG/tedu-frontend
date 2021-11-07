import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { postDTO } from './DTOS/postDTO';
import { PostsService } from './posts.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddPostComponent } from './add-post/add-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/entities/comment';
import { CommentService } from './comment.service';
import { ConfirmDeleteCommentComponent } from './confirm-delete-comment/confirm-delete-comment.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  addCommentForm = new FormGroup({
    text: new FormControl('')
  })
  editForm= new FormGroup({
    text: new FormControl('')
  })
  @Input()
  
  public cont!:number;
  public posts: postDTO[] = [];
  public comments: Comment[]=[];
  public rep: [1] = [1];
  public idPost: string ='';
  public idComment: string ='';
  public shouldRun: boolean = false;
  public course:string = sessionStorage.getItem('currentCourse')!;
  public myId:string = sessionStorage.getItem('id')!;
  public pId:string = sessionStorage.getItem('pId')!;
  constructor(private postsService: PostsService, private dialog:MatDialog, private comSvc:CommentService) { }

  ngOnInit(): void {
    this.getPosts(this.course);  
  }
  public getPosts(id:string): void{
    this.postsService.getPostsByCourseID(id).subscribe(
      (response: postDTO[]) => {
        this.posts = response;
        console.log("se cargaron los posts de este curso")
        this.cont=this.posts.length;
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
  public popupUpdate(id:string){
    sessionStorage.setItem('currentPost',id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    let currentDialog = this.dialog.open(UpdatePostComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(res=>{
      this.getPosts(this.course);
    })
    console.log("se muestra el pop up")
  }
  public getComments(idPost:string): void{
    this.comSvc.getComment(this.course,idPost).subscribe(
      (response: any) => {
        this.comments = response;
        this.idPost = idPost;        
        //console.log(this.comments);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  postFormComment(formu:Comment,postId:string){        
    if(this.cont == 1){
      this.addComment(formu,postId)
    }else{
      this.cont = this.cont-1;
    }        
  }  
  addComment(formu:Comment,postId:string){
    this.comSvc.createComment(formu,this.course,postId).subscribe(data =>{
      console.log(formu);
      this.getComments(postId);
      this.cont = this.posts.length;
    })
    ,
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  }
  deleteComment(postId:string,commentId:number){
    return this.dialog.open(ConfirmDeleteCommentComponent,{
      disableClose: true,
      data:{
        postId: postId,
        commentId: commentId
      }
    }).afterClosed().subscribe(res =>{
      //console.log(res)    
      this.getComments(postId);                       
    })
  }
  editComment(form:Comment,postId:string,commentId:number): void{
    this.comSvc.updateComment(form,this.course,postId,commentId).subscribe(
      (response: Comment) =>{    
        console.log(form);
        this.idComment = '';
        this.shouldRun=false;
        this.getComments(postId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  editInputComment(commentId:number){
    this.idComment = commentId+''; 
    this.shouldRun = true;
  }
  cancelUpdate(){
    this.idComment = '';
    this.shouldRun=false;
  }
}